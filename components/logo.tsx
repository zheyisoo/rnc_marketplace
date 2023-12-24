import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import logo from "../public/logo.png";

import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image
          src={logo}
          alt="Logo"
          height={60}
          width={60}
        />
        <p className={cn(
          "text-lg text-neutral-700 ",
          headingFont.className,
        )}>
          Roast & Coffee
        </p>
      </div>
    </Link>
  );
};