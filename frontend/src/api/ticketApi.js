import axios from "axios";

const API_URL = "http://localhost:8080/tickets";

export const getTickets = () => {
    return axios.get(API_URL);
};

export const createTicket = (ticket) => {
    return axios.post(API_URL, ticket);
};

export const deleteTicket = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const updateTicket = (id, ticket) => {
    return axios.put(`${API_URL}/${id}`, ticket);
};