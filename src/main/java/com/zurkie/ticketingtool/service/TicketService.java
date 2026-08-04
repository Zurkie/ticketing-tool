package com.zurkie.ticketingtool.service;

import com.zurkie.ticketingtool.model.Ticket;
import com.zurkie.ticketingtool.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public Ticket readTicket(Long id) {
        return ticketRepository.findById(id)
                .orElse(null);
    }

    public List<Ticket> readTickets() {
        return ticketRepository.findAll();
    }

    public Ticket updateTicket(Long id, Ticket updatedTicket) {
        Ticket existingTicket = ticketRepository.findById(id)
                .orElse(null);

        if (existingTicket == null) {
            return null;
        }

        existingTicket.setTitle(updatedTicket.getTitle());
        existingTicket.setDescription(updatedTicket.getDescription());
        existingTicket.setStatus(updatedTicket.getStatus());

        return ticketRepository.save(existingTicket);
    }

    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }
}
