import Input from "components/atoms/Input";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  return (
    <>
      <Input
        label="gggg"
        value={value}
        onChange={setValue}
        type="text"
        // error="Текст какой-то ошибки"
        error={value == 1 && "qwertyui"}
      />
      {/* <br /> */}
      <p>Результат: {value || "empty"}</p>
    </>
  );
}
