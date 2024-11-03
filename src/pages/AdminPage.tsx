import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, DollarSign, Car as CarIcon } from 'lucide-react';
import { Car, Rental } from '../types';
import { useAuth } from '../context/AuthContext';

export default function AdminPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
      return;
    }

    // Load cars and rentals from localStorage
    const storedCars = JSON.parse(localStorage.getItem('cars') || '[]');
    const storedRentals = JSON.parse(localStorage.getItem('rentals') || '[]');
    setCars(storedCars);
    setRentals(storedRentals);
  }, [user, navigate]);

  const handleAddCar = (car: Car) => {
    const newCars = [...cars, car];
    setCars(newCars);
    localStorage.setItem('cars', JSON.stringify(newCars));
  };

  const handleRemoveCar = (carId: string) => {
    const newCars = cars.filter((car) => car.id !== carId);
    setCars(newCars);
    localStorage.setItem('cars', JSON.stringify(newCars));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Cars</p>
                <p className="text-2xl font-bold">{cars.length}</p>
              </div>
              <CarIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Active Rentals</p>
                <p className="text-2xl font-bold">
                  {rentals.filter((r) => r.status === 'paid').length}
                </p>
              </div>
              <CarIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ${rentals.reduce((sum, rental) => sum + rental.totalCost, 0)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">Manage Cars</h3>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <button
              onClick={() => {
                // Add new car logic
                const newCar: Car = {
                  id: Date.now().toString(),
                  brand: 'New Brand',
                  model: 'New Model',
                  year: 2024,
                  hourlyRate: 50,
                  image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80',
                  available: true,
                };
                handleAddCar(newCar);
              }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Car
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cars.map((car) => (
                  <tr key={car.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={car.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {car.brand} {car.model}
                          </div>
                          <div className="text-sm text-gray-500">{car.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      ${car.hourlyRate}/hour
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          car.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {car.available ? 'Available' : 'Rented'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleRemoveCar(car.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}