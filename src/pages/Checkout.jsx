import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout =({cart,setCart,orders,setOrders})=>{

    const navigate=useNavigate();

    const [formData,setFormData]=useState({
        name:"",
        phone:"",
        address:"",
        city:"",
        pincode:""
    });

    const [loading,setLoading]=useState(false);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }));
    }

    const total = cart.reduce(
        (sum,item)=> sum + item.price * item.quantity,0
    );

    const handleSubmit= async (e)=>{
        e.preventDefault();

        const token = localStorage.getItem("token");

        if(!token){
            alert("Please login to place an order");
            navigate("/login");
            return;
        }

        if(cart.length === 0){
            alert("Your cart is empty")
            navigate("/cart");
            return;
        }

        try{
            setLoading(true);

            const orderItems = cart.map((item)=>({
                productId : item.id,
                name:item.name,
                price:item.price,
                quantity:item.quantity,
                image:item.image
            }));

            console.log(orderItems)

            const response = await fetch("https://e-commerce-jewellery-app.onrender.com/api/orders",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({
                    items:orderItems,
                    total:total,
                    customerDetails:formData,
                    paymentMethod:"cash on delivery"
                })
            });
            const data = await response.json();

            if(!response){
                throw new Error(data.message || "Something went wrong");
            }
            console.log("Order Created :",data.order);

            const clearCartResponse=await fetch("https://e-commerce-jewellery-app.onrender.com/api/cart/clear",{
                method:"DELETE",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const clearCartData=await clearCartResponse.json();
            if(!clearCartResponse.ok){
                throw new Error(
                    clearCartData.message || "Order placed but cart could not clear the cart "
                );
            }
            console.log("Cart cleared",clearCartData);

            setCart([]); // Clear the cart after successful order

        
        navigate("/order-success");
        }
        catch(error){
            console.error("Order error",error)
            alert(error.message || "Something went wrong while placing the order");

        }
        finally{
            setLoading(false)
        }

        // const newOrder={
        //     id: Date.now(),
        //     items: cart,
        //     total: total,
        //     customerDetails: formData,
        //     date:new Date().toLocaleString("en-IN"),
        // }
        // Handle form submission logic here
        // console.log("Form submitted:", formData);

       
        // setOrders((prevOrders) => [...prevOrders, newOrder]);


        
    };
    return (
        <section className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Checkout
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/*Customer Details */}
                <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Shopping Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                               Full Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                                
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Phone Number
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="1234567890"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Address
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                placeholder="123 Main St"
                            />
                        
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                City
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                placeholder="New York"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                PinCode
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                required
                                placeholder="10001"
                            />
                        </div>
                                
                        
                    
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-5">
                        Payment Method
                    </h2>
                <div className="border rouned-lg p-4">
                  <label  className="flex items-center gap-3">
                    <input type="radio" name="payment" />
                    <span className="text-gray-700">Cash On Delivery</span>
                  </label>  
                </div>
                </div>
                {/*Order Summary */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Order Summary
                    </h2>
                    <div className="space-y-4">
                        {/* Order items would go here */}
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                                <span className="text-gray-700">{item.name} x {item.quantity}</span>
                                <p className="font-medium">
                                     ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                </p>
                    </div>
                        ))}
                </div>
                <div className="border-t mt-6 pt-5 flex justify-between text-lg font-bold ">

                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mt-6 transition">
                    {loading ? "Placing Order..." : "place Order"}
                </button>
            </div>
            </form>
                
            
        </div>
        </section>
    )
}
export default Checkout;