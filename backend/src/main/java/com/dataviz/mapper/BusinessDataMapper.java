package com.dataviz.mapper;

import com.dataviz.entity.BusinessData;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.jdbc.SQL;
import java.util.List;
import java.util.Map;

@Mapper
public interface BusinessDataMapper {

    @SelectProvider(type = BusinessDataSqlProvider.class, method = "findByPage")
    List<BusinessData> findByPage(Map<String, Object> params);

    @SelectProvider(type = BusinessDataSqlProvider.class, method = "countTotal")
    int countTotal(Map<String, Object> params);

    @Select("SELECT d.*, c.name as category_name FROM biz_data d " +
            "LEFT JOIN sys_category c ON d.category_id = c.id WHERE d.id = #{id}")
    BusinessData findById(Long id);

    @Select("SELECT d.*, c.name as category_name FROM biz_data d " +
            "LEFT JOIN sys_category c ON d.category_id = c.id WHERE d.category_id = #{categoryId} " +
            "ORDER BY d.\"time\" DESC")
    List<BusinessData> findByCategoryId(Long categoryId);

    @Insert("INSERT INTO biz_data(category_id, title, \"value\", unit, \"time\", remark, create_time) " +
            "VALUES(#{categoryId}, #{title}, #{value}, #{unit}, #{time}, #{remark}, CURRENT_TIMESTAMP())")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(BusinessData data);

    @InsertProvider(type = BusinessDataSqlProvider.class, method = "batchInsert")
    int batchInsert(List<BusinessData> dataList);

    class BusinessDataSqlProvider {
        public String findByPage(Map<String, Object> params) {
            return new SQL() {{
                SELECT("d.*, c.name as category_name");
                FROM("biz_data d");
                LEFT_OUTER_JOIN("sys_category c ON d.category_id = c.id");
                if (params.get("categoryId") != null && !params.get("categoryId").toString().isEmpty()) {
                    WHERE("d.category_id = #{categoryId}");
                }
                if (params.get("keyword") != null && !params.get("keyword").toString().isEmpty()) {
                    WHERE("d.title LIKE '%' || #{keyword} || '%'");
                }
                if (params.get("startDate") != null && !params.get("startDate").toString().isEmpty()) {
                    WHERE("d.\"time\" >= #{startDate}");
                }
                if (params.get("endDate") != null && !params.get("endDate").toString().isEmpty()) {
                    WHERE("d.\"time\" <= #{endDate}");
                }
                if (params.get("minValue") != null) {
                    WHERE("d.\"value\" >= #{minValue}");
                }
                if (params.get("maxValue") != null) {
                    WHERE("d.\"value\" <= #{maxValue}");
                }
                ORDER_BY("d.create_time DESC");
            }}.toString() + " LIMIT #{size} OFFSET #{offset}";
        }

        public String countTotal(Map<String, Object> params) {
            return new SQL() {{
                SELECT("COUNT(*)");
                FROM("biz_data d");
                if (params.get("categoryId") != null && !params.get("categoryId").toString().isEmpty()) {
                    WHERE("d.category_id = #{categoryId}");
                }
                if (params.get("keyword") != null && !params.get("keyword").toString().isEmpty()) {
                    WHERE("d.title LIKE '%' || #{keyword} || '%'");
                }
                if (params.get("startDate") != null && !params.get("startDate").toString().isEmpty()) {
                    WHERE("d.\"time\" >= #{startDate}");
                }
                if (params.get("endDate") != null && !params.get("endDate").toString().isEmpty()) {
                    WHERE("d.\"time\" <= #{endDate}");
                }
                if (params.get("minValue") != null) {
                    WHERE("d.\"value\" >= #{minValue}");
                }
                if (params.get("maxValue") != null) {
                    WHERE("d.\"value\" <= #{maxValue}");
                }
            }}.toString();
        }

        public String batchInsert(List<BusinessData> dataList) {
            StringBuilder sb = new StringBuilder();
            sb.append("INSERT INTO biz_data(category_id, title, \"value\", unit, \"time\", remark, create_time) VALUES ");
            for (int i = 0; i < dataList.size(); i++) {
                if (i > 0) sb.append(",");
                sb.append("(#{list[")
                  .append(i)
                  .append("].categoryId}, #{list[")
                  .append(i)
                  .append("].title}, #{list[")
                  .append(i)
                  .append("].value}, #{list[")
                  .append(i)
                  .append("].unit}, #{list[")
                  .append(i)
                  .append("].time}, #{list[")
                  .append(i)
                  .append("].remark}, CURRENT_TIMESTAMP())");
            }
            return sb.toString();
        }

