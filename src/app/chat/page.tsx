"use client";

import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  ChannelHeader,
  Window,
  Thread,
  LoadingIndicator,
  ChannelList,
} from "stream-chat-react";
import { EmojiPicker } from "stream-chat-react/emojis";
import useInitializeChatClient from "../hooks/useInitializeChatClient";
import { useUser } from "@clerk/nextjs";

export default function ChatPage() {
  const chatClient = useInitializeChatClient();
  const { user } = useUser();

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingIndicator size={40} />;
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Chat client={chatClient}>
        <div className="flex h-full flex-row">
          <div className="w-full max-w-[360px]">
            <ChannelList
              filters={{ type: "messaging", members: { $in: [user.id] } }}
              sort={{ last_message_at: -1 }}
              options={{ presence: true, state: true, limit: 10 }}
            />
          </div>
          <div className="h-full w-full">
            <Channel EmojiPicker={EmojiPicker}>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
}
