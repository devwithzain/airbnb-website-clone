import { auth } from "@/auth";
import { SafeUser } from "@/types";
import { prisma } from "@/app/libs/prismadb";

export default async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      password: true,
      createdAt: true,
      updatedAt: true,
      favoriteIds: true,
    },
  });

  if (!user) {
    return null;
  }

  const currentUser: SafeUser = {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    emailVerified: user.emailVerified ? user.emailVerified.toISOString() : null,
  };

  return currentUser;
}
