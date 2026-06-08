package com.dataviz.controller;

import com.dataviz.entity.BusinessData;
import com.dataviz.entity.Category;
import com.dataviz.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

/**
 * 数据管理控制器
 * 
 * @author dataviz
 */
@RestController
@RequestMapping("/api/data")
@CrossOrigin(origins = "*")
public class DataController {

    @Autowired
    private DataService dataService;

    /**
     * 分页查询数据列表
     */
    @GetMapping("/list")
    public Map<String, Object> getDataList(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) Double minValue,
            @RequestParam(required = false) Double maxValue) {
        return dataService.getDataList(page, size, categoryId, keyword, startDate, endDate, minValue, maxValue);
    }

    /**
     * 创建数据
     */
    @PostMapping
    public Map<String, Object> createData(@RequestBody BusinessData data) {
        return dataService.createData(data);
    }

    /**
     * 删除数据
     */
    @DeleteMapping("/{id}")
    public Map<String, Object> deleteData(@PathVariable Long id) {
        return dataService.deleteData(id);
    }

    /**
     * 批量导入Excel数据
     */
    @PostMapping("/import")
    public Map<String, Object> importExcel(@RequestParam("file") MultipartFile file) {
        return dataService.importExcel(file);
    }

    /**
     * 获取统计数据
     */
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        return dataService.getStats();
    }

    /**
     * 获取图表数据
     */
    @PostMapping("/chart-data")
    public Map<String, Object> getChartData(@RequestBody Map<String, Object> filters) {
        return dataService.getChartData(filters);
    }

    /**
     * 获取分类列表
     */
    @GetMapping("/categories")
    public List<Category> getCategories() {
        return dataService.getCategories();
    }

    /**
     * 创建分类
     */
    @PostMapping("/categories")
    public Map<String, Object> createCategory(@RequestBody Category category) {
        return dataService.createCategory(category);
    }

    /**
     * 删除分类
     */
    @DeleteMapping("/categories/{id}")
    public Map<String, Object> deleteCategory(@PathVariable Long id) {
        return dataService.deleteCategory(id);
    }

    /**
     * 更新分类
     */
    @PutMapping("/categories/{id}")
    public Map<String, Object> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        category.setId(id);
        return dataService.updateCategory(category);
    }

    /**
     * 更新数据
     */
    @PutMapping("/{id}")
    public Map<String, Object> updateData(@PathVariable Long id, @RequestBody BusinessData data) {
        data.setId(id);
        return dataService.updateData(data);
    }

    /**
     * 获取环比统计数据
     */
    @GetMapping("/stats/month-over-month")
    public List<Map<String, Object>> getMonthOverMonthStats() {
        return dataService.getMonthOverMonthStats();
    }

    /**
     * 获取同比统计数据
     */
    @GetMapping("/stats/year-over-year")
    public List<Map<String, Object>> getYearOverYearStats() {
        return dataService.getYearOverYearStats();
    }

    /**
     * 获取年度汇总数据
     */
    @GetMapping("/stats/yearly-summary")
    public Map<String, Object> getYearlySummary() {
        return dataService.getYearlySummary();
    }

    /**
     * 导出数据为Excel
     */
    @GetMapping("/export")
    public void exportData(
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            jakarta.servlet.http.HttpServletResponse response) {
        dataService.exportData(categoryId, startDate, endDate, response);
    }

    /**
     * 获取所有分类的统计数据
     */
    @GetMapping("/stats/categories")
    public Map<String, Object> getCategoryStats() {
        return dataService.getCategoryStats();
    }
}