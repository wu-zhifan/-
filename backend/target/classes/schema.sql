-- H2 compatible schema

-- 用户表（扩展字段）
CREATE TABLE IF NOT EXISTS sys_user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    real_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    role_id BIGINT DEFAULT 1,
    status TINYINT DEFAULT 1 COMMENT '0-禁用 1-启用',
    last_login_time TIMESTAMP,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 角色表
CREATE TABLE IF NOT EXISTS sys_role (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    role_code VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200),
    permissions VARCHAR(500) COMMENT '权限列表，逗号分隔',
    status TINYINT DEFAULT 1,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 分类表
CREATE TABLE IF NOT EXISTS sys_category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50),
    parent_id BIGINT DEFAULT 0,
    sort_order INT DEFAULT 0,
    status TINYINT DEFAULT 1 COMMENT '0-停用 1-启用',
    remark VARCHAR(200),
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 业务数据表
CREATE TABLE IF NOT EXISTS biz_data (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    "value" DECIMAL(18,2) NOT NULL,
    unit VARCHAR(50),
    "time" TIMESTAMP NOT NULL,
    remark VARCHAR(1000),
    create_by BIGINT,
    update_by BIGINT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 操作日志表
CREATE TABLE IF NOT EXISTS sys_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    username VARCHAR(50),
    operation VARCHAR(50) NOT NULL COMMENT '操作类型：ADD/UPDATE/DELETE/LOGIN/EXPORT等',
    module VARCHAR(50) COMMENT '模块：USER/DATA/CATEGORY等',
    content VARCHAR(500) COMMENT '操作内容描述',
    ip_address VARCHAR(50),
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 数据预警配置表
CREATE TABLE IF NOT EXISTS sys_alert (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT,
    alert_type VARCHAR(50) NOT NULL COMMENT '预警类型：THRESHOLD/TREND等',
    threshold_value DECIMAL(18,2),
    comparison_type VARCHAR(20) COMMENT '比较类型：GT/LT/EQ等',
    alert_message VARCHAR(200),
    status TINYINT DEFAULT 1,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_category_id ON biz_data(category_id);
CREATE INDEX IF NOT EXISTS idx_time ON biz_data("time");
CREATE INDEX IF NOT EXISTS idx_user_role ON sys_user(role_id);
CREATE INDEX IF NOT EXISTS idx_log_user ON sys_log(user_id);
CREATE INDEX IF NOT EXISTS idx_log_time ON sys_log(create_time);