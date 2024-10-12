import { useState, useEffect, useRef } from 'react';
import { MapPin, User, Phone, Clock } from 'lucide-react';
import { useCart, useDispatchCart } from '../../components/ContextReducer';

export default function VehicleCard({
  imageUrl,
  address,
  name,
  ownerEmail,
  ownerPhone,
  halfDayPrice,
  fullDayPrice,
  vdata
}) {
  let data = useCart();
  let dispatch = useDispatchCart();

  const [qty, setQty] = useState(1); 
  const [span, setSpan] = useState("Half Day"); 
  const priceRef = useRef();

  const finalPrice =
    span === "Half Day" ? halfDayPrice * qty : fullDayPrice * qty;

  const handleAddToCart = async () => {
    let vehicle = data.find((item) => item.id === vdata._id);

    if (vehicle) {
      if (vehicle.span === span) {
        await dispatch({
          type: 'UPDATE',
          id: vdata._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else {
        await dispatch({
          type: 'ADD',
          id: vdata._id,
          name: vdata.name,
          price: finalPrice,
          qty: qty,
          span: span,
          img: vdata.img,
        });
        return;
      }
    }

    await dispatch({
      type: 'ADD',
      id: vdata._id,
      name: vdata.name,
      price: finalPrice,
      qty: qty,
      span: span,
      img: vdata.img,
    });
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
          <select
            className="h-10 w-1/3 bg rounded-lg p-2 cursor-pointer mr-2"
            onChange={(e) => setQty(Number(e.target.value))}
          >
            {Array.from(Array(6), (e, i) => (
              <option className="text-color-5" key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            ref={priceRef}
            className="h-10 w-2/3 bg-0 rounded-lg p-2 cursor-pointer"
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
          <span className="text-lg font-semibold text-blue-600">₹{finalPrice}</span>
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
