var wsServer = "ws://localhost:9000/ws";
function onOpen(evt) {
    console.log("WebSocket Connected!");
}
function onClose(evt) {
    console.log("WebSocket Disconnected!");
}
function onMessage(evt) {
    console.log('Retrieved data from server: ' + evt.data);
    chrome.tabs.query({url: "https://wx.qq.com/*"}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "send"}, function(response) {});
    });
}
function onError(evt) {
    console.log("ERROR: " + evt.data);
}
chrome.extension.onMessage.addListener( function(request, sender, sendResponse){
    if (request.greeting == "Connect") {
        ws = new WebSocket(wsServer);
        ws.onopen = function(evt) {onOpen(evt)};
        ws.onclose = function(evt) {onClose(evt)};
        ws.onmessage = function(evt) {onMessage(evt)};
        ws.onerror = function(evt) {onError(evt)};
    }
});

        

