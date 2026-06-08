-- 初始化角色数据
INSERT INTO sys_role (id, role_name, role_code, description, permissions, status) VALUES
(1, 'Super Admin', 'ADMIN', 'Full system access', 'ALL', 1),
(2, 'Data Editor', 'EDITOR', 'Can add/edit/delete data', 'DATA_ADD,DATA_EDIT,DATA_DELETE,DATA_VIEW,DATA_IMPORT,DATA_EXPORT', 1),
(3, 'Viewer', 'VIEWER', 'Can only view data', 'DATA_VIEW,DASHBOARD_VIEW', 1);

-- 初始化用户数据（密码为admin123）
INSERT INTO sys_user (id, username, password, real_name, email, phone, role_id, status) VALUES
(1, 'admin', 'admin123', 'System Admin', 'admin@example.com', '13800000000', 1, 1),
(2, 'editor', 'editor123', 'Data Editor', 'editor@example.com', '13800000001', 2, 1),
(3, 'viewer', 'viewer123', 'Data Viewer', 'viewer@example.com', '13800000002', 3, 1);

-- 初始化分类数据
INSERT INTO sys_category (id, name, code, parent_id, sort_order, status, remark) VALUES
(1, 'Monthly Sales', 'MONTHLY_SALES', 0, 1, 1, 'Monthly sales data'),
(2, 'Quarterly Sales', 'QUARTERLY_SALES', 0, 2, 1, 'Quarterly sales Statistics'),
(3, 'Monthly Finance', 'MONTHLY_FINANCE', 0, 3, 1, 'Monthly Revenue Data'),
(4, 'Quarterly Finance', 'QUARTERLY_FINANCE', 0, 4, 1, 'Quarterly Finance Statistics'),
(5, 'Yearly Summary', 'YEARLY_SUMMARY', 0, 5, 1, 'Yearly Summary Data'),
(6, 'Daily Sales', 'DAILY_SALES', 0, 6, 1, 'Daily sales tracking'),
(7, 'User Activity', 'USER_ACTIVITY', 0, 7, 1, 'User activity statistics'),
(8, 'Product Inventory', 'PRODUCT_INVENTORY', 0, 8, 1, 'Product stock levels'),
(9, 'Website Traffic', 'WEBSITE_TRAFFIC', 0, 9, 1, 'Website visitor analytics'),
(10, 'Customer Growth', 'CUSTOMER_GROWTH', 0, 10, 1, 'Customer acquisition stats');

-- 初始化业务数据 - 月度销售
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(1, 1, 'Jan 2023 Sales', 98000.00, 'CNY', '2023-01-31 00:00:00', 'January 2023 sales', 1),
(2, 1, 'Feb 2023 Sales', 112000.00, 'CNY', '2023-02-28 00:00:00', 'February 2023 sales', 1),
(3, 1, 'Mar 2023 Sales', 105000.00, 'CNY', '2023-03-31 00:00:00', 'March 2023 sales', 1),
(4, 1, 'Apr 2023 Sales', 128000.00, 'CNY', '2023-04-30 00:00:00', 'April 2023 sales', 1),
(5, 1, 'May 2023 Sales', 145000.00, 'CNY', '2023-05-31 00:00:00', 'May 2023 sales', 1),
(6, 1, 'Jun 2023 Sales', 132000.00, 'CNY', '2023-06-30 00:00:00', 'June 2023 sales', 1),
(7, 1, 'Jul 2023 Sales', 156000.00, 'CNY', '2023-07-31 00:00:00', 'July 2023 sales', 1),
(8, 1, 'Aug 2023 Sales', 168000.00, 'CNY', '2023-08-31 00:00:00', 'August 2023 sales', 1),
(9, 1, 'Sep 2023 Sales', 142000.00, 'CNY', '2023-09-30 00:00:00', 'September 2023 sales', 1),
(10, 1, 'Oct 2023 Sales', 185000.00, 'CNY', '2023-10-31 00:00:00', 'October 2023 sales', 1),
(11, 1, 'Nov 2023 Sales', 210000.00, 'CNY', '2023-11-30 00:00:00', 'November 2023 sales', 1),
(12, 1, 'Dec 2023 Sales', 245000.00, 'CNY', '2023-12-31 00:00:00', 'December 2023 sales', 1),
(13, 1, 'Jan 2024 Sales', 125000.00, 'CNY', '2024-01-31 00:00:00', 'January 2024 sales', 1),
(14, 1, 'Feb 2024 Sales', 138000.00, 'CNY', '2024-02-28 00:00:00', 'February 2024 sales', 1),
(15, 1, 'Mar 2024 Sales', 156000.00, 'CNY', '2024-03-31 00:00:00', 'March 2024 sales', 1);

