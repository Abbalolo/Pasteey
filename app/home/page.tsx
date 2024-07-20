"use client"
import SearchPaste from '../component/SearchPaste';

import { ToolTip } from "../component/ToolTip";
import { useContextData } from '../context/contextApi';


function Dashboard() {
  const { data } = useContextData();
  
    
    return (
        <div className="h-screen w-full">
            <SearchPaste />
            <div className='flex flex-col gap-2 mt-4'>
                {data.map((item, index) => (
                    <div className="border pr-3" key={index}>
                        <div className="flex  justify-between items-center"> 
                          <div className="flex gap-3">
                            <div className="w-2 bg-black"></div>
                            <div className="">
                            <h3 className="">{item.title}</h3>
                            <p className="text-sm text-gray-500 pb-2">{item.link}</p>
                            </div>
                            </div>
                           <ToolTip link={item.link}/>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
