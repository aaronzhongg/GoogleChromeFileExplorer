function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var quickAccessItems;

    if (localStorage.quickAccessJson != null) {
        quickAccessItems = JSON.parse(localStorage.quickAccessJson);
    } else {
        quickAccessItems = [];
    }

    quickAccessItems.push(data); 
    localStorage.quickAccessJson = JSON.stringify(quickAccessItems);
    
    refreshQuickAccess();
}

function refreshQuickAccess() {
    var quickAccessList = $(".quick-access-list");
    quickAccessList.empty();
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
}