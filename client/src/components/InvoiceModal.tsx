import React from 'react';
import { useInvoiceDetails } from '../hooks/useInvoices';

interface InvoiceModalProps {
  invoiceId: string;
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoiceId, onClose }) => {
  const { data: invoice, isLoading, error } = useInvoiceDetails(invoiceId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Invoice Details</h2>
          <button
            onClick={onClose}
            className="rounded p-1 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        {isLoading ? (
          <div className="py-4 text-center">Loading invoice details...</div>
        ) : error ? (
          <div className="py-4 text-center text-red-600">Error loading invoice details</div>
        ) : invoice ? (
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Vendor:</label>
              <p className="text-gray-900">{invoice.vendor_name}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Amount:</label>
              <p className="text-gray-900">${invoice.amount.toFixed(2)}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Due Date:</label>
              <p className="text-gray-900">{new Date(invoice.due_date).toLocaleDateString()}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Description:</label>
              <p className="text-gray-900">{invoice.description}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Status:</label>
              <p className={invoice.paid ? 'text-green-600' : 'text-red-600'}>
                {invoice.paid ? 'Paid' : 'Unpaid'}
              </p>
            </div>
          </div>
        ) : null}
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;