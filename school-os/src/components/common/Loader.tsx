const Loader = ({ borderColor = "border-white" }: { borderColor?: string }) => {
  return (
    <div
      className={`
        h-5 w-5
        rounded-full border-2  border-t-transparent
        animate-spin
        ${borderColor}
      `}
    ></div>
  );
};

export default Loader;
