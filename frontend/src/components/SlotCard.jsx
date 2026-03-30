export default function SlotCard({ slot, onBook }) {
  return (
    <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 transition-all">
      <div className="text-white text-lg font-semibold">
        {slot.start_time}
      </div>
      <div className="text-gray-300 text-sm">
        to {slot.end_time}
      </div>

      <button
        onClick={() => onBook(slot.id)}
        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90"
      >
        Book Now
      </button>
    </div>
  );
}