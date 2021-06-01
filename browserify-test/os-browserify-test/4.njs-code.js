function test(r) {
    r.return(200, `os.platform: ${myos.platform()}\n`);
}

export default {test};