import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const[form,setform]=useState({
        email:"",
        password:""
    })
    const handlechange=(e)=>{
        const{name,value}=e.target
        setform((prev)=>({
            ...prev,
            [name]:value
    }))
    }
    const handlesubmit=async (e)=>{
        e.preventDefault()
        
        try{
            const response =await fetch("https://e-commerce-jewellery-app.onrender.com/api/auth/login",{
                method:"POST",
                headers:{
                    "content-type":"application/json",
                },
                body:JSON.stringify(form)
            });
            const data=await response.json();
            if(!response.ok){
                alert(data.message || "Something went wrong");
                return;
            } 

            localStorage.setItem("token",data.token);
            localStorage.setItem("user",JSON.stringify(data.user));
            
            console.log("Login successful:",data);
            alert("Login successful");
            navigate("/products");
            

        }
        catch(error){
            console.error("Error:",error);
            alert("Something went wrong , please try again later");
        }
    }
 return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-4 ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-4">
        <form onSubmit={handlesubmit} className="mt-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Log In to your Account</h1>
         <input type="password" name="password" value={form.password} onChange={handlechange} placeholder="Enter the Password" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input type="email" name="email" value={form.email} onChange={handlechange} placeholder="Enter the Email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>

        <Link to="/forgot-password" className="block text-right text-blue-500 hover:underline">Forgot Password</Link>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Log In    
        </button>

        </form>
              
        </div>
        </section>
 )
}
export default Login;