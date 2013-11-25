$(function() {
    $("div#Connect").button().click(function(event){
        chrome.extension.sendMessage({greeting: "Connect"},function(response){});
    });
    $("div#Send").button().click(sendMsg);
});
