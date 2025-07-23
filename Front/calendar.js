// Calendar for StudySync - Group Integration
// Enhanced by Joseph Woolley with notification system
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
    
    // Date display with Today/Tomorrow labels
    const meetingDate = new Date(meeting.date);
    const todayDate = new Date();
    const tomorrow = new Date(todayDate.getTime() + 86400000);
    
    let dateDisplay = meeting.date;
    if (meetingDate.toDateString() === todayDate.toDateString()) {
      dateDisplay = "Today";
    } else if (meetingDate.toDateString() === tomorrow.toDateString()) {
      dateDisplay = "Tomorrow";
    }
    
    meetingDiv.innerHTML = 
      "<div>🕐 " + meeting.time + " - " + dateDisplay + "</div>" +
      "<div>" + meeting.title + "</div>" +
      "<div>Group: " + groupName + "</div>" +
      "<div>" + (meeting.location || 'Location TBD') + "</div>";
    
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
  
  // Schedule reminders for this meeting
  scheduleReminders(meeting);
  
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

// Initialize notification system
function initializeNotifications() {
  // Request notification permission if not already granted
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission().then(permission => {
      console.log("Notification permission:", permission);
    });
  }
  
  // Check for due reminders every minute
  setInterval(checkReminders, 60000);
  console.log("Notification system initialized");
}

// Schedule reminders for a meeting
function scheduleReminders(meeting) {
  const meetingTime = new Date(`${meeting.date}T${meeting.time}`);
  const reminderTimes = [15, 60]; // 15 minutes and 1 hour before
  
  reminderTimes.forEach(minutesBefore => {
    const reminderTime = new Date(meetingTime.getTime() - (minutesBefore * 60000));
    
    // Only schedule future reminders
    if (reminderTime > new Date()) {
      const reminders = JSON.parse(localStorage.getItem("meeting_reminders") || "[]");
      reminders.push({
        id: `${meeting.id}_${minutesBefore}`,
        meetingId: meeting.id,
        reminderTime: reminderTime.toISOString(),
        minutesBefore: minutesBefore,
        message: `${meeting.title} starts in ${minutesBefore} minutes`,
        sent: false
      });
      localStorage.setItem("meeting_reminders", JSON.stringify(reminders));
      console.log(`Reminder scheduled: ${meeting.title} - ${minutesBefore} min before`);
    }
  });
}

// Check and send due reminders
function checkReminders() {
  const now = new Date();
  const reminders = JSON.parse(localStorage.getItem("meeting_reminders") || "[]");
  const pendingReminders = [];
  
  reminders.forEach(reminder => {
    const reminderTime = new Date(reminder.reminderTime);
    
    if (now >= reminderTime && !reminder.sent) {
      // Send browser notification
      if ("Notification" in window && Notification.permission === "granted") {
        const notification = new Notification("StudySync Meeting Reminder", {
          body: reminder.message,
          icon: "📅",
          tag: `reminder-${reminder.meetingId}`
        });
        
        // Auto-close after 10 seconds
        setTimeout(() => notification.close(), 10000);
      }
      
      // Also show in-app notification
      showInAppNotification("Meeting Reminder", reminder.message);
      
      reminder.sent = true;
      console.log("Reminder sent:", reminder.message);
    }
    
    // Keep reminders for 24 hours after sending, then clean up
    const oneDayAfter = new Date(reminderTime.getTime() + 86400000);
    if (!reminder.sent || now < oneDayAfter) {
      pendingReminders.push(reminder);
    }
  });
  
  localStorage.setItem("meeting_reminders", JSON.stringify(pendingReminders));
}

// Show in-app notification
function showInAppNotification(title, message) {
  // Create or get notification area
  let notificationArea = document.getElementById("notification-area");
  if (!notificationArea) {
    notificationArea = document.createElement("div");
    notificationArea.id = "notification-area";
    notificationArea.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 300px;
    `;
    document.body.appendChild(notificationArea);
  }
  
  const notification = document.createElement("div");
  notification.style.cssText = `
    background: #ff4444;
    color: white;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    animation: slideIn 0.3s ease-out;
  `;
  
  notification.innerHTML = `
    <strong>${title}</strong><br>
    ${message}
    <button onclick="this.parentElement.remove()" style="float:right;background:none;border:none;color:white;cursor:pointer;font-size:18px;">×</button>
  `;
  
  notificationArea.appendChild(notification);
  
  // Auto-remove after 8 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 8000);
}

// Load page
window.onload = function() {
  loadMeetings();
  loadUserGroups();
  initializeNotifications(); // ENHANCED: Initialize notification system
};