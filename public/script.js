function getAndUpdate(){
    console.log("Updating List...");
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    document.getElementById('title').value = "";
    priority = document.getElementById('priority').value;
    document.getElementById('description').value = "";

    if (tit.trim() !== "" && desc.trim() !== "") {
        document.getElementById('title').value = "";
        document.getElementById('description').value = "";


    if (localStorage.getItem('itemsJson')==null){
        itemJsonArray = [];
        itemJsonArray.push([tit, desc, priority]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc, priority]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    update();
}

else {
    let popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = "Both title and description are required to add a task.";

    document.body.appendChild(popup);

    setTimeout(function () {
        document.body.removeChild(popup);
    }, 3000);
}
}

function update(){
    if (localStorage.getItem('itemsJson')==null){
        itemJsonArray = []; 
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    } 
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr); 
    }
    // Populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        let priorityColor = getColorByPriority(element[2]);
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td> 
        <td style="background-color: ${priorityColor}; color: #000;">${element[2]}</td>
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
        <td><button class="btn btn-sm btn-primary" onclick="edit(${index})">Edit</button></td> 
        </tr>`; 
    });
    tableBody.innerHTML = str;
}

function getColorByPriority(priority) {
    switch (priority) {
        case 'low':
            return '#c6e5c6';
        case 'medium':
            return '#e0e0b3';
        case 'high':
            return '#e0b3b3';
        default:
            return 'white';
    }
}

add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();

function deleted(itemIndex){
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);

    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}


function edit(itemIndex) {

    let newTitle = prompt("Enter new title:");
    let newDescription = prompt("Enter new description:");

    // Call the edit function with the new data
    editItem(itemIndex, newTitle, newDescription);
}

function edit(itemIndex) {
    document.getElementById("editPopup").style.display = "block";

    window.confirmEdit = function () {
        let newTitle = document.getElementById("newTitle").value;
        let newDescription = document.getElementById("newDescription").value;
        if (newTitle.trim() !== "" && newDescription.trim() !== "") {
        editItem(itemIndex, newTitle, newDescription);
        }
        closeEditPopup();
    };

    window.closeEditPopup = function () {
        document.getElementById("editPopup").style.display = "none";
        delete window.confirmEdit;
        delete window.closeEditPopup;
    };

    document.getElementById('newTitle').value = "";
    document.getElementById('newDescription').value = "";

}

function editItem(itemIndex, newTitle, newDescription) {
    console.log("Edit", itemIndex, newTitle, newDescription);
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);

    // Assuming each item is an array with title at index 0 and description at index 1.
    itemJsonArray[itemIndex][0] = newTitle;
    itemJsonArray[itemIndex][1] = newDescription;

    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

document.getElementById("clear").addEventListener("click", openPopup);

document.getElementById("closePopup").addEventListener("click", closePopup);

document.getElementById("confirmClear").addEventListener("click", function () {
    console.log('Clearing the storage');
    localStorage.clear();
    update(); 
    closePopup();
    
});

