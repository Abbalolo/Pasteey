"use client"; // Ensure this is at the very top
import { signOut } from "firebase/auth";
import Link from 'next/link';
import React from 'react';
import { Button } from "@/components/ui/button";
import SearchPaste from './SearchPaste';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { usePathname } from 'next/navigation';
import { auth } from "../firebase/store";
import { useContextData } from "../context/contextApi";
import { useRouter } from 'next/navigation';

function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLogin } = useContextData(); // No need to use setIsLogin here
  // console.log(isLogin);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      console.log("Sign out successful");
      router.push("/"); // Redirect to home after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className='px-5 py-3 flex justify-between items-center'>
      <Link className='text-[#000207] md:text-2xl font-extrabold' href="/">PasteMe</Link>
      {pathname !== "/authenticate" && <SearchPaste />}
      <div className="flex gap-4 items-center">
        {isLogin && (
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
        {isLogin ? (
          <Button onClick={handleLogOut}>Logout</Button>
        ) : (
          <Button>
            <Link href="/authenticate">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

export default NavBar;
