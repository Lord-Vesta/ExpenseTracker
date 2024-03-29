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
const addIncome = document.getElementById("AddIncome");
const addExpenses = document.getElementById("AddExpenses");
const dropdownCateogry = document.querySelectorAll(".category1");

let data = { expenseData: [], incomeData: [], transaction: [] };

data = JSON.parse(localStorage.getItem("Data")) || {
  expenseData: [],
  incomeData: [],
  transaction: [],
};

// for modal display
addbtn.addEventListener("click", () => {
  Modal.style.display = "block";
  mainBody.style.opacity = "0.5";
});

// to close modal
closebtn.addEventListener("click", () => {
  Modal.style.display = "none";
  mainBody.style.opacity = "1";
  addExpenses.style.backgroundColor = "white";
  addExpenses.style.color = "#163a5f";
  addIncome.style.backgroundColor = "white";
  addIncome.style.color = "#163a5f";
  addExpense.innerText = "Add";
});

// for modal display
addbtn2.addEventListener("click", () => {
  Modal.style.display = "block";
  mainBody.style.opacity = "0.5";
});

// to add expenses
addExpenses.addEventListener("click", () => {
  console.log("inside addexpense");
  addIncome.style.backgroundColor = "white";
  addIncome.style.color = "#163a5f";
  addExpenses.style.backgroundColor = "#163a5f";
  addExpenses.style.color = "white";
  addExpense.innerText = "Add Expense";
  let i = 0;
  addExpense.addEventListener("click", () => {
    addData();
    addExpenses.style.backgroundColor = "white";
    addExpenses.style.color = "#163a5f";
    addIncome.style.backgroundColor = "white";
    addIncome.style.color = "#163a5f";
    addExpense.innerText = "Add";
  });
});

// to add income
addIncome.addEventListener("click", () => {
  addExpenses.style.backgroundColor = "white";
  addExpenses.style.color = "#163a5f";
  addIncome.style.backgroundColor = "#163a5f";
  addIncome.style.color = "white";
  addExpense.innerText = "Add Income";
  addExpense.addEventListener("click", () => {
    data.incomeData.push({
      income: amount.value.trim(),
      category: category.value.trim(),
      description: description.value.trim(),
      date: date.value.trim(),
    });
    localStorage.setItem("Data", JSON.stringify(data));
    description.value = "";
    category.value = "";
    amount.value = "";
    date.value = "";
    Modal.style.display = "none";
    mainBody.style.opacity = "1";
    // console.log(income);
    ExpenseOverview();
    showtransaction();
  });
});

function addData() {
  console.log("inside add btn");
  let descriptionValue = description.value.trim();
  let categoryValue = category.value.trim();
  let amountValue = amount.value.trim();
  let dateValue = date.value.trim();
  // console.log(descriptionValue);
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
    console.log(data.expenseData);
    data.expenseData.push({
      id: data.expenseData.length + 1,
      description: descriptionValue,
      category: categoryValue,
      amount: amountValue,
      date: dateValue,
    });

    localStorage.setItem("Data", JSON.stringify(data));
    listData();
    console.log(data);
    description.value = "";
    category.value = "";
    amount.value = "";
    date.value = "";
    Modal.style.display = "none";
    mainBody.style.opacity = "1";
    ExpenseOverview();
  }
}

function listData() {
  let list = "";
  data.expenseData.forEach((item, index) => {
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
  localStorage.setItem("Data", JSON.stringify(data));
  showtransaction();
}

function deleteItem(index) {
  data.expenseData.splice(index, 1);
  localStorage.setItem("Data", JSON.stringify(data));
  listData();
}

function EditItem(index) {
  EditModal.style.display = "flex";
  mainBody.style.opacity = "0.5";

  EditModalAmount.value = data.expenseData[index].amount;
  EditModalCategory.value = data.expenseData[index].category;
  EditModalDate.value = data.expenseData[index].date;
  EditModalDescription.value = data.expenseData[index].description;

  function hanleEditDone() {
    data.expenseData[index].description = EditModalDescription.value.trim();
    data.expenseData[index].category = EditModalCategory.value.trim();
    data.expenseData[index].amount = EditModalAmount.value.trim();
    data.expenseData[index].date = EditModalDate.value.trim();

    localStorage.setItem("Data", JSON.stringify(data));
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
  let inc = 0;
  let balanceamt = 0;
  let n = data.expenseData.length;
  data.expenseData.forEach((item) => {
    sum += parseFloat(item.amount);
    avg = sum / n;
  });
  data.incomeData.forEach((item) => {
    inc += parseFloat(item.income);
  });
  balanceamt = parseFloat(inc - sum);

  data.transaction.push({
    totalExpense: sum.toFixed(2),
    averageExpense: avg.toFixed(2),
    totalincome: inc.toFixed(2),
    balance: balanceamt.toFixed(2),
  });
  localStorage.setItem("data", JSON.stringify(data));

  // console.log(data.transaction);
}

function showtransaction() {
  data.transaction.forEach((list) => {
    TotalExpense.innerText = `$${list.totalExpense}`;
    AverageExpense.innerText = `$${list.averageExpense}`;
    TotalIncome.innerText = `$${list.totalincome}`;
    balance.innerText = `$${list.balance}`;
  });
}

listData();
showtransaction();
