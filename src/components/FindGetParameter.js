const findGetParameter=(parameterName,result = "")=>{
        let tmp = [];
        if(window.location.search)window.location.search
        .substr(1)
        .split("&")
        .forEach(item=>{
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1].replaceAll("+", " "));
        });
    return result;
}
export default findGetParameter;