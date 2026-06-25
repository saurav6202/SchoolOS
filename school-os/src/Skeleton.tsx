type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div
      className={`
        animate-pulse
        rounded-xl
        bg-slate-200
        ${className}
      `}
    />
  );
};

export default Skeleton;
