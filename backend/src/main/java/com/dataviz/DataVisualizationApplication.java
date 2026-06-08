package com.dataviz;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 智慧数据可视化管理平台 - SpringBoot启动类
 * 
 * @author dataviz
 * @version 1.0.0
 */
@SpringBootApplication
@MapperScan("com.dataviz.mapper")
public class DataVisualizationApplication {

    public static void main(String[] args) {
        SpringApplication.run(DataVisualizationApplication.class, args);
        System.out.println("========================================");
        System.out.println("智慧数据可视化管理平台启动成功！");
        System.out.println("访问地址: http://localhost:8080/api");
        System.out.println("========================================");
    }
}