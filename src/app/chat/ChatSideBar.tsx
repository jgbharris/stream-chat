import {
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
} from "stream-chat-react";
import MenuBar from "./MenuBar";
import { UserResource } from "@clerk/types";
import { useCallback, useEffect, useState } from "react";
import UsersMenu from "./UsersMenu";

interface ChatSideBarProps {
  user: UserResource;
  show: boolean;
  onClose: () => void;
}

export default function ChatSideBar({ user, show, onClose }: ChatSideBarProps) {
  const [usersMenuOpen, setUsersMenuOpen] = useState(false);

  useEffect(() => {
    if (!show) {
      setUsersMenuOpen(false);
    }
  }, [show]);

  const ChannelPreviewCustom = useCallback(
    (props: ChannelPreviewUIComponentProps) => (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onClose();
        }}
      />
    ),
    [onClose]
  );

  return (
    <div
      className={`relative w-full flex-col md:max-w-[360px] ${
        show ? "flex" : "hidden"
      }`}
    >
      {usersMenuOpen && (
        <UsersMenu
          loggedInUser={user}
          onClose={() => setUsersMenuOpen(false)}
          onChannelSelected={() => {
            setUsersMenuOpen(false);
            onClose();
          }}
        />
      )}
      <MenuBar onUserMenuClick={() => setUsersMenuOpen(true)} />
      <ChannelList
        filters={{ type: "messaging", members: { $in: [user.id] } }}
        sort={{ last_message_at: -1 }}
        options={{ presence: true, state: true, limit: 10 }}
        Preview={ChannelPreviewCustom}
        showChannelSearch
        additionalChannelSearchProps={{
          placeholder: "Search channels",
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: {
                members: {
                  $in: [user.id],
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
