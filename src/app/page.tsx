import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-tl from-gray-200 via-gray-100 to-black">
      <Image
        src="/back_chat_logo_transparent.png"
        width={800}
        height={800}
        alt="Back Chat Logo"
      />
      <h1 className="my-6 text-4xl font-bold">
        The new way to connect with friends
      </h1>
      <Button as={Link} href="/chat" className="w-[360px] font-bold">
        START CHATTING
      </Button>
    </div>
  );
}
