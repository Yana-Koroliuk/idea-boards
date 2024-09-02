package com.koroliuk.ideaboards.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
public class BoardDTO {

    @NotBlank(message = "Board name should not be blank")
    private String name;

    @NotBlank(message = "Board description should not be blank")
    private String description;

}

