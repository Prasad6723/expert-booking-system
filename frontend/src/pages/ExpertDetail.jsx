import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ExpertDetail() {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/experts/${id}`)
      .then((res) => res.json())
      .then((data) => setExpert(data));

    fetch(`http://localhost:5000/bookings/${id}`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [id]);

  const isBooked = (date, time) => {
    return bookings.some(
      (b) => b.date === date && b.time === time
    );
  };

  const bookSlot = async (date, time) => {
    const res = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expertId: expert._id,
        expertName: expert.name,
        date,
        time,
      }),
    });

    const data = await res.json();
    alert(data.message);

    // Refresh bookings
    const updated = await fetch(
      `http://localhost:5000/bookings/${id}`
    );
    const updatedData = await updated.json();
    setBookings(updatedData);
  };

  if (!expert) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{expert.name}</h1>
      <p>Category: {expert.category}</p>
      <p>Experience: {expert.experience} years</p>
      <p>Rating: {expert.rating}</p>

      <h2>Available Slots</h2>

      {expert.slots.map((slot, index) => (
        <div key={index}>
          <h4>{slot.date}</h4>
          <ul>
            {slot.times.map((time, i) => (
              <li key={i}>
                {time}{" "}
                <button
                  disabled={isBooked(slot.date, time)}
                  onClick={() => bookSlot(slot.date, time)}
                >
                  {isBooked(slot.date, time)
                    ? "Booked"
                    : "Book Slot"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ExpertDetail;