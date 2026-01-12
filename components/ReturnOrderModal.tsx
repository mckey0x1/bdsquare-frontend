"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

type ReturnOrderModalProps = {
  orderId: string;
  onReturn: (orderId: string, reason: string) => Promise<void>;
};

export default function ReturnOrderModal({
  orderId,
  onReturn
}: ReturnOrderModalProps) {
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
      await onReturn(orderId, finalReason || "No reason provided");
      setOpen(false);
      setReason("");
      setCustomReason("");
    } catch (err: any) {
      setError(err?.message || "Failed to return order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="border-2 border-orange-500 text-orange-600 px-4 py-2 hover:bg-orange-50 transition-colors">
        Return Order
      </button>

      {/* Modal */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Return Order</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Dropdown */}
                <div>
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700">
                    Reason for return
                  </label>
                  <select
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                    <option value="">-- Select reason --</option>
                    <option value="Defective or damaged product">
                      Defective or damaged product
                    </option>
                    <option value="Wrong item received">
                      Wrong item received
                    </option>
                    <option value="Size doesn't fit">
                      Size doesn't fit
                    </option>
                    <option value="Quality not as expected">
                      Quality not as expected
                    </option>
                    <option value="Changed my mind">
                      Changed my mind
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
                    rows={3}
                  />
                )}

                {error && <p className="text-red-600 text-sm">{error}</p>}

                {/* Info message */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-800">
                  <p className="font-medium mb-1">Return Policy:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Refund will be processed within 5-7 business days</li>
                    <li>Please keep the product in original packaging</li>
                    <li>Return pickup will be scheduled after approval</li>
                  </ul>
                </div>

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
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50">
                    {loading ? "Processing..." : "Confirm Return"}
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
