import Api from "@api";
import { Button } from "components/atoms";

export default function Home() {
  const handleCreate = () => {
    const data = {
      name: "test Chat",
      ownerId: "606c7926ba825204a395b3a2",
    };
    Api.DB.Conversation.create(data).then((res) => console.log(`res`, res));
  };
  const handleList = () => {
    Api.DB.Conversation.list({}).then((res) => console.log(`list`, res));
  };
  const handleListMessages = () => {
    Api.DB.Message.list({}).then((res) => console.log(`list`, res));
  };
  const handleCreateMessage = () => {
    const data = {
      content: "msg_111",
      conversationId: "60ba3c653f572da6323725d9",
      authorId: "606c7926ba825204a395b3a2",
    };
    Api.DB.Message.create(data).then((res) => console.log(`message`, res));
  };

  return (
    <>
      <Button onClick={handleCreate}>Create conv</Button>
      <Button onClick={handleList}>List conv</Button>
      <Button onClick={handleCreateMessage}>Create message</Button>
      <Button onClick={handleListMessages}>List message</Button>
    </>
  );
  // return <>Hello epta</>;
}
