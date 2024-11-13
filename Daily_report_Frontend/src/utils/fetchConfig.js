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

export const makeUnAuthenticatedPostRequest=async(route,data)=>{
    try{
        const response=await fetch("http://localhost:3300"+route,{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(data),
        })
       if(!response.ok){

        throw new Error(`Http error!status:${response}`);
        
       }
       const formatedResponse=response.json();
       return formatedResponse;
    }
    catch(error){
        console.log('error in fetch',error);
        throw error;
    }
        
}

export const makeAuthenticatedGETRequest = async (route)=>{
    const token=getToken("token");
    console.log(token);
    try{
        const response=await fetch("http://localhost:3300"+route,{
            method:'GET',
            headers:{
                'content-Type' : 'application/json' ,
                'Authorization' : 'Bearer ' +token
            },
        });
        if(!response.ok){
            throw new Error(`HTTP error ! Status :${response.status}`);
        }
        const formatedResponse=await response.json();
        return formatedResponse;
    }
    catch(error){
        console.log('Error making authentictaed GET request:',error);
        throw error;
    }
};

export const makeAuthenticatedPostRequest = async (route,body) =>{
    const token =getToken("token");
    console.log(token);
    try{
        const response=await fetch("http://localhost:3300"+route,{
            method:'POST',
            headers:{
                'content-Type' : 'application/json' ,
                'Authorization' : 'Bearer ' + token
            },
            body:JSON.stringify(body),
        });
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const formatedResponse=await response.json();
        return formatedResponse;
    }
    catch(error){
        console.log('Error making Authenticated POST request: ',error);
        throw error;
    }
}

export const makeAuthenticatedPutRequest = async (route,body) => {
    const token=getToken("token");
    console.log(token);
    try{
        const response = await fetch("http://localhost:3300"+route,{
            method: 'PUT',
            headers: {
                'content-Type':'application/json',
                'Authorization':'Bearer '+token, 
            },
            body:JSON.stringify(body),
        })
        if(!response.ok){
            throw new Error (`HTTP error! status: ${response.status}`);
        }
        const formatedResponse=await response.json();
        return formatedResponse;
    }
    catch(error){
        console.log("error making authenticated put request",error)
        throw error;
    }
}

export const makeAuthenticatedDeleteRequest = async (route) => {
    const token=getToken("token");
    console.log(token);
    try{
        const response = await fetch("http://localhost:3300"+route,{
            method: 'DELETE',
            headers: {
                'content-Type':'application/json',
                'Authorization':'Bearer '+token, 
            }
        })
        if(!response.ok){
            throw new Error (`HTTP error! status: ${response.status}`);
        }
        const formatedResponse=await response.json();
        return formatedResponse;
    }
    catch(error){
        console.log("error making authenticated put request",error)
        throw error;
    }
}

function getToken(tokenName){
    const cookies =document.cookie.split(';');
    for(let i=0;i<cookies.length;i++){
        const cookie =cookies[i].trim();
        if(cookie.startsWith(`${tokenName}=`)){
            const tokenValue=cookie.substring(tokenName.length+1);
            return tokenValue;
        }
    }
}