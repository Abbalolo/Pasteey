"use client"; // Ensure this is at the very top
import { CgClose } from "react-icons/cg"; 
import { BiDotsVerticalRounded } from "react-icons/bi"; 
import { signOut } from "firebase/auth";
import Link from 'next/link';
import React, { useState } from 'react';
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
  const [isOpen, setIsOpen] = useState<boolean>(false);


  const handleLogOut = async () => {

    try {
      await signOut(auth);
      console.log("Sign out successful");
      router.push("/authenticate"); 
      // Redirect to home after sign out
      setIsOpen(false)
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className='px-5 lg:px-16  py-5 flex justify-between items-center gap-4 md:gap-0'>
      <Link className='text-[#000207] md:text-2xl font-extrabold' href="/">Pasteey</Link>
      {pathname !== "/authenticate" && <SearchPaste />}
      {isOpen &&  <div onClick={() => setIsOpen(false)} className="absolute top-16 left-0 w-full h-[89.5%] opacity-5 bg-gray-500 z-10"></div>}
      <nav onClick={() => setIsOpen(true)} className={!isOpen ? "static bg-transparent p-0 border-non shadow-none hidden md:flex transition-all duration-300 ease-in" : "z-50 absolute left-0 top-16 w-full h-[25%] bg-white p-5 border border-t-transparent border-r-transparent border-l-transparent shadow-sm flex transition-all duration-300 ease-in"}>
      <div className="flex flex-col md:flex-row gap-4 md:items-center items-start">
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
      </nav>
      <Button onClick={() => setIsOpen(!isOpen)}   className="transition-all duration-300 ease-in-out flex md:hidden" variant="outline">
        {isOpen ? 
        (
         
          <CgClose className="text-[20px]" />
        )
        :
        (
        <BiDotsVerticalRounded   className="text-[20px]"/>

      )
      }
        </Button>
     
    </header>
  );
}

export default NavBar;
