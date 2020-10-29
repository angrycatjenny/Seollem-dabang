package com.web.backend.exception;

public class ByteConvertException extends RuntimeException{

    public ByteConvertException(String message) { super(message); }

    public ByteConvertException(String message, Throwable cause) { super(message, cause); }
}
