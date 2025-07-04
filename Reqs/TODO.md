# ✅ TODO.md — StudySync Project Tracking

## 📝 Project Description

**StudySync** is a web application that helps students find, join, and manage study groups.  
- Register with `.edu` email
- Search, create, and join groups
- Schedule meetings and post messages
- Integrate with Zoom and Slack
- Built first as a **frontend-only CSV simulation** in VSCode EDU
- Planned migration to **Node.js/PHP + MySQL backend** on GoDaddy or Ubuntu

---

## ✅ Current Status

- [x] Project Proposal submitted (`May 23, 2025`)
- [x] SRD completed and converted to Markdown
- [ ] SDD in progress
- [x] All HTML pages scaffolded
- [x] CSV loading logic implemented for groups
- [ ] Simulated login & group membership persistence
- [ ] Message board and scheduling
- [ ] Styling polish and responsiveness

---

## 🟢 Phase 1: Design

- [ ] Draft Software Design Document (SDD)
  - [ ] High-level architecture (MVC)
  - [ ] Class and sequence diagrams for UC1–UC5
  - [ ] Wireframes and flowcharts
  - [ ] ER Diagram and Data Flow Diagram
- [ ] Define:
  - CSV schema for simulation
  - MySQL schema for production
- [ ] Document Zoom/Slack integration approach

---

## 🟢 Phase 2: Frontend Development (CSV Simulation)

### Core Pages
- [x] `index.html`
- [x] `login.html`
- [x] `register.html`
- [x] `dashboard.html`
- [x] `groups.html`
- [x] `create-group.html`
- [x] `group.html`

### Core Functionality
- [x] Navigation consistency
- [x] Group loading from CSV
- [x] Search/filter groups

### Simulated Interactions
- [ ] Implement **simulated login** (LocalStorage to track logged-in user)
- [ ] Validate `.edu` email on registration
- [ ] Simulate **join/leave group**
  - Save joined groups in LocalStorage
  - Show joined groups on dashboard
- [ ] Simulate **meeting scheduling**
  - Form to add meetings
  - Display saved meetings
- [ ] Simulate **message board**
  - Post messages (LocalStorage)
  - Display messages per group

---

## 🟢 Phase 3: Styling and UX

- [ ] Create unified CSS theme
- [ ] Make responsive layouts (mobile/desktop)
- [ ] Add confirmation alerts for all actions
- [ ] Improve form validation feedback

---

## 🟢 Phase 4: Backend Planning

- [ ] Choose stack: Node.js or PHP
- [ ] Create MySQL schema matching CSV data
- [ ] Set up Ubuntu dev server
- [ ] Plan GoDaddy deployment steps
- [ ] Explore domain configuration

---

## 🟢 Phase 5: Future Integration

- [ ] Implement real authentication (email/password storage)
- [ ] Connect to Zoom and Slack APIs
- [ ] Migrate group/message data to MySQL
- [ ] Deploy production site

---

## ✅ Submission Timeline

- [x] SRD Due: Submitted `June 14, 2025`
- [ ] Frontend Demo: **July 1, 2025**
- [ ] Backend Integration: **July 14, 2025**
- [ ] User Testing: **July 21, 2025**
- [ ] Final Demo & Submission: **August 2, 2025**

---

## 🎯 Priority Next Steps

- [ ] 🟢 Implement simulated login and LocalStorage tracking
- [ ] 🟢 Build join/leave group persistence
- [ ] 🟢 Add meeting scheduling form
- [ ] 🟢 Create message board logic
- [ ] 🟢 Finish SDD and diagrams

---

