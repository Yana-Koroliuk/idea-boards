package com.koroliuk.ideaboards.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@Getter
@Setter
public class IdeaDTO {

    private String content;

    @PositiveOrZero(message = "Votes cannot be negative")
    private int votes;

    @NotNull(message = "SectionId should not be null")
    private Long sectionId;
}
