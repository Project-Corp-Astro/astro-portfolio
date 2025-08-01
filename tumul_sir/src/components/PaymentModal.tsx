import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  serviceName: string;
  onSuccess: (paymentData: any) => void;
  onFailure: (error: string) => void;
}

interface CardType {
  name: string;
  pattern: RegExp;
  icon: string;
  cvvLength: number;
}

const CARD_TYPES: CardType[] = [
  {
    name: 'Visa',
    pattern: /^4/,
    icon: '��',
    cvvLength: 3
  },
  {
    name: 'Mastercard',
    pattern: /^5[1-5]/,
    icon: '��',
    cvvLength: 3
  },
  {
    name: 'American Express',
    pattern: /^3[47]/,
    icon: '��',
    cvvLength: 4
  },
  {
    name: 'Discover',
    pattern: /^6/,
    icon: '��',
    cvvLength: 3
  }
];

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  serviceName,
  onSuccess,
  onFailure
}) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedCardType, setDetectedCardType] = useState<CardType | null>(null);
  const [fieldStatus, setFieldStatus] = useState<Record<string, 'valid' | 'invalid' | 'neutral'>>({
    cardNumber: 'neutral',
    expiryDate: 'neutral',
    cvv: 'neutral',
    cardholderName: 'neutral',
    email: 'neutral'
  });

  if (!isOpen) return null;

  // Luhn algorithm for card number validation
  const isValidCardNumber = (cardNumber: string): boolean => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cleanNumber)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  // Detect card type
  const detectCardType = (cardNumber: string): CardType | null => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    return CARD_TYPES.find(card => card.pattern.test(cleanNumber)) || null;
  };

  // Validate expiry date
  const isValidExpiryDate = (expiryDate: string): boolean => {
    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) return false;
    
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expYear = parseInt(year);
    const expMonth = parseInt(month);
    
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return true;
  };

  // Real-time validation
  const validateField = (name: string, value: string): { isValid: boolean; error: string } => {
    switch (name) {
      case 'cardNumber':
        const cleanCardNumber = value.replace(/\s/g, '');
        if (!cleanCardNumber) {
          return { isValid: false, error: 'Card number is required' };
        }
        if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
          return { isValid: false, error: 'Card number must be 13-19 digits' };
        }
        if (!isValidCardNumber(cleanCardNumber)) {
          return { isValid: false, error: 'Invalid card number' };
        }
        return { isValid: true, error: '' };

      case 'expiryDate':
        if (!value) {
          return { isValid: false, error: 'Expiry date is required' };
        }
        if (!value.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
          return { isValid: false, error: 'Use MM/YY format' };
        }
        if (!isValidExpiryDate(value)) {
          return { isValid: false, error: 'Card has expired' };
        }
        return { isValid: true, error: '' };

      case 'cvv':
        if (!value) {
          return { isValid: false, error: 'CVV is required' };
        }
        const expectedLength = detectedCardType?.cvvLength || 3;
        if (value.length !== expectedLength) {
          return { isValid: false, error: `CVV must be ${expectedLength} digits` };
        }
        if (!/^\d+$/.test(value)) {
          return { isValid: false, error: 'CVV must contain only numbers' };
        }
        return { isValid: true, error: '' };

      case 'cardholderName':
        if (!value.trim()) {
          return { isValid: false, error: 'Cardholder name is required' };
        }
        if (value.trim().length < 2) {
          return { isValid: false, error: 'Name must be at least 2 characters' };
        }
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          return { isValid: false, error: 'Name can only contain letters and spaces' };
        }
        return { isValid: true, error: '' };

      case 'email':
        if (!value) {
          return { isValid: false, error: 'Email is required' };
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return { isValid: false, error: 'Please enter a valid email address' };
        }
        return { isValid: true, error: '' };

      default:
        return { isValid: true, error: '' };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setDetectedCardType(detectCardType(formattedValue));
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    }

    // Limit CVV length based on card type
    if (name === 'cvv') {
      const maxLength = detectedCardType?.cvvLength || 3;
      formattedValue = value.replace(/\D/g, '').slice(0, maxLength);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));

    // Real-time validation
    if (value.trim()) {
      const validation = validateField(name, formattedValue);
      setErrors(prev => ({ ...prev, [name]: validation.error }));
      setFieldStatus(prev => ({ 
        ...prev, 
        [name]: validation.isValid ? 'valid' : 'invalid' 
      }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
      setFieldStatus(prev => ({ ...prev, [name]: 'neutral' }));
    }
  };

  const getFieldClassName = (fieldName: string): string => {
    const baseClass = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2";
    const status = fieldStatus[fieldName];
    
    switch (status) {
      case 'valid':
        return `${baseClass} border-green-500 focus:ring-green-500 bg-green-50`;
      case 'invalid':
        return `${baseClass} border-red-500 focus:ring-red-500 bg-red-50`;
      default:
        return `${baseClass} border-gray-300 focus:ring-blue-500`;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(formData).forEach(fieldName => {
      const validation = validateField(fieldName, formData[fieldName as keyof typeof formData]);
      if (!validation.isValid) {
        newErrors[fieldName] = validation.error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Simulate 90% success rate
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        onSuccess({
          amount,
          transactionId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          paymentMethod: detectedCardType?.name || 'Credit Card',
          timestamp: new Date().toISOString()
        });
      } else {
        onFailure('Payment failed. Please try again with a different card.');
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-orange/30 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">�� Complete Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isProcessing}
          >
            ✕
          </button>
        </div>

        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Service: <span className="font-semibold">{serviceName}</span></p>
          <p className="text-lg font-bold text-blue-600">Amount: ₹{amount}</p>
          <p className="text-xs text-gray-500 mt-1">This is a simulated payment for testing purposes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                className={getFieldClassName('cardNumber')}
                disabled={isProcessing}
              />
              {detectedCardType && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  {detectedCardType.icon} {detectedCardType.name}
                </div>
              )}
            </div>
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength={5}
                className={getFieldClassName('expiryDate')}
                disabled={isProcessing}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV {detectedCardType && `(${detectedCardType.cvvLength} digits)`}
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder={detectedCardType?.cvvLength === 4 ? "1234" : "123"}
                maxLength={detectedCardType?.cvvLength || 3}
                className={getFieldClassName('cvv')}
                disabled={isProcessing}
              />
              {errors.cvv && (
                <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className={getFieldClassName('cardholderName')}
              disabled={isProcessing}
            />
            {errors.cardholderName && (
              <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (for receipt)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              className={getFieldClassName('email')}
              disabled={isProcessing}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-3 px-4 rounded-md font-semibold text-white transition-colors ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Payment...
                </div>
              ) : (
                `Pay ₹${amount}`
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Test Mode:</strong> Use any valid card details. This is a simulation and no real payment will be processed.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PaymentModal;