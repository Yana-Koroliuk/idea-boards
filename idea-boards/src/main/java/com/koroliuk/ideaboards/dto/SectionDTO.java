package com.koroliuk.ideaboards.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
public class SectionDTO {

    @NotBlank(message = "Title should not be blank")
    private String title;

    @NotNull(message = "BoardId should not be null")
    private Long boardId;
}