-- 季度销售数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(16, 2, 'Q1 2023 Sales', 315000.00, 'CNY', '2023-03-31 00:00:00', 'Q1 2023 total', 1),
(17, 2, 'Q2 2023 Sales', 405000.00, 'CNY', '2023-06-30 00:00:00', 'Q2 2023 total', 1),
(18, 2, 'Q3 2023 Sales', 466000.00, 'CNY', '2023-09-30 00:00:00', 'Q3 2023 total', 1),
(19, 2, 'Q4 2023 Sales', 640000.00, 'CNY', '2023-12-31 00:00:00', 'Q4 2023 total', 1),
(20, 2, 'Q1 2024 Sales', 419000.00, 'CNY', '2024-03-31 00:00:00', 'Q1 2024 total', 1);

-- 月度财务数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(21, 3, 'Jan 2023 Revenue', 75000.00, 'CNY', '2023-01-31 00:00:00', 'January 2023 revenue', 1),
(22, 3, 'Feb 2023 Revenue', 88000.00, 'CNY', '2023-02-28 00:00:00', 'February 2023 revenue', 1),
(23, 3, 'Mar 2023 Revenue', 82000.00, 'CNY', '2023-03-31 00:00:00', 'March 2023 revenue', 1),
(24, 3, 'Apr 2023 Revenue', 98000.00, 'CNY', '2023-04-30 00:00:00', 'April 2023 revenue', 1),
(25, 3, 'May 2023 Revenue', 115000.00, 'CNY', '2023-05-31 00:00:00', 'May 2023 revenue', 1),
(26, 3, 'Jun 2023 Revenue', 105000.00, 'CNY', '2023-06-30 00:00:00', 'June 2023 revenue', 1),
(27, 3, 'Jul 2023 Revenue', 125000.00, 'CNY', '2023-07-31 00:00:00', 'July 2023 revenue', 1),
(28, 3, 'Aug 2023 Revenue', 135000.00, 'CNY', '2023-08-31 00:00:00', 'August 2023 revenue', 1),
(29, 3, 'Sep 2023 Revenue', 112000.00, 'CNY', '2023-09-30 00:00:00', 'September 2023 revenue', 1),
(30, 3, 'Oct 2023 Revenue', 148000.00, 'CNY', '2023-10-31 00:00:00', 'October 2023 revenue', 1),
(31, 3, 'Nov 2023 Revenue', 168000.00, 'CNY', '2023-11-30 00:00:00', 'November 2023 revenue', 1),
(32, 3, 'Dec 2023 Revenue', 195000.00, 'CNY', '2023-12-31 00:00:00', 'December 2023 revenue', 1),
(33, 3, 'Jan 2024 Revenue', 95000.00, 'CNY', '2024-01-31 00:00:00', 'January 2024 revenue', 1),
(34, 3, 'Feb 2024 Revenue', 108000.00, 'CNY', '2024-02-28 00:00:00', 'February 2024 revenue', 1),
(35, 3, 'Mar 2024 Revenue', 109000.00, 'CNY', '2024-03-31 00:00:00', 'March 2024 revenue', 1);

-- 季度财务数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(36, 4, 'Q1 2023 Finance', 245000.00, 'CNY', '2023-03-31 00:00:00', 'Q1 2023 total', 1),
(37, 4, 'Q2 2023 Finance', 318000.00, 'CNY', '2023-06-30 00:00:00', 'Q2 2023 total', 1),
(38, 4, 'Q3 2023 Finance', 372000.00, 'CNY', '2023-09-30 00:00:00', 'Q3 2023 total', 1),
(39, 4, 'Q4 2023 Finance', 511000.00, 'CNY', '2023-12-31 00:00:00', 'Q4 2023 total', 1),
(40, 4, 'Q1 2024 Finance', 312000.00, 'CNY', '2024-03-31 00:00:00', 'Q1 2024 total', 1);

-- 年度汇总数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(41, 5, '2023 Total Sales', 1826000.00, 'CNY', '2023-12-31 00:00:00', '2023 annual sales total', 1),
(42, 5, '2023 Total Revenue', 1446000.00, 'CNY', '2023-12-31 00:00:00', '2023 annual revenue total', 1),
(43, 5, '2023 Profit Margin', 20.80, '%', '2023-12-31 00:00:00', '2023 profit margin', 1);

