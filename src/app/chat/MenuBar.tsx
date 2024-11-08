import { UserButton } from "@clerk/nextjs";
import { BellOff, BellRing, Moon, Sun, Users } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { dark } from "@clerk/themes";
import { useEffect, useState } from "react";
import {
  getCurrentPushSubscription,
  registerPushNotifications,
  unregisterPushNotifications,
} from "@/notifications/pushService";

interface MenuBarProps {
  onUserMenuClick: () => void;
}

export default function MenuBar({ onUserMenuClick }: MenuBarProps) {
  const { theme } = useTheme();
  return (
    <div className="flex items-center justify-between gap-3 border-e border-e-[#DBDDE1] bg-white p-3 dark:border-e-gray-800 dark:bg-[#17191c]">
      <UserButton
        appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
      />
      <div className="flex gap-6">
        <PushSubscriptionToggleButton />
        <span title="Show users">
          <Users className="cursor-pointer" onClick={onUserMenuClick} />
        </span>
        <ThemeToggleButton />
      </div>
    </div>
  );
}

function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  if (theme === "dark") {
    return (
      <span title="Enable light theme">
        <Moon className="cursor-pointer" onClick={() => setTheme("light")} />
      </span>
    );
  }

  return (
    <span title="Enable dark theme">
      <Sun className="cursor-pointer" onClick={() => setTheme("dark")} />
    </span>
  );
}

function PushSubscriptionToggleButton() {
  const [hasActivePushSubscription, setHasActivePushSubscription] =
    useState<boolean>();

  useEffect(() => {
    async function getActivePushSubscription() {
      const subscription = await getCurrentPushSubscription();
      setHasActivePushSubscription(!!subscription);
    }
    getActivePushSubscription();
  }, []);

  async function setPushNotificationsEnabled(enabled: boolean) {
    try {
      if (enabled) {
        await registerPushNotifications();
      } else {
        await unregisterPushNotifications();
      }
      setHasActivePushSubscription(enabled);
    } catch (error) {
      console.error("Error setting push notifications enabled", error);
      if (enabled && Notification.permission === "denied") {
        alert("Please enable push notifications in your browser");
      } else {
        alert("Something went wrong, please try again");
      }
    }
  }

  if (hasActivePushSubscription === undefined) {
    return null;
  }

  return (
    <div>
      {hasActivePushSubscription ? (
        <span title="Disable push notifications on this device">
          <BellOff
            className="cursor-pointer"
            onClick={() => {
              setPushNotificationsEnabled(false);
            }}
          />
        </span>
      ) : (
        <span title="Enable push notifications on this device">
          <BellRing
            className="cursor-pointer"
            onClick={() => {
              setPushNotificationsEnabled(true);
            }}
          />
        </span>
      )}
    </div>
  );
}
