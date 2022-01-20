import useStore from 'lib/store';

const HelloWorld = () => {
  const { count, inc } = useStore((state) => ({
    count: state.count,
    inc: state.inc,
  }));

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello Decensored World!</h1>
      <p>
        <button type="button" onClick={inc}>
          Click here to increment count ({count})
        </button>
      </p>
    </>
  );
};

export default HelloWorld;
