import React, { useEffect, useRef } from "react";
import styles from "./Input.module.scss";
import PropTypes from "prop-types";
import { Delete, ImageSearch } from "@material-ui/icons";

const Input = (props) => {
  const { file, onChange, error, htmlProps } = props;

  const inputRef = useRef(null);

  const handleClear = () => {
    inputRef.current.value = null;
    onChange(null);
  };
  useEffect(() => {
    if (!file) inputRef.current.value = null;
  }, [file]);
  return (
    <div
      className={`${styles["inp-container"]} ${error ? styles["error"] : ""} ${
        styles[file ? "selected" : "empty"]
      }`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={(oEvent) => onChange(oEvent.target.files[0])}
        {...htmlProps}
        id="inpFile"
        ref={inputRef}
      />
      <label className={styles["left"]}> {file ? "Selected" : "Empty"}</label>
      <label className={styles["left2"]} onClick={handleClear}>
        Delete
        <Delete />
      </label>
      <label className={styles["right"]} htmlFor="inpFile">
        <ImageSearch />
        Choose
      </label>
    </div>
  );
};

export const InputPropTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([false])]),
  onChange: PropTypes.func,
  file: PropTypes.any,
  htmlProps: PropTypes.object,
};
Input.propTypes = InputPropTypes;

Input.defaultProps = {
  value: "",
  required: false,
  fluid: false,
};

export default Input;
