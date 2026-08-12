import TicketTableRow from "./TicketTableRow.jsx";
import {useEffect, useState} from "react";
import {deleteTicket, getTickets, updateTicket} from "../api/TicketApi.js";

const TicketTable = () => {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        getTickets()
            .then(response => {
                setTickets(response.data);
            })
            .catch(error => {
                console.error("Error loading tickets:", error);
            });
    }, []);

    const handleDelete = (id) => {
        deleteTicket(id)
            .then(() => {
                setTickets(currentTickets =>
                    currentTickets.filter(ticket => ticket.id !== id)
                );
            })
            .catch(error => {
                console.error("Error deleting ticket:", error)
            })
    }

    const handleTicketChange = (id, field, value) => {
        const ticket = tickets.find(ticket => ticket.id === id);

        if (!ticket) {
            return;
        }

        const oldValue = ticket[field];

        // Optimistically update UI
        setTickets(currentTickets =>
            currentTickets.map(ticket =>
                ticket.id === id
                    ? { ...ticket, [field]: value }
                    : ticket
            )
        );

        updateTicket(id, {
            ...ticket,
            [field]: value
        })
            .catch(error => {
                console.error(`Error updating ticket ${field}:`, error);

                // Revert UI
                setTickets(currentTickets =>
                    currentTickets.map(ticket =>
                        ticket.id === id
                            ? { ...ticket, [field]: oldValue }
                            : ticket
                    )
                );
            });
    };

    const headerClass =
        'border-b-2 border-kaiju-green px-8 py-1 text-center text-kaiju-orange';

    return(
        <table className={'w-3/4 mx-auto mt-8 table-fixed'}>
            <colgroup>
                <col className="w-[2%]" />
                <col className="w-[10%]" />
                <col className="w-[15%]" />
                <col className="w-[12%]" />
                <col className="w-[12%]" />
                <col className="w-[12%]" />
                <col className="w-[13%]" />
                <col className="w-[13%]" />
                <col className="w-[2%]" />
            </colgroup>
            <thead>
                <tr>
                    <th className={'border-b-2 border-kaiju-green'}/>
                    <th className={headerClass}>CRIM</th>
                    <th className={headerClass}>Title</th>
                    <th className={headerClass}>Owner</th>
                    <th className={headerClass}>Status</th>
                    <th className={headerClass}>Priority</th>
                    <th className={headerClass}>Date Created</th>
                    <th className={headerClass}>Date Updated</th>
                    <th className={'border-b-2 border-kaiju-green'}/>
                </tr>
            </thead>
            <tbody>
                {tickets.map((ticket) => (
                    <TicketTableRow
                        key={ticket.id}
                        ticket={ticket}
                        onDelete={handleDelete}
                        onTicketChange={handleTicketChange}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default TicketTable;