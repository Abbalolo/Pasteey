"use client"

import React, { useState } from 'react';
import { useContextData } from '../context/contextApi';
import { ToolTip } from './ToolTip';
import AddLink from './AddLink';
import { EditLink } from './EditLink';


const TabList = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data, recentData, deleteData, editData } = useContextData();
  

  const tabs = ['All List', 'Recent'];

  const handleDelete = (id: string) => {
    deleteData(id);
  };

  const handleEdit = (id: string, newTitle: string, newLink: string) => {
    editData(id, { title: newTitle, link: newLink });
  };

  const rotateArrayAndUpdateIds = (arr: any) => {
    if (arr.length <= 1) {
      return arr; // No need to rotate if the array has 0 or 1 element
    }
  
    // Rotate the array
    const rotatedArray = [arr[arr.length - 1], ...arr.slice(1, arr.length - 1), arr[0]];
  
    // Update the ids
    const updatedArray = rotatedArray.map((item, index) => ({
      ...item,
      id: index
    }));
  
    return updatedArray;
  };

  const updatedArray = rotateArrayAndUpdateIds(recentData);
 


  return (
    <div className="w-full mt-5">
      <div className="flex items-center justify-between">
    <div className="w-[70%]  ">
      <div className="flex space-x-2 border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`transition-all duration-200 ease-in-out px-4 py-2 text-sm font-medium focus:outline-none ${
              activeTab === index
                ? '  text-black'
                : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
    <AddLink/>
      </div>

      <div className="flex flex-col  gap-2 mt-5 w-full">
        {activeTab === 0 && (
          
          <div className='md:grid md:grid-cols-2 flex flex-col gap-3'>
          {Array.isArray(data) && data.map((item) => (
              <div className="border pr-3 " key={item.id}>
                  <div className="flex  justify-between items-center"> 
                    <div className="flex gap-3">
                      <div className="w-2 bg-black"></div>
                      <div className="">
                      <h3 className="">{item.title}</h3>
                      <p className="text-sm text-gray-500 pb-2">{item.link}</p>
                      </div>
                      </div>
                      <div className="flex items-center gap-1 ">
                    <EditLink handleDelete={handleDelete} title={item.title} links={item.link}  handleEdit={handleEdit} dataId={item.id}/>
                     <ToolTip link={item.link}/>
                      </div>
                  </div>
              </div>
          ))}
      </div>
        )}
        {activeTab === 1 && (
           <div className='md:grid md:grid-cols-2 flex flex-col gap-3'>
           {Array.isArray(updatedArray) && updatedArray.map((item) => (
               <div className="border pr-3 " key={item.id}>
                   <div className="flex  justify-between items-center"> 
                     <div className="flex gap-3">
                       <div className="w-2 bg-black"></div>
                       <div className="">
                       <h3 className="">{item.title}</h3>
                       <p className="text-sm text-gray-500 pb-2">{item.link}</p>
                       </div>
                       </div>
                       <div className="flex items-center gap-1 ">
                     <EditLink handleDelete={handleDelete} title={item.title} links={item.link}  handleEdit={handleEdit} dataId={item.id}/>
                      <ToolTip link={item.link}/>
                       </div>
                   </div>
               </div>
           ))}
       </div>
          )}
      </div>
    </div>
  );
};

export default TabList;
