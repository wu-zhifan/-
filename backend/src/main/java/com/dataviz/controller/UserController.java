package com.dataviz.controller;

import com.dataviz.entity.User;
import com.dataviz.entity.Role;
import com.dataviz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 用户登录
     */
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String password = params.get("password");
        return userService.login(username, password);
    }

    /**
     * 获取用户列表（分页）
     */
    @GetMapping("/list")
    public Map<String, Object> getUserList(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long roleId,
            @RequestParam(required = false) Integer status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        return userService.getUserList(keyword, roleId, status, page, size);
    }

    /**
     * 获取所有用户（不分页）
     */
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * 获取用户详情
     */
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    /**
     * 创建用户
     */
    @PostMapping("/create")
    public Map<String, Object> createUser(@RequestBody User user, @RequestParam Long operatorId) {
        return userService.createUser(user, operatorId);
    }

    /**
     * 更新用户
     */
    @PostMapping("/update")
    public Map<String, Object> updateUser(@RequestBody User user, @RequestParam Long operatorId) {
        return userService.updateUser(user, operatorId);
    }

    /**
     * 删除用户
     */
    @PostMapping("/delete/{id}")
    public Map<String, Object> deleteUser(@PathVariable Long id, @RequestParam Long operatorId) {
        return userService.deleteUser(id, operatorId);
    }

    /**
     * 修改密码
     */
    @PostMapping("/change-password")
    public Map<String, Object> changePassword(@RequestBody Map<String, Object> params) {
        Long userId = Long.parseLong(params.get("userId").toString());
        String oldPassword = params.get("oldPassword").toString();
        String newPassword = params.get("newPassword").toString();
        return userService.changePassword(userId, oldPassword, newPassword);
    }

    /**
     * 获取所有角色
     */
    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return userService.getAllRoles();
    }

    /**
     * 获取操作日志
     */
    @GetMapping("/logs")
    public Map<String, Object> getLogs(
            @RequestParam(required = false) Long userId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        return userService.getUserLogs(userId, page, size);
    }

    /**
     * 获取活跃用户数
     */
    @GetMapping("/active-count")
    public Map<String, Object> getActiveCount() {
        Map<String, Object> result = new java.util.HashMap<>();
        result.put("count", userService.getActiveUserCount());
        return result;
    }
}