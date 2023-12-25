// "use client";

import { auth, currentUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

const ProtectedPage = async () => {
    // const { userId } = useAuth();
    const { userId } = auth();
    const user = await currentUser()

  return (
    <div>
        <h1>Protected Page</h1>
        <p>Platform: {user?.username}</p>
        <p>Clerk: {userId}</p>
        <UserButton 
        afterSignOutUrl="/"/>
    </div>
  );
}
export default ProtectedPage;