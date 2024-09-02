package com.koroliuk.ideaboards.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.util.List;


@Getter
@Setter
public class BoardCreateDTO {

    @NotBlank(message = "Board name should not be blank")
    private String name;

    @NotBlank(message = "Board description should not be blank")
    private String description;

    @Size(min = 1, message = "At least one section title is required")
    private List<@NotBlank(message = "Section title should not be blank") String> sectionTitles;

}


