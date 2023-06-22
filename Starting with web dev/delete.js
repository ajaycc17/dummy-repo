var form = document.getElementById("addForm");
var itemList = document.getElementById("items");

// Form submit event
form.addEventListener("submit", addItem);
// Delete event
itemList.addEventListener("click", removeItem);

// Add item
function addItem(e) {
    e.preventDefault();

    // Get input value
    var newItem = document.getElementById("item").value;

    // Create new li element
    var li = document.createElement("li");
    // Add class
    li.className = "list-group-item d-flex justify-content-between";
    // Add text node with input value
    li.appendChild(document.createTextNode(newItem));

    // create a new div
    var btnDiv = document.createElement("div");

    // Create del and edit button element
    var deleteBtn = document.createElement("button");
    var editBtn = document.createElement("button");

    // Add classes to del and edit button
    deleteBtn.className = "btn btn-danger btn-sm delete";
    editBtn.className = "btn btn-success btn-sm edit me-1";

    // Append text node
    editBtn.appendChild(document.createTextNode("Edit"));
    deleteBtn.appendChild(document.createTextNode("X"));

    // add btns to btnDiv
    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(deleteBtn);

    // Append button to li
    li.appendChild(btnDiv);

    // Append li to list
    itemList.appendChild(li);
}

// Remove item
function removeItem(e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are You Sure?")) {
            var li = e.target.parentElement.parentElement;
            itemList.removeChild(li);
        }
    }
}
