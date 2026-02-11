const form = document.getElementById("appForm");
const tableBody = document.getElementById("tableBody");
const submitBtn = document.getElementById("submitBtn");

let applications = JSON.parse(localStorage.getItem("apps")) || [];
let editIndex = -1;


/* ========= SAVE STORAGE ========= */
function saveToStorage() {
  localStorage.setItem("apps", JSON.stringify(applications));
}


/* ========= RENDER TABLE ========= */
function render() {
  tableBody.innerHTML = "";

  applications.forEach((app, index) => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${app.company}</td>
      <td>${app.role}</td>
      <td>${app.stage}</td>
      <td>${app.result}</td>
      <td>${app.date}</td>
      <td>
        <button onclick="editApp(${index})">Edit</button>
        <button onclick="deleteApp(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  updateSummary();
}


/* ========= ADD / UPDATE ========= */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const appData = {
    company: company.value,
    role: role.value,
    stage: stage.value,
    result: result.value,
    date: date.value
  };

  // UPDATE MODE
  if (editIndex !== -1) {
    applications[editIndex] = appData;
    editIndex = -1;
    submitBtn.textContent = "Add Application";
  }
  // ADD MODE
  else {
    applications.push(appData);
  }

  saveToStorage();
  render();
  form.reset();
});


/* ========= DELETE ========= */
function deleteApp(index) {
  applications.splice(index, 1);
  saveToStorage();
  render();
}


/* ========= EDIT ========= */
function editApp(index) {
  const app = applications[index];

  company.value = app.company;
  role.value = app.role;
  stage.value = app.stage;
  result.value = app.result;
  date.value = app.date;

  editIndex = index;
  submitBtn.textContent = "Update Application";
}


/* ========= SUMMARY ========= */
function updateSummary() {
  document.getElementById("total").textContent = applications.length;

  document.getElementById("interviews").textContent =
    applications.filter(a => a.stage === "Interview").length;

  document.getElementById("offers").textContent =
    applications.filter(a => a.stage === "Offer").length;

  document.getElementById("rejected").textContent =
    applications.filter(a => a.result === "Rejected").length;
}


/* ========= INITIAL LOAD ========= */
render();
