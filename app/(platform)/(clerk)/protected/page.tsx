"use client";

import { useAuth,useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

const ProtectedPage = () => {
    const { userId } = useAuth();
    const { user } = useUser();

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