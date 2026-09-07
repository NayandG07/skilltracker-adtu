# SkillTracker Student Portal — System Context & Architecture (CONTEXT)

## 1. Domain Context
**SkillTracker** is the primary academic diagnostic, continuous lab assessment, and placement preparation platform utilized by the Department of Computer Science & Engineering at **Assam Down Town University (ADTU)**.

### Audited Student Persona:
- **Student Name**: Nayandeep Goswami
- **Email**: `nayandg8@gmail.com` (Masked: `n***8@gmail.com`)
- **Enrollment ID**: `ADTU/0/2024-28/BCSM/047`
- **Academic Standing**:
  - Program: Bachelor of Technology (Computer Science & Engineering)
  - Semester: 5 (Section A, Batch 2024 - 2028)
  - Cumulative CGPA: **8.95 / 10.0**
  - Attendance Rate: **92.4%**
  - Cohort Rank: **#2 of 59 Students**
  - DSA Solved: **142 Problems**
  - Continuous Evaluation Labs Completed: **18 of 20 Labs**

---

## 2. Why the Legacy Portal Failed

### 2.1 The Mobile Blocker Gatekeeper (`Wi()` & `Ui()`)
The previous production bundle contained an artificial JavaScript gatekeeper:
```javascript
// Legacy gatekeeper snippet
function Wi() {
  const isMobileScreen = window.innerWidth < 768;
  const isMobileUA = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  return isMobileScreen || isMobileUA;
}
```
If this condition evaluated to true, the portal rendered `Ui()`, which displayed a full-screen blocker message: *"Web App Only — A native mobile app is being built."*
This prevented 100% of students on smartphones from accessing their lab assignments, checking deadlines, or reviewing diagnostic results.

### 2.2 Academic Data Desynchronization
- `/student/transcript` requested `/api/readiness/:id`, showing Nayandeep's official 8.95 CGPA, 92% attendance, and verified semester grades.
- `/student/profile` completely omitted backend fetching, attempting to load from `localStorage.getItem("student_academic_record_${id}")`.
- Because local storage was empty on fresh devices, the profile displayed `CUMULATIVE CGPA: N/A`, zero attendance, and empty tables. Edits made locally never synchronized with the university registry.

### 2.3 Broken Routing Dead-Ends
The Transcript view contained an "Edit Academic Record" button pointing to `/student/projects`. This route did not exist in the React Router configuration, immediately leading to a 404 dead-end. The 404 page's "Return Home" button pointed to `/` (an unauthenticated landing) instead of `/student`.

### 2.4 Privacy & Cohort Leaderboard Flaws
While the university API delivered all 59 ranked student records, the UI arbitrarily called `.slice(0, 3)`. Students outside the top 3 could not check their rank or distance to the cutoff. Simultaneously, raw student email addresses were rendered in plain text without consent or masking.

---

## 3. Revamped System Architecture

```mermaid
graph TD
    subgraph Client [SkillTracker PWA Client]
        subgraph UI [Responsive UI Layer]
            Desk[Desktop Layout >= 1024px: Command Sidebar]
            Mob[Mobile Layout < 1024px: Apple/Instagram Bottom Bar]
        end
        
        subgraph Core [Core State & Engines]
            Ctx[StudentProvider - Unified Academic Data]
            Notif[NotificationManager - Native & In-App Engine]
            SW[Service Worker - Workbox Multi-Tier Cache]
            IDB[IndexedDB - Offline Submissions Queue]
        end
        
        UI --> Ctx
        UI --> Notif
        Ctx <--> IDB
        Ctx <--> SW
    end

    subgraph Backend [SkillTracker Academic Services]
        API_Readiness[/api/readiness/:id]
        API_Labs[/api/lab-assignments]
        API_Leaderboard[/api/lab-assignments/cohort/leaderboard]
        API_DSA[/api/dsa-catalog]
    end

    SW <--> Backend
```

### 3.1 State Architecture (`StudentContext.jsx`)
A centralized React context provides:
1. `student`: Verified academic metrics, profile details, and SGPA history.
2. `labs`: Active and graded lab assignments with live submission status.
3. `dsa`: LeetCode 300 problems with canonical slugs and solved states.
4. `leaderboard`: Complete 59 cohort records with search and privacy masking toggles.
5. `notifications`: Real-time notification list, unread badge counters, and permission helpers.
6. `offlineQueue`: Pending lab submissions queued in IndexedDB when offline.

---

## 4. Offline Resilience & Synchronization Strategy
When a student loses network connectivity during a lab or practice session:
1. `navigator.onLine` transitions to `false`.
2. A subtle, non-intrusive offline status banner appears at the top.
3. Caches serve problem statements, syllabus notes, and past results immediately via Service Worker.
4. If the student submits lab code, the submission payload is serialized and written to IndexedDB.
5. As soon as the device reconnects (`window.addEventListener('online')`), the queue flushes automatically, a toast notification alerts the student, and the lab status updates to "Submitted".
