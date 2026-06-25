import { useState } from "react";

type LazyImageProps = {
    src: string;
    alt: string;
    className?: string;
}

const LazyImage = ({ src, alt, className }:LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={`
        transition-all duration-500
        ${className}
        ${loaded ? "opacity-100" : "opacity-0"}
      `}
    />
  );
};

export default LazyImage
