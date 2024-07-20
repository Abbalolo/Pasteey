import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"
function NavBar() {
  return (
    <header className=' px-5 py-3 flex justify-between'>
      <Link className='text-[#000207] text-2xl font-extrabold' href={"#"}>PasteMe</Link>

      <div className=" flex gap-2">
      <Button>Login</Button>
      <Button variant="outline">Sign up</Button>
      </div>
    </header>
  )
}

export default NavBar
