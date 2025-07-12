<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Employee Directory</title>
  <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
  <div id="app">
    <input type="text" id="search-input" placeholder="Search by name or email..." />
    <button id="filter-btn">Filter</button>
    <select id="sort-select">
      <option value="">Sort By</option>
      <option value="firstName">First Name</option>
      <option value="department">Department</option>
    </select>
    <div id="employee-list-container"></div>
    <div id="pagination-controls"></div>
  </div>

  <script src="/static/js/data.js"></script>
  <script src="/static/js/utils.js"></script>
  <script src="/static/js/app.js"></script>
</body>
</html>
