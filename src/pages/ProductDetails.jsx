import React from "react";
import { ArrowLeft , Heart ,ShoppingCart,Star } from "lucide-react";
import {useParams,useNavigate} from "react-router-dom";


import products from "../data/products";
const ProductDetails =({
    onAddToCart,onAddToWishlist,wishlist,cart
})=>{
    
    const navigate = useNavigate();
    const { id } = useParams();
    const product = products.find((item) => item.id === Number(id));
   
    // const isWishlisted = location.state?.isWishlisted;
    if(!product) {
        return 
    <h1>Product not found</h1>;
    }

     const isWishlisted = wishlist.some(
        (item) => item.id === product.id);

        const isInCart = cart.some(
    (item) => Number(item.productId || item.id) === product.id
);
    return(
        <section className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-6xl mx-auto px-6">
                <button onClick={()=> navigate("/products")}
                 className="flex items-center gap-2 text-gray-600 hover:text-black mb-8">
                    <ArrowLeft size={20}/>
                    Back to Collection
                </button>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2">
                  <div className="bg-gray-100">
                    <img src={product.image} alt={product.name} className="w-full h-full min-h-[450px] object-cover" />

                    </div>

                    <div className="p-8 md:p-12 flex flex-col justify-center">
                    <p className="text-sm uppercase tracking-[0.25em] text-gray-400">
                    {product.category}    
                    </p>    
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
                        {product.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-4">
                        <Star size={18}
                        fill="currentColor"
                        className="text-yellow-500"/>
                        <span className="text-gray-600">
                            {product.rating} Rating
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mt-6">
                        ₹{product.price.toLocaleString("en-IN")} 
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-6">
                        Discover timeless elegance with this beautiful piece from our
                        exclusive jewellery collection. Designed to add a touch of
                        sophistication and sparkle to every occasion.
                    </p>

                    <div className="flex gap-3 mt-8">
                        <button onClick={()=> {
                            if(isInCart){
                                navigate("/cart")
                            }else{
                                onAddToCart(product)
                            }
                        }}
                         className="flex-1 bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition">
                        <ShoppingCart size={19}/>
                        {isInCart ? "Go to cart" : "Add to cart"}
                        </button>
                        <button onClick={()=> onAddToWishlist(product)} className={`p-3 rounded-xl border transition 
                            ${isWishlisted ? "text-red-600 border-red-200 bg-red-50" : "text-gray-700 hover:bg-gray-50"

                            }`}>
                         <Heart size={21}
                         fill={isWishlisted ? "currentColor" : "none"}
                        />
                        </button>
                    </div>
                    </div>  
                </div>
            </div>
        </section>
    )
}
export default ProductDetails;