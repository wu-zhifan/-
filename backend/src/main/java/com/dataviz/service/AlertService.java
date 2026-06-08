package com.dataviz.service;

import com.dataviz.entity.DataAlert;
import com.dataviz.mapper.DataAlertMapper;
import com.dataviz.mapper.BusinessDataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Service
public class AlertService {

    @Autowired
    private DataAlertMapper alertMapper;

    @Autowired
    private BusinessDataMapper dataMapper;

    /**
     * 获取所有预警配置
     */
    public List<DataAlert> getAllAlerts() {
        return alertMapper.findAll();
    }

    /**
     * 获取启用的预警配置
     */
    public List<DataAlert> getActiveAlerts() {
        return alertMapper.findAllActive();
    }

    /**
     * 获取预警详情
     */
    public DataAlert getAlertById(Long id) {
        return alertMapper.findById(id);
    }

    /**
     * 创建预警配置
     */
    @Transactional
    public Map<String, Object> createAlert(DataAlert alert) {
        Map<String, Object> result = new HashMap<>();
        alert.setStatus(1);
        int rows = alertMapper.insert(alert);
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "预警配置创建成功");
            result.put("alert", alert);
        } else {
            result.put("success", false);
            result.put("message", "预警配置创建失败");
        }
        return result;
    }

    /**
     * 更新预警配置
     */
    @Transactional
    public Map<String, Object> updateAlert(DataAlert alert) {
        Map<String, Object> result = new HashMap<>();
        int rows = alertMapper.update(alert);
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "预警配置更新成功");
            result.put("alert", alertMapper.findById(alert.getId()));
        } else {
            result.put("success", false);
            result.put("message", "预警配置更新失败");
        }
        return result;
    }

    /**
     * 删除预警配置
     */
    @Transactional
    public Map<String, Object> deleteAlert(Long id) {
        Map<String, Object> result = new HashMap<>();
        int rows = alertMapper.delete(id);
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "预警配置删除成功");
        } else {
            result.put("success", false);
            result.put("message", "预警配置删除失败");
        }
        return result;
    }

    /**
     * 检查预警触发
     */
    public List<Map<String, Object>> checkAlerts() {
        List<Map<String, Object>> triggeredAlerts = new ArrayList<>();
        List<DataAlert> alerts = alertMapper.findAllActive();
        
        // 获取年度汇总数据
        Map<String, Object> summary = dataMapper.findYearlySummary();
        BigDecimal totalValue = new BigDecimal(summary.get("totalValue").toString());
        
        for (DataAlert alert : alerts) {
            boolean triggered = false;
            BigDecimal threshold = alert.getThresholdValue();
            
            switch (alert.getComparisonType()) {
                case "GT": // 大于
                    triggered = totalValue.compareTo(threshold) > 0;
                    break;
                case "LT": // 小于
                    triggered = totalValue.compareTo(threshold) < 0;
                    break;
                case "EQ": // 等于
                    triggered = totalValue.compareTo(threshold) == 0;
                    break;
            }
            
            if (triggered) {
                Map<String, Object> alertResult = new HashMap<>();
                alertResult.put("alert", alert);
                alertResult.put("currentValue", totalValue);
                alertResult.put("triggered", true);
                triggeredAlerts.add(alertResult);
            }
        }
        
        return triggeredAlerts;
    }

    /**
     * 获取预警统计
     */
    public Map<String, Object> getAlertStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalAlerts", alertMapper.findAll().size());
        stats.put("activeAlerts", alertMapper.countActive());
        stats.put("triggeredAlerts", checkAlerts().size());
        return stats;
    }
}