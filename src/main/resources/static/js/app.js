document.addEventListener("DOMContentLoaded", () => {
  let currentEmployees = [...mockEmployees];
  let filteredEmployees = [...mockEmployees];
  let currentPage = 1;
  let itemsPerPage = 10;

  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const itemsPerPageSelect = document.getElementById("itemsPerPage");
  const pageInfo = document.getElementById("pageInfo");

  function renderEmployees(list) {
    const container = document.getElementById("employee-list-container");
    container.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedList = list.slice(start, end);

    if (paginatedList.length === 0) {
      container.innerHTML = "<p>No employees found.</p>";
      return;
    }

    paginatedList.forEach(emp => {
      const div = document.createElement("div");
      div.className = "employee-card";
      div.innerHTML = `
        <h3>${emp.firstName} ${emp.lastName}</h3>
        <p>ID: ${emp.id}</p>
        <p>Email: ${emp.email}</p>
        <p>Department: ${emp.department}</p>
        <p>Role: ${emp.role}</p>
        <button class="edit-btn" data-id="${emp.id}">Edit</button>
        <button class="delete-btn" data-id="${emp.id}">Delete</button>
      `;
      container.appendChild(div);
    });

    pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(filteredEmployees.length / itemsPerPage)}`;
    attachButtonHandlers();
  }

  function attachButtonHandlers() {
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        editEmployee(id);
      });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        deleteEmployee(id);
      });
    });
  }

  function editEmployee(id) {
    window.location.href = `form.ftlh?editId=${id}`;
  }

  function deleteEmployee(id) {
    const confirmed = confirm("Are you sure you want to delete this employee?");
    if (!confirmed) return;

    const index = mockEmployees.findIndex(emp => emp.id == id);
    if (index !== -1) {
      mockEmployees.splice(index, 1);
      applyFilters();
    }
  }

  function applyFilters() {
    const searchVal = searchInput.value.toLowerCase();
    const sortBy = sortSelect.value;
    const filterFirst = document.getElementById("filterFirstName").value.toLowerCase();
    const filterDept = document.getElementById("filterDepartment").value.toLowerCase();
    const filterRole = document.getElementById("filterRole").value.toLowerCase();

    filteredEmployees = mockEmployees.filter(emp => {
      return (
        (!searchVal || emp.firstName.toLowerCase().includes(searchVal) || emp.lastName.toLowerCase().includes(searchVal) || emp.email.toLowerCase().includes(searchVal)) &&
        (!filterFirst || emp.firstName.toLowerCase().includes(filterFirst)) &&
        (!filterDept || emp.department.toLowerCase().includes(filterDept)) &&
        (!filterRole || emp.role.toLowerCase().includes(filterRole))
      );
    });

    // Sort
    if (sortBy === "firstName") {
      filteredEmployees.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortBy === "department") {
      filteredEmployees.sort((a, b) => a.department.localeCompare(b.department));
    }

    currentPage = 1; // Reset to first page on any change
    renderEmployees(filteredEmployees);
  }

  // Pagination controls
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderEmployees(filteredEmployees);
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderEmployees(filteredEmployees);
    }
  });

  itemsPerPageSelect.addEventListener("change", () => {
    itemsPerPage = parseInt(itemsPerPageSelect.value);
    currentPage = 1;
    renderEmployees(filteredEmployees);
  });

  // Filter panel toggle
  document.getElementById("filterToggle").addEventListener("click", () => {
    const panel = document.getElementById("filterPanel");
    panel.style.display = panel.style.display === "none" ? "block" : "none";
  });

  document.getElementById("applyFilterBtn").addEventListener("click", applyFilters);
  document.getElementById("clearFilterBtn").addEventListener("click", () => {
    document.getElementById("filterFirstName").value = "";
    document.getElementById("filterDepartment").value = "";
    document.getElementById("filterRole").value = "";
    applyFilters();
  });

  searchInput.addEventListener("input", applyFilters);
  sortSelect.addEventListener("change", applyFilters);

  // Initial render
  applyFilters();
});
