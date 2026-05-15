# 🏫 School Management System

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux_Toolkit-1.9-764ABC?logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-v5-007FFF?logo=mui&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-File_Storage-3448C5?logo=cloudinary&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

A full-stack **School Management System** built with the MERN stack that centralizes administration, teaching, and student workflows into three dedicated role-based portals. Admins manage the school-wide setup, teachers handle class-level operations, and students access their academic data — all from a single unified platform.

---

## Problem Statement

Traditional schools rely on scattered tools — spreadsheets for attendance, emails for notices, and physical registers for exam results — creating silos and administrative overhead. This system replaces that fragmentation with a single web platform that offers role-specific dashboards, real-time data access, and centralized file sharing via cloud storage.

---

## Key Features at a Glance

- **Three-role authentication** — Admin, Teacher, and Student portals with role-based routing
- **Class & subject management** — Full CRUD for classes, subjects, and teacher-subject assignments
- **Attendance tracking** — Per-subject attendance recording and removal at individual and bulk levels
- **Exam results** — Mark entry and per-student result viewing
- **Notice board** — School-wide announcements with create/update/delete support
- **Complaint system** — Students can raise and view complaints directed to the admin
- **Resource library** — Upload and stream PDFs, images, and documents via Cloudinary with a secure backend proxy
- **Analytics dashboard** — Animated stat cards and charts (pie/bar) powered by Recharts
- **Guest mode** — Demo access to explore the system without registration

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router DOM v6 | Client-side routing |
| Redux Toolkit + React-Redux | Global state management |
| MUI (Material UI) v5 | Component library & theming |
| Recharts | Data visualization (bar & pie charts) |
| Axios | HTTP client |
| react-countup | Animated stat counters |
| styled-components | Additional component styling |

### Backend

| Technology | Purpose |
|---|---|
| Node.js + Express 4 | REST API server |
| Mongoose 7 | MongoDB ODM |
| bcrypt | Password hashing |
| multer + multer-storage-cloudinary | Multipart file upload |
| Cloudinary SDK v1 | Cloud file storage & signed URL generation |
| cors | Cross-origin resource sharing |
| dotenv | Environment variable management |
| nodemon | Development auto-restart |

### Database

| Technology | Purpose |
|---|---|
| MongoDB (Atlas) | Primary NoSQL database |

### External Services

| Service | Purpose |
|---|---|
| Cloudinary | File hosting for PDFs, images, and documents |

---

## Project Architecture

```
School_Management/
├── backend/                        # Express REST API
│   ├── index.js                    # App entry — MongoDB connect, middleware, server listen
│   ├── cloudinaryConfig.js         # Cloudinary SDK config + multer-storage setup
│   ├── routes/
│   │   └── route.js                # All API route definitions (single file)
│   ├── controllers/                # Business logic layer
│   │   ├── admin-controller.js
│   │   ├── class-controller.js
│   │   ├── complain-controller.js
│   │   ├── notice-controller.js
│   │   ├── resource-controller.js  # Upload, list, proxy, delete resources
│   │   ├── student_controller.js
│   │   ├── subject-controller.js
│   │   └── teacher-controller.js
│   └── models/                     # Mongoose schemas
│       ├── adminSchema.js
│       ├── sclassSchema.js
│       ├── studentSchema.js
│       ├── subjectSchema.js
│       ├── teacherSchema.js
│       ├── noticeSchema.js
│       ├── complainSchema.js
│       └── resourceSchema.js
│
└── frontend/                       # React SPA
    └── src/
        ├── App.js                  # Root router — role-based dashboard rendering
        ├── index.css               # Global styles
        ├── pages/
        │   ├── Homepage.js         # Landing page
        │   ├── LoginPage.js        # Unified login for all roles
        │   ├── ChooseUser.js       # Role selector (normal + guest)
        │   ├── admin/              # Admin dashboard & sub-pages
        │   │   ├── AdminDashboard.js
        │   │   ├── AdminHomePage.js
        │   │   ├── SideBar.js
        │   │   ├── classRelated/
        │   │   ├── studentRelated/
        │   │   ├── teacherRelated/
        │   │   ├── subjectRelated/
        │   │   ├── noticeRelated/
        │   │   └── resourceRelated/
        │   ├── teacher/            # Teacher portal
        │   └── student/            # Student portal
        ├── components/             # Shared reusable components
        │   ├── CustomBarChart.js
        │   ├── CustomPieChart.js
        │   ├── SeeNotice.js
        │   ├── TableTemplate.js
        │   └── ...
        └── redux/                  # Global state slices
            ├── store.js
            ├── userRelated/
            ├── studentRelated/
            ├── teacherRelated/
            ├── sclassRelated/
            ├── noticeRelated/
            ├── complainRelated/
            └── resourceRelated/
```

