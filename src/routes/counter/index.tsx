import { createFileRoute } from '@tanstack/react-router';
import {useState} from "react";

export const Route = createFileRoute('/counter/')({
  component: CounterPage,
});

function CounterPage() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter</h1>
      <br/>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className={'button'}>Increment</button>
    </div>
  );
}
