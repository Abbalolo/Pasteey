"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
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

function SearchPaste() {
    const [input, setInput] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const { data, setData } = useContextData();

    const capitaliseTitle = (tit: string) => {
        return tit.charAt(0).toUpperCase() + tit.slice(1);
    };
    

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
    };

   
    const handleForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(title.length === 0 || link.length === 0) {
            console.log("Title and Link fields are required");
            
        } else {
            const newItem = {
                title: capitaliseTitle(title),
                link: link
            };
            setData(prevData => [...prevData, newItem]);
            setTitle(""); // Clear title input
            setLink(""); // Clear link input
            setIsDialogOpen(false); // Close the dialog when form is submitted
        }
       
    };
            
       

useEffect(() => {
    console.log(data);
}, [data])
    return (
        <div className='flex items-center gap-2 '>
            <Input type="search" placeholder="Search" onChange={handleInputChange} value={input} />
           
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => setIsDialogOpen(true)}>Add</Button>
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
                                    className="col-span-2 "
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

export default SearchPaste;
