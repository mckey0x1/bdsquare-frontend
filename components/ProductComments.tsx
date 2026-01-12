"use client";

import { useState } from "react";
import { Star, ThumbsUp, MessageSquare, X } from "lucide-react";
import { Review } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

interface ProductCommentsProps {
  reviews: Review[];
  productId: string;
}

export default function ProductComments({
  reviews,
  productId
}: ProductCommentsProps) {
  const { user, orders, submitReview } = useAuth();
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    userName: "",
    images: [] as File[]
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // NEW: for full image preview
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewReview({ ...newReview, images: [...newReview.images, ...files] });

      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = [...newReview.images];
    updatedFiles.splice(index, 1);
    setNewReview({ ...newReview, images: updatedFiles });

    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview(newReview, productId);
    setNewReview({ rating: 5, comment: "", userName: "", images: [] });
    setPreviewImages([]);
    setShowReviewForm(false);
  };

  const averageRating =
    reviews?.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const hasPurchased = orders.some((order) =>
    order.orderItems.some((item: any) => item.productId === productId)
  );

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="border-b pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Customer Reviews</h3>
          {hasPurchased && (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors">
              Write a Review
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-lg font-semibold">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <span className="text-gray-600">
            Based on {reviews?.length} reviews
          </span>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <form
          onSubmit={handleSubmitReview}
          className="border border-gray-300 p-6 space-y-4">
          <h4 className="text-lg font-semibold">Write Your Review</h4>

          <div>
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              value={newReview.userName}
              onChange={(e) =>
                setNewReview({ ...newReview, userName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 focus:border-red-600 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating })}
                  className="p-1">
                  <Star
                    className={`h-6 w-6 ${
                      rating <= newReview.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Your Review
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 focus:border-red-600 outline-none resize-none"
              placeholder="Share your thoughts about this product..."
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Images (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500"
            />

            {/* Preview Images */}
            {previewImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {previewImages.map((src, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <img
                      src={src}
                      alt={`preview-${index}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 hover:bg-red-700 transition-colors">
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="border border-gray-300 px-6 py-2 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews?.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center font-semibold">
                  {review.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">{review.userName}</p>
                  {review.verified && (
                    <span className="text-xs text-green-600">
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(Number(review.date)).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}
              </p>
            </div>

            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <p className="text-gray-700 mb-3">{review.comment}</p>

            {/* Show review images if available */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-3">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`review-${idx}`}
                    className="w-20 h-20 object-cover rounded border cursor-pointer hover:opacity-80"
                    onClick={() => setSelectedImage(img)} // <-- click to enlarge
                  />
                ))}
              </div>
            )}

            {/* <div className="flex items-center space-x-4 text-sm text-gray-500">
              <button className="flex items-center space-x-1 hover:text-red-600 transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span>Helpful</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-red-600 transition-colors">
                <MessageSquare className="h-4 w-4" />
                <span>Reply</span>
              </button>
            </div> */}
          </div>
        ))}

        {reviews?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        )}

        {selectedImage && (
          <div
            style={{ marginTop: "-10px" }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative max-w-4xl w-full px-4">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                className="absolute top-4 right-4 bg-white text-black rounded-full p-2 shadow-lg"
                onClick={() => setSelectedImage(null)}>
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
