"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContextData } from '../context/contextApi';
import { database } from '../firebase/store';
import { ref, set } from 'firebase/database';

interface LinkItem {
  title: string;
  link: string;
  id: string;
  createdAt: number;
}

function AddLink() {
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { setData } = useContextData();

  const capitalizeTitle = (tit: string) => {
    return tit.charAt(0).toUpperCase() + tit.slice(1);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length === 0 || link.length === 0) {
      console.log("Title and Link fields are required");
    } else {
      const newItem: LinkItem = {
        title: capitalizeTitle(title),
        link: link,
        id: new Date().getTime().toString(),
        createdAt: Date.now()
      };
      setData(prevData => [...prevData, newItem]);
      await createData(newItem); // Pass the new item to the createData function
      setTitle(""); // Clear title input
      setLink(""); // Clear link input
      setIsDialogOpen(false); // Close the dialog when form is submitted
    }
  };

  const createData = async (newItem: LinkItem) => {
  
    const itemWithTimestamp = {
      ...newItem,
      createdAt: Date.now(), 
    };
  
    const newLinkRef = ref(database, 'Links/' + newItem.id);
    await set(newLinkRef, itemWithTimestamp);
    console.log("Data written to Firebase Realtime Database");
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className='' onClick={() => setIsDialogOpen(true)}>Add</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleForm}>
            <DialogHeader>
              <DialogTitle>Add New Link</DialogTitle>
              <DialogDescription>
                Make a new link to your list here
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="title"
                  value={title}
                  placeholder="Link title"
                  className="col-span-2"
                  required
                  onChange={handleTitleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="link"
                  value={link}
                  placeholder="Link here"
                  className="col-span-5"
                  required
                  onChange={handleLinkChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddLink;
