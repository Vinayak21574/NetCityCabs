import { Button, TextField } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import logo from './media/NetCityCabs.png'
import { useState,useRef, useEffect } from "react";

// const LINK="//192.168.1.2:80"
const LINK="//localhost:80"



export default function Login() {
    const navigate = useNavigate();
    
    // function verify({User,Pass}) {
    //     if(User && Pass){
    //         axios.post(`${LINK}/login`,{User_ID:User,Password:Pass},{
    //             headers: {
    //                 'accept': 'application/json',
    //             }
    //         }).then((response) => {
    //             navigate(`/Home`, { replace: true, state:{id:response.data}});
    //             // navigate(`/Home`, { replace: true});
    //         }).catch((err)=>{
    //             alert("Authorization Failed")
    //         })
    //     }
    //     else{
    //         console.log(User,Pass);
    //         alert("Invalid Credentials")
    //     }
    // }

    function Token({User,Pass}) {
        if(User && Pass){
            axios.post(`${LINK}/token`,{username:User,password:Pass},{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                localStorage.setItem("Token",response.data.access_token)
                navigate(`/Home`, { replace: true, state:{id:response.data.category,link:LINK}});
            }).catch((err)=>{
                alert("Authorization Failed")
            })
        }
        else{
            console.log(User,Pass);
            alert("Invalid Credentials")
        }
    }

    function press(e){
        console.log("Pressed from login")
        if(e.key==="Enter"){
            if(ref && ref.current){
                ref.current.click()
            }
        }
    }

    var User_;
    var Pass_;

    const ref=useRef(null)

    document.addEventListener("keydown",(e)=>{press(e)})

   

    return (
        <div className=" bg-slate-200 w-screen h-screen">
            
            <div className="flex justify-center">
                <img src={logo} className="sm:w-10/12 lg:w-1/2 p-6 mt-20"/>
            </div>

            <div className="flex justify-center">
                <div className="bg-dark_ sm:w-3/5 lg:w-1/4 h-auto rounded-xl shadow-lg p-5 ">
                    <div className="grid p-2 grid-cols-1 gap-4 mt-4 mb-4 ml-2 mr-2">
                        <TextField label="Username" color="warning" size="large" onChange={(newvalue) => User_=newvalue.target.value}/>
                        <TextField label="Password" color="warning" size="large" type="password" onChange={(newvalue) => Pass_=newvalue.target.value}/>
                        {/* <div className="flex">
                            <Button variant="contained" className="flex-auto" color="warning" onClick={() => {verify({User:User_,Pass:Pass_})}}>Login _simple</Button>
                        </div> */}
                        <div className="flex" >
                            <Button ref={ref} variant="contained" className="flex-auto" color="warning" onClick={() => {Token({User:User_,Pass:Pass_})}}>Login</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
