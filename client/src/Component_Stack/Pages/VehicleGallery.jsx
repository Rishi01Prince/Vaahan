import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  TextField,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { MapPin } from "lucide-react";
import VehicleCard from "../Cards/VehicleCard";
import { vehicle } from "../../assets/Fallback_Data/vechicle";
import { useDispatch, useSelector } from "react-redux";
import {
  setVehicles,
  setSearchTerm,
  setSelectedType,
  setLocation,
  setIsLoading,
} from "../../redux/vehicleSlice";

const fetchVehicles = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/vehicles`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.vehicle;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
};

export default function VehicleGallery() {
  const dispatch = useDispatch();
  const { vehicles, searchTerm, selectedType, location, isLoading } =
    useSelector((state) => state.vehicle);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setIsLoading(true));
      const data = await fetchVehicles();
      dispatch(setVehicles(data));
    };
    fetchData();
  }, [dispatch]);

  const handleFetchLocation = () => {
    alert("Fetching live location...");
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      (selectedType === "All" || vehicle.categoryName === selectedType) &&
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (location === "" || vehicle.pincode.includes(location))
  );

  return (
    <div className="min-h-screen bg-transparent dark:bg-gray-900 text-white dark:text-gray-100 p-8 mt-24">
      <h1 className="text-4xl font-bold mb-8">Vehicle Gallery</h1>

      <Card sx={{ mb: 8 }}>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block text-sm font-medium mb-1"
              >
                Search Vehicles
              </label>
              <TextField
                id="search"
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
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
                onChange={(e) => dispatch(setSelectedType(e.target.value))}
                fullWidth
                sx={{ bgcolor: "background.paper" }}
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
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-1"
              >
                Location (Pin Code)
              </label>
              <TextField
                id="location"
                type="text"
                placeholder="Enter pin code..."
                value={location}
                onChange={(e) => dispatch(setLocation(e.target.value))}
                fullWidth
              />
            </div>
            <Button
              onClick={handleFetchLocation}
              variant="contained"
              color="primary"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Get Current Location
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center">Loading vehicles...</div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Available Vehicles</h2>
            <div className="text-sm text-gray-500">
              {filteredVehicles.length} vehicles found
            </div>
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
                vdata={vehicle}
              />
            ))}
          </div>
          {filteredVehicles.length === 0 && (
            <p className="text-center text-gray-400 mt-8">
              No vehicles found matching your criteria.
            </p>
          )}
        </>
      )}
    </div>
  );
}

VehicleGallery.propTypes = {
  vehicle: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    pincode: PropTypes.string.isRequired,
    ownerEmail: PropTypes.string,
    ownerPhone: PropTypes.string,
    halfDayPrice: PropTypes.number,
    fullDayPrice: PropTypes.number,
    year: PropTypes.number,
    type: PropTypes.string,
  }),
};
  