type CounterProps = {
  count: number;
};

const Counter: React.FC<CounterProps> = ({ count }) => {
  return <div>{count}</div>;
};

export default Counter;
