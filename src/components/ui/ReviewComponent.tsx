import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Props {
  hospitalId: number;
}

const ReviewComponent: React.FC<Props> = ({ hospitalId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/reviews/${hospitalId}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error('Failed to load reviews:', err));
  }, [hospitalId]);

  const submitReview = async () => {
    try {
      const payload = { rating, comment };
      await axios.post(`http://localhost:8080/api/reviews/${hospitalId}`, payload);
      setRating(0); setComment('');
      const res = await axios.get(`/api/hospitals/${hospitalId}/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  const averageRating =
  Array.isArray(reviews) && reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;


  return (
    <div className="p-4 bg-white shadow-md rounded-xl mt-4">
      <h3 className="text-lg font-bold mb-2">Reviews ({reviews.length})</h3>
      <p className="text-yellow-500 flex items-center">
        <Star className="w-4 h-4 mr-1" /> Average Rating: {averageRating}
      </p>

      <div className="my-2">
        {reviews.map(review => (
          <div key={review.id} className="border-b py-2">
            <p className="text-sm text-gray-700">{review.comment || 'No comment'}</p>
            <p className="text-xs text-gray-500">Rated: {review.rating} ⭐ — {new Date(review.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h4 className="font-semibold mb-1">Leave a Review</h4>
        <input type="number" max={5} min={1} value={rating} onChange={e => setRating(Number(e.target.value))} className="border p-1 rounded w-16" />
        <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Your comment..." className="w-full border mt-2 p-2 rounded" />
        <button onClick={submitReview} className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
      </div>
    </div>
  );
};

export default ReviewComponent;
