// localStorage.setItem('items', 5);
let itemsArray = localStorage.getItem('items') ?
JSON.parse(localStorage.getItem('items')) : [];

window.onload = function() {
    if(itemsArray.length > 0) {
        itemsArray.forEach(item => {
            var itemDiv = document.createElement("div");
            itemDiv.className = "itemContainer";
            var idx = item.id;
            itemDiv.id = idx;
            var iTitle = item.title;
            var iDate = item.date;
            var iContent = item.content;

            var tElm = getTitle(iTitle);
            var dElm = getDate(iDate);
            var cElm = getContent(iContent);
            var deleteBtn = getDeleteB(idx);
            var editBtn = getEditB(idx);

            itemDiv.appendChild(tElm);
            itemDiv.appendChild(dElm);
            itemDiv.appendChild(cElm);
            itemDiv.appendChild(deleteBtn);
            itemDiv.appendChild(editBtn);

            document.getElementById("itemsContainer").appendChild(itemDiv);
        })
    }
};

function addItem() {
    var itemDiv = document.createElement("div");
    itemDiv.className = "itemContainer";
    var idx = Math.random().toString(32).slice(2);
    itemDiv.id = idx;
    var iTitle = document.getElementById("itemTitle");
    var iDate = document.getElementById("itemDate");
    var iContent = document.getElementById("itemContent");

    var iT = getTitle(iTitle.value);
    var iD = getDate(iDate.value);
    var iC = getContent(iContent.value);

    if(titleNotEmpty(iT.innerHTML) && dateNotEmpty(iD.innerHTML) && contentNotEmpty(iC.innerHTML)){
        itemDiv.appendChild(iT);
        itemDiv.appendChild(iD);
        itemDiv.appendChild(iC);

        //Save into local storage
        var todoData = {id: idx, title: iT.innerHTML, date: iD.innerHTML, content: iC.innerHTML};
        itemsArray.push(todoData);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        // console.log(localStorage.getItem('items'));

        var deleteBtn = getDeleteB(idx);
        var editBtn = getEditB(idx);

        itemDiv.appendChild(deleteBtn);
        itemDiv.appendChild(editBtn);
    
        document.getElementById("itemsContainer").appendChild(itemDiv);

        //Clear input fields, keep date autofill.
        iTitle.value = "";
        iContent.value = "";

    } else {
        alert("Please make sure title, date, and content values are filled");
    }
}

function getTitle(iTitle) {
    var itemTitle = document.createTextNode(iTitle);
    var iTitle = document.createElement("h3");
    iTitle.className = "itemTitle";
    iTitle.appendChild(itemTitle);

    return iTitle;
}

function getDate(iDate) {    
    var itemDate = document.createTextNode(iDate);
    var iDate = document.createElement("p");
    iDate.className = "itemDate";
    iDate.appendChild(itemDate);

    return iDate;
}

function getContent(iContent) {
    var itemContent = document.createTextNode(iContent);
    var iContent = document.createElement("p");
    iContent.className = "itemContent";
    iContent.appendChild(itemContent);

    return iContent;
}

function dateNotEmpty(d) {
    return d !== "";
}

function titleNotEmpty(t) {
    return t !== "";
}

function contentNotEmpty(c) {
    return c !== "";
}

function getDeleteB(idx) {
    var btn = document.createElement("button");
    btn.className = "deleteBtn";
    btn.id = idx;
    var dTxt = document.createTextNode("Delete");
    btn.appendChild(dTxt);

    btn.addEventListener('click', (e) => {
        deleteItem(idx);
    })

    return btn;
}

function getEditB(idx) {
    var btn = document.createElement("button");
    btn.className = "editBtn";
    btn.id = idx;
    var dTxt = document.createTextNode("Edit");
    btn.addEventListener('click', (e) => {
        editItem(idx);
    })
    btn.appendChild(dTxt);

    return btn;
}

function deleteItem(idx) {
    //Grab local storage
    var items = JSON.parse(localStorage.getItem('items'));
    //If there are items in the storage array
    if(items !== null) {
        //Remove item of index = idx from storage
        var filtered = items.filter(item => item.id !== idx);
        //Update storage
        localStorage.setItem('items', JSON.stringify(filtered));

        //Remove item todo element from displaying to user
        var element = document.getElementById(idx);
        element.remove();
    }
}

function editItem(idx) {
    createModal(idx);
}