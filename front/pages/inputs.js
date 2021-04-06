import { InputImage } from "components/atoms";
import Input from "components/atoms/Input";
import { useState } from "react";
import { Bucket } from "src/api";

export default function Home() {
  const [value, setValue] = useState({ loading: false });
  const handleChange = (file) => {
    setValue({ loading: true, file });
    Bucket.localSave(file)
      .then((src) =>
        setValue((prevState) => ({ ...prevState, src, loading: false }))
      )
      .catch((err) => setValue({ loading: false }));
  };

  return (
    <>
      <br />
      <br />
      <img src={value.src} />
      <br />
      <br />
      <InputImage name="photoinp" file={value.file} onChange={handleChange} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Input name="fff" label="fdghj" error="fghgfd" value="fffff"></Input>
    </>
  );
}
