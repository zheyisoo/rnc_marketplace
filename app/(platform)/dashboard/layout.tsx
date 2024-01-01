"use client"

import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";
import Header from "@/components/Header";
import { db } from "@/lib/db";
import useUserStore from "@/store/useUserStore";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const DashboardLayout = ({ 
  children
}: { 
  children: React.ReactNode;
 }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const store = useUserStore()

  useEffect(() => {
    if (user && user.username){
      useUserStore.setState({userId:user.username})
    }
  }, [user])



  // let userId = "";
  // if (user && user.id){
  //   userId = user.id
  //   const dbUser = await db.user.findUnique({
  //     where: {
  //       externalUSerId : user.id,
  //     },
  //   })
  //   if (!dbUser){
  //     const newUser = await db.user.create({
  //       data: {
  //         externalUSerId: user.id,
  //         username: user?.username || "unknown",
  //         email: user.emailAddresses[0]?.emailAddress || "unknown",
  //         password: user.emailAddresses[0]?.emailAddress || "unknown",
  //       },
  //     })
  //     console.log("newUser", newUser)
  //   }
  // }

  return (
    <div>
      <Header userId={""} />
      <div className="pt-20 md:pt-24">
        <div className="flex">
          <div className="w-full h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
 };

 export default DashboardLayout;