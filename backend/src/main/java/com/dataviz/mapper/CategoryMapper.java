package com.dataviz.mapper;

import com.dataviz.entity.Category;
import org.apache.ibatis.annotations.*;
import java.util.List;

/**
 * 分类Mapper接口
 * 
 * @author dataviz
 */
@Mapper
public interface CategoryMapper {

    /**
     * 查询所有分类
     */
    @Select("SELECT * FROM sys_category ORDER BY sort_order ASC, id ASC")
    List<Category> findAll();

    /**
     * 根据ID查询分类
     */
    @Select("SELECT * FROM sys_category WHERE id = #{id}")
    Category findById(Long id);

    /**
     * 根据父ID查询子分类
     */
    @Select("SELECT * FROM sys_category WHERE parent_id = #{parentId} ORDER BY sort_order ASC")
    List<Category> findByParentId(Long parentId);

    /**
     * 插入分类
     */
    @Insert("INSERT INTO sys_category(name, parent_id, sort_order, create_time) " +
            "VALUES(#{name}, #{parentId}, #{sortOrder}, NOW())")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Category category);

    /**
     * 更新分类
     */
    @Update("UPDATE sys_category SET name = #{name}, parent_id = #{parentId}, " +
            "sort_order = #{sortOrder} WHERE id = #{id}")
    int update(Category category);

    /**
     * 删除分类
     */
    @Delete("DELETE FROM sys_category WHERE id = #{id}")
    int deleteById(Long id);

    /**
     * 统计分类数量
     */
    @Select("SELECT COUNT(*) FROM sys_category")
    int count();
}