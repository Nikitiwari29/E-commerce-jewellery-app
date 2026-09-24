import React from "react";
import {CheckCircle} from "lucide-react";
import {Link} from "react-router-dom";

const OrderSuccess = () => {
    return(
        <section className="bg-gray-50 min-h-screen flex items-center justify-center py-10">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-center mb-4">
                    <CheckCircle className="text-green-500" size={64} />
                </div>
                <h1 className="text-2xl font-bold text-center mb-2">Order Successful!</h1>
                <p className="text-gray-600 text-center mb-6">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>
                <div className="flex justify-center">
                    <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </section>
    )
}
export default OrderSuccess;