        public String findChartDataByFilter(Map<String, Object> params) {
            return new SQL() {{
                SELECT("YEAR(d.\"time\") as year_val, MONTH(d.\"time\") as month_val, " +
                       "CONCAT(YEAR(d.\"time\"), '-', LPAD(MONTH(d.\"time\"), 2, '0')) as name, " +
                       "SUM(d.\"value\") as total_val");
                FROM("biz_data d");
                if (params.get("categoryId") != null && !params.get("categoryId").toString().isEmpty()) {
                    WHERE("d.category_id = #{categoryId}");
                }
                if (params.get("startDate") != null && !params.get("startDate").toString().isEmpty()) {
                    WHERE("d.\"time\" >= #{startDate}");
                }
                if (params.get("endDate") != null && !params.get("endDate").toString().isEmpty()) {
                    WHERE("d.\"time\" <= #{endDate}");
                }
                GROUP_BY("YEAR(d.\"time\"), MONTH(d.\"time\")");
                ORDER_BY("YEAR(d.\"time\") ASC, MONTH(d.\"time\") ASC");
            }}.toString();
        }
    }

    @Update("UPDATE biz_data SET category_id = #{categoryId}, title = #{title}, " +
            "\"value\" = #{value}, unit = #{unit}, \"time\" = #{time}, remark = #{remark} WHERE id = #{id}")
    int update(BusinessData data);

    @Delete("DELETE FROM biz_data WHERE id = #{id}")
    int deleteById(Long id);

    @Select("SELECT COUNT(*) FROM biz_data")
    int countAll();

    @Select("SELECT COUNT(*) FROM biz_data WHERE YEAR(\"time\") = YEAR(CURRENT_DATE) AND MONTH(\"time\") = MONTH(CURRENT_DATE)")
    int countMonth();

    @Select("SELECT c.name as name, SUM(d.\"value\") as value FROM biz_data d " +
            "LEFT JOIN sys_category c ON d.category_id = c.id " +
            "GROUP BY d.category_id, c.name ORDER BY SUM(d.\"value\") DESC")
    List<Map<String, Object>> findChartDataByCategory();

    @Select("SELECT year_val, month_val, CONCAT(year_val, '-', LPAD(month_val, 2, '0')) as name, total_value FROM (" +
            "SELECT YEAR(\"time\") as year_val, MONTH(\"time\") as month_val, SUM(\"value\") as total_value " +
            "FROM biz_data GROUP BY YEAR(\"time\"), MONTH(\"time\")) t ORDER BY year_val ASC, month_val ASC")
    List<Map<String, Object>> findChartDataByTime();

    // 环比统计：本月与上月对比
    @Select("WITH monthly_data AS (" +
            "SELECT YEAR(\"time\") as year, MONTH(\"time\") as month, SUM(\"value\") as total " +
            "FROM biz_data GROUP BY YEAR(\"time\"), MONTH(\"time\")" +
            ") " +
            "SELECT " +
            "CONCAT(m1.year, '-', LPAD(m1.month, 2, '0')) as currentMonth, " +
            "m1.total as currentValue, " +
            "CASE WHEN m2.total IS NULL OR m2.total = 0 THEN 0 " +
            "ELSE ROUND((m1.total - m2.total) / m2.total * 100, 2) END as changeRate " +
            "FROM monthly_data m1 " +
            "LEFT JOIN monthly_data m2 ON (m1.year = m2.year AND m1.month = m2.month + 1) OR (m1.year = m2.year + 1 AND m1.month = 1 AND m2.month = 12) " +
            "ORDER BY m1.year DESC, m1.month DESC LIMIT 12")
    List<Map<String, Object>> findMonthOverMonthStats();

    // 同比统计：本月与去年同期对比
    @Select("WITH yearly_data AS (" +
            "SELECT YEAR(\"time\") as year, MONTH(\"time\") as month, SUM(\"value\") as total " +
            "FROM biz_data GROUP BY YEAR(\"time\"), MONTH(\"time\")" +
            ") " +
            "SELECT " +
            "CONCAT(m1.year, '-', LPAD(m1.month, 2, '0')) as currentMonth, " +
            "m1.total as currentValue, " +
            "m2.total as lastYearValue, " +
            "CASE WHEN m2.total IS NULL OR m2.total = 0 THEN 0 " +
            "ELSE ROUND((m1.total - m2.total) / m2.total * 100, 2) END as changeRate " +
            "FROM yearly_data m1 " +
            "LEFT JOIN yearly_data m2 ON m1.year = m2.year + 1 AND m1.month = m2.month " +
            "ORDER BY m1.year DESC, m1.month DESC LIMIT 12")
    List<Map<String, Object>> findYearOverYearStats();

    // 按分类和时间筛选的图表数据
    @SelectProvider(type = BusinessDataSqlProvider.class, method = "findChartDataByFilter")
    List<Map<String, Object>> findChartDataByFilter(Map<String, Object> params);

    // 统计汇总数据
    @Select("SELECT " +
            "SUM(\"value\") as totalValue, " +
            "AVG(\"value\") as avgValue, " +
            "MAX(\"value\") as maxValue, " +
            "MIN(\"value\") as minValue, " +
            "COUNT(*) as totalCount " +
            "FROM biz_data WHERE YEAR(\"time\") = YEAR(CURRENT_DATE)")
    Map<String, Object> findYearlySummary();
}