import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import VehicleCard from '../Cards/VehicleCard';
import { MapPin } from 'lucide-react';

const fetchUserVehicles = async (currentUserEmail) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/vehicles`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.vehicle.filter((vehicle) => vehicle.owneremail === currentUserEmail); 
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};

export default function YourVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUserEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (currentUserEmail) {
      fetchUserVehicles(currentUserEmail).then((data) => {
        setVehicles(data);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [currentUserEmail]);

  return (
    <div className="min-h-screen bg-transparent dark:bg-gray-900 text-white dark:text-gray-100 p-8 mt-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Your Vehicles</h1>
        <Button variant="contained" color="primary">
          <MapPin className="w-4 h-4 mr-2" />
          <Link to='/addvehicle'>Add Vehicle</Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400">Loading your vehicles...</div>
      ) : vehicles.length === 0 ? (
        <p className="text-center text-gray-400 mt-8">You have no vehicles listed.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle._id}
              imageUrl={vehicle.image}
              name={vehicle.name}
              address={`Location: ${vehicle.location}`}
              ownerEmail={vehicle.owneremail}
              ownerPhone={vehicle.ownerPhone}
              halfDayPrice={vehicle.halfDayPrice}
              fullDayPrice={vehicle.fullDayPrice}
            />
          ))}
        </div>
      )}
    </div>
  );
}
