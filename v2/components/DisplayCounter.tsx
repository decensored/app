import useStore from 'lib/store';

const DisplayCounter = () => {
  const count = useStore((state) => state.count);

  return <p>Counter is now {count}</p>;
};

export default DisplayCounter;
