import { prisma } from "@/app/libs/prismadb";

export const getUserByEmail = async (email: string | any) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string | any) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};
