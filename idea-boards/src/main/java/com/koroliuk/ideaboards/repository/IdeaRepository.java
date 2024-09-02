package com.koroliuk.ideaboards.repository;

import com.koroliuk.ideaboards.model.Idea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IdeaRepository extends JpaRepository<Idea, Long> {
    List<Idea> findBySectionId(Long sectionId);
}