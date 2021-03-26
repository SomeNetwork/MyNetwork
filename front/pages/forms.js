import Form from "components/atoms/Form";

const fields = [
  {
    label: "Test inp",
    name: "test",
    defaultValue: "def val",
    rules: [
      (v) => v.length > 3 || "len less than 4",
      (v) => v !== "" || "Заполните поле",
    ],
    required: true,
  },
  {
    label: "Test inp num",
    name: "test num",
    defaultValue: 0,
    type: "number",
    rules: [
      (v) => v >= 0 || "less than 0",
      (v) => v !== "" || "Заполните поле",
    ],
    required: true,
    htmlProps: {
      min: 0,
      step: 1,
    },
  },
];

const button = {
  text: "Submit form",
  variant: "primary",
};
export default function Home() {
  return (
    <>
      <Form
        fields={fields}
        onSubmit={(vals) => console.log(`vals`, vals)}
        title="Test title"
        submitButton={button}
      />
      <Form
        fields={fields}
        onSubmit={(vals) => console.log(`vals`, vals)}
        title="Test title"
        submitButton={button}
      />
    </>
  );
}
