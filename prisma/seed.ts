import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getClient() {
  return [
    {
      id: 'fd105551-2d32-4a9f-bc41-c559c8a17256',
      name: 'John Smith',
      address: '123 Main Street'
    },
    {
      id: 'fd105551-2d42-4a9f-bc41-c559c8a17256',
      name: 'John Doe',
      address: '123 Main Street Main Street'
    },
    {
      id: 'fd105551-2d52-4a9f-bc41-c559c8a17256',
      name: 'Tom Smith',
      address: '123 Main Street'
    },
    {
      id: 'fd105551-2r32-4a9f-bc41-c559c8a17256',
      name: 'Ann  Smith',
      address: '123 Main Street'
    }
  ]
}

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, we technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      clientId: 'fd105551-2d32-4a9f-bc41-c559c8a17256',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105553-0f0d-4a9f-bc41-c559c8a17261',
      clientId: 'fd105551-2d32-4a9f-bc41-c559c8a17256',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      clientId: 'fd105551-2d32-4a9f-bc41-c559c8a17256',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
    },
    {
      id: 'fd105552-0f0d-4a9f-bc41-c559c8a17262',
      clientId: 'fd105551-2d32-4a9f-bc41-c559c8a17256',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
    },
    {
      id: 'fd105555-0f0d-4a9f-bc41-c559c8a17262',
      clientId: 'fd105551-2d32-4a9f-bc41-c559c8a17256',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
    },
  ];
}

async function seed() {
  await Promise.all(
    getClient().map((client) => {
      return db.client.create({ data: client });
    }),
  );

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getOrders().map((order) => {
      return db.order.create({
        data: {
          product: {
            connect: { id: order.productId },
          },
          client: {
            connect: { id: order.clientId },
          }
        },
      });
    }),
  );
}

seed();