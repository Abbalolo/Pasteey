"use client";

import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth, database } from '../firebase/store';
import { ref, onValue, remove, update } from 'firebase/database';
import { toast } from '@/components/ui/use-toast';

// Define the type for the context state
interface DataContextType {
  data: LinkItem[];
  data2: TextItem[];
  recentData: LinkItem[];
  setData: React.Dispatch<React.SetStateAction<LinkItem[]>>;
  setData2: React.Dispatch<React.SetStateAction<TextItem[]>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  deleteData: (id: string) => void;
  deleteData2: (id: string) => void;
  editData: (id: string, newData: { title: string; link: string }) => void;
  editData2: (id: string, newData: { tTitle: string; text: string }) => void;
}

export interface LinkItem {
  id: string;
  title: string;
  link: string;
  createdAt: number;
}

export interface TextItem {
  id: string;
  tTitle: string;
  text: string;
  createdAt: number;
}

// Create the context with a default value
const DataContext = createContext<DataContextType | undefined>(undefined);

// Define the provider component
const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<LinkItem[]>([]);
  const [data2, setData2] = useState<TextItem[]>([]);
  const [recentData, setRecentData] = useState<LinkItem[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLogin(true);
        fetchData();
        fetchData2();
      } else {
        setUser(null);
        setIsLogin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchData = () => {
    const linksRef = ref(database, 'Links');
    onValue(linksRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const formattedLinks = Object.keys(data).map(key => ({
          ...data[key],
          id: key,
          createdAt: new Date(data[key].createdAt).getTime(),
        }));
        setData(formattedLinks);
        filterRecentData(formattedLinks); // Filter recent data after fetching
      }
    });
  }

  const fetchData2 = () => {
    const textRef = ref(database, 'Texts');
    onValue(textRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const formattedText = Object.keys(data).map(key => ({
          ...data[key],
          id: key,
          createdAt: new Date(data[key].createdAt).getTime(),
        }));
        setData2(formattedText);
      }
    });
  }

  const filterRecentData = (data: LinkItem[]) => {
    const oneHourAgo = Date.now() - 1000 * 60 * 60;
    const filteredData = data.filter((item) => item.createdAt > oneHourAgo);
    // const filteredData2 = data2.filter((item) => item.createdAt > oneHourAgo);

    setRecentData(filteredData);
  };

  const deleteData = async (id: string) => {
    try {
      const itemRef = ref(database, 'Links/' + id);
      await remove(itemRef);
      setData(prevData => prevData.filter(item => item.id !== id));
      console.log('Item deleted successfully');
      toast({
        description: "Delete successfully",
       
      })
    } catch (error) {
      toast({
        description: "Delete Unsuccessfully",
       
      })
      console.error('Error deleting item:', error);
    }
  };

  const deleteData2 = async (id: string) => {
    try {
      const itemRef = ref(database, 'Texts/' + id);
      await remove(itemRef);
      setData2(prevData => prevData.filter(item => item.id !== id));
      console.log('Item deleted successfully');
      toast({
        description: "Delete successfully",
       
      })
    } catch (error) {
      toast({
        description: "Delete Unsuccessfully",
       
      })
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

  const editData2 = async (id: string, newData: { tTitle: string; text: string }) => {
    try {
      await update(ref(database, `Texts/${id}`), newData);
      setData2(prevData => prevData.map(item => item.id === id ? { ...item, ...newData } : item));
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  return (
    <DataContext.Provider value={{ data, data2, recentData, setData, setData2, isLogin, setIsLogin, user, deleteData, editData, deleteData2, editData2 }}>
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
