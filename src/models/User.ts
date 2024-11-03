// src/models/User.ts

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Se você estiver usando Prisma, você pode importar o tipo gerado automaticamente pelo Prisma
// import { User as PrismaUser } from '@prisma/client';
// export type User = PrismaUser; // Para usar o tipo gerado pelo Prisma
