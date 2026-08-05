import { useState } from "react";
import { createTicket } from "../api/ticketApi";
import {Link, useNavigate} from "react-router-dom";

function TicketCreate() {
    const navigate = useNavigate();

    const [ticket, setTicket] = useState({
        title: "",
        description: "",
        status: "BACKLOG",
        priority: "LOW"
    });

    const handleChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        createTicket(ticket)
            .then(() => {
                navigate("/ticket-overview");
            });
    };

    return (
        <div>
            <h1>Create Ticket</h1>
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
                name="priority"
                value={ticket.priority}
                onChange={handleChange}
            >
                <option value="CRITICAL">
                    Critical
                </option>
                <option value="HIGH">
                    High
                </option>
                <option value="MEDIUM">
                    Medium
                </option>
                <option value="LOW">
                    Low
                </option>
            </select>
            <button onClick={handleSubmit}>
                Create
            </button>
            <Link to="/ticket-overview">
                <button>
                    Cancel
                </button>
            </Link>
        </div>
    );
}

export default TicketCreate;