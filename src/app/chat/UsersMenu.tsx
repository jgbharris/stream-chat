import { useEffect, useState } from "react";
import {
  Avatar,
  useChatContext,
  LoadingChannels as LoadingUsers,
} from "stream-chat-react";
import { UserResource } from "@clerk/types";
import { Channel, UserResponse } from "stream-chat";
import { ArrowLeft } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";

interface UsersMenuProps {
  loggedInUser: UserResource;
  onClose: () => void;
  onChannelSelected: () => void;
}

export default function UsersMenu({
  loggedInUser,
  onClose,
  onChannelSelected,
}: UsersMenuProps) {
  const { client, setActiveChannel } = useChatContext();

  const [users, setUsers] = useState<(UserResponse & { image?: string })[]>();

  const [moreUsersLoading, setMoreUsersLoading] = useState(false);

  const [endOfPaginationReached, setEndOfPaginationReached] =
    useState<boolean>();

  const pageSize = 2;

  useEffect(() => {
    async function loadInitialUsers() {
      // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
      try {
        const response = await client.queryUsers(
          {
            id: { $ne: loggedInUser.id }, // Filter out the logged in user
          },
          { id: 1 }, // Sort by id
          { limit: pageSize + 1 } // Load one more than the page size to check if there are more users
        );
        setUsers(response.users.slice(0, pageSize));
        setEndOfPaginationReached(response.users.length <= pageSize);
      } catch (error) {
        console.error(error);
        alert("Error loading users");
      }
    }
    loadInitialUsers();
  }, [client, loggedInUser.id]);

  async function loadMoreUsers() {
    setMoreUsersLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
    try {
      const lastUserId = users?.[users.length - 1].id;
      if (!lastUserId) {
        return;
      }

      const response = await client.queryUsers(
        {
          $and: [{ id: { $ne: loggedInUser.id } }, { id: { $gt: lastUserId } }],
        },
        { id: 1 },
        { limit: pageSize + 1 } // Sort by id
      );
      setUsers([...users, ...response.users.slice(0, pageSize)]);
      setEndOfPaginationReached(response.users.length <= pageSize);
    } catch (error) {
      console.error(error);
      alert("Error loading more users");
    } finally {
      setMoreUsersLoading(false);
    }
  }

  const handleChannelSelected = (channel: Channel) => {
    setActiveChannel(channel);
    onChannelSelected();
  };

  const startChatWithUser = async (userId: string) => {
    try {
      const channel = client.channel("messaging", {
        members: [loggedInUser.id, userId],
      });
      await channel.create();
      handleChannelSelected(channel);
    } catch (error) {
      console.error(error);
      alert("Error starting chat with user");
    }
  };

  return (
    <div className="str-chat absolute z-10 h-full w-full border-e border-e-[#DBDDE1] bg-white">
      <div className="flex items-center gap-3 p-3 text-lg font-bold">
        <ArrowLeft onClick={onClose} className="cursor-pointer" /> Users
      </div>
      <div>{!users && <LoadingUsers />}</div>
      {users?.map((user) => (
        <UserResult
          key={user.id}
          user={user}
          onUserClicked={startChatWithUser}
        />
      ))}
      {endOfPaginationReached === false && (
        <LoadingButton
          loading={moreUsersLoading}
          className="m-auto mb-3 w-[80%]"
          onClick={loadMoreUsers}
        >
          Load more users
        </LoadingButton>
      )}
    </div>
  );
}

interface UserResultProps {
  user: UserResponse & { image?: string };
  onUserClicked: (userId: string) => void;
}

function UserResult({ user, onUserClicked }: UserResultProps) {
  return (
    <button
      className="mb-3 flex w-full items-center gap-2 p-2 hover:bg-[#e9eaed]"
      onClick={() => onUserClicked(user.id)}
    >
      <span className="h-8 w-8">
        <Avatar image={user.image} name={user.name || user.id} />
      </span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {user.name || user.id}
      </span>
      {user.online && <span className="text-xs text-green-500">Online</span>}
    </button>
  );
}
