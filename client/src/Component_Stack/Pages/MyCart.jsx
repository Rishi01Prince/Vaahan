import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  updateCartItem,
} from "../../redux/cartSlice";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function MyCart() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Remove item from cart
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from the cart!", {
        autoClose: 1500, 
      });
  };

  // Update item quantity
  const handleUpdate = (id, qty, price) => {
    dispatch(updateCartItem({ id, qty, price }));
    toast.success("Cart updated!", {
        autoClose: 1500, 
      });
  };

  // Empty the cart
  const handleEmptyCart = () => {
    dispatch(clearCart());
    toast.success("Cart emptied!", {
        autoClose: 1500, 
      });
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);
    const newOrders = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: item.qty,
      img: item.img,
      span: item.span,
    }));

    try {
      const response = await axios.post("http://localhost:5000/orders", {
        new_orders: newOrders,
        email: "user@example.com", 
      });

      if (response.data.success) {
        toast.success("Order placed successfully!", {
            autoClose: 1500, 
          });
        // Optionally clear the cart after successful order
        dispatch(clearCart());
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col">
      <div className="flex items-center justify-center mt-12 text-3xl">
        <h1>Your Cart</h1>
      </div>

      {/* Cart Items */}
      <div className="w-full flex flex-col items-center space-y-4 py-6 px-4">
        {cart.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Your cart is empty.
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="w-full max-w-6xl p-6 mt-4 border rounded-lg shadow-lg flex justify-between items-center bg-gray-50"
            >
              {/* Item Details */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.span}</p>
                <p className="text-lg font-bold text-blue-600">₹{item.price}</p>
                <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
                <p className="text-sm text-gray-500">
                  Total: ₹{item.qty * item.price}
                </p>
              </div>

              {/* Remove Button (Trash icon) */}
              <button
                onClick={() => handleRemove(item.id)}
                className="p-2 text-red-600 hover:text-red-800 transition"
              >
                <Trash className="w-6 h-6" />
              </button>

              {/* Update Quantity */}
              <div className="flex items-center">
                <button
                  onClick={() => {
                    const updatedQty = item.qty - 1;
                    if (updatedQty > 0) {
                      handleUpdate(item.id, updatedQty, item.price);
                    }
                  }}
                  className="p-2 text-blue-600 hover:text-blue-800 transition"
                >
                  -
                </button>
                <span className="mx-2">{item.qty}</span>
                <button
                  onClick={() => {
                    const updatedQty = item.qty + 1;
                    handleUpdate(item.id, updatedQty, item.price);
                  }}
                  className="p-2 text-blue-600 hover:text-blue-800 transition"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="w-full bg-gray-100 p-6 flex flex-col sm:flex-row justify-between items-center mt-auto">
          <span className="text-2xl font-bold">Total: ₹{totalPrice}</span>
          <div className="mt-4 sm:mt-0 flex gap-4">
            {/* Empty Cart Button */}
            <button
              onClick={handleEmptyCart}
              className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Empty Cart
            </button>
            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}