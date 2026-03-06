import Image from "next/image";
import { add } from "@findmyspot/sample-lib";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {add(1, 2)}
    </div>
  );
}
