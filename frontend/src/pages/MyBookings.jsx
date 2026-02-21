import { useState } from "react";

export default function MyBookings() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await fetch(
      `http://localhost:5000/bookings?email=${email}`
    );
    const data = await res.json();
    setBookings(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Bookings</h1>

      <input
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={fetchBookings}>Search</button>

      <hr />

      {bookings.length === 0 && <p>No bookings found</p>}

      {bookings.map((b) => (
        <div
          key={b._id}
          style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}
        >
          <p><b>Expert:</b> {b.expertName}</p>
          <p><b>Date:</b> {b.date}</p>
          <p><b>Time:</b> {b.time}</p>
          <p><b>Status:</b> {b.status}</p>
        </div>
      ))}
    </div>
  );
}