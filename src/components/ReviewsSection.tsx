import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, UserCheck } from 'lucide-react';
import { CUSTOMER_TESTIMONIALS } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState(CUSTOMER_TESTIMONIALS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    area: '',
    rating: 5,
    orderedItem: '',
    text: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) return;

    const reviewObj = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      area: newReview.area || 'Lahore',
      rating: newReview.rating,
      date: 'Just Now',
      text: newReview.text,
      orderedItem: newReview.orderedItem || 'Pizza Guy Order',
    };

    setReviews([reviewObj, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewModal(false);
      setNewReview({ name: '', area: '', rating: 5, orderedItem: '', text: '' });
    }, 1500);
  };

  return (
    <section className="py-24 bg-[#0c0d10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#f59e0b] block mb-2">
              Lahore Customer Feedback
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              VOICES OF PIZZA LOVERS
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Real community feedback from pizza fans across Mateen Avenue, Butt Chowk, and greater Lahore.
            </p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#f59e0b]" />
            <span>Leave A Review</span>
          </button>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#15171e] border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all shadow-lg"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'text-[#f59e0b] fill-[#f59e0b]'
                            : 'text-neutral-700'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{rev.date}</span>
                  </span>
                </div>

                {/* Review text */}
                <p className="text-neutral-300 text-sm leading-relaxed mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Reviewer details & ordered item */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">{rev.name}</h4>
                    <span className="text-xs text-neutral-400">{rev.area}</span>
                  </div>
                  {rev.orderedItem && (
                    <span className="text-[10px] text-neutral-500 font-mono text-right max-w-[120px] truncate">
                      {rev.orderedItem}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowReviewModal(false)}
          />

          <div className="relative w-full max-w-md bg-[#15171e] border border-white/10 rounded-3xl p-6 z-10 shadow-2xl">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-display font-bold text-xl text-white">Review Submitted!</h3>
                <p className="text-xs text-neutral-400">
                  Thanks for sharing your love for Pizza Guy Lahore.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <h3 className="font-display font-bold text-xl text-white">Share Your Experience</h3>
                
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zaid Ahmed"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#e11d48]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">
                    Area / Location in Lahore
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mateen Avenue / Johar Town"
                    value={newReview.area}
                    onChange={(e) => setNewReview({ ...newReview, area: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#e11d48]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">
                    Dish You Ordered
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Creamy Tikka / Zinger Combo"
                    value={newReview.orderedItem}
                    onChange={(e) => setNewReview({ ...newReview, orderedItem: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#e11d48]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 text-[#f59e0b]"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReview.rating ? 'fill-[#f59e0b]' : 'stroke-neutral-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">
                    Your Review *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us what you liked about the pizza and delivery..."
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#e11d48]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="w-1/2 py-2.5 rounded-xl bg-neutral-900 text-neutral-400 text-xs font-bold hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded-xl bg-[#e11d48] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
