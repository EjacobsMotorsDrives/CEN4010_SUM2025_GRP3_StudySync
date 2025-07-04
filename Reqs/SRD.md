# 📄 Software Requirements Document (SRD) — StudySync

**Course:** CEN4010  
**Semester:** Summer 2025  
**Team:** Eric Jacobs, Juan Diaz-Zuluaga, Joseph Woolley, Erick Cuadra, Cody Chardon  
**Last Updated:** June 2025

---

## 1. 📌 Purpose of the Software

**StudySync** is a web platform designed to simplify the process of forming and joining academic study groups.  
It provides a **centralized, structured environment** where students can:

- Find peers based on shared courses and topics
- Schedule meetings
- Post messages
- Integrate with tools like Zoom and Slack for real-time collaboration

This platform is intended to improve the learning experience, increase engagement, and enhance academic outcomes through structured peer interaction.

---

## 2. 🔎 Scope of the Software

**Included Functionality:**
- User registration with `.edu` email validation
- Secure login/logout
- Group creation and discovery
- Join and leave groups
- Message boards within each group
- Meeting scheduling
- Integration links to Zoom and Slack
- Basic profile management
- Frontend CSV simulation
- Migration to backend database

**Excluded Functionality:**
- Real-time chat (Phase 2+)
- Push notifications (Phase 2+)
- File sharing
- Comprehensive user profile customization

**Phases:**
- **Phase 1:** Frontend implementation in VSCode EDU (HTML/CSS/JS with CSV flat files)
- **Phase 2:** Local Ubuntu dev server backend (Node.js or PHP + MySQL)
- **Phase 3 (Stretch Goal):** Public deployment on GoDaddy

---

## 3. ✅ Functional Requirements

### User Management
- Register account with `.edu` email address
- Verify email with confirmation link (Phase 2)
- Login and logout securely
- View and edit basic profile information

### Group Management
- Create new study groups with:
  - Course/topic tags
  - Meeting preferences (online/in-person)
  - Description
- Browse and search groups by keyword
- Filter groups by course, topic, or meeting type
- Join or leave groups
- View list of groups joined

### Scheduling and Meetings
- Schedule group meetings with date/time
- Display scheduled meetings in group view

### Messaging
- Post messages to group message board
- Display messages chronologically
- Delete own messages (Phase 2)

### External Integration
- Generate links to Zoom meetings
- Connect Slack workspace via webhook (Phase 2)

### Data Management
- Simulate persistence with CSV files in frontend prototype
- Transition to MySQL backend for production

---

## 4. 🔒 Non-Functional Requirements

- 🎯 **Responsive design:** Must work on desktop and mobile
- 🛡️ **Security:** Input validation and HTTPS
- ⚡ **Performance:** Page load < 3 seconds
- 🌐 **Compatibility:** Modern browsers (Chrome, Firefox, Edge, Safari)
- ☁️ **Scalability:** Support growth to 1,000+ users
- ⏱️ **Availability:** 99.5% uptime in production
- 🔄 **Maintainability:** Clear modular code

---

## 5. 🙋‍♂️ Use Cases

### UC1: Register Account Using .edu Email
**Actors:** New User  
**Preconditions:** User has `.edu` email  

**Main Flow:**
1. User accesses registration page
2. Enters name, email, password
3. System checks `.edu` format
4. Sends verification email
5. User clicks link to activate account

**Exceptions:**
- Invalid email format
- Email already registered

```mermaid
%%{init: {"theme": "default"}}%%
flowchart TD
    A[Start: Access Registration Page] --> B[Enter Name, Email, and Password]
    B --> C{Is Email Format .edu?}
    C -- No --> D[Show Error: Must Use .edu Email]
    D --> Z[End: Registration Blocked]

    C -- Yes --> E{Is Email Already Registered?}
    E -- Yes --> F[Show Prompt: Log In or Reset Password]
    F --> Z

    E -- No --> G[Send Verification Email with Link]
    G --> H[User Clicks Verification Link]
    H --> I[System Activates Account]
    I --> J[End: Account Activated & Ready to Log In]

    %% Styling for light theme with light blue background
    style A fill:#e6f2ff,stroke:#3399cc
    style B fill:#e6f2ff,stroke:#3399cc
    style C fill:#d9ecff,stroke:#3399cc
    style D fill:#ffdddd,stroke:#cc0000,color:#000
    style E fill:#d9ecff,stroke:#3399cc
    style F fill:#fff0b3,stroke:#cc9900,color:#000
    style G fill:#e6f2ff,stroke:#3399cc
    style H fill:#e6f2ff,stroke:#3399cc
    style I fill:#ddffdd,stroke:#33cc33,color:#000
    style J fill:#ddffdd,stroke:#33cc33,color:#000
    style Z fill:#f2f2f2,stroke:#999,stroke-dasharray: 4

```

