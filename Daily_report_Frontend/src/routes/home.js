import Card from "../components/card";
import { useEffect,useState } from "react";
import {Link} from "react-router-dom";
import "../App.css"
import { makeUnauthenticatedGETRequest } from "../utils/fetchConfig";


export default function Home(){
    const [timesOfIndiaData,setTimesOfIndia]=useState([]);
    const [hindustanTimes,setHindustanTimes]=useState([]);

    useEffect(()=>{
    try{
        const fetchDataofTimesofindia=async()=>{
            const response1=await makeUnauthenticatedGETRequest("/news/timesofindia");
            setTimesOfIndia(response1);
            console.log(response1);
        }
        const fetchDataofHindustantimes=async()=>{
            const response2=await makeUnauthenticatedGETRequest("/news/hindustantimes");
            setHindustanTimes(response2);
            console.log(response2);
        }
        fetchDataofTimesofindia();
        fetchDataofHindustantimes();
    }
    catch(error){
        console.log("error in making request:",error);
    }
    })
    return(
        <div className="w-full h-full ">
        {/*upper section */}
        <div className="h-1/10 bg-gray-700 flex justify-center items-center font-bold text-3xl">
           Daily Report
        </div>
        {/*lower section */}
        <div className="h-8/10 bg-black flex  justify-center m-auto  overflow-x-auto items-center space-x-8 card ">
            <Card heading="Times Of india" news={timesOfIndiaData} className="left" link="https://timesofindia.indiatimes.com/"/>
            <Card heading="hindustan Times" news={hindustanTimes} className="left" link="https://www.hindustantimes.com/"/>
        </div>
        <div className="h-1/10 bg-gray-700 flex justify-center items-center text-2xl cursor-pointer hover:text-blue-500 hover:text-underline font-bold ">
          <Link to="/notes"> Notes</Link> 
        </div>
        </div>
    )
}