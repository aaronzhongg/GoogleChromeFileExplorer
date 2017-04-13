console.log("this is injected");


console.log("DOM fully loaded and parsed");
var test = document.createElement("tr");
var testNode = document.createElement("td");
testNode.dataset.value = "TESTERINO";
test.appendChild(testNode);
test.appendChild(testNode);
test.appendChild(testNode);

var table = document.getElementById("tbody");
table.appendChild(test);
