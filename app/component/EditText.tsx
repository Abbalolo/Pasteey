"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormEvent, useState, ChangeEvent } from "react";
import { FiEdit } from "react-icons/fi";

// Interface defining the props for the EditLink component
interface EditTextProps {
  dataId: string;
  tTitle: string;
  text: string;
  handleEdit: (id: string, name: string, text: string) => void;
  handleDelete: (id: string) => void;
 
}

export function EditText({ dataId, tTitle: initialtTitle, text: initialText, handleEdit, handleDelete}: EditTextProps) {
  const [name, setName] = useState<string>(initialtTitle);
  const [text, setText] = useState<string>(initialText);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  
  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleEdit(dataId, name, text);
      console.log({ name, text });
      setIsDialogOpen(false);
      toast({
        description: "Save Successfully",
       
      })
      router.refresh(); // This reloads the page, consider updating the state directly if possible
     
    } catch (error) {
      console.error("Error editing text:", error);
      toast({
        description: "Update is Unsuccessfully",
       
      })
    }
  };

  // Handles name input change
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
 

  // Handles link input change

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <>
    


      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
      <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          <FiEdit className="text-[16px]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:max-w-[500px]">
        <form onSubmit={handleForm}>
          <DialogHeader>
            <DialogTitle>Edit name and Text</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when done
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Text Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={handleNameChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="Text" className="text-right">
                Text
              </Label>
              <Textarea
                id="link"
                value={text}
                onChange={handleTextChange}
                className="col-span-3 md:h-64"
                required
              />
            </div>
          </div>
          <DialogFooter className="flex gap-1">
            <Button
              variant="destructive"
              onClick={() => handleDelete(dataId)}
            >
              Delete Text
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
}
