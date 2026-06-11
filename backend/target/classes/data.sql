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

-- 初始化业务数据 - 2025年月度销售
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(1, 1, 'Jan 2025 Sales', 285000.00, 'CNY', '2025-01-31 00:00:00', 'January 2025 sales', 1),
(2, 1, 'Feb 2025 Sales', 312000.00, 'CNY', '2025-02-28 00:00:00', 'February 2025 sales', 1),
(3, 1, 'Mar 2025 Sales', 298000.00, 'CNY', '2025-03-31 00:00:00', 'March 2025 sales', 1),
(4, 1, 'Apr 2025 Sales', 345000.00, 'CNY', '2025-04-30 00:00:00', 'April 2025 sales', 1),
(5, 1, 'May 2025 Sales', 368000.00, 'CNY', '2025-05-31 00:00:00', 'May 2025 sales', 1),
(6, 1, 'Jun 2025 Sales', 389000.00, 'CNY', '2025-06-30 00:00:00', 'June 2025 sales', 1),
(7, 1, 'Jul 2025 Sales', 412000.00, 'CNY', '2025-07-31 00:00:00', 'July 2025 sales', 1),
(8, 1, 'Aug 2025 Sales', 435000.00, 'CNY', '2025-08-31 00:00:00', 'August 2025 sales', 1),
(9, 1, 'Sep 2025 Sales', 398000.00, 'CNY', '2025-09-30 00:00:00', 'September 2025 sales', 1),
(10, 1, 'Oct 2025 Sales', 465000.00, 'CNY', '2025-10-31 00:00:00', 'October 2025 sales', 1),
(11, 1, 'Nov 2025 Sales', 512000.00, 'CNY', '2025-11-30 00:00:00', 'November 2025 sales', 1),
(12, 1, 'Dec 2025 Sales', 589000.00, 'CNY', '2025-12-31 00:00:00', 'December 2025 sales', 1);

-- 2025年季度销售数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(13, 2, 'Q1 2025 Sales', 895000.00, 'CNY', '2025-03-31 00:00:00', 'Q1 2025 total', 1),
(14, 2, 'Q2 2025 Sales', 1102000.00, 'CNY', '2025-06-30 00:00:00', 'Q2 2025 total', 1),
(15, 2, 'Q3 2025 Sales', 1245000.00, 'CNY', '2025-09-30 00:00:00', 'Q3 2025 total', 1),
(16, 2, 'Q4 2025 Sales', 1566000.00, 'CNY', '2025-12-31 00:00:00', 'Q4 2025 total', 1);

-- 2025年月度财务数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(17, 3, 'Jan 2025 Revenue', 218000.00, 'CNY', '2025-01-31 00:00:00', 'January 2025 revenue', 1),
(18, 3, 'Feb 2025 Revenue', 239000.00, 'CNY', '2025-02-28 00:00:00', 'February 2025 revenue', 1),
(19, 3, 'Mar 2025 Revenue', 228000.00, 'CNY', '2025-03-31 00:00:00', 'March 2025 revenue', 1),
(20, 3, 'Apr 2025 Revenue', 265000.00, 'CNY', '2025-04-30 00:00:00', 'April 2025 revenue', 1),
(21, 3, 'May 2025 Revenue', 282000.00, 'CNY', '2025-05-31 00:00:00', 'May 2025 revenue', 1),
(22, 3, 'Jun 2025 Revenue', 299000.00, 'CNY', '2025-06-30 00:00:00', 'June 2025 revenue', 1),
(23, 3, 'Jul 2025 Revenue', 317000.00, 'CNY', '2025-07-31 00:00:00', 'July 2025 revenue', 1),
(24, 3, 'Aug 2025 Revenue', 334000.00, 'CNY', '2025-08-31 00:00:00', 'August 2025 revenue', 1),
(25, 3, 'Sep 2025 Revenue', 306000.00, 'CNY', '2025-09-30 00:00:00', 'September 2025 revenue', 1),
(26, 3, 'Oct 2025 Revenue', 355000.00, 'CNY', '2025-10-31 00:00:00', 'October 2025 revenue', 1),
(27, 3, 'Nov 2025 Revenue', 394000.00, 'CNY', '2025-11-30 00:00:00', 'November 2025 revenue', 1),
(28, 3, 'Dec 2025 Revenue', 452000.00, 'CNY', '2025-12-31 00:00:00', 'December 2025 revenue', 1);

-- 2025年季度财务数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(29, 4, 'Q1 2025 Finance', 685000.00, 'CNY', '2025-03-31 00:00:00', 'Q1 2025 total', 1),
(30, 4, 'Q2 2025 Finance', 846000.00, 'CNY', '2025-06-30 00:00:00', 'Q2 2025 total', 1),
(31, 4, 'Q3 2025 Finance', 957000.00, 'CNY', '2025-09-30 00:00:00', 'Q3 2025 total', 1),
(32, 4, 'Q4 2025 Finance', 1201000.00, 'CNY', '2025-12-31 00:00:00', 'Q4 2025 total', 1);

