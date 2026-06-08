package com.dataviz.mapper;

import com.dataviz.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    @Select("SELECT u.*, r.role_name, r.role_code, r.permissions FROM sys_user u LEFT JOIN sys_role r ON u.role_id = r.id WHERE u.id = #{id}")
    User findById(Long id);

    @Select("SELECT u.*, r.role_name, r.role_code, r.permissions FROM sys_user u LEFT JOIN sys_role r ON u.role_id = r.id WHERE u.username = #{username}")
    User findByUsername(String username);

    @Select("SELECT u.*, r.role_name, r.role_code, r.permissions FROM sys_user u LEFT JOIN sys_role r ON u.role_id = r.id ORDER BY u.create_time DESC")
    List<User> findAll();

    @Select("SELECT u.*, r.role_name, r.role_code, r.permissions FROM sys_user u LEFT JOIN sys_role r ON u.role_id = r.id " +
            "WHERE (#{keyword} = '' OR u.username LIKE CONCAT('%', #{keyword}, '%') OR u.real_name LIKE CONCAT('%', #{keyword}, '%')) " +
            "AND (#{roleId} = 0 OR u.role_id = #{roleId}) " +
            "AND (#{status} = -1 OR u.status = #{status}) " +
            "ORDER BY u.create_time DESC LIMIT #{offset}, #{size}")
    List<User> findByConditions(@Param("keyword") String keyword, @Param("roleId") Long roleId, 
                                @Param("status") Integer status, @Param("offset") int offset, @Param("size") int size);

    @Select("SELECT COUNT(*) FROM sys_user WHERE (#{keyword} = '' OR username LIKE CONCAT('%', #{keyword}, '%') OR real_name LIKE CONCAT('%', #{keyword}, '%')) " +
            "AND (#{roleId} = 0 OR role_id = #{roleId}) AND (#{status} = -1 OR status = #{status})")
    int countByConditions(@Param("keyword") String keyword, @Param("roleId") Long roleId, @Param("status") Integer status);

    @Insert("INSERT INTO sys_user (username, password, real_name, email, phone, role_id, status, create_time) " +
            "VALUES (#{username}, #{password}, #{realName}, #{email}, #{phone}, #{roleId}, #{status}, CURRENT_TIMESTAMP)")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(User user);

    @Update("UPDATE sys_user SET username = #{username}, real_name = #{realName}, email = #{email}, " +
            "phone = #{phone}, role_id = #{roleId}, status = #{status}, update_time = CURRENT_TIMESTAMP WHERE id = #{id}")
    int update(User user);

    @Update("UPDATE sys_user SET password = #{password}, update_time = CURRENT_TIMESTAMP WHERE id = #{id}")
    int updatePassword(@Param("id") Long id, @Param("password") String password);

    @Update("UPDATE sys_user SET last_login_time = CURRENT_TIMESTAMP WHERE id = #{id}")
    int updateLoginTime(Long id);

    @Delete("DELETE FROM sys_user WHERE id = #{id}")
    int delete(Long id);

    @Select("SELECT COUNT(*) FROM sys_user WHERE status = 1")
    int countActive();
}