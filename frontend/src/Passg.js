import { DataGrid } from '@mui/x-data-grid';
import Rating from '@mui/material/Rating'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { BiTrip } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoWallet } from "react-icons/io5";
// import { BsRepeat } from "react-icons/bs";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import React from "react"
import Autocomplete from '@mui/material/Autocomplete';
import Switch from '@mui/material/Switch';
import { Button } from "@mui/material"
import { Loader } from './Assets';

import { Map } from './Assets';


function Home_Passg(data,LINK,loading,setLoading,ReFetch){

    function wallet(bal){
        function Add(){
            if(!(TopUp===null || TopUp ===undefined)){
                if(TopUp>0 && TopUp<=10000){
                    setLoading(true)
                    axios.post(`${LINK}/balance`,{},{
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("Token")}`
                        },
                        params:{
                            args:JSON.stringify(
                                {
                                    topUp:TopUp
                                }
                            )
                        }
                    }).then(()=>{ReFetch()})
                }
                else{
                    alert("Amount can be at most 10,000!")
                }
            }
        }

        let TopUp;

        return (
            <div className='p-4'>
                <h1 className="text-left text-xl font-medium ml-2 text-blue-600">Wallet</h1>
                <div className='flex ml-4'>
                    <IoWallet className="rounded-full text-5xl p-2 my-2 mr-4 opacity-60 text-blue-600"></IoWallet>
                    <div className="flex ml-3 flex-1">
                        <h1 className="text-4xl p-3 font-semibold text-black">{bal}</h1>
                        <div className="ml-8 mt-1.5 flex">
                            <TextField id="standard-basic" label="Add amount" variant="standard" size="small" width="10" color="primary" onChange={(newvalue) => TopUp=newvalue.target.value}/>
                            <div className="mt-4 ml-2">
                                <IconButton aria-label="add" color="success" onClick={()=>Add({TopUp})}>
                                    <AddIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function savings(bal){
        return (
            <div className='p-4 '>
                <h1 className="text-left text-xl font-medium ml-2  text-purple-700">Savings</h1>
                <div className='flex ml-4'>
                    <GiReceiveMoney className="rounded-full text-5xl p-2 my-2 mr-4 opacity-60 text-purple-700"></GiReceiveMoney>
                    <div className="flex ml-3 flex-1">
                        <h1 className="text-4xl p-3 font-semibold mr-8 text-black">{bal}</h1>
                    </div>
                </div>
            </div>
        )
    }

    function trips(count){
        return (
            <div className='p-4 '>
                <h1 className="text-left text-xl font-medium ml-2  text-lime-700">Trips</h1>
                <div className='flex ml-4'>
                    <BiTrip className="rounded-full text-5xl p-2 my-2 mr-4 opacity-60  text-lime-700"></BiTrip>
                    <div className="flex ml-3 flex-1">
                        <h1 className="text-4xl p-3 font-semibold mr-8 text-black">{count}</h1>
                    </div>
                </div>
            </div>
        )
    }

    function prev(trip){
        let temp;
        if(!trip){
            temp=<h1>No prev trip</h1>
        }
        else{
            temp=<div className='flex w-full h-full'>

                    <div className='w-1/2 h-full pl-4 items-center justify-center'>
                        <div className=' my-1'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">To</h1>
                            <h1 className="text-black text-2xl font-semibold ml-3">{trip.end}</h1>
                        </div>
                        <div className=' my-1'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">From</h1>
                            <h1 className="text-black text-2xl font-semibold ml-3">{trip.start}</h1>
                        </div>
                    </div>
                    <div className='w-1/2 h-full items-center justify-center'>
                        <div className=' my-1'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">Fare</h1>
                            <h1 className="text-black text-2xl font-semibold ml-3">{trip.fare}</h1>
                        </div>
                        <div className='my-1'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">Rating:</h1>
                            <Rating size="medium"  className="ml-3 mt-1.5" value={trip.rating} readOnly/>
                            {/* <h1 className="text-black text-2xl font-semibold ml-2">{data.rating}</h1> */}
                        </div>
                    </div>
                </div>
        }
        return(
            <div className='p-4 '>
                <div className='flex w-full'>
                    <div className='flex'>
                        <h1 className="text-left text-xl font-medium ml-2  text-indigo-600">Last Trip</h1>
                    </div>
                </div>
                <div className='p-4 flex'>
                    {temp}                
                </div>
            </div>
        )
    }

    function latest(items){
        console.log(items)
        const places=items.map((here)=>here.name)
        const values=items.map((here)=>here.trips)
        const data = {
            labels: places,
            datasets: [{
                data: values,
                label:"No of trips",
                backgroundColor: ['rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(201, 203, 207, 0.2)'],
                borderColor: ['rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(255, 205, 86)',
                'rgb(201, 203, 207)'],
                borderWidth: 2,
                borderRadius:10,
            }],
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
        return(
            <div className='p-4 '>
                <h1 className="text-left text-2xl font-medium ml-2 ">Hotspots</h1>
                <div className='w-full'>
                    <Bar className="p-2" data={data}></Bar>
                </div>
            </div>
        )
    }

    function top(items){
        const places=items.map((here)=>here.name)
        const values=items.map((here)=>here.trips)
        const data = {
            labels: places,
            datasets: [{
                data: values,
                label:"No of trips",
                backgroundColor: ['rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(201, 203, 207, 0.2)'],
                borderColor: ['rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(255, 205, 86)',
                'rgb(201, 203, 207)'],
                borderWidth: 2,
                borderRadius:10,
            }],
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
        return(
            <div className='p-4'>
                <h1 className="text-left text-2xl font-medium ml-2 ">Frequent</h1>
                <div className='flex items-center justify-center h-full w-full'>
                    <div className='w-5/6'>
                        <Bar data={data}></Bar>
                    </div>
                </div>
                
            </div>
        )
    }

    return(
        <div className='h-full w-full relative'>
            {loading && <Loader/>}
            <div className='h-full p-12'>
                <div className='grid-cols-2 flex h-full'>
                    <div className='py-2 px-8 rounded-2xl h-full w-1/2'>
                        <div className=' h-1/4 w-full py-4 '>
                            <div className='bg-white shadow-lg rounded-2xl  h-full w-full hover:scale-[1.02] duration-300 border-l-8 border-blue-600 text-blue-600 '>
                                {wallet(data.wallet)}
                            </div>
                        </div>
                        <div className='flex h-1/4 w-full py-4'>
                            <div className='h-full w-1/2 pr-4 '>
                                <div className='rounded-2xl bg-white shadow-lg h-full w-full hover:scale-[1.02] duration-300 border-l-8 border-purple-700 text-purple-700'>
                                    {savings(data.savings)}
                                </div>
                            </div>
                            <div className='h-full w-1/2 pl-4 '>
                                <div className='rounded-2xl bg-white shadow-lg h-full w-full hover:scale-[1.02] duration-300 border-l-8 border-lime-700 text-lime-700'>
                                    {trips(data.trips)}
                                </div>
                            </div>
                        </div>
                        <div className='h-1/2 w-full py-4 '>
                            <div className='bg-white shadow-lg rounded-2xl text-red h-full w-full hover:scale-[1.02] duration-300'>
                                {top(data.top)}
                            </div>
                        </div>
                    </div>
                    <div className='py-2 px-8 rounded-2xl h-full w-1/2 pl-0'>
                        <div className=' h-2/5 w-full py-4 '>
                            <div className='bg-white shadow-lg rounded-2xl  h-full w-full hover:scale-[1.02] duration-300 border-l-8 border-indigo-600  text-indigo-600'>
                                {prev(data.last)}
                            </div>
                        </div>
                        <div className=' h-3/5 w-full py-4 '>
                            <div className='bg-white shadow-lg rounded-2xl  h-full w-full hover:scale-[1.02] duration-300'>
                                {latest(data.latest)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Book_Passg(data,focus,setFocus,LINK,setARGS,getARGS,loading,setLoading,ReFetch){

    const PLACES=[
        "Parking",           
        "BasketBall Arena",             
        "Enchanted Garden",                       
        "Delegata",      
        "Club Quarters",                         
        "Simple Meals",         
        "World Trade Park",             
        "Cura Hospitality",                         
        "The Sprice Route",                           
        "Officearc",                      
        "TrustEdge Store",                            
        "Quarterbacks",            
        "Stack Office",                        
        "Drawbridge",            
        "Spinfluence",                     
        "Canvas Field",                   
        "Technologent",            
        "BaseBall Arena",                
        "Officioty",                      
        "Sparkline",            
        "FootBall Arena",                
        "PeopleScout Park",                           
        "OpenHouse"
    ]
        
    function Book_content(data){
        if(data.stage==="View"){
            return(View(data.content))
        }
        else if(data.stage==="Requested"){
            return(Requested(data.content,data.from,data.to))
        }
        else if(data.stage==="Accepted"){
            if(focus){
                setFocus(null)
            }
            setARGS(data.content.metadata)
            return(TripStage(data.content.main))
        }
        if(focus){
            setFocus(null)
        }
        setARGS(data.content.metadata)
        return(TripStage(data.content.main,true))
    }

    function View(data){              
        return(
            <div className=' p-12 w-full h-full '>
                <div className='h-1/5 p-4 w-full flex justify-center'>
                    {BarScreen()}
                </div>
                <div className='h-4/5 p-4 w-full flex justify-center'>
                    {ViewScreen(data,focus)}
                </div>
            </div>
        )
    }

    function ViewScreen(data,focus){
        const columns = [
            { field: 'id', headerName: 'SNo', width:focus?100:150},
            { field: 'vehicle', headerName: 'Number', width:focus?200:350},
            { field: 'model', headerName: 'Model', width:focus?200:350},
            { field: 'space', headerName: 'Space', width:focus?100:150}
        ];

        let temp=<DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        style={{fontSize:15,padding:5}}
        hideFooterPagination
        hideFooterSelectedRowCount
        onRowClick={(temp)=>{
            if(temp.id===focus){
                setFocus(null)
            }
            else{
                setFocus(temp.id);
                console.log("Details for focus->",focus)
            }}  
        }
        />
        if(focus){
            return (
                <div className=' h-full w-full flex justify-center'>
                    <div className='p-4 w-3/5'>
                        <div className='bg-white rounded-2xl shadow-lg p-8 w-full h-full flex'>
                            {temp}
                        </div>
                    </div>
                    <div className='p-4 w-2/5'>
                        <div className='bg-white rounded-2xl shadow-lg w-full h-full flex'>
                            <Detail data={data[focus-1]} loading={loading}/>
                        </div>
                    </div>
                </div>
            )   
        }
        return(
            <div className=' h-full p-4 w-full justify-center'>
                <div className='bg-white rounded-2xl shadow-lg p-8 w-full h-full'>
                    {temp}
                </div>
            </div>
        )
        
    }

    function BarScreen(from=null,to=null){

        return(
                <div className='bg-white rounded-2xl shadow-lg w-4/5 h-full flex'>
                    <div className='h-full w-1/2 p-4'>
                        <div className=' h-full w-full p-2'>
                            <Autocomplete options={PLACES} defaultValue={from} onChange={(event, value) => {setARGS({"from":value,"to":getARGS().to})}}
                                renderInput={(params) => <TextField {...params} label="Pickup point" variant="outlined" size="large"/>}
                            />
                        </div>
                    </div>
                    <div className='h-full w-1/2 p-4'>
                        <div className='h-full w-full p-2'>
                            <Autocomplete options={PLACES} defaultValue={to} onChange={(event, value) => {setARGS({"from":getARGS().from,"to":value})}}
                            renderInput={(params) => <TextField {...params} label="Drop point" variant="outlined" size="large"/>}
                            />
                        </div>
                    </div>
                </div>
        )
    }

    function Detail({data,loading}){
        let shrToggle,reqButton=null;
        let share=false

        console.log(data)

        if(data.category==="Request"){
            if(data.typ==="Sharing"){
                shrToggle=<Switch disabled defaultChecked/>
                share=true
            }
            else{
                shrToggle=<Switch disabled/>
            }
            reqButton=<Button variant="contained" disabled className="flex-auto" color="warning">Requested</Button>
        }
        else{
            if(data.typ==="Sharing"){
                shrToggle=<Switch disabled defaultChecked/>
                share=true
            }
            else{
                shrToggle=<Switch onClick={()=>{share=!share}}/>
            }
            reqButton=<Button variant="contained" className="flex-auto" color="warning" onClick={() => {request(data.driver,share)}}>Request</Button>
        }

        return(
            <div className='h-full w-full'>
                {loading && <Loader></Loader>}
                <div className=' h-full p-6'>

                    <div className='mt-3 my-6 ml-4'>
                        <div className=' my-1 flex'>
                                <h1 className="font-semibold text-gray-500 mt-1.5">Vehicle:</h1>
                                <div >
                                    <h1 className="text-black text-2xl font-medium ml-4">{data.vehicle}</h1>
                                    <h1 className="text-black text-1xl font-normal ml-4 mt-2">{data.model}</h1>
                                </div>
                        </div>
                        <div className=' my-1 mt-4 flex'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">Pickup:</h1>
                            <h1 className="text-black text-2xl font-medium ml-4">{data.at}</h1>
                        </div>
                        <div className=' my-4 mt-8 flex'>
                            <div className='w-1/2 justify-start flex'>
                                <h1 className="font-semibold text-gray-500 mt-1.5">Space:</h1>
                                <h1 className="text-black text-2xl font-medium ml-4 ">{data.space}</h1>
                            </div>
                            <div className='w-1/2 justify-center flex'>
                                <h1 className="font-semibold text-gray-500 mt-1.5">Share Trip:</h1>
                                <h1 className="text-black text-2xl font-medium ml-4">{shrToggle}</h1>
                            </div>
                        </div>
                        <div className=' my-4 mt-8 flex'>
                            <h1 className="font-semibold text-gray-500 mt-1.5 flex">Driver:</h1>
                            <h1 className="text-black text-2xl font-medium ml-4">{data.driver}</h1>
                        </div>
                        <div className=' my-1 mt-4 flex'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">Rating:</h1>
                            <Rating size="medium"  className="ml-3 mt-1.5" precision={0.1} value={data.rating} readOnly/>
                        </div>
                        <div className='flex my-1 mt-8 justify-center w-full'>
                            <div className='w-2/5 px-4'>
                                {reqButton}
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        )
    }

    function Requested(data,from,to){
        setARGS({"from":from,"to":to})
        return(
            <div className=' p-12 w-full h-full '>
                <div className='h-1/5 p-4 w-full flex justify-center'>
                    {BarScreen(from,to)}
                </div>
                <div className='h-4/5 p-4 w-full flex justify-center'>
                    {ViewScreen(data,focus)}
                </div>
            </div>
        )
    }

    function Trip(data,pay=false){

        return(
            <div className='h-full w-full'>
                {!pay && loading && <Loader/>}
                <div className='bg-white rounded-2xl shadow-lg p-8 w-full h-full'>
                    <div className='w-full flex'>
                        <div className='justify-start w-full flex'>
                            <h1 className="font-semibold text-gray-500 text-end">TripID:</h1>
                            <h1 className="font-semibold text-black text-end ml-2">{data.id}</h1>
                        </div>
                        <div className='justify-end w-full flex'>
                            <h1 className="font-semibold text-gray-500 text-end">Type:</h1>
                            <h1 className="font-semibold text-black text-end ml-2">{data.typ}</h1>
                        </div>
                    </div>
                    <div className='mt-8 ml-1'>
                        <div className=' mb-8 flex'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">At:</h1>
                            <h1 className="font-semibold text-black text-2xl ml-2">{data.at}</h1>
                        </div>
                        <div className=' mb-4 flex'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">Drop:</h1>
                            <h1 className="font-medium  text-gray-500 text-2xl ml-2">{data.drop}</h1>
                        </div>
                        <div className=' mb-4 flex'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">Pickup:</h1>
                            <h1 className="font-medium  text-gray-500 text-2xl ml-2">{data.pick}</h1>
                        </div>
                        <div className=' mb-10 flex'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">Driver:</h1>
                            <h1 className="font-medium  text-gray-500 text-2xl ml-2">{data.driver}</h1>
                        </div>
                        {pay && Fare(data.fare)}
                        {!pay && 
                            <div className='w-full  justify-center flex'>
                                <div className='w-3/5 justify-center flex'>
                                    <Button variant="contained" className="flex-1" color="warning" onClick={() => {SOS(data.id)}}>SOS</Button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    function Fare(amount){
        return(
            <div className='flex'>
                <h1 className="font-semibold text-gray-500 mt-1.5">Fare:</h1>
                <h1 className="text-medium text-2xl font-bold ml-2">{amount}</h1>
            </div>

        )
    }

    function Pay({id}){
        let MODE=['Cash','Online','Wallet']
        let mode,rate;
        mode="Wallet"
        return (
            <div className='h-full w-full'>
                {loading && <Loader/>}
                <div className='bg-white rounded-2xl shadow-lg p-6 w-full h-full'>
                    <div className='w-full flex items-center justify center'>
                        <div className='w-1/2 p-4 items-center justify center'>
                            <Autocomplete options={MODE} defaultValue={'Wallet'} onChange={(event, value) => {mode=value}}
                                renderInput={(params) => <TextField {...params} label="Mode" variant="outlined" size="large"/>}
                            />
                        </div>
                        <div className='items-center justify center px-2'>
                            <h1 className="font-semibold text-center text-gray-500">Rating:</h1>
                            <Rating size="medium" className="ml-3 mt-1.5" onChange={(event, value) => {rate=value}}/>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <div className='flex justify-center w-full '>
                            <div className='w-3/5 justify-center flex'>
                                <Button variant="contained" className="flex-1" color="warning" onClick={() => {PAY(id,mode,rate)}}>Pay</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    function TripStage(data,pay=false){
        return(
            <div className=' p-12 w-full h-full flex'>
                <div className='h-full w-2/3 p-4'>
                    <div className='bg-white rounded-2xl shadow-lg h-full w-full p-4'>
                        {renderMap(getARGS())}
                    </div>
                </div>
                <div className='h-full w-1/3'>
                    <div className='h-2/3 w-full p-4'>
                        {Trip(data,pay)}
                    </div>
                    <div className='h-1/3 w-full p-4'>
                        {pay && <Pay id={data.id}/>}
                    </div>
                </div>
            </div>
        )
    }

    function renderMap(data){
        return <div className='w-full h-full' id={data}>
            <Map props={data} type={"Trip"}/>
        </div>
    }

    function request(user,share){
        if(getARGS().to){
            if(getARGS().from!==getARGS().to){
                setLoading(true)
                axios.post(`${LINK}/Book/Request`,{},{
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("Token")}`
                    },
                    params:{
                        args:JSON.stringify(
                            {
                                driver:user,
                                from:getARGS().from,
                                to:getARGS().to,
                                ...(share?{typ:"Sharing"}:{typ:"Single"})
                            }
                        )
                    }
                }).then(()=>{
                    ReFetch()
                })
            }
            else{
                alert("Select logical Destination!")
            }  
            }
        else{
            alert("Select Destination!")
        }
    }

    function SOS(id){
        setLoading(true)
        axios.post(`${LINK}/Book/SOS`,{},{
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("Token")}`
            },
            params:{
                args:JSON.stringify(
                    {
                        trip:id
                    }
                )
            }
        }).then(()=>{
            setFocus(null)
            ReFetch()
        })
    }

    function PAY(id,mode,rate){
        if(rate){
            setLoading(true)
            axios.post(`${LINK}/Book/Pay`,{},{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("Token")}`
                },
                params:{
                    args:JSON.stringify(
                        {
                            trip:id,
                            mode:mode,
                            rate:rate
                        }
                    )
                }
            }).then(()=>{
                setFocus(null)
                ReFetch()
            }).catch((err)=>{
                setLoading(false)
                alert("Insufficient Balance in wallet!\nPlease add money or change payment mode.")
            })
        }
        else{
            alert("Select Rating!")
        }
    }

    return(
        <div className='h-full w-full'>
            {Book_content(data)}
        </div>   
    )
}


