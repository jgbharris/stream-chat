"use client";

import { useUser } from "@clerk/nextjs";
import { Chat, LoadingIndicator } from "stream-chat-react";
import useInitializeChatClient from "../hooks/useInitializeChatClient";
import ChatChannel from "./ChatChannel";
import ChatSideBar from "./ChatSideBar";
import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import useWindowSize from "@/hooks/useWindowSize";
import { mdBreakpoint } from "@/utils/tailwind";
import { useTheme } from "../ThemeProvider";

export default function ChatPage() {
  const chatClient = useInitializeChatClient();
  const { user } = useUser();
  const { theme } = useTheme();

  const [chatSideBarOpen, setChatSideBarOpen] = useState(false);
  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width > mdBreakpoint; // 768px is the breakpoint for md screens

  useEffect(() => {
    if (windowSize.width >= mdBreakpoint) {
      setChatSideBarOpen(false);
    }
  }, [windowSize.width]);

  const handleSidebarOnClose = useCallback(() => {
    setChatSideBarOpen(false);
  }, []);

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-black">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 text-black dark:bg-black dark:text-white xl:px-20 xl:py-8">
      <div className="m-auto flex h-full min-w-[350px] max-w-[1600px] flex-col shadow-sm">
        <Chat
          client={chatClient}
          theme={theme === "dark" ? "str-chat__theme-dark" : "str-chat__light"}
        >
          <div className=" flex justify-center border-b border-b-[#DBDDE1] p-3 md:hidden">
            <button onClick={() => setChatSideBarOpen(!chatSideBarOpen)}>
              {!chatSideBarOpen ? (
                <span className="flex items-center gap-1">
                  <Menu /> Menu
                </span>
              ) : (
                <X />
              )}
            </button>
          </div>
          <div className="flex h-full flex-row overflow-y-auto">
            <ChatSideBar
              user={user}
              show={isLargeScreen || chatSideBarOpen}
              onClose={handleSidebarOnClose}
            />
            <ChatChannel show={isLargeScreen || !chatSideBarOpen} />
          </div>
        </Chat>
      </div>
    </div>
  );
}
