import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getExpensesForUser } from "~/models/expense.server";
import { getUserByEmail } from "~/models/user.server";
export const meta: V2_MetaFunction = () => [{ title: "Expense Tracker" }];

export const loader = async () => {
  const user = await getUserByEmail("admin@admin.com");
  if (!user?.id) {
    throw new Error("Unauthorized");
  }
  const expenses = await getExpensesForUser({ userId: user.id });
  return json({
    expenses,
  });
};

export default function Expenses() {
  const data = useLoaderData<typeof loader>();
  return (
    <main>
      <Link to="/">Home</Link>
      <Link to="new">Create new expense</Link>
      <h3>Your expenses so far</h3>
      <ol>
        {data?.expenses?.map(({ id, amountSpent, shop }) => {
          return (
            <li key={id}>
              {shop.name} : {amountSpent}
            </li>
          );
        })}
      </ol>
    </main>
  );
}
