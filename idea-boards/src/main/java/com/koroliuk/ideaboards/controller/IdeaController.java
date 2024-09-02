package com.koroliuk.ideaboards.controller;

import com.koroliuk.ideaboards.dto.IdeaDTO;
import com.koroliuk.ideaboards.model.Idea;
import com.koroliuk.ideaboards.service.IdeaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ideas")
@CrossOrigin(origins = "http://localhost:3000")
public class IdeaController {

    private final IdeaService ideaService;

    @Autowired
    public IdeaController(IdeaService ideaService) {
        this.ideaService = ideaService;
    }

    @PostMapping
    public ResponseEntity<?> createIdea(@Valid @RequestBody IdeaDTO ideaDTO) {
        Idea newIdea = ideaService.createIdea(ideaDTO);
        return new ResponseEntity<>(newIdea, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Idea> getIdea(@PathVariable Long id) {
        Idea idea = ideaService.getIdeaById(id);
        return ResponseEntity.ok(idea);
    }

    @GetMapping
    public ResponseEntity<List<Idea>> getAllIdea() {
        List<Idea> ideas = ideaService.getAllIdea();
        return ResponseEntity.ok(ideas);
    }

    @GetMapping("/section/{sectionId}")
    public ResponseEntity<List<Idea>> getIdeasBySection(@PathVariable Long sectionId) {
        List<Idea> ideas = ideaService.getIdeasBySectionId(sectionId);
        return ResponseEntity.ok(ideas);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateIdea(@PathVariable Long id, @Valid @RequestBody IdeaDTO ideaDTO) {
        Idea updatedIdea = ideaService.updateIdea(id, ideaDTO);
        return ResponseEntity.ok(updatedIdea);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIdea(@PathVariable Long id) {
        ideaService.deleteIdea(id);
        return ResponseEntity.noContent().build();
    }
}