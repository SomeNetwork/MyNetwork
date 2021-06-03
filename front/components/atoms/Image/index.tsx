import React, { useEffect, useState } from "react";
import styles from "./Image.module.scss";

export interface ImageProps {
  className?: string;
  src?: string | null;
  url?: string | null;
  variant?: "avatar";
}

const Image = (props: ImageProps) => {
  const { src, url, className, variant } = props;
  const [error, setError] = useState(src ? false : true);

  const imgSrc = url ? process.env.API_PATH + url : src;

  useEffect(() => {
    setError(imgSrc ? false : true);
  }, [url, src, imgSrc]);

  return (
    <div
      className={`${styles["image"]} ${
        variant ? styles[variant] : ""
      } ${className}`}
    >
      {error ? (
        <img
          src="/images/loadingFailed.svg"
          className={` ${className}`}
          alt="Ooops"
        />
      ) : (
        <img
          src={imgSrc ? imgSrc : undefined}
          alt="alt"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

export default Image;
