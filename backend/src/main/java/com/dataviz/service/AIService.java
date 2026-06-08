package com.dataviz.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AIService {

    @Value("${ai.api-key}")
    private String apiKey;

    @Value("${ai.base-url}")
    private String baseUrl;

    @Value("${ai.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    private final Map<String, List<Map<String, String>>> conversationHistory = new ConcurrentHashMap<>();

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH时mm分ss秒");

    /**
     * 获取当前时间字符串
     */
    private String getCurrentTime() {
        return LocalDateTime.now(ZoneId.of("Asia/Shanghai")).format(DATE_TIME_FORMATTER);
    }

    /**
     * 构建系统提示词（包含实时时间）
     */
    private String buildSystemPrompt() {
        String currentTime = getCurrentTime();
        return "你是一个智能助手。请记住以下重要信息：\n" +
               "- 当前时间：" + currentTime + "（北京时间）\n" +
               "- 你可以回答各种日常问题，包括时间、天气、常识等\n" +
               "- 回答时请使用中文，保持友好和帮助的态度\n" +
               "- 如果涉及数据可视化平台的问题，请结合数据进行分析\n" +
               "- 当用户询问时间时，请使用上面提供的当前时间回答";
    }

    /**
     * 通用对话（支持多轮上下文）
     */
    public String chat(String userId, String userMessage) {
        try {
            String url = baseUrl + "/chat/completions";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + apiKey);

            ObjectNode requestBody = objectMapper.createObjectNode();
            requestBody.put("model", model);
            requestBody.put("temperature", 0.7);
            
            ArrayNode messages = requestBody.putArray("messages");
            
            // 添加系统提示词（包含实时时间）
            ObjectNode systemMessage = messages.addObject();
            systemMessage.put("role", "system");
            systemMessage.put("content", buildSystemPrompt());
            
            // 获取对话历史
            List<Map<String, String>> history = conversationHistory.computeIfAbsent(userId, k -> new ArrayList<>());
            
            // 添加历史消息（最多保留最近10轮）
            int startIndex = Math.max(0, history.size() - 10);
            for (int i = startIndex; i < history.size(); i++) {
                Map<String, String> msg = history.get(i);
                ObjectNode historyMessage = messages.addObject();
                historyMessage.put("role", msg.get("role"));
                historyMessage.put("content", msg.get("content"));
            }
            
            // 添加当前用户消息
            ObjectNode userMsg = messages.addObject();
            userMsg.put("role", "user");
            userMsg.put("content", userMessage);
            
            // 保存到历史
            Map<String, String> userRecord = new HashMap<>();
            userRecord.put("role", "user");
            userRecord.put("content", userMessage);
            history.add(userRecord);

            HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                JsonNode root = objectMapper.readTree(response.getBody());
                String reply = root.path("choices").get(0).path("message").path("content").asText();
                
                // 保存AI回复到历史
                Map<String, String> assistantRecord = new HashMap<>();
                assistantRecord.put("role", "assistant");
                assistantRecord.put("content", reply);
                history.add(assistantRecord);
                
                return reply;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "抱歉，AI服务暂时不可用，请稍后重试。";
        }
        return "分析失败，请稍后重试。";
    }
    
    /**
     * 简化版对话接口（兼容旧接口）
     */
    public String chat(String userMessage) {
        return chat("default-user", userMessage);
    }
    
    /**
     * 清空对话历史
     */
    public void clearHistory(String userId) {
        conversationHistory.remove(userId);
    }

    /**
     * 分析数据趋势
     */
    public String analyzeDataTrend(String dataContext) {
        String prompt = "你是一个专业的数据分析师。请分析以下数据，并给出：\n" +
                "1. 数据趋势分析\n" +
                "2. 关键发现\n" +
                "3. 改进建议\n\n" +
                "数据：\n" + dataContext;
        return chat(prompt);
    }

    /**
     * 生成数据报告
     */
    public String generateReport(String statistics) {
        String prompt = "你是一个专业的商业智能分析师。请基于以下统计数据生成一份简洁的业务报告：\n\n" +
                statistics + "\n\n" +
                "请用中文回答，格式清晰，包含：摘要、关键指标、趋势分析、建议。";
        return chat(prompt);
    }

    /**
     * 回答数据相关问题
     */
    public String answerDataQuestion(String question, String dataContext) {
        String prompt = "你是一个数据可视化平台的智能助手。请基于以下数据回答用户问题。\n\n" +
                "数据上下文：\n" + dataContext + "\n\n" +
                "用户问题：" + question;
        return chat(prompt);
    }
}
