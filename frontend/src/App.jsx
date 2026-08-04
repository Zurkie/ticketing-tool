import { useEffect, useState } from "react";
import { getTickets } from "./api/ticketApi";
import TicketTable from "./components/TicketTable";
import TicketForm from "./components/TicketForm";

function App() {

    const [tickets, setTickets] = useState([]);

    const loadTickets = () => {
        getTickets()
            .then(response => {
                setTickets(response.data);
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
            <TicketForm
                refreshTickets={loadTickets}
            />
            <br/>
            <TicketTable
                tickets={tickets}
            />
        </div>
    );
}

export default App;