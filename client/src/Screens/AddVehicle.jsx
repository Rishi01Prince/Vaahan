import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddVehicle() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const vehicleData = Object.fromEntries(formData.entries());

    console.log(vehicleData);

    vehicleData.halfDayPrice = Number(vehicleData.halfDayPrice);
    vehicleData.fullDayPrice = Number(vehicleData.fullDayPrice);
    vehicleData.year = Number(vehicleData.year);
    vehicleData.availability = vehicleData.availability === 'on';
    vehicleData.options = ['Half Day', 'Full Day'];

    try {
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
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-15">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Add New Vehicle</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-300">Category Name</label>
              <input type="text" id="categoryName" name="categoryName" required className="mt-1 h-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Vehicle Name</label>
              <input type="text" id="name" name="name" required className="mt-1 h-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-300">Image URL</label>
              <input type="url" id="image" name="image" required className="mt-1 h-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-300">Location</label>
              <input type="text" id="location" name="location" required className="mt-1 h-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-300">Pincode</label>
              <input type="text" id="pincode" name="pincode" required className="mt-1 h-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="availability" className="flex items-center">
                <input type="checkbox" id="availability" name="availability" className="rounded h-10 bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-300">Available</span>
              </label>
            </div>
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-300">Owner Name</label>
              <input type="text" id="ownerName" name="ownerName" required className="mt-1 h-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="ownerPhone" className="block text-sm font-medium text-gray-300">Owner Phone</label>
              <input type="tel" id="ownerPhone" name="ownerPhone" required className="mt-1 h-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="owneremail" className="block text-sm font-medium text-gray-300">Owner Email</label>
              <input type="email" id="owneremail" name="owneremail" required className="mt-1 h-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="halfDayPrice" className="block text-sm font-medium text-gray-300">Half Day Price</label>
              <input type="number" id="halfDayPrice" name="halfDayPrice" required className="mt-1 h-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="fullDayPrice" className="block text-sm font-medium text-gray-300">Full Day Price</label>
              <input type="number" id="fullDayPrice" name="fullDayPrice" required className="mt-1 h-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-300">Year</label>
              <input type="number" id="year" name="year" required className="mt-1 h-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-300">Type</label>
              <input type="text" id="type" name="type" required className="mt-1 h-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" />
            </div>
          </div>
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
