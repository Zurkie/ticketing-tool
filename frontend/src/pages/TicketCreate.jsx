import { useState } from "react";
import { createTicket } from "../api/TicketApi.js";
import { useNavigate } from "react-router-dom";

function TicketCreate() {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("MEDIUM");

    const navigate = useNavigate();

    const handleCreate = () => {
        if (!title.trim()) {
            return;
        }

        const ticket = {
            title: title.trim(),
            priority
        };

        createTicket(ticket)
            .then(() => {
                navigate("/ticket-overview");
            })
            .catch(error => {
                console.error("Error creating ticket:", error);
            });
    };

    return (
        <div className="min-h-screen bg-kaiju-cream">
            <h1 className="w-full bg-kaiju-green text-3xl text-kaiju-orange font-bold p-4 flex justify-center items-center">
                CRIMDAY
            </h1>

            <div className="w-3/4 mx-auto mt-8 p-6 border-2 border-kaiju-green">
                <h2 className="text-xl font-bold text-kaiju-orange mb-4">
                    Create Ticket
                </h2>

                <div className="flex items-end gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 font-semibold">
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-kaiju-green bg-white"
                            placeholder="Ticket title"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">
                            Priority
                        </label>

                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="px-3 py-2 border border-kaiju-green bg-white"
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                            <option value="CRITICAL">Critical</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={handleCreate}
                        disabled={!title.trim()}
                        className="px-4 py-2 bg-kaiju-green text-kaiju-orange font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TicketCreate;