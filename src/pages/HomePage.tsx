import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '../types';
import { initialCars } from '../data/cars';
import CarCard from '../components/CarCard';
import RentalModal from '../components/RentalModal';
import { useAuth } from '../context/AuthContext';
import { Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [cars] = useState<Car[]>(initialCars);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const categories = Array.from(new Set(cars.map(car => car.category)));

  const filteredCars = cars.filter(car => {
    const matchesSearch = (car.brand + ' ' + car.model)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || car.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRent = (car: Car) => {
    if (!isAuthenticated) {
      toast.error('Please login to rent a car');
      navigate('/login');
      return;
    }
    setSelectedCar(car);
  };

  const handleRentalConfirm = (hours: number) => {
    if (selectedCar) {
      // In a real app, this would create a rental record
      const rental = {
        id: Math.random().toString(36).substr(2, 9),
        carId: selectedCar.id,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + hours * 3600000).toISOString(),
        totalCost: selectedCar.hourlyRate * hours,
        status: 'paid',
      };

      // Store rental in localStorage
      const rentals = JSON.parse(localStorage.getItem('rentals') || '[]');
      rentals.push(rental);
      localStorage.setItem('rentals', JSON.stringify(rentals));

      // Update car availability
      const updatedCars = cars.map(car => 
        car.id === selectedCar.id ? { ...car, available: false } : car
      );
      localStorage.setItem('cars', JSON.stringify(updatedCars));

      setSelectedCar(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">
            Experience Luxury on Your Terms
          </h1>
          <p className="text-xl text-blue-100">
            Choose from our premium fleet of high-end vehicles
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by brand or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} onRent={handleRent} />
          ))}
        </div>

        {selectedCar && (
          <RentalModal
            car={selectedCar}
            onClose={() => setSelectedCar(null)}
            onConfirm={handleRentalConfirm}
          />
        )}
      </div>
    </div>
  );
}