document.addEventListener("DOMContentLoaded", () => {
  let currentEmployees = [...mockEmployees];

  function renderEmployees(list) {
    const container = document.getElementById("employee-list-container");
    container.innerHTML = "";

    if (list.length === 0) {
      container.innerHTML = "<p>No employees found.</p>";
      return;
    }

    list.forEach(emp => {
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
    const searchVal = document.getElementById("searchInput").value.toLowerCase();
    const sortBy = document.getElementById("sortSelect").value;

    const filterFirst = document.getElementById("filterFirstName").value.toLowerCase();
    const filterDept = document.getElementById("filterDepartment").value.toLowerCase();
    const filterRole = document.getElementById("filterRole").value.toLowerCase();

    let result = [...mockEmployees];

    // Search
    if (searchVal) {
      result = result.filter(emp =>
        emp.firstName.toLowerCase().includes(searchVal) ||
        emp.lastName.toLowerCase().includes(searchVal) ||
        emp.email.toLowerCase().includes(searchVal)
      );
    }

    // Filter
    if (filterFirst) {
      result = result.filter(emp => emp.firstName.toLowerCase().includes(filterFirst));
    }
    if (filterDept) {
      result = result.filter(emp => emp.department.toLowerCase().includes(filterDept));
    }
    if (filterRole) {
      result = result.filter(emp => emp.role.toLowerCase().includes(filterRole));
    }

    // Sort
    if (sortBy === "firstName") {
      result.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortBy === "department") {
      result.sort((a, b) => a.department.localeCompare(b.department));
    }

    renderEmployees(result);
  }

  // Event Listeners
  document.getElementById("searchInput").addEventListener("input", applyFilters);
  document.getElementById("sortSelect").addEventListener("change", applyFilters);
  document.getElementById("applyFilterBtn").addEventListener("click", applyFilters);
  document.getElementById("clearFilterBtn").addEventListener("click", () => {
    document.getElementById("filterFirstName").value = "";
    document.getElementById("filterDepartment").value = "";
    document.getElementById("filterRole").value = "";
    applyFilters();
  });

  document.getElementById("filterToggle").addEventListener("click", () => {
    const panel = document.getElementById("filterPanel");
    panel.style.display = panel.style.display === "none" ? "block" : "none";
  });

  // Initial render
  applyFilters();
});