```mermaid
%%{init: {"theme": "default"}}%%
sequenceDiagram
    participant User
    participant UI as Frontend UI
    participant Server as Application Server
    participant DB as Database
    participant Email as Email System

    User->>UI: Open Registration Page
    User->>UI: Enter name, .edu email, password
    UI->>Server: Send registration data
    Server->>DB: Check if email is already registered
    alt Email already registered
        Server-->>UI: Return "Email Exists" error
        UI-->>User: Prompt to log in or reset password
    else New email
        Server->>Server: Validate .edu format
        alt Invalid format
            Server-->>UI: Return ".edu required" error
            UI-->>User: Show invalid email message
        else Valid format
            Server->>DB: Store user as pending
            Server->>Email: Send verification link
            Email-->>User: Deliver email with confirmation link
            User->>UI: Click confirmation link
            UI->>Server: Verify link
            Server->>DB: Activate user account
            Server-->>UI: Confirmation success
            UI-->>User: Account successfully activated
        end
    end

```
---

### UC2: Search and Join Study Groups
**Actors:** Registered User  
**Preconditions:** Logged in  

**Main Flow:**
1. User browses or searches groups
2. System shows matching groups
3. User selects group details
4. User clicks "Join"
5. System adds membership

**Exceptions:**
- Group full or restricted access

```mermaid
---
config:
  theme: default
  layout: dagre
---
flowchart TD
    A["Start: User is Logged In"] --> B["Navigate to Group Search Page"]
    B --> C["Enter Keywords or Apply Filters"]
    C --> D["System Displays Matching Groups"]
    D --> E["User Selects Group and Views Details"]
    E --> F{"Is Group Full or Restricted?"}
    F -- Yes --> G["Show Message: Cannot Join Group"]
    G --> Z["End: Join Blocked"]
    F -- No --> H["User Clicks Join Group"]
    H --> I["System Adds User to Group"]
    I --> J["End: Membership Confirmed"]
    style A fill:#e6f2ff,stroke:#3399cc
    style B fill:#e6f2ff,stroke:#3399cc
    style C fill:#e6f2ff,stroke:#3399cc
    style D fill:#e6f2ff,stroke:#3399cc
    style E fill:#e6f2ff,stroke:#3399cc
    style F fill:#d9ecff,stroke:#3399cc
    style G fill:#fff0b3,stroke:#cc9900,color:#000
    style Z fill:#f2f2f2,stroke:#999,stroke-dasharray: 4
    style H fill:#e6f2ff,stroke:#3399cc
    style I fill:#ddffdd,stroke:#33cc33,color:#000
    style J fill:#ddffdd,stroke:#33cc33,color:#000

```

```mermaid
%%{init: {"theme": "default"}}%%
sequenceDiagram
    participant User
    participant UI as Frontend UI
    participant Server as Application Server
    participant DB as Database

    User->>UI: Navigate to Group Search Page
    UI->>Server: Request group list (with filters)
    Server->>DB: Query matching groups
    DB-->>Server: Return group list
    Server-->>UI: Send matching groups
    UI-->>User: Display group list

    User->>UI: Select group to join
    UI->>Server: Request to join group
    Server->>DB: Check group status (full/restricted?)
    alt Group is full or restricted
        Server-->>UI: Return error message
        UI-->>User: Show "Cannot Join" message
    else Group is available
        Server->>DB: Add user to group
        DB-->>Server: Confirm membership
        Server-->>UI: Membership confirmed
        UI-->>User: Show success message
    end
```

---

### UC3: Create New Study Group
**Actors:** Registered User  
**Preconditions:** Logged in  

**Main Flow:**
1. User fills out group creation form
2. System validates input
3. Group is created and listed

**Exceptions:**
- Duplicate group name
- Missing required fields

```mermaid
%%{init: {"theme": "default"}}%%
flowchart TD
    A[Start: User is Logged In]
    B[Click **Create Group**]
    C[Fill Out Group Form]
    D[Submit Form]
    E{Is Form Valid?}
    F[Show Error: Incomplete Fields]
    G[Save Group in Database]
    H[Show Success Message]
    I[End: Group Created]

    A --> B --> C --> D --> E
    E -- No --> F --> C
    E -- Yes --> G --> H --> I

    %% Style nodes for visual clarity
    style A fill:#e6f2ff,stroke:#3399cc
    style B fill:#e6f2ff,stroke:#3399cc
    style C fill:#e6f2ff,stroke:#3399cc
    style D fill:#e6f2ff,stroke:#3399cc
    style E fill:#d9ecff,stroke:#3399cc
    style F fill:#fff0b3,stroke:#cc9900,color:#000
    style G fill:#ddffdd,stroke:#33cc33,color:#000
    style H fill:#ddffdd,stroke:#33cc33,color:#000
    style I fill:#f2f2f2,stroke:#999,stroke-dasharray: 4

```

