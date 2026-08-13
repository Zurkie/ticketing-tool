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
    "border-b-5 border-kaiju-green px-8 py-1 text-center text-amber-500 uppercase bg-kaiju-green";

  return (
    <div className="mx-auto mt-8 w-3/4 overflow-hidden rounded-lg">
      <div className="scrollbar-thumb-kaiju-green-light scrollbar-track-kaiju-green overflow-x-auto">
        <table className="mx-auto w-max border-separate border-spacing-0">
          <colgroup>
            <col className="w-10" />
            <col className="w-40" />
            <col className="w-120" />
            <col className="w-40" />
            <col className="w-10" />
            <col className="w-40" />
            <col className="w-40" />
            <col className="w-45" />
            <col className="w-45" />
            <col className="w-10" />
          </colgroup>
          <thead>
            <tr>
              <th className="border-kaiju-green bg-kaiju-green sticky left-0 z-20 border-b-5" />
              <th className="border-kaiju-green bg-kaiju-green sticky left-10 z-20 border-b-5 px-8 py-1 text-center text-amber-500 uppercase">
                CRIM
              </th>
              <th className={headerClass}>Title</th>
              <th className={headerClass}>Owner</th>
              <th className="border-kaiju-green bg-kaiju-green border-b-5" />
              <th className={headerClass}>Status</th>
              <th className={headerClass}>Priority</th>
              <th className={headerClass}>Date Created</th>
              <th className={headerClass}>Date Updated</th>
              <th className="border-kaiju-green bg-kaiju-green border-b-5" />
            </tr>
          </thead>
          <tbody className="bg-kaiju-cream-darker">
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
    </div>
  );
};

export default TicketTable;
