# StudySync Testing Documentation

**Course:** CEN4010 – Software Engineering  
**Semester:** Summer 2025  
**Group Members:** Eric Jacobs, Juan Diaz-Zuluaga, Joseph Woolley, Erick Cuadra, Cody Chardon  
**Submission Date:** July 26, 2025  

---

## Overview

This document presents the testing strategy and results for **StudySync**, our web-based platform for finding, joining, and managing academic study groups.  

StudySync integrates multiple modules—user authentication, group creation/management, scheduling calendar, and message boards—so a **multi-layered testing approach** was applied to ensure functionality, usability, and reliability.

Our testing plan used:
- **Unit Testing**
- **Integration Testing**
- **System Testing**
- **User Acceptance Testing (UAT)**
- **Regression Testing**

This document combines our **testing strategy** and the **results of 25 executed test cases**, confirming that StudySync is production-ready.

---

## 1. Testing Strategy

### Unit Testing
- **Framework:** Jest  
- **Scope:** JavaScript functions like `joinGroup()`, `leaveGroup()`, `validateEduEmail()`.
- **Purpose:** Prevent bugs in core logic, ensure proper handling of `localStorage`, `sessionStorage`, and future API logic.  
- **Goal:** >80% coverage on core logic before full-stack integration.

### Integration Testing
- **Scope:** Authentication, dashboard, group management, calendar, and message board modules.  
- **Purpose:** Detect state mismatches and data sync issues across pages (`localStorage`, CSV, MySQL).  
- **Process:** Manually validate cross-page data consistency.

### System Testing
- **Scope:** Full workflows based on SRD use cases (UC1–UC5).  
- **Purpose:** Validate **end-to-end user journeys** across browsers and devices.  
- **Examples:** Register → Browse Groups → Join Group → Schedule Meeting → Post to Board.

### User Acceptance Testing (UAT)
- **Participants:** 5–10 FIU students.  
- **Purpose:** Collect usability and satisfaction feedback to refine UI and prioritize features.

### Regression Testing
- **Scope:** After every major update (backend integration, new features).  
- **Purpose:** Ensure new changes don’t break existing functionality.  
- **Process:** Re-run automated unit tests and manual system test checklists.

---

## 2. Test Case Results (All 25)

Each test below includes the **objective, actual result, and status**.  

### Functional Requirement Tests (TC-001 – TC-015)

- **TC-001:** User registered successfully with `.edu` email and redirected to login.  
  Status: ✅ **Pass**

- **TC-002:** Non-`.edu` emails blocked with correct error message.  
  Status: ✅ **Pass**

- **TC-003:** User logged in with correct credentials and reached dashboard.  
  Status: ✅ **Pass**

- **TC-004:** Unauthorized users were redirected to login page with alert.  
  Status: ✅ **Pass**

- **TC-005:** Group creation succeeded; new group displayed on Groups page.  
  Status: ✅ **Pass**

- **TC-006:** Group creation form blocked empty fields; errors displayed.  
  Status: ✅ **Pass**

- **TC-007:** All study groups displayed with correct details.  
  Status: ✅ **Pass**

- **TC-008:** User joined group successfully; group appeared on dashboard.  
  Status: ✅ **Pass**

- **TC-009:** Leaving group removed user and updated dashboard.  
  Status: ✅ **Pass**

- **TC-010:** Meeting scheduled successfully and shown on calendar.  
  Status: ✅ **Pass**

- **TC-011:** Meeting creation blocked when required fields left empty.  
  Status: ✅ **Pass**

- **TC-012:** Calendar displayed current month grid and meeting indicators.  
  Status: ✅ **Pass**

- **TC-013:** Notifications triggered at scheduled times across all pages.  
  Status: ✅ **Pass**

- **TC-014:** Notifications worked consistently across index, groups, and dashboard pages.  
  Status: ✅ **Pass**

- **TC-015:** Group search filtered results accurately by query.  
  Status: ✅ **Pass**

---

### Performance Tests (TC-016 – TC-017)

- **TC-016:** All pages loaded within 2.5 seconds on broadband.  
  Status: ✅ **Pass**

- **TC-017:** System remained responsive with 10+ scheduled meetings; notifications delivered without lag.  
  Status: ✅ **Pass**

---

### Security Tests (TC-018 – TC-020)

- **TC-018:** Malicious inputs (script tags, special characters) sanitized; no code execution.  
  Status: ✅ **Pass**

- **TC-019:** Sessions expired correctly after browser closure; re-login required.  
  Status: ✅ **Pass**

- **TC-020:** Data (groups, meetings, memberships) persisted across sessions and restarts.  
  Status: ✅ **Pass**

---

### Browser Compatibility (TC-021)

- **TC-021:** Features and notifications worked across Chrome, Firefox, Safari, and Edge.  
  Status: ✅ **Pass**

---

### Responsive Design (TC-022 – TC-023)

- **TC-022:** Layout and navigation adapted properly on iOS and Android devices.  
  Status: ✅ **Pass**

- **TC-023:** Tablet layout scaled properly; touch inputs functional.  
  Status: ✅ **Pass**

---

### Error Handling (TC-024 – TC-025)

- **TC-024:** App displayed “Connection Lost – Please Retry” during simulated network issues and recovered gracefully.  
  Status: ✅ **Pass**

- **TC-025:** Invalid date/time and corrupted `localStorage` triggered error prompts without crashes.  
  Status: ✅ **Pass**

---

## 3. Test Results Summary

| **Category**              | **Total Tests** | **Passed** | **Failed** |
|---------------------------|-----------------|------------|------------|
| Functional Requirements   | 15              | 15         | 0          |
| Performance               | 2               | 2          | 0          |
| Security                  | 3               | 3          | 0          |
| Browser Compatibility     | 1               | 1          | 0          |
| Responsive Design         | 2               | 2          | 0          |
| Error Handling            | 2               | 2          | 0          |
| **Overall**               | **25**          | **25**     | **0**      |

---

## 4. Sign-Off

**Test Documentation Completed By:** Joseph Woolley  
**Date:** July 26, 2025  
**Review Status:** ✅ **Complete**

---

## Live Deployment & Repository

- **Live App:** [https://orchid-beguiling-artist-487.vscodeedu.app/index.html](https://orchid-beguiling-artist-487.vscodeedu.app/index.html)  
- **GitHub Repository:** [https://github.com/EjacobsMotorsDrives/CEN4010_SUM2025_GRP3_StudySync/tree/main](https://github.com/EjacobsMotorsDrives/CEN4010_SUM2025_GRP3_StudySync/tree/main)
