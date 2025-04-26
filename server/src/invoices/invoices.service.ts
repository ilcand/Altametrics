import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, pagination?: { page: number; limit: number }) {
    const { page = 1, limit = 10 } = pagination || {};
    const skip = (page - 1) * limit;

    const [invoices, total] = await Promise.all([
      this.prisma.invoice.findMany({
        where: { user_id: userId },
        orderBy: { due_date: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.invoice.count({
        where: { user_id: userId },
      }),
    ]);

    return {
      data: invoices,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userId: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id, user_id: userId },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }
}