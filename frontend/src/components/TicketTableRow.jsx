import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronRight, FiTrash2 } from "react-icons/fi";
import { getSubtasks } from "../api/TicketApi.js";
import SubtaskRow from "./SubtaskRow.jsx";
import { cn } from "../utils/cn.js";

const TicketTableRow = ({ ticket, onTicketDelete, onTicketUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [subtasks, setSubtasks] = useState([]);

  const [title, setTitle] = useState(ticket.title);

  useEffect(() => {
    setTitle(ticket.title);
  }, [ticket.title]);

  const handleExpand = () => {
    if (!expanded) {
      getSubtasks(ticket.id)
        .then((response) => {
          setSubtasks(response.data);
        })
        .catch((error) => {
          console.error("Error loading subtasks:", error);
        });
    }

    setExpanded(!expanded);
  };

  const statusLabel = {
    BACKLOG: "Backlog",
    READY: "Ready",
    IN_PROGRESS: "In Progress",
    BLOCKED: "Blocked",
    IN_TESTING: "In Testing",
    DONE: "Done",
    CANCELLED: "Cancelled",
  };

  const priorityLabels = {
    CRITICAL: "Critical",
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low",
  };

  const priorityClasses = {
    LOW: "bg-green-300 font-bold",
    MEDIUM: "bg-yellow-200 font-bold",
    HIGH: "bg-orange-300 font-bold",
    CRITICAL: "bg-red-400 font-bold",
  };

  return (
    <>
      <tr
        className={cn(
          "border-kaiju-cream-dark border-b-2 text-center",
          "last:border-kaiju-green last:hover:border-kaiju-green",
          "[&>td:nth-child(n+2):not(:nth-last-child(-n+2))]:border-r",
          "[&>td:nth-child(n+2):not(:nth-last-child(-n+2))]:border-kaiju-cream-dark",
          expanded ? "bg-kaiju-cream-darker" : "hover:bg-kaiju-cream-dark",
          !expanded && "hover:border-kaiju-cream"
        )}
      >
        <td className="w-10">
          <button
            type="button"
            onClick={handleExpand}
            className="mx-auto flex items-center justify-center p-1"
          >
            {expanded ? (
              <FiChevronDown className="cursor-pointer text-lg text-black" />
            ) : (
              <FiChevronRight className="cursor-pointer text-lg text-black" />
            )}
          </button>
        </td>
        <td className={"font-bold"}>{ticket.ticketNumber}</td>
        <td>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onBlur={() => {
              const trimmedTitle = title.trim();

              if (!trimmedTitle) {
                setTitle(ticket.title);
                return;
              }

              if (trimmedTitle !== ticket.title) {
                onTicketUpdate(ticket.id, "title", trimmedTitle);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.currentTarget.blur();
              }
            }}
            className={
              "hover:bg-kaiju-cream-dark w-full rounded bg-transparent px-1 text-center outline-none focus:bg-white"
            }
          />
        </td>
        <td>{ticket.createdBy}</td>
        <td>
          <select
            value={ticket.status}
            onChange={(event) =>
              onTicketUpdate(ticket.id, "status", event.target.value)
            }
            className="bg-kaiju-green-light w-full cursor-pointer appearance-none px-2 py-1 text-center font-bold"
          >
            {Object.entries(statusLabel).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </td>
        <td className={priorityClasses[ticket.priority]}>
          <select
            value={ticket.priority}
            onChange={(event) =>
              onTicketUpdate(ticket.id, "priority", event.target.value)
            }
            className="w-full cursor-pointer appearance-none px-2 py-1 text-center"
          >
            {Object.entries(priorityLabels).map(([value, label]) => (
              <option
                key={value}
                value={value}
                className={priorityClasses[value]}
              >
                {label}
              </option>
            ))}
          </select>
        </td>
        <td>
          {new Date(ticket.createdAt).toLocaleString([], {
            dateStyle: "medium",
          })}
        </td>
        <td>
          {new Date(ticket.updatedAt).toLocaleString([], {
            dateStyle: "medium",
          })}
        </td>
        <td>
          <button
            type="button"
            onClick={() => onTicketDelete(ticket.id)}
            className={
              "mx-auto flex cursor-pointer items-center justify-center p-1"
            }
          >
            <FiTrash2 className="text-kaiju-orange text-lg" />
          </button>
        </td>
      </tr>

      {expanded &&
        subtasks.map((subtask) => (
          <SubtaskRow key={subtask.id} subtask={subtask} />
        ))}
    </>
  );
};

export default TicketTableRow;
