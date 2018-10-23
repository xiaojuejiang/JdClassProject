function getKeyWord(str, keyWord) {
    var strs = str.substr(str.indexOf('?') + 1);
    var strArr = strs.split('&');
    for (var i = 0; i < strArr.length; i++) {
        var current = strArr[i].split('=');
        if (current[0] == keyWord) {
            return current[1];
        }
    }
}