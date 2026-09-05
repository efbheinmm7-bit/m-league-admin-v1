import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // မိမိ၏ firebase configuration ကို ချိတ်ဆက်ပါ
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';

const NextMatch = () => {
  const [nextMatch, setNextMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Upcoming ပွဲစဉ်များထဲမှ အစောဆုံးလာမည့် ၁ ပွဲကို ဆွဲယူခြင်း
    const q = query(
      collection(db, 'matches'),
      where('status', '==', 'upcoming'),
      orderBy('date', 'asc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const matchData = snapshot.docs[0].data();
        setNextMatch({ id: snapshot.docs[0].id, ...matchData });
      } else {
        setNextMatch(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-white text-center p-4">Loading Next Match...</div>;

  if (!nextMatch) {
    return (
      <div className="bg-gray-900 text-gray-400 p-4 rounded-xl text-center my-4 border border-gray-800">
        No upcoming matches scheduled.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-5 rounded-xl border border-gray-800 my-4 shadow-lg">
      <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider text-center mb-3">
        Next Match
      </h3>
      
      <div className="flex items-center justify-between my-2">
        {/* Home Team */}
        <div className="flex-1 text-center font-bold text-sm sm:text-base">
          {nextMatch.homeTeam}
        </div>

        {/* VS / Time */}
        <div className="px-3 py-1 bg-purple-900/40 border border-purple-500/30 rounded-lg text-xs text-purple-300 font-semibold mx-2">
          VS
        </div>

        {/* Away Team */}
        <div className="flex-1 text-center font-bold text-sm sm:text-base">
          {nextMatch.awayTeam}
        </div>
      </div>

      {/* Match Details (Date & Venue) */}
      <div className="mt-3 text-center text-xs text-gray-400 space-y-1 border-t border-gray-800 pt-2">
        <p> {nextMatch.date} - {nextMatch.time}</p>
        {nextMatch.venue && <p> {nextMatch.venue}</p>}
      </div>
    </div>
  );
};

export default NextMatch;

