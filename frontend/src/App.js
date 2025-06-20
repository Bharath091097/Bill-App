import React, { useState, useRef, useEffect } from 'react';
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
        step={type === "number" ? "0.01" : undefined}
        min={type === "number" ? "0" : undefined}
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
    receiptNumber: `#${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    date: new Date().toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    address: "123 Business Street\nCity, State 12345\nPhone: +91 98765 43210"
  });

  const [items, setItems] = useState([
    { id: 1, description: "Product/Service 1", price: "100.00" },
    { id: 2, description: "Product/Service 2", price: "50.00" }
  ]);

  const [total, setTotal] = useState("150.00");

  // Calculate total whenever items change
  useEffect(() => {
    const newTotal = items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      return sum + price;
    }, 0);
    setTotal(newTotal.toFixed(2));
  }, [items]);

  const updateField = (field, value) => {
    setReceiptData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateItem = (id, field, value) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addItem = () => {
    const newId = Math.max(...items.map(item => item.id)) + 1;
    setItems(prev => [...prev, {
      id: newId,
      description: "New Product/Service",
      price: "0.00"
    }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const clearAllItems = () => {
    setItems([]);
  };

  const generateNewReceipt = () => {
    setReceiptData(prev => ({
      ...prev,
      receiptNumber: `#${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      date: new Date().toLocaleDateString('en-IN', { 
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
          <button
            onClick={addItem}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            + Add Item
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
              <div className="space-y-1">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 mr-2">Receipt:</span>
                  <EditableField
                    value={receiptData.receiptNumber}
                    onChange={(value) => updateField('receiptNumber', value)}
                    placeholder="#0000"
                    className="font-semibold text-gray-700"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Date:</span>
                  <EditableField
                    value={receiptData.date}
                    onChange={(value) => updateField('date', value)}
                    placeholder="Click to edit date"
                    className="text-gray-600"
                  />
                </div>
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
              <div className="flex justify-between items-center">
                <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2 flex-1">
                  Items & Services
                </div>
                <button
                  onClick={addItem}
                  className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1 px-3 rounded-full transition-colors duration-200 print:hidden ml-4"
                  title="Add new item"
                >
                  + Add Item
                </button>
              </div>
              
              {/* Item Headers */}
              <div className="flex justify-between text-xs font-semibold text-gray-600 uppercase tracking-wide pb-1">
                <div className="flex-1">Description</div>
                <div className="w-20 text-right">Amount</div>
                <div className="w-8"></div>
              </div>

              {/* Empty State when no items */}
              {items.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-3">No items added yet</p>
                  <button
                    onClick={addItem}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    + Add Your First Item
                  </button>
                </div>
              )}

              {/* Items List */}
              {items.map((item, index) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 group">
                  <div className="flex-1 pr-2">
                    <EditableField
                      value={item.description}
                      onChange={(value) => updateItem(item.id, 'description', value)}
                      placeholder="Item description"
                      className="font-medium text-gray-800 w-full"
                    />
                  </div>
                  <div className="w-20 text-right">
                    <div className="flex items-center justify-end">
                      <span className="text-gray-600 mr-1">₹</span>
                      <EditableField
                        value={item.price}
                        onChange={(value) => updateItem(item.id, 'price', value)}
                        placeholder="0.00"
                        className="font-medium text-gray-800 text-right min-w-[60px]"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="w-8 text-center">
                    <div className="flex flex-col space-y-1">
                      {items.length > 1 && (
                        <button
                          onClick={() => removeItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity duration-200 print:hidden text-lg leading-none"
                          title="Remove item"
                        >
                          ×
                        </button>
                      )}
                      <span className="text-xs text-gray-400 print:hidden">#{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="border-t-2 border-gray-200 pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-gray-800">Total Amount:</span>
                <div className="flex items-center">
                  <span className="text-gray-800 mr-1">₹</span>
                  <span className="text-gray-800">{total}</span>
                </div>
              </div>
              <div className="text-right text-sm text-gray-600 mt-1">
                (Auto-calculated from {items.length} item{items.length !== 1 ? 's' : ''})
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">धन्यवाद! Thank you for your business!</p>
              <p className="text-xs text-gray-500 mt-1">Please keep this receipt for your records</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg print:hidden">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">💡 Tips:</span>
          </p>
          <ul className="text-sm text-blue-700 mt-2 space-y-1">
            <li>• Click on any field to edit inline</li>
            <li>• Use "Add Item" to add more products/services</li>
            <li>• Total amount is calculated automatically</li>
            <li>• Hover over items to see remove option</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;