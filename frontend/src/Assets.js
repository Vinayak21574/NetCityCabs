import LinearProgress from '@mui/material/LinearProgress';
import { createTheme,ThemeProvider } from '@mui/material/styles';


import React from 'react';
import { Stage, Layer, Circle, Line } from 'react-konva';
// import { "Infrastructure.png" } from "./media"
import "./media/Terrain.png"
import Konva from 'konva';
import "./media/Infrastructure.png"
import { DataGrid } from '@mui/x-data-grid';
import Rating from '@mui/material/Rating'
import { MdOutlineNavigateNext,MdOutlineNavigateBefore } from "react-icons/md"


const theme = createTheme({
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    orange: {
        main: '#FF5F1F',
      },
  },
});


function Loader(){
    return (
        <ThemeProvider theme={theme}>
            <LinearProgress color='orange'/>
        </ThemeProvider>
      );
}


class Map extends React.Component{

    constructor({props,type}){
        super(props)
        this.state={width:null,height:null}
        this.type=type
        if(this.type=="Trip"){
            this.animate()
        }
        // console.log("New")
    }

    

    render (){
        let temp;
        if(this.type=="Trip"){
            this.drop=(this.transform(this.props.props.drop))
            this.at=(this.transform(this.props.props.at))


            this.Due=this.path(this.props.props.pathDue)
            this.Done=this.path(this.props.props.pathDone)

            temp=this.trip()
        }
        else{
            temp=this.track()
        }

        
        return(
            <div className='w-full h-full'>
                {temp} 
            </div>

        )
  
    }

    trip(){
        return (
            <div className={`relative h-full w-full flex items-center justify-center`} >
                       


                <div className={`absolute flex`} >
                    <img src={require("./media/Terrain.png")} ref={(container)=>this.container=container} onLoad={()=>{
                        this.setState({width:this.container.clientWidth,height:this.container.clientHeight});
                    }}/>

                <div className='absolute flex'>
                    <Stage width={this.state.width} height={this.state.height}>
                        <Layer>
                            <Line
                            x={0}
                            y={0}
                            points={this.Due}
                            stroke="#FF5F1F"
                            strokeWidth={12}
                            />
                           <Line
                            x={0}
                            y={0}
                            points={this.Done}
                            stroke="#FF5F1F"
                            opacity={0.5}
                            strokeWidth={12}
                            />

                            <Circle
                            x={this.drop.x}
                            y={this.drop.y}
                            radius={12}
                            fill="#FF5F1F"
                            />
                            <Circle
                            x={this.at.x}
                            y={this.at.y}
                            radius={10}
                            fill="white"
                            opacity={0.8}
                            />
                            <Circle
                            x={this.at.x}
                            y={this.at.y}
                            radius={5}
                            fill="blue"
                            />
                            <Circle ref={(node) => {this.node = node;}}
                            x={this.at.x}
                            y={this.at.y}
                            radius={0}
                            fill="blue"
                            />
                        </Layer>
                    </Stage>
                </div>
                
                <div className='absolute flex'>
                    <img src={require("./media/Infrastructure.png")} width={this.state.width} height={this.state.height}/>
                </div>

                </div>
            </div>
        )
    }

    track(){
        let temp=this.props.props
        temp=temp.map((item)=>this.transform(item))
        temp=temp.map((item)=>this.circle(item))
        console.log(temp)
        return (
            <div className={`relative h-full w-full items-center justify-center`} >
                       


                <div className={`absolute`} >
                    <img src={require("./media/Terrain.png")} ref={(container)=>this.container=container} onLoad={()=>{
                        this.setState({width:this.container.clientWidth,height:this.container.clientHeight});
                    }}/>
                </div>

                
                <div className='absolute'>
                    <img src={require("./media/Infrastructure.png")} width={this.state.width} height={this.state.height}/>

                </div>
                <div className='absolute'>
                    <Stage width={this.state.width} height={this.state.height}>
                        <Layer>
                            <ul>{temp}</ul>
                        </Layer>
                    </Stage>
                </div>
            </div>
        )
    }

    

    circle(item){
        return (   
                <Circle
                x={item.x}
                y={item.y}
                radius={12}
                opacity={1}
                fill="blue"
                />                     
        )
    }

    transform(data){
        return (
            {
                x:data.x*this.state.width/1600,
                y:this.state.height-this.state.height*data.y/1000
            }
        )
    }

    path(original){
        let data=[...original]
        for(let i=0;i<data.length;i+=2){
            data[i]=data[i]*this.state.width/1600;
        }
        for(let i=1;i<data.length;i+=2){
            data[i]=this.state.height-this.state.height*data[i]/1000
        }

        return data
    }


    componentWillUnmount(){
        clearInterval(this.timer)
    }

    componentDidMount(){
        if(this.node){
            this.tween=new Konva.Tween({
                node:this.node,
                duration:2,
                opacity:0,
                // yoyo:true,
                radius:45,
                easing:Konva.Easings.EaseOut
            })
        }
    }

    animate(){
        if(this.timer){
            this.tween.reset()
            this.tween.play()
        }
        else{
            this.timer=setInterval(()=>{
                this.tween.reset()
                this.tween.play()
                // console.log("Played")
            },3000)
        }
    }
}


class DriverDetails extends React.Component{
    constructor({data}){
        console.log("Here",data)
        super(data)
        this.state={focus:null,at:"Next"}
    }

