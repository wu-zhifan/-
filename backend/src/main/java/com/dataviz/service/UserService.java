package com.dataviz.service;

import com.dataviz.entity.User;
import com.dataviz.entity.Role;
import com.dataviz.entity.OperationLog;
import com.dataviz.mapper.UserMapper;
import com.dataviz.mapper.RoleMapper;
import com.dataviz.mapper.OperationLogMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RoleMapper roleMapper;

    @Autowired
    private OperationLogMapper logMapper;

    /**
     * 用户登录
     */
    @Transactional
    public Map<String, Object> login(String username, String password) {
        Map<String, Object> result = new HashMap<>();
        User user = userMapper.findByUsername(username);
        
        if (user == null) {
            result.put("success", false);
            result.put("message", "User not found");
            return result;
        }
        
        if (!user.getPassword().equals(password)) {
            result.put("success", false);
            result.put("message", "Wrong password");
            return result;
        }
        
        if (user.getStatus() != 1) {
            result.put("success", false);
            result.put("message", "User is disabled");
            return result;
        }
        
        // 更新登录时间
        userMapper.updateLoginTime(user.getId());
        
        // 记录登录日志
        OperationLog log = new OperationLog();
        log.setUserId(user.getId());
        log.setUsername(user.getUsername());
        log.setOperation("LOGIN");
        log.setModule("USER");
        log.setContent("User logged in");
        logMapper.insert(log);
        
        // 获取角色权限
        Role role = roleMapper.findById(user.getRoleId());
        
        result.put("success", true);
        result.put("user", user);
        result.put("role", role);
        result.put("permissions", role != null ? role.getPermissions() : "");
        return result;
    }

    /**
     * 获取用户列表（分页）
     */
    public Map<String, Object> getUserList(String keyword, Long roleId, Integer status, int page, int size) {
        Map<String, Object> result = new HashMap<>();
        int offset = (page - 1) * size;
        
        List<User> list = userMapper.findByConditions(keyword == null ? "" : keyword, 
                                                       roleId == null ? 0L : roleId, 
                                                       status == null ? -1 : status, 
                                                       offset, size);
        int total = userMapper.countByConditions(keyword == null ? "" : keyword, 
                                                  roleId == null ? 0L : roleId, 
                                                  status == null ? -1 : status);
        
        result.put("list", list);
        result.put("total", total);
        result.put("page", page);
        result.put("size", size);
        return result;
    }

    /**
     * 获取所有用户
     */
    public List<User> getAllUsers() {
        return userMapper.findAll();
    }

    /**
     * 获取用户详情
     */
    public User getUserById(Long id) {
        return userMapper.findById(id);
    }

    /**
     * 创建用户
     */
    @Transactional
    public Map<String, Object> createUser(User user, Long operatorId) {
        Map<String, Object> result = new HashMap<>();
        
        // 检查用户名是否已存在
        User existing = userMapper.findByUsername(user.getUsername());
        if (existing != null) {
            result.put("success", false);
            result.put("message", "Username already exists");
            return result;
        }
        
        user.setStatus(1);
        int rows = userMapper.insert(user);
        
        if (rows > 0) {
            // 记录操作日志
            OperationLog log = new OperationLog();
            log.setUserId(operatorId);
            log.setOperation("ADD");
            log.setModule("USER");
            log.setContent("Created user: " + user.getUsername());
            logMapper.insert(log);
            
            result.put("success", true);
            result.put("user", user);
        } else {
            result.put("success", false);
            result.put("message", "Failed to create user");
        }
        return result;
    }

    /**
     * 更新用户
     */
    @Transactional
    public Map<String, Object> updateUser(User user, Long operatorId) {
        Map<String, Object> result = new HashMap<>();
        
        User existing = userMapper.findById(user.getId());
        if (existing == null) {
            result.put("success", false);
            result.put("message", "User not found");
            return result;
        }
        
        int rows = userMapper.update(user);
        
        if (rows > 0) {
            // 记录操作日志
            OperationLog log = new OperationLog();
            log.setUserId(operatorId);
            log.setOperation("UPDATE");
            log.setModule("USER");
            log.setContent("Updated user: " + user.getUsername());
            logMapper.insert(log);
            
            result.put("success", true);
            result.put("user", userMapper.findById(user.getId()));
        } else {
            result.put("success", false);
            result.put("message", "Failed to update user");
        }
        return result;
    }

    /**
     * 删除用户
     */
    @Transactional
    public Map<String, Object> deleteUser(Long id, Long operatorId) {
        Map<String, Object> result = new HashMap<>();
        
        User user = userMapper.findById(id);
        if (user == null) {
            result.put("success", false);
            result.put("message", "User not found");
            return result;
        }
        
        // 不能删除管理员
        if (user.getRoleId() == 1) {
            result.put("success", false);
            result.put("message", "Cannot delete admin user");
            return result;
        }
        
        int rows = userMapper.delete(id);
        
        if (rows > 0) {
            // 记录操作日志
            OperationLog log = new OperationLog();
            log.setUserId(operatorId);
            log.setOperation("DELETE");
            log.setModule("USER");
            log.setContent("Deleted user: " + user.getUsername());
            logMapper.insert(log);
            
            result.put("success", true);
        } else {
            result.put("success", false);
            result.put("message", "Failed to delete user");
        }
        return result;
    }

    /**
     * 修改密码
     */
    @Transactional
    public Map<String, Object> changePassword(Long id, String oldPassword, String newPassword) {
        Map<String, Object> result = new HashMap<>();
        
        User user = userMapper.findById(id);
        if (user == null) {
            result.put("success", false);
            result.put("message", "User not found");
            return result;
        }
        
        if (!user.getPassword().equals(oldPassword)) {
            result.put("success", false);
            result.put("message", "Old password is incorrect");
            return result;
        }
        
        int rows = userMapper.updatePassword(id, newPassword);
        
        if (rows > 0) {
            // 记录操作日志
            OperationLog log = new OperationLog();
            log.setUserId(id);
            log.setOperation("UPDATE");
            log.setModule("USER");
            log.setContent("Changed password");
            logMapper.insert(log);
            
            result.put("success", true);
        } else {
            result.put("success", false);
            result.put("message", "Failed to change password");
        }
        return result;
    }

    /**
     * 获取所有角色
     */
    public List<Role> getAllRoles() {
        return roleMapper.findAllActive();
    }

    /**
     * 获取用户操作日志
     */
    public Map<String, Object> getUserLogs(Long userId, int page, int size) {
        Map<String, Object> result = new HashMap<>();
        int offset = (page - 1) * size;
        
        List<OperationLog> logs = userId != null ? 
            logMapper.findByUserId(userId, offset, size) : 
            logMapper.findAll(offset, size);
        int total = userId != null ? logMapper.countByUserId(userId) : logMapper.count();
        
        result.put("list", logs);
        result.put("total", total);
        result.put("page", page);
        result.put("size", size);
        return result;
    }

    /**
     * 获取活跃用户数
     */
    public int getActiveUserCount() {
        return userMapper.countActive();
    }
}