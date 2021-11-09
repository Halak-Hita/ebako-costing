/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function isValid(arrname,arrvalue,arrtye){
    var comment = '';
    var bool = true;
    for(var i=0;i<arrname.length;i++){
        for(var j=0;j<arrtye[i].length;j++){
            switch (arrtye[i][j]) {
                case 'date':
                    bool = date(arrvalue[i]) ? true : false;
                    comment = comment + ((!bool) ? arrname[i] +' Not Valid, Required (yyyy-dd-mm) ex. 1992-12-18' : '') + '\n';
                    break;
                case 'notempty':
                    bool = notempty(arrvalue[i]) ? true: false;
                    comment = comment + ((!bool) ? arrname[i] +' Not Allowed Empty ' : '') + '\n';
                    break;
                case 'notzero':
                    bool = notzero(arrvalue[i]) ? true: false;
                    comment = comment + ((!bool) ? arrname[i] +' Not Allowed Null' : '') + '\n';
                    break;
                case 'booleans':
                    bool = booleans(arrvalue[i]) ? true: false;
                    comment = comment + ((!bool) ? arrname[i] +' is Not Booleans' : '') + '\n';
                    break;
                case 'email':
                    bool = email(arrvalue[i]) ? true: false;
                    comment = comment + ((!bool) ? arrname[i] +' is invalid email' : '') + '\n';
                    break;
                case 'integer':
                    bool = integer(arrvalue[i]) ? true: false;
                    comment = comment + ((!bool) ? arrname[i] +' is Not Integer' : '') + '\n';
                    break;
                case 'alphanumeric':
                    bool = alphanumeric(arrvalue[i]) ? true: false;
                    comment = comment + ((!bool) ? arrname[i] +' is Not alphanumeric' : '') + '\n';
                    break;
                case 'datetime':
                    bool = datetime(arrvalue[i]) ? true: false;
                    comment = comment + ((!bool) ? arrname[i] +' -> Not valid datetime' : '') + '\n';
                    break;
                case 'time':
                    bool = time(arrvalue[i]) ? true: false;
                    comment = comment + ((!bool) ? arrname[i] +' -> Not valid time' : '') + '\n';
                    break;
                case 'ipv4':
                    bool = ipv4(arrvalue[i]) ? true: false;
                    comment = comment + ((!bool) ? arrname[i] +' -> Not valid ipv4' : '') + '\n';
                    break;
                case 'currency':
                    bool = currency(arrvalue[i]) ? true: false;
                    comment = comment + ((!bool) ? arrname[i] +' -> Not valid currency' : '') + '\n';
                    break;
                case 'ssn':
                    bool = ssn(arrvalue[i]) ? true: false;
                    comment = comment + ((!bool) ? arrname[i] +' -> Not valid ssn' : '') + '\n';
                    break;
                case 'sin':
                    bool = sin(arrvalue[i]) ? true: false;
                    comment = comment + ((!bool) ? arrname[i] +' -> Not valid sin' : '') + '\n';
                    break;
                default:
                    break;
            }        
        }
    }
    return comment;
//    if(comment.replace(/\s/g,"") == ""){
//        return true;
//    }else{
//        alert(comment);
//        return false;
//    }

    

}


function date(value){
    return (value.match(/^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/));
}

function numeric(value){
    return (value.match(/^[_\-a-z0-9]+$/gi));
}

function notempty(value){
    return (value != "");
}

function notzero(value){
    return (value != 0)
}

function booleans(value){
    return (value.match(/^(0|1|true|false)$/));
}

function email(value){
    return (value.match(/(^[a-z]([a-z_\.]*)@([a-z_\.]*)([.][a-z]{3})$)|(^[a-z]([a-z_\.]*)@([a-z_\-\.]*)(\.[a-z]{3})(\.[a-z]{2})*$)/i));
}

function integer(value){
    return (value.match(/(^-?\d+$)/));
}

function alphanumeric(value){
    return (value.match(/^[_\-a-z0-9]+$/gi));
}

function datetime(value){
    var dt = value.match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/);
    return (dt && !!(dt[1]<=9999 && dt[2]<=12 && dt[3]<=31 && dt[4]<=59 && dt[5]<=59 && dt[6]<=59) || false);
}

function time(value){
    var t = value.match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
    return (t && !!(t[1]<=24 && t[2]<=59 && t[3]<=59) || false);
}

function ipv4(value) {
    var ip = value.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    return (ip && !!(ip[1]<=255 && ip[2]<=255 && ip[3]<=255 && ip[4]<=255) || false);
}

function currency(value) { // Q: Should I consider those signs valid too ? : ¢|€|₤|₦|¥
    return (value.match(/^\$?\s?\d+?[\.,\,]?\d+?\s?\$?$/) && true || false);
}

function ssn(value) {
    return (value.match(/^\d{3}\-?\d{2}\-?\d{4}$/) && true || false);
}

function sin (value) {
    return (value.match(/^\d{9}$/) && true || false);
}