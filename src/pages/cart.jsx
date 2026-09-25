import React from "react";
import {Trash2,Plus,Minus} from "lucide-react";
import { useNavigate } from "react-router-dom";


const Cart = ({cart,setCart})=>{
    const navigate = useNavigate();


    const increaseQuantity= async (productId)=>{
        try{
            const token = localStorage.getItem("token")

            if(!token){
                alert("Please Login to Continue")
                navigate("/login")
                return
            }

            const item=cart.find(
                (item)=>item.id===productId
            )

            if(!item){
                return;
            }

            const newQuantity = item.quantity+1;

            const response = await fetch(`https://e-commerce-jewellery-app.onrender.com/api/cart/update/${productId}`,{
                method:"PUT",
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    quantity:newQuantity,
                }),
            })
            const data = await response.json();

            if(!response.ok){
                alert(data.message || "Something went Wrong")
                return;
            }

            setCart((prevCart)=>
            prevCart.map((item)=>
            item.id === productId ? {...item,quantity:newQuantity}
        : item )
            );

         console.log("Quantity increased:", data);

    } catch (error) {
        console.error("Increase quantity error:", error);
    }
    };
    const decreaseQuantity= async (productId)=>{
   try{
    const token=localStorage.getItem("token")

    if(!token){
        alert("Please Login to Continue")
        navigate("/login")
        return;
    }

    const item=cart.find(
        (item)=>item.id===productId
    )

    if(item.quantity <= 1){
        return
    } 
    const newQuantity = item.quantity-1;

    const response = await fetch(`https://e-commerce-jewellery-app.onrender.com/api/cart/update/${productId}`,{

        method:"PUT" ,
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
            quantity:newQuantity,
        }),
    });

    const data = await response.json();

    if(!response.ok){
        alert(data.message || "Something went wrong");
        return;
    }
    setCart((prevCart)=> prevCart.map((item)=>item.id===productId  ? {...item,quantity:newQuantity} : item));

    console.log("Quantity decreased:",data);
   }
   catch(error){
    console.error("Decrese count :",error);
   }
    }

    const removeFromCart= async (productId)=>{
        try{
            const token = localStorage.getItem("token")

            if(!token){
                alert("Please LogIn to manage the cart")
                navigate("/login")
                return;
            }

            const response = await fetch(`https://e-commerce-jewellery-app.onrender.com/api/cart/remove/${productId}`,
                {
                    method:"DELETE",
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if(!response.ok){
                alert(data.message || "Something Went Wrong")
                return;
            }

            setCart((prevCart)=>
            prevCart.filter((item) => item.id !== productId)
            );
            console.log("Removed from Cart",data);

        }catch(error){
            console.error("remove cart",error)
            alert("Something went Error");
        }
    }

    const clearCart =  async() => {
        try{
            const token=localStorage.getItem("token");
            console.log(token)
            if(!token){
                alert("Please Login to manage the cart");
                navigate("/login")
                return;
            };

            const response = await fetch("https://e-commerce-jewellery-app.onrender.com/api/cart/clear",{
                method:"DELETE",
                headers:{
                    Authorization:`Bearer ${token}`,
                    
                }
            })
            const data = await response.json();

            if(!response.ok){
                alert(data.message || "something went Wrong")
                return;
            }
            setCart([]);

            console.log("Cart cleared",data)

        }
        catch(error){
            console.error("Clear cart Error",error)
            alert("SOmething went wrong plz try again later")
        }

    };

    const total = cart.reduce((sum,item)=>
    sum+item.price*item.quantity,0);

    return(
        <section className="bg-gray-50 min-h-screen py-10">

        <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Your Cart
            </h1>

             {cart.length > 0 && (
                <button onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-medium">
                    Clear Cart
                </button>
             )}

            {cart.length===0 ?(
                <div className="bg-white rounded-xl p-10 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">
                        Your Cart is Empty
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                </div>
            ):(
                <div className="bg-white rounded-xl p-6">
                    {cart.map((item)=>(
                        <div key={item.id} className="bg-white rounded-xl p-4 flex item-center gap-5 shadow-sm">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg"/>
                            <div className="flex-1">
                                <h2 className="font-semibold text-gray-800">{item.name}</h2>
                                <p className="text-gray-500 mt-1">
                                  ₹{item.price.toLocaleString("en-IN")}  
                                </p>
                            </div>
                            {/* Quantity */}

                            <div className="flex items-center border rounded-lg">
                                <button onClick={()=>decreaseQuantity(item.id)} className="p-2 hover:bg-gray-100">
                                    <Minus size={16}/>
                                </button>

                                <span className="px-4">{item.quantity}</span>
                                <button onClick={()=>increaseQuantity(item.id)} className="p-2 hover:bg-gray-100">
                                    <Plus size={16}/>
                                </button>
                            </div>

                            {/* remove */}

                            <button onClick={()=>removeFromCart(item.id)} className="p-2 hover:bg-gray-100">
                                <Trash2 size={16}/>
                            </button>
                        </div>
                    ))
                        }
                        {/* total */}

                        <div className="bg-white rounded-xl p-6 mt-8">
                            <div className="flex justify-between text-lg font-semibold"
                            >
                                <span>Total:</span>
                                <span>₹{total.toLocaleString("en-IN")}</span>
                            </div>
                            <button onClick={() => navigate("/checkout")} className="w-full mt-5 bg-black text-white py-3 rounded-lg  hover:bg-gray-800">
                                Proceed to Checkout
                            </button>
            
                </div>
            
                        </div>
            )}
        </div>
        </section>
    )
    
}
export default Cart;