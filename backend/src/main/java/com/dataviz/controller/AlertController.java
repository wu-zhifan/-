package com.dataviz.controller;

import com.dataviz.entity.DataAlert;
import com.dataviz.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alert")
@CrossOrigin(origins = "*")
public class AlertController {

    @Autowired
    private AlertService alertService;

    /**
     * 获取所有预警配置
     */
    @GetMapping("/list")
    public List<DataAlert> getAllAlerts() {
        return alertService.getAllAlerts();
    }

    /**
     * 获取启用的预警配置
     */
    @GetMapping("/active")
    public List<DataAlert> getActiveAlerts() {
        return alertService.getActiveAlerts();
    }

    /**
     * 获取预警详情
     */
    @GetMapping("/{id}")
    public DataAlert getAlertById(@PathVariable Long id) {
        return alertService.getAlertById(id);
    }

    /**
     * 创建预警配置
     */
    @PostMapping("/create")
    public Map<String, Object> createAlert(@RequestBody DataAlert alert) {
        return alertService.createAlert(alert);
    }

    /**
     * 更新预警配置
     */
    @PostMapping("/update")
    public Map<String, Object> updateAlert(@RequestBody DataAlert alert) {
        return alertService.updateAlert(alert);
    }

    /**
     * 删除预警配置
     */
    @PostMapping("/delete/{id}")
    public Map<String, Object> deleteAlert(@PathVariable Long id) {
        return alertService.deleteAlert(id);
    }

    /**
     * 检查预警触发
     */
    @GetMapping("/check")
    public List<Map<String, Object>> checkAlerts() {
        return alertService.checkAlerts();
    }

    /**
     * 获取预警统计
     */
    @GetMapping("/stats")
    public Map<String, Object> getAlertStats() {
        return alertService.getAlertStats();
    }
}