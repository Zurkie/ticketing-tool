import TicketTableRow from "./TicketTableRow.jsx";
import { useEffect, useState } from "react";
import { deleteTicket, getTickets, updateTicket } from "../api/TicketApi.js";

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getTickets()
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error loading tickets:", error);
      });
  }, []);

  const handleTicketDelete = (id) => {
    deleteTicket(id)
      .then(() => {
        setTickets((currentTickets) =>
          currentTickets.filter((ticket) => ticket.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting ticket:", error);
      });
  };

  const handleTicketUpdate = (id, field, value) => {
    const ticket = tickets.find((ticket) => ticket.id === id);

    if (!ticket) {
      return;
    }

    const oldValue = ticket[field];

    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, [field]: value } : ticket
      )
    );

    updateTicket(id, {
      ...ticket,
      [field]: value,
    }).catch((error) => {
      console.error(`Error updating ticket ${field}:`, error);

      setTickets((currentTickets) =>
        currentTickets.map((ticket) =>
          ticket.id === id ? { ...ticket, [field]: oldValue } : ticket
        )
      );
    });
  };

  const headerClass =
    "border-b-2 border-kaiju-green px-8 py-1 text-center text-kaiju-orange";

  return (
    <div className="border-kaiju-green scrollbar-thumb-kaiju-orange scrollbar-track-kaiju-green mx-auto mt-8 w-3/4 scrollbar-thin overflow-x-auto border-b-2">
      <table className={"mx-auto w-max border-collapse"}>
        <colgroup>
          <col className="w-10" />
          <col className="w-40" />
          <col className="w-120" />
          <col className="w-40" />
          <col className="w-40" />
          <col className="w-40" />
          <col className="w-45" />
          <col className="w-45" />
          <col className="w-10" />
        </colgroup>
        <thead>
          <tr>
            <th className={"border-kaiju-green border-b-2"} />
            <th className={headerClass}>CRIM</th>
            <th className={headerClass}>Title</th>
            <th className={headerClass}>Owner</th>
            <th className={headerClass}>Status</th>
            <th className={headerClass}>Priority</th>
            <th className={headerClass}>Date Created</th>
            <th className={headerClass}>Date Updated</th>
            <th className={"border-kaiju-green border-b-2"} />
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <TicketTableRow
              key={ticket.id}
              ticket={ticket}
              onTicketDelete={handleTicketDelete}
              onTicketUpdate={handleTicketUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
