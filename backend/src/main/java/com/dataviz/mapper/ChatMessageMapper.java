package com.dataviz.mapper;

import com.dataviz.entity.ChatMessage;
import org.apache.ibatis.annotations.*;
import java.util.List;

@Mapper
public interface ChatMessageMapper {

    @Insert("INSERT INTO chat_message (user_id, role, content, created_at) " +
            "VALUES (#{userId}, #{role}, #{content}, #{createdAt})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(ChatMessage message);

    @Select("SELECT id, user_id as userId, role, content, created_at as createdAt " +
            "FROM chat_message WHERE user_id = #{userId} ORDER BY created_at ASC")
    List<ChatMessage> findByUserId(@Param("userId") String userId);

    @Select("SELECT id, user_id as userId, role, content, created_at as createdAt " +
            "FROM chat_message WHERE user_id = #{userId} ORDER BY created_at ASC LIMIT #{limit} OFFSET #{offset}")
    List<ChatMessage> findByUserIdWithLimit(@Param("userId") String userId,
                                             @Param("limit") int limit,
                                             @Param("offset") int offset);

    @Delete("DELETE FROM chat_message WHERE user_id = #{userId}")
    void deleteByUserId(@Param("userId") String userId);

    @Select("SELECT COUNT(*) FROM chat_message WHERE user_id = #{userId}")
    int countByUserId(@Param("userId") String userId);
}
