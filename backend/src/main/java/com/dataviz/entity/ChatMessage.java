package com.dataviz.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChatMessage {
    private Long id;
    private String userId;
    private String role;        // "user" 或 "assistant"
    private String content;     // 消息内容
    private LocalDateTime createdAt;  // 创建时间
}
