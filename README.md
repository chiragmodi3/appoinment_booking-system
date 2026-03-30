### 🗓 Appointment Booking System

# 🚀 Overview

A full-stack appointment booking system where:

- Users can register/login and book available slots
- Admin can create, edit, delete slots and view all bookings
- JWT-based authentication with role-based access control

### 🚀 Features

# 👤 User

- Signup / Login
- View available slots
- Book a slot
- Cancel booking
- View personal bookings

# 👨‍💼 Admin

Create slots
Edit / Delete slots
View all slots
View all bookings with user details
Register new users

### 🏗 Tech Stack

# Frontend

- React.js
- Tailwind CSS
- Axios
- React Hot Toast

# Backend

- Flask (Python)
- Flask-JWT-Extended
- SQLAlchemy ORM
- SQLite

### 📂 Project Structure

appointment-booking/
│
├── backend/
│ ├── routes/
│ │ ├── auth_routes.py
│ │ ├── slot_routes.py
│ │ ├── booking_routes.py
│ │
│ ├── models/
│ │ ├── user_model.py
│ │ ├── slot_model.py
│ │ └── booking_model.py
│ │
│ ├── services/
│ │ └── booking_service.py
│ │
│ ├── utils/
│ │ ├── decorators.py
│ │
│ ├── app.py
│ ├── extensions.py
│ └── instance/
│ └── app.db
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Login.jsx
│ │ │ ├── Admin.jsx
│ │ │ └── Home.jsx
| | | ├── Booking.jsx
│ │ │ ├── Signup.jsx
│ │ │ ├── UserDashboard.jsx
│ │ │
│ │ ├── components/
│ │ │ └── SlotCard.jsx
| | | └── BookingModal.jsx
│ │ │
│ │ ├── services/
│ │ │ └── api.js
│ │ │
│ │ ├── App.js
│ │ └── index.js
│ │
│ └── package.json
│
├── README.md
├── agents.md
└── claude.md

### ▶️ Run Project

# 🔹 1. Clone the Repository

git clone https://github.com/chiragmodi3/appoinment_booking-system.git
cd appointment-booking

# 🔹 2. Backend Setup

cd backend

Create virtual environment:
python -m venv venv
venv\Scripts\activate

Run server:
python app.py

📍 Backend runs at:
http://127.0.0.1:5000

# 🔹 3. Frontend Setup

cd frontend

npm install
npm start

📍 Frontend runs at:
http://localhost:3000

### Install dependencies

pip install -r requirements.txt

### Live Project Link

### 🔑 Demo Login Credentials

# 👨‍💼 Admin

- Username: admin
- Password: admin123

👉 Use this account to:

- Create slots
- View bookings
- Register users

### 🔐 Authentication & Authorization

- JWT-based authentication
- Token stored in localStorage
- Axios interceptor used to attach token to every request
- Role-based access:
  - Admin → full access
  - User → limited access (book/cancel only)

### 🧠 Key Technical Decisions

# 1. Separation of Concerns

- Routes → handle HTTP
- Services → business logic
- Models → database structure

# 2. Role-Based Middleware

Custom decorator:

- `@admin_required`

Ensures only admins can:

- Create slots
- Edit/Delete slots
- View all bookings

# 3. Slot Booking Logic

- Prevents double booking using:

if slot.is_booked:
return {"error": "Slot already booked"}

# 4. UI Design Approach

- Glassmorphism (blur + transparency)
- Gradient background
- Responsive grid layout

# 5. Time Handling

- Backend stores time in 24-hour format
- Frontend converts to 12-hour (AM/PM)

# 6. Error Handling

- Backend returns structured JSON errors
- Frontend shows toast notifications

# 7. API Design

RESTful APIs:

| Feature     | Endpoint             |
| ----------- | -------------------- |
| Login       | /auth/login          |
| Signup      | /auth/signup         |
| Create Slot | /slots/              |
| Book Slot   | /booking/            |
| Cancel      | /booking/cancel/<id> |

### ⚠️ Risks & Challenges

- Circular imports in Flask → solved using modular structure
- JWT authorization issues → fixed via proper headers
- Time formatting mismatch → handled in frontend
- Database schema changes → required reset

### 🔮 Future Enhancements

- Calendar-based booking UI
- Email notifications
- Payment integration
- Real-time slot updates
- Admin analytics dashboard
