import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";


interface linkType {
  link: string
}
export function ToolTip({link} : linkType) {
  const [copyText, setCopyText] = useState<string>("copy");
  const [showText, setShowText] = useState<boolean>(false);

  const copyPasteAction = () => {
    // console.log("Button clicked");
    navigator.clipboard.writeText(link).then(() => {
      setCopyText("copied");
      setShowText(true);
      setTimeout(() => {
        // console.log("Timeout over");
        setCopyText("copy");
        setShowText(false);
      }, 1000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <Button onClick={copyPasteAction} className="flex items-center gap-2">
      {showText ? (
        <span className="text-white">{copyText}</span>
      ) : (
        <FaRegCopy className="" />
      )}
    </Button>
  );
}
