import { Icon } from "@iconify/react/dist/iconify.js"
export default function Sideicon({iconName,iconText,active}){
    const iconStyle=active?"bg-blue-300":"bg-gray-200"
    console.log(iconStyle);
    console.log(active);
    return(
        <div className={`flex space-x-2 hover:bg-blue-300 p-1 hover:font-semibold ${iconStyle}`}>
            <Icon icon={iconName} width="30"/>
            <div>{iconText}</div>
        </div>
    )
}