    SwitchBar(name){
        return(
            <div className='w-full text-center justify-center pb-4 border-b-2 mb-4 border-gray-400'>
                <div className='w-full flex items-center'>
                    <div className=' justify-start text-start text-3xl w-1/6 text-gray-500' onClick={()=>this.setState({at:"Next"})}>
                    {this.state.at=="Prev" &&
                        <MdOutlineNavigateBefore className='text-gray-500'/>
                    }
                    </div>
                    <div className='w-2/3 text-center'>
                        <h1 className="text-black text-2xl font-medium ">{name}</h1>
                    </div>
                    <div className='justify-end text-end text-3xl w-1/6 text-gray-500' onClick={()=>this.setState({at:"Prev"})}>
                    {this.state.at=="Next" &&
                        <MdOutlineNavigateNext/>
                    }
                    </div>
                </div>
            </div>
        )
    }

    Receipt(data){
        return(
            <div className='rounded-lg h-full w-full p-6'>
                {this.SwitchBar(data.trip[this.state.focus-1].name)}
                {this.state.at=="Next" && this.trip(data.trip[this.state.focus-1])}
                {this.state.at=="Prev" && this.person(data.person[this.state.focus-1])}
            </div>
        )
    }

    trip(data){
        return(
            <div className='h-full w-full'>
                <div className='grid grid-cols-2 gap-4 mb-12'> 
                <div>
                    <h1 className="font-semibold text-gray-500 mt-1.5">Status</h1>
                    <h1 className="text-black text-1xl font-semibold ml-2">{data.status}</h1>
                </div>
                <div>
                    <h1 className="font-semibold text-gray-500 mt-1.5">Rating</h1>
                    <Rating size="medium"  className="ml-3 mt-1.5" precision={0.01} value={data.rating} readOnly/>
                </div>
                <div >
                    <h1 className="font-semibold text-gray-500 mt-1.5">Trips</h1>
                    <h1 className="text-black text-1xl font-semibold ml-2">{data.trips}</h1>
                </div>
                <div >
                    <h1 className="font-semibold text-gray-500 mt-1.5">Salary</h1>
                    <h1 className="text-black text-1xl font-semibold ml-2">{data.salary}</h1>
                </div>
                </div>
                <div className='w-full text-center justify-center pb-4  mb-4 border-gray-400'>
                    <h1 className="text-black text-2xl font-medium ">Vehicle</h1>
                </div>
                <div className='grid grid-cols-2 gap-4 mb-12'> 
                    <div>
                        <h1 className="font-semibold text-gray-500 mt-1.5">Number</h1>
                        <h1 className="text-black text-1xl font-semibold ml-2">{data.cab}</h1>
                    </div>
                    <div>
                        <h1 className="font-semibold text-gray-500 mt-1.5">Model</h1>
                        <h1 className="text-black text-1xl font-semibold ml-2">{data.model}</h1>
                    </div>
                </div>
                <div className='w-full text-center justify-center pb-4 mb-4 border-gray-400'>
                    <h1 className="text-black text-2xl font-medium ">Current Trip</h1>
                </div>
                <div className='grid grid-cols-2 gap-4 mb-12'> 
                    <div>
                        <h1 className="font-semibold text-gray-500 mt-1.5">TripID</h1>
                        <h1 className="text-black text-1xl font-semibold ml-2">{data.curr}</h1>
                    </div>
                    <div>
                        <h1 className="font-semibold text-gray-500 mt-1.5">At</h1>
                        <h1 className="text-black text-1xl font-semibold ml-2">{data.at}</h1>
                    </div>
                </div>
            </div>
        )
    }

    person(data){
        return(
            <div className='w-full h-full'>
                <div className='rounded-lg h-full w-full'>
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
            </div>
        )
    }

    details(data){
        let log=data.trip
        const columns = [
            { field: 'name', headerName: 'ID', width:this.state.focus?100:150},
            { field: 'status', headerName: 'Status', width:this.state.focus?150:150},
            { field: 'rating', headerName: 'Rating', width:this.state.focus?100:250},
            { field: 'at', headerName: 'At', width:this.state.focus?200:250},
            { field: 'emp', headerName: 'Employee', width:this.state.focus?200:250}
        ];

        let temp=<DataGrid
                rows={log}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                style={{fontSize:15,padding:5}}
                hideFooterPagination
                hideFooterSelectedRowCount
                onRowClick={(temp)=>{
                    if(temp.id===this.state.focus){
                        this.setState({focus:null,at:"Next"})
                    }
                    else{
                        this.setState({focus:temp.id,at:"Next"})
                    }
                }
            }
        />
        if(this.state.focus){
            return(
                <div className='grid-cols-2 gap-8 flex h-full w-full'>
                    <div className='bg-white w-2/3 p-12 rounded-2xl shadow-lg h-full flex'>
                        {temp}
                    </div>
                    <div className='bg-white p-8 rounded-2xl shadow-lg h-full w-1/3 flex'>
                        {this.Receipt(data)}
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className='bg-white p-12 rounded-2xl shadow-lg h-full flex w-full'>
                    {temp}
                </div>
            )
        }
    }

    render(){
        return (
            this.details(this.props.data)
        )
    }

}

export {Loader,Map,DriverDetails};