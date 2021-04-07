import PropTypes from "prop-types";
import React, { useState } from "react";
import styles from "./Image.module.scss";

const Image = (props) => {
  const { src, className } = props;
  const [error, setError] = useState(src ? false : true);
  useState(() => {
    setError(src ? false : true);
  }, [src]);
  return (
    <div className={`${styles["image"]}`}>
      {error ? (
        <img src="/images/loadingFailed.svg" className={` ${className}`} />
      ) : (
        <img
          src={`${process.env.API_PATH}${src}`}
          alt="alt"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

Image.propTypes = {};

export default Image;
