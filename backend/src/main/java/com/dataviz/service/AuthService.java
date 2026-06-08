package com.dataviz.service;

import com.dataviz.entity.User;
import com.dataviz.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户认证服务
 * 
 * @author dataviz
 */
@Service
public class AuthService {

    @Autowired
    private UserMapper userMapper;

    /**
     * 用户登录
     */
    public Map<String, Object> login(String username, String password) {
        Map<String, Object> result = new HashMap<>();
        
        User user = userMapper.findByUsername(username);
        if (user == null) {
            result.put("success", false);
            result.put("message", "User not found");
            return result;
        }

        // 校验密码（实际项目中应使用加密校验）
        if (!user.getPassword().equals(password)) {
            result.put("success", false);
            result.put("message", "Wrong password");
            return result;
        }

        // 校验状态
        if (user.getStatus() != 1) {
            result.put("success", false);
            result.put("message", "User is disabled");
            return result;
        }

        result.put("success", true);
        result.put("user", user);
        result.put("message", "Login success");
        return result;
    }

    /**
     * 用户退出
     */
    public Map<String, Object> logout() {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "Logout success");
        return result;
    }

    /**
     * 获取用户列表
     */
    public List<User> getUserList() {
        return userMapper.findAll();
    }

    /**
     * 创建用户
     */
    @Transactional
    public Map<String, Object> createUser(User user) {
        Map<String, Object> result = new HashMap<>();
        
        // 检查用户名是否已存在
        User existingUser = userMapper.findByUsername(user.getUsername());
        if (existingUser != null) {
            result.put("success", false);
            result.put("message", "Username already exists");
            return result;
        }

        int rows = userMapper.insert(user);
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "User created successfully");
        } else {
            result.put("success", false);
            result.put("message", "Failed to create user");
        }
        return result;
    }

    /**
     * 删除用户
     */
    @Transactional
    public Map<String, Object> deleteUser(Long id) {
        Map<String, Object> result = new HashMap<>();
        int rows = userMapper.delete(id);
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "User deleted successfully");
        } else {
            result.put("success", false);
            result.put("message", "Failed to delete user");
        }
        return result;
    }

    /**
     * 更新用户状态
     */
    @Transactional
    public Map<String, Object> updateUserStatus(Long id, Integer status) {
        Map<String, Object> result = new HashMap<>();
        User user = userMapper.findById(id);
        if (user == null) {
            result.put("success", false);
            result.put("message", "User not found");
            return result;
        }
        user.setStatus(status);
        int rows = userMapper.update(user);
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "Status updated successfully");
        } else {
            result.put("success", false);
            result.put("message", "Failed to update status");
        }
        return result;
    }
}