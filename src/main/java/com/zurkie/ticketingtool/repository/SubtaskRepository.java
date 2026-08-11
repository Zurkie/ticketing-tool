package com.zurkie.ticketingtool.repository;

import com.zurkie.ticketingtool.model.Subtask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SubtaskRepository extends JpaRepository<Subtask, UUID> {

    List<Subtask> findByTicketIdOrderByIdAsc(UUID ticketId);
}