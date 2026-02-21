import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpertList from "./pages/ExpertList";
import ExpertDetail from "./pages/ExpertDetail";
import MyBookings from "./pages/MyBookings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExpertList />} />
        <Route path="/expert/:id" element={<ExpertDetail />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}