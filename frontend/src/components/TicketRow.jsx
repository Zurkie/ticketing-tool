import {useState} from "react";
import {updateTicket} from "../api/ticketApi";
import {Link} from "react-router-dom";
import SubtaskList from "./SubtaskList";

function TicketRow({
    ticket,
    selectedTickets,
    setSelectedTickets,
    refreshTickets
}) {

    const [expanded, setExpanded] = useState(false);

    const [editedValues, setEditedValues] = useState({});

    const handleCheckboxChange = () => {
        if(selectedTickets.includes(ticket.id)) {
            setSelectedTickets(
                selectedTickets.filter(
                    id => id !== ticket.id
                )
            );
        }
        else {
            setSelectedTickets([
                ...selectedTickets,
                ticket.id
            ]);
        }
    };

    const handleInputChange = (field,value)=>{
        setEditedValues({
            ...editedValues,
            [field]:value
        });
    };

    const updateField = (field,value)=>{
        const updatedTicket={
            title:
                editedValues.title ?? ticket.title,
            description:
                editedValues.description ?? ticket.description,
            status:
                field==="status"
                    ? value
                    : ticket.status,
            priority:
                field==="priority"
                    ? value
                    : ticket.priority
        };
        updateTicket(
            ticket.id,
            updatedTicket
        )
            .then(()=>{
                refreshTickets();
            });
    };

    return (
        <>
            <tr>
                <td>
                    <input
                        type="checkbox"
                        checked={
                            selectedTickets.includes(ticket.id)
                        }
                        onChange={handleCheckboxChange}
                    />
                </td>
                <td>
                    <button
                        onClick={()=>setExpanded(!expanded)}
                    >
                        {
                            expanded
                                ?
                                "▼"
                                :
                                "▶"
                        }
                    </button>
                </td>
                <td>
                    <Link
                        to={`/tickets/${ticket.id}`}
                    >
                        {ticket.ticketNumber}
                    </Link>
                </td>
                <td>
                    <input
                        value={
                            editedValues.title
                            ??
                            ticket.title
                        }
                        onChange={(e)=>
                            handleInputChange(
                                "title",
                                e.target.value
                            )
                        }
                        onBlur={()=>
                            updateField(
                                "title",
                                editedValues.title
                            )
                        }
                    />
                </td>
                <td>
                    <input
                        value={
                            editedValues.description
                            ??
                            ticket.description
                        }
                        onChange={(e)=>
                            handleInputChange(
                                "description",
                                e.target.value
                            )
                        }
                        onBlur={()=>
                            updateField(
                                "description",
                                editedValues.description
                            )
                        }
                    />
                </td>
                <td>
                    <select
                        value={ticket.status}
                        onChange={(e)=>
                            updateField(
                                "status",
                                e.target.value
                            )
                        }
                    >
                        <option value="BACKLOG">
                            Backlog
                        </option>
                        <option value="READY">
                            Ready
                        </option>
                        <option value="DONE">
                            Done
                        </option>
                    </select>
                </td>
                <td>
                    <select
                        value={ticket.priority}
                        onChange={(e)=>
                            updateField(
                                "priority",
                                e.target.value
                            )
                        }
                    >
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
                </td>
                <td>
                    {new Date(ticket.createdAt)
                        .toLocaleString()}
                </td>
                <td>
                    {new Date(ticket.updatedAt)
                        .toLocaleString()}
                </td>
                <td>
                    {ticket.createdBy}
                </td>
                <td>
                    {ticket.updatedBy}
                </td>
            </tr>
            {
                expanded && (

                    <SubtaskList
                        ticketId={ticket.id}
                    />

                )
            }
        </>
    );
}

export default TicketRow;