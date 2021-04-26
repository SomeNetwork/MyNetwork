import React, { useEffect, useState } from "react";
import styles from "./Image.module.scss";

type ImageProps = {
  className: string;
  src: string;
  url: string;
  variant: "avatar";
};

const Image = (props: ImageProps) => {
  const { src, url, className, variant } = props;
  const [error, setError] = useState(src ? false : true);

  const imgSrc = url ? process.env.API_PATH + url : src;

  useEffect(() => {
    setError(imgSrc ? false : true);
  }, [url, src, imgSrc]);

  return (
    <div className={`${styles["image"]} ${variant ? styles[variant] : ""}`}>
      {error ? (
        <img
          src="/images/loadingFailed.svg"
          className={` ${className}`}
          alt="Ooops"
        />
      ) : (
        <img src={imgSrc} alt="alt" onError={() => setError(true)} />
      )}
    </div>
  );
};

export default Image;
