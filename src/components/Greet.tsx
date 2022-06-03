import { useState, useEffect } from 'react';

type GreetProps = {
  name: string;
};

const Greet: React.FC<GreetProps> = ({ name }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    document.title = `Counter is ${count}`;
  }, [count]);

  return (
    <div onClick={(e) => setCount(count + 1)}>
      Hello <strong>{name}</strong>, how are you?
      <span>I counted {count}</span>
    </div>
  );
};

export default Greet;