-- 2025年度汇总数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(33, 5, '2025 Total Sales', 4812000.00, 'CNY', '2025-12-31 00:00:00', '2025 annual sales total', 1),
(34, 5, '2025 Total Revenue', 3679000.00, 'CNY', '2025-12-31 00:00:00', '2025 annual revenue total', 1),
(35, 5, '2025 Profit Margin', 23.55, '%', '2025-12-31 00:00:00', '2025 profit margin', 1);

-- 2025年日销售数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(36, 6, '06-01 Sales', 12500.00, 'CNY', '2025-06-01 00:00:00', 'Daily sales on June 1', 1),
(37, 6, '06-02 Sales', 13800.00, 'CNY', '2025-06-02 00:00:00', 'Daily sales on June 2', 1),
(38, 6, '06-03 Sales', 11900.00, 'CNY', '2025-06-03 00:00:00', 'Daily sales on June 3', 1),
(39, 6, '06-04 Sales', 14200.00, 'CNY', '2025-06-04 00:00:00', 'Daily sales on June 4', 1),
(40, 6, '06-05 Sales', 15800.00, 'CNY', '2025-06-05 00:00:00', 'Daily sales on June 5', 1),
(41, 6, '06-06 Sales', 14500.00, 'CNY', '2025-06-06 00:00:00', 'Daily sales on June 6', 1),
(42, 6, '06-07 Sales', 13200.00, 'CNY', '2025-06-07 00:00:00', 'Daily sales on June 7', 1),
(43, 6, '06-08 Sales', 16800.00, 'CNY', '2025-06-08 00:00:00', 'Daily sales on June 8', 1),
(44, 6, '06-09 Sales', 15500.00, 'CNY', '2025-06-09 00:00:00', 'Daily sales on June 9', 1),
(45, 6, '06-10 Sales', 17200.00, 'CNY', '2025-06-10 00:00:00', 'Daily sales on June 10', 1);

-- 2025年用户活跃度数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(46, 7, 'Monday Active Users', 1250.00, 'people', '2025-06-16 00:00:00', 'Active users on Monday', 1),
(47, 7, 'Tuesday Active Users', 1380.00, 'people', '2025-06-17 00:00:00', 'Active users on Tuesday', 1),
(48, 7, 'Wednesday Active Users', 1420.00, 'people', '2025-06-18 00:00:00', 'Active users on Wednesday', 1),
(49, 7, 'Thursday Active Users', 1560.00, 'people', '2025-06-19 00:00:00', 'Active users on Thursday', 1),
(50, 7, 'Friday Active Users', 1680.00, 'people', '2025-06-20 00:00:00', 'Active users on Friday', 1),
(51, 7, 'Saturday Active Users', 1950.00, 'people', '2025-06-21 00:00:00', 'Active users on Saturday', 1),
(52, 7, 'Sunday Active Users', 1880.00, 'people', '2025-06-22 00:00:00', 'Active users on Sunday', 1);

-- 2025年产品库存数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(53, 8, 'Product A Inventory', 2250.00, 'units', '2025-06-15 00:00:00', 'Stock level for Product A', 1),
(54, 8, 'Product B Inventory', 1890.00, 'units', '2025-06-15 00:00:00', 'Stock level for Product B', 1),
(55, 8, 'Product C Inventory', 3100.00, 'units', '2025-06-15 00:00:00', 'Stock level for Product C', 1),
(56, 8, 'Product D Inventory', 1560.00, 'units', '2025-06-15 00:00:00', 'Stock level for Product D', 1),
(57, 8, 'Product E Inventory', 2800.00, 'units', '2025-06-15 00:00:00', 'Stock level for Product E', 1),
(58, 8, 'Product F Inventory', 1950.00, 'units', '2025-06-15 00:00:00', 'Stock level for Product F', 1),
(59, 8, 'Product G Inventory', 2420.00, 'units', '2025-06-15 00:00:00', 'Stock level for Product G', 1),
(60, 8, 'Product H Inventory', 1680.00, 'units', '2025-06-15 00:00:00', 'Stock level for Product H', 1);

-- 2025年网站流量数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(61, 9, 'Daily Page Views', 12580.00, 'views', '2025-06-10 00:00:00', 'Page views on June 10', 1),
(62, 9, 'Daily Unique Visitors', 2850.00, 'people', '2025-06-10 00:00:00', 'Unique visitors on June 10', 1),
(63, 9, 'Bounce Rate', 38.50, '%', '2025-06-10 00:00:00', 'Bounce rate on June 10', 1),
(64, 9, 'Avg Session Duration', 5.20, 'min', '2025-06-10 00:00:00', 'Average session duration', 1),
(65, 9, 'Daily Page Views', 13200.00, 'views', '2025-06-11 00:00:00', 'Page views on June 11', 1),
(66, 9, 'Daily Unique Visitors', 3180.00, 'people', '2025-06-11 00:00:00', 'Unique visitors on June 11', 1),
(67, 9, 'Bounce Rate', 35.80, '%', '2025-06-11 00:00:00', 'Bounce rate on June 11', 1),
(68, 9, 'Avg Session Duration', 5.80, 'min', '2025-06-11 00:00:00', 'Average session duration', 1),
(69, 9, 'Daily Page Views', 14150.00, 'views', '2025-06-12 00:00:00', 'Page views on June 12', 1),
(70, 9, 'Daily Unique Visitors', 3520.00, 'people', '2025-06-12 00:00:00', 'Unique visitors on June 12', 1);

