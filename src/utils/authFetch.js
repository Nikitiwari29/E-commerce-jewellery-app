const authFetch = async (url,options ={})=>{

    const token = localStorage.getItem("token");

    if(!token){
        return null;
    }

    const {onUnauthorized,...fetchOptions}=options;

    const response = await fetch(url,{
        ...options,
        headers:{
            ...options.headers,
            Authorization : `Bearer ${token}`,
        },
    });

    if(response.status===401){
        if(onUnauthorized){
            onUnauthorized();
        }
    }

    return response;

};

export default authFetch;