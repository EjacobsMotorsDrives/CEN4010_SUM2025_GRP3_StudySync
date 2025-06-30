Here is the full **Software Requirements Document (SRD)** for **StudySync**, reformatted in clean, structured **Markdown** for use with your **Logseq project tracking** setup:

---

# 📄 Software Requirements Document (SRD) — StudySync

**Course**: CEN4010
**Semester**: Summer 2025
**Team**: Eric Jacobs, Juan Diaz-Zuluaga, Joseph Woolley, Erick Cuadra, Cody Chardon
**Last Updated**: June 2025

---

## 1. 📌 Purpose of the Software

StudySync is designed to simplify the process of forming and joining academic study groups. It provides a centralized, structured platform to connect students based on shared courses, topics, and schedules, with built-in tools to support collaboration and communication.

---

## 2. 🔎 Scope of the Software

* **Phase 1**: Frontend implementation in VSCode EDU using HTML/CSS/JS + CSV-based flat file simulation.
* **Phase 2**: Local hosting via Ubuntu dev server with backend services (Node.js or PHP + MySQL).
* **Phase 3 (Reach Goal)**: Deployment on GoDaddy with full MySQL support and public access.

---

## 3. ✅ Functional Requirements

* 📧 Register using .edu email and verify identity
* 🔐 User authentication and login system
* 🧭 Browse, search, and filter study groups
* ➕ Create and join/leave study groups
* 💬 Group message boards
* 🗓️ Schedule and manage meetings
* 🔌 Integrate with Zoom and Slack
* 📁 Simulated backend (CSV files) for testing
* 🛠️ Real backend with MySQL for production

---

## 4. 🔒 Non-Functional Requirements

* 🎯 Responsive UI design (mobile/desktop)
* 🛡️ Secure login and data handling
* 🌐 Cross-browser compatibility
* 📈 Scalable deployment on GoDaddy
* ⏱️ Target availability: 99.5% uptime

---

## 5. 🙋‍♂️ Use Cases

### UC1: Register Account Using .edu Email

* **Actors**: New user
* **Flow**: Email verification, registration, confirmation link
* **Exceptions**: Invalid or duplicate email

### UC2: Search and Join Study Groups

* **Actors**: Logged-in user
* **Flow**: Keyword search, filtering, group join
* **Exceptions**: Group is full or restricted

### UC3: Create a New Study Group

* **Actors**: Registered user
* **Flow**: Tag selection, meeting preferences, group creation
* **Exceptions**: Duplicate group name or invalid info

### UC4: Schedule and View Meetings

* **Actors**: Group members
* **Flow**: Date/time selection, notifications sent
* **Exceptions**: Scheduling conflicts

### UC5: Post Messages to Group Message Board

* **Actors**: Group members
* **Flow**: Post message → store → display
* **Exceptions**: Prohibited content filtered

---

## 6. 📅 Project Milestones (for Gantt chart)

* 📝 Proposal Submitted: `May 23, 2025`
* 📄 SRD Submission: `June 14, 2025`
* 🧪 Frontend Prototype (CSV): `July 1, 2025`
* 🖥️ Backend Integration: `July 14, 2025`
* 👥 User Testing: `July 21, 2025`
* 🚀 Final Demo & Submission: `August 2, 2025`

---

## 7. 💻 Hardware/Software Requirements

### Development Tools

* VSCode EDU (Frontend-only)
* CSV file simulation backend (testing)
* HTML, CSS, JavaScript stack

### Deployment Environment

* GoDaddy Linux Shared Hosting
* Backend: Node.js or PHP
* Database: MySQL
* Zoom/Slack APIs

---

## 8. 🔗 External Integrations

* Zoom Meeting API (OAuth, meeting scheduler)
* Slack Webhooks or API for real-time alerts

---

## 9. 🔐 Security Considerations

* Enforce `.edu` domain verification
* HTTPS-only communication (GoDaddy SSL)
* XSS & CSRF protection via input sanitization
* Access control for group visibility and membership

---

Would you like me to also prepare a Logseq-compatible **README index** page linking this with Gantt charts, use case diagrams, and sequence diagrams?
