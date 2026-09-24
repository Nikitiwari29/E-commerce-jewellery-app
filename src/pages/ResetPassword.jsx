import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSubmit=async (e)=>{
         e.preventDefault();

         if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
         }

         try{
            const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    password:password
                })
            });

            const data = await response.json();

            if(!response.ok){
                alert(data.message || "Something went Wrong");
                return;
            }

            alert("Password reset successfully");

            navigate("/login");

         }catch(error){
            console.log("Error",error);

           alert("Something went wrong.Please try again later.")
         }
    };

 return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-4">

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

            <form onSubmit={handleSubmit} className="space-y-6">

                <h1 className="text-3xl font-bold text-gray-900 text-center">
                    Reset Password
                </h1>

                <p className="text-gray-600 text-center">
                    Enter your new password
                </p>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Reset Password
                </button>

            </form>

        </div>

    </section>
);
}
export default ResetPassword