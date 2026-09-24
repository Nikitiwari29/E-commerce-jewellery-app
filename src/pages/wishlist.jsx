import React from "react";
import{Trash2,ShoppingCart} from "lucide-react";

const Wishlist=({
    wishlist,setWishlist,onAddToCart,onAddToWishlist
})=>{
    
    return(
        <section className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    My WishList❤
                </h1>
                {wishlist.length===0 ? (
                    <div className="bg-white rounded-xl p-10 text-center">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Your Wishlist is Empty
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Save your favourite jewwllwry here.
                        </p>

                    </div>

                ):(
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                        {wishlist.map((product)=>(
                            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                                <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                                <div className="p-4">
                                    <p className="text-xs uppercase tracking-wider text-gray-400">
                                        {product.category}
                                    </p>
                                    <h2 className="font-semibold text-gray-800 mt-1">
                                        {product.name}
                                    </h2>
                                    <p className="font-bold text-lg mt-2">
                                         ₹{product.price.toLocaleString("en-IN")}
                                    </p>
                                    <div className="flex gap-2 mt-4">
                                        <button onClick={()=> onAddToCart(product)} className="flex-1 bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800">
                                            <ShoppingCart size={17}/>
                                            Add to Cart
                                        </button>
                                        <button onClick={()=> onAddToWishlist(product)} className="p-2 border rounded-lg text-red-500 hover:bg-red-50">
                                            <Trash2 size={18}/>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
export default Wishlist;