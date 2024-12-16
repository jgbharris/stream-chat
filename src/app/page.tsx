import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image
        src="/backchat_logo.png"
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
