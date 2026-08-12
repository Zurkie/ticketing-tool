package com.zurkie.ticketingtool.service;

import com.zurkie.ticketingtool.model.Subtask;
import com.zurkie.ticketingtool.model.Ticket;
import com.zurkie.ticketingtool.repository.TicketRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Transactional
    public Ticket createTicket(Ticket ticket) {

        if (ticket.getTicketNumber() != null) {
            throw new IllegalArgumentException("New ticket cannot have a pre-assigned ticket number");
        }
        ticket.setTicketNumber(generateNextTicketNumber());

        List<String> defaultSubtaskTitles = List.of(
                "Create/Attach BRS",
                "Assignment & Estimation",
                "Approve for Development",
                "Development in Build Place or CFG",
                "BPO Functional Test in CFG",
                "Delivery to UAT and ACC",
                "Delivery Test by User + BPO Approval",
                "Delivery to PROD"
        );

        for (String title : defaultSubtaskTitles) {
            Subtask subtask = new Subtask();
            subtask.setTitle(title);

            ticket.addSubtask(subtask);
        }

        return ticketRepository.save(ticket);
    }

    private String generateNextTicketNumber() {
        Optional<Ticket> lastTicket = ticketRepository
                .findFirstByTicketNumberStartingWithOrderByTicketNumberDesc("CRIM-");

        if (lastTicket.isEmpty()){
            return "CRIM-0001";
        }

        String lastTicketNumber = lastTicket.get().getTicketNumber();
        String numericPart = lastTicketNumber.replace("CRIM-", "");
        int nextNumber = Integer.parseInt(numericPart) + 1;

        return String.format("CRIM-%04d", nextNumber);
    }

    public Ticket readTicket(UUID id) {
        return ticketRepository.findById(id)
                .orElse(null);
    }

    public List<Ticket> readTickets() {
        return ticketRepository.findAllByOrderByCreatedAtAsc();
    }

    public Ticket updateTicket(UUID id, Ticket updatedTicket) {

        Ticket existingTicket = ticketRepository.findById(id)
                .orElse(null);

        if (existingTicket == null) {
            return null;
        }

        existingTicket.setTitle(updatedTicket.getTitle());
        existingTicket.setDescription(updatedTicket.getDescription());
        existingTicket.setStatus(updatedTicket.getStatus());
        existingTicket.setPriority(updatedTicket.getPriority());

        return ticketRepository.save(existingTicket);
    }

    public void deleteTicket(UUID id) {
        ticketRepository.deleteById(id);
    }

    public void deleteSelectedTickets(List <UUID> ticketIds) {
        ticketRepository.deleteAllByIdInBatch(ticketIds);
    }
}
