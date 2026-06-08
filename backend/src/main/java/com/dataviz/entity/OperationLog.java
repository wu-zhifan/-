package com.dataviz.entity;

import java.time.LocalDateTime;

public class OperationLog {
    private Long id;
    private Long userId;
    private String username;
    private String operation;
    private String module;
    private String content;
    private String ipAddress;
    private LocalDateTime createTime;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getOperation() { return operation; }
    public void setOperation(String operation) { this.operation = operation; }
    
    public String getModule() { return module; }
    public void setModule(String module) { this.module = module; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    
    public LocalDateTime getCreateTime() { return createTime; }
    public void setCreateTime(LocalDateTime createTime) { this.createTime = createTime; }
}