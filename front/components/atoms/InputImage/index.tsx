import React from "react";
import styles from "./InputImage.module.scss";
import { Delete, ImageSearch } from "@material-ui/icons";

export interface InputImageProps {
  name?: string;
  error?: string | false;
  onChange: (file?: File) => void;
  file?: File;
  htmlProps?: React.HTMLProps<HTMLInputElement>;
}

const InputImage = (props: InputImageProps) => {
  const { file, onChange, error, htmlProps } = props;

  const handleChange = (oEvent: React.ChangeEvent<HTMLInputElement>): void => {
    if (oEvent.target.files) onChange(oEvent.target.files[0]);
  };

  const handleClear = (): void => {
    onChange();
  };

  const imgInputKey = file ? file.name : "";

  return (
    <div
      className={`${styles["inp-container"]} ${error ? styles["error"] : ""} ${
        styles[file ? "selected" : "empty"]
      }`}
    >
      <input
        key={imgInputKey}
        type="file"
        accept="image/*"
        onChange={handleChange}
        {...htmlProps}
        id="inpFile"
      />
      <label className={styles["left"]}> {file ? "Selected" : "Empty"}</label>
      <button className={styles["left2"]} onClick={handleClear}>
        Delete
        <Delete />
      </button>
      <label className={styles["right"]} htmlFor="inpFile">
        <ImageSearch />
        Choose
      </label>
    </div>
  );
};

InputImage.defaultProps = {
  value: "",
  required: false,
  fluid: false,
};

export default InputImage;
