import React, { useState } from "react"
import { Link } from "react-router-dom"


const SignUp=()=>{
    const [form,setForm]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
    const handleChange=(e)=>{
    const {name,value}=e.target;
    setForm((prev)=>({
        ...prev,
        [name]:value
    }))
    } 
    const handleSubmit= async (e)=>{
        e.preventDefault();
    
    if(form.password!==form.confirmPassword){
        alert("Password and Confirm Password do not match");
        return;
    }

        try{
            const response=await fetch("http://localhost:5000/api/auth/signup",{
                method:"POST",
                headers:{
                    "content-type":"application/json",
                },
                body:JSON.stringify({
                name:form.name,
                email:form.email,
                password:form.password,
                  }),
        })
        const data=await response.json();
        if(!response.ok){
            alert(data.message || "Something went wrong");
            return;
        }
        console.log("User created successfully:",data);
        alert("User created successfully");

    }
    catch(error){
        console.error("Error:",error);
        alert("Something went wrong , please try again later");
    }
    
};
    return(
        <section className="bg-gray-50 min-h-screen flex items-center justify-center min-h-screen px-4 ">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-4">
            <h1 className="text-3xl font-bold text-gray-900 text-center">
                Create Account
            </h1>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter the Name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter the Password" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter the Email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-s:ring-blue-500"/>
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm the Password" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Create Account
        </button>
        </form>
        <p className="text-center text-sm text-blue-500 mt-4 cursor-pointer flex justify-between">
            Already have an account?{" "}
            <Link 
            to="/logIn" className="text-blue-500 hover:underline cursor-pointer">
               LogIn
            </Link>
        </p>
        </div>
        </section>
    )
    
}
export default SignUp;