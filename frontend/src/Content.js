import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { Home_Passg,Book_Passg,History_Passg } from "./Passg.js"
import { Loader } from "./Assets.js";
import { Home_Driver,Book_Driver,History_Driver } from "./Driver.js";
import { Home_Emp,Locations_Emp,Drivers_Emp,Trips_Emp } from "./Employee.js";
import { Home_Admin,Locations_Admin,Drivers_Admin,Trips_Admin,Cabs_Admin,Admins_Admin,Emps_Admin } from "./Admin.js";

function Fetch(setData,at,id,LINK,args,setLoading,loader=false){
    if(at!==undefined && at!==null){
        axios.post(`${LINK}/${at}/${id}`,{},{
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("Token")}`
            },
            params:{
                ...(args.current?{data:args.current}:{data:""})
            }
            
        })
        .then((response)=>{
            setData(JSON.stringify(response.data));
            if(loader){
                setLoading(false)
            }
            // console.log("Fetched from ",at," with arg->",args.current," Value->",response.data.BODY)
        })

    }
}






function Structure(data,focus,setFocus,LINK,setARGS,getARGS,loading,setLoading,ReFetch){
    let here=JSON.parse(data)

    if(here){
        if(here.ID=="Passg"){
            switch (here.AT) {
                case "Home":
                    return Home_Passg(here.BODY,LINK,loading,setLoading,ReFetch)
                case "Book":
                    return Book_Passg(here.BODY,focus,setFocus,LINK,setARGS,getARGS,loading,setLoading,ReFetch)
                case "History":
                    return History_Passg(here.BODY,focus,setFocus)
            }
        }
        if(here.ID=="Driver"){
            switch (here.AT) {
                case "Home":
                    return Home_Driver(here.BODY,loading)
                case "Trip":
                    return Book_Driver(here.BODY,focus,setFocus,LINK,setARGS,getARGS,loading,setLoading,ReFetch)
                case "History":
                    return History_Driver(here.BODY,focus,setFocus)
            }
        }

        if(here.ID=="Employee"){
            switch (here.AT) {
                case "Home":
                    return Home_Emp(here.BODY.content,here.BODY.view,setARGS,getARGS,loading)
                case "Locations":
                    return Locations_Emp(here.BODY)
                case "Drivers":
                    return Drivers_Emp(here.BODY,focus,setFocus)
                case "Trips":
                    return Trips_Emp(here.BODY,focus,setFocus)
            }
        }

        if(here.ID=="Admin"){
            switch (here.AT) {
                case "Home":
                    return Home_Admin(here.BODY.content,here.BODY.view,setARGS,getARGS,loading)
                case "Locations":
                    return Locations_Admin(here.BODY)
                case "Drivers":
                    return Drivers_Admin(here.BODY,focus,setFocus,setARGS,getARGS)
                case "Trips":
                    return Trips_Admin(here.BODY,focus,setFocus)
                case "Cabs":
                    return Cabs_Admin(here.BODY)
                case "Admins":
                    return Admins_Admin(here.BODY,focus,setFocus)
                case "Employees":
                    return Emps_Admin(here.BODY,focus,setFocus)
            }
        }
    }
    else{
        return <Loader/>
    }
}



function Content({at,id,LINK}){
    const [data,setData]=useState(null)
    const [focus,setFocus]=useState(null)
    const args=useRef('')
    const [loading,setLoading]=useState(false)

    const setARGS = (value) => {
        let temp=JSON.stringify(value)
        console.log("Old->",args.current,"New->",temp)
        if(!(args.current===temp)){
            args.current=temp
            Fetch(setData,at,id,LINK,args,setLoading)
        }
    }

    const getARGS = () => {
        if(args.current){
            return JSON.parse(args.current)
        }
        return {}
    }

    const ReFetch=()=>{
        console.log("ReFetching.........")
        Fetch(setData,at,id,LINK,args,setLoading,true)
        
    }
    // console.log("Redenderd in Content","(",at,"->",data,") with focus->",focus)


    if(!data){
        Fetch(setData,at,id,LINK,args,setLoading)
    }


    useEffect(()=>{
        let ping=setInterval(()=>Fetch(setData,at,id,LINK,args,setLoading),5000)
        return()=>{setData(null);clearInterval(ping);setFocus(null);args.current=''}
    },[at])

    return(
        <div className=" flex-1 h-screen">
            {Structure(data,focus,setFocus,LINK,setARGS,getARGS,loading,setLoading,ReFetch)}
        </div>
    )

}

export default Content