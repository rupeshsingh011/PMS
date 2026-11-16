import React, { useState } from 'react';
import {
  MessageSquare, Star, Search, CheckCircle2,
  ThumbsUp, Send, X, CornerDownRight
} from 'lucide-react';

const INITIAL_FEEDBACK = [
  {
    id: 'FB-901',
    ticketId: 'TKT-1045',
    client: 'Globex Inc',
    reviewer: 'Sarah Jenkins (Admin Head)',
    engineer: 'Rajesh Kumar',
    rating: 5,
    date: '2023-11-15',
    comment: 'Rajesh arrived within 45 minutes of the ticket being raised. Replaced the roller assembly and calibrated print colors. Super professional service!',
    tags: ['Prompt Response', 'Clean Work', 'Polite Manner'],
    status: 'Resolved',
    reply: 'Thank you Sarah! Glad our engineer could restore your production queue promptly.'
  },
  {
    id: 'FB-902',
    ticketId: 'TKT-1042',
    client: 'Acme Corp',
    reviewer: 'Vikram Malhotra (IT Lead)',
    engineer: 'Amit Vikram Singh',
    rating: 5,
    date: '2023-11-14',
    comment: 'Amit resolved the complex network spooler issue that had plagued our 3rd floor MFP for two days. Outstanding depth of knowledge.',
    tags: ['Technical Expert', 'Permanent Fix'],
    status: 'Resolved',
    reply: null
  },
  {
    id: 'FB-903',
    ticketId: 'TKT-1038',
    client: 'Zenith Logistics',
    reviewer: 'Ananya Sharma (Operations)',
    engineer: 'Sunil Verma',
    rating: 4,
    date: '2023-11-12',
    comment: 'The machine is working great now. Only feedback is that the replacement toner box arrived in a separate parcel 2 hours later.',
    tags: ['Good Service', 'Logistics Minor Delay'],
    status: 'Acknowledged',
    reply: 'Noted with thanks Ananya. We have streamlined spare parts dispatch for faster turnaround.'
  },
  {
    id: 'FB-904',
    ticketId: 'TKT-1031',
    client: 'Apollo Diagnostics',
    reviewer: 'Dr. R. Saxena',
    engineer: 'Deepak Sharma',
    rating: 3,
    date: '2023-11-10',
    comment: 'Engineer solved the issue but took 5 hours to reach the hospital due to traffic. Critical reports were delayed.',
    tags: ['SLA Delay', 'Traffic Delay'],
    status: 'Follow-Up Needed',
    reply: null
  },
  {
    id: 'FB-905',
    ticketId: 'TKT-1025',
    client: 'Starlight Media Hub',
    reviewer: 'Rohit Khanna (Creative Director)',
    engineer: 'Pooja Rawat',
    rating: 5,
    date: '2023-11-08',
    comment: 'Color proofing printer is now printing with exact Pantone fidelity. Pooja is definitely our favorite engineer!',
    tags: ['Color Calibration', 'Above & Beyond'],
    status: 'Resolved',
    reply: 'Thrilled to hear this! Color fidelity is paramount for creative agencies.'
  }
];

const CustomerFeedback = () => {
  const [feedbackList, setFeedbackList] = useState(INITIAL_FEEDBACK);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');

  // Reply Modal
  const [activeFeedback, setActiveFeedback] = useState(null);
  const [replyText, setReplyText] = useState('');

  const ratings = ['All', '5 Stars', '4 Stars', 'Critical (<4 Stars)'];

  const filteredFeedback = feedbackList.filter(item => {
    const matchesSearch =
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reviewer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.engineer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.comment.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesRating = true;
    if (ratingFilter === '5 Stars') matchesRating = item.rating === 5;
    else if (ratingFilter === '4 Stars') matchesRating = item.rating === 4;
    else if (ratingFilter === 'Critical (<4 Stars)') matchesRating = item.rating < 4;

    return matchesSearch && matchesRating;
  });

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!activeFeedback) return;
    setFeedbackList(feedbackList.map(item => {
      if (item.id === activeFeedback.id) {
        return { ...item, reply: replyText, status: 'Resolved' };
      }
      return item;
    }));
    setActiveFeedback(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Feedback & CSAT</h1>
            <p className="text-xs text-gray-500">Post-service customer satisfaction reviews, technician ratings, and resolution feedback.</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Average CSAT</span>
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            <span className="text-2xl font-black text-gray-900">4.86</span>
            <span className="text-xs text-gray-400 font-semibold">/ 5.0</span>
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1">+0.12 vs industry benchmark</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Net Promoter Score</span>
          <div className="text-2xl font-black text-indigo-600 mt-2">+76</div>
          <div className="text-xs text-indigo-600 font-medium mt-1">World-class NPS rating</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">5-Star Feedback</span>
          <div className="text-2xl font-black text-emerald-600 mt-2">91.2%</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">456 five-star ratings</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Verified Reviews</span>
          <div className="text-2xl font-black text-gray-900 mt-2">624</div>
          <div className="text-xs text-gray-500 font-medium mt-1">Collected post-service</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search feedback by client, engineer, comment..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1">
            {ratings.map((r) => (
              <button
                key={r}
                onClick={() => setRatingFilter(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  ratingFilter === r
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Feed Cards */}
      <div className="space-y-4">
        {filteredFeedback.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center text-gray-400">
            No customer feedback matching criteria.
          </div>
        ) : (
          filteredFeedback.map((fb) => (
            <div key={fb.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 font-bold flex items-center justify-center text-sm">
                    {fb.client.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{fb.client}</div>
                    <div className="text-xs text-gray-500">{fb.reviewer} • Ref: <span className="font-semibold text-indigo-600">{fb.ticketId}</span></div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= fb.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-400">{fb.date}</span>
                </div>
              </div>

              {/* Comment */}
              <p className="text-gray-700 text-sm leading-relaxed">
                "{fb.comment}"
              </p>

              {/* Tags & Engineer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-gray-400 font-medium mr-1">Engineer:</span>
                  <span className="text-xs font-bold text-gray-800 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                    {fb.engineer}
                  </span>
                  {fb.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[10px] font-semibold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-md">
                      <ThumbsUp className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div>
                  {fb.reply ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Response Sent
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        setActiveFeedback(fb);
                        setReplyText('');
                      }}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Reply to Client
                    </button>
                  )}
                </div>
              </div>

              {/* Reply Section */}
              {fb.reply && (
                <div className="mt-3 bg-gray-50/80 rounded-xl p-3 border border-gray-100 flex items-start gap-2.5 text-xs">
                  <CornerDownRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-800">Support Desk Response:</span>
                    <p className="text-gray-600 mt-0.5 leading-relaxed">{fb.reply}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Reply Modal */}
      {activeFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">Reply to Customer Review</h3>
                <p className="text-xs text-gray-400">{activeFeedback.client} ({activeFeedback.reviewer})</p>
              </div>
              <button onClick={() => setActiveFeedback(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl text-xs italic text-gray-600">
              "{activeFeedback.comment}"
            </div>

            <form onSubmit={handleSendReply} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Official Response *</label>
                <textarea
                  rows={3}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Thank the client for their feedback or explain remedial steps taken..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setActiveFeedback(null)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  Post Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerFeedback;
