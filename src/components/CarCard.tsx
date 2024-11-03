import React from 'react';
import { Car } from '../types';
import { Calendar, DollarSign, Check } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onRent: (car: Car) => void;
}

export default function CarCard({ car, onRent }: CarCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {car.category}
        </div>
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900">
          {car.brand} {car.model}
        </h3>
        <p className="text-gray-600 mt-1">{car.year}</p>
        
        <div className="mt-4 space-y-2">
          {car.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <Check className="h-4 w-4 text-blue-600 mr-2" />
              {feature}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center text-blue-600">
            <DollarSign className="h-6 w-6" />
            <span className="ml-1 text-xl font-bold">{car.hourlyRate}/hour</span>
          </div>
          <button
            onClick={() => onRent(car)}
            disabled={!car.available}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              car.available
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Calendar className="h-5 w-5 mr-2" />
            {car.available ? 'Rent Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
}