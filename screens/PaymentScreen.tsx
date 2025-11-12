import React from 'react';
import { Header } from '../components/Header';

interface PaymentScreenProps {
  onBack: () => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full">
      <Header title="Subscription" onBack={onBack} />
      <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-800">Unlock Premium Features</h2>
        <p className="text-gray-600 mt-2">Choose a plan to get the most out of SmartLearn.</p>
        <button className="mt-8 px-8 py-3 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700">
          Subscribe Now
        </button>
      </div>
    </div>
  );
};
