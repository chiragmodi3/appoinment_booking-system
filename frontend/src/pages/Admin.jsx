import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingSlot, setEditingSlot] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const slotRes = await API.get("/slots/");
      const bookingRes = await API.get("/booking/all");

      setSlots(slotRes.data);
      setBookings(bookingRes.data);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
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

  const createSlot = async () => {
    try {
      await API.post("/slots/", {
        start_time: start,
        end_time: end,
      });

      toast.success("Slot created ✅");
      setStart("");
      setEnd("");
      fetchData();
    } catch (err) {
      if (err.response?.data?.error === "Slot already exists") {
        toast.error("Slot already exists ❌");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const updateSlot = async (id) => {
  try {
    await API.put(`/slots/${id}`, {
      start_time: start,
      end_time: end,
    });

    toast.success("Slot updated");
    setEditingSlot(null);
    fetchData();
  } catch {
    toast.error("Error updating slot");
  }
};

  const deleteSlot = async (id) => {
    const confirm = window.confirm("Delete this slot?");
    if (!confirm) return;

    try {
      await API.delete(`/slots/${id}`);
      toast.success("Slot deleted");
      fetchData();
    } catch {
      toast.error("Error deleting slot");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <h1 className="text-white text-2xl animate-pulse">
          Loading dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 p-10 text-white">

      <div className="flex justify-end items-center gap-4 mb-8">

  <button
    onClick={() => navigate("/signup")}
    className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
  >
    Register User
  </button>

  <button
    onClick={logout}
    className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
  >
    Logout
  </button>

</div>

      <h1 className="text-4xl font-bold text-center mb-10">
        Admin Dashboard
      </h1>   

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl mb-10 shadow-xl">
        <h2 className="text-xl mb-4">Create Slot</h2>

        <div className="flex gap-4">
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="p-3 rounded-lg text-black w-full"
          />

          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="p-3 rounded-lg text-black w-full"
          />

          <button
            onClick={createSlot}
            className="bg-green-500 px-5 py-2 rounded-lg hover:bg-green-600"
          >
            Create
          </button>
        </div>
      </div>

      <h2 className="text-2xl mb-4">All Slots</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-xl"
          >
            <p>{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</p>
            <p className="text-gray-300">
              {slot.is_booked ? "Booked" : "Available"}
            </p>

            {editingSlot === slot.id ? (
  <>
    <input
      type="time"
      value={start}
      onChange={(e) => setStart(e.target.value)}
      className="p-2 rounded text-black w-full mb-2"
    />
    <input
      type="time"
      value={end}
      onChange={(e) => setEnd(e.target.value)}
      className="p-2 rounded text-black w-full mb-2"
    />

    <button
      onClick={() => updateSlot(slot.id)}
      className="bg-blue-500 px-3 py-1 rounded mr-2"
    >
      Save
    </button>

    <button
      onClick={() => setEditingSlot(null)}
      className="bg-gray-500 px-3 py-1 rounded"
    >
      Cancel
    </button>
  </>
) : (
  <>
    <button
      onClick={() => {
        setEditingSlot(slot.id);
        setStart(slot.start_time);
        setEnd(slot.end_time);
      }}
      className="mt-2 bg-yellow-500 px-3 py-1 rounded mr-2"
    >
      Edit
    </button>

    <button
      onClick={() => deleteSlot(slot.id)}
      className="mt-2 bg-red-500 px-3 py-1 rounded"
    >
      Delete
    </button>
  </>
)}
          </div>
        ))}
      </div>

      <h2 className="text-2xl mb-4">All Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-xl"
            >
              <p>User: {b.username}</p>
              <p>{formatTime(b.start_time)} - {formatTime(b.end_time)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}