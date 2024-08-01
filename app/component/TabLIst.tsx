"use client";

import React, { useEffect, useState } from 'react';
import {  useContextData } from '../context/contextApi';
import { ToolTip } from './ToolTip';
import { EditLink } from './EditLink';
import { Button } from '@/components/ui/button';
import { Add } from './Add';
import { EditText } from './EditText';
import  Test  from './Test';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link';



const TabList = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data, recentData, recentData2, deleteData, editData, data2, deleteData2, editData2 } = useContextData();
  const [openBox, setOpenBox] = useState<boolean>(false);

  const tabs = ['All Task', "Links", "Texts", 'Recent'];

  const handleDelete = (id: string) => {
    deleteData(id);
  };
  const handleDelete2 = (id: string) => {
    deleteData2(id);
  };
  const handleEdit = (id: string, newTitle: string, newLink: string) => {
    editData(id, { title: newTitle, link: newLink });
  };
  const handleEdit2 = (id: string, newtTitle: string, newText: string) => {
    editData2(id, { tTitle: newtTitle, text: newText });
  };

  console.log(data)

 

  return (
    <>
      {openBox ? (
        <>
          <div onClick={() => setOpenBox(false)} className="w-full h-screen relative inset-0 flex items-center justify-center bg-white z-10 top-0 left-0">
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-md z-50">
            <Add setOpenBox={setOpenBox} />
          </div>
        </>
      ) : null}

      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <div className=" space-x-2 border-b hidden md:flex">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`transition-all duration-200 ease-in-out px-4 py-2 text-sm font-medium focus:outline-none ${activeTab === index ? 'text-black' : 'text-gray-500'}`}
                >
          
                  {tab}
                </button>
              ))}
            </div>
            <div className="md:hidden ">
            <Select
            onValueChange={(value) => setActiveTab(Number(value))}
            defaultValue={activeTab.toString()}
           
          >
            <SelectTrigger>
              <SelectValue placeholder={tabs[activeTab]} />
            </SelectTrigger>
            <SelectContent>
              {tabs.map((tab, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {tab}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
            </div>
          </div>
          
        
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setOpenBox(true)}>Add</Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5 w-full">
          {activeTab === 0 && (
            <div className='md:grid md:grid-cols-2 flex flex-col gap-3'>
              {Array.isArray(data) && data.length > 0 ? data.map((item) => (
                <div className="border pr-3" key={item.id}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                      <div className="w-2 bg-black"></div>
                      <Link className=' w-[180px] lg:w-[420px] ' href={`/linkDetails/${item.id}`}>
                        <h3>{item.title}</h3>
                        {/* <Link className="text-sm text-gray-500 pb-2" href={item.link}>{item.link.length > 25 ? item.link.slice(-20) : item.link}</Link> */}
                        <p className="text-sm text-gray-500 pb-2">{item.link.length > 25 ? item.link.slice(-20) : item.link}</p>
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <EditLink handleDelete={handleDelete} title={item.title} links={item.link} handleEdit={handleEdit} dataId={item.id} />
                      <ToolTip link={item.link} />
                    </div>
                  </div>
                </div>
              )) : <div className='text-center font-semibold text-xl m-10'>Ups... There are no data available</div>}


              {Array.isArray(data2) && data2.length > 0 ? data2.map((item) => (
                <div  className="border pr-3" key={item.id}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 h-full ">
                      <div className="w-2 bg-blue-500"></div>
                      <Link className='lg:w-[420px]' href={`/textDetails/${item.id}`}>
                        <h3>{item.tTitle}</h3>
                        {/* <Link className="text-sm text-gray-500 pb-2" href={item.text}>{item.text}</Link> */}
                        <p className="text-sm text-gray-500 pb-2">{item.text.length > 25 ? item.text.slice(-20) : item.text}</p>
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <EditText handleDelete={handleDelete} tTitle={item.tTitle} text={item.text} handleEdit={handleEdit} dataId={item.id} />
                      {/* <ToolTip link={item.text} /> */}
                    </div>
                  </div>
                </div>
              )) : ""}
            </div>
          )}

          {activeTab === 1 && (
            <div className='md:grid md:grid-cols-2 flex flex-col gap-3'>
              {Array.isArray(data) && data.length > 0 ? data.map((item) => (
                <div  className="border pr-3" key={item.id}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                      <div className="w-2 bg-black"></div>
                      <Link className='lg:w-[420px]' href={`/linkDetails/${item.id}`}>
                        <h3>{item.title}</h3>
                        {/* <Link className="text-sm text-gray-500 pb-2" href={item.link}>{item.link.length > 25 ? item.link.slice(-20) : item.link}</Link> */}
                        <p className="text-sm text-gray-500 pb-2">{item.link.length > 25 ? item.link.slice(-20) : item.link}</p>
                        
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <EditLink handleDelete={handleDelete} title={item.title} links={item.link} handleEdit={handleEdit} dataId={item.id} />
                      <ToolTip link={item.link} />
                    </div>
                  </div>
                </div>
              )) : <div className='text-center font-semibold text-xl m-10'>Ups... There are no Link data</div>}
            </div>
          )}

          {activeTab === 2 && (
            <div className='md:grid md:grid-cols-2 flex flex-col gap-3 h-full'>
              {Array.isArray(data2) && data2.length > 0 ? data2.map((item) => (
                <div className="border pr-3" key={item.id}>
                  <div className="flex justify-between">
                    <div className="flex gap-3">
                      <div className="w-2 bg-blue-500"></div>
                      <Link className='lg:w-[420px]' href={`/textDetails/${item.id}`}>
                        <h3>{item.tTitle}</h3>
                        {/* <Link className="text-sm text-gray-500 pb-2" href={item.text}>{item.text.length > 25 ? item.text.slice(-20) : item.text}</Link> */}
                        <p className="text-sm text-gray-500 pb-2">{item.text.length > 25 ? item.text.slice(-20) : item.text}</p>
                     
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <EditText handleDelete={handleDelete2} tTitle={item.tTitle} text={item.text} handleEdit={handleEdit2} dataId={item.id} />
                      {/* <ToolTip link={item.text} /> */}
                    </div>
                  </div>
                </div>
              )) : <div className='text-center font-semibold text-xl m-10'>Ups... There are no Text data</div>}
            </div>
          )}
{activeTab === 3 && (
  <div className='md:grid md:grid-cols-2 flex flex-col gap-3'>
    {/* Display recentData */}
    {Array.isArray(recentData) && recentData.length > 0 ? recentData.map((item) => (
      <div  className="border pr-3" key={item.id}>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <div className="w-2 bg-black"></div>
            <Link className='lg:w-[420px]' href={`/linkDetails/${item.id}`}>
              <h3>{item.title}</h3>
              {/* <Link className="text-sm text-gray-500 pb-2" href={item.link}>{item.link.length > 25 ? item.link.slice(-20) : item.link}</Link> */}
              <p className="text-sm text-gray-500 pb-2">{item.link.length > 25 ? item.link.slice(-20) : item.link}</p>
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <EditLink handleDelete={handleDelete} title={item.title} links={item.link} handleEdit={handleEdit} dataId={item.id} />
            <ToolTip link={item.link} />
          </div>
        </div>
      </div>
    )) : <div className='text-center font-semibold text-xl m-10'>Ups... There are no Recent data</div>}

    {/* Display recentData2 */}
    {Array.isArray(recentData2) && recentData2.length > 0 ? recentData2.map((item) => (
      <div className="border pr-3" key={item.id}>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <div className="w-2 bg-blue-500"></div>
            <Link className='lg:w-[420px]' href={`/textDetails/${item.id}`}>
              <h3>{item.tTitle}</h3>
              {/* <Link className="text-sm text-gray-500 pb-2" href={item.text}>{item.text.length > 25 ? item.text.slice(-20) : item.text}</Link> */}
              <p className="text-sm text-gray-500 pb-2">{item.text.length > 25 ? item.text.slice(-20) : item.text}</p>
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <EditText handleDelete={handleDelete2} tTitle={item.tTitle} text={item.text} handleEdit={handleEdit2} dataId={item.id} />
            {/* <ToolTip link={item.text} /> */}
          </div>
        </div>
      </div>
    )) :""}
  </div>
)}

        </div>
      </div>
    </>
  );
};

export default TabList;