-- 日销售数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(44, 6, '03-01 Sales', 4200.00, 'CNY', '2024-03-01 00:00:00', 'Daily sales on March 1', 1),
(45, 6, '03-02 Sales', 4800.00, 'CNY', '2024-03-02 00:00:00', 'Daily sales on March 2', 1),
(46, 6, '03-03 Sales', 3900.00, 'CNY', '2024-03-03 00:00:00', 'Daily sales on March 3', 1),
(47, 6, '03-04 Sales', 5200.00, 'CNY', '2024-03-04 00:00:00', 'Daily sales on March 4', 1),
(48, 6, '03-05 Sales', 6100.00, 'CNY', '2024-03-05 00:00:00', 'Daily sales on March 5', 1),
(49, 6, '03-06 Sales', 5500.00, 'CNY', '2024-03-06 00:00:00', 'Daily sales on March 6', 1),
(50, 6, '03-07 Sales', 4800.00, 'CNY', '2024-03-07 00:00:00', 'Daily sales on March 7', 1),
(51, 6, '03-08 Sales', 7200.00, 'CNY', '2024-03-08 00:00:00', 'Daily sales on March 8', 1),
(52, 6, '03-09 Sales', 6500.00, 'CNY', '2024-03-09 00:00:00', 'Daily sales on March 9', 1),
(53, 6, '03-10 Sales', 8100.00, 'CNY', '2024-03-10 00:00:00', 'Daily sales on March 10', 1);

-- 用户活跃度数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(54, 7, 'Monday Active Users', 450.00, 'people', '2024-03-11 00:00:00', 'Active users on Monday', 1),
(55, 7, 'Tuesday Active Users', 520.00, 'people', '2024-03-12 00:00:00', 'Active users on Tuesday', 1),
(56, 7, 'Wednesday Active Users', 480.00, 'people', '2024-03-13 00:00:00', 'Active users on Wednesday', 1),
(57, 7, 'Thursday Active Users', 620.00, 'people', '2024-03-14 00:00:00', 'Active users on Thursday', 1),
(58, 7, 'Friday Active Users', 780.00, 'people', '2024-03-15 00:00:00', 'Active users on Friday', 1),
(59, 7, 'Saturday Active Users', 950.00, 'people', '2024-03-16 00:00:00', 'Active users on Saturday', 1),
(60, 7, 'Sunday Active Users', 880.00, 'people', '2024-03-17 00:00:00', 'Active users on Sunday', 1);

-- 产品库存数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(61, 8, 'Product A Inventory', 1250.00, 'units', '2024-03-15 00:00:00', 'Stock level for Product A', 1),
(62, 8, 'Product B Inventory', 890.00, 'units', '2024-03-15 00:00:00', 'Stock level for Product B', 1),
(63, 8, 'Product C Inventory', 2100.00, 'units', '2024-03-15 00:00:00', 'Stock level for Product C', 1),
(64, 8, 'Product D Inventory', 560.00, 'units', '2024-03-15 00:00:00', 'Stock level for Product D', 1),
(65, 8, 'Product E Inventory', 1800.00, 'units', '2024-03-15 00:00:00', 'Stock level for Product E', 1),
(66, 8, 'Product F Inventory', 950.00, 'units', '2024-03-15 00:00:00', 'Stock level for Product F', 1),
(67, 8, 'Product G Inventory', 1420.00, 'units', '2024-03-15 00:00:00', 'Stock level for Product G', 1),
(68, 8, 'Product H Inventory', 680.00, 'units', '2024-03-15 00:00:00', 'Stock level for Product H', 1);

-- 网站流量数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(69, 9, 'Daily Page Views', 5680.00, 'views', '2024-03-10 00:00:00', 'Page views on March 10', 1),
(70, 9, 'Daily Unique Visitors', 1250.00, 'people', '2024-03-10 00:00:00', 'Unique visitors on March 10', 1),
(71, 9, 'Bounce Rate', 42.50, '%', '2024-03-10 00:00:00', 'Bounce rate on March 10', 1),
(72, 9, 'Avg Session Duration', 4.20, 'min', '2024-03-10 00:00:00', 'Average session duration', 1),
(73, 9, 'Daily Page Views', 6200.00, 'views', '2024-03-11 00:00:00', 'Page views on March 11', 1),
(74, 9, 'Daily Unique Visitors', 1380.00, 'people', '2024-03-11 00:00:00', 'Unique visitors on March 11', 1),
(75, 9, 'Bounce Rate', 38.80, '%', '2024-03-11 00:00:00', 'Bounce rate on March 11', 1),
(76, 9, 'Avg Session Duration', 4.80, 'min', '2024-03-11 00:00:00', 'Average session duration', 1),
(77, 9, 'Daily Page Views', 7150.00, 'views', '2024-03-12 00:00:00', 'Page views on March 12', 1),
(78, 9, 'Daily Unique Visitors', 1520.00, 'people', '2024-03-12 00:00:00', 'Unique visitors on March 12', 1);

