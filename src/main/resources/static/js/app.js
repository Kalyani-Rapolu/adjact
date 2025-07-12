let employees = [...mockEmployees];
let currentPage = 1;
let itemsPerPage = 10;

document.addEventListener('DOMContentLoaded', () => {
  renderEmployeeList();
  setupSearch();
});

function renderEmployeeList() {
  const container = document.getElementById('employee-list-container');
  container.innerHTML = '';

  const paginatedEmployees = getPaginatedEmployees();
  paginatedEmployees.forEach(emp => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    container.appendChild(card);
  });

  renderPagination();
}

function deleteEmployee(id) {
  employees = employees.filter(emp => emp.id !== id);
  renderEmployeeList();
}

function editEmployee(id) {
  alert(`Edit form triggered for employee ID ${id}`);
  // Navigate or show form (handled later)
}

function getPaginatedEmployees() {
  const start = (currentPage - 1) * itemsPerPage;
  return employees.slice(start, start + itemsPerPage);
}

function renderPagination() {
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const controls = document.getElementById('pagination-controls');
  controls.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.disabled = (i === currentPage);
    btn.onclick = () => {
      currentPage = i;
      renderEmployeeList();
    };
    controls.appendChild(btn);
  }
}

function setupSearch() {
  const input = document.getElementById('search-input');
  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    employees = mockEmployees.filter(emp =>
      emp.firstName.toLowerCase().includes(query) ||
      emp.lastName.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query)
    );
    currentPage = 1;
    renderEmployeeList();
  });
}
