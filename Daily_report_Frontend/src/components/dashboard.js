import DashboardContext from "../container/dashboardcontext";
export default function Dashboard(){
    return(
        <DashboardContext isActive="dashboard">
        <div className="p-3 flex space-x-2">
           <Card cardText="Allowance application"/>
           <Card cardText="Allowance status"/>
        </div>
        </DashboardContext>
    )
}
function Card({cardText}){
    return(
        <div className="w-32 h-20 p-2 text-base hover:bg-gray-600 hover:font-bold font-semibold bg-gray-500 flex justify-center items-center border rounded">
            {cardText}
        </div>
    )
}