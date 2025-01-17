import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { db } from "@/lib/db";
import Buttons from "./buttons";

export const Actions = async () => {
  const user = await currentUser();
  // console.log(user.id);
  let userdata = null;
  if (user) {
    userdata = await db.user.findUnique({
      where: {
        externalUserId: user?.id,
      },
    });
  }

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {user && <Buttons user={userdata} />}
      <Link href={`/products`}>
        <span className="">Products</span>
      </Link>
      {!user && (
        <SignInButton>
          <Button size="sm" variant="primary">
            Login
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user?.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
};
