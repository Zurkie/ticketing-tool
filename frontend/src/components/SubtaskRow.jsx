import { FiTrash2, FiMenu } from "react-icons/fi";

const statusLabel = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  BLOCKED: "Blocked",
  DONE: "Done",
  SKIPPED: "Skipped",
  NOT_APPLICABLE: "Not Applicable",
};

export default function SubtaskRow({ subtask, onSubtaskDelete, isLast }) {
  const bottomBorderClass = isLast
    ? "border-b border-kaiju-cream-dark"
    : "border-b border-kaiju-green-light";

  return (
    <tr className="bg-kaiju-cream text-center">
      <td
        className={`bg-kaiju-green-light sticky left-0 z-10 w-10 ${bottomBorderClass}`}
      >
        <FiMenu className="mx-auto text-white" />
      </td>

      <td
        colSpan={4}
        className="border-kaiju-cream-dark border-b px-3 py-1.5 text-left font-medium"
      >
        <span>{subtask.title}</span>
      </td>

      <td>
        <div className="bg-kaiju-green-light flex h-full w-full items-center justify-center px-2 py-1 text-center font-semibold">
          {statusLabel[subtask.status] || subtask.status}
        </div>
      </td>

      <td colSpan={3} />
      <td className="bg-kaiju-orange">
        <button
          type="button"
          onClick={() => onSubtaskDelete(subtask.id)}
          className="mx-auto flex cursor-pointer items-center justify-center"
        >
          <FiTrash2 className="w-10 text-lg text-white" />
        </button>
      </td>
    </tr>
  );
}