function History_Passg(data,focus,setFocus){

    const columns = [
        { field: 'TripID', headerName: 'ID', width:focus?100:150},
        { field: 'end', headerName: 'To', width:focus?150:200},
        { field: 'fare', headerName: 'Fare', width:focus?150:250},
        { field: 'time', headerName: 'Timestamp', width:focus?200:300}
    ];

    function Receipt(data){

        return(
            <div className=' border-gray-400 border-2 rounded-lg h-full p-6'>
                <div className='flex mb-1 w-full'>
                    <h1 className="font-semibold text-gray-500">TripID</h1>
                    <div className='justify-end flex-1'>
                        <h1 className="font-semibold text-gray-500 text-end">Date</h1>
                    </div>
                </div>
                <div className='flex mb-4 w-full'>
                    <div className='flex'>
                        <h1 className="text-black text-xl font-bold ml-2">{data.TripID}</h1>
                    </div>
                    <div className='justify-end flex-1'>
                        <h1 className="text-black text-xl font-bold ml-2 text-end">{data.time}</h1>
                    </div>
                </div>

                <div className='mt-8 my-6 ml-1.5'>
                    <div className=' my-1'>
                        <h1 className="font-semibold text-gray-500 mt-1.5">To</h1>
                        <h1 className="text-black text-2xl font-semibold ml-2">{data.end}</h1>
                    </div>
                    <div className=' my-1'>
                        <h1 className="font-semibold text-gray-500 mt-1.5">From</h1>
                        <h1 className="text-black text-2xl font-semibold ml-2">{data.start}</h1>
                    </div>
                    <div className='flex mt-8 justify-left'>
                        <div className=' flex my-3 mr-8'>
                            <h1 className="font-semibold text-gray-500 ">Type:</h1>
                            <h1 className="text-black text-1xl font-semibold ml-2">{data.typ}</h1>
                        </div>
                        <div className=' flex my-3 mx-8'>
                            <h1 className="font-semibold text-gray-500 ">Status:</h1>
                            <h1 className="text-black text-1xl font-semibold ml-2">{data.status}</h1>
                        </div>
                    </div>
                    <div className=' flex my-1 mt-8'>
                        <h1 className="font-semibold text-gray-500 mt-1.5">DriverID:</h1>
                        <h1 className="text-black text-2xl font-semibold ml-2">{data.driver}</h1>
                    </div>
                    <div className=' flex my-1 mb-8'>
                        <h1 className="font-semibold text-gray-500 mt-1.5">Rating:</h1>
                        <Rating size="medium"  className="ml-3 mt-1.5" value={data.rating} readOnly/>
                    </div>
                    <div className='p-4 mt-4 '>
                        <div className='border-t-4 border-gray-400 w-full'></div>
                    </div>
                    <div className='flex mt-2 justify-center '>
                        <div>
                            <h1 className="font-semibold text-gray-500 mt-1.5">Fare</h1>
                            <h1 className="text-black text-4xl font-bold ml-2">{data.fare}</h1>
                        </div>
                        <div className='ml-12'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">Mode</h1>
                            <h1 className="text-black text-2xl font-semibold mx-4">{data.mode}</h1>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }

    function History_details(){
        let temp=<DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                style={{fontSize:15,padding:5}}
                hideFooterPagination
                hideFooterSelectedRowCount
                onRowClick={(temp)=>{
                    if(temp.id===focus){
                        setFocus(null)
                    }
                    else{
                        setFocus(temp.id)}}
                }
        />
        if(focus){
            return(
                <div className='grid-cols-2 gap-8 flex h-full'>
                    <div className='bg-white w-2/3 p-12 rounded-2xl shadow-lg h-full flex'>
                        {temp}
                    </div>
                    <div className='bg-white p-8 rounded-2xl shadow-lg h-full flex'>
                        {Receipt(data[focus-1])}
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className='bg-white p-12 rounded-2xl shadow-lg h-full flex w-4/5'>
                    {temp}
                </div>
            )
        }
    }

    return(
        <div className='p-12 h-full ml-4'>
            {History_details()}                
        </div>

    )
}

export {Home_Passg,Book_Passg,History_Passg}
