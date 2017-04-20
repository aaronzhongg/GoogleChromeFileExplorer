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
