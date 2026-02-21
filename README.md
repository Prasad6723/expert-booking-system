# expert-booking-system
This project is a full-stack **Expert Session Booking System** built as per the given assignment requirements.

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios / Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Features (As Per Requirements)

### Expert Listing Screen
- Display experts with:
  - Name
  - Category
  - Experience
  - Rating
- Search experts by name
- Filter experts by category
- Pagination support
- Loading and error states handled

---

### Expert Detail Screen
- Show expert details
- Display available time slots grouped by date
- Disable already booked slots
- Real-time slot updates using **polling**

---

### Booking Screen
- Booking form with fields:
  - Name
  - Email
  - Phone
  - Date
  - Time Slot
  - Notes
- Proper validation for required fields
- Success message after booking
- Prevents booking of already booked slots

---

### My Bookings Screen
- Fetch bookings using user email
- Display booking details
- Show booking status:
  - Pending
  - Confirmed
  - Completed

---

## 🔌 Backend APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | /experts | Get experts (search, filter, pagination) |
| GET | /experts/:id | Get expert details |
| POST | /bookings | Create a booking |
| GET | /bookings?email= | Get bookings by email |
| PATCH | /bookings/:id/status | Update booking status |

---

## Critical Requirements Handling

### Prevent Double Booking
- Backend validation checks:
  - Same expert
  - Same date
  - Same time slot
- MongoDB compound unique index used to handle race conditions

### Real-Time Slot Update
- Implemented using polling mechanism

### Error Handling
- Proper validation
- Meaningful error responses
- Try/catch used across backend

---

## Folder Structure

### Backend
backend/
├─ models
├─ controllers
├─ routes
├─ server.js


### Frontend
frontend/
├─ pages
├─ App.jsx

## How to Run the Project

### Backend
```bash
cd backend
npm install
npm run dev
### Frontend
cd frontend
npm install
npm run dev
