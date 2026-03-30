import axios from "axios";
import { useState } from "react";

export default function Booking() {
  const [name, setName] = useState("");
  const [slotId, setSlotId] = useState("");

  const bookSlot = async () => {
    const res = await axios.post("http://127.0.0.1:5000/booking/", {
      user_name: name,
      slot_id: slotId,
    });

    alert(res.data.message || res.data.error);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl">
        <h1 className="text-white text-2xl mb-5">Book Appointment</h1>

        <input
          placeholder="Your Name"
          className="p-2 mb-3 w-full rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Slot ID"
          className="p-2 mb-3 w-full rounded"
          onChange={(e) => setSlotId(e.target.value)}
        />

        <button
          onClick={bookSlot}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}