-- 客户增长数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(79, 10, 'New Customers Jan 2024', 156.00, 'people', '2024-01-31 00:00:00', 'New customers in January', 1),
(80, 10, 'New Customers Feb 2024', 182.00, 'people', '2024-02-28 00:00:00', 'New customers in February', 1),
(81, 10, 'New Customers Mar 2024', 210.00, 'people', '2024-03-31 00:00:00', 'New customers in March', 1),
(82, 10, 'Customer Retention Rate', 87.50, '%', '2024-03-31 00:00:00', 'Customer retention rate', 1),
(83, 10, 'Avg Customer Lifetime', 24.50, 'month', '2024-03-31 00:00:00', 'Average customer lifetime', 1);

-- 操作日志数据
INSERT INTO sys_log (id, user_id, username, operation, module, content, ip_address, create_time) VALUES
(1, 1, 'admin', 'LOGIN', 'AUTH', 'System admin logged in successfully', '192.168.1.100', '2024-03-15 09:00:00'),
(2, 1, 'admin', 'VIEW', 'DATA', 'Viewed data visualization dashboard', '192.168.1.100', '2024-03-15 09:05:00'),
(3, 2, 'editor', 'LOGIN', 'AUTH', 'Data editor logged in successfully', '192.168.1.101', '2024-03-15 09:30:00'),
(4, 2, 'editor', 'ADD', 'DATA', 'Added new sales data entry', '192.168.1.101', '2024-03-15 09:45:00'),
(5, 2, 'editor', 'UPDATE', 'DATA', 'Updated March 2024 sales data', '192.168.1.101', '2024-03-15 10:20:00'),
(6, 1, 'admin', 'EXPORT', 'REPORT', 'Exported monthly sales report', '192.168.1.100', '2024-03-15 10:45:00'),
(7, 3, 'viewer', 'LOGIN', 'AUTH', 'Data viewer logged in successfully', '192.168.1.102', '2024-03-15 11:00:00'),
(8, 3, 'viewer', 'VIEW', 'DATA', 'Viewed quarterly finance report', '192.168.1.102', '2024-03-15 11:10:00'),
(9, 1, 'admin', 'CONFIG', 'SYSTEM', 'Updated system configuration', '192.168.1.100', '2024-03-15 11:30:00'),
(10, 2, 'editor', 'IMPORT', 'DATA', 'Imported data from Excel file', '192.168.1.101', '2024-03-15 12:00:00'),
(11, 1, 'admin', 'LOGOUT', 'AUTH', 'System admin logged out', '192.168.1.100', '2024-03-15 12:15:00'),
(12, 3, 'viewer', 'LOGIN', 'AUTH', 'Data viewer logged in successfully', '192.168.1.102', '2024-03-15 13:00:00'),
(13, 3, 'viewer', 'VIEW', 'ALERT', 'Viewed data alert rules', '192.168.1.102', '2024-03-15 13:15:00'),
(14, 2, 'editor', 'LOGIN', 'AUTH', 'Data editor logged in successfully', '192.168.1.101', '2024-03-15 14:00:00'),
(15, 2, 'editor', 'DELETE', 'DATA', 'Deleted outdated data entry', '192.168.1.101', '2024-03-15 14:20:00');

