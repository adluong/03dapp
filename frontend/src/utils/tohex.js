export const ConvertStringToHex = (str) => {
    var arr = [];
    for (var i = 0; i < str.length; i++) {
           arr[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + arr.join("\\u");
}