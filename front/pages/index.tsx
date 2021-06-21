import Api from "@api";
import { Button } from "components/atoms";
import { ConversationTypes } from "src/interfaces/Conversation";

export default function Home() {
  const handleCreate = () => {
    const data = {
      name: "test Chat",
      ownerId: "606c7926ba825204a395b3a2",
      type: ConversationTypes["group"],
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
      content: "last",
      conversationId: "60bb74b9f83384eec4df1323",
      authorId: "606c7926ba825204a395b3a2",
      type: "group",
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
