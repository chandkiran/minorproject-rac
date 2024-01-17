import React, { useEffect } from "react";
import axios from 'axios'

const Home=()=>{
    useEffect(()=>{
       axios.get('/users')
       .then((res)=>{
        console.log(res.data)
       })
    },[])

    return(
        <div className="h-screen bg-yellow-400">
            <h1>Welcome to Home</h1>
        </div>
    )
}
export default Home;