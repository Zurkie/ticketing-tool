import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiTrash2,
  FiPlus,
  FiMessageSquare,
} from "react-icons/fi";
import { createSubtask, deleteSubtask, getSubtasks } from "../api/TicketApi.js";
import SubtaskRow from "./SubtaskRow.jsx";
import { cn } from "../utils/cn.js";

const TicketTableRow = ({ ticket, onTicketDelete, onTicketUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [title, setTitle] = useState(ticket.title);

  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [isSubmittingSubtask, setIsSubmittingSubtask] = useState(false);

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

  const handleAddSubtask = () => {
    const trimmedTitle = newSubtaskTitle.trim();
    if (!trimmedTitle || isSubmittingSubtask) return;

    setIsSubmittingSubtask(true);

    createSubtask(ticket.id, { title: trimmedTitle })
      .then((response) => {
        setSubtasks((prevSubtasks) => [...prevSubtasks, response.data]);
        setNewSubtaskTitle("");
      })
      .catch((error) => {
        console.error("Error creating subtask:", error);
      })
      .finally(() => {
        setIsSubmittingSubtask(false);
      });
  };

  const handleSubtaskDelete = (id) => {
    deleteSubtask(id)
      .then(() => {
        setSubtasks((currentSubtasks) =>
          currentSubtasks.filter((subtask) => subtask.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting ticket:", error);
      });
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
    LOW: "bg-green-300 font-semibold",
    MEDIUM: "bg-yellow-200 font-semibold",
    HIGH: "bg-orange-300 font-semibold",
    CRITICAL: "bg-red-400 font-semibold",
  };

  const subtaskHeaderClass =
    "border-kaiju-cream border-b py-1 text-center text-white";

  return (
    <>
      <tr
        className={cn(
          "group text-center",
          "[&>td]:border-kaiju-cream-dark [&>td]:border-b",
          "[&>td:nth-child(n+2):not(:nth-last-child(-n+2))]:border-r",
          "[&>td:nth-child(n+2):not(:nth-last-child(-n+2))]:border-kaiju-cream-dark",
          "last:[&>td]:border-b-0",
          expanded ? "bg-kaiju-cream-darker" : "hover:bg-kaiju-cream-dark",
          !expanded && "hover:border-kaiju-cream"
        )}
      >
        <td className="bg-kaiju-orange sticky left-0 z-10 w-10">
          <button
            type="button"
            onClick={handleExpand}
            className="mx-auto flex items-center justify-center p-1"
          >
            {expanded ? (
              <FiChevronDown className="cursor-pointer text-lg text-white" />
            ) : (
              <FiChevronRight className="cursor-pointer text-lg text-white" />
            )}
          </button>
        </td>
        <td
          className={cn(
            "sticky left-10 z-10 font-semibold",
            expanded
              ? "bg-kaiju-cream-darker"
              : "bg-kaiju-cream-darker group-hover:bg-kaiju-cream-dark"
          )}
        >
          {ticket.ticketNumber}
        </td>
        <td className="px-1 py-1">
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
            className="bg-kaiju-cream hover:border-kaiju-green-light focus:border-kaiju-green focus:ring-kaiju-green w-full rounded border border-transparent text-center font-medium transition-all focus:ring-1"
          />
        </td>
        <td>{ticket.createdBy}</td>
        <td className="bg-kaiju-blue w-10">
          <button
            type="button"
            className="mx-auto flex cursor-pointer items-center justify-center p-1"
          >
            <FiMessageSquare className="mx-auto text-white" />
          </button>
        </td>
        <td>
          <select
            value={ticket.status}
            onChange={(event) =>
              onTicketUpdate(ticket.id, "status", event.target.value)
            }
            className="bg-kaiju-green-light w-full cursor-pointer appearance-none px-2 py-1 text-center font-semibold"
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
        <td className="bg-kaiju-orange w-10">
          <button
            type="button"
            onClick={() => onTicketDelete(ticket.id)}
            className="mx-auto flex cursor-pointer items-center justify-center p-1"
          >
            <FiTrash2 className="mx-auto text-white" />
          </button>
        </td>
      </tr>
      {expanded && subtasks.length > 0 && (
        <>
          <tr className="bg-kaiju-green-light text-xs font-semibold uppercase">
            <td className="bg-kaiju-green-light sticky left-0 z-10 w-10" />
            <td colSpan={2} className={subtaskHeaderClass}>
              <span>Title</span>
            </td>
            <td colSpan={2} className={subtaskHeaderClass}>
              Assigned To
            </td>
            <td className={subtaskHeaderClass}>Status</td>
            <td colSpan={4} />
          </tr>

          {subtasks.map((subtask, index) => (
            <SubtaskRow
              key={subtask.id}
              subtask={subtask}
              onSubtaskDelete={handleSubtaskDelete}
              isLast={index === subtasks.length - 1}
            />
          ))}

          <tr className="border-kaiju-cream bg-amber-200">
            <td className="sticky left-0 z-10 w-10 border-b border-amber-200 bg-amber-500 py-2">
              <button
                type="button"
                onClick={handleAddSubtask}
                disabled={isSubmittingSubtask || !newSubtaskTitle.trim()}
                className="mx-auto flex items-center justify-center disabled:opacity-50"
              >
                <FiPlus className="text-white" />
              </button>
            </td>
            <td colSpan={2} className="px-2 py-1">
              <input
                type="text"
                placeholder="Add subtask..."
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddSubtask();
                  }
                }}
                disabled={isSubmittingSubtask}
                className="border-kaiju-cream-darker bg-kaiju-cream/60 focus:border-kaiju-green focus:ring-kaiju-green focus:bg-kaiju-cream w-full rounded border px-2 py-1 text-xs font-medium text-slate-800 placeholder-slate-500 transition-all outline-none focus:ring-1 disabled:opacity-50"
              />
            </td>
            <td colSpan={7} className="bg-amber-200" />
          </tr>
        </>
      )}
    </>
  );
};

export default TicketTableRow;
