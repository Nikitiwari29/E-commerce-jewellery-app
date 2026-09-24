import React, { useState } from "react";
import ProductCard from "../components/productCard";
import products from "../data/products";

const Products = ({search,cart,onAddToCart,onAddToWishlist,wishlist,onViewDetails}) => {
   
  const [selectcategory,setSelectCategory]=useState("All");
  const categories=[
    "All",
    ...new Set(products.map((product)=> product.category)),

  ];

  const filteredProducts = products.filter((product) => {
  const matchesCategory =
    selectcategory === "All" ||
    product.category === selectcategory;

  const matchesSearch =
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase());

  return matchesCategory && matchesSearch;
});
console.log("running products page");
  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
          Explore Our Collection
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Jewellery Collection
        </h1>
        <div className="flex flex-wrap gap-3 mt-6 mb-8">
          {categories.map((category)=>(<button key={category} onClick={()=> setSelectCategory(category)}
            className={`px-5 py-2 rounded-full border transition-all duration-300 ${
              selectcategory===category
              ? "bg-black text-white border-black" : "bg-white text-gray-300 hover:border-black"
            }`}
            >{category}</button>))}
        </div>
      
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          isWishlisted={wishlist.some((item)=> item.id === product.id)}
          onViewDetails={onViewDetails} 
          isInCart={cart.some((item) => item.id === product.id)}
        />
      ))}
 
    </div>
    </div>

    </section>
  );
};

export default Products;