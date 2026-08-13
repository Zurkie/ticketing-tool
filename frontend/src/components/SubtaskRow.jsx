import { FiCornerDownRight } from "react-icons/fi";

export default function SubtaskRow({ subtask }) {
  return (
    <tr className="bg-kaiju-cream-dark">
      <td colSpan="9">
        <div className="border-kaiju-cream flex items-center gap-6 border-b-2 px-9 py-1 text-left">
          <FiCornerDownRight className="text-black" />

          <span>{subtask.title}</span>
        </div>
      </td>
    </tr>
  );
}
