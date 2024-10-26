import {
  Channel,
  MessageList,
  MessageInput,
  ChannelHeader,
  Window,
  Thread,
} from "stream-chat-react";
import { EmojiPicker } from "stream-chat-react/emojis";

interface ChatChannelProps {
  show: boolean;
}

export default function ChatChannel({ show }: ChatChannelProps) {
  return (
    <div className={`h-full w-full ${show ? "block" : "hidden"}`}>
      <Channel EmojiPicker={EmojiPicker}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </div>
  );
}
