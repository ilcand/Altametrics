import { PrismaClient } from '@prisma/client';
// import * as bcrypt from 'bcrypt';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  });

  // Create sample invoices
  const invoiceData = [
    {
      vendor_name: 'Tech Solutions Inc.',
      amount: 1500.0,
      due_date: new Date('2023-12-15'),
      description: 'IT Services for Q4',
      paid: false,
      user_id: user.id,
    },
    {
      vendor_name: 'Office Supplies Co.',
      amount: 350.75,
      due_date: new Date('2023-11-30'),
      description: 'Monthly office supplies',
      paid: true,
      user_id: user.id,
    },
    {
      vendor_name: 'Marketing Experts',
      amount: 2800.0,
      due_date: new Date('2024-01-10'),
      description: 'Social media campaign',
      paid: false,
      user_id: user.id,
    },
    {
      vendor_name: 'Cloud Hosting Services',
      amount: 899.99,
      due_date: new Date('2023-12-05'),
      description: 'Annual cloud hosting',
      paid: false,
      user_id: user.id,
    },
    {
      vendor_name: 'Design Agency',
      amount: 3500.0,
      due_date: new Date('2023-12-20'),
      description: 'Website redesign project',
      paid: true,
      user_id: user.id,
    },
  ];

  for (const invoice of invoiceData) {
    await prisma.invoice.create({
      data: invoice,
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });