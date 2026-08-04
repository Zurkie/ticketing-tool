import { useState } from "react";
import { createTicket } from "../api/ticketApi";

function TicketForm({ refreshTickets }) {

    const [ticket, setTicket] = useState({
        title: "",
        description: "",
        status: "OPEN"
    });


    const handleChange = (event) => {

        setTicket({
            ...ticket,
            [event.target.name]: event.target.value
        });

    };


    const handleSubmit = (event) => {

        event.preventDefault();

        createTicket(ticket)
            .then(() => {

                setTicket({
                    title: "",
                    description: "",
                    status: "OPEN"
                });

                refreshTickets();
            });
    };


    return (

        <form onSubmit={handleSubmit}>
            <h2>Create Ticket</h2>
            <input
                name="title"
                placeholder="Title"
                value={ticket.title}
                onChange={handleChange}
            />

            <textarea
                name="description"
                placeholder="Description"
                value={ticket.description}
                onChange={handleChange}
            />

            <select
                name="status"
                value={ticket.status}
                onChange={handleChange}
            >
                <option value="OPEN">
                    Open
                </option>
                <option value="IN_PROGRESS">
                    In Progress
                </option>
                <option value="DONE">
                    Done
                </option>
            </select>

            <button>
                Create Ticket
            </button>
        </form>
    );
}

export default TicketForm;