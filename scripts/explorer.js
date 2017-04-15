console.log("explorer.js injected");

//Get existing html elements and give them classes to style them
$("table").addClass('table-striped');
$("table").wrap('<div class="explorer-right"></div>');
$("body").append('<div class="explorer-left"></div>')

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
