/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : toutiao

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 03/06/2021 17:16:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for black_list_table
-- ----------------------------
DROP TABLE IF EXISTS `black_list_table`;
CREATE TABLE `black_list_table`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int NULL DEFAULT NULL COMMENT '用户id',
  `blacked_uid` int NULL DEFAULT NULL COMMENT '被拉黑的用户id',
  `blacked_time` datetime(0) NULL DEFAULT NULL COMMENT '被拉黑的时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of black_list_table
-- ----------------------------

-- ----------------------------
-- Table structure for collect_table
-- ----------------------------
DROP TABLE IF EXISTS `collect_table`;
CREATE TABLE `collect_table`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int NULL DEFAULT NULL COMMENT '用户id',
  `publish_id` int NULL DEFAULT NULL COMMENT '收藏的文章id',
  `collect_time` datetime(0) NULL DEFAULT NULL COMMENT '收藏时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of collect_table
-- ----------------------------

-- ----------------------------
-- Table structure for commit_table
-- ----------------------------
DROP TABLE IF EXISTS `commit_table`;
CREATE TABLE `commit_table`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int NULL DEFAULT NULL COMMENT '评论人',
  `publish_id` int NULL DEFAULT NULL COMMENT '新闻主键（该条评论是那条新闻下的评论）',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '评论内容',
  `commit_publish_time` datetime(0) NULL DEFAULT NULL COMMENT '评论发布时间',
  `good_count` int NULL DEFAULT NULL COMMENT '获赞量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of commit_table
-- ----------------------------

-- ----------------------------
-- Table structure for fans_table
-- ----------------------------
DROP TABLE IF EXISTS `fans_table`;
CREATE TABLE `fans_table`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int NULL DEFAULT NULL COMMENT '用户id',
  `fans_uid` int NULL DEFAULT NULL COMMENT '粉丝id',
  `concern_time` datetime(0) NULL DEFAULT NULL COMMENT '关注时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of fans_table
-- ----------------------------

-- ----------------------------
-- Table structure for img_table
-- ----------------------------
DROP TABLE IF EXISTS `img_table`;
CREATE TABLE `img_table`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `img_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '首页banner轮播图url、',
  `img_position` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'img位置',
  `is_able` int NULL DEFAULT NULL COMMENT '是否可用 0不可用 1可用',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of img_table
-- ----------------------------

-- ----------------------------
-- Table structure for message_table
-- ----------------------------
DROP TABLE IF EXISTS `message_table`;
CREATE TABLE `message_table`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int NULL DEFAULT NULL COMMENT '接收人',
  `send_uid` int NULL DEFAULT NULL COMMENT '发送人',
  `msg_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '消息内容',
  `is_delete` int NULL DEFAULT NULL COMMENT '是否删除 0逻辑删除 1未删除 ',
  `is_read` int NULL DEFAULT NULL COMMENT '是否已读',
  `send_time` datetime(0) NULL DEFAULT NULL COMMENT '消息发送时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of message_table
-- ----------------------------

-- ----------------------------
-- Table structure for publish_table
-- ----------------------------
DROP TABLE IF EXISTS `publish_table`;
CREATE TABLE `publish_table`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int NOT NULL COMMENT '发布人',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章标题',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文章内容',
  `publish_time` datetime(0) NULL DEFAULT NULL COMMENT '发布时间',
  `read_count` int NULL DEFAULT NULL COMMENT '阅读量',
  `publish_type` int NULL DEFAULT NULL COMMENT '1新鲜事 2打听 3吐槽 4公告',
  `is_hot` int NULL DEFAULT NULL COMMENT '0不是热门 1是热门',
  `good_count` int NULL DEFAULT NULL COMMENT '获赞量',
  `update_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`, `uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of publish_table
-- ----------------------------

-- ----------------------------
-- Table structure for sign_in_table
-- ----------------------------
DROP TABLE IF EXISTS `sign_in_table`;
CREATE TABLE `sign_in_table`  (
  `id` int NOT NULL COMMENT '主键',
  `uid` int NOT NULL COMMENT '用户id',
  `sign_in_time` date NULL DEFAULT NULL COMMENT '签到日期',
  `is_add_sign_in` int NULL DEFAULT NULL COMMENT '是否为补签 0正常签到 1补签',
  PRIMARY KEY (`id`, `uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sign_in_table
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `phone` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `sex` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `born` date NULL DEFAULT NULL COMMENT '出生年月日',
  `province` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '省',
  `city` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '市',
  `person_describe` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '个人描述',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_by` int NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  `update_by` int NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', NULL, 'b203b0001be671512b40fc318cd7f2cd', '新用户1622689783199', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (2, 'admin1', NULL, 'admin', '新用户1622699111514', NULL, NULL, NULL, NULL, NULL, NULL, '2021-06-03 13:45:12', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
