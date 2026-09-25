import React,{useState} from "react";

const ForgotPassword=()=>{
    const [email,setEmail]=useState("");

    const handleSubmit= async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch("https://e-commerce-jewellery-app.onrender.com/api/auth/forgot-password",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:email
                })
            })
            const data = await response.json();
            
            if(!response.ok){
                alert(data.message || "Something went wrong");
                return;
            }
            console.log("Reset response:",data);
            alert("Reset password Link have been successfully sent to your Email account");
        }catch(error){
            console.error("Error",error)
            alert("Something went wrong.")
        }
    };

    return(
        <section className="bg-gray-50 min-h-screen/2 flex item-center justify-center px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900 text-center">
                        Forgot Password
                    </h1>
                    <p className="text-gray-600 text-center">
                        Enter a valid Email Address
                    </p>

                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter a valid Email address" className="w-full bg-gray-100  py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

                    
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                    Send Reset Link
                </button>
                </form>
            </div>
        </section>
    );
};
export default ForgotPassword;