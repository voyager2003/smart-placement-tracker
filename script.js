const form = document.getElementById("appForm");
const tableBody = document.getElementById("tableBody");

let applications = JSON.parse(localStorage.getItem("apps")) || [];


/* ========== SAVE TO STORAGE ========== */
function saveToStorage() {
    localStorage.setItem("apps", JSON.stringify(applications));
}


/* ========== RENDER LIST ========== */
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
            <td><button onclick="deleteApp(${index})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });

    updateSummary();
}


/* ========== ADD APPLICATION ========== */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const app = {
        company: company.value,
        role: role.value,
        stage: stage.value,
        result: result.value,
        date: date.value
    };

    applications.push(app);

    saveToStorage();
    render();
    form.reset();
});


/* ========== DELETE ========== */
function deleteApp(index) {
    applications.splice(index, 1);
    saveToStorage();
    render();
}


/* ========== SUMMARY ========== */
function updateSummary() {

    document.getElementById("total").textContent = applications.length;

    document.getElementById("interviews").textContent =
        applications.filter(a => a.stage === "Interview").length;

    document.getElementById("offers").textContent =
        applications.filter(a => a.stage === "Offer").length;

    document.getElementById("rejected").textContent =
        applications.filter(a => a.result === "Rejected").length;
}


/* ========== LOAD ON START ========== */
render();
