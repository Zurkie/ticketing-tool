import TicketTable from "../components/TicketTable.jsx";
import { Link } from "react-router-dom";

function TicketOverview() {
  return (
    <div className={"min-h-screen bg-gray-500"}>
      <header>
        <h1 className="bg-kaiju-green text-kaiju-orange relative flex w-full items-center justify-center p-4 text-3xl font-bold">
          CRIMDAY
          <Link
            to="/create-ticket"
            className="bg-kaiju-orange absolute right-6 cursor-pointer rounded-md px-3 py-1.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            New CRIM
          </Link>
        </h1>
      </header>
      <TicketTable />
    </div>
  );
}

export default TicketOverview;
