<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Employee Directory</title>
  <link rel="stylesheet" href="/static/css/style.css" />
</head>
<body>
  <h1>Employee Directory</h1>

  <div>
    <input type="text" id="searchInput" placeholder="Search by name or email" />
    <button onclick="toggleFilter()">Filter</button>
    <select id="sortSelect">
      <option value="firstName">Sort by First Name</option>
      <option value="department">Sort by Department</option>
    </select>
  </div>

  <div id="filterBox" style="display:none;">
    <input type="text" id="filterFirstName" placeholder="First Name" />
    <input type="text" id="filterDepartment" placeholder="Department" />
    <input type="text" id="filterRole" placeholder="Role" />
    <button onclick="applyFilter()">Apply Filter</button>
  </div>

  <div id="employee-list-container">
    <#list employees as employee>
      <div class="employee-card" data-id="${employee.id}">
        <h3>${employee.firstName} ${employee.lastName}</h3>
        <p>Email: ${employee.email}</p>
        <p>Department: ${employee.department}</p>
        <p>Role: ${employee.role}</p>
        <button onclick="editEmployee(${employee.id})">Edit</button>
        <button onclick="deleteEmployee(${employee.id})">Delete</button>
      </div>
    </#list>
  </div>

  <div id="pagination-controls"></div>

  <script src="/static/js/data.js"></script>
  <script src="/static/js/app.js"></script>
</body>
</html>
