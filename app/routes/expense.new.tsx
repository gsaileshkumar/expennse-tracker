import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { createShop, getShopsForUser } from "~/models/shop.server";
import { getUserByEmail } from "~/models/user.server";
export const meta: V2_MetaFunction = () => [{ title: "Expense Tracker" }];

export const action = async ({ request }: ActionArgs) => {
  const user = await getUserByEmail("admin@admin.com");
  const form = await request.formData();
  const name = form.get("name");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof name !== "string") {
    throw new Error("Form not submitted correctly.");
  }

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  await createShop({ name, userId: user.id });
  return redirect(`/shop`);
};

export const loader = async () => {
  const user = await getUserByEmail("admin@admin.com");
  if (!user?.id) {
    throw new Error("Unauthorized");
  }
  const shops = await getShopsForUser({ userId: user.id });
  return json({
    shops,
  });
};

export default function ExpenseForm() {
  const data = useLoaderData<typeof loader>();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <form method="post" className="mx-auto max-w-md">
        <h1 className="mb-4 text-3xl font-bold">Enter your expense</h1>
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-700">Shop</label>
          <select name="shopId">
            {data?.shops?.map((shop) => {
              return (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              );
            })}
          </select>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            name="amountSpent"
            type="number"
            placeholder="Enter amount spent"
          />
        </div>
        <Link to="/">Back</Link>
        <button
          type="submit"
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Add expense
        </button>
      </form>
    </main>
  );
}
