import { deleteTicket } from "../api/ticketApi";


function TicketTable({tickets}) {


    const handleDelete = (id) => {

        deleteTicket(id)
            .then(() => {
                window.location.reload();
            });

    };


    return (

        <table>

            <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
            </tr>
            </thead>


            <tbody>

            {
                tickets.map(ticket => (

                    <tr key={ticket.id}>

                        <td>
                            {ticket.id}
                        </td>


                        <td>
                            {ticket.title}
                        </td>

                        <td>
                            {ticket.description}
                        </td>

                        <td>
                            {ticket.status}
                        </td>


                        <td>

                            <button
                                onClick={() => handleDelete(ticket.id)}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))
            }

            </tbody>

        </table>

    );

}


export default TicketTable;