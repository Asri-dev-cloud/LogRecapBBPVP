CREATE DATABASE IF NOT EXISTS logrecap_db;
USE logrecap_db;

-- 1. Table: users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    fullName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    bio TEXT DEFAULT NULL,
    totalPoints INT DEFAULT 0,
    streak INT DEFAULT 0,
    last_quiz_at TIMESTAMP DEFAULT NULL,
    phone_number VARCHAR(20) DEFAULT NULL UNIQUE,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 7 HOUR)
);


-- 2. Table: certificates
CREATE TABLE IF NOT EXISTS certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    quiz_title VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    percentage INT NOT NULL,
    created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 7 HOUR),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Pendaftaran (Register) User Baru
DROP PROCEDURE IF EXISTS sp_register_user;
DELIMITER //
CREATE PROCEDURE sp_register_user(
    IN p_username VARCHAR(50),
    IN p_fullName VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255)
)
BEGIN
    INSERT INTO users (username, fullName, email, password)
    VALUES (p_username, p_fullName, p_email, p_password);
END //
DELIMITER ;

-- Ambil Data Profil Berdasarkan ID
DROP PROCEDURE IF EXISTS sp_get_user_by_id;
DELIMITER //
CREATE PROCEDURE sp_get_user_by_id(
    IN p_id INT
)
BEGIN
    SELECT id, username, fullName, email, bio, totalPoints, streak, role, last_quiz_at, created_at 
    FROM users 
    WHERE id = p_id;
END //
DELIMITER ;

-- Ambil Data Berdasarkan Username/Email (Buat Proses Login)
DROP PROCEDURE IF EXISTS sp_get_user_for_login;
DELIMITER //
CREATE PROCEDURE sp_get_user_for_login(
    IN p_login VARCHAR(100)
)
BEGIN
    SELECT id, username, fullName, email, password, bio, totalPoints, streak, role, last_quiz_at, created_at 
    FROM users 
    WHERE email = p_login OR username = p_login;
END //
DELIMITER ;

-- Mengubah Data Profil User
DROP PROCEDURE IF EXISTS sp_update_user;
DELIMITER //
CREATE PROCEDURE sp_update_user(
    IN p_id INT,
    IN p_username VARCHAR(50),
    IN p_fullName VARCHAR(100),
    IN p_bio TEXT
)
BEGIN
    UPDATE users 
    SET username = p_username,
        fullName = p_fullName,
        bio = p_bio
    WHERE id = p_id;
END //
DELIMITER ;

-- Menghapus Akun User
DROP PROCEDURE IF EXISTS sp_delete_user;
DELIMITER //
CREATE PROCEDURE sp_delete_user(
    IN p_id INT
)
BEGIN
    DELETE FROM users 
    WHERE id = p_id;
END //
DELIMITER ;

-- Ambil Leaderboard Teratas (Top 20)
DROP PROCEDURE IF EXISTS sp_get_leaderboard;
DELIMITER //
CREATE PROCEDURE sp_get_leaderboard()
BEGIN
    SELECT id, username, fullName, totalPoints, streak 
    FROM users 
    ORDER BY totalPoints DESC 
    LIMIT 20;
END //
DELIMITER ;

-- Ambil Riwayat Sertifikat User
DROP PROCEDURE IF EXISTS sp_get_user_certificates;
DELIMITER //
CREATE PROCEDURE sp_get_user_certificates(
    IN p_user_id INT
)
BEGIN
    SELECT id, quiz_id, quiz_title, score, total_questions, percentage, created_at AS date
    FROM certificates
    WHERE user_id = p_user_id
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Tambah Sertifikat Baru
DROP PROCEDURE IF EXISTS sp_add_certificate;
DELIMITER //
CREATE PROCEDURE sp_add_certificate(
    IN p_user_id INT,
    IN p_quiz_id INT,
    IN p_quiz_title VARCHAR(255),
    IN p_score INT,
    IN p_total_questions INT,
    IN p_percentage INT
)
BEGIN
    INSERT INTO certificates (user_id, quiz_id, quiz_title, score, total_questions, percentage)
    VALUES (p_user_id, p_quiz_id, p_quiz_title, p_score, p_total_questions, p_percentage);
END //
DELIMITER ;

-- Update Poin dan Streak User
DROP PROCEDURE IF EXISTS sp_update_user_points_streak;
DELIMITER //
CREATE PROCEDURE sp_update_user_points_streak(
    IN p_user_id INT,
    IN p_points_earned INT,
    IN p_streak_val INT
)
BEGIN
    UPDATE users
    SET totalPoints = totalPoints + p_points_earned,
        streak = p_streak_val,
        last_quiz_at = CURRENT_TIMESTAMP
    WHERE id = p_user_id;
END //
DELIMITER ;

-- 3. Table: quizzes
CREATE TABLE IF NOT EXISTS quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty VARCHAR(50) DEFAULT 'Easy',
    totalQuestions INT DEFAULT 0,
    icon VARCHAR(100) DEFAULT 'Zap',
    category VARCHAR(100) DEFAULT 'general',
    created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 7 HOUR)
);

-- 4. Table: quiz_questions
CREATE TABLE IF NOT EXISTS quiz_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    question TEXT NOT NULL,
    options JSON NOT NULL,
    correct INT NOT NULL,
    image LONGTEXT DEFAULT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- 5. Table: materials
CREATE TABLE IF NOT EXISTS materials (
    id VARCHAR(100) PRIMARY KEY,
    topic_slug VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    points JSON,
    code TEXT,
    language VARCHAR(50),
    code_title VARCHAR(100),
    created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 7 HOUR)
);

-- 6. Table: activity_logs
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    username VARCHAR(100) NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 7 HOUR)
);

-- 7. Table: notes
CREATE TABLE IF NOT EXISTS notes (
    id VARCHAR(100) PRIMARY KEY,
    user_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content JSON NOT NULL,
    created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 7 HOUR),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Stored Procedure to Log Activity
DROP PROCEDURE IF EXISTS sp_log_activity;
DELIMITER //
CREATE PROCEDURE sp_log_activity(
    IN p_user_id INT,
    IN p_username VARCHAR(100),
    IN p_action VARCHAR(255),
    IN p_details TEXT
)
BEGIN
    INSERT INTO activity_logs (user_id, username, action, details)
    VALUES (p_user_id, p_username, p_action, p_details);
END //
DELIMITER ;
