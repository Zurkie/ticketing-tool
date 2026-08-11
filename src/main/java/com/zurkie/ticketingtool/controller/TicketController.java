package com.zurkie.ticketingtool.controller;

import com.zurkie.ticketingtool.model.Ticket;
import com.zurkie.ticketingtool.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService){
        this.ticketService = ticketService;
    }

    @PostMapping("/tickets")
    public Ticket createTicket(@RequestBody Ticket ticket){
        System.out.println(ticket.getPriority());
        return ticketService.createTicket(ticket);
    }

    @GetMapping("/tickets/{id}")
    public Ticket readTicket(@PathVariable UUID id){
        return ticketService.readTicket(id);
    }

    @GetMapping("/tickets")
    public List<Ticket> readTickets(){
        return ticketService.readTickets();
    }

    @PutMapping("/tickets/{id}")
    public Ticket updateTicket(@PathVariable UUID id, @RequestBody Ticket ticket){
        return ticketService.updateTicket(id, ticket);
    }

    @DeleteMapping("/tickets/{id}")
    public void deleteTicket(@PathVariable UUID id) {
        ticketService.deleteTicket(id);
    }

    @DeleteMapping("/tickets")
    public void deleteTickets(@RequestBody List<UUID> ticketIds) {
        ticketService.deleteSelectedTickets(ticketIds);
    }
}
