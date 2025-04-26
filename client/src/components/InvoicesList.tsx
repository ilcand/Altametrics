import React, { useState } from 'react';
import { useInvoices } from '../hooks/useInvoices';
import InvoiceModal from './InvoiceModal';

const InvoicesList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const { data, isLoading, error } = useInvoices(currentPage);

  const handleRowClick = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
  };

  const closeModal = () => {
    setSelectedInvoiceId(null);
  };

  if (isLoading) {
    return <div className="flex justify-center p-10">Loading invoices...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-600">Error loading invoices</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold text-black">Invoices</h1>
      
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                Vendor
              </th>
              <th className="border-b px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                Amount
              </th>
              <th className="border-b px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                Due Date
              </th>
              <th className="border-b px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                Description
              </th>
              <th className="border-b px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.data.map((invoice) => (
              <tr 
                key={invoice.id} 
                onClick={() => handleRowClick(invoice.id)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm text-gray-800">{invoice.vendor_name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  ${invoice.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {new Date(invoice.due_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  { invoice.description }
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold
                    ${invoice.paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {invoice.paid ? 'Paid' : 'Unpaid'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data?.meta && data.meta.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <div className="flex items-center px-3 text-sm">
              Page {currentPage} of {data.meta.totalPages}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data.meta.totalPages))}
              disabled={currentPage === data.meta.totalPages}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
      
      {selectedInvoiceId && (
        <InvoiceModal invoiceId={selectedInvoiceId} onClose={closeModal} />
      )}
    </div>
  );
};

export default InvoicesList;