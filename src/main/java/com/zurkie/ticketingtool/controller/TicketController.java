package com.zurkie.ticketingtool.controller;

import com.zurkie.ticketingtool.model.Ticket;
import com.zurkie.ticketingtool.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService){
        this.ticketService = ticketService;
    }

    @PostMapping("/tickets")
    public Ticket createTicket(@RequestBody Ticket ticket){
        return ticketService.createTicket(ticket);
    }

    @GetMapping("/tickets/{id}")
    public Ticket readTicket(@PathVariable Long id){
        return ticketService.readTicket(id);
    }

    @GetMapping("/tickets")
    public List<Ticket> readTickets(){
        return ticketService.readTickets();
    }

    @PutMapping("/tickets/{id}")
    public Ticket updateTicket(@PathVariable Long id, @RequestBody Ticket ticket){
        return ticketService.updateTicket(id, ticket);
    }

    @DeleteMapping("/tickets/{id}")
    public void deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
    }

    @DeleteMapping("/tickets")
    public void deleteTickets(@RequestBody List<Long> ticketIds) {
        ticketService.deleteSelectedTickets(ticketIds);
    }
}