-- 2026年数据 - 月度销售
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(160, 1, 'Jan 2026 Sales', 256000.00, 'CNY', '2026-01-31 00:00:00', 'January 2026 sales', 1),
(161, 1, 'Feb 2026 Sales', 289000.00, 'CNY', '2026-02-28 00:00:00', 'February 2026 sales', 1),
(162, 1, 'Mar 2026 Sales', 312000.00, 'CNY', '2026-03-31 00:00:00', 'March 2026 sales', 1),
(163, 1, 'Apr 2026 Sales', 298000.00, 'CNY', '2026-04-30 00:00:00', 'April 2026 sales', 1),
(164, 1, 'May 2026 Sales', 345000.00, 'CNY', '2026-05-31 00:00:00', 'May 2026 sales', 1),
(165, 1, 'Jun 2026 Sales', 378000.00, 'CNY', '2026-06-30 00:00:00', 'June 2026 sales', 1),
(166, 1, 'Jul 2026 Sales', 412000.00, 'CNY', '2026-07-31 00:00:00', 'July 2026 sales', 1),
(167, 1, 'Aug 2026 Sales', 435000.00, 'CNY', '2026-08-31 00:00:00', 'August 2026 sales', 1),
(168, 1, 'Sep 2026 Sales', 398000.00, 'CNY', '2026-09-30 00:00:00', 'September 2026 sales', 1),
(169, 1, 'Oct 2026 Sales', 465000.00, 'CNY', '2026-10-31 00:00:00', 'October 2026 sales', 1),
(170, 1, 'Nov 2026 Sales', 512000.00, 'CNY', '2026-11-30 00:00:00', 'November 2026 sales', 1),
(171, 1, 'Dec 2026 Sales', 589000.00, 'CNY', '2026-12-31 00:00:00', 'December 2026 sales', 1);

-- 2026年数据 - 月度财务
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(172, 3, 'Jan 2026 Revenue', 198000.00, 'CNY', '2026-01-31 00:00:00', 'January 2026 revenue', 1),
(173, 3, 'Feb 2026 Revenue', 225000.00, 'CNY', '2026-02-28 00:00:00', 'February 2026 revenue', 1),
(174, 3, 'Mar 2026 Revenue', 245000.00, 'CNY', '2026-03-31 00:00:00', 'March 2026 revenue', 1),
(175, 3, 'Apr 2026 Revenue', 232000.00, 'CNY', '2026-04-30 00:00:00', 'April 2026 revenue', 1),
(176, 3, 'May 2026 Revenue', 268000.00, 'CNY', '2026-05-31 00:00:00', 'May 2026 revenue', 1),
(177, 3, 'Jun 2026 Revenue', 295000.00, 'CNY', '2026-06-30 00:00:00', 'June 2026 revenue', 1);

-- 2026年数据 - 用户活跃度
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(178, 7, 'Jan 2026 Active Users', 1250.00, 'people', '2026-01-31 00:00:00', 'Active users in January', 1),
(179, 7, 'Feb 2026 Active Users', 1380.00, 'people', '2026-02-28 00:00:00', 'Active users in February', 1),
(180, 7, 'Mar 2026 Active Users', 1520.00, 'people', '2026-03-31 00:00:00', 'Active users in March', 1),
(181, 7, 'Apr 2026 Active Users', 1450.00, 'people', '2026-04-30 00:00:00', 'Active users in April', 1),
(182, 7, 'May 2026 Active Users', 1680.00, 'people', '2026-05-31 00:00:00', 'Active users in May', 1),
(183, 7, 'Jun 2026 Active Users', 1820.00, 'people', '2026-06-30 00:00:00', 'Active users in June', 1);

-- 2026年数据 - 客户增长
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(184, 10, 'New Customers Jan 2026', 456.00, 'people', '2026-01-31 00:00:00', 'New customers in January', 1),
(185, 10, 'New Customers Feb 2026', 512.00, 'people', '2026-02-28 00:00:00', 'New customers in February', 1),
(186, 10, 'New Customers Mar 2026', 589.00, 'people', '2026-03-31 00:00:00', 'New customers in March', 1),
(187, 10, 'New Customers Apr 2026', 545.00, 'people', '2026-04-30 00:00:00', 'New customers in April', 1),
(188, 10, 'New Customers May 2026', 678.00, 'people', '2026-05-31 00:00:00', 'New customers in May', 1),
(189, 10, 'New Customers Jun 2026', 756.00, 'people', '2026-06-30 00:00:00', 'New customers in June', 1);

-- 初始化预警配置
INSERT INTO sys_alert (id, category_id, alert_type, threshold_value, comparison_type, alert_message, status) VALUES
(1, 1, 'THRESHOLD', 100000.00, 'LT', 'Monthly sales below threshold alert', 1),
(2, 3, 'THRESHOLD', 80000.00, 'LT', 'Monthly revenue below threshold alert', 1),
(3, 8, 'THRESHOLD', 500.00, 'LT', 'Low inventory alert', 1),
(4, 9, 'THRESHOLD', 5000.00, 'LT', 'Low website traffic alert', 1);