import type { User, Shop } from "@prisma/client";

import { prisma } from "~/db.server";

export function getShopsForUser({ userId }: { userId: User["id"] }) {
  return prisma.shop.findMany({
    select: { id: true, name: true },
    // where: { userId },
  });
}

export function getShopListItems({ userId }: { userId: User["id"] }) {
  return prisma.shop.findMany({
    where: { userId },
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createShop({
  name,
  userId,
}: Pick<Shop, "name"> & {
  userId: User["id"];
}) {
  return prisma.shop.create({
    data: {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteShop({
  id,
  userId,
}: Pick<Shop, "id"> & { userId: User["id"] }) {
  return prisma.shop.deleteMany({
    where: { id, userId },
  });
}
