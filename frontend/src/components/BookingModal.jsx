import { useState } from "react";

export default function BookingModal({ slotId, onClose, onSubmit }) {
  const [name, setName] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-80 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Book Slot</h2>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(name, slotId)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}