### Data Flow

```
Browser (React + Redux)
    │
    ├── Dispatch action → Redux Thunk → Axios → Express REST API
    │                                               │
    │                                    Controllers (business logic)
    │                                               │
    │                                    Mongoose → MongoDB Atlas
    │                                               │
    │                                    Cloudinary (file upload/proxy)
    │
    └── Store update → Re-render UI
```

---

## Features

### Admin Portal

- **Dashboard** — Animated stat cards (total students, classes, teachers) and a live notice feed
- **Class Management** — Create, view, and delete school classes (e.g., "Class 10A")
- **Student Management** — Register students to classes, view profiles, update marks, delete students
- **Teacher Management** — Register teachers, assign subjects and classes, manage profiles
- **Subject Management** — Create subjects with codes and session counts, assign teachers
- **Notice Board** — Post, edit, and delete school-wide notices
- **Resource Library** — Upload PDFs, images, and documents (up to 20 MB); view inline via secure proxy; delete with Cloudinary cleanup
- **Complaints Inbox** — View all student complaints submitted via the platform

### Teacher Portal

- **Home Dashboard** — Overview of assigned class and subject
- **Class Details** — View all students in the assigned class with attendance and result data
- **Attendance Management** — Record and clear per-subject attendance for individual students or the entire class
- **Student Results** — Enter and update exam marks per subject
- **Resource Upload** — Share study materials, notes, assignments, and circulars scoped to a specific class
- **Profile View** — View assigned subject, class, and personal details

### Student Portal

- **Dashboard** — Personal summary with attendance percentage and exam performance charts
- **Subjects** — View enrolled subjects and attendance history
- **Attendance View** — Detailed subject-wise attendance with present/absent breakdown
- **Exam Results** — View marks obtained per subject
- **Resource Access** — Download or view inline all resources shared by admin and their class teacher
- **Complaints** — Submit complaints; view submission history
- **Profile** — View personal information and school details

### System-wide

- **Role-based routing** — Each role sees only its own dashboard; unauthenticated users are redirected to the landing page
- **Guest mode** — Demo login for all three roles without requiring registration
- **Secure file proxy** — Backend generates Cloudinary signed URLs and streams files with correct `Content-Type` headers, enabling in-browser PDF rendering without CDN access issues
- **Responsive UI** — MUI Grid layout adapts to mobile and desktop viewports

---

## Screenshots

> _Add screenshots of the following pages for a complete showcase:_

| Page | Screenshot |
|---|---|
| Landing / Homepage | `docs/screenshots/homepage.png` |
| Admin Dashboard | `docs/screenshots/admin-dashboard.png` |
| Teacher Dashboard | `docs/screenshots/teacher-dashboard.png` |
| Student Dashboard | `docs/screenshots/student-dashboard.png` |
| Resource Library | `docs/screenshots/resources.png` |
| Attendance View | `docs/screenshots/attendance.png` |

