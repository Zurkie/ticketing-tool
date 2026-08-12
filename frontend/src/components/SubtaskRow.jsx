import { FiCornerDownRight } from "react-icons/fi";

function SubtaskRow({ subtask }) {
    return (
        <tr className="bg-kaiju-cream-dark">
            <td colSpan="9">
                <div className="flex border-b-2 border-kaiju-cream items-center gap-6 px-9 py-1 text-left">
                    <FiCornerDownRight className="text-black" />

                    <span>
                        {subtask.title}
                    </span>
                </div>
            </td>
        </tr>
    );
}

export default SubtaskRow;