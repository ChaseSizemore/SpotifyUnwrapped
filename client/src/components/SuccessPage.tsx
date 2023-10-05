import React from "react";

import NavBar from "./NavBar";


const Success = () => {
    return(
        <>
        <NavBar />
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl font-bold">Success!</h1>
            <p className="text-xl">Your songs have been transferred!</p>
            <p>Check out your Youtube playlists to see the result</p>
            
        </div>
        </>
    )
};

export default Success;