---

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB instance)
- [Cloudinary](https://cloudinary.com/) account (free tier is sufficient)

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/school-management.git
cd school-management
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (see [Environment Variables](#environment-variables) below), then start the server:

```bash
npm start        # production (nodemon)
```

The API server runs on **http://localhost:5000** by default.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_BASE_URL=http://localhost:5000
```

Start the development server:

```bash
npm start
```

The React app runs on **http://localhost:3000**.

### 4. Build for Production

```bash
cd frontend
npm run build
```

The optimized build is output to `frontend/build/`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description | Example |
|---|---|---|---|
| `MONGO_URL` | ✅ | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/school` |
| `PORT` | ❌ | Server port (default: `5000`) | `5000` |
| `CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary account cloud name | `my-cloud` |
| `CLOUDINARY_API_KEY` | ✅ | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | ✅ | Cloudinary API secret | `abcdefghijklmnop` |

### Frontend (`frontend/.env`)

| Variable | Required | Description | Example |
|---|---|---|---|
| `REACT_APP_BASE_URL` | ✅ | Backend API base URL | `http://localhost:5000` |

---

## API Endpoints

### Admin

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/AdminReg` | Register a new admin (school) |
| `POST` | `/AdminLogin` | Admin login |
| `GET` | `/Admin/:id` | Get admin profile |

### Students

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/StudentReg` | Register a student |
| `POST` | `/StudentLogin` | Student login |
| `GET` | `/Students/:id` | List all students for a school |
| `GET` | `/Student/:id` | Get individual student detail |
| `PUT` | `/Student/:id` | Update student profile |
| `PUT` | `/UpdateExamResult/:id` | Update exam results |
| `PUT` | `/StudentAttendance/:id` | Mark attendance |
| `PUT` | `/RemoveStudentSubAtten/:id` | Remove attendance for a subject |
| `PUT` | `/RemoveStudentAtten/:id` | Remove all attendance for a student |
| `PUT` | `/RemoveAllStudentsSubAtten/:id` | Clear all students' subject attendance |
| `PUT` | `/RemoveAllStudentsAtten/:id` | Clear all students' attendance |
| `DELETE` | `/Student/:id` | Delete a student |
| `DELETE` | `/Students/:id` | Delete all students for a school |
| `DELETE` | `/StudentsClass/:id` | Delete all students in a class |

### Teachers

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/TeacherReg` | Register a teacher |
| `POST` | `/TeacherLogin` | Teacher login |
| `GET` | `/Teachers/:id` | List all teachers for a school |
| `GET` | `/Teacher/:id` | Get individual teacher detail |
| `PUT` | `/TeacherSubject` | Assign/update teacher's subject |
| `POST` | `/TeacherAttendance/:id` | Record teacher attendance |
| `DELETE` | `/Teacher/:id` | Delete a teacher |
| `DELETE` | `/Teachers/:id` | Delete all teachers for a school |
| `DELETE` | `/TeachersClass/:id` | Delete all teachers for a class |

### Classes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/SclassCreate` | Create a new class |
| `GET` | `/SclassList/:id` | List all classes for a school |
| `GET` | `/Sclass/:id` | Get class details |
| `GET` | `/Sclass/Students/:id` | Get all students in a class |
| `DELETE` | `/Sclass/:id` | Delete a class |
| `DELETE` | `/Sclasses/:id` | Delete all classes for a school |

### Subjects

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/SubjectCreate` | Create a subject |
| `GET` | `/AllSubjects/:id` | All subjects for a school |
| `GET` | `/ClassSubjects/:id` | Subjects for a specific class |
| `GET` | `/FreeSubjectList/:id` | Subjects without an assigned teacher |
| `GET` | `/Subject/:id` | Get subject detail |
| `DELETE` | `/Subject/:id` | Delete a subject |
| `DELETE` | `/Subjects/:id` | Delete all subjects for a school |
| `DELETE` | `/SubjectsClass/:id` | Delete all subjects for a class |

### Notices

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/NoticeCreate` | Create a notice |
| `GET` | `/NoticeList/:id` | List all notices for a school |
| `PUT` | `/Notice/:id` | Update a notice |
| `DELETE` | `/Notice/:id` | Delete a notice |
| `DELETE` | `/Notices/:id` | Delete all notices for a school |

### Complaints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/ComplainCreate` | Submit a complaint |
| `GET` | `/ComplainList/:id` | List all complaints for a school |

### Resources

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/ResourceUpload` | Upload a file (multipart/form-data) |
| `GET` | `/ResourceList/:id` | All resources for a school (Admin) |
| `GET` | `/ResourceListByClass/:schoolId/:classId` | Resources visible to a class (Student) |
| `GET` | `/ResourceListByTeacher/:id` | Resources uploaded by a teacher |
| `DELETE` | `/Resource/:id` | Delete resource (removes from Cloudinary) |
| `GET` | `/ResourceView/:id` | Stream/proxy file with correct Content-Type |

---

## Database Schema Overview

### `admin`

| Field | Type | Notes |
|---|---|---|
| `name` | String | Admin's full name |
| `email` | String | Unique, used for login |
| `password` | String | bcrypt-hashed |
| `schoolName` | String | Unique school identifier |
| `role` | String | Default: `"Admin"` |

### `student`

| Field | Type | Notes |
|---|---|---|
| `name` | String | Student name |
| `rollNum` | Number | Roll number |
| `password` | String | bcrypt-hashed |
| `sclassName` | ObjectId → `sclass` | Enrolled class |
| `school` | ObjectId → `admin` | Owning school |
| `examResult` | Array | `[{ subName, marksObtained }]` |
| `attendance` | Array | `[{ date, status, subName }]` |

### `teacher`

| Field | Type | Notes |
|---|---|---|
| `name` | String | Teacher name |
| `email` | String | Unique |
| `password` | String | bcrypt-hashed |
| `school` | ObjectId → `admin` | Owning school |
| `teachSubject` | ObjectId → `subject` | Assigned subject |
| `teachSclass` | ObjectId → `sclass` | Assigned class |
| `attendance` | Array | `[{ date, presentCount, absentCount }]` |

### `subject`

| Field | Type | Notes |
|---|---|---|
| `subName` | String | Subject name |
| `subCode` | String | Subject code |
| `sessions` | String | Number of sessions |
| `sclassName` | ObjectId → `sclass` | Class it belongs to |
| `school` | ObjectId → `admin` | Owning school |
| `teacher` | ObjectId → `teacher` | Assigned teacher |

### `resource`

| Field | Type | Notes |
|---|---|---|
| `title` | String | Display name |
| `description` | String | Optional description |
| `fileUrl` | String | Cloudinary URL |
| `publicId` | String | Cloudinary public_id (for deletion) |
| `fileType` | String | `pdf`, `jpg`, `docx`, etc. |
| `resourceType` | String | Enum: `Circular`, `Notice`, `Study Material`, `Notes`, `Assignment`, `Other` |
| `uploadedBy` | String | Enum: `Admin`, `Teacher` |
| `school` | ObjectId → `admin` | Owning school |
| `targetClass` | ObjectId → `sclass` | Nullable; class-scoped resource |
| `targetSubject` | ObjectId → `subject` | Nullable; subject-scoped resource |

### `notice`

| Field | Type | Notes |
|---|---|---|
| `title` | String | Notice heading |
| `details` | String | Notice body |
| `date` | Date | Date of notice |
| `school` | ObjectId → `admin` | Owning school |

### `complain`

| Field | Type | Notes |
|---|---|---|
| `user` | ObjectId → `student` | Submitting student |
| `complaint` | String | Complaint body |
| `date` | Date | Submission date |
| `school` | ObjectId → `admin` | Owning school |

---

## Usage Guide

### 1. Register as an Admin

Navigate to the homepage → **Admin** → **Register** to create a new school account. Each school name must be unique.

### 2. Admin Setup Workflow

1. Log in as Admin
2. Go to **Classes** → Create your school's classes (e.g., "Class 10", "Class 11")
3. Go to **Subjects** → Add subjects and assign them to classes
4. Go to **Teachers** → Register teachers and assign each one a class and subject
5. Go to **Students** → Register students and enroll them into classes

### 3. Teacher Workflow

1. Log in as Teacher
2. View your assigned class and students under **Class Details**
3. Use the **Attendance** tab to mark daily attendance per subject
4. Enter exam marks from the **Student Detail** view
5. Upload study materials via the **Resources** tab (scoped to your class)

### 4. Student Workflow

1. Log in with your roll number and password
2. View subject-wise attendance and performance charts on the **Dashboard**
3. Browse shared materials in the **Resources** tab — PDFs open inline in the browser
4. Submit a grievance via the **Complaints** section

### 5. Guest Mode

From the landing page, select **Login as Guest** to explore all three dashboards with pre-seeded demo data — no registration required.

---

## Future Improvements

| Area | Enhancement |
|---|---|
| Authentication | Add JWT-based stateless auth with refresh tokens |
| Notifications | Real-time push notifications for new notices and resources (Socket.io) |
| Timetable | Class-wise timetable creation and management |
| Fee Management | Student fee tracking, payment records, and due alerts |
| Bulk Import | CSV/Excel import for bulk student and teacher registration |
| Mobile App | React Native companion app for students and teachers |
| Reports | Downloadable PDF reports for attendance, results, and resources |
| Multi-Admin | Support for sub-admin roles (e.g., Department Head) |
| Dark/Light Mode | User-selectable theme preference with persistence |
| Testing | Unit + integration test coverage (Jest, Supertest) |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes with a clear message: `git commit -m "feat: add timetable module"`
4. **Push** to your fork: `git push origin feature/your-feature-name`
5. **Open a Pull Request** against the `main` branch

Please ensure:
- Code follows the existing style and folder conventions
- New API routes are documented in this README
- Sensitive credentials are never committed (use `.env`)

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
