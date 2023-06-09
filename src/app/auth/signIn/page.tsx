"use client";
import { getProviders, signIn } from "next-auth/react";
import React, { useRef } from "react";



const listProviders = async () => {
    return {
        providers: await getProviders(),
    };
}

const LoginPage =  () => {
    const userName = useRef("");
    const pass = useRef(""); 
    listProviders().then((data)=>{
        console.log(data);
    }).catch((e)=>{
        console.log(e);
    });

    return (
        <div
            className={
                "flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600"
            }
        >
            Sign in
        </div>
    );
};

export default LoginPage;