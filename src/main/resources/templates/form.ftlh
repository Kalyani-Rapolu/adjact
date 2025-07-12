<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Add/Edit Employee</title>
  <link rel="stylesheet" href="/static/css/style.css" />
</head>
<body>
  <h2 id="form-title">Add Employee</h2>

  <form id="employeeForm">
    <input type="hidden" id="employeeId" />

    <label>First Name:</label>
    <input type="text" id="firstName" required />
    <span class="error" id="firstNameError"></span>

    <label>Last Name:</label>
    <input type="text" id="lastName" required />
    <span class="error" id="lastNameError"></span>

    <label>Email:</label>
    <input type="email" id="email" required />
    <span class="error" id="emailError"></span>

    <label>Department:</label>
    <input type="text" id="department" required />
    <span class="error" id="departmentError"></span>

    <label>Role:</label>
    <input type="text" id="role" required />
    <span class="error" id="roleError"></span>

    <button type="submit">Save</button>
    <button type="button" onclick="cancelForm()">Cancel</button>
  </form>

  <script src="/static/js/data.js"></script>
  <script src="/static/js/form.js"></script>
</body>
</html>
