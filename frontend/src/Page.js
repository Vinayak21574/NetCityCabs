import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

function Page(){
    console.log("Redered in Page");
    const location = useLocation();
    return(
        <div className='flex bg-slate-200'>
            <Sidebar id={location.state.id} LINK={location.state.link}/>
        </div>
    )
}

export default Page;