document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-group-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("group-name").value.trim();
    const course = document.getElementById("group-course").value.trim();
    const description = document.getElementById("group-description").value.trim();
    const meetingType = document.getElementById("group-meeting").value;

    // Retrieve any saved groups or empty array
    const createdGroups = JSON.parse(sessionStorage.getItem("createdGroups") || "[]");

    // Generate a unique ID (e.g., timestamp)
    const newId = Date.now().toString();

    // Store the new group as an object
    createdGroups.push({
      id: newId,
      name,
      course,
      description,
      meetingType
    });

    // Save back to sessionStorage
    sessionStorage.setItem("createdGroups", JSON.stringify(createdGroups));

    alert("Group created successfully!");

    // Redirect to Browse Groups
    window.location.href = "groups.html";
  });
});
