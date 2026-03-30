import { useEffect, useState } from "react";
import API from "../services/api";
import SlotCard from "../components/SlotCard";
import BookingModal from "../components/BookingModal";
import toast from "react-hot-toast";

export default function Home() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const res = await API.get("/slots/available");
      setSlots(res.data);
    } catch (error) {
      toast.error("Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (slotId) => {
    setSelectedSlot(slotId);
  };

  const handleConfirmBooking = async (name, slotId) => {
    try {
      const res = await API.post("/booking/", {
        slot_id: slotId,
      });

      if (res.data.message) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.error);
      }

      setSelectedSlot(null);
      fetchSlots(); 
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600">
        <h1 className="text-white text-2xl animate-pulse">
          Loading slots...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 p-10">
      <h1 className="text-white text-3xl mb-6 text-center">
        Available Slots
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {slots.map((slot) => (
          <SlotCard
            key={slot.id}
            slot={slot}
            onBook={handleBookClick}
          />
        ))}
      </div>

      {selectedSlot && (
        <BookingModal
          slotId={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          onSubmit={handleConfirmBooking}
        />
      )}
    </div>
  );
}