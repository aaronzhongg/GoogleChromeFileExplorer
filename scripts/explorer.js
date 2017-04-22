console.log("explorer.js injected");
//Import jquery into the page
var jqueryScript = document.createElement("script");
jqueryScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
$("head").append(jqueryScript);

//Import dragdrop script into the page
var dragDropScript = document.createElement("script");
dragDropScript.src = chrome.extension.getURL("scripts/dragdrop.js");
$("head").append(dragDropScript);

//Solution for preventing the extension from styling files
//var fileExtension = window.location.href.split(".").pop();
//if(fileExtension.length != 3 && fileExtension.length != 4){
//    console.log("this is not a file");
//}
//console.log(fileExtension);

//Get existing html elements and give them classes to style them
$("table").addClass('table-striped');
$("table").wrap('<div class="explorer"></div>');
$("table").wrap('<div class="explorer-right"></div>');
$(".explorer").prepend('<div class="explorer-left" ondrop="drop(event)" ondragover="allowDrop(event)"><h3>Quick Access</h2></div>');

//side panel
var quickAccess = $(".explorer-left");
var quickAccessList = document.createElement("ul");
quickAccessList.className = "quick-access-list";
quickAccess.append(quickAccessList);

// Check if any items saved in quick access and update list
if (localStorage.quickAccessJson != null) {
    var items = JSON.parse(localStorage.quickAccessJson);

    items.forEach(function(element) {
        var listItem = document.createElement("li");
        var itemLink = document.createElement("a");
        itemLink.setAttribute("href", element);

        var dirName = element.split("/");
        itemLink.text = dirName[dirName.length - 2];
        listItem.appendChild(itemLink);
        quickAccessList.append(listItem);
    }, this);
}

$(".explorer-right").prepend('<button onclick="javascript:window.history.back()" type="button" class="btn btn-default"><</button><button onclick="javascript:window.history.forward()" type="button" class="btn btn-default">></button><button onclick="listView()" type="button" class="btn btn-default">List</button><button onclick=iconView()" type="button" class="btn btn-default">Icons</button>');

//Adding icons to file entries based on their file extension
var pdfImgUrl = chrome.extension.getURL("styles/img/pdf.png");
var txtImgUrl = chrome.extension.getURL("styles/img/txt.png");
var musicImgUrl = chrome.extension.getURL("styles/img/mp3.png");
var imgImgUrl = chrome.extension.getURL("styles/img/img.png");
$("a.file").each(function(){
    $this = $(this);
    var fileExt = $this[0].href.split(".").pop();
    if (fileExt == "pdf"){  //pdf
        $this.removeClass("file");
        $this.css("background", "url(" + pdfImgUrl + ")");
    }else if(fileExt == "txt"){
        $this.removeClass("file");
        $this.css("background", "url(" + txtImgUrl + ")");
    }else if(fileExt == "mp3"){
        $this.removeClass("file");
        $this.css("background", "url(" + musicImgUrl + ")");
    }else if(fileExt == "png" || fileExt == "jpg" || fileExt == "bmp"){
        $this.removeClass("file");
        $this.css("background", "url(" + imgImgUrl + ")");
    }
});