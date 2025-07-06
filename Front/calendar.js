// Calendar for StudySync - Group Integration
let meetings = [];
let userGroups = [];

// Load meetings from localStorage
function loadMeetings() {
  let saved = localStorage.getItem("studysync_meetings");
  if (saved) {
    meetings = JSON.parse(saved);
  }
}

// Load user's joined groups for dropdown
function loadUserGroups() {
  const joined = JSON.parse(localStorage.getItem("joinedGroups") || "[]");
  
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
            course: parts[2]
          };
        });

      const createdGroups = JSON.parse(sessionStorage.getItem("createdGroups") || "[]");
      const allGroups = [...csvGroups, ...createdGroups];
      
      userGroups = allGroups.filter(group => joined.includes(group.id));
      updateGroupDropdown();
      showCalendar();
    })
    .catch(err => {
      const createdGroups = JSON.parse(sessionStorage.getItem("createdGroups") || "[]");
      userGroups = createdGroups.filter(group => joined.includes(group.id));
      updateGroupDropdown();
      showCalendar();
    });
}

// Update group dropdown with user's groups
function updateGroupDropdown() {
  const select = document.getElementById("meeting-group");
  select.innerHTML = '<option value="">Select Group</option>';
  
  if (userGroups.length === 0) {
    select.innerHTML = '<option value="">No groups joined yet</option>';
    select.disabled = true;
  } else {
    userGroups.forEach(group => {
      select.innerHTML += `<option value="${group.id}">${group.name}</option>`;
    });
    select.disabled = false;
  }
}

// Save meetings to localStorage  
function saveMeetings() {
  localStorage.setItem("studysync_meetings", JSON.stringify(meetings));
}

// Show current month
function showCalendar() {
  let today = new Date();
  let monthNames = ["January", "February", "March", "April", "May", "June",
                   "July", "August", "September", "October", "November", "December"];
  
  document.getElementById("current-month").textContent = monthNames[today.getMonth()] + " " + today.getFullYear();
  
  showCalendarGrid();
  showUpcomingMeetings();
}

// Show calendar grid
function showCalendarGrid() {
  let calendarBody = document.getElementById("calendar-body");
  
  calendarBody.innerHTML = "";
  
  for (let week = 0; week < 4; week++) {
    let row = document.createElement("tr");
    
    for (let day = 0; day < 7; day++) {
      let cell = document.createElement("td");
      let dayNumber = (week * 7) + day + 1;
      
      if (dayNumber <= 31) {
        cell.textContent = dayNumber;
        
        let hasmeeting = meetings.some(meeting => {
          let meetingDay = new Date(meeting.date).getDate();
          let isInGroup = userGroups.some(group => group.id === meeting.groupId);
          return meetingDay === dayNumber && isInGroup;
        });
        
        if (hasmeeting) {
          cell.innerHTML = dayNumber + "<br/><span class='meeting-dot'>•</span>";
          cell.className = "has-meeting";
        }
      }
      
      row.appendChild(cell);
    }
    
    calendarBody.appendChild(row);
  }
}

// Show upcoming meetings
function showUpcomingMeetings() {
  let sidebar = document.getElementById("upcoming-meetings");
  let today = new Date().toISOString().split('T')[0];
  
  let userGroupIds = userGroups.map(g => g.id);
  let upcoming = meetings.filter(meeting => 
    meeting.date >= today && userGroupIds.includes(meeting.groupId)
  );
  upcoming.sort((a, b) => a.date.localeCompare(b.date));
  
  if (upcoming.length === 0) {
    sidebar.innerHTML = "<p>No upcoming meetings for your groups.</p>";
    return;
  }
  
  sidebar.innerHTML = "";
  
  upcoming.slice(0, 3).forEach(meeting => {
    let meetingDiv = document.createElement("div");
    meetingDiv.className = "meeting-card";
    
    let group = userGroups.find(g => g.id === meeting.groupId);
    let groupName = group ? group.name : "Unknown Group";
    
    meetingDiv.innerHTML = 
      "<div>🕐 " + meeting.time + "</div>" +
      "<div>" + meeting.title + "</div>" +
      "<div>Group: " + groupName + "</div>" +
      "<div>" + meeting.location + "</div>";
    
    sidebar.appendChild(meetingDiv);
  });
}

// Show meeting form
function showAddMeeting() {
  if (userGroups.length === 0) {
    alert("You need to join a group first before scheduling meetings!");
    return;
  }
  
  document.getElementById("meeting-form").style.display = "block";
  
  let today = new Date();
  let dateString = today.getFullYear() + "-" + 
    String(today.getMonth() + 1).padStart(2, "0") + "-" + 
    String(today.getDate()).padStart(2, "0");
  document.getElementById("meeting-date").value = dateString;
}

// Hide meeting form
function hideAddMeeting() {
  document.getElementById("meeting-form").style.display = "none";
  document.getElementById("meeting-title").value = "";
  document.getElementById("meeting-date").value = "";
  document.getElementById("meeting-time").value = "";
  document.getElementById("meeting-type").value = "Online";
  document.getElementById("meeting-location").value = "";
  document.getElementById("meeting-group").value = "";
}

// Add meeting
function addMeeting() {
  let title = document.getElementById("meeting-title").value;
  let date = document.getElementById("meeting-date").value;
  let time = document.getElementById("meeting-time").value;
  let duration = document.getElementById("meeting-duration").value;
  let type = document.getElementById("meeting-type").value;
  let location = document.getElementById("meeting-location").value;
  let groupId = document.getElementById("meeting-group").value;
  
  if (!title || !date || !time || !groupId) {
    alert("Please fill in all required fields including group selection");
    return;
  }
  
  let meeting = {
    id: Date.now(),
    title: title,
    date: date,
    time: time,
    duration: duration,
    type: type,
    location: location || (type === "Online" ? "Zoom Meeting" : "TBD"),
    groupId: groupId,
    createdBy: localStorage.getItem("currentUser")
  };
  
  meetings.push(meeting);
  saveMeetings();
  showCalendar();
  hideAddMeeting();
  
  alert("Meeting scheduled for group: " + title);
}

// Delete meeting
function deleteMeeting(meetingId) {
  if (confirm("Delete this meeting?")) {
    meetings = meetings.filter(m => m.id !== meetingId);
    saveMeetings();
    showCalendar();
    alert("Meeting deleted");
  }
}

// Load page
window.onload = function() {
  loadMeetings();
  loadUserGroups();
};