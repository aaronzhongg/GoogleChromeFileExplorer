/**
 * explorer.js 
 * 
 * Injects sripts
 * Layout html elements
 */
console.log("explorer.js injected");

console.log("initialising document array object");
var documentArrayObject = [];

//Import jquery into the page
var jqueryScript = document.createElement("script");
jqueryScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
$("head").append(jqueryScript);

//Import dragdrop script into the page
var dragDropScript = document.createElement("script");
dragDropScript.src = chrome.extension.getURL("scripts/quickaccess.js");
$("head").append(dragDropScript);

$("table").addClass('table table-condensed');
$("table").attr("id", "myTable"); //change name to something meaningful

// $("#header").addClass('content');
$("table").wrap('<div class="explorer"></div>');
$("table").wrap('<div class="explorer-right"></div>');
$("h1").wrap('');
$(".explorer").wrap('<div class="explorer-container"></div>');
$(".explorer-container").wrap('<div class="container"></div>');
var path_name = $('#header').text();
$("#header").remove();
$(".explorer").prepend('<div class="explorer-left"></div>');
$(".explorer").prepend('<div class="topbar"></div>');
$(".explorer").prepend('<div class="title"><h1><b>Chrome File Explorer</b></h1></div>');
$("table").wrap('<div id="main-container"></div>');
$("#main-container").append("<div id='icon-container'> </div>");

var imgURL = chrome.extension.getURL("styles/img/bg-blur.jpg");
$("body").css({'background-image': 'url:('+ imgURL + ') !important'});

//Get button icon urls
var backwardImgUrl = chrome.extension.getURL("styles/img/backward.png");
var forwardImgUrl = chrome.extension.getURL("styles/img/forward.png");
var listImgUrl = chrome.extension.getURL("styles/img/list.png");
var iconImgUrl = chrome.extension.getURL("styles/img/icon.png");

//initialise all action buttons {sort, icon, list , etc)}
var buttonLeftArrow = '<button id="backward-button" onclick="javascript: window.history.back()" type="button" class="btn"> <img src= "'+ backwardImgUrl +'" width="24" height="24" alt="backward" /></button>';
var buttonRightArrow = '<button id="forward-button" onclick="javascript: window.history.forward()" type="button" class="btn">  <img src= "'+ forwardImgUrl +'" width="24" height="24" alt="backward" /> </button>';
var buttonList = '<button id="list-button" type="button" class="btn"><img src= "'+ listImgUrl +'" width="24" height="24" alt="backward" /></button>';
var buttonIcons = '<button id="icon-button" type="button" class="btn"><img src= "'+ iconImgUrl +'" width="24" height="24" alt="backward" /></button>';
var sortButtons = "<button id='namesort-button' type='button' class='btn'> Name </button><button id='sizesort-button' type='button' class='btn'> Size </button><button id='datesort-button' type='button' class='btn'> Date </button>";
var pathfield = '<input type="text" id="path_field" placeholder=" ' + path_name +'" disabled>';
$(".topbar").prepend(buttonLeftArrow + buttonRightArrow + pathfield + buttonList + buttonIcons + "   Sort By: " + sortButtons);
