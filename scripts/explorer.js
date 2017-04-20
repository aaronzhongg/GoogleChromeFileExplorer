console.log("explorer.js injected");

//Import jquery into the page
var jqueryScript = document.createElement("script");
jqueryScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
$("head").append(jqueryScript);

//Solution for preventing the extension from styling files
//var fileExtension = window.location.href.split(".").pop();
//if(fileExtension.length != 3 && fileExtension.length != 4){
//    console.log("this is not a file");
//}
//console.log(fileExtension);

//Get existing html elements and give them classes to style them
$("table").addClass('table-striped');
// $("#header").addClass('content');
$("table").wrap('<div class="explorer"></div>');
$("table").wrap('<div class="explorer-right"></div>');
$("h1").wrap('')
$(".explorer").prepend('<div class="explorer-left">Side Panel</div>');
$(".explorer-right").prepend('<button onclick="back()" type="button" class="btn btn-default"><</button><button onclick=forward()" type="button" class="btn btn-default">></button><button onclick="listView()" type="button" class="btn btn-default">List</button><button onclick=iconView()" type="button" class="btn btn-default">Icons</button>')

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


// $(".content").wrapAll("explorer");
// console.log("DOM fully loaded and parsed");
// var test = document.createElement("tr");
// var testNode = document.createElement("td");
// testNode.dataset.value = "TESTERINO";
// test.appendChild(testNode);
// var testNode1 = document.createElement("td");
// testNode1.dataset.value = "TESTERINO";
// test.appendChild(testNode1);
// var testNode2 = document.createElement("td");
// testNode2.dataset.value = "TESTERINO";
// test.appendChild(testNode2);
// console.log(test);
// var table = document.getElementById("tbody");
// table.appendChild(test);
