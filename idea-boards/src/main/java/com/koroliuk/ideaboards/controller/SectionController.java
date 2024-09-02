package com.koroliuk.ideaboards.controller;


import com.koroliuk.ideaboards.dto.SectionDTO;
import com.koroliuk.ideaboards.model.Section;
import com.koroliuk.ideaboards.service.SectionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/sections")
@CrossOrigin(origins = "http://localhost:3000")
public class SectionController {

    private final SectionService sectionService;

    @Autowired
    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @PostMapping
    public ResponseEntity<?> createSection(@Valid @RequestBody SectionDTO sectionDTO) {
        Section newSection = sectionService.createSection(sectionDTO);
        return new ResponseEntity<>(newSection, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Section> getSection(@PathVariable Long id) {
        Section section = sectionService.getSectionById(id);
        return ResponseEntity.ok(section);
    }

    @GetMapping
    public ResponseEntity<List<Section>> getAllBoards() {
        List<Section> sections = sectionService.getAllSection();
        return ResponseEntity.ok(sections);
    }

    @GetMapping("/board/{boardId}")
    public ResponseEntity<List<Section>> getAllSectionsForBoard(@PathVariable Long boardId) {
        List<Section> sections = sectionService.getAllSectionsByBoardId(boardId);
        return ResponseEntity.ok(sections);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSection(@PathVariable Long id, @Valid @RequestBody SectionDTO sectionDTO) {
        Section updatedSection = sectionService.updateSection(id, sectionDTO);
        return ResponseEntity.ok(updatedSection);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSection(@PathVariable Long id) {
        sectionService.deleteSection(id);
        return ResponseEntity.noContent().build();
    }

}
