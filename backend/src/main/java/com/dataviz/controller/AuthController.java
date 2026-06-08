package com.dataviz.controller;

import com.dataviz.entity.User;
import com.dataviz.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * 用户认证控制器
 * 
 * @author dataviz
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * 用户登录
     */
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String password = params.get("password");
        return authService.login(username, password);
    }

    /**
     * 用户退出
     */
    @PostMapping("/logout")
    public Map<String, Object> logout() {
        return authService.logout();
    }

    /**
     * 获取用户列表
     */
    @GetMapping("/users")
    public List<User> getUserList() {
        return authService.getUserList();
    }

    /**
     * 创建用户
     */
    @PostMapping("/users")
    public Map<String, Object> createUser(@RequestBody User user) {
        return authService.createUser(user);
    }

    /**
     * 删除用户
     */
    @DeleteMapping("/users/{id}")
    public Map<String, Object> deleteUser(@PathVariable Long id) {
        return authService.deleteUser(id);
    }

    /**
     * 更新用户状态
     */
    @PutMapping("/users/{id}/status")
    public Map<String, Object> updateUserStatus(@PathVariable Long id, @RequestBody Map<String, Integer> params) {
        Integer status = params.get("status");
        return authService.updateUserStatus(id, status);
    }
}