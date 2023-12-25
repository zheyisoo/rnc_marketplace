import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import ProductList from "@/components/ProductList";
import { db } from "@/lib/db";
import rnc_banner from "@/public/img/rnc_banner2.png";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@prisma/client";

const Home = async() => {
  const products = await db.item.findMany();
  const user = await currentUser()
  let userId = "";
  if (user && user.id){
    userId = user.id
    const dbUser = await db.user.findUnique({
      where: {
        externalUSerId : user.id,
      },
    })
    console.log("login User 2", dbUser)
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
    <Container>
      <div className="space-y-10 pb-10">
        <div className="p-4 sm:p-6 lg:p-8 rounded-lg overflow-hidden">
          <div
            style={{ backgroundImage: `url(${rnc_banner.src})`, backgroundPosition: 'center bottom' }}
            className="rounded-lg relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
          >
            <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
              <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-black dark:text-white bg-secondary/60 p-4 rounded-lg">
                {/* Featured Products */}
                <Button size="lg" className="w-full py-6 text-xl">
                  <ShoppingBag className="mr-2" />
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList items={products} userId={userId} />
        </div>
      </div>
    </Container>
  );
}

export default Home;
