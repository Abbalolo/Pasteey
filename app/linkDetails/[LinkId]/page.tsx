"use client"
import { IoIosArrowBack } from "react-icons/io"; 
import { useContextData } from "@/app/context/contextApi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EditLink } from "@/app/component/EditLink";



function LinkDetails({params}:any) {
  const { data , deleteData, editData} = useContextData();
  const router = useRouter()
  const backWard = router.back

  const linkData = Array.isArray(data) && params.LinkId
  ? data.filter((link) => link.id === params.LinkId)
  : [];
  const handleDelete = (id: string) => {
    deleteData(id);
  };

  const handleEdit = (id: string, newTitle: string, newLink: string) => {
    editData(id, { title: newTitle, link: newLink });
  };
  // console.log('Route ID:', params.TaskId);
  // console.log( {linkData});
  return (
    <div className="flex  justify-center items-center w-full h-[70vh]">

      {linkData.length > 0 && linkData.map((item) => (
        
        <div className=" bg-white shadow-md rounded-md w-[400px] p-5" key={item.id}>
          <Button onClick={backWard} variant="outline"><IoIosArrowBack /></Button>
          <div className="flex flex-col my-3">
          </div>
          <div className="">

          <h2 className="font-semibold">{item.title}</h2>
          <p className="">{item.link}</p>
          </div>
          <div className="flex justify-end items-end w-full ">
          <EditLink handleDelete={handleDelete} title={item.title} links={item.link} handleEdit={handleEdit} dataId={item.id} />
          </div>
        </div>
      ))}
    </div>
  )
}
 
export default LinkDetails