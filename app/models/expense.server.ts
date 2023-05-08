import type { User, Shop, Expense } from "@prisma/client";

import { prisma } from "~/db.server";

export function getExpensesForUser({ userId }: { userId: User["id"] }) {
  return prisma.expense.findMany({
    select: { id: true, amountSpent: true, shop: true },
    where: { userId },
  });
}

export function createExpense({
  userId,
  shopId,
  amountSpent,
}: Pick<Expense, "amountSpent"> & {
  userId: User["id"];
  shopId: Shop["id"];
}) {
  return prisma.expense.create({
    data: {
      amountSpent,
      shop: {
        connect: {
          id: shopId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteExpense({
  id,
  userId,
}: Pick<Expense, "id"> & { userId: User["id"] }) {
  return prisma.expense.deleteMany({
    where: { id, userId },
  });
}

export function updateExpense({
  id,
  amountSpent,
}: Pick<Expense, "id" | "amountSpent"> & {
  userId: User["id"];
}) {
  return prisma.expense.update({
    where: { id },
    data: {
      amountSpent,
    },
  });
}
