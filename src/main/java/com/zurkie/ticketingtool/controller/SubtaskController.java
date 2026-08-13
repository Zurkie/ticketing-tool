package com.zurkie.ticketingtool.controller;

import com.zurkie.ticketingtool.model.Subtask;
import com.zurkie.ticketingtool.model.Ticket;
import com.zurkie.ticketingtool.repository.SubtaskRepository;
import com.zurkie.ticketingtool.repository.TicketRepository;
import com.zurkie.ticketingtool.service.SubtaskService;
import com.zurkie.ticketingtool.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "http://localhost:5173")
public class SubtaskController {

    private final SubtaskRepository subtaskRepository;
    private final TicketRepository ticketRepository;

    private final SubtaskService subtaskService;

    public SubtaskController(SubtaskRepository subtaskRepository, TicketRepository ticketRepository, SubtaskService subtaskService) {
        this.subtaskRepository = subtaskRepository;
        this.ticketRepository = ticketRepository;
        this.subtaskService = subtaskService;
    }

    @GetMapping("/subtasks/{id}")
    public Subtask readSubtask(@PathVariable UUID id){
        return subtaskService.readSubtask(id);
    }

    @GetMapping("/{ticketId}/subtasks")
    public List<Subtask> getSubtasksByTicket(@PathVariable UUID ticketId) {
        return subtaskRepository.findByTicketIdOrderByIdAsc(ticketId);
    }

    @PostMapping("/{ticketId}/subtasks")
    public Subtask createSubtask(@PathVariable UUID ticketId, @RequestBody Subtask subtask) {
        Ticket ticket = ticketRepository
                .findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        subtask.setTicket(ticket);

        return subtaskRepository.save(subtask);
    }

    @DeleteMapping("/subtasks/{subtaskId}")
    public void deleteSubtask(@PathVariable UUID subtaskId){
        subtaskRepository.deleteById(subtaskId);
    }

    @PutMapping("/subtasks/{id}")
    public Subtask updateSubtask(@PathVariable UUID id, @RequestBody Subtask subtask) {
        System.out.println("Updating subtask: " + id);
        System.out.println("Title: " + subtask.getTitle());
        System.out.println("Status: " + subtask.getStatus());

        return subtaskService.updateSubtask(id, subtask);
    }
}