import { useEffect, useState } from "react";
import { deleteTickets, getTickets } from "../api/ticketApi";
import TicketTable from "../components/TicketTable";
import { Link } from "react-router-dom";

function TicketOverview() {

    const [tickets, setTickets] = useState([]);

    const [selectedTickets, setSelectedTickets] = useState([]);

    const loadTickets = () => {
        getTickets()
            .then(response => {
                setTickets(response.data);
            });
    };

    const handleDeleteSelected = () => {
        deleteTickets(selectedTickets)
            .then(() => {
                loadTickets();
                setSelectedTickets([]);
            });
    };

    useEffect(() => {
        loadTickets();
    }, []);

    return (
        <div>
            <h1>
                CRIMDAY
            </h1>
            <br/>
            <TicketTable
                tickets={tickets}
                selectedTickets={selectedTickets}
                setSelectedTickets={setSelectedTickets}
                refreshTickets={loadTickets}
            />
            <button
                onClick={handleDeleteSelected}
                disabled={selectedTickets.length === 0}
            >
                Delete
            </button>
            <br/>
            <Link to="/create-ticket">
                <button>
                    Create Ticket
                </button>
            </Link>
        </div>
    );
}

export default TicketOverview;