require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns= require("dns");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes")
const orderRoutes = require("./routes/orderRoutes");



if(!process.env.JWT_SECRET){
  throw new Error("JWT_SECRET is missing from .env")
}

dns.setServers(["8.8.8.8","1.1.1.1"]);
const app = express();

 

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist",wishlistRoutes);
app.use("/api/orders",orderRoutes);

app.get("/", (req, res) => {
  res.send("Krisnaa Jewellers Backend is running!");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    if (error.reason?.servers) {
      for (const [server, description] of error.reason.servers) {
        console.error(server, description.error?.message || description.type);
      }
    }
  });