-- 2025年客户增长数据
INSERT INTO biz_data (id, category_id, title, "value", unit, "time", remark, create_by) VALUES
(71, 10, 'New Customers Jan 2025', 556.00, 'people', '2025-01-31 00:00:00', 'New customers in January', 1),
(72, 10, 'New Customers Feb 2025', 582.00, 'people', '2025-02-28 00:00:00', 'New customers in February', 1),
(73, 10, 'New Customers Mar 2025', 610.00, 'people', '2025-03-31 00:00:00', 'New customers in March', 1),
(74, 10, 'New Customers Apr 2025', 645.00, 'people', '2025-04-30 00:00:00', 'New customers in April', 1),
(75, 10, 'New Customers May 2025', 689.00, 'people', '2025-05-31 00:00:00', 'New customers in May', 1),
(76, 10, 'New Customers Jun 2025', 712.00, 'people', '2025-06-30 00:00:00', 'New customers in June', 1),
(77, 10, 'Customer Retention Rate', 92.50, '%', '2025-06-30 00:00:00', 'Customer retention rate', 1),
(78, 10, 'Avg Customer Lifetime', 32.50, 'month', '2025-06-30 00:00:00', 'Average customer lifetime', 1);

-- 操作日志数据 (2025年)
INSERT INTO sys_log (id, user_id, username, operation, module, content, ip_address, create_time) VALUES
(1, 1, 'admin', 'LOGIN', 'AUTH', 'System admin logged in successfully', '192.168.1.100', '2025-06-15 09:00:00'),
(2, 1, 'admin', 'VIEW', 'DATA', 'Viewed data visualization dashboard', '192.168.1.100', '2025-06-15 09:05:00'),
(3, 2, 'editor', 'LOGIN', 'AUTH', 'Data editor logged in successfully', '192.168.1.101', '2025-06-15 09:30:00'),
(4, 2, 'editor', 'ADD', 'DATA', 'Added new sales data entry', '192.168.1.101', '2025-06-15 09:45:00'),
(5, 2, 'editor', 'UPDATE', 'DATA', 'Updated June 2025 sales data', '192.168.1.101', '2025-06-15 10:20:00'),
(6, 1, 'admin', 'EXPORT', 'REPORT', 'Exported monthly sales report', '192.168.1.100', '2025-06-15 10:45:00'),
(7, 3, 'viewer', 'LOGIN', 'AUTH', 'Data viewer logged in successfully', '192.168.1.102', '2025-06-15 11:00:00'),
(8, 3, 'viewer', 'VIEW', 'DATA', 'Viewed quarterly finance report', '192.168.1.102', '2025-06-15 11:10:00'),
(9, 1, 'admin', 'CONFIG', 'SYSTEM', 'Updated system configuration', '192.168.1.100', '2025-06-15 11:30:00'),
(10, 2, 'editor', 'IMPORT', 'DATA', 'Imported data from Excel file', '192.168.1.101', '2025-06-15 12:00:00'),
(11, 1, 'admin', 'LOGOUT', 'AUTH', 'System admin logged out', '192.168.1.100', '2025-06-15 12:15:00'),
(12, 3, 'viewer', 'LOGIN', 'AUTH', 'Data viewer logged in successfully', '192.168.1.102', '2025-06-15 13:00:00'),
(13, 3, 'viewer', 'VIEW', 'ALERT', 'Viewed data alert rules', '192.168.1.102', '2025-06-15 13:15:00'),
(14, 2, 'editor', 'LOGIN', 'AUTH', 'Data editor logged in successfully', '192.168.1.101', '2025-06-15 14:00:00'),
(15, 2, 'editor', 'DELETE', 'DATA', 'Deleted outdated data entry', '192.168.1.101', '2025-06-15 14:20:00');

-- 初始化预警配置
INSERT INTO sys_alert (id, category_id, alert_type, threshold_value, comparison_type, alert_message, status) VALUES
(1, 1, 'THRESHOLD', 200000.00, 'LT', 'Monthly sales below threshold alert', 1),
(2, 3, 'THRESHOLD', 150000.00, 'LT', 'Monthly revenue below threshold alert', 1),
(3, 8, 'THRESHOLD', 500.00, 'LT', 'Low inventory alert', 1),
(4, 9, 'THRESHOLD', 10000.00, 'LT', 'Low website traffic alert', 1);
