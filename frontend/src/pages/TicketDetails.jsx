import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTickets, getTicket } from "../api/TicketApi.js";

function TicketDetails() {
  const { id } = useParams();

  const [tickets, setTickets] = useState([]);

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    getTickets().then((response) => {
      setTickets(response.data);
    });
  }, []);

  useEffect(() => {
    getTicket(id).then((response) => {
      setTicket(response.data);
    });
  }, [id]);

  if (!ticket) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
      }}
    >
      {/* LEFT SIDEBAR */}

      <div
        style={{
          width: "300px",
          borderRight: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <h2>Tickets</h2>

        {tickets.map((item) => (
          <Link
            key={item.id}
            to={`/tickets/${item.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border: item.id == id ? "2px solid black" : "1px solid #ccc",

                borderRadius: "8px",
                padding: "12px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              <strong>#{item.id}</strong>

              <br />

              {item.title}
            </div>
          </Link>
        ))}
      </div>

      {/* DETAILS */}

      <div
        style={{
          padding: "20px",
        }}
      >
        <h1>
          #{ticket.id} {ticket.title}
        </h1>

        <p>{ticket.description}</p>

        <p>Status: {ticket.status}</p>

        <p>Created: {new Date(ticket.createdAt).toLocaleString()}</p>

        <p>Updated: {new Date(ticket.updatedAt).toLocaleString()}</p>
      </div>
      <Link to="/ticket-overview">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default TicketDetails;
