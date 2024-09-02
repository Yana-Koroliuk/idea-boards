package com.koroliuk.ideaboards.service;

import com.koroliuk.ideaboards.dto.IdeaDTO;
import com.koroliuk.ideaboards.model.Idea;
import com.koroliuk.ideaboards.repository.IdeaRepository;
import com.koroliuk.ideaboards.repository.SectionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IdeaService {

    private final IdeaRepository ideaRepository;
    private final SectionRepository sectionRepository;

    @Autowired
    public IdeaService(IdeaRepository ideaRepository, SectionRepository sectionRepository) {
        this.ideaRepository = ideaRepository;
        this.sectionRepository = sectionRepository;
    }

    public Idea createIdea(IdeaDTO ideaDTO) {
        sectionRepository.findById(ideaDTO.getSectionId())
                .orElseThrow(() -> new EntityNotFoundException("Section not found with id " + ideaDTO.getSectionId()));
        Idea idea =  Idea.builder()
                .content(ideaDTO.getContent())
                .votes(ideaDTO.getVotes())
                .sectionId(ideaDTO.getSectionId()).build();
        return ideaRepository.save(idea);
    }

    public Idea getIdeaById(Long id) {
        return ideaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Idea not found with id " + id));
    }

    public List<Idea> getAllIdea() {
        return ideaRepository.findAll();
    }

    public List<Idea> getIdeasBySectionId(Long sectionId) {
        return ideaRepository.findBySectionId(sectionId);
    }

    public Idea updateIdea(Long id, IdeaDTO ideaDTO) {
        Idea idea = ideaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Idea not found with id " + id));
        idea.setContent(ideaDTO.getContent());
        idea.setVotes(ideaDTO.getVotes());
        sectionRepository.findById(ideaDTO.getSectionId())
                .orElseThrow(() -> new EntityNotFoundException("Section not found with id " + ideaDTO.getSectionId()));
        idea.setSectionId(ideaDTO.getSectionId());
        return ideaRepository.save(idea);
    }

    public void deleteIdea(Long id) {
        if (!ideaRepository.existsById(id)) {
            throw new EntityNotFoundException("Idea not found with id " + id);
        }
        ideaRepository.deleteById(id);
    }
}
