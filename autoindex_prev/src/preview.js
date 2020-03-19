function hello(r) {
    r.return(200, "hello world.");
}

function preview(r) {
    r.log("zongzw" + r.uri);
    var suffix = r.uri.replace('/prev/', '/');
    r.log('suffix ' + suffix);
    r.subrequest(
        `/json${suffix}`,
        { method: 'GET' },
        function (resp) {
            var jd = JSON.parse(resp.responseBody);

            var html_start = `<html><body><table>`;
            var html_end = `</table></body></html>`;
            var table_content = '';

            var i = 0;

            while (i < jd.length) {
                var tr_content = "<tr>";
                var j = 0;
                while (j < 4 && i < jd.length) {
                    var item = jd[i];
                    var td, img_src, href_orig, href_down;
                    
                    var btn_prev = 'preview';
                    var btn_down = "download";
                    if(item.type === 'directory') {
                        img_src = "/diricon";
                        href_orig = `/prev${suffix}${item.name}/`;
                        href_down = ``;
                        btn_prev = 'open';
                        btn_down = '';

                    } else if (item.type === 'file') {
                        
                        href_orig = ``;
                        btn_prev = '';
                        href_down = `/data${suffix}${item.name}`;

                        if (item.name.endsWith('txt')) {
                            img_src = `/txticon`;
                        } else if (item.name.endsWith('png')) {
                            btn_prev = 'preview';
                            img_src = `/data${suffix}${item.name}`;
                            href_orig = `/origin${img_src}`;
                            href_down = `/download${img_src}`;
                        } else if (item.name.endsWith('jpg')) {
                            btn_prev = 'preview';
                            img_src = `/data${suffix}${item.name}`;
                            href_orig = `/origin${img_src}`;
                            href_down = `/download${img_src}`;
                        } else if (item.name.endsWith('mp3')) {
                            img_src = `/audioicon`;
                        } else if (item.name.endsWith('mp4')) {
                            img_src = `/videoicon`;
                        } else {
                            img_src = "/unknownicon";
                        }
                      
                    } else {
                        img_src = "/unknownicon";
                        href_orig = `/origin${img_src}`;
                        href_down = `/download${img_src}`;
                    }
                    td = `
                        <td>
                            <img src="${img_src}" border=3></img><br>
                            ${item.name}<br>
                            <a href="${href_orig}">${btn_prev}</a> 
                            <a href="${href_down}">${btn_down}</a>
                        </td>
                    `;
                    tr_content += td;
                    i++; j++;
                }

                table_content += tr_content + '</tr>';
            }

            r.return(200, html_start + table_content + html_end);
        }
    );
}
