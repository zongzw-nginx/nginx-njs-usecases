var mime_map = {
    "text": ["css", "htm", "html", "js", "txt", "xml"],
    "image": ["gif", "ico", "jpeg", "jpg", "png", "svg", "svgz"],
    "document": ["doc", "docx", "ppt", "pptx"],
    "audio": ["m4a", "mid", "midi", "mp3", "ogg", "ra"],
    "video": ["3gpp", "3gp", "avi", "m4v", "mp4", "mpeg", "mpg", "mov", "wmv"],
    "zip": ["7z", "rar", "zip"]
}

var item_width      = 200;
var item_height     = 200;
var image_width     = 100;
var image_height    = 100;

function get_image_width(r) {
    var max = item_width * 0.75;
    return (image_width > max)? max : image_width;
}

function get_image_height(r) {
    var max = item_height * 0.75;
    return (image_height > max)? max : image_height;
}

function get_mime_type(suffix) {
    var t = 'unknown';
    Object.keys(mime_map).forEach(type => {
        if(mime_map[type].indexOf(suffix) != -1) {
            t = type;
            return;
        }
    });

    return t;
}

function get_body_body(r, path, item) {
    var img_src, preview_src, download_src;
    var preview_btn, download_btn;

    if (item.type === 'directory') {
        img_src = "/__icons__/dir";
        preview_src = `/prev${path}${item.name}/`;
        download_src = ``;
        preview_btn = 'open';
        download_btn = '';

    } else if (item.type === 'file') {
        var i = item.name.lastIndexOf('.');
        var file_suffix = item.name.substr(i+1, item.name.length-i-1);
        var file_type = get_mime_type(file_suffix);
        switch (file_type) {
        
            case 'image':
                img_src = `/preview_image${path}${item.name}`;
                preview_src = `/preview_data${path}${item.name}`;
                download_src = `/download${path}${item.name}`;
                preview_btn = 'preview';
                download_btn = 'download';
                break;

            case 'text':
            case 'audio':
            case 'video':
            case 'document':
            case 'zip':
                img_src = `/__icons__/${file_type}`;
                preview_src = `/preview_data${path}${item.name}`;
                download_src = `/download${path}${item.name}`;
                preview_btn = 'preview';
                download_btn = 'download';
                break;

            default:
                img_src = "/__icons__/unknown";
                preview_src = '';
                download_src = `/data${path}${item.name}`;
                preview_btn = '';
                download_btn = 'download';
                break;
        }
    }

    return `
        <div class="div_fixed_size">
            <div class="box">
            <img src="${img_src}"></img>
            </div><br>
            <b>name</b>: ${item.name}<br>
            <b>size</b>: ${item.size}<br>
            <a href="${preview_src}">${preview_btn}</a> 
            <a href="${download_src}">${download_btn}</a>
        </div>
    `;
}

function preview(r) {
    var path = r.uri.replace('/prev/', '/');
    r.subrequest(`/json${path}`, { method: 'GET' })
    .then(resp => {
        var jd = JSON.parse(resp.responseBody);
        
        var html_start = `<!DOCTYPE html>
            <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                </head>
                <style type="text/css">
                    #wrap {
                        display: flex;
                        justify-content: left;
                        flex-wrap: wrap;
                    }
                    .div_fixed_size {
                        width: ${item_width}px;
                        height: ${item_height}px;
                    }
                    .box{
                        width: ${get_image_width(r)}px;
                        height: ${get_image_height(r)}px;
                        display: box; 
                        box-pack:center;
                        box-orient: horizontal;

                        /* Firefox */
                        display: -moz-box;
                        -moz-box-pack: center;
                        -moz-box-orient: vertical;

                        /* Safari、Opera 以及 Chrome */
                        display: -webkit-box;
                        -webkit-box-pack:center;
                        -webkit-box-orient:vertical; 
                    }
                </style>
                <body>
                    <div id="wrap" style="width: 100%;">`;
        var html_end = `
                    </div>
                </body>
            </html>`;
        var body_content = '';
        jd.forEach(function(item) {
            body_content = body_content + get_body_body(r, path, item);
        });

        r.return(200, html_start + body_content + html_end);
    });
}
