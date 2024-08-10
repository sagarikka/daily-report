export const makeUnauthenticatedGETRequest=async(route)=>{
    try{
        const response=await fetch("http://localhost:3300"+route,{
            method:'GET',
            headers:{
                'Content-type':'application/json'
            }
        }
        )
        if(!response.ok){
            throw new Error(`Http error!status:${response}`);
        }
        const formatedResponse=await response.json();
        return formatedResponse;
    }
    catch(error){
        console.log("error in fetch",error);
        throw error;

    }
}