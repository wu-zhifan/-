package com.dataviz.service;

import com.dataviz.entity.BusinessData;
import com.dataviz.entity.Category;
import com.dataviz.mapper.BusinessDataMapper;
import com.dataviz.mapper.CategoryMapper;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * 数据管理服务
 * 
 * @author dataviz
 */
@Service
public class DataService {

    @Autowired
    private BusinessDataMapper dataMapper;

    @Autowired
    private CategoryMapper categoryMapper;

    /**
     * 分页查询数据列表
     */
    public Map<String, Object> getDataList(Integer page, Integer size, 
                                           String categoryId, String keyword,
                                           String startDate, String endDate,
                                           Double minValue, Double maxValue) {
        Map<String, Object> params = new HashMap<>();
        if (page == null || page < 1) {
            page = 1;
        }
        params.put("offset", (page - 1) * size);
        params.put("size", size);
        params.put("categoryId", categoryId);
        params.put("keyword", keyword);
        params.put("startDate", startDate);
        params.put("endDate", endDate);
        params.put("minValue", minValue);
        params.put("maxValue", maxValue);

        List<BusinessData> data = dataMapper.findByPage(params);
        int total = dataMapper.countTotal(params);

        Map<String, Object> result = new HashMap<>();
        result.put("data", data);
        result.put("total", total);
        result.put("page", page);
        result.put("size", size);
        return result;
    }

