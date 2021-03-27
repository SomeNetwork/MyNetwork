import { Toast, Button, Text } from "components/atoms";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { notificationCreate } from "store/notifications/actions";

export default function Home() {
  const [hidden, setHidden] = useState(false);
  const dispatch = useDispatch();
  const createToast = () => {
    dispatch(
      notificationCreate({
        type: "info",
        text: "12 34512345 623456 3456",
        onClick: () => console.log("clicked"),
      })
    );
  };
  return (
    <>
      <Button onClick={createToast}>Создать тост</Button>
      <>
        <p className="text-header">Example "header" </p>
        <p className="text-title">Example "title" </p>
        <p className="text-subtitle">Example "subtitle" </p>
        <p className="text-body">Example "body" </p>
        <p className="text-body2">Example "body2" </p>
        <p className="text-button">Example "button" </p>
      </>
      <hr></hr>
      <>
        <Button>Просто кнопка</Button>
        <Button>fffff</Button>
        <Button variant="secondary"> secondary </Button>
        <Button variant="success"> success </Button>
        <Button variant="warning"> warning </Button>
        <Button variant="error"> error </Button>
      </>
      <hr></hr>
      <>
        <Text>Просто текст</Text>
        <Text variant="header">header</Text>
        <Text variant="title">title</Text>
        <Text variant="subtitle">subtitle</Text>
        <Text variant="body">body</Text>
        <Text variant="body">body</Text>
        <Text variant="body2">body2</Text>
        <Text variant="button">button</Text>
        <Text variant="body">
          body Как я могу просто разорвать его, чтобы уехать навсегда и никогда
          не body говорить? Я body собираюсь написать это для вас, чтобы
          издеваться. Очистите свой ум в тысячный раз. Я был слишком вовлечен,
          чтобы назвать его. Я был далеко так долго все у меня есть слабые
          фонды, желаемое мысли, и все вокруг большей зрения.
        </Text>
        {/* <Text variant="ывапро">Должен выдать  ошибку</Text> */}
      </>
      <hr></hr>
      {/* <Toast
        variant="success"
        text="Examlple. success text. Как я могу просто разорвать его, чтобы уехать"
      />
      <Toast variant="info" text="Examlple. info text." />
      <Toast
        variant="warning"
        text="Examlple. warning text."
        onClose={() => setHidden(false)}
      />
      <Toast
        variant="error"
        text="Examlple. error text."
        hidden={hidden}
        onClose={() => setHidden(true)}
        onClick={() => console.log("clicked")}
      /> */}
    </>
  );
}
