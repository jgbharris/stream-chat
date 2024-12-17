import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-tl from-gray-200 via-gray-100 to-black">
      <Image
        src="/back_chat_logo_transparent.png"
        width={700}
        height={700}
        alt="Back Chat Logo"
      />
      <div className="flex">
        <Image
          src="/screenshot_light.png"
          width={400}
          height={400}
          alt="App in light theme"
          className="skew-y-6"
        />
        <Image
          src="/screenshot_dark.png"
          width={400}
          height={400}
          alt="App in dark theme"
          className="mx-20 skew-y-6"
        />
      </div>

      <h1 className="my-20 text-4xl font-bold">
        The new way to connect with friends
      </h1>
      <Button as={Link} href="/chat" className="w-[360px] font-bold">
        START CHATTING
      </Button>
    </div>
  );
}
