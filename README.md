# Real-Time Expert Session Booking System

A full-stack application that allows users to book real-time sessions with experts.
Built using React / React Native, Node.js, Express, MongoDB with real-time slot updates.

## Features
### Expert Module
- List experts with pagination
- Search experts by name
- Filter experts by category
- View expert details with experience & ratings

### Booking Module
- Real-time available slots grouped by date
- Prevent double booking of slots
- Booking form with validation
- Disable already booked slots
- Success confirmation after booking

### My Bookings
- View bookings using email
- Booking statuses:
  - Pending
  - Confirmed
  - Completed

### Real-Time Updates
- Slots update in real-time using Socket.io
3️⃣ Tech Stack (Clear likho)
## Tech Stack

### Frontend
- React / React Native
- Axios
- Tailwind CSS / CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io

### Other Tools
- dotenv
- GitHub

## Folder Structure

backend/
├── controllers/
├── routes/
├── models/
├── config/
├── sockets/
├── app.js
├── server.js

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   └── App.js

## API Endpoints

### Experts
- GET /experts
- GET /experts/:id

### Bookings
- POST /bookings
- GET /bookings?email=
- PATCH /bookings/:id/status

## Preventing Double Booking

- Unique index on:
  expert + date + timeSlot
- Booking creation handled with atomic database operations
- If slot already booked, API returns proper error message

  ## Real-Time Slot Updates
- Socket.io is used to emit slot update events
- When a booking is confirmed, all connected clients receive updated slot data
- This ensures no stale data is shown to users

## Environment Variables

Create a .env file in backend:

MONGO_URI=your_mongodb_url
PORT=5000

## How to Run Locally

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm start

**## Demo Video
[Click here to watch demo](VIDEO_LINK)**
