// import Image from "next/image";
// import ChatPage from "./chat/page";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-1 text-6xl font-extrabold text-blue-500">BackChat</h1>
      <p className="mb-10">The coolest chat app</p>
      <Button as={Link} href="/chat">
        Start Chatting
      </Button>
    </div>
  );
}
