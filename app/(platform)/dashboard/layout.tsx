import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";
import Header from "@/components/Header";
import { auth, currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";

const DashboardLayout = async ({ 
  children
}: { 
  children: React.ReactNode;
 }) => {
  const user = await currentUser()
  let userId = "";
  if (user && user.id){
    userId = user.id
    const dbUser = await db.user.findUnique({
      where: {
        externalUSerId : user.id,
      },
    })
    console.log("login User", dbUser)
    if (!dbUser){
      const newUser = await db.user.create({
        data: {
          externalUSerId: user.id,
          username: user?.username || "unknown",
          email: user.emailAddresses[0]?.emailAddress || "unknown",
          password: user.emailAddresses[0]?.emailAddress || "unknown",
        },
      })
      console.log("newUser", newUser)
    }
  }

  return (
    <div>
      <Header userId={userId} />
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