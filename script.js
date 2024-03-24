const addbtn = document.getElementById("AddModal");
const Modal = document.querySelector(".modal");
const closebtn = document.querySelector(".fa-times");
const addbtn2 = document.querySelector(".addExpense");
const addExpense = document.getElementById("AddBtn");
const mainBody = document.getElementById("main");
const category = document.getElementById("Category");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const expenseConatiner = document.getElementById("tbody");
const EditModal = document.querySelector(".EditModal");
const EditDone = document.querySelector(".EditDone");
const deleteBtn = document.querySelector(".fa-trash");
const EditBtn = document.getElementById("Editbtn");
const EditModalDescription = document.getElementById("EditDescription");
const EditModalAmount = document.getElementById("EditAmount");
const EditModalCategory = document.getElementById("EditCategory");
const EditModalDate = document.getElementById("EditDate");
const balance = document.getElementById("balance");
const TotalExpense = document.getElementById("TotalExpense");
const TotalIncome = document.getElementById("TotalIncome");
const AverageExpense = document.getElementById("AverageExpense");

let data = [];

data = JSON.parse(localStorage.getItem("expenseData")) || [];

addbtn.addEventListener("click", () => {
  Modal.style.display = "block";
  mainBody.style.opacity = "0.5";
});

closebtn.addEventListener("click", () => {
  Modal.style.display = "none";
  mainBody.style.opacity = "1";
});

addbtn2.addEventListener("click", () => {
  Modal.style.display = "block";
  mainBody.style.opacity = "0.5";
});

addExpense.addEventListener("click", () => {
  addData();
});

function addData() {
  let descriptionValue = description.value.trim();
  let categoryValue = category.value.trim();
  let amountValue = amount.value.trim();
  let dateValue = date.value.trim();

  if (descriptionValue === "") {
    alert("add description value");
  }
  if (categoryValue === "") {
    alert("add category value");
  }
  if (amountValue === "") {
    alert("add amount");
  }
  if (dateValue === "") {
    alert("add date");
  } else {
    data.push({
      id: data.length + 1,
      description: descriptionValue,
      category: categoryValue,
      amount: amountValue,
      date: dateValue,
    });

    localStorage.setItem("expenseData", JSON.stringify(data));
    listData();
    description.value = "";
    category.value = "";
    amount.value = "";
    date.value = "";
    Modal.style.display = "none";
    mainBody.style.opacity = "1";
  }
}

function listData() {
  let list = "";
  data.forEach((item, index) => {
    list += `
        <tr >
                    <td>${item.amount}</td>
                    <td>${item.category}</td>
                    <td>${item.description}</td>
                    <td>${item.date}</td>
                    <td>
                    <div class="EditDelete">
                    <div>
                      <i class="fa-solid fa-pen"
                      onclick="EditItem(${index})" id="Editbtn"></i>
                    </div>
                    <div>
                      <i class="fa-solid fa-trash"
                      onclick="deleteItem(${index})" ></i>
                    </div>
                  </div>
                    </td>
                    
                  </tr>
        `;
  });
  expenseConatiner.innerHTML = list;
  localStorage.setItem("expenseData", JSON.stringify(data));
  ExpenseOverview();
}

function deleteItem(index) {
  data.splice(index, 1);
  localStorage.setItem("expenseData", JSON.stringify(data));
  listData();
}

function EditItem(index) {
  EditModal.style.display = "flex";
  mainBody.style.opacity = "0.5";

  EditModalAmount.value = data[index].amount;
  EditModalCategory.value = data[index].category;
  EditModalDate.value = data[index].date;
  EditModalDescription.value = data[index].description;

  function hanleEditDone() {
    data[index].description = EditModalDescription.value.trim();
    data[index].category = EditModalCategory.value.trim();
    data[index].amount = EditModalAmount.value.trim();
    data[index].date = EditModalDate.value.trim();

    localStorage.setItem("expenseData", JSON.stringify(data));
    console.log(data);
    listData();
    EditModal.style.display = "none";
    mainBody.style.opacity = "1";
    EditDone.removeEventListener("click", hanleEditDone);
  }
  EditDone.addEventListener("click", hanleEditDone);
}

function ExpenseOverview() {
  let sum = 0;
  let avg = 0;
  let n = data.length;
  data.forEach((item, index) => {
    sum += parseFloat(item.amount);
    avg = sum / n;
  });
  TotalExpense.innerText = `$${sum.toFixed(2)}`;
  AverageExpense.innerText = `$${avg.toFixed(2)}`
}

listData();
