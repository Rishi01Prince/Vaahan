import { useState, useEffect, useRef } from "react";
import { MapPin, User, Phone, Clock, Minus, Plus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateCartItem } from "../../redux/cartSlice";
import { toast } from "react-toastify";

export default function VehicleCard({
  imageUrl,
  address,
  name,
  ownerEmail,
  ownerPhone,
  halfDayPrice,
  fullDayPrice,
  vdata,
}) {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [span, setSpan] = useState("Half Day");
  const priceRef = useRef();

  const finalPrice =
    span === "Half Day" ? halfDayPrice * qty : fullDayPrice * qty;

  const handleAddToCart = () => {
    const vehicle = cart.find((item) => item.id === vdata._id);

    if (vehicle && vehicle.span === span) {
      dispatch(updateCartItem({ id: vdata._id, price: finalPrice, qty }));
      toast.success(`${vehicle.name} has been added to the cart!`);
      console.log("Current cart items:", cart);
    } else {
      dispatch(
        addToCart({
          id: vdata._id,
          name: vdata.name,
          price: finalPrice,
          qty,
          span,
          img: vdata.img,
        })
      );
    }
  };

  useEffect(() => {
    setSpan(priceRef.current.value);
  }, []);

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-56 w-full">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full rounded-t-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-white text-2xl font-bold">{name}</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-5 h-5 mr-2" />
          <p className="text-sm">{address}</p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-gray-600">
            <User className="w-5 h-5 mr-2" />
            <p className="text-sm">{ownerEmail}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="w-5 h-5 mr-2" />
            <p className="text-sm">{ownerPhone}</p>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex items-center border bg-black rounded-lg px-3 py-2">
            <button
              className="text-white hover:text-red-500"
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="mx-4 text-lg text-white font-semibold">{qty}</span>
            <button
              className="text-white hover:text-green-500"
              onClick={() => setQty((prev) => prev + 1)}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <select
            ref={priceRef}
            className="h-10 w-2/3 rounded-lg p-2 cursor-pointer"
            onChange={(e) => setSpan(e.target.value)}
          >
            <option value="Half Day">Half Day - ₹{halfDayPrice}</option>
            <option value="Full Day">Full Day - ₹{fullDayPrice}</option>
          </select>
        </div>

        <div className="flex justify-between items-center mb-1 border-t pt-4">
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            <span className="text-sm text-gray-600">Total Price:</span>
          </div>
          <span className="text-lg font-semibold text-blue-600">
            ₹{finalPrice}
          </span>
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}