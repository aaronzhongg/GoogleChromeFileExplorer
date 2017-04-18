console.log("explorer.js injected");

//Import jquery into the page
var jqueryScript = document.createElement("script");
jqueryScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
$("head").append(jqueryScript);


//Get existing html elements and give them classes to style them
$("table").addClass('table-striped');
// $("#header").addClass('content');
$("table").wrap('<div class="explorer"></div>');
$("table").wrap('<div class="explorer-right"></div>');
$("h1").wrap('');
$(".explorer").prepend('<div class="explorer-left">Side Panel</div>');
$(".explorer-right").prepend('<button onclick="javascript:window.history.back()" type="button" class="btn btn-default"><</button><button onclick="javascript:window.history.forward()" type="button" class="btn btn-default">></button><button onclick="listView()" type="button" class="btn btn-default">List</button><button onclick=iconView()" type="button" class="btn btn-default">Icons</button>');

//This was the implementation of the back button but a better way was found
//var script = document.createElement("script");
//script.type = "text/javascript";
//script.text = "function back(){" +
//    "var backName = $(\"td:first \").children()[0].outerText;" +
//    "console.log(backName);" +
//    "if (backName == \"[parent directory]\"){" +
//        "var link =  $(\"td:first\").children()[0].href;" +
//        "window.location.href = link;}}";
//
//console.log(script);
//$("body").append(script);


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
