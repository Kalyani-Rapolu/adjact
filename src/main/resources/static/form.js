document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employeeForm");
  const idInput = document.getElementById("employeeId");

  const params = new URLSearchParams(window.location.search);
  const editId = params.get("editId");

  if (editId) {
    const emp = mockEmployees.find(e => e.id == editId);
    if (emp) {
      document.getElementById("form-title").textContent = "Edit Employee";
      idInput.value = emp.id;
      document.getElementById("firstName").value = emp.firstName;
      document.getElementById("lastName").value = emp.lastName;
      document.getElementById("email").value = emp.email;
      document.getElementById("department").value = emp.department;
      document.getElementById("role").value = emp.role;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get values
    const id = idInput.value;
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value.trim();
    const role = document.getElementById("role").value.trim();

    // Clear errors
    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    // Validate
    let isValid = true;
    if (!firstName) {
      document.getElementById("firstNameError").textContent = "Required";
      isValid = false;
    }
    if (!lastName) {
      document.getElementById("lastNameError").textContent = "Required";
      isValid = false;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      document.getElementById("emailError").textContent = "Invalid Email";
      isValid = false;
    }
    if (!department) {
      document.getElementById("departmentError").textContent = "Required";
      isValid = false;
    }
    if (!role) {
      document.getElementById("roleError").textContent = "Required";
      isValid = false;
    }

    if (!isValid) return;

    // Update or Add
    if (id) {
      const emp = mockEmployees.find(e => e.id == id);
      if (emp) {
        emp.firstName = firstName;
        emp.lastName = lastName;
        emp.email = email;
        emp.department = department;
        emp.role = role;
      }
    } else {
      const newEmp = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        department,
        role
      };
      mockEmployees.push(newEmp);
    }

    // Redirect
    window.location.href = "index.ftlh";
  });
});

function cancelForm() {
  window.location.href = "index.ftlh";
}
const mockEmployees = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', department: 'HR', role: 'Manager' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', department: 'IT', role: 'Developer' },
  { id: 3, firstName: 'Alan', lastName: 'Walker', email: 'alan@example.com', department: 'Finance', role: 'Analyst' },
];
