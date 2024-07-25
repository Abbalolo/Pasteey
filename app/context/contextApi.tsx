"use client";

import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth, database } from '../firebase/store';
import { ref, onValue, remove, update } from 'firebase/database';

// Define the type for the context state
interface DataContextType {
    data: { title: string; link: string; id: string; createdAt: any }[]; // Include id for each item
    recentData: { title: string; link: string; id: string; createdAt: any }[]; // Include id for each item
    setData: React.Dispatch<React.SetStateAction<{ title: string; link: string; id: string; createdAt: any}[]>>;
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | null;
    deleteData: (id: string) => void;
    editData: (id: string, newData: { title: string; link: string }) => void;
}

interface LinkItem {
    id: string;
    title: string;
    link: string;
    createdAt: number;
  }
// Create the context with a default value
const DataContext = createContext<DataContextType | undefined>(undefined);

// Define the provider component
const DataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<{ title: string; link: string; id: string; createdAt: any }[]>([]);
    const [recentData, setRecentData] = useState<LinkItem[]>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsLogin(true);
                fetchData();
            } else {
                setUser(null);
                setIsLogin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchData = () => {
        // Fetch all data from database
        const linksRef = ref(database, 'Links');
        onValue(linksRef, snapshot => {
            const data = snapshot.val();
            if (data) {
                const formattedLinks = Object.keys(data).map(key => ({
                   ...data[key],
                    id: key,
                    createdAt: new Date(data[key].createdAt),
                }));
                setData(formattedLinks);
                filterRecentData(formattedLinks); // Filter recent data after fetching
            }
        });
    }

    useEffect(() => {
      fetchData()
      }, []);


      
      const filterRecentData = (data: LinkItem[]) => {
        const oneWeekAgo = Date.now() - 1000 * 60 * 60 * 24 * 7;
        const filteredData = data.filter((item) => item.createdAt > oneWeekAgo);
        setRecentData(filteredData);
      };

        const deleteData = async (id: string) => {
            try {
              // Delete item from database
              const itemRef = ref(database, 'Links/' + id);
              await remove(itemRef);
              
              // Update state
              setData(prevData => prevData.filter(item => item.id !== id));
              
              console.log('Item deleted successfully');
            } catch (error) {
              console.error('Error deleting item:', error);
            }
          };
    
    const editData = async (id: string, newData: { title: string; link: string }) => {
        try {
            await update(ref(database, `Links/${id}`), newData);
            setData(prevData => prevData.map(item => item.id === id ? { ...item, ...newData } : item));
        } catch (error) {
            console.error("Error updating data: ", error);
        }
    };

    return (
        <DataContext.Provider value={{ data, recentData, setData, isLogin, setIsLogin, user, deleteData, editData }}>
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
