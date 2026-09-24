import { useState , useEffect} from 'react'
import 'tailwindcss'  
import {Routes,Route,useNavigate } from 'react-router-dom'
import './App.css'



import Navbar from './components/Navbar'
import Products from './pages/products'
import Footer from './components/footer'
import Cart from './pages/cart'
import Wishlist from './pages/wishlist';
import ProductDetails from './pages/ProductDetails' 
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/orderSuccess'
import Orders from './pages/orders'
import SignUp from './pages/signUp'
import Login from './pages/logIn'
import productsData from './data/products.js'
import authFetch from './utils/authFetch';
import ProtectedRoute from './components/ProtectedRoutes.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'



function App() {
  const [search, setSearch] = useState("")
  const [cart,setCart]=useState([])
  const [wishlist ,setWishlist]=useState([]);
  const [orders,setOrders]=useState([]);
  const [user,setUser]=useState(
    JSON.parse(localStorage.getItem("user")));
  
    useEffect(()=>{
      fetchCart();
      fetchWishlist();
    },[user]);
  // const [currentPage,setCurrentPage]=useState("products") ###Previous approact to learn the currentPage 
    
  // const [selectedProduct,setSelectedProduct] = useState(null);
  
  const navigate=useNavigate();

  const handleUnauthorized = () =>{

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setUser(null);
    setCart([]);
    setWishlist([]);

    navigate("/login")
  };

  const handleAddtoCart= async(product)=>{
   try{
    const token = localStorage.getItem("token");

    if(!token){
      alert("Please log in to add items to the cart.");
      navigate("/login");
      return;
    }
    const response =await authFetch("http://localhost:5000/api/cart/add",{
      method:"POST",
      headers:{
        "content-type":"application/json",
      },
      body:JSON.stringify({productId:product.id}),
      onUnauthorized:handleUnauthorized
    });
    const data=await response.json();

    if(!response.ok){
      alert(data.message || "Something went wrong");
      return;
    }
    console.log("Product added to cart:",data);
fetchCart();
   }
   catch(error){
    console.error("Error:",error);
    alert("Something went wrong , please try again later");
   }
  };

  const fetchCart= async() => {
    try{
      const token = localStorage.getItem("token");
      console.log(token)
      if(!token){
        return;
      }
     
      const response = await authFetch(
        "http://localhost:5000/api/cart",{
          onUnauthorized:handleUnauthorized
        }
      );

      const data = await response.json();

      console.log("cart from backend",data.cart);
      if(!response.ok){
        console.log(data.message)
        return;
      }
      const formattedCart=data.cart.map((cartItem)=>{
        const product = productsData.find(
          (item)=>Number (item.id)===Number(cartItem.productId)
        );
        if(!product) return null;
        return{
          ...product,
          quantity:cartItem.quantity,
        };
        
      })
      .filter(Boolean);
      setCart(formattedCart);
    }
    catch(error){
      console.log(error);
    }
  }

  const handleAddToWishlist =async (product) => {
    try {
      const token=localStorage.getItem("token");
      console.log(token)

      if(!token){
        alert("Please log in to add products to wishList ")
        navigate("/login");
        return
      }

      const alreadyExists=wishlist.some(
        (item)=>item.id===product.id
      );

      if(alreadyExists){
        const response = await authFetch(`http://localhost:5000/api/wishlist/remove/${product.id}`,{
          method:"Delete",
         onUnauthorized:handleUnauthorized

        })

        const data = await response.json();

        if(!response.ok){
        alert(data.message || "Something went wrong");
        return;
        }
        setWishlist((prevWishlist)=>
        prevWishlist.filter((item)=> item.id!==product.id)
        );

        console.log("Removed from Wishlist:",data);
        return;
        }
        const response = await authFetch("http://localhost:5000/api/wishlist/add",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON .stringify({productId:product.id,}),

          onUnauthorized:handleUnauthorized

        })

        const data = await response.json();

        if(!response.ok){
          alert(data.message ||"Something went wrong");
          return
        }
        setWishlist((prevWishlist)=>[
          ...prevWishlist,
          product,
        ]);

        console.log("added to wishlist",data);
    }catch(error){
      console.error("Wishlist error",error);
      alert("Something went wrong.please try again later")
    }
  };

  const fetchWishlist = async()=>{
    try{
      const token=localStorage.getItem("token");

      if(!token){
        setWishlist([])
        return;
      }

      const response=await authFetch("http://localhost:5000/api/wishlist",{
        onUnauthorized:handleUnauthorized
      });

      if(!response){
        return;
      }

      const data = await response.json();

      if(!response.ok){
        console.log(data.message);
        return;
      }

      const formattedWishlist = data.map((wishlistItem)=>{
        const product = productsData.find(
          (item)=> item.id === wishlistItem.productId
        );
        return product ;

      }).filter(Boolean);
      setWishlist(formattedWishlist);
    }catch(error){
      console.log("Error fetching Wishlist",error);
    }
  };

  //FOr Currentpage usage
  // const handleViewDetails=(product)=>{
  //   setSelectedProduct(product);
  //   setCurrentPage("details");
  // };

  
  const handleViewDetails=(product)=>{
    navigate(`/product/${product.id}`
    );
  };

  return (
    <>
    <div className="min-h-screen flex flex-col">
     <Navbar search={search} setSearch={setSearch} cart={cart} wishlist={wishlist} user={user} setUser={setUser} />
     <main className="flex-1">
      {/* {currentPage ==="details" && (<ProductDetails product={selectedProduct} onBack={()=>setCurrentPage("products")} onAddToCart={handleAddtoCart} onAddToWishlist={handleAddToWishlist} isWishlisted={wishlist.some((item) => item.id===selectedProduct?.id)}/>)} */}
      {/* {currentPage === "products" &&(<Products search={search} onAddToCart={handleAddtoCart} onAddToWishlist={handleAddToWishlist} wishlist={wishlist} onViewDetails={handleViewDetails}/>)
      }

      {currentPage === "cart" &&(<Cart cart={cart} setCart={setCart}/>)}
      
      {currentPage === "wishlist" &&(<Wishlist wishlist={wishlist} setWishlist={setWishlist} onAddToCart={handleAddtoCart} />)} */}

      <Routes>

         <Route 
        path="/reset-password/:token"
        element={<ResetPassword/>}
        />
        
        <Route
        path='/'
        element={
          <Products
          search={search}
          cart={cart}
          onAddToCart={handleAddtoCart}
          onAddToWishlist={handleAddToWishlist}
          wishlist={wishlist}
          onViewDetails={handleViewDetails}
        
          />
        }
        />

        <Route
        path='/products'
        element={
          <Products
          search={search}
          cart={cart}
          onAddToCart={handleAddtoCart}
          onAddToWishlist={handleAddToWishlist}
          wishlist={wishlist}
          onViewDetails={handleViewDetails}
          

          />
        }
        />

        <Route
        path='/cart'
        element={
          <ProtectedRoute user={user}>
          <Cart
          cart={cart}
          setCart={setCart}
          />
          </ProtectedRoute>
        }
        />

        <Route 
        path='/wishlist'
        element={
          <ProtectedRoute user={user}>
          <Wishlist
          wishlist={wishlist}
          setWishlist={setWishlist}
          onAddToCart={handleAddtoCart}
          onAddToWishlist={handleAddToWishlist}
          />
          </ProtectedRoute>
        }/>

        <Route
        path='/product/:id'
        element={
          <ProductDetails
          onAddToCart={handleAddtoCart}
          onAddToWishlist={handleAddToWishlist}
          wishlist={wishlist}
          />
        }
        />

        <Route
        path="/checkout"
        element={
          <ProtectedRoute user={user}>
          <Checkout
          cart={cart}
          setCart={setCart}
          orders={orders}
          setOrders={setOrders}
          />
          </ProtectedRoute>
        }
        />

        <Route
        path="/order-success"
        element={
          <OrderSuccess />
        }
        />

        <Route
        path="/orders"
        element={
          <ProtectedRoute user={user}>
          <Orders
          orders={orders}
          />
          </ProtectedRoute>
        }
        />
        <Route
        path="/signup"
        element={
          <SignUp />
        }
        />
        <Route
        path="/login"
        element={
          <Login setUser={setUser} />
        }
        />
        <Route
        path="/forgot-password"
        element={
  
          <ForgotPassword/>
          
        }
        
        />
       

      </Routes>


      
    </main>
     
      <Footer/>
    </div>
    </>
  )
}

export default App
