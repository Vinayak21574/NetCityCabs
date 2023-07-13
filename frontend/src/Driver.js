import { DataGrid } from '@mui/x-data-grid';
import Rating from '@mui/material/Rating'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { BiTrip } from "react-icons/bi";
import { BsStars } from "react-icons/bs"
import { GiReceiveMoney,GiMoneyStack } from "react-icons/gi";
import { IoWallet } from "react-icons/io5";
// import { BsRepeat } from "react-icons/bs";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import React from "react"
import { Button } from "@mui/material"
import { Loader } from './Assets';

import { Map } from './Assets';




function Home_Driver(data,loading){

    function income(bal){
        return (
            <div className='p-4 '>
                <h1 className="text-left text-xl font-medium ml-2  text-fuchsia-800">Income</h1>
                <div className='flex ml-4'>
                    <GiReceiveMoney className="rounded-full text-5xl p-2 my-2 mr-4 opacity-60"></GiReceiveMoney>
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
                <h1 className="text-left text-xl font-medium ml-2   text-purple-700">Trips</h1>
                <div className='flex ml-4'>
                    <BiTrip className="rounded-full text-5xl p-2 my-2 mr-4 opacity-60"></BiTrip>
                    <div className="flex ml-3 flex-1">
                        <h1 className="text-4xl p-3 font-semibold mr-8 text-black">{count}</h1>
                    </div>
                </div>
            </div>
        )
    }

    function rating(count){
        return (
            <div className='p-4 '>
                <h1 className="text-left text-xl font-medium ml-2  text-rose-600">Rating</h1>
                <div className='flex ml-4'>
                    <BsStars className="rounded-full text-5xl p-2 my-2 mr-4 opacity-60"></BsStars>
                    <div className="flex ml-3 flex-1">
                        <h1 className="text-4xl p-3 font-semibold mr-8 text-black">{count}</h1>
                    </div>
                </div>
            </div>
        )
    }

    function salary(count){
        return (
            <div className='p-4 '>
                <h1 className="text-left text-xl font-medium ml-2  text-lime-700">Salary</h1>
                <div className='flex ml-4'>
                    <GiMoneyStack className="rounded-full text-5xl p-2 my-2 mr-4 opacity-60"></GiMoneyStack>
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

    function cab(items){
        let temp;
        if(!items){
            temp=<h1>No cab assingned</h1>
        }
        else{
            temp=<div className='flex w-full h-full'>
                    <div className='w-1/2 h-full pl-4 items-center justify-center'>
                        <div className=' my-3 mb-8'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">Vehicle</h1>
                            <h1 className="text-black text-2xl font-semibold ml-3">{items.vehicle}</h1>
                        </div>
                        <div className=' my-3'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">Model</h1>
                            <h1 className="text-black text-2xl font-semibold ml-3">{items.model}</h1>
                        </div>
                    </div>
                    <div className='w-1/2 h-full items-center justify-center'>
                        <div className=' my-3 mb-8'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">At</h1>
                            <h1 className="text-black text-2xl font-semibold ml-3">{items.at}</h1>
                        </div>
                        <div className='my-3'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">Space</h1>
                            <h1 className="text-black text-2xl font-semibold ml-3">{items.space}</h1>
                        </div>
                    </div>
                </div>
        }
        return(
            <div className='p-4 '>
                <div className='flex w-full'>
                    <div className='flex'>
                        <h1 className="text-left text-xl font-medium ml-2  text-purple-700">Cab</h1>
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


    return(
        <div className='h-full w-full relative'>
            {loading && <Loader/>}
            <div className='h-full p-12'>
                <div className='grid-cols-2 flex h-full'>
                    <div className='py-2 px-8 rounded-2xl h-full w-1/2'>
                        <div className='flex h-1/4 w-full py-4'>
                            <div className='h-full w-1/2 pr-4 '>
                                <div className='rounded-2xl bg-white shadow-lg h-full w-full hover:scale-[1.02] duration-300 border-l-8 border-rose-600 text-rose-600'>
                                    {rating(data.rating)}
                                </div>
                            </div>
                            <div className='h-full w-1/2 pl-4 '>
                                <div className='rounded-2xl bg-white shadow-lg h-full w-full hover:scale-[1.02] duration-300 border-l-8 border-fuchsia-800 text-fuchsia-800'>
                                    {income(data.income)}
                                </div>
                            </div>
                        </div>
                        <div className='flex h-1/4 w-full py-4'>
                            <div className='h-full w-1/2 pr-4 '>
                                <div className='rounded-2xl bg-white shadow-lg h-full w-full hover:scale-[1.02] duration-300 border-l-8 border-purple-700 text-purple-700'>
                                    {trips(data.trips)}
                                </div>
                            </div>
                            <div className='h-full w-1/2 pl-4 '>
                                <div className='rounded-2xl bg-white shadow-lg h-full w-full hover:scale-[1.02] duration-300 border-l-8 border-lime-700 text-lime-700'>
                                    {salary(data.salary)}
                                </div>
                            </div>
                        </div>
                        <div className='h-1/2 w-full py-4 '>
                            <div className='bg-white shadow-lg rounded-2xl text-red h-full w-full hover:scale-[1.02] duration-300 '>
                                {cab(data.cab)}
                            </div>
                        </div>
                    </div>
                    <div className='py-2 px-8 rounded-2xl h-full w-1/2 pl-0'>
                        <div className=' h-2/5 w-full py-4 '>
                            <div className='bg-white shadow-lg rounded-2xl  h-full w-full hover:scale-[1.02] duration-300 border-l-8 border-indigo-600'>
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

function Book_Driver(data,focus,setFocus,LINK,setARGS,getARGS,loading,setLoading,ReFetch){
        
    function Book_content(data){
        if(data.stage==="View"){
            setARGS(null)
            return(View(data.content))
        }
        else if(data.stage==="Accepted"){
            setARGS(data.content.metadata)
            return(TripStage(data.content.main))
        }
        setARGS(data.content.metadata)
        return(TripStage(data.content.main,true))
    }

    function View(data){   
        console.log(data)         
        return(
            <div>
                <div className=' p-12 w-full h-full '>
                    <div className='h-4/5 p-4 w-full flex justify-center'>
                        {ViewScreen(data,focus)}
                    </div>
                    <div className='h-1/5 p-4 w-full flex justify-center'>
                        {focus && BarScreen(data)}
                    </div>
                </div>
            </div>
        )
    }

    function ViewScreen(data){
        const columns = [
            { field: 'id', headerName: 'SNo', width:150},
            { field: 'drop', headerName: 'Destination', width:350},
            { field: 'fare', headerName: 'Fare', width:350},
            { field: 'type', headerName: 'Type', width:150}
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
            }
        }}
        />

        return(
            <div className=' h-full p-4 w-full justify-center'>
                <div className='bg-white rounded-2xl shadow-lg p-8 w-full h-full'>
                    {data.length==0 && <Loader/>}
                    {temp}
                </div>
            </div>
        )
        
    }

    function BarScreen(data){
        return(
                <div className='bg-white rounded-2xl shadow-lg w-2/5 h-full flex p-4 items-center justify-center'>
                    <div className='w-1/2 h-full items-center justify-center flex-1'>
                        <div className='flex justify-center w-full px-6'>
                            <Button variant="contained" className="flex-auto" color="primary" onClick={()=>{accept(data[focus-1].passg)}}>Accept</Button>
                        </div>
                    </div>
                    <div className='w-1/2 h-full items-center justify-center flex-1'>
                        <div className='flex justify-center w-full px-6'>
                            <Button variant="contained" className="flex-auto" color="warning" onClick={()=>{reject(data[focus-1].passg)}}>Reject</Button>
                        </div>
                    </div>
                </div>
        )
    }

    function accept(psg){
        axios.post(`${LINK}/Accept`,{},{
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("Token")}`
            },
            params:{
                args:JSON.stringify(
                    {
                        passg:psg
                    }
                )
            }
        }).then(()=>{
            setFocus(null)
            ReFetch()
        })
    }

    function reject(psg){
        axios.post(`${LINK}/Reject`,{},{
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("Token")}`
            },
            params:{
                args:JSON.stringify(
                    {
                        passg:psg
                    }
                )
            }
        }).then(()=>{
            setFocus(null)
            ReFetch()
        })
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
                </div>
            </div>
        )
    }

    function renderMap(data){
        return <div className='w-full h-full' id={data}>
            <Map props={data} type={"Trip"}/>
        </div>
    }

    function Trip(data,pay=false){

        console.log("Pay->",pay)

        return(
            <div className='h-4/5 w-full'>
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
                        <div className=' mb-8 flex'>
                            <h1 className="font-semibold text-gray-500 mt-1.5">Pickup:</h1>
                            <h1 className="font-medium  text-gray-500 text-2xl ml-2">{data.pick}</h1>
                        </div>
                        {pay && Fare(data.fare)}
                        {!pay &&
                        <div className='w-full  justify-center flex'>
                            <div className='w-3/5 justify-center flex'>
                                <Button variant="contained" className="flex-1" color="warning" onClick={() => {travel()}}>Next</Button>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }

    function Fare(amount){
        console.log("Here")
        return(
            <div className='flex'>
                <h1 className="font-semibold text-gray-500 mt-1.5">Fare:</h1>
                <h1 className="text-medium text-2xl font-bold ml-2">{amount}</h1>
            </div>

        )
    }

    function travel(){
        axios.post(`${LINK}/Travel`,{},{
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("Token")}`
            },
            params:{
                args:JSON.stringify(getARGS())
            }
        }).then(()=>{
            ReFetch()
        })
    }

    return(
        <div className='h-full w-full'>
            {Book_content(data)}
        </div>   
    )
}


function History_Driver(data,focus,setFocus){
    
    const columns = [
        { field: 'TripID', headerName: 'ID', width:focus?100:150},
        { field: 'end', headerName: 'To', width:focus?150:200},
        { field: 'fare', headerName: 'Fare', width:focus?150:250},
        { field: 'time', headerName: 'Timestamp', width:focus?200:300}
    ];

    function Receipt(data){
        console.log("Receipt->",data)

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
                        <h1 className="font-semibold text-gray-500 mt-1.5">PassgID:</h1>
                        <h1 className="text-black text-2xl font-semibold ml-2">{data.passg}</h1>
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

export { Home_Driver,Book_Driver,History_Driver }