import { useState } from 'react';

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  width = 1200,
  height = 800,
  loading = 'lazy',
  priority = false,
  ...props
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`image-fallback ${className}`}
        role="img"
        aria-label={alt}
        style={{ aspectRatio: `${width} / ${height}` }}
        {...props}
      >
        <span aria-hidden="true">G</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
