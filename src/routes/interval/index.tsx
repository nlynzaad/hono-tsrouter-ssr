import { createFileRoute } from '@tanstack/react-router';
import {useEffect, useState} from "react";

export const Route = createFileRoute('/interval/')({
  component: IntervalPage,
});

function IntervalPage() {
  const [intervalCount, setIntervalCount ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIntervalCount((prev: number) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [])

  return (
    <div>
      <h1>Interval count</h1>
      <br/>
      <p>Count: {intervalCount}</p>
    </div>
  );
}
