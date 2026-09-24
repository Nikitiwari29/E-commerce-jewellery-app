import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Navbar({ search, setSearch, cart, wishlist ,user, setUser }) {

  const navigate=useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <>
      <div className="bg-gray-800 text-white p-5 italic font-bold text-lg flex  justify-between items-center">
        Krisnaa Jewellers
        <div className="absolute top-0 left-0 -ml-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-12 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 pointer-events-none"></div>

        <div className="flex  items-center gap-4">
          <input type="text" placeholder="Search for products... " value={search} onChange={(e) => setSearch(e.target.value)} className='hidden md:block ring border-blue-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' />
          <button className='hidden md:block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Search</button>


          {/* Used when we were not using react router </button onclick={()=>setCurrentPage("cart")}> */}


          <Link to="/cart"
            className='relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' aria-label='Add to Cart'>🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>


          {/* Used when we were not using react router </button> */}
          {/* <button onClick={()=> setCurrentPage("wishlist")} */}


          <Link to="/wishlist"
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' aria-label='Add to Wishlist'>❤
            {/* </button>  */}
          </Link>
          <button onClick={() => setSidebarOpen(true)} className='rounded bg-gray-700 px-3 py-2 text-xl hover:bg-blue-800 cursor-pointer' aria-label='Open Menu'> ☰</button>
        </div>
      </div>
      <div className="bg-gray-800 relative z-10  md:hidden ">
        <input
          type="text"
          placeholder="Search for products..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md ring border border-gray-300 bg-white px-4 py-2 mt-2 mb-2 text-black outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-72 transform bg-gray-500  shadow-2xl transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-semibold text-pink-800">
            Menu
          </h2>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-2xl text-pink-800 hover:text-white focus:outline-none"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col px-6 py-6">

          <Link
            to="/"
            onClick={()=>setSidebarOpen(false)}
            className="border-b py-4 text-black transition hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/products"
            onClick={()=>setSidebarOpen(false)}
            className="border-b py-4 text-black  transition hover:text-white"
          >
            Shop
          </Link>

          <Link
            to="/products"
            onClick={()=>setSidebarOpen(false)}
            className="border-b py-4 text-black transition hover:text-white"
          >
            Collections
          </Link>

          <a
            href="#"
            className="border-b py-4 text-black transition hover:text-white"
          >
            About
          </a>

          <a
            href="#"
            className="border-b py-4 text-black transition hover:text-white"
          >
            Contact
          </a>

          <Link
          to="/orders"
          onClick={()=> setSidebarOpen(false)}
          className='border-b py-4 text-black transition hover:text-white'
          > 
          My Orders
          </Link>
          

         { user ? (
          <>
          <p className="border-b py-4 text-black transition hover:text-white">
            Welcome, {user.name}!
          
        </p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setUser(null);
              setSidebarOpen(false);
              navigate("/login")
            }}
            className="border-b py-4 text-black transition hover:text-white"
          >
            Logout
          </button>
          </>) : (
            <Link
            to="/signup"
            onClick={()=> setSidebarOpen(false)}
            className='border-b py-4 text-black transition hover:text-white'
            > 
            Signup/login
            </Link>
          )}

        </div>
      </aside>
    </>
  );
}

export default Navbar;

