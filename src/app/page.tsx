import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-tl from-gray-200 via-gray-100 to-black p-3">
      <Image
        src="/back_chat_logo_transparent.png"
        width={550}
        height={550}
        alt="Back Chat Logo"
      />
      <div className="m-3 flex h-screen w-screen items-center justify-center gap-2 sm:flex-col md:flex-col lg:flex-row">
        <div>
          <Image
            src="/screenshot_light.png"
            width={300}
            height={300}
            alt="App in light theme"
            className="ml-2 skew-y-6"
          />
        </div>
        <div>
          <Image
            src="/screenshot_dark.png"
            width={300}
            height={300}
            alt="App in dark theme"
            className="skew-y-6"
          />
        </div>
      </div>

      <h2 className="my-20 text-center text-4xl font-bold">
        The new way to connect with friends
      </h2>
      <Button as={Link} href="/chat" className="w-[360px] font-bold">
        START CHATTING
      </Button>
    </div>
  );
}