    /**
     * 创建数据
     */
    @Transactional
    public Map<String, Object> createData(BusinessData data) {
        Map<String, Object> result = new HashMap<>();
        int rows = dataMapper.insert(data);
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "数据创建成功");
        } else {
            result.put("success", false);
            result.put("message", "数据创建失败");
        }
        return result;
    }

    /**
     * 删除数据
     */
    @Transactional
    public Map<String, Object> deleteData(Long id) {
        Map<String, Object> result = new HashMap<>();
        int rows = dataMapper.deleteById(id);
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "数据删除成功");
        } else {
            result.put("success", false);
            result.put("message", "数据删除失败");
        }
        return result;
    }

    /**
     * 获取统计数据
     */
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalCount", dataMapper.countAll());
        stats.put("monthCount", dataMapper.countMonth());
        stats.put("categoryCount", categoryMapper.count());
        stats.put("activeUsers", 5); // 模拟活跃用户数
        return stats;
    }

    /**
     * 获取图表数据（支持日期筛选）
     */
    public Map<String, Object> getChartData(Map<String, Object> filters) {
        Map<String, Object> chartData = new HashMap<>();
        
        try {
            // 获取按时间分组的图表数据并转换格式
            List<Map<String, Object>> timeData = dataMapper.findChartDataByTime();
            List<Map<String, Object>> formattedTimeData = new ArrayList<>();
            for (Map<String, Object> item : timeData) {
                Map<String, Object> formattedItem = new HashMap<>();
                formattedItem.put("name", item.get("name"));
                formattedItem.put("value", item.get("total_value"));
                formattedTimeData.add(formattedItem);
            }
            chartData.put("lineData", formattedTimeData);
            chartData.put("barData", formattedTimeData);
            
            // 获取按分类分组的图表数据（用于饼图）
            List<Map<String, Object>> categoryData = dataMapper.findChartDataByCategory();
            chartData.put("pieData", categoryData);
            
            // 获取分类统计数据（用于报表）
            List<Category> categories = categoryMapper.findAll();
            List<Map<String, Object>> categoryStats = new ArrayList<>();
            
            for (Category cat : categories) {
                List<BusinessData> dataList = dataMapper.findByCategoryId(cat.getId());
                BigDecimal total = dataList.stream()
                    .map(BusinessData::getValue)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
                
                Map<String, Object> stat = new HashMap<>();
                stat.put("name", cat.getName());
                stat.put("count", dataList.size());
                stat.put("total", total.doubleValue());
                categoryStats.add(stat);
            }
            
            chartData.put("categoryStats", categoryStats);
            chartData.put("success", true);
        } catch (Exception e) {
            e.printStackTrace();
            chartData.put("success", false);
            chartData.put("error", e.getMessage());
            chartData.put("lineData", new ArrayList<>());
            chartData.put("barData", new ArrayList<>());
            chartData.put("pieData", new ArrayList<>());
            chartData.put("categoryStats", new ArrayList<>());
        }
        
        return chartData;
    }

    private Map<String, Object> createDataMap(String name, Object value) {
        Map<String, Object> map = new HashMap<>();
        map.put("name", name);
        map.put("value", value);
        return map;
    }

    /**
     * 获取分类列表
     */
    public List<Category> getCategories() {
        return categoryMapper.findAll();
    }

    /**
     * 创建分类
     */
    @Transactional
    public Map<String, Object> createCategory(Category category) {
        Map<String, Object> result = new HashMap<>();
        int rows = categoryMapper.insert(category);
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "分类创建成功");
        } else {
            result.put("success", false);
            result.put("message", "分类创建失败");
        }
        return result;
    }

    /**
     * 删除分类
     */
    @Transactional
    public Map<String, Object> deleteCategory(Long id) {
        Map<String, Object> result = new HashMap<>();
        int rows = categoryMapper.deleteById(id);
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "分类删除成功");
        } else {
            result.put("success", false);
            result.put("message", "分类删除失败");
        }
        return result;
    }

    /**
     * 批量导入Excel数据
     */
    @Transactional
    public Map<String, Object> importExcel(MultipartFile file) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            InputStream inputStream = file.getInputStream();
            Workbook workbook = new XSSFWorkbook(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            List<BusinessData> dataList = new ArrayList<>();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

            // 遍历Excel行（跳过标题行）
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;

                BusinessData data = new BusinessData();
                data.setCategoryId(getCellLongValue(row.getCell(0)));
                data.setTitle(getCellStringValue(row.getCell(1)));
                data.setValue(new BigDecimal(getCellStringValue(row.getCell(2))));
                data.setUnit(getCellStringValue(row.getCell(3)));
                
                String timeStr = getCellStringValue(row.getCell(4));
                if (timeStr != null && !timeStr.isEmpty()) {
                    data.setTime(LocalDateTime.parse(timeStr, formatter));
                }
                
                data.setRemark(getCellStringValue(row.getCell(5)));
                dataList.add(data);
            }

            workbook.close();
            inputStream.close();

            // 批量插入数据库
            if (!dataList.isEmpty()) {
                dataMapper.batchInsert(dataList);
            }

            result.put("success", true);
            result.put("count", dataList.size());
            result.put("message", "成功导入" + dataList.size() + "条数据");

        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "导入失败: " + e.getMessage());
        }

        return result;
    }

    /**
     * 获取单元格字符串值
     */
    private String getCellStringValue(Cell cell) {
        if (cell == null) return "";
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf(cell.getNumericCellValue());
            default:
                return "";
        }
    }

    /**
     * 获取单元格长整型值
     */
    private Long getCellLongValue(Cell cell) {
        if (cell == null) return 0L;
        switch (cell.getCellType()) {
            case NUMERIC:
                return (long) cell.getNumericCellValue();
            case STRING:
                return Long.parseLong(cell.getStringCellValue());
            default:
                return 0L;
        }
    }

    /**
     * 更新数据
     */
    @Transactional
    public Map<String, Object> updateData(BusinessData data) {
        Map<String, Object> result = new HashMap<>();
        int rows = dataMapper.update(data);
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "数据更新成功");
        } else {
            result.put("success", false);
            result.put("message", "数据更新失败");
        }
        return result;
    }

    /**
     * 更新分类
     */
    @Transactional
    public Map<String, Object> updateCategory(Category category) {
        Map<String, Object> result = new HashMap<>();
        int rows = categoryMapper.update(category);
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "分类更新成功");
        } else {
            result.put("success", false);
            result.put("message", "分类更新失败");
        }
        return result;
    }

    /**
     * 获取环比统计数据
     */
    public List<Map<String, Object>> getMonthOverMonthStats() {
        return dataMapper.findMonthOverMonthStats();
    }

    /**
     * 获取同比统计数据
     */
    public List<Map<String, Object>> getYearOverYearStats() {
        return dataMapper.findYearOverYearStats();
    }

    /**
     * 获取年度汇总数据
     */
    public Map<String, Object> getYearlySummary() {
        return dataMapper.findYearlySummary();
    }

    /**
     * 获取所有分类的统计数据
     */
    public Map<String, Object> getCategoryStats() {
        Map<String, Object> result = new HashMap<>();
        
        List<Category> categories = categoryMapper.findAll();
        List<Map<String, Object>> categoryStats = new ArrayList<>();
        long totalRecords = 0;
        BigDecimal totalValue = BigDecimal.ZERO;
        
        for (Category category : categories) {
            List<BusinessData> dataList = dataMapper.findByCategoryId(category.getId());
            
            BigDecimal catTotal = dataList.stream()
                .map(BusinessData::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            int count = dataList.size();
            
            Map<String, Object> stat = new HashMap<>();
            stat.put("id", category.getId());
            stat.put("name", category.getName());
            stat.put("code", category.getCode());
            stat.put("recordCount", count);
            stat.put("totalValue", catTotal.doubleValue());
            stat.put("avgValue", count > 0 ? catTotal.divide(BigDecimal.valueOf(count), 2, java.math.RoundingMode.HALF_UP).doubleValue() : 0);
            stat.put("description", category.getRemark());
            
            categoryStats.add(stat);
            totalRecords += count;
            totalValue = totalValue.add(catTotal);
        }
        
        // 按总金额排序
        categoryStats.sort((a, b) -> Double.compare((Double) b.get("totalValue"), (Double) a.get("totalValue")));
        
        result.put("categories", categoryStats);
        result.put("totalCategories", categories.size());
        result.put("totalRecords", totalRecords);
        result.put("totalValue", totalValue.doubleValue());
        result.put("avgValue", totalRecords > 0 ? totalValue.divide(BigDecimal.valueOf(totalRecords), 2, java.math.RoundingMode.HALF_UP).doubleValue() : 0);
        
        return result;
    }

    /**
     * 导出数据
     */
    public void exportData(String categoryId, String startDate, String endDate, jakarta.servlet.http.HttpServletResponse response) {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("categoryId", categoryId);
            params.put("startDate", startDate);
            params.put("endDate", endDate);
            params.put("offset", 0);
            params.put("size", 10000); // 最大导出10000条
            
            List<BusinessData> dataList = dataMapper.findByPage(params);
            
            // 创建Excel工作簿
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Data Export");
            
            // 创建标题行
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("ID");
            headerRow.createCell(1).setCellValue("Category");
            headerRow.createCell(2).setCellValue("Title");
            headerRow.createCell(3).setCellValue("Value");
            headerRow.createCell(4).setCellValue("Unit");
            headerRow.createCell(5).setCellValue("Time");
            headerRow.createCell(6).setCellValue("Remark");
            
            // 填充数据
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            for (int i = 0; i < dataList.size(); i++) {
                BusinessData data = dataList.get(i);
                Row row = sheet.createRow(i + 1);
                row.createCell(0).setCellValue(data.getId());
                row.createCell(1).setCellValue(data.getCategoryName());
                row.createCell(2).setCellValue(data.getTitle());
                row.createCell(3).setCellValue(data.getValue().doubleValue());
                row.createCell(4).setCellValue(data.getUnit());
                row.createCell(5).setCellValue(data.getTime() != null ? data.getTime().format(formatter) : "");
                row.createCell(6).setCellValue(data.getRemark());
            }
            
            // 设置响应头
            String fileName = "data_export_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + ".xlsx";
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            
            // 写入响应
            workbook.write(response.getOutputStream());
            workbook.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}