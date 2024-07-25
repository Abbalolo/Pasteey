"use client"

import AddLink from "../component/AddLink";
import TabList from "../component/TabLIst";
import { ToolTip } from "../component/ToolTip";
import { useContextData } from '../context/contextApi';


function Dashboard() {
  const { data } = useContextData();
  
    
    return (
        <main className="px-6 md:px-20">
           
                <TabList/>
          
        </main>
    );
}

export default Dashboard;
