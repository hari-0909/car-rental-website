export interface Car {
  id: string;
  model: string;
  brand: string;
  year: number;
  hourlyRate: number;
  image: string;
  available: boolean;
  category: string;
  features: string[];
}

export interface Rental {
  id: string;
  carId: string;
  userId: string;
  startTime: string;
  endTime: string;
  totalCost: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  paymentId?: string;
}

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}