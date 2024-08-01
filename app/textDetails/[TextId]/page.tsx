"use client"
import { IoIosArrowBack } from "react-icons/io"; 
import { useContextData } from "@/app/context/contextApi";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { EditText } from "@/app/component/EditText";



function TextDetails({params}:any) {
  const { data2,deleteData2, editData2} = useContextData();
  const router = useRouter()
  const backWard = router.back

  const textData = Array.isArray(data2) && params.TextId
  ? data2.filter((text) => text.id === params.TextId)
  : [];

  const handleDelete2 = (id: string) => {
    deleteData2(id);
  };
  const handleEdit2 = (id: string, newtTitle: string, newText: string) => {
    editData2(id, { tTitle: newtTitle, text: newText });
  };

  // const extractTextLinks = (e) => {
  //   e.preventDefault();
  //   const data = textValue.split("\n").map(text => text.trim()).filter(text => text.length > 0);
  //   setTextData(data)
  //   }

  // console.log('Route ID:', params.TaskId);
  // console.log( {textData});

  
  return (
    <div className="flex  justify-center items-center w-full h-[70vh]">

      {textData.length > 0 && textData.map((item) => (
        
        <div className=" bg-white shadow-md rounded-md w-[400px] p-5" key={item.id}>
          <Button onClick={backWard} variant="outline"><IoIosArrowBack /></Button>
          <div className="flex flex-col my-3">
          </div>
          <div className="">
          <h2 className="font-semibold">{item.tTitle}</h2>
          </div>
          <p className="">{item.text}</p>
          <div className="flex justify-end items-end w-full ">
          <EditText handleDelete={handleDelete2} tTitle={item.tTitle} text={item.text} handleEdit={handleEdit2} dataId={item.id} />
          </div>
        </div>
      ))}
    </div>
  )
}
 
export default TextDetails