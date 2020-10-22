package com.web.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ResouceNotFoundException extends RuntimeException {

    public ResouceNotFoundException(String message) {
        super(message);
    }

    public ResouceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
