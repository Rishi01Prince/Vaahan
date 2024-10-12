import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

export default function AddVehicle() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [location, setLocation] = useState('');
  const [pincode, setPincode] = useState('');
  const [imageFile, setImageFile] = useState(null); // State to hold the image file

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      setImageFile(file); // Store the file in state
      reader.readAsDataURL(file);
    }
  };

  const fetchLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const data = await response.json();

        if (data) {
          setLocation(data.display_name);
          setPincode(data.address.postcode || '');
        }
      });
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const vehicleData = Object.fromEntries(formData.entries());

    vehicleData.halfDayPrice = Number(vehicleData.halfDayPrice);
    vehicleData.fullDayPrice = Number(vehicleData.fullDayPrice);
    vehicleData.availability = vehicleData.availability === 'on';
    vehicleData.options = ['Half Day', 'Full Day'];

    try {
      // Upload image to Cloudinary
      let imageUrl = '';
      if (imageFile) {
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
        const formDataImage = new FormData();
        formDataImage.append('file', imageFile);
        formDataImage.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // Your upload preset

        const uploadResponse = await axios.post(cloudinaryUrl, formDataImage);
        imageUrl = uploadResponse.data.secure_url; // Get the image URL from Cloudinary response
      }
      console.log(imageUrl);

      vehicleData.image = imageUrl;


      // Send vehicle data to backend
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/vehicles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      });

      if (!response.ok) {
        throw new Error('Failed to add vehicle');
      }

      navigate('/yourvehicles');
    } catch (err) {
      setError('Failed to add vehicle. Please try again.');
      console.error('Error adding vehicle:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-n-8/90 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-15">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Add New Vehicle</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-300">Owner Name</label>
              <input type="text" id="ownerName" name="ownerName" required className="mt-1 h-10 block w-full rounded-md pl-1 bg-white text-black border-gray-600 focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="owneremail" className="block text-sm font-medium text-gray-300">Owner Email</label>
              <input type="email" id="owneremail" name="owneremail" required className="mt-1 h-10 block w-full rounded-md pl-1 bg-white text-black border-gray-600 focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="ownerPhone" className="block text-sm font-medium text-gray-300">Owner Phone</label>
              <input type="tel" id="ownerPhone" name="ownerPhone" required className="mt-1 h-10 block w-full rounded-md pl-1 bg-white text-black border-gray-600 focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-300">Quantity</label>
              <input type="number" id="quantity" name="quantity" required min="1" className="mt-1 h-10 block w-full rounded-md pl-1 bg-white text-black border-gray-600 focus:border-blue-500 focus:ring-blue-500" />
            </div>
          </div>

          {/* Vehicle Name and Category in the same line */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Vehicle Name</label>
              <input type="text" id="name" name="name" required className="mt-1 h-10 block w-full rounded-md pl-1 bg-white text-black border-gray-600 focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-300">Category Name</label>
              <select id="categoryName" name="categoryName" required className="mt-1 h-10 block w-full rounded-md pl-1 bg-white text-black border-gray-600 focus:border-blue-500 focus:ring-blue-500">
                <option value="Cycle">Cycle</option>
                <option value="Car">Car</option>
                <option value="Scooty">Scooty</option>
                <option value="Bike">Bike</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
          </div>

          {/* Address and Pincode in the same line */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="location" className="block flex justify-between text-sm font-medium text-gray-300">
                <p>Location</p>
                <button type="button" onClick={fetchLocation} className="ml-2 text-gray-400 hover:text-white">
                  <FaMapMarkerAlt className="inline-block h-5 w-5" />
                </button>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="mt-1 h-10 block w-full rounded-md pl-1 bg-white text-black border-gray-600 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-300">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
                className="mt-1 h-10 block w-full rounded-md pl-1 bg-white text-black border-gray-600 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Upload Vehicle Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300">Upload Vehicle Image</label>
            <input type="file" id="image" name="image" onChange={handleImageUpload} className="mt-1 block w-full text-sm text-white bg-grey-800 rounded-md border-gray-600 focus:border-blue-500 focus:ring-blue-500 file:bg-white file:rounded-md file:border-0 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-black hover:file:bg-sky-300 hover:file:text-white" />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <img src={imagePreview} alt="Vehicle Preview" className="h-54 w-full object-cover rounded-md border-2 border-gray-600" />
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Adding...' : 'Add Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
