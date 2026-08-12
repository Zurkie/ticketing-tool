import axios from "axios";


const API_URL = "http://localhost:8080/tickets";


export const createTicket = (ticket) => {
    return axios.post(
        API_URL,
        ticket
    );
};


export const getTickets = () => {
    return axios.get(
        API_URL
    );
};


export const getTicket = (id) => {
    return axios.get(
        `${API_URL}/${id}`
    );
};


export const updateTicket = (id, ticket) => {
    return axios.put(
        `${API_URL}/${id}`,
        ticket
    );
};


export const deleteTicket = (id) => {
    return axios.delete(
        `${API_URL}/${id}`
    );
};


export const deleteTickets = (ticketIds) => {
    return axios.delete(
        API_URL,
        {
            data: ticketIds
        }
    );
};


export const getSubtasks = (ticketId) => {
    return axios.get(
        `${API_URL}/${ticketId}/subtasks`
    );
};


export const updateSubtask = (subtaskId, updatedSubtask) => {

    console.log(
        "Updating subtask:",
        subtaskId,
        updatedSubtask
    );

    return axios.put(
        `${API_URL}/subtasks/${subtaskId}`,
        updatedSubtask
    );
};