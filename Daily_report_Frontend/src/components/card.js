import { Link } from "react-router-dom"

export default function Card({heading,news,link}){
    return (
        <div className="w-full sm:w-1/3 md:w-1/3 h-1/2 bg-gray-600 rounded overflow-y-auto" >
            {/*heading */}
            <div className="sticky top-0 z-10 bg-gray-900 text-gray-400 justify-center items-center  border underline h-1/10 flex font-bold text-xl p-4 "><Link to={link} >{heading}</Link></div>
            {/*news */}
            <div className="p-2 flex flex-col justify-center font-semibold space-y-1">
                {
                    news.slice(0,5).map((newsData)=>{
                        return <li style={{listStyle:"disc"}}>{newsData}</li>
                    })
                }
            </div>
        </div>
    )
}