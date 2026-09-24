import React, { useEffect, useState } from "react"

const Orders=()=>{
    const [orders,setOrders] = useState([]);
    const[loading,setLoading] = useState(true)

    useEffect(()=>{
        const fetchOrders=async()=>{
            try{
                const token = localStorage.getItem("token");

                if(!token){
                    setLoading("false")
                    return;
                }

                const response = await fetch("http://localhost:5000/api/orders",{
                    method:"GET",
                    headers:{
                        Authorization : `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if(!response.ok){
                    throw new Error(data.message || "Failed to fetch orders");
                }

                setOrders(data.orders);
            }
            catch(error){
                console.error("Fetch orders error : " , error);
            }finally{
                setLoading(false);
            }
        };
        fetchOrders();
    },[]);

    if (loading) {
 return (
            <section className="bg-gray-50 min-h-screen py-10">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        MY ORDERS
                    </h1>

                    <div className="bg-white rounded-xl p-10 text-center">
                        <p className="text-gray-500">
                            Loading orders...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    

    return(
        <section className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8"
                >
                    MY ORDERS
                </h1>
                {orders.length === 0 ? (
                    <div className="bg-white rounded-xl p-10 text-center">
                        <h2 className="text-xl font-semibold text-gray-700">
                            NO ORDERS YET
                        </h2>   
                        <p className="text-gray-500 mt-2">
                            Your completed Orders will appear here
                        </p>
                    </div>
                    
                ):(
                    <div className="space-y-6">
                        {orders.map((order)=>(
                            <div key={order._id} className="bg-white rounded-xl p-6 shadow-sm">
                               <div className="flex flex-wrap justify-between gap-3 border-b pb-4">
                               <div>
                            
                                <p className="font-semibold text-gray-800">
                                    Order ID: {order._id}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {order.date}
                                </p>
                                </div> 
                               <span className="text-green-600 font-medium">
                                Order Placed Successfully
                               </span>
                            </div>
                            <div className="mt-5 space-y-4">
                                {order.items.map((item)=>(
                                    <div key={item.productId} className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg"/>
                            <div className="flex-1">
                               <h2 className="text-gray-800 font-semibold">{item.name}</h2>

                               <p className="text-sm text-gray-500">
                                   Quantity: {item.quantity}
                               </p>
                            </div>
                            <p className="font-semibold">
                                 ₹{(Number (item.price) * Number(item.quantity) ).toLocaleString("en-IN")}
                            </p>
                            </div>
                                ))}
                            
                            </div>
                            <div className="border-t mt-5 pt-4 flex justify-between">
                                <span className="font-semibold">Total:</span>
                                <span className="font-bold">
                                    ₹{order.total.toLocaleString("en-IN")}
                                </span>
                            </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Orders;