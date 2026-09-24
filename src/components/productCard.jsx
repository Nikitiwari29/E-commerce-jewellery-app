import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";

function ProductCard({ product,isInCart, onAddToCart, onAddToWishlist,isWishlisted , onViewDetails}) {
  const navigate=useNavigate();
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">

      {/* IMAGE */}
      <div className="relative overflow-hidden bg-gray-50">

        <img
          src={product.image}
          alt={product.name}
          onClick={()=>onViewDetails(product)}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* DISCOUNT BADGE */}
        {product.discount && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {product.discount}% OFF
          </span>
        )}

        {/* WISHLIST */}
        <button
          onClick={() => onAddToWishlist(product)}
          className="absolute top-4 right-4 bg-white/95 p-2.5 rounded-full shadow-md hover:bg-red-50 transition-all duration-200"
        >
          <Heart
            size={19}
            fill={isWishlisted ? "currentColor" : "none"}
            className={isWishlisted ? "text-red-500" : "text-gray-700"}
          />
        </button>

      </div>

      {/* DETAILS */}
      <div className="p-5">

        {/* CATEGORY */}
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {product.category}
        </p>

        {/* PRODUCT NAME */}
        <h2 
        onClick={()=>onViewDetails(product)}
        className="mt-2 text-lg font-semibold text-gray-800 line-clamp-2 min-h-[56px]">
          {product.name}
        </h2>

        {/* RATING */}
        <div className="flex items-center gap-1 mt-2">
          <Star
            size={16}
            fill="currentColor"
            className="text-yellow-500"
          />

          <span className="text-sm text-gray-600">
            {product.rating}
          </span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-3 mt-3">

          <span className="text-xl font-bold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

        </div>

        {/* ADD TO CART */}
        <button
          onClick={() =>{
            if(isInCart){
              navigate("/cart")
            }else{
              onAddToCart(product);
            }
          }}
          className="w-full mt-4 bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-gray-800 active:scale-[0.98] transition-all duration-200"
        >
          <ShoppingCart size={18} />
        
          {isInCart ? "Go to Cart" : "Add to Cart"}
        </button>

      </div>

    </div>
  );
}

export default ProductCard;