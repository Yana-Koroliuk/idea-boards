package com.koroliuk.ideaboards.repository;

import com.koroliuk.ideaboards.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface SectionRepository extends JpaRepository<Section, Long> {
    List<Section> findByBoardId(Long boardId);
}
