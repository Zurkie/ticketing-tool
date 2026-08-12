import TicketTable from "../components/TicketTable.jsx";
import {Link} from "react-router-dom";

function TicketOverview() {

    return (
        <div className={'min-h-screen bg-kaiju-cream'}>
            <header>
                <h1 className="relative w-full bg-kaiju-green text-3xl text-kaiju-orange font-bold p-4 flex justify-center items-center">
                    CRIMDAY

                    <Link
                        to="/create-ticket"
                        className="absolute right-6 rounded-md bg-kaiju-orange px-3 py-1.5 text-sm font-semibold text-white transition hover:brightness-110 cursor-pointer"
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