import {useEffect,useState} from "react";
import {getSubtasks} from "../api/ticketApi";
import SubtaskItem from "./SubtaskItem";

function SubtaskList({
    ticketId
}) {

    const [subtasks,setSubtasks] = useState([]);

    const loadSubtasks = () => {
        getSubtasks(ticketId)
            .then(response=>{
                setSubtasks(
                    response.data
                );
            });
    };
    useEffect(()=>{
        loadSubtasks();
    },[ticketId]);

    return (
        <tr>
            <td colSpan="9">
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        subtasks.length === 0
                            ?
                            <tr>
                                <td colSpan="3">
                                    No subtasks
                                </td>
                            </tr>
                            :
                            subtasks.map(subtask=>(
                                <SubtaskItem
                                    key={subtask.id}
                                    subtask={subtask}
                                    refreshSubtasks={loadSubtasks}
                                />
                            ))
                    }
                    </tbody>
                </table>
            </td>
        </tr>
    );
}

export default SubtaskList;