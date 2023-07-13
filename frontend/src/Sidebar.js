import { HiMenu,HiArrowCircleLeft } from "react-icons/hi";
import { useRef, useState } from 'react';
import { BsClockHistory,BsTaxiFrontFill,BsPersonFillCheck,BsPersonFill,BsPersonFillLock } from "react-icons/bs";
import { AiTwotoneHome,AiOutlineUserAdd } from "react-icons/ai";
import { RxDividerVertical } from "react-icons/rx"
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import logo from './media/NetCityCabs.png'
import Content from "./Content";
import { useLocation } from "react-router-dom";
import { GiCarSeat } from "react-icons/gi"
import { BiTrip } from "react-icons/bi"
import { IoLocationSharp } from "react-icons/io5"
import axios from "axios";
import { RiAdminLine } from "react-icons/ri" 

const Here="rounded-full text-5xl p-3 my-2"
const type={"Passg":[{Name:"Home",Icon:<AiTwotoneHome className={Here} />},{Name:"Book",Icon:<BsTaxiFrontFill className={Here} />},{Name:"History",Icon:<BsClockHistory className={Here}/>}],
"Driver":[{Name:"Home",Icon:<AiTwotoneHome className={Here} />},{Name:"Trip",Icon:<BsTaxiFrontFill className={Here} />},{Name:"History",Icon:<BsClockHistory className={Here}/>}],
"Employee":[{Name:"Home",Icon:<AiTwotoneHome className={Here} />},{Name:"Locations",Icon:<IoLocationSharp className={Here}/>},{Name:"Trips",Icon:<BiTrip className={Here} />},{Name:"Drivers",Icon:<GiCarSeat className={Here}/>}],
"Admin":[{Name:"Home",Icon:<AiTwotoneHome className={Here} />},
{Name:"Locations",Icon:<IoLocationSharp className={Here}/>},
{Name:"Trips",Icon:<BiTrip className={Here} />},
{Name:"Admins",Icon:<BsPersonFillLock className={Here}/>},
{Name:"Employees",Icon:<BsPersonFill className={Here}/>},
{Name:"Drivers",Icon:<GiCarSeat className={Here}/>},
{Name:"Cabs",Icon:<BsTaxiFrontFill className={Here}/>},]}

function SidebarMotion({open,setOpen}){
    if(open){
        return(
        <div>
            <img src={logo} className="h-16 w-64"/>
            <HiArrowCircleLeft className="text-white rounded-full  bg-dark text-5xl absolute -right-5 top-20" onClick={()=>{setOpen(!open)}}/>
        </div>
        )
    }
    return(
        <div>
            <HiMenu className="text-white rounded-full ml-6 mt-1 mb-6 text-4xl"/>
        </div>
    )
}

function SidebarTop(id,open,setOpen,at,setAt){    
    const content=type[id]
    const unselected="text-white opacity-40 rounded-full text-5xl  hover:opacity-100 hover:scale-[1.05] duration-300 flex items-center "
    const selected="text-white rounded-full text-5xl  flex items-center "


    let temp=content.map((item)=>{
        if(at!==item.Name){
            return <li key={item.Name} className={unselected} onClick={()=>{setAt(item.Name);setOpen(false)}}>
                <div className="flex">
                    <RxDividerVertical className='p-1 my-2 absolute opacity-0'/>
                    <div className="ml-6 flex">
                        {item.Icon}
                        {open && <div className="font-medium text-gray-300 text-xl p-2 my-2.5">
                            {item.Name}
                        </div>
                        }
                    </div>
                </div>
            </li>
        }
        else{
            return <li key={item.Name} className={selected} onClick={()=>{setAt(item.Name);setOpen(false)}}>
                <div className="flex">
                    <RxDividerVertical className='p-1 my-2 absolute'/>
                    <div className="ml-6 flex">
                        {item.Icon}
                        {open && <div className="font-medium text-gray-300 text-xl p-2 my-2.5">
                            {item.Name}
                        </div>
                        }
                    </div>
                </div>
            </li>
        }
        
    })

    return <ul>{temp}</ul>
}

function SidebarBottom(open,setOpen,at,setAt,LINK){
    const Here="rounded-full text-5xl p-3 my-2"    
    const unselected="text-white opacity-40 rounded-full text-5xl  hover:opacity-100 hover:scale-[1.05] duration-300 delay-200 flex items-center "

    const navigate=useNavigate()

    function logout(LINK,navigate){
        
        axios.post(`${LINK}/logout`,{},{
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("Token")}`
            }
        }).then((response) => {
            localStorage.clear()
            navigate('/',{replace:true})
        })
    }

    let temp=[
        <li key="Logout" className={unselected} onClick={()=>{logout(LINK,navigate)}}>
            <div className="flex">
                <RxDividerVertical className='p-1 my-2 absolute opacity-0'/>
                <div className="ml-6 flex">
                    <FiLogOut className={Here}/>
                    {open && <div className="font-medium text-gray-300 text-xl p-2 my-2.5">
                        Logout
                    </div>
                    }
                </div>
            </div>
        </li>,
        <li key="About" className={unselected} onClick={()=> {window.location.href = 'https://iiitd.ac.in/';}}>
            <div className="flex">
                <RxDividerVertical className='p-1 my-2 absolute opacity-0'/>
                <div className="ml-6 flex">
                    <FiLogOut className={Here+" opacity-0"}/>
                    {open && <div className="font-medium text-gray-300 text-xl p-2 my-2.5">
                        About
                    </div>
                    }
                </div>
            </div>
        </li>
    ]

    return (
        <div className="absolute bottom-0 mb-4">
            <ul>{temp}</ul>
        </div>
    )

}

function SidebarInterior(id,open,setOpen,at,setAt,LINK){
    return (
        <div>
            {SidebarTop(id,open,setOpen,at,setAt)}
            {SidebarBottom(open,setOpen,at,setAt,LINK)}
        </div>
    )

}


function Sidebar({id,LINK}){
    const selected=useRef("Home")
    const [at,setAt]=useState(selected.current)
    const [open, setOpen]=useState(false);

    useEffect(()=>{
        if(!open){
            selected.current=at
        }
    },[open])

    console.log("Redenderd in Sidebar")
    
    return (
        <div className="flex w-screen">
            <div className={`bg-dark h-screen pt-7 pl-0 ${open?"w-60":"w-24"} ${open?"duration-500":"duration-200"} relative`}>
                <div className="ml-1.5" onClick={()=>{setOpen(!open)}}>
                    {SidebarMotion({open,setOpen})}
                </div>
                {SidebarInterior(id,open,setOpen,at,setAt,LINK)}
            </div>
            <div className="flex-1">
                <Content at={at} id={id} LINK={LINK}/>
            </div>
        </div>
    )
}

export default Sidebar;