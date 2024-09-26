-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-01-05 07:08:58
-- 伺服器版本： 10.4.22-MariaDB
-- PHP 版本： 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `foodorder`
--

-- --------------------------------------------------------

--
-- 資料表結構 `account`
--

CREATE TABLE `account` (
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `account`
--

INSERT INTO `account` (`account`, `password`, `name`, `phone`) VALUES
('asd4251', '$2y$10$nlU3kM8SQHHLUOtwzd6HIO8mt/bGhJYc8hAQr3gsteTugEDMMoYoe', 'tester', '0975621421'),
('ken4768', '$2y$10$hxFqDzR4pJMMrYFSLAJo8OeOETVDY/foQTS23Kt/YFe5H7kqk5ZSe', '盧悅盛', '0912345678'),
('mike54856', '$2y$10$Zivmkz6aBeK3ihglOXYXEOCsb7ppnkn1/kSRFAJN4fzPyh8hV1nzG', 'Mike', '0957357467'),
('qwe234', '$2y$10$OzRiLfPiwLBuqS9fh0JISuiOmpxhEcFj7pVpjcyaZ26y4Y/w1IOSi', 'tester', '0912345678'),
('restaurant_1', '$2y$10$pbPiPqry8lVxFNUrYpVJpe30RoiSAFBwou6p13.29TS08t0.blX3y', '摩斯漢堡', '0975754753'),
('restaurant_2', '$2y$10$V/Gnbx8MfXvnfIcmoPwAMuA72rskSOrfF3Y/TAjzB9Qvf.AkqWz6S', '麥味登', '0957653664'),
('restaurant_3', '$2y$10$Z8Hszq8UCeeNv2iKhHC8SujtKyMUYEEj5icpmb7c18PMPF3wz2e4y', '路易莎咖啡', '0956631342'),
('tim1242', '$2y$10$QUKvJJOiSsepbeeL9XfZR.irXkohMgVCbtIlm.W/DzIbrMgMRwO92', '張先生', '0976576132');

-- --------------------------------------------------------

--
-- 資料表結構 `orderlist`
--

CREATE TABLE `orderlist` (
  `account` varchar(255) NOT NULL,
  `restaurant` varchar(255) NOT NULL,
  `content` varchar(2048) NOT NULL,
  `orderTime` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `feedback` int(11) NOT NULL,
  `number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `orderlist`
--

INSERT INTO `orderlist` (`account`, `restaurant`, `content`, `orderTime`, `price`, `status`, `feedback`, `number`) VALUES
('mike54856', '麥味登', '鮮蔬漢堡 x1:40,薯餅蛋餅 x1:45,香檸雞柳條 x1:40,豆漿 x2:50', '2023-01-04 11:44', 175, 'completed', 5, 8),
('mike54856', '路易莎咖啡', '火腿麥香三明治 x1:45,100%檸檬糖霜溫蛋糕 x1:65,咖啡拿鐵 x1:70', '2023-01-04 13:00', 180, 'canceled', 0, 9),
('ken4768', '摩斯漢堡', '藜麥海洋珍珠堡 x1:80,摩斯鱈魚堡 x1:70,方塊薯餅(3個) x2:70,冰紅茶 x1:40', '2023-01-04 11:10', 260, 'completed', 2, 10),
('ken4768', '麥味登', '薯餅蛋塔 x1:45,奶茶 x1:25', '2023-01-04 12:39', 70, 'completed', 2, 11),
('mike54856', '摩斯漢堡', '藜麥海洋珍珠堡 x1:80,黃金炸蝦堡 x1:75,元氣和牛珍珠堡 x1:105,黃金夯地瓜(S)(3個) x1:45', '2023-01-04 12:48', 305, 'completed', 3, 12),
('ken4768', '路易莎咖啡', '火腿麥香三明治 x1:45,豬肉起司瑪芬堡 x1:55,卡布奇諾 x1:70', '2023-01-04 11:50', 170, 'completed', 3, 13),
('ken4768', '摩斯漢堡', '藜麥海洋珍珠堡 x1:80,燒肉珍珠堡 x1:70', '2023-01-04 12:51', 150, 'completed', 1, 14),
('mike54856', '麥味登', '鮮蔬漢堡 x1:40,豬肉漢堡 x1:35', '2023-01-05 11:54', 75, 'completed', 0, 15),
('mike54856', '摩斯漢堡', '燒肉珍珠堡 x1:70,藜麥海洋珍珠堡 x1:80', '2023-01-05 11:30', 150, 'completed', 0, 16),
('mike54856', '麥味登', '鮪魚漢堡 x2:90,鮮蔬漢堡 x2:80,鮪魚蛋餅 x2:90,奶茶 x2:50', '2023-01-05 11:10', 310, 'completed', 1, 17),
('mike54856', '路易莎咖啡', '火腿麥香三明治 x1:45,豬肉起司瑪芬堡 x1:55,香蕉核桃旅人蛋糕 x1:35,拿鐵歐蕾 x1:65', '2023-01-05 15:50', 200, 'completed', 5, 18);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account`);

--
-- 資料表索引 `orderlist`
--
ALTER TABLE `orderlist`
  ADD PRIMARY KEY (`number`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orderlist`
--
ALTER TABLE `orderlist`
  MODIFY `number` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
