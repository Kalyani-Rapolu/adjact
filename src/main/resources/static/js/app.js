let currentEmployees = [...mockEmployees];
const perPage = 2;
let currentPage = 1;

function displayEmployees(data) {
  const container = document.getElementById('employee-list-container');
  container.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const paginated = data.slice(start, start + perPage);

  paginated.forEach(emp => {
    const div = document.createElement("div");
    div.className = "employee-card";
    div.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    container.appendChild(div);
  });

  renderPagination(data);
}

function renderPagination(data) {
  const totalPages = Math.ceil(data.length / perPage);
  const pagination = document.getElementById('pagination-controls');
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.onclick = () => {
      currentPage = i;
      displayEmployees(currentEmployees);
    };
    pagination.appendChild(btn);
  }
}

function deleteEmployee(id) {
  currentEmployees = currentEmployees.filter(emp => emp.id !== id);
  displayEmployees(currentEmployees);
}

function toggleFilter() {
  const box = document.getElementById('filterBox');
  box.style.display = box.style.display === "none" ? "block" : "none";
}

function applyFilter() {
  const first = document.getElementById('filterFirstName').value.toLowerCase();
  const dept = document.getElementById('filterDepartment').value.toLowerCase();
  const role = document.getElementById('filterRole').value.toLowerCase();

  currentEmployees = mockEmployees.filter(emp =>
    (!first || emp.firstName.toLowerCase().includes(first)) &&
    (!dept || emp.department.toLowerCase().includes(dept)) &&
    (!role || emp.role.toLowerCase().includes(role))
  );

  currentPage = 1;
  displayEmployees(currentEmployees);
}

document.getElementById('searchInput').addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  currentEmployees = mockEmployees.filter(emp =>
    emp.firstName.toLowerCase().includes(query) ||
    emp.lastName.toLowerCase().includes(query) ||
    emp.email.toLowerCase().includes(query)
  );
  currentPage = 1;
  displayEmployees(currentEmployees);
});

document.getElementById('sortSelect').addEventListener('change', e => {
  const val = e.target.value;
  currentEmployees.sort((a, b) => a[val].localeCompare(b[val]));
  displayEmployees(currentEmployees);
});

window.onload = () => {
  displayEmployees(currentEmployees);
};
