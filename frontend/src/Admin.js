import { DataGrid } from '@mui/x-data-grid';

import { Bar } from "react-chartjs-2";

import { Map,DriverDetails } from './Assets';
import { BiTrip } from "react-icons/bi"
import { GiMoneyStack,GiTakeMyMoney } from "react-icons/gi";
import { FiUsers } from "react-icons/fi"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Loader } from './Assets';


function Home_Admin(data,view,setARGS,getARGS,loading){
    if(!(getARGS()==="Live Trips" || getARGS()==="Busy Areas" || getARGS()==="Hotspots")){
        setARGS("Live Trips")
    }

    function map(items,type){
        return(
            <div className='p-4'>
                <div className='flex items-center justify-center h-full w-full'>
                    <div className='w-full h-full'>
                        <Map props={items} type={type}/>
                    </div>
                </div>    
            </div>
        )
    }

    function latest(items){
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
                <div className='flex items-center justify-center h-full w-full'>
                    <div className='w-5/6'>
                        <Bar data={data}></Bar>
                    </div>
                </div>
                
            </div>
        )
    }

    function menu(){
        const OPTIONS=["Live Trips","Busy Areas","Hotspots"]

        return (
            <div className='p-4 w-full h-full items-center justify-center '>
                <h1 className="text-left text-2xl font-medium ml-2 ">View</h1>
                <div className='justify-center items-center w-full flex px-20'>
                    <div className='flex-1 mt-8 w-1/2 justify-center'>
                        <Autocomplete options={OPTIONS} onChange={(event, value) => {setARGS(value)}}
                            renderInput={(params) => <TextField {...params} label={getARGS()} variant="outlined" size="large"/>}
                        />
                    </div>
                </div>
            </div>

        )
        
        
    }

    function content(data){
        if(data){
            if(data["Live Trips"]){
                return (
                    <div className='w-full h-full bg-white shadow-lg rounded-2xl hover:scale-[1.02] duration-300 '>
                        {map(data["Live Trips"],"Live")}
                    </div>
                )
            }
            else if(data["Busy Areas"]){
                return (
                    <div className='w-full h-full bg-white shadow-lg rounded-2xl hover:scale-[1.02] duration-300 '>
                        {map(data["Busy Areas"],"Congestion")}
                    </div>
                    
                )
            }
            else if(data["Hotspots"]){
                return (
                    <div className='w-full h-auto  bg-white shadow-lg rounded-2xl hover:scale-[1.02] duration-300 '>
                        {latest(data["Hotspots"])}


                    </div>
                )
            }
        }
    }

    function salary(bal){
        return (
            <div className='p-4 '>
                <h1 className="text-left text-xl font-medium ml-2  text-purple-700">Salary</h1>
                <div className='flex ml-4'>
                    <GiMoneyStack className="rounded-full text-5xl p-2 my-2 mr-4 opacity-60 text-purple-700"></GiMoneyStack>
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
                <h1 className="text-left text-xl font-medium ml-2  text-lime-700">Active Trips</h1>
                <div className='flex ml-4'>
                    <BiTrip className="rounded-full text-5xl p-2 my-2 mr-4 opacity-60  text-lime-700"></BiTrip>
                    <div className="flex ml-3 flex-1">
                        <h1 className="text-4xl p-3 font-semibold mr-8 text-black">{count}</h1>
                    </div>
                </div>
            </div>
        )
    }

    function top(items){
        const places=items.map((here)=>here.name)
        const values=items.map((here)=>here.rating)
        const data = {
            labels: places,
            datasets: [{
                data: values,
                label:"Rating",
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
                <h1 className="text-left text-2xl font-medium ml-2 ">Top Drivers</h1>
                <div className='flex items-center justify-center h-full w-full'>
                    <div className='w-5/6'>
                        <Bar data={data}></Bar>
                    </div>
                </div>
                
            </div>
        )
    }

    function revenve(bal){
        return (
            <div className='p-4 '>
                <h1 className="text-left text-xl font-medium ml-2   text-blue-600">Today's revenue</h1>
                <div className='flex ml-4'>
                    <GiTakeMyMoney className="rounded-full text-5xl p-2 my-2 mr-4 opacity-60  text-blue-600"></GiTakeMyMoney>
                    <div className="flex ml-3 flex-1">
                        <h1 className="text-4xl p-3 font-semibold mr-8 text-black">{bal}</h1>
                    </div>
                </div>
            </div>
        )
    }

    function Users(bal){
        return (
            <div className='p-4 '>
                <h1 className="text-left text-xl font-medium ml-2   text-amber-500">Users</h1>
                <div className='flex ml-4'>
                    <FiUsers className="rounded-full text-5xl p-2 my-2 mr-4 opacity-75  text-amber-500"></FiUsers>
                    <div className="flex ml-3 flex-1">
                        <h1 className="text-4xl p-3 font-semibold mr-8 text-black">{bal}</h1>
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
                        <div className=' flex h-1/4 w-full py-4 '>
                            <div className='h-full w-1/2 pr-4 '>
                                <div className='rounded-2xl bg-white shadow-lg h-full w-full hover:scale-[1.02] duration-300 border-l-8 border-blue-600 text-blue-600 '>
                                    {revenve(data.rev)}
                                </div>
                            </div>
                            <div className='h-full w-1/2 pl-4 '>
                                <div className='rounded-2xl bg-white shadow-lg h-full w-full hover:scale-[1.02] duration-300 border-l-8 border-amber-500 text-amber-500'>
                                    {Users(data.users)}
                                </div>
                            </div>
                        </div>
                        <div className='flex h-1/4 w-full py-4'>
                            <div className='h-full w-1/2 pr-4 '>
                                <div className='rounded-2xl bg-white shadow-lg h-full w-full hover:scale-[1.02] duration-300 border-l-8 border-purple-700 text-purple-700'>
                                    {salary(data.salary)}
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
                        <div className=' h-full w-full py-4 '>
                            <div className='h-full w-full '>
                                <div className='w-full h-1/3 pb-4'>
                                    <div className='w-full h-full  bg-white shadow-lg rounded-2xl border-l-8 border-rose-600 '>
                                        {menu()}
                                    </div>
                                </div>
                                <div className='w-full h-2/3 pt-4'>
                                    <div className='w-full h-full items-center '>
                                        {content(view)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Locations_Admin(data){
    const columns = [
        { field: 'id', headerName: 'Name', width:350},
        { field: 'congestion', headerName: 'Congestion', width:200},
        { field: 'typ', headerName: 'Type', width:200},
        { field: 'admin', headerName: 'Admin', width:250},
    ];


    function details(){
        let temp=<DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                style={{fontSize:15,padding:5}}
                hideFooterPagination
                hideFooterSelectedRowCount
        />
        return (
            <div className='bg-white p-12 rounded-2xl shadow-lg h-full flex w-full'>
                {temp}
            </div>
        )
    }

    return(
        <div className='p-12 h-full ml-4'>
            {details()}                
        </div>

    ) 
}

function Drivers_Admin(data){

    console.log(data)
    return(
        <div className='p-12 h-full ml-4'>
            <DriverDetails data={data}/>            
        </div>

    )
}

function Trips_Admin(data,focus,setFocus){
    const columns = [
        { field: 'Tripid', headerName: 'ID', width:focus?100:150},
        { field: 'status', headerName: 'Status', width:focus?150:200},
        { field: 'driver', headerName: 'Driver', width:focus?200:300},
        { field: 'time', headerName: 'LastUpdate', width:focus?150:250}
    ];

    function Receipt(data){
        return(
            <div className='rounded-lg h-full w-full p-6'>
                <div className='flex mb-1 w-full'>
                    <h1 className="font-semibold text-gray-500">TripID</h1>
                    <div className='justify-end flex-1'>
                        <h1 className="font-semibold text-gray-500 text-end">Date</h1>
                    </div>
                </div>
                <div className='flex mb-4 w-full'>
                    <div className='flex'>
                        <h1 className="text-black text-xl font-bold ml-2">{data.Tripid}</h1>
                    </div>
                    <div className='justify-end flex-1'>
                        <h1 className="text-black text-xl font-bold ml-2 text-end">{data.time}</h1>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4 mt-8 mb-12'> 
                    <div>
                        <h1 className="font-semibold text-gray-500 mt-1.5">Status</h1>
                        <h1 className="text-black text-1xl font-semibold ml-2">{data.status}</h1>
                    </div>
                    <div>
                        <h1 className="font-semibold text-gray-500 mt-1.5">Driver</h1>
                        <h1 className="text-black text-1xl font-semibold ml-2">{data.driver}</h1>
                    </div>
                    <div >
                        <h1 className="font-semibold text-gray-500 mt-1.5">Type</h1>
                        <h1 className="text-black text-1xl font-semibold ml-2">{data.typ}</h1>
                    </div>
                    <div >
                        <h1 className="font-semibold text-gray-500 mt-1.5">Fare</h1>
                        <h1 className="text-black text-1xl font-semibold ml-2">{data.fare}</h1>
                    </div>
                </div>
                <div className='flex mb-6'>
                    <h1 className="font-semibold text-gray-500 mt-1.5">At:</h1>
                    <h1 className="text-black text-2xl font-medium ml-2">{data.at}</h1>
                </div>
                <div className='flex mb-6'>
                        <h1 className="font-semibold text-gray-500 mt-1.5">From:</h1>
                        <h1 className="text-black text-2xl font-medium ml-2">{data.start}</h1>
                </div>
                <div className='flex mb-6'>
                    <h1 className="font-semibold text-gray-500 mt-1.5">To:</h1>
                    <h1 className="text-black text-2xl font-medium ml-2">{data.end}</h1>
                </div>
            </div>
        )
    }

    function details(){
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
                    <div className='bg-white p-8 rounded-2xl shadow-lg h-4/5 w-1/3 flex'>
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
            {details()}                
        </div>

    )
}

function Cabs_Admin(data){
    const columns = [
        { field: 'id', headerName: 'Number', width:250},
        { field: 'model', headerName: 'Model', width:250},
        { field: 'drv', headerName: 'Driver', width:250},
        { field: 'at', headerName: 'At', width:200},
        { field: 'space', headerName: 'Space', width:150},
    ];


    function details(){
        let temp=<DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                style={{fontSize:15,padding:5}}
                hideFooterPagination
                hideFooterSelectedRowCount
        />
        return (
            <div className='bg-white p-12 rounded-2xl shadow-lg h-full flex w-full'>
                {temp}
            </div>
        )
    }

    return(
        <div className='p-12 h-full ml-4'>
            {details()}                
        </div>

    ) 
}

function Person(data){
    return(
        <div className='rounded-lg h-full w-full p-6'>
            <div className='w-full text-center justify-center pb-4 border-b-2 mb-4 border-gray-400'>
                <h1 className="text-black text-2xl font-medium ">{data.id}</h1>
            </div>
            <div className='grid grid-cols-2 gap-8 mb-8'> 
                <div>
                    <h1 className="font-semibold text-gray-500 mt-1.5">Category</h1>
                    <h1 className="text-black text-1xl font-semibold ml-2">{data.typ}</h1>
                </div>
                <div>
                    <h1 className="font-semibold text-gray-500 mt-1.5">Join Date</h1>
                    <h1 className="text-black text-1xl font-semibold ml-2">{data.join}</h1>
                </div>
                <div >
                    <h1 className="font-semibold text-gray-500 mt-1.5">First Name</h1>
                    <h1 className="text-black text-1xl font-semibold ml-2">{data.first}</h1>
                </div>
                <div >
                    <h1 className="font-semibold text-gray-500 mt-1.5">Last Name</h1>
                    <h1 className="text-black text-1xl font-semibold ml-2">{data.last}</h1>
                </div>
                <div >
                    <h1 className="font-semibold text-gray-500 mt-1.5">Gender</h1>
                    <h1 className="text-black text-1xl font-semibold ml-2">{data.gender}</h1>
                </div>
                <div >
                    <h1 className="font-semibold text-gray-500 mt-1.5">BirthDay</h1>
                    <h1 className="text-black text-1xl font-semibold ml-2">{data.birth}</h1>
                </div>
            </div>

            <div className='mb-8'>
                <h1 className="font-semibold text-gray-500 mt-1.5">Address</h1>
                <h1 className="text-black text-1xl font-semibold ml-2">{data.addr}</h1>
            </div>

            <div className='mb-8'>
                <h1 className="font-semibold text-gray-500 mt-1.5">Phone</h1>
                <h1 className="text-black text-1xl font-semibold ml-2">{data.phone}</h1>
            </div>

            <div className='mb-8'>
                <h1 className="font-semibold text-gray-500 mt-1.5">Modified on:</h1>
                <h1 className="text-black text-1xl font-semibold ml-2">{data.modi}</h1>
            </div>
        </div>
    )
}

function Admins_Admin(data,focus,setFocus){
    const columns = [
        { field: 'id', headerName: 'ID', width:focus?250:250},
        { field: 'salary', headerName: 'Salary', width:focus?200:250},
        { field: 'update', headerName: 'Last Promoted', width:focus?250:300},
    ];

    function details(){
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
                    <div className='bg-white p-8 rounded-2xl shadow-lg h-5/5 w-1/3 flex'>
                        {Person(data[focus-1])}
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
            {details()}                
        </div>

    )
}

function Emps_Admin(data,focus,setFocus){
    const columns = [
        { field: 'id', headerName: 'ID', width:focus?150:200},
        { field: 'dept', headerName: 'Departmnt', width:focus?150:200},
        { field: 'salary', headerName: 'Salary', width:focus?150:200},
        { field: 'update', headerName: 'Last Promoted', width:focus?250:300},
    ];

    function details(){
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
                    <div className='bg-white p-8 rounded-2xl shadow-lg h-5/5 w-1/3 flex'>
                        {Person(data[focus-1])}
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
            {details()}                
        </div>

    )
}



export { Home_Admin,Locations_Admin,Drivers_Admin,Trips_Admin,Cabs_Admin,Admins_Admin,Emps_Admin }