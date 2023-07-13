import React from 'react';
import { Stage, Layer, Circle, Line } from 'react-konva';
import "./Terrain.png"
import "./NetCity.png"
import Konva from 'konva';
import "./Infrastructure.png"

class Map extends React.Component{

    constructor(props){
        super(props)
        this.state={width:null,height:null}
    }

    render (){
        let x1=651*this.state.width/1600
        let y1=this.state.height-255*this.state.height/1000
        let x2=1006*this.state.width/1600
        let y2=this.state.height-433*this.state.height/1000
        let x3=1244*this.state.width/1600
        let y3=this.state.height-553*this.state.height/1000
        let x4=760*this.state.width/1600
        let y4=this.state.height-795*this.state.height/1000

        if(this.node){
            const tween=new Konva.Tween({
                node:this.node,
                duration:2,
                opacity:0,
                // yoyo:true,
                radius:45,
                easing:Konva.Easings.EaseOut
            })
            tween.play()

            setInterval(()=>{
                tween.reset()
                tween.play()
                console.log("Played")
            },4000)

        }
        
        return(
            <div className={`h-full w-full flex items-center justify-center`} >
                       
                <div className='absolute w-full h-full flex items-center justify-center' >
                    <div className='absolute flex items-center justify-center'>
                        <Stage width={this.state.width} height={this.state.height}>
                            <Layer>
                                <Line
                                x={0}
                                y={0}
                                points={[x2,y2,x3,y3,x4,y4]}
                                stroke="#FF5F1F"
                                strokeWidth={15}
                                />
                                <Line
                                x={0}
                                y={0}
                                points={[x1,y1,x2,y2]}
                                stroke="#FF5F1F"
                                opacity={0.5}
                                strokeWidth={15}
                                />

                                <Circle
                                x={x4}
                                y={y4}
                                radius={15}
                                fill="#FF5F1F"
                                />
                                <Circle ref={(node) => {this.node = node;}}
                                x={x2}
                                y={y2}
                                radius={0}
                                fill="blue"
                                />
                            </Layer>
                        </Stage>
                    </div>
                    <div className='absolute w-full h-full flex items-center justify-center'>
                        <img src={require("./Infrastructure.png")} />
                    </div>
                    
                </div>

                <div className={`w-full flex items-center justify-center`} >
                    <img src={require("./Terrain.png")} ref={(container)=>this.container=container} onLoad={()=>{
                        this.setState({width:this.container.clientWidth,height:this.container.clientHeight});
                        console.log({width:this.container.clientWidth,height:this.container.clientHeight})
                    }}/>

                </div>

                
            </div>
        )
  
    }
}


export default Map

              