import {useState} from "react";
import {updateSubtask} from "../api/ticketApi";


function SubtaskItem({
    subtask,
    refreshSubtasks
}) {

    const [editedTitle, setEditedTitle] = useState(
        subtask.title
    );
    const [editedStatus, setEditedStatus] = useState(
        subtask.status
    );
    const updateField = (field, value) => {
        const updatedSubtask = {
            title:
                field === "title"
                    ? value
                    : editedTitle,
            status:
                field === "status"
                    ? value
                    : editedStatus

        };
        updateSubtask(
            subtask.id,
            updatedSubtask
        )
            .then(() => {
                refreshSubtasks();
            })
            .catch(error => {
                console.error(
                    "Subtask update failed:",
                    error
                );
            });
    };

    return (
        <tr>
            <td>
                <input
                    value={editedTitle}
                    onChange={(e) =>
                        setEditedTitle(
                            e.target.value
                        )
                    }
                    onBlur={() =>
                        updateField(
                            "title",
                            editedTitle
                        )
                    }
                />
            </td>
            <td>
                <select
                    value={editedStatus}
                    onChange={(e) => {
                        const newStatus =
                            e.target.value;
                        setEditedStatus(
                            newStatus
                        );
                        updateField(
                            "status",
                            newStatus
                        );
                    }}
                >
                    <option value="BACKLOG">
                        Backlog
                    </option>
                    <option value="READY">
                        Ready
                    </option>
                    <option value="IN_PROGRESS">
                        In Progress
                    </option>
                    <option value="BLOCKED">
                        Blocked
                    </option>
                    <option value="IN_TESTING">
                        In Testing
                    </option>
                    <option value="DONE">
                        Done
                    </option>
                    <option value="CANCELLED">
                        Cancelled
                    </option>
                </select>
            </td>
        </tr>
    );
}

export default SubtaskItem;