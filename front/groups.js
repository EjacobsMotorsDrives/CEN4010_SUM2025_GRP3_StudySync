document.addEventListener("DOMContentLoaded", () => {
  const groupContainer = document.getElementById("group-list");

  fetch("data/groups.csv")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }
      return response.text();
    })
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

      // Load any created groups from sessionStorage
      const createdGroups = JSON.parse(sessionStorage.getItem("createdGroups") || "[]");

      // Merge arrays
      const allGroups = [...csvGroups, ...createdGroups];

      if (allGroups.length === 0) {
        groupContainer.innerHTML = "<p>No groups available.</p>";
        return;
      }

      // Render all groups
      allGroups.forEach(group => {
        const groupCard = document.createElement("div");
        groupCard.className = "group-card";
        groupCard.innerHTML = `
          <h3>${group.name}</h3>
          <p><strong>Course:</strong> ${group.course}</p>
          <p>${group.description}</p>
          <p><strong>Meeting:</strong> ${group.meetingType}</p>
          <button data-groupid="${group.id}">Join Group</button>
        `;
        groupContainer.appendChild(groupCard);
      });

      // Attach Join listeners
      document.querySelectorAll("button[data-groupid]").forEach(button => {
        button.addEventListener("click", e => {
          const groupId = e.target.getAttribute("data-groupid");
          joinGroup(groupId);
        });
      });
    })
    .catch(err => {
      groupContainer.innerHTML = `<p>Error loading groups: ${err.message}</p>`;
      console.error("Fetch error:", err);
    });

  function joinGroup(groupId) {
    const joined = JSON.parse(localStorage.getItem("joinedGroups") || "[]");

    if (!joined.includes(groupId)) {
      joined.push(groupId);
      localStorage.setItem("joinedGroups", JSON.stringify(joined));
      alert("You have joined this group!");
    } else {
      alert("You already joined this group.");
    }
  }
});
