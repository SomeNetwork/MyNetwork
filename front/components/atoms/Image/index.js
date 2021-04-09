import PropTypes from "prop-types";
import React, { useState } from "react";
import styles from "./Image.module.scss";

const Image = (props) => {
  const { src, url, className, variant } = props;
  const [error, setError] = useState(src ? false : true);
  const imgSrc = url ? process.env.API_PATH + url : src;
  console.log("imgSrc1 :>> ", !!imgSrc, !!url, !!src);
  useState(() => {
    console.log("22222222 :>> ", !!imgSrc);
    setError(imgSrc ? false : true);
  }, [url, src]);

  return (
    <div className={`${styles["image"]} ${variant ? styles[variant] : ""}`}>
      {error ? (
        <img src="/images/loadingFailed.svg" className={` ${className}`} />
      ) : (
        <img src={imgSrc} alt="alt" onError={() => setError(true)} />
      )}
    </div>
  );
};

Image.propTypes = {
  className: PropTypes.any,
  src: PropTypes.string,
  url: PropTypes.string,
  variant: PropTypes.oneOf(["avatar"]),
};

export default Image;
