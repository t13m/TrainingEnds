
alert("aaa");
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab?
            "from a content script: " + sender.tab.url:
            "from the extension");
        if (request.greeting == "send"){
            sendMsg();
        }
});
function sendMsg(){
    $("#conv_filehelper").trigger("click");
    $("#textInput")[0].value = "Training is ended. Please check!";
    $(".chatSend")[0].click();
}
