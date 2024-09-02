package com.koroliuk.ideaboards.service;

import com.koroliuk.ideaboards.dto.SectionDTO;
import com.koroliuk.ideaboards.model.Section;
import com.koroliuk.ideaboards.repository.BoardRepository;
import com.koroliuk.ideaboards.repository.IdeaRepository;
import com.koroliuk.ideaboards.repository.SectionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionService {

    private final SectionRepository sectionRepository;
    private final BoardRepository boardRepository;

    @Autowired
    public SectionService(SectionRepository sectionRepository, BoardRepository boardRepository, IdeaRepository ideaRepository) {
        this.sectionRepository = sectionRepository;
        this.boardRepository = boardRepository;
    }

    public Section createSection(SectionDTO sectionDTO) {
        boardRepository.findById(sectionDTO.getBoardId())
                .orElseThrow(() -> new EntityNotFoundException("Board not found with id " + sectionDTO.getBoardId()));
        Section section = Section.builder()
                .title(sectionDTO.getTitle())
                .boardId(sectionDTO.getBoardId()).build();
        return sectionRepository.save(section);
    }

    public Section getSectionById(Long id) {
        return sectionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Section not found with id " + id));
    }
    public List<Section> getAllSection() {
        return sectionRepository.findAll();
    }

    public List<Section> getAllSectionsByBoardId(Long boardId) {
        return sectionRepository.findByBoardId(boardId);
    }

    public Section updateSection(Long id, SectionDTO sectionDTO) {
        Section section = sectionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Section not found with id " + id));
        section.setTitle(sectionDTO.getTitle());
        boardRepository.findById(sectionDTO.getBoardId())
                .orElseThrow(() -> new EntityNotFoundException("Board not found with id " + sectionDTO.getBoardId()));
        section.setBoardId(sectionDTO.getBoardId());
        return sectionRepository.save(section);
    }

    public void deleteSection(Long id) {
        if (!sectionRepository.existsById(id)) {
            throw new EntityNotFoundException("Section not found with id " + id);
        }
        sectionRepository.deleteById(id);
    }
}