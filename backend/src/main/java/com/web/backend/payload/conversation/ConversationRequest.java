package com.web.backend.payload.conversation;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@NotNull
public class ConversationRequest {
    Long questionId;
}
