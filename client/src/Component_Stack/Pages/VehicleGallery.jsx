import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, TextField, MenuItem, Select, Button, CircularProgress } from '@mui/material';
import { MapPin } from 'lucide-react';
import VehicleCard from '../Cards/VehicleCard';

const fetchVehicles = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/vehicles`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.vehicle;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};

export default function VehicleGallery() {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  useEffect(() => {
    fetchVehicles().then((data) => {
      setVehicles(data);
      setIsLoading(false);
    });
  }, []);

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsFetchingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data.address && data.address.postcode) {
            setLocation(data.address.postcode);
          } else {
            alert('Unable to fetch pin code.');
          }
        } catch (error) {
          console.error('Error fetching location:', error);
          alert('Failed to fetch location details.');
        }

        setIsFetchingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Could not fetch location. Please enable location services.');
        setIsFetchingLocation(false);
      }
    );
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      (selectedType === 'All' || vehicle.categoryName === selectedType) &&
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (location === '' || vehicle.pincode.includes(location))
  );

  return (
    <div className="min-h-screen bg-transparent dark:bg-gray-900 text-white dark:text-gray-100 p-8 mt-24">
      <h1 className="text-4xl font-bold mb-8">Vehicle Gallery</h1>

      <Card sx={{ mb: 8 }}>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium mb-1">
                Search Vehicles
              </label>
              <TextField
                id="search"
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </div>
            <div className="w-full md:w-48">
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                Vehicle Type
              </label>
              <Select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                fullWidth
                sx={{ bgcolor: 'background.paper' }}
              >
                <MenuItem value="All">All Types</MenuItem>
                <MenuItem value="Electric">Electric</MenuItem>
                <MenuItem value="Car">Car</MenuItem>
                <MenuItem value="Cycle">Cycle</MenuItem>
                <MenuItem value="Bike">Bike</MenuItem>
                <MenuItem value="Scooty">Scooty</MenuItem>
              </Select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="location" className="block text-sm font-medium mb-1">
                Location (Pin Code)
              </label>
              <TextField
                id="location"
                type="text"
                placeholder="Enter pin code..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                fullWidth
              />
            </div>
            <Button onClick={handleFetchLocation} variant="contained" color="primary" disabled={isFetchingLocation}>
              <MapPin className="w-4 h-4 mr-2" />
              {isFetchingLocation ? 'Fetching...' : 'Get Current Location'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress size={50} />
          <span className="ml-4 text-lg">Loading vehicles...</span>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Available Vehicles</h2>
            <div className="text-sm text-gray-500">{filteredVehicles.length} vehicles found</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
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
          {filteredVehicles.length === 0 && (
            <p className="text-center text-gray-400 mt-8">No vehicles found matching your criteria.</p>
          )}
        </>
      )}
    </div>
  );
}
