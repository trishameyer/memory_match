//function for putting commas in the right spot:
function commas(num){
    var string = num.toString();
    // console.log(typeof string + '' + string);
    var arr = string.split('');
    var count = 0;
    var newArray = [];
    var finalString = null;
    newArray.unshift(arr[arr.length-1]);
    count += 1;
    for(var x = arr.length-2; x>=0; x--){
        if(count%3===0){
            newArray.unshift(arr[x] + ',');
            count+=1;
        }else{
            newArray.unshift(arr[x]);
            count+=1;
        }
    }
    finalString = newArray.join('');
    return finalString;
}
