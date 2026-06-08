package com.dataviz.mapper;

import com.dataviz.entity.DataAlert;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DataAlertMapper {

    @Select("SELECT a.*, c.name as category_name FROM sys_alert a " +
            "LEFT JOIN sys_category c ON a.category_id = c.id " +
            "WHERE a.id = #{id}")
    DataAlert findById(Long id);

    @Select("SELECT a.*, c.name as category_name FROM sys_alert a " +
            "LEFT JOIN sys_category c ON a.category_id = c.id " +
            "WHERE a.status = 1 ORDER BY a.create_time DESC")
    List<DataAlert> findAllActive();

    @Select("SELECT a.*, c.name as category_name FROM sys_alert a " +
            "LEFT JOIN sys_category c ON a.category_id = c.id " +
            "ORDER BY a.create_time DESC")
    List<DataAlert> findAll();

    @Insert("INSERT INTO sys_alert (category_id, alert_type, threshold_value, comparison_type, alert_message, status, create_time) " +
            "VALUES (#{categoryId}, #{alertType}, #{thresholdValue}, #{comparisonType}, #{alertMessage}, #{status}, CURRENT_TIMESTAMP)")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(DataAlert alert);

    @Update("UPDATE sys_alert SET category_id = #{categoryId}, alert_type = #{alertType}, " +
            "threshold_value = #{thresholdValue}, comparison_type = #{comparisonType}, " +
            "alert_message = #{alertMessage}, status = #{status} WHERE id = #{id}")
    int update(DataAlert alert);

    @Delete("DELETE FROM sys_alert WHERE id = #{id}")
    int delete(Long id);

    @Select("SELECT COUNT(*) FROM sys_alert WHERE status = 1")
    int countActive();
}