"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Input } from "@/components/ui/input";


function SearchPaste() {
    const [input, setInput] = useState<string>("");


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
        
       


    return (
        <div className='md:w-[50%]'>
            <Input className='w-full' type="search" placeholder="Search" onChange={handleInputChange} value={input} />
           
           
        </div>
    );
}

export default SearchPaste;
