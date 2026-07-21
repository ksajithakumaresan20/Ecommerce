import { useState } from "react";
import "../Styles/ReviewModal.css";
import { supabase } from "../services/supabase";

export default function ReviewModal({
  show,
  onClose,
  product,
  orderId,
  userId,
}) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  if (!show) return null;

 const submitReview = async () => {
  if (rating === 0) {
    alert("Please give rating");
    return;
  }

  setLoading(true);

  const { error } = await supabase
    .from("reviews")
    .insert({
      user_id: userId,
      product_id: product.product_id,
      order_id: orderId,
      rating,
      review: feedback,
    });

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Review Submitted Successfully");

  setRating(0);
  setFeedback("");

  onClose();
};
  return (
    <div className="review-overlay">
      <div className="review-modal">

        <h3>⭐ Rate Product</h3>

        <h4>{product.title}</h4>

        <div className="stars">
          {[1,2,3,4,5].map((star)=>(
            <span
              key={star}
              onClick={()=>setRating(star)}
              className={star<=rating ? "active" : ""}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e)=>setFeedback(e.target.value)}
        />

        <div className="btns">
          <button onClick={onClose}>Cancel</button>

          <button onClick={submitReview}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>

      </div>
    </div>
  );
}