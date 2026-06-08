package com.dataviz.mapper;

import com.dataviz.entity.OperationLog;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface OperationLogMapper {

    @Select("SELECT * FROM sys_log WHERE id = #{id}")
    OperationLog findById(Long id);

    @Select("SELECT * FROM sys_log ORDER BY create_time DESC LIMIT #{offset}, #{size}")
    List<OperationLog> findAll(@Param("offset") int offset, @Param("size") int size);

    @Select("SELECT * FROM sys_log WHERE user_id = #{userId} ORDER BY create_time DESC LIMIT #{offset}, #{size}")
    List<OperationLog> findByUserId(@Param("userId") Long userId, @Param("offset") int offset, @Param("size") int size);

    @Select("SELECT COUNT(*) FROM sys_log")
    int count();

    @Select("SELECT COUNT(*) FROM sys_log WHERE user_id = #{userId}")
    int countByUserId(Long userId);

    @Insert("INSERT INTO sys_log (user_id, username, operation, module, content, ip_address, create_time) " +
            "VALUES (#{userId}, #{username}, #{operation}, #{module}, #{content}, #{ipAddress}, CURRENT_TIMESTAMP)")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(OperationLog log);

    @Delete("DELETE FROM sys_log WHERE id = #{id}")
    int delete(Long id);
}