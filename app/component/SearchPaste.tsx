"use client";
import { IoMdClose } from "react-icons/io"; 


import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Item, LinkItem, useContextData } from '../context/contextApi';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IoIosArrowBack } from 'react-icons/io';

function SearchPaste() {

    const { searchQuery, setSearchQuery, searchResults,setData,setData2,data,data2 } = useContextData();
const [show, setShow] = useState<boolean>(false)
    // Type guard to determine if item is LinkItem
    const isLinkItem = (item: Item): item is LinkItem => 'title' in item;


    // useEffect(() => {
    //   if(data.length === 0 || data2.length === 0) {
    //     setData(searchResults)
    //     setData2(searchResults)
    //   }
    //     }, [])
    return (
        <div className="flex flex-col relative md:w-[50%]">
            <div>
                <Input
                onClick={() => setShow(true)}
                    className='w-full'
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                />
            </div> 
            {show &&
            <div className="bg-white border absolute top-12 left-0 w-full roaunded-md">
              <div className="flex p-1 justify-end items-end"><Button onClick={() => setShow(false)} variant="outline"><IoMdClose /></Button></div>
                {searchResults.length === 0 ? (
                    <p className="p-2">No results found</p>
                ) : (
                    searchResults.map((item, index) => (
                        <Link 
                            href={isLinkItem(item) ? `/linkDetails/${item.id}` : `/textDetails/${item.id}`} 
                            key={index} 
                            className="p-2 border-b block hover:bg-slate-100"
                        >
                            <p>{isLinkItem(item) ? item.title : item.tTitle}</p>
                        </Link>
                    ))
                )}
            </div>
            }
        </div>
    );
}

export default SearchPaste;
