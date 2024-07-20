"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context state
interface DataContextType {
    data: { title: string; link: string }[];
    setData: React.Dispatch<React.SetStateAction<{ title: string; link: string }[]>>;
}

// Create the context with a default value
const DataContext = createContext<DataContextType | undefined>(undefined);

// Define the provider component
const DataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<{ title: string; link: string }[]>([]);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

// Custom hook to use the DataContext
const useContextData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useContextData must be used within a DataProvider');
    }
    return context;
};

export { DataProvider, useContextData };
