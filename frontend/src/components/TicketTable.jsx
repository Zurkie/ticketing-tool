import TicketRow from "./TicketRow";

function TicketTable({
    tickets,
    selectedTickets,
    setSelectedTickets,
    refreshTickets
    }) {

    return (
        <table>
            <thead>
            <tr>
                <th></th>
                <th></th>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Created By</th>
                <th>Updated By</th>
            </tr>
            </thead>
            <tbody>
            {
                tickets.map(ticket => (
                    <TicketRow
                        key={ticket.id}
                        ticket={ticket}
                        selectedTickets={selectedTickets}
                        setSelectedTickets={setSelectedTickets}
                        refreshTickets={refreshTickets}
                    />
                ))
            }
            </tbody>
        </table>
    );
}

export default TicketTable;