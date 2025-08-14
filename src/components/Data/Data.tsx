"use client";
import React, { useState, useEffect } from "react";

const counts = [
  {
    count: 2500,
    label: "Girls Helped",
  },
  {
    count: 15000,
    label: "Pads Distributed",
  },
  {
    count: 300,
    label: "Schools Reached",
  },
  {
    count: 500,
    label: "Volunteers",
  },
];

interface CounterProps {
  end: number;
  duration?: number;
  className?: string;
}

function Counter({ end, duration = 2000, className = "" }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
     
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(end * easeOut));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <span className={className}>
      {count.toLocaleString()}
    </span>
  );
}

const DataCount = () => {
  return (
    <div className="w-full flex justify-center items-center bg-[#FFFAFD] px-[80px] py-[40px]">
      <div className="w-[95%] bg-[#FFF5F9] flex flex-row justify-between px-16">
      {counts.map((item, index) => (
        <aside
          key={index}
          className="flex flex-col items-center justify-center p-4"
        >
          <h2
            className="text-[52px] font-bold text-[#989797]"
            style={{
              fontFamily: "OpenSans-Semi",
            }}
          >
            {/* {item.count} */}
            <Counter end={item.count} />
          </h2>
          <p className="text-[20px] text-[#393939]" style={{
            fontFamily: "OpenSans"
          }}>{item.label}</p>
        </aside>
      ))}
    </div>
    </div>
  );
};

export default DataCount;
