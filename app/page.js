'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    setTimestamp(Date.now());

    // Simple day/night theme detection
    const hour = new Date().getHours();
    const isDark = hour < 6 || hour > 18;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  const handleRockClick = async () => {
    if (loading) return;

    setLoading(true);
    setAdvice('');

    try {
      const res = await fetch('/api/advice', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.advice) {
        setAdvice(data.advice);
      } else {
        setAdvice("The rock is silent.");
      }
    } catch (error) {
      setAdvice("The rock ignores you. (Error)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" suppressHydrationWarning>
      <div
        className={`rock-container ${loading ? 'rock-speaking' : ''}`}
        onClick={handleRockClick}
      >
        <div className="rock-glow"></div>
        <img
          src={`/rock.png${timestamp ? `?v=${timestamp}` : ''}`}
          alt="Rock"
          width={500}
          height={500}
          className="rock-image"
        />
      </div>

      <div className={`advice-text ${advice ? 'visible' : ''}`}>
        {advice || "..."}
      </div>
      <a href="https://user.is-a.dev" title="a project by usertermed"><i className="fa-solid fa-ban fa-spin" color="#00000080"></i></a>
      <div className="instruction">
        {loading ? 'Rock is thinking...' : 'Touch the Rock'}
      </div>


    </main>
  );
}
