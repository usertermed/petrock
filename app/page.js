'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  const handleRockClick = async () => {
    if (loading) return;

    setLoading(true);
    setAdvice(''); // Clear previous advice or keep it? Clearing looks like "thinking".

    try {
      const res = await fetch('/api/advice', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.advice) {
        setAdvice(data.advice);
      } else {
        setAdvice("The rock is silent today.");
      }
    } catch (error) {
      setAdvice("The rock ignores you.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <div
        className={`rock-container ${loading ? 'rock-speaking' : ''}`}
        onClick={handleRockClick}
      >
        <img
          src={`/rock.png${timestamp ? `?v=${timestamp}` : ''}`}
          alt="Pet Rock"
          width={500}
          height={500}
          className="rock-image"
        />
      </div>

      <div className={`advice-text ${advice ? 'visible' : ''}`}>
        {advice || "The rock is silent today."}
      </div>

      <div className="instruction">
        {loading ? 'Rock is thinking...' : 'Touch the Rock'}
      </div>
    </main>
  );
}
