package com.zurkie.ticketingtool.service;

import com.zurkie.ticketingtool.model.Subtask;
import com.zurkie.ticketingtool.repository.SubtaskRepository;
import org.springframework.stereotype.Service;

@Service
public class SubtaskService {

    private final SubtaskRepository subtaskRepository;

    public SubtaskService(SubtaskRepository subtaskRepository) {
        this.subtaskRepository = subtaskRepository;
    }

    public Subtask readSubtask(Long id) {
        return subtaskRepository.findById(id)
                .orElse(null);
    }

    public Subtask updateSubtask(Long id, Subtask updatedSubtask) {

        Subtask existingSubtask = subtaskRepository.findById(id)
                .orElse(null);

        if (existingSubtask == null) {
            return null;
        }

        existingSubtask.setTitle(updatedSubtask.getTitle());
        existingSubtask.setStatus(updatedSubtask.getStatus());

        return subtaskRepository.save(existingSubtask);
    }
}
