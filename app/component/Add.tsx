
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangeEvent, FormEvent, useState } from "react";
import { LinkItem, TextItem, useContextData } from "../context/contextApi";
import { database } from '../firebase/store';
import { ref, set } from 'firebase/database';
import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/components/ui/use-toast";


interface AddProps {
  setOpenBox: (isOpen: boolean) => void;
}

export function Add({ setOpenBox }: AddProps) {
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [title2, setTitle2] = useState<string>("");
  const [link2, setLink2] = useState<string>("");
  const { setData, setData2 } = useContextData();
  const { toast } = useToast();

  const capitalizeTitle = (tit: string) => {
    return tit.charAt(0).toUpperCase() + tit.slice(1);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleTitleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle2(e.target.value);
  };

  const handleLinkChange2 = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLink2(e.target.value);
  };

  const handleLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length === 0 || link.length === 0) {
      console.log("Title and Link fields are required");
    } else {

      try{

        const newItem: LinkItem = {
          title: capitalizeTitle(title),
          link: link,
          id: new Date().getTime().toString(),
          createdAt: Date.now()
        };
        setData(prevData => [...prevData, newItem]);
        await createData(newItem);
        setTitle("");
        setLink("");
        setOpenBox(false);
        toast({
          title: "Add your LInk",
          description: "Link is added successfully",
         
        })
      } 
      catch(error) {
        console.log(error)
        toast({
          description: "Error has occure check your internet",
         
        })
      }
     
    }
  };

  const handleText = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title2.length === 0 || link2.length === 0) {
      console.log("Title and Text fields are required");
    } else {

      try {
        const newItem: TextItem = {
          tTitle: capitalizeTitle(title2),
          text: link2,
          id: new Date().getTime().toString(),
          createdAt: Date.now()
        };
        setData2(prevData => [...prevData, newItem]);
        await createData2(newItem);
        setTitle2("");
        setLink2("");
        setOpenBox(false);
        toast({
          title: "Add your Text",
          description: "Text is added successfully",
         
        })
      }
      catch(error) {
console.log(error)
toast({
  description: "Error has occure check your internet",
 
})
      }
     
    }
  };

  const createData = async (newItem: LinkItem) => {
    const newLinkRef = ref(database, 'Links/' + newItem.id);
    await set(newLinkRef, newItem);
    console.log("Data written to Firebase Realtime Database");
  };

  const createData2 = async (newItem: TextItem) => {
    const newLinkRef = ref(database, 'Texts/' + newItem.id);
    await set(newLinkRef, newItem);
    console.log("Data written to Firebase Realtime Database");
  };

  return (
    <>
      <Tabs defaultValue="link" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="link">Add Link</TabsTrigger>
          <TabsTrigger value="text">Add Text</TabsTrigger>
        </TabsList>
        <TabsContent value="link">
          <Card>
            <form onSubmit={handleLink}>
              <CardHeader>
                <CardTitle>Add Link</CardTitle>
                <CardDescription>Add your link details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      id="title"
                      value={title}
                      placeholder="Link title"
                      className="col-span-4"
                      required
                      onChange={handleTitleChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      id="link"
                      value={link}
                      placeholder="Link here"
                      className="col-span-4"
                      required
                      onChange={handleLinkChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="text">
          <Card>
            <form onSubmit={handleText}>
              <CardHeader>
                <CardTitle>Add Text</CardTitle>
                <CardDescription>Add your text details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      id="title2"
                      value={title2}
                      placeholder="Text title"
                      className="col-span-4"
                      required
                      onChange={handleTitleChange2}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Textarea
                      id="link2"
                      value={link2}
                      placeholder="Text here"
                      className="col-span-4"
                      required
                      onChange={handleLinkChange2}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
     
    </>
  );
}
