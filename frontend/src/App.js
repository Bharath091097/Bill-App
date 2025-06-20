import React, { useState, useRef } from 'react';
import './App.css';

const EditableField = ({ value, onChange, placeholder, className = "", type = "text", isMultiline = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef(null);

  const handleClick = () => {
    setIsEditing(true);
    setEditValue(value);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        if (type === "text") {
          inputRef.current.select();
        }
      }
    }, 0);
  };

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isMultiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  if (isEditing) {
    if (isMultiline) {
      return (
        <textarea
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${className} bg-transparent border-2 border-blue-300 rounded px-2 py-1 outline-none resize-none`}
          rows="3"
        />
      );
    }
    
    return (
      <input
        ref={inputRef}
        type={type}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} bg-transparent border-2 border-blue-300 rounded px-2 py-1 outline-none`}
      />
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`${className} cursor-pointer hover:bg-gray-50 hover:bg-opacity-50 transition-colors duration-200 rounded px-2 py-1 min-h-[2rem] flex items-center`}
      title="Click to edit"
    >
      {value || <span className="text-gray-400 italic">{placeholder}</span>}
    </div>
  );
};

function App() {
  const [receiptData, setReceiptData] = useState({
    companyName: "Your Company Name",
    customerName: "Customer Name",
    price: "100.00",
    total: "100.00",
    receiptNumber: `#${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    address: "123 Business Street\nCity, State 12345\nPhone: (555) 123-4567"
  });

  const updateField = (field, value) => {
    setReceiptData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateNewReceipt = () => {
    setReceiptData(prev => ({
      ...prev,
      receiptNumber: `#${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }));
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Action Buttons */}
        <div className="flex gap-3 mb-6 print:hidden">
          <button
            onClick={generateNewReceipt}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            New Receipt
          </button>
          <button
            onClick={printReceipt}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Print Receipt
          </button>
        </div>

        {/* Receipt */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
          <div className="p-6 space-y-6">
            {/* Header - Company Name */}
            <div className="text-center border-b-2 border-gray-200 pb-4">
              <EditableField
                value={receiptData.companyName}
                onChange={(value) => updateField('companyName', value)}
                placeholder="Click to add company name"
                className="text-2xl font-bold text-gray-800 text-center w-full"
              />
              <EditableField
                value={receiptData.address}
                onChange={(value) => updateField('address', value)}
                placeholder="Click to add address"
                className="text-sm text-gray-600 mt-2 text-center whitespace-pre-line"
                isMultiline={true}
              />
            </div>

            {/* Receipt Info */}
            <div className="flex justify-between items-center text-sm">
              <div>
                <div className="font-semibold text-gray-700">Receipt: {receiptData.receiptNumber}</div>
                <div className="text-gray-600">Date: {receiptData.date}</div>
              </div>
            </div>

            {/* Customer Section */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Bill To:
              </div>
              <EditableField
                value={receiptData.customerName}
                onChange={(value) => updateField('customerName', value)}
                placeholder="Click to add customer name"
                className="text-lg font-medium text-gray-800"
              />
            </div>

            {/* Items Section */}
            <div className="space-y-3">
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
                Items & Services
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <div className="flex-1">
                  <EditableField
                    value="Service/Product"
                    onChange={() => {}} // Keep static for now
                    placeholder="Item description"
                    className="font-medium text-gray-800"
                  />
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-1">$</span>
                    <EditableField
                      value={receiptData.price}
                      onChange={(value) => {
                        updateField('price', value);
                        updateField('total', value); // Auto-update total for now
                      }}
                      placeholder="0.00"
                      className="font-medium text-gray-800 text-right min-w-[60px]"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Total Section */}
            <div className="border-t-2 border-gray-200 pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-gray-800">Total:</span>
                <div className="flex items-center">
                  <span className="text-gray-800 mr-1">$</span>
                  <EditableField
                    value={receiptData.total}
                    onChange={(value) => updateField('total', value)}
                    placeholder="0.00"
                    className="text-gray-800 text-right min-w-[80px] font-bold"
                    type="number"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">Thank you for your business!</p>
              <p className="text-xs text-gray-500 mt-1">Please keep this receipt for your records</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg print:hidden">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">💡 Tip:</span> Click on any field to edit it inline. Press Enter to save or Escape to cancel.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;