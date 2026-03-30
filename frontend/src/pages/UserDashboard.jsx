import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function UserDashboard() {
  
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [availableSlots, setAvailableSlots] = useState([]);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

const fetchBookings = async () => {
  try {
    setLoading(true);

    const bookingRes = await API.get("/booking/my");
    const slotRes = await API.get("/slots/available");

    setBookings(bookingRes.data);
    setAvailableSlots(slotRes.data);

  } catch {
    toast.error("Failed to load data");
  } finally {
    setLoading(false);
  }
};

const handleBook = async (slotId) => {
  const confirm = window.confirm("You want to book this slot?");
    if (!confirm) return;

  try {
    await API.post("/booking/", {
      slot_id: slotId,
    });

    toast.success("Booked successfully");
    fetchBookings();
  } catch (err) {
    toast.error(err.response?.data?.error || "Booking failed");
  }
};

  const formatTime = (time) => {
  if (!time) return "-";

  const [hour, minute] = time.split(":");
  let h = parseInt(hour);
  const ampm = h >= 12 ? "PM" : "AM";

  h = h % 12;
  h = h ? h : 12;

  return `${h}:${minute} ${ampm}`;
};

  const handleCancel = async (slotId) => {
    const confirm = window.confirm("Cancel this booking?");
    if (!confirm) return;

    try {
      await API.delete(`/booking/cancel/${slotId}`);
      toast.success("Booking cancelled ❌");
      fetchBookings();
    } catch {
      toast.error("Error cancelling booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <h1 className="text-white text-2xl animate-pulse">
          Loading your bookings...
        </h1>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 p-10 text-white">

    <button
      onClick={logout}
      className="absolute top-5 right-5 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Logout
    </button>

    <h1 className="text-4xl font-bold text-center mb-10">
      User Dashboard
    </h1>

    <h2 className="text-white text-2xl mb-4">
      Available Slots
    </h2>
    {availableSlots.length === 0 ? (
      <p className="text-gray-300">No Available Slot Found</p>
    ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {availableSlots.map((slot) => (
        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-lg">
          <p className="text-white">
            {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
          </p>

          <button
            onClick={() => handleBook(slot.id)}
            className="mt-3 w-full bg-green-500 py-2 rounded hover:bg-green-600"
          >
            Book Slot
          </button>
        </div>
      ))}
    </div>
    )}
    <br></br>
    
    <h2 className="text-white text-2xl mb-4">
      My Bookings
    </h2>

    {bookings.length === 0 ? (
      <p className="text-gray-300">No bookings found</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl hover:scale-105 transition"
          >
            <p className="text-lg font-semibold">
              {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
            </p>

            <button
              onClick={() => handleCancel(booking.slot_id)}
              className="mt-5 w-full bg-red-500 py-2 rounded-lg hover:bg-red-600"
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);
}