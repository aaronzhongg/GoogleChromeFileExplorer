/**
 * viewtoggle.js
 * 
 * Functionality and styling for icon/list views
 */

//Adding icons to file entries based on their file extension
var pdfImgUrl = chrome.extension.getURL("styles/img/pdf.png");
var txtImgUrl = chrome.extension.getURL("styles/img/txt.png");
var musicImgUrl = chrome.extension.getURL("styles/img/mp3.png");
var imgImgUrl = chrome.extension.getURL("styles/img/img.png");

//addding icons for IconView (most are png files with 256x256 dimensions)
var folderImgUrl = chrome.extension.getURL("styles/img/folder-icon.png");
var blankImgUrl = chrome.extension.getURL("styles/img/blank-icon.png");
var mp3ImgUrl = chrome.extension.getURL("styles/img/mp3-icon.png");
var imgImg256Url = chrome.extension.getURL("styles/img/img-icon.png");
var upFolderUrl = chrome.extension.getURL("styles/img/up-folder-icon.png");
var pdfImg256Url = chrome.extension.getURL("styles/img/pdf-icon.png");
var txtImg256Url = chrome.extension.getURL("styles/img/txt-icon.png");

//Inserting icons for list view based on file type
$("a.file").each(function(){
    $this = $(this);
    var fileExt = $this[0].href.split(".").pop();

    //First remove existing background then replace with the icon
    if (fileExt == "pdf"){
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


//function for list view. Uses session storage to persist view type through navigation. (session storage only persist until user closes the tab)
//The function hides list view when icon view is selected and vice versa. 
$("#list-button").click(function(){
	$("#list-button").css({"background-color": "#e7e7e7 "});
	$("#icon-button").css({"background-color": "#fff "});
    console.log("list view");
    sessionStorage.viewType = "list";
    
    if($("#myTable").hasClass("hide")){
        $("#myTable").removeClass("hide");
    };

    if(!$("#icon-container").hasClass("hide")){
        $("#icon-container").addClass("hide")
    };
    
});

//hides list view and display icon view. 
//icon view is displayed by collecting table data from list view and converting it into document objects. The objects are then translanted into icon views. 
$("#icon-button").click(function(){
	$("#icon-button").css({"background-color": "#e7e7e7"});
	$("#list-button").css({"background-color": "#fff"});
    console.log("icon view");
    sessionStorage.viewType = "icon";
    //hide table view

    if(!$("#myTable").hasClass("hide")){
        $("#myTable").addClass("hide");
    };

    if($("#icon-container").hasClass("hide")){
        $("#icon-container").removeClass("hide")
    }

    //this function converts list view table data into document objects for icon view.
    convertToDocumentArray();

    var updateString = "<div class='flex-container'>"

    for(var i = 0; i < documentArrayObject.length; i++){
        //this display size and date modified to user when they hover onto this document/file.
        var icon = "<a data-toggle='tooltip' data-html='true' title='" + 'Size: ' + documentArrayObject[i].documentSize + "&#013;&#010;Date Modified: " + documentArrayObject[i].documentDateModified + "'" + "href='" + documentArrayObject[i].documentLink + "'>" + "<div class='flex-item'>";
        //parse name and check what extension

        //custom file ext checker (can be modified to cover more file extensions);
        var iconExtension = checkExtension(documentArrayObject[i].documentName);
        //add folder icon.
        if(iconExtension == "folder"){
            icon += "<img class='icon-img' src='" + folderImgUrl +"'/>";
        } else if(iconExtension == "others"){
            icon += "<img class='icon-img' src='" + blankImgUrl +"'/>";
        } else {
            switch(iconExtension){
                case "img":
                    icon += "<img class='icon-img' src='" + imgImg256Url +"'/>";
                    break;
                case "music":
                    icon += "<img class='icon-img' src='" + mp3ImgUrl +"'/>";
                    break;
                case "pdf":
                    icon += "<img class='icon-img' src='" + pdfImg256Url +"'/>";
                    break;
                case "txt":
                    icon += "<img class='icon-img' src='" + txtImg256Url +"'/>";
                    break;
                case "parent_directory":
                    icon += "<img class='icon-img' src='" + upFolderUrl +"'/>";
                    break;
            }
        }
        

        icon += "<p class='flex-text' align='center'>" + documentArrayObject[i].documentName + "</p></div></a>";
        updateString += icon;
    }

    updateString += "</div>";
    console.log(updateString);
    $("#icon-container").html(updateString);
});

//uses the default javascript:tablesort function. This act as a middle-man to silent-click the respective theader.
$("#namesort-button").click(function(){
    $("#theader").find("th").eq(0).click();
    if(sessionStorage.viewType === "icon"){
        // i need to refresh the document array.
        $("#icon-button").click(); //silent click to refresh.
    };
});
$("#sizesort-button").click(function(){
    $("#theader").find("th").eq(1).click()
    if(sessionStorage.viewType === "icon"){
        // i need to refresh the document array.
        $("#icon-button").click(); //silent click to refresh.
    };
});
$("#datesort-button").click(function(){
    $("#theader").find("th").eq(2).click()
    if(sessionStorage.viewType === "icon"){
        // i need to refresh the document array.
        $("#icon-button").click(); //silent click to refresh.
    };
});


//this function convert list documents into document object for icon view.
function convertToDocumentArray(){
    documentArrayObject = []; //reset array
    var size=document.getElementById("tbody").rows.length;
      for(i=0; i<size; i++){
        var row=document.getElementById("tbody").rows[i];
        var documentObject = {
            'documentName' : $(row.cells[0]).children("a").html(),
            'documentLink' : $(row.cells[0]).children("a").attr("href"),
            'documentSize' : row.cells[1].innerHTML,
            'documentDateModified' : row.cells[2].innerHTML
        }
        console.log("Created object. Now pushing onto array stack...");
        documentArrayObject.push(documentObject);
        //var i = {Name:row[0], Config.Msi:row[0], Size:row[0], Date-Modified:row[0]};
      }
}

function checkExtension(documentName){
    //check if its a folder path.
    if(documentName[documentName.length-1] === "/"){
        console.log("it's folder");
        return "folder";
    } else {
        //not folder. check extension type.
        var extension = documentName.split(".").pop(); //lastone will be the doc type.

        switch(extension.toLowerCase()){
            case "pdf":
                return "pdf";
            case "txt":
                return "txt";
            case "mp3":
                return "music";
            case "png":
                return "img";
            case "jpg":
                return "img";
            case "jpeg":
                return "img";
            case "[parent directory]":
                return "parent_directory";
            default: 
                return "others";
        };

    }
}


//At the end of script to check which viewType user is currently on. default = list
if(sessionStorage.viewType === "undefined"){
    sessionStorage.viewType = "list";
} else if(sessionStorage.viewType === "list"){
    $("#list-button").click();
} else if(sessionStorage.viewType === "icon"){
    $("#icon-button").click();
}
