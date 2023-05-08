import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getShopsForUser } from "~/models/shop.server";
export const meta: V2_MetaFunction = () => [{ title: "Expense Tracker" }];

export const loader = async () => {
  const shops = await getShopsForUser({ userId: "abc" });
  return json({
    shops,
  });
};

export default function Shops() {
  const data = useLoaderData<typeof loader>();
  return (
    <main>
      <Link to="new">Create new shop</Link>
      <ul>
        {data?.shops?.map(({ id, name }) => {
          return <li key={id}>{name}</li>;
        })}
      </ul>
    </main>
  );
}
