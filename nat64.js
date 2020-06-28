function decode(r) {
    var v6addr = r.variables.server_addr;
    var splitlength = v6addr.split(":").length;

    var v6addr1  = v6addr.split(":")[splitlength-2] ;
    var v6addr2  = v6addr.split(":")[splitlength-1] ;

    var length1 = v6addr1.length ;
    var v4index1 = parseInt(v6addr1.substring(0,length1-2,),16);
    var v4index2 = parseInt(v6addr1.substring(length1-2,length1),16);

    var length2 = v6addr2.length ;
    var v4index3, v4index4       ;
    if (length2 > 2) {
        v4index3 = parseInt(v6addr2.substring(0,length2-2),16);
        v4index4 = parseInt(v6addr2.substring(length2-2,length2),16);
    } else {
        v4index3 = 0;
        v4index4 = parseInt(v6addr2,16);
    }

    var v4addr =  v4index1 + "." + v4index2 + "." + v4index3 + "." + v4index4 ;

//    r.error(`v6addr = ${v6addr}`) ;
//    r.error(`v6addr1 = ${v6addr1}`) ;
//    r.error(`v6addr2 = ${v6addr2}`);
//    r.error(`v4addr = ${v4addr}`);
    return v4addr;
}

export default {decode}
