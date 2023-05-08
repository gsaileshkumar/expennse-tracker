import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
export const meta: V2_MetaFunction = () => [{ title: "Expense Tracker" }];

export default function Expenses() {
  return (
    <main>
      <ol>
        <li>
          <Link to="/expense">Expenses</Link>{" "}
        </li>
        <li>
          {" "}
          <Link to="/shop">Shops</Link>
        </li>
      </ol>
    </main>
  );
}
