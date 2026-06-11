package com.dataviz.service;

import com.dataviz.mapper.BusinessDataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.Random;

@Service
public class DataInitService {

    @Autowired
    private BusinessDataMapper businessDataMapper;

    private final Random random = new Random();

    @Transactional
    public void initCurrentYearData() {
        int currentYear = LocalDate.now().getYear();
        
        int existingCount = businessDataMapper.countByYear(currentYear);
        if (existingCount > 0) {
            System.out.println("当前年份 " + currentYear + " 的数据已存在，跳过初始化");
            return;
        }

        int currentMonth = LocalDate.now().getMonthValue();

        for (int month = 1; month <= currentMonth; month++) {
            YearMonth yearMonth = YearMonth.of(currentYear, month);
            LocalDateTime time = yearMonth.atEndOfMonth().atStartOfDay();
            
            double salesValue = 300000 + random.nextDouble() * 200000;
            double revenueValue = salesValue * 0.75 + random.nextDouble() * 20000;
            int activeUsers = 1500 + random.nextInt(800);
            int newCustomers = 500 + random.nextInt(300);

            insertBizData(1, currentYear, month, salesValue, "CNY", time, "Monthly Sales");
            insertBizData(3, currentYear, month, revenueValue, "CNY", time, "Monthly Revenue");
            insertBizData(7, currentYear, month, (double) activeUsers, "people", time, "Active Users");
            insertBizData(10, currentYear, month, (double) newCustomers, "people", time, "New Customers");
        }
    }

    private void insertBizData(int categoryId, int year, int month, double value, String unit, 
                               LocalDateTime time, String remark) {
        String title = String.format("%d-%02d %s", year, month, remark);
        businessDataMapper.insertDynamicData(title, value, unit, time, categoryId, remark, 1);
    }
}
