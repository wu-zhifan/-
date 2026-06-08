package com.dataviz.entity;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 业务数据实体类
 * 
 * @author dataviz
 */
@Data
public class BusinessData {
    /** 数据ID */
    private Long id;
    
    /** 所属分类ID */
    private Long categoryId;
    
    /** 数据标题 */
    private String title;
    
    /** 数据值 */
    private BigDecimal value;
    
    /** 单位 */
    private String unit;
    
    /** 时间 */
    private LocalDateTime time;
    
    /** 备注 */
    private String remark;
    
    /** 创建时间 */
    private LocalDateTime createTime;
    
    /** 分类名称（关联查询） */
    private String categoryName;
}