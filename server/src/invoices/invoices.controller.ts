import { Controller, Get, Param, UseGuards, Request, Query } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get()
  findAll(@Request() req, @Query('page') page: string, @Query('limit') limit: string) {
    const pagination = {
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    };
    return this.invoicesService.findAll(req.user.id, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    console.log('Authenticated User ID:', req.user.id); // Log user ID from JWT
    return this.invoicesService.findOne(id, req.user.id);
  }
}