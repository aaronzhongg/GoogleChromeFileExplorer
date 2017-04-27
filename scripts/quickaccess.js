/**
 * dragdrop.js
 * 
 * Injects html elements for explorer-left
 * Functionality and styling for quick-access
 */

var quickAccessPanel = '<div class="quick-access-panel" ondrop="drop(event)" ondragover="allowDrop(event)"><h3>Quick Access</h2> </div>';
var removePanel = '<div class="remove-panel" ondrop="removeItem(event)" ondragover="allowDrop(event)">REMOVE FROM QUICK ACCESS</div>'
 
//side panel
var explorerLeft = $(".explorer-left");
explorerLeft.append(quickAccessPanel);
explorerLeft.append(removePanel);

quickAccessPanel = $('.quick-access-panel');
var quickAccessList = document.createElement("div");
quickAccessList.className = "list-group";
quickAccessList.className = "quick-access-list";
quickAccessPanel.append(quickAccessList);

refreshQuickAccess();

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log(ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data);
    var quickAccessItems;

    if (localStorage.quickAccessJson != null) {
        quickAccessItems = JSON.parse(localStorage.quickAccessJson);
    } else {
        quickAccessItems = [];
    }
    
    if (!quickAccessItems.includes(data) && data != "file:///"){
        quickAccessItems.push(data); 
        localStorage.quickAccessJson = JSON.stringify(quickAccessItems);
        
        refreshQuickAccess();
    }
}

// Re-populate items in quick access panel after adding or remove items
function refreshQuickAccess() {
    var quickAccessList = $(".quick-access-list");
    quickAccessList.empty();
    if (localStorage.quickAccessJson != null) {
        var items = JSON.parse(localStorage.quickAccessJson);

        items.forEach(function(element) {
            var listItem = document.createElement("a");
            listItem.className = "list-group-item";
            listItem.setAttribute("href", element);
            listItem.setAttribute("ondragstart", "showRemove()");
            listItem.setAttribute("ondragend", "hideRemove()");

            var dirName = element.split("/");
            if(dirName[dirName.length-1].length == 0){
                //it is a folder
                listItem.text = decodeURIComponent(dirName[dirName.length - 2]);
            }else{
                //it is a file
                listItem.text = decodeURIComponent(dirName[dirName.length - 1]);
            }
            
            listItem.id = element;
            quickAccessList.append(listItem);
        }, this);
    }
}

// Remove item from quick access panel
function removeItem(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data);
    var quickAccessItems;
    if (localStorage.quickAccessJson != null) {
        quickAccessItems = JSON.parse(localStorage.quickAccessJson);
    } else {
        quickAccessItems = [];
    }

    if (quickAccessItems.includes(data)){
        var index = quickAccessItems.indexOf(data);
        console.log(index);
        if (index > -1) {
            quickAccessItems.splice(index, 1);
            localStorage.quickAccessJson = JSON.stringify(quickAccessItems);
            refreshQuickAccess();
        }
    }
}

// Hide and show quick access remove panel 
function showRemove() {
    $('.remove-panel').show();
}

function hideRemove() {
    $('.remove-panel').hide();
}