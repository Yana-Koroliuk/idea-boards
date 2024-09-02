package com.koroliuk.ideaboards.service;

import com.koroliuk.ideaboards.dto.BoardCreateDTO;
import com.koroliuk.ideaboards.dto.BoardDTO;
import com.koroliuk.ideaboards.model.Board;
import com.koroliuk.ideaboards.model.Section;
import com.koroliuk.ideaboards.model.User;
import com.koroliuk.ideaboards.repository.BoardRepository;
import com.koroliuk.ideaboards.repository.SectionRepository;
import com.koroliuk.ideaboards.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final SectionRepository sectionRepository;
    private final UserRepository userRepository;

    @Autowired
    public BoardService(BoardRepository boardRepository, SectionRepository sectionRepository, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.sectionRepository = sectionRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Board createBoardWithSections(BoardCreateDTO boardCreateDTO) {
        User user = getCurrentUser();

        Board board = Board.builder()
                .name(boardCreateDTO.getName())
                .description(boardCreateDTO.getDescription())
                .userId(user.getId())
                .build();
        board = boardRepository.save(board);

        for (String sectionTitle : boardCreateDTO.getSectionTitles()) {
            Section section = Section.builder()
                    .title(sectionTitle)
                    .boardId(board.getId())
                    .build();
            sectionRepository.save(section);
        }

        return board;
    }

    public Board getBoardById(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Board not found with id: " + id));
    }

    public List<Board> getAllBoardsForCurrentUser() {
        User user = getCurrentUser();
        return boardRepository.findByUserId(user.getId());
    }

    public Board updateBoard(Long id, BoardDTO boardDTO) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Board not found with id: " + id));
        board.setName(boardDTO.getName());
        board.setDescription(boardDTO.getDescription());
        return boardRepository.save(board);
    }

    public void deleteBoard(Long id) {
        if (!boardRepository.existsById(id)) {
            throw new EntityNotFoundException("Board not found with id: " + id);
        }
        boardRepository.deleteById(id);
    }

    private User getCurrentUser() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByEmail(email);
    }
}
