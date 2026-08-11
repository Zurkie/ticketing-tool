package com.zurkie.ticketingtool.repository;

import com.zurkie.ticketingtool.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    List<Ticket> findAllByOrderByCreatedAtAsc();
    Optional<Ticket> findFirstByTicketNumberStartingWithOrderByTicketNumberDesc(String prefix);
}