```mermaid
%%{init: {"theme": "default"}}%%
sequenceDiagram
    participant User
    participant UI as Frontend UI
    participant Server as Application Server
    participant DB as Database

    User->>UI: Click "Create Group"
    UI->>User: Display group creation form
    User->>UI: Enter course, topic, availability, format
    UI->>Server: Submit form data
    Server->>Server: Validate input
    alt Missing required fields
        Server-->>UI: Return error message
        UI-->>User: Show form error and prompt for correction
    else All fields valid
        Server->>DB: Save new group record
        DB-->>Server: Confirm group saved
        Server-->>UI: Return success confirmation
        UI-->>User: Display "Group Created" message
    end

```


---

### UC4: Schedule and View Meetings
**Actors:** Group Members  
**Preconditions:** Membership in group  

**Main Flow:**
1. User selects "Schedule Meeting"
2. Chooses date/time
3. Meeting added to calendar
4. Members notified

**Exceptions:**
- Scheduling conflicts

```mermaid
%%{init: {"theme": "default", "themeVariables": { "primaryColor": "#e6f2ff", "edgeLabelBackground":"#ffffff", "fontFamily":"monospace"}}}%%
flowchart TD
    A[Start: Logged-in User on Group Page] --> B[Click **Schedule Meeting**]
    B --> C[Select Date and Time]
    C --> D{Is Timeslot Available?}
    D -- Yes --> E[System Adds Meeting to Calendar]
    E --> F[System Sends Notification to All Group Members]
    F --> G[Meeting Appears on Group Calendar]
    G --> H[End: Meeting Scheduled]

    D -- No --> X[Show Conflict Warning or Suggest Alternatives]
    X --> C

```

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant Scheduler
    participant Calendar
    participant NotificationService

    User->>UI: Open Group Page
    User->>UI: Click "Schedule Meeting"
    UI->>Scheduler: Submit Date/Time
    Scheduler->>Scheduler: Check availability
    alt Slot Available
        Scheduler->>Calendar: Add Meeting Entry
        Calendar-->>Scheduler: Confirm Meeting Added
        Scheduler->>NotificationService: Notify Group Members
        NotificationService-->>User: Notifications Sent
        UI-->>User: Meeting Scheduled and Calendar Updated
    else Conflict
        Scheduler-->>UI: Return Conflict Warning
        UI-->>User: Prompt to Select Another Time
    end

```


---

### UC5: Post Messages to Group Board
**Actors:** Group Members  
**Preconditions:** Logged in and group member  

**Main Flow:**
1. User types message
2. System saves and displays message

**Exceptions:**
- Prohibited content rejected

```mermaid
%%{init: {"theme": "default", "themeVariables": { "primaryColor": "#e6f2ff", "edgeLabelBackground":"#ffffff", "fontFamily":"monospace"}}}%%
flowchart TD
    A[Start: Logged-in User on Group Page] --> B[Click **Schedule Meeting**]
    B --> C[Select Date and Time]
    C --> D{Is Timeslot Available?}
    D -- Yes --> E[System Adds Meeting to Calendar]
    E --> F[System Sends Notification to All Group Members]
    F --> G[Meeting Appears on Group Calendar]
    G --> H[End: Meeting Scheduled]

    D -- No --> X[Show Conflict Warning or Suggest Alternatives]
    X --> C
```

```mermaid
%% UC5_SC
sequenceDiagram
    participant User
    participant UI
    participant MessageService
    participant ContentFilter
    participant GroupBoard

    User->>UI: Open Group Message Board
    User->>UI: Type and Submit Message
    UI->>ContentFilter: Check Message Content
    alt Content Allowed
        ContentFilter-->>MessageService: Approved
        MessageService->>GroupBoard: Save and Broadcast Message
        GroupBoard-->>UI: Update Board in Real Time
        UI-->>User: Message Posted
    else Prohibited Content
        ContentFilter-->>UI: Reject with Error Message
        UI-->>User: Display Warning
    end

```

  
---

## 6. 📅 Project Milestones

| Milestone               | Target Date       |
|-------------------------|-------------------|
| Proposal Submitted      | May 23, 2025      |
| SRD Submission          | June 14, 2025     |
| Frontend Demo (CSV)     | July 1, 2025      |
| Backend Integration     | July 14, 2025     |
| User Testing            | July 21, 2025     |
| Final Submission        | August 2, 2025    |

---

## 7. 💻 Hardware and Software Requirements

### Development Tools
- VSCode EDU (Frontend-only)
- HTML, CSS, JavaScript
- CSV files for simulation

### Deployment Environment
- Ubuntu Server or GoDaddy Linux hosting
- Node.js or PHP backend
- MySQL database
- Zoom and Slack APIs

---

## 8. 🔗 External Integrations

- **Zoom API:**
  - Schedule meetings
  - Generate meeting links

- **Slack API:**
  - Notify group members
  - Send reminders

---

## 9. 🔐 Security Considerations

- `.edu` domain enforcement
- HTTPS for all endpoints
- Input validation and sanitation
- Access controls for:
  - Group membership
  - Message posting
- Protection from XSS and CSRF

---

## 10. ✨ Future Enhancements (Post-Version 1)

- Real-time chat and notifications
- File sharing within groups
- Push notifications (email/SMS)
- Advanced analytics (group activity tracking)
- Public API for third-party apps

---
