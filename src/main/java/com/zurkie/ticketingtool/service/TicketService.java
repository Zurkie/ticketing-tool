package com.zurkie.ticketingtool.service;

import com.zurkie.ticketingtool.model.Subtask;
import com.zurkie.ticketingtool.model.Ticket;
import com.zurkie.ticketingtool.repository.SubtaskRepository;
import com.zurkie.ticketingtool.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final SubtaskRepository subtaskRepository;

    public TicketService(TicketRepository ticketRepository, SubtaskRepository subtaskRepository) {
        this.ticketRepository = ticketRepository;
        this.subtaskRepository = subtaskRepository;
    }

    public Ticket createTicket(Ticket ticket) {

        Ticket savedTicket = ticketRepository.save(ticket);

        List<String> defaultSubtasks = List.of(
                "Create/Attach BRS",
                "Assignment & Estimation",
                "Approve for Development",
                "Development in Build Place or CFG",
                "BPO Functional Test in CFG",
                "Delivery to UAT and ACC",
                "Delivery Test by User + BPO Approval",
                "Delivery to PROD"
        );

        List<Subtask> subtasks = defaultSubtasks.stream()
                .map(title -> {
                    Subtask subtask = new Subtask();
                    subtask.setTitle(title);
                    subtask.setStatus("BACKLOG");
                    subtask.setTicket(savedTicket);
                    return subtask;
                })
                .toList();

        subtaskRepository.saveAll(subtasks);

        return savedTicket;
    }

    public Ticket readTicket(Long id) {
        return ticketRepository.findById(id)
                .orElse(null);
    }

    public List<Ticket> readTickets() {
        return ticketRepository.findAllByOrderByIdAsc();
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
        existingTicket.setStatus(updatedTicket.getPriority());

        return ticketRepository.save(existingTicket);
    }

    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }

    public void deleteSelectedTickets(List <Long> ticketIds) {
        ticketRepository.deleteAllByIdInBatch(ticketIds);
    }
}
