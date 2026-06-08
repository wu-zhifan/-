package com.dataviz.mapper;

import com.dataviz.entity.Role;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface RoleMapper {

    @Select("SELECT * FROM sys_role WHERE id = #{id}")
    Role findById(Long id);

    @Select("SELECT * FROM sys_role WHERE role_code = #{roleCode}")
    Role findByCode(String roleCode);

    @Select("SELECT * FROM sys_role WHERE status = 1 ORDER BY id")
    List<Role> findAllActive();

    @Select("SELECT * FROM sys_role ORDER BY id")
    List<Role> findAll();

    @Insert("INSERT INTO sys_role (role_name, role_code, description, permissions, status, create_time) " +
            "VALUES (#{roleName}, #{roleCode}, #{description}, #{permissions}, #{status}, CURRENT_TIMESTAMP)")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Role role);

    @Update("UPDATE sys_role SET role_name = #{roleName}, description = #{description}, " +
            "permissions = #{permissions}, status = #{status} WHERE id = #{id}")
    int update(Role role);

    @Delete("DELETE FROM sys_role WHERE id = #{id}")
    int delete(Long id);

    @Select("SELECT COUNT(*) FROM sys_role")
    int count();
}