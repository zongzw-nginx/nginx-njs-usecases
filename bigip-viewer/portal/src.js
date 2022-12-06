shows = {
    '1': "no data yet",
    '2': "no data yet",
    '3': "no data yet",
    '4': "no data yet",
}

function trim_data(data, fields) {
    rlt = []
    lines = data.split('\n')
    lines.forEach(line => {
        fields.forEach(field => {
            if (line.match(field)) {
                rlt.push(line)
            }
        })
    }); 
    return rlt.join('\n')
}
function greb_resources(h, u, p, partition, k, f, id) {
    auth = $.base64.encode(`${u}:${p}`)
    console.log(`authorization: ${u}:${p} -> ${auth}`)
    url = `/grep?host=${h}&uri=/mgmt/tm/${k}`
    if (k != "") {
        url += `&fields=${f}`
    }
    if (partition != "") {
        url += `&partition=${partition}`
    }
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`
        },
        async: true,
        success: function (data, status) {
            if (status == "success") {
                trimed = trim_data(data, f.split(','))
                shows[id] = trimed
            } else {
                shows[id] = `failed to request to bigip: ${status}, ${data}`
            }
        },
        error: function () { },
        cache: false,
        timeout: 1000,
    })
}

refresh = 0
function update() {
    user = $("input#bigip_username").val()
    if (bigip_username == "") {
        $("p#status").text("bigip username cannot be empty.")
        return
    }
    pass = $("input#bigip_password").val()
    if (bigip_username == "") {
        $("p#status").text("bigip password cannot be empty.")
        return
    }
    host = $("input#bigip_host").val()
    if (bigip_username == "") {
        $("p#status").text("bigip host cannot be empty.")
        return
    }
    partition = $("input#partition").val()
    if (refresh > 0) {
        window.setTimeout(update, refresh)
        for (i=1; i<5; i++) {
            kind = $(`input#kind${i}`).val()
            fields = $(`input#fields${i}`).val()
            greb_resources(host, user, pass, partition, kind, fields, i)
            $(`pre#${i}`).text(shows[i])
        }
        $("pre#status").text("" + (new Date()).toLocaleString())
    }

}

$(document).ready(function () {

    $("button#refresh").click(function () {
        if ($("button#refresh").text() == "refresh") {
            $("button#refresh").text("stop")
            refresh = 2000
            update()
        } else {
            $("button#refresh").text("refresh")
            refresh = 0
        }
    })
});

