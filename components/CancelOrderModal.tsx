"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

type CancelOrderModalProps = {
  orderId: string;
  onCancel: (orderId: string, reason: string) => Promise<void>;
};

export default function CancelOrderModal({
  orderId,
  onCancel
}: CancelOrderModalProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const finalReason = reason === "Other" ? customReason : reason;
      await onCancel(orderId, finalReason || "No reason provided");
      setOpen(false);
      setReason("");
      setCustomReason("");
    } catch (err: any) {
      setError(err?.message || "Failed to cancel order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="border-2 border-gray-300 px-4 py-2 hover:bg-gray-50 transition-colors">
        Cancel Order
      </button>

      {/* Modal */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Cancel Order</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Dropdown */}
                <div>
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700">
                    Reason for cancellation
                  </label>
                  <select
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                    <option value="">-- Select reason --</option>
                    <option value="Ordered by mistake">
                      Ordered by mistake
                    </option>
                    <option value="Found cheaper elsewhere">
                      Found cheaper elsewhere
                    </option>
                    <option value="Delivery time too long">
                      Delivery time too long
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Custom reason field if "Other" is chosen */}
                {reason === "Other" && (
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter your reason"
                    required
                  />
                )}

                {error && <p className="text-red-600 text-sm">{error}</p>}

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50">
                    {loading ? "Cancelling..." : "Confirm Cancel"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
