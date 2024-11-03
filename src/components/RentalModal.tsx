import React, { useState } from 'react';
import { Car } from '../types';
import { X, Clock, CreditCard } from 'lucide-react';
import PaymentForm from './PaymentForm';
import toast from 'react-hot-toast';

interface RentalModalProps {
  car: Car;
  onClose: () => void;
  onConfirm: (hours: number) => void;
}

export default function RentalModal({ car, onClose, onConfirm }: RentalModalProps) {
  const [hours, setHours] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const totalCost = hours * car.hourlyRate;

  const handlePaymentSuccess = () => {
    toast.success(`Successfully rented ${car.brand} ${car.model} for ${hours} hours`);
    onConfirm(hours);
  };

  if (showPayment) {
    return (
      <PaymentForm
        amount={totalCost}
        onSuccess={handlePaymentSuccess}
        onCancel={() => setShowPayment(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Rental Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-gray-900">
              {car.brand} {car.model}
            </h4>
            <p className="text-gray-600">{car.year} • {car.category}</p>
          </div>

          <div className="flex items-center space-x-4">
            <Clock className="h-5 w-5 text-blue-600" />
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max="24"
                value={hours}
                onChange={(e) => setHours(Math.max(1, Math.min(24, parseInt(e.target.value) || 1)))}
                className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-600">hours</span>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between items-center text-gray-600">
              <span>Rate per hour</span>
              <span className="font-medium">${car.hourlyRate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total Cost</span>
              <span className="text-2xl font-bold text-blue-600">
                ${totalCost}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowPayment(true)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center font-semibold"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}