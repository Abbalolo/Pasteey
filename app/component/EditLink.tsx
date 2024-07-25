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
import { useRouter } from "next/navigation";
import { FormEvent, useState, ChangeEvent } from "react";
import { FiEdit } from "react-icons/fi";

// Interface defining the props for the EditLink component
interface EditLinkProps {
  dataId: string;
  title: string;
  links: string;
  handleEdit: (id: string, name: string, link: string) => void;
  handleDelete: (id: string) => void;
}

export function EditLink({ dataId, title: initialTitle, links: initialLinks, handleEdit, handleDelete }: EditLinkProps) {
  const [name, setName] = useState<string>(initialTitle);
  const [link, setLink] = useState<string>(initialLinks);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  // Handles form submission
  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleEdit(dataId, name, link);
      console.log({ name, link });
      setIsDialogOpen(false);
      router.refresh(); // This reloads the page, consider updating the state directly if possible
     
    } catch (error) {
      console.error("Error editing link:", error);
    }
  };

  // Handles name input change
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Handles link input change
  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
      <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          <FiEdit className="text-[16px]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleForm}>
          <DialogHeader>
            <DialogTitle>Edit name and links</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when done
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Link Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={handleNameChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-right">
                Link
              </Label>
              <Input
                id="link"
                value={link}
                onChange={handleLinkChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter className="flex gap-1">
            <Button
              variant="destructive"
              onClick={() => handleDelete(dataId)}
            >
              Delete Link
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
