package com.dataviz.controller;

import com.dataviz.service.AIService;
import com.dataviz.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    @Autowired
    private AIService aiService;

    @Autowired
    private DataService dataService;

    /**
     * 通用对话（支持多轮上下文）
     */
    @PostMapping("/chat")
    public Map<String, Object> chat(@RequestBody Map<String, String> request) {
        Map<String, Object> result = new HashMap<>();
        try {
            String message = request.get("message");
            String userId = request.getOrDefault("userId", "default-user");
            String response = aiService.chat(userId, message);
            result.put("success", true);
            result.put("data", response);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        return result;
    }
    
    /**
     * 清空对话历史
     */
    @PostMapping("/clear-history")
    public Map<String, Object> clearHistory(@RequestBody Map<String, String> request) {
        Map<String, Object> result = new HashMap<>();
        try {
            String userId = request.getOrDefault("userId", "default-user");
            aiService.clearHistory(userId);
            result.put("success", true);
            result.put("message", "对话历史已清空");
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        return result;
    }

    /**
     * 获取对话历史
     */
    @GetMapping("/history")
    public Map<String, Object> getHistory(@RequestParam(required = false, defaultValue = "default-user") String userId) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("success", true);
            result.put("data", aiService.getHistory(userId));
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        return result;
    }

    /**
     * 分析当前数据趋势
     */
    @PostMapping("/analyze")
    public Map<String, Object> analyzeData() {
        Map<String, Object> result = new HashMap<>();
        try {
            Map<String, Object> chartData = dataService.getChartData(new HashMap<>());
            String dataContext = buildDataContext(chartData);
            String analysis = aiService.analyzeDataTrend(dataContext);
            result.put("success", true);
            result.put("data", analysis);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        return result;
    }

    /**
     * 生成报告
     */
    @PostMapping("/report")
    public Map<String, Object> generateReport() {
        Map<String, Object> result = new HashMap<>();
        try {
            Map<String, Object> chartData = dataService.getChartData(new HashMap<>());
            String statistics = buildDataContext(chartData);
            String report = aiService.generateReport(statistics);
            result.put("success", true);
            result.put("data", report);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        return result;
    }

    /**
     * 回答数据问题
     */
    @PostMapping("/question")
    public Map<String, Object> answerQuestion(@RequestBody Map<String, String> request) {
        Map<String, Object> result = new HashMap<>();
        try {
            String question = request.get("question");
            Map<String, Object> chartData = dataService.getChartData(new HashMap<>());
            String dataContext = buildDataContext(chartData);
            String answer = aiService.answerDataQuestion(question, dataContext);
            result.put("success", true);
            result.put("data", answer);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        return result;
    }

    /**
     * 构建数据上下文
     */
    private String buildDataContext(Map<String, Object> chartData) {
        StringBuilder context = new StringBuilder();
        context.append("数据概览：\n");
        
        if (chartData.containsKey("lineData")) {
            context.append("- 趋势数据：").append(chartData.get("lineData")).append("\n");
        }
        if (chartData.containsKey("barData")) {
            context.append("- 分类数据：").append(chartData.get("barData")).append("\n");
        }
        if (chartData.containsKey("pieData")) {
            context.append("- 占比数据：").append(chartData.get("pieData")).append("\n");
        }
        
        return context.toString();
    }
}
