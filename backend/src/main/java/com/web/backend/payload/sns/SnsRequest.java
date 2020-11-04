package com.web.backend.payload.sns;

import com.web.backend.model.tag.Tag;
import lombok.Data;

import java.util.ArrayList;

@Data
public class SnsRequest {
    ArrayList<String> tags;
}
