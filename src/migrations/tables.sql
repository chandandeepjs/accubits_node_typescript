SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `loans` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `plan_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `initial_coin_value` double DEFAULT NULL,
  `current_coin_value` double DEFAULT NULL,
  `coin_id` varchar(255) DEFAULT NULL,
  `coin_quantity` double DEFAULT NULL,
  `ltv_amount` double DEFAULT NULL,
  `status` tinyint DEFAULT '0' COMMENT 'PENDING = 0, APPROVED = 1, CLOSE = 2',
  `loan_status` tinyint DEFAULT '0' COMMENT 'PENDING: 0, MARGIN: 1, LIQUIDITY: 2, OVERDUE: 3',
  `overdue_amount` double DEFAULT '0',
  `loan_initial_date` datetime NOT NULL,
  `next_emi_date` datetime DEFAULT NULL,
  `approved_date` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `loan_interests` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `loan_id` varchar(255) DEFAULT NULL,
  `plan_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `emi_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `plans` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `interest_rate` int DEFAULT NULL,
  `ltv_percent` int DEFAULT NULL,
  `margin_call` int DEFAULT NULL,
  `liquidation_call` int DEFAULT NULL,
  `overdue` int DEFAULT NULL,
  `min_amount` int DEFAULT '10000',
  `max_amount` int DEFAULT '10000000',
  `crypto` varchar(255) DEFAULT NULL,
  `fiat` varchar(255) DEFAULT NULL,
  `min_tenure` int DEFAULT '6',
  `max_tenure` int DEFAULT '120',
  `interest_period` int DEFAULT '0',
  `status` int DEFAULT '0' COMMENT 'ENABLE = 0, DISABLE = 1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loan_interests`
--
ALTER TABLE `loan_interests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);
COMMIT;