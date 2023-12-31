var items = localStorage.getItem('items');
function createModal(idx) {
    var modalC = document.createElement("div");
    modalC.id = "modalContainer";

    if(modalC.childNodes.length > 0) {
        modalC.innerHTML = "";
    };

    var data = getValues(idx);
    var a = data[1];
    var idx = data[0];

    var m = document.createElement("div");
    m.id = "editForm";

    var mInput = document.createElement("div")
    mInput.id = "editFormInputDiv";

    var mButton = document.createElement("div")
    mButton.id = "editFormBtnDiv"

    m.appendChild(mInput);
    m.appendChild(mButton);

    var it = document.createElement("input");
    it.type = "text";
    it.id = "itemTitle";
    it.value = a.title;
    var itChange = it.value;
    it.addEventListener("keyup", () =>{
        itChange = it.value;
    })
    mInput.appendChild(it);

    var id = document.createElement("input");
    id.type = "date";
    id.id = "itemDate";
    id.value = a.date;
    var idChange = id.value;
    id.addEventListener("change", () => {
        idChange = id.value;
    })
    mInput.appendChild(id);

    var ic = document.createElement("input");
    ic.type = "text";
    ic.id = "itemContent";
    ic.value = a.content;
    var icChange = ic.value;
    ic.addEventListener("keyup", () => {
        icChange = ic.value;
    })
    mInput.appendChild(ic);

    var saveBtn = document.createElement("button");
    saveBtn.id = "saveBtn";
    saveBtn.innerText = "Save";
    saveBtn.addEventListener("click", () => {
        var t = itChange;
        var c = icChange;
        var d = idChange;

        //Update local storage
        updateStorage(idx, t, d, c);
        
        //Update item display
        updateItem(idx);

        //Remove modal display
        document.getElementById("modalContainer").remove();

        //Enable scroll again
        enableScroll();
    })
    mButton.appendChild(saveBtn);

    modalC.appendChild(m);

    document.body.appendChild(modalC);

    disableScroll();
}

function getValues(idx) {
    var allData = JSON.parse(localStorage.getItem("items"));
    var i = 0;

    while(allData[i].id !== idx) {
        i++;
    }

    var data = [i, allData[i]];

    return data;
}

function updateStorage(idx, t, d, c) {
    var data = JSON.parse(localStorage.getItem("items"));
    var newData = {id: data[idx].id, title: t, date: d, content: c};
    data[idx] = newData;

    localStorage.setItem("items", JSON.stringify(data));
}

function updateItem(idx) {
    var s = JSON.parse(localStorage.getItem("items"))[idx];
    var elementContainer = document.getElementById(s.id);

    elementContainer.getElementsByClassName("itemTitle")[0].innerHTML = s.title;
    elementContainer.getElementsByClassName("itemDate")[0].innerHTML = s.date;
    elementContainer.getElementsByClassName("itemContent")[0].innerHTML = s.content;
}

function disableScroll() {
    var yVal = window.scrollY
    // if user scrolling is attempted, set this to the previous value
    console.log(yVal);
    window.scrollTo({top: yVal})
    window.onscroll = function() {
        // window.scrollTo(window.scrollX, window.scrollY);
        window.scrollTo(0, yVal);
    };

    //Set modal new top value to be based on yVal vertical scroll value
    if(document.getElementById("modalContainer") !== null) {
        document.getElementById("modalContainer").style.top = yVal + 'px';
    }
}

function enableScroll() {
    window.onscroll = function () {};
}