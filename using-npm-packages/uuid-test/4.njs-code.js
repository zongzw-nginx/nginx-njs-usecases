function test(r) {
    return r.return(200, `uuidv4: ${uuid.v4()}\n`);
}

export default { test };