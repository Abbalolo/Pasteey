"use client";
import {auth } from "../firebase/store"
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { FcGoogle } from "react-icons/fc"; 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { FormEvent, useState } from "react";

import { useRouter } from 'next/navigation';
import { useContextData } from "../context/contextApi";
function Login() {
  const [lemail, setLemail] = useState<string>("");
  const [lpassword, setLpassword] = useState<string>("");
  const [semail, setSemail] = useState<string>("");
  const [spassword, setSpassword] = useState<string>("");
  const [scpassword, setScpassword] = useState<string>("");
  const [sError, setsError] = useState<string>("");
  const [lError, setlError] = useState<string>("");
  const [currentTab, setCurrentTab] = useState('sign in');
  const router = useRouter();

  const {isLogin, setIsLogin} = useContextData();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (spassword!== lcpassword) {
    //   setsError("check Passwords or email address");
    //   return;
    // }
   
    console.log({
      lemail, lpassword
    });
    try {
      await signInWithEmailAndPassword(auth, lemail, lpassword)
      const user = auth.currentUser;
      setIsLogin(true)
      console.log({user, isLogin})
      router.push("/");
    } catch (error) {
      console.log(error)
    }

  
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (spassword!== scpassword) {
      setsError("Passwords do not match");
      return;
    }
    console.log({
      semail, spassword, scpassword
    });
try{
  await createUserWithEmailAndPassword(auth, semail, spassword)
  const user = auth.currentUser;
  console.log(user)
  setCurrentTab('sign in');
} catch(error) {
  console.log(error)
}

  };


  return (
    <div className="flex justify-center items-center w-full h-[80vh] md:h-screen">
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign in">Sign in</TabsTrigger>
          <TabsTrigger value="sign up">Sign up</TabsTrigger>
        </TabsList>

        <TabsContent value="sign in">
          <Card>
            <form onSubmit={handleLogin}>
              <CardHeader>
                <CardTitle className="mb-4">Welcome Back</CardTitle>
                <Button variant="outline"><FcGoogle className="text-[20px]"/>Sign in with Google</Button>
              </CardHeader>
              <div className="flex items-center px-10 mb-2">
                <div className="w-full h-[1px] bg-gray-300"></div>
                or
                <div className="w-full h-[1px] bg-gray-300"></div>
              </div>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="lemail">Email</Label>
                  <Input
                    type="email"
                    id="lemail"
                    placeholder="email here"
                    value={lemail}
                    onChange={(e) => setLemail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lpassword">Password</Label>
                  <Input
                    type="password"
                    id="lpassword"
                    placeholder="password"
                    value={lpassword}
                    
                    onChange={(e) => setLpassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <div className="text-red-400 text-sm">
                {lError}
              </div>
              <CardFooter>
              <Button disabled={lemail === "" || lpassword === ""} type="submit">
        Sign in
      </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="sign up">
          <Card>
            <form onSubmit={handleRegister}>
              <CardHeader>
                <CardTitle className="mb-4">Welcome, Create your Account</CardTitle>
                <Button variant="outline"><FcGoogle className="text-[20px]"/>Sign up with Google</Button>
              </CardHeader>
              <div className="flex items-center px-10 mb-2">
                <div className="w-full h-[1px] bg-gray-300"></div>
                or
                <div className="w-full h-[1px] bg-gray-300"></div>
              </div>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="semail">Email</Label>
                  <Input
                    type="email"
                    id="semail"
                    placeholder="email here"
                    value={semail}
                    onChange={(e) => setSemail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="spassword">Password</Label>
                  <Input
                    type="password"
                    id="spassword"
                    placeholder="password"
                    value={spassword}
                    onChange={(e) => setSpassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="scpassword">Confirm Password</Label>
                  <Input
                    type="password"
                    id="scpassword"
                    placeholder="confirm password"
                    value={scpassword}
                    onChange={(e) => setScpassword(e.target.value)}
                    required
                  />
                </div>
              <div className="text-red-400 text-sm">
                {sError}
              </div>
              </CardContent>
              <CardFooter>
              <Button disabled={semail === "" || spassword === "" || scpassword === ""} type="submit">
        Sign up
      </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Login;
