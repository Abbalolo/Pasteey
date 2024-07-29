"use client";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { useContextData } from '../context/contextApi';


function SearchPaste() {
    const { searchQuery, setSearchQuery,searchResults } = useContextData();
  console.log(searchResults, "lolo")

    return (
      <div className="flex flex-col relative md:w-[50%]">
        <div className=''>
            <Input className='w-full'
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..." />
           
           
        </div>

        {/* <div className="absolute top-12 left-0">

        <Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
</div> */}
      </div>
    );
}

export default SearchPaste;
