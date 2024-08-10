import Sideicon from '../sub_component/sideicon';

export default function DashboardContext({children,isActive}){
    console.log(isActive);
    return (<div className="flex flex-col w-full h-full">
    {/*upper section */}
        <div className="h-1/10 bg-gray-400 flex items-center p-2  border-b-8 border-transparent ">
        <div className="bg-gray-600 rounded-full p-2 h-10 w-10 items-center justify-center flex font-semibold ">A</div>
        <div className="p-2 text-lg font-bold">Amans Dashboard</div>
        </div>
    {/*lower section */}
        <div className='h-9/10 flex  '>
        {/*navbar */}
        <div className="h-full bg-gray-200 w-4/12 lg:w-2/12 flex flex-col p-2 space-y-3">
            <Sideicon iconName="material-symbols:dashboard-outline" iconText="dashboard" active={isActive==="dashboard"?true:false}/>
            <Sideicon iconName="mdi:application-edit" iconText="Allowance application" active={isActive==="Allowance application"?true:false}/>
            <Sideicon iconName="pajamas:status" iconText="Allowance status" active={isActive==="Allowance status"?true:false}/>
            <div className='text-underline font-semibold text-sm justify-end'>logout</div>
        </div>
        {/*main section */}
        <div className="h-full  w-8/12 lg:w-10/12" >
            {children}
        </div>
        </div>
    </div>)
}