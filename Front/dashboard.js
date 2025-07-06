document.addEventListener("DOMContentLoaded", () => {
  const dashboardContainer = document.getElementById("dashboard-list");
  const joined = JSON.parse(localStorage.getItem("joinedGroups") || "[]");

  if (joined.length === 0) {
    dashboardContainer.innerHTML = "<p>You have not joined any groups yet.</p>";
    return;
  }

  fetch("data/groups.csv")
    .then(response => response.text())
    .then(data => {
      const csvRows = data.trim().split("\n");
      const csvGroups = csvRows
        .filter(row => row.trim())
        .map(row => {
          const parts = row.split(",").map(p => p.trim());
          return {
            id: parts[0],
            name: parts[1],
            course: parts[2],
            description: parts[3],
            meetingType: parts[4]
          };
        });

      // Load created groups from sessionStorage
      const createdGroups = JSON.parse(sessionStorage.getItem("createdGroups") || "[]");

      // Merge arrays
      const allGroups = [...csvGroups, ...createdGroups];

      let anyDisplayed = false;

      allGroups.forEach(group => {
        if (joined.includes(group.id)) {
          const card = document.createElement("div");
          card.className = "group-card";
          card.innerHTML = `
            <h3>${group.name}</h3>
            <p><strong>Course:</strong> ${group.course}</p>
            <p>${group.description}</p>
            <p><strong>Meeting:</strong> ${group.meetingType}</p>
            <button data-groupid="${group.id}">Leave Group</button>
          `;
          dashboardContainer.appendChild(card);
          anyDisplayed = true;
        }
      });

      if (!anyDisplayed) {
        dashboardContainer.innerHTML = "<p>You have not joined any groups yet.</p>";
      }

      // Attach leave button handlers
      document.querySelectorAll("button[data-groupid]").forEach(button => {
        button.addEventListener("click", e => {
          const groupId = e.target.getAttribute("data-groupid");
          leaveGroup(groupId);
          location.reload(); // Refresh the dashboard
        });
      });
    })
    .catch(err => {
      dashboardContainer.innerHTML = `<p>Error loading groups: ${err.message}</p>`;
      console.error("Fetch error:", err);
    });
});

function leaveGroup(groupId) {
  let joined = JSON.parse(localStorage.getItem("joinedGroups") || "[]");
  joined = joined.filter(id => id !== groupId);
  localStorage.setItem("joinedGroups", JSON.stringify(joined));
}
