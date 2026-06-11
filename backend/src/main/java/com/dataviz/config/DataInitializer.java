package com.dataviz.config;

import com.dataviz.service.DataInitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private DataInitService dataInitService;

    @Override
    public void run(String... args) throws Exception {
        try {
            dataInitService.initCurrentYearData();
            System.out.println("========================================");
            System.out.println("当前年份数据初始化完成！");
            System.out.println("========================================");
        } catch (Exception e) {
            System.err.println("数据初始化失败: " + e.getMessage());
        }
    }
}
