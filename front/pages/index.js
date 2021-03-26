import Button from "components/atoms/Button";
import Text from "components/atoms/Text";
import Input from "components/atoms/Input";

export default function Home() {
  return (
    <>
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
        <Text variant="body2">body2</Text>
        <Text variant="button">button</Text>
        {/* <Text variant="ывапро">Должен выдать  ошибку</Text> */}
      </>
      <hr></hr>
      <>
      </>
    </>
  );
}
