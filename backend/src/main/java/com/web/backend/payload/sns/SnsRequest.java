package com.web.backend.payload.sns;

import lombok.Data;

import java.util.ArrayList;

@Data
public class SnsRequest {
    ArrayList<String> tags;
}
