import { useState } from "react";
import axios from "axios";

export default function Booking({ expertId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:5000/bookings", {
        ...form,
        expert: expertId,
      });

      alert("Booking successful 🎉");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="date" placeholder="Date (YYYY-MM-DD)" onChange={handleChange} required />
      <input name="time" placeholder="Time (10:00)" onChange={handleChange} required />
      <textarea name="notes" placeholder="Notes" onChange={handleChange} />

      <button type="submit">Book Now</button>
    </form>
  );
}