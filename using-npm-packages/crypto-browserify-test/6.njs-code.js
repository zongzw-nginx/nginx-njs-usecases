
function test(r) {
    r.return(200, `hello njs: ${global.cryptoa.createHash('sha1').update(r.args.raw).digest('hex')}\n`);
}

export default { test }
