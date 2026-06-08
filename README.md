# 智慧数据可视化管理平台

## 项目简介

智慧数据可视化管理平台是一个基于Angular前端 + SpringBoot Java微服务 + MySQL的企业级数据管理与可视化系统。平台提供用户权限管理、基础分类管理、业务数据录入、批量数据导入、可视化看板管理五大核心功能，解决企业Excel数据零散、统计低效、无法直观数据分析的痛点。

## 技术栈

### 前端
- Angular 18
- TypeScript
- SCSS
- ECharts 5.5
- HttpClient

### 后端
- SpringBoot 3.2
- MySQL 8.0
- MyBatis 3.0
- Apache POI (Excel处理)

## 项目结构

```
data-visualization-platform/
├── docs/                           # 项目文档
│   └── 项目文档.md                  # 课程项目完整文档
├── frontend/                       # Angular前端项目
│   ├── src/
│   │   ├── app/
│   │   │   ├── login/              # 登录模块
│   │   │   ├── dashboard/          # 看板模块
│   │   │   ├── data-entry/         # 数据录入模块
│   │   │   ├── system-config/      # 系统配置模块
│   │   │   ├── components/         # 公共组件
│   │   │   ├── services/           # 服务层
│   │   │   ├── pipes/              # 管道
│   │   │   └── models/             # 数据模型
│   │   ├── styles.scss             # 全局样式
│   │   └── index.html              # 入口页面
│   ├── package.json
│   └── angular.json
└── backend/                        # SpringBoot后端项目
    ├── src/main/
    │   ├── java/com/dataviz/
    │   │   ├── entity/             # 实体类
    │   │   ├── mapper/             # Mapper接口
    │   │   ├── service/            # 服务层
    │   │   └ controller/           # 控制器
    │   └ resources/
    │   │   ├── mapper/             # MyBatis XML
    │   │   ├── application.yml     # 配置文件
    │   │   └ schema.sql            # 数据库脚本
    │   └ pom.xml
```

## 快速启动

### 1. 数据库初始化

```bash
# 创建数据库并导入初始数据
mysql -u root -p < backend/src/main/resources/schema.sql
```

### 2. 启动后端服务

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

后端服务地址：http://localhost:8080/api

### 3. 启动前端服务

```bash
cd frontend
npm install
npm start
```

前端服务地址：http://localhost:4200

## 功能模块

### 1. 用户权限管理
- 用户登录认证
- 用户列表管理
- 角色权限配置
- 用户状态控制

### 2. 基础分类管理
- 分类树结构
- 分类增删改查
- 层级管理

### 3. 业务数据录入
- 表单数据录入
- 数据校验
- 数据列表展示
- 分页查询

### 4. 批量数据导入
- Excel文件上传
- 数据预览校验
- 批量入库

### 5. 可视化看板管理
- 折线图趋势分析
- 柱状图数据对比
- 饼图分类占比
- 多筛选条件联动

## API接口

### 认证接口
- POST /api/auth/login - 用户登录
- POST /api/auth/logout - 用户退出
- GET /api/auth/users - 用户列表
- POST /api/auth/users - 创建用户
- DELETE /api/auth/users/{id} - 删除用户

### 数据接口
- GET /api/data/list - 数据列表
- POST /api/data - 创建数据
- DELETE /api/data/{id} - 删除数据
- POST /api/data/import - 批量导入
- GET /api/data/stats - 统计数据
- POST /api/data/chart-data - 图表数据
- GET /api/data/categories - 分类列表

## 测试账号

| 用户名 | 密码 | 角色 |
|-------|------|------|
| admin | admin123 | 管理员 |
| user | user123 | 普通用户 |

## 项目文档

详细的项目文档请查看：[docs/项目文档.md](docs/项目文档.md)

包含：
- 项目计划
- 功能需求分析
- 前端设计与开发
- 微服务设计与开发
- 难点功能设计
- 项目代码分析
- 项目成品展示

## 开发团队

| 成员 | 职责 |
|-----|------|
| 张三 | 前端架构、看板页面 |
| 李四 | 后端API、数据库设计 |
| 王五 | 组件封装、图表集成 |
| 赵六 | 测试、文档编写 |

## 版本信息

- 版本：V1.0.0
- 创建时间：2026年6月
- 项目状态：开发完成