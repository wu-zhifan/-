package com.dataviz.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 数据分类实体类
 * 
 * @author dataviz
 */
@Data
public class Category {
    /** 分类ID */
    private Long id;
    
    /** 分类名称 */
    private String name;
    
    /** 分类编码 */
    private String code;
    
    /** 父级分类ID */
    private Long parentId;
    
    /** 排序号 */
    private Integer sortOrder;
    
    /** 备注 */
    private String remark;
    
    /** 创建时间 */
    private LocalDateTime createTime;
}