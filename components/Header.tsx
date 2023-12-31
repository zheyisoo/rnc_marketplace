"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import Container from "./ui/container";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, ShoppingCart, Sun } from "lucide-react";
import { OrganizationSwitcher, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
// import ProfileButton from "./ProfileButton";


interface HeaderProps {
  userId: String;
}

const Header: React.FC<HeaderProps> = ({userId}) => {

  const { theme, setTheme } = useTheme();
  const {user} = useUser();
  const [dbUser, setdbUser] = useState<string>("");
  const routes = [
    {
      href: "/dashboard",
      label: "Products",
    },
    {
      href: `/dashboard/orders/${dbUser}`,
      label: "Orders",
    },
    // {
    //   href: "/",
    //   label: "On Sale",
    // },
  ];
  const router = useRouter();
  const handleOpenCart = () => {
    console.log("run here? yuser??",user)
    if (dbUser){
      router.push(`/dashboard/cart/${dbUser}`);
    }
  }

  useEffect(() => {
    if (user){
      setdbUser(user?.id)
    }
  },[user])

  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <Link
                      key={i}
                      href={route.href}
                      className="block px-2 py-1 text-lg"
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">ROAST & COFFEE</h1>
            </Link>
          </div>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
            {routes.map((route, i) => (
              <Button key={i+"button"} asChild variant="ghost">
                <Link
                  key={i}
                  href={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              aria-label="Shopping Cart"
              onClick={() => {handleOpenCart()}}
            >
              <ShoppingCart className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-6"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    height: 30,
                    width: 30,
                  }
                }
              }}
            />
            {/* <ProfileButton /> */}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;