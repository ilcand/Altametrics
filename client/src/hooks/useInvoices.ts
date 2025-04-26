import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

interface Invoice {
  id: string;
  vendor_name: string;
  amount: number;
  due_date: string;
  description: string;
  paid: boolean;
  user_id: string;
}

interface PaginatedResponse {
  data: Invoice[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const useInvoices = (page = 1, limit = 10) => {
  return useQuery<PaginatedResponse>({
    queryKey: ['invoices', page, limit],
    queryFn: async () => {
      const response = await api.get(`/invoices?page=${page}&limit=${limit}`);
      return response.data;
    },
  });
};

export const useInvoiceDetails = (id: string) => {
  return useQuery({
    queryKey: ['invoice', id],
    queryFn: async () => {
      const response = await api.get(`/invoices/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};