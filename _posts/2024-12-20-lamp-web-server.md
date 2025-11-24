---
layout: single
title: "LAMP-Based Bulletin Board System & Infrastructure"
excerpt: "A comprehensive project deploying a secure LAMP stack on AWS Lightsail, configuring Apache custom ports, and developing a PHP-based bulletin board system."
categories:
  - Infrastructure
  - Web Development
tags:
  - AWS
  - Linux
  - Apache
  - MySQL
  - PHP
header:
  teaser: /assets/images/lamp_thumbnail.png
sidebar:
  - title: "Role"
    image: /assets/images/profile.jpg
    image_alt: "profile"
    text: "Cloud Engineer & Backend Developer"
  - title: "Tech Stack"
    text: "AWS Lightsail, Ubuntu Linux, Apache2, MySQL 8.0, PHP 8, Docker"
  - title: "Source Code"
    text: "View the full source code and documentation. <br><br> [View on GitHub](https://github.com/JihunB/KnockOn){: .btn .btn--primary .btn--large}"
---

![AWS](https://img.shields.io/badge/AWS-Lightsail-232F3E?logo=amazon-aws&logoColor=white)
![Apache](https://img.shields.io/badge/Server-Apache2-D22128?logo=apache&logoColor=white)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white)
![PHP](https://img.shields.io/badge/Language-PHP-777BB4?logo=php&logoColor=white)

## 📌 Project Overview
This project involves building a full **LAMP (Linux, Apache, MySQL, PHP)** web server environment from scratch on **AWS Lightsail**. The primary goal was to understand the fundamental architecture of web servers and create a custom testing environment for future web security and hacking simulations.

## 🚀 Infrastructure Setup (AWS Lightsail)

### 1. Instance Creation
* **Platform:** Linux/Unix (Ubuntu)
* **Blueprint:** LAMP (PHP 8)
* **Instance Name:** `LAMP_KnockOn`

### 2. Networking & Security
To separate the bulletin board traffic from standard web traffic, the firewall rules were configured to allow a custom port.
* **SSH:** Enabled for remote management.
* **Firewall:** Added rule to allow **TCP Port 8081**.

---

## 🛠️ Server Configuration

### 1. Apache Web Server Setup
Installed and configured Apache2 to serve the application on a custom port.

**Installation**
```bash
sudo apt install apache2 -y
sudo systemctl start apache2
sudo systemctl enable apache2
```

**Check Status**
```bash
sudo systemctl status apache2
```

**Configuration Changes**
  Modified /etc/apache2/ports.conf: Added Listen 8081

  Modified VirtualHost configuration: <VirtualHost *:8081>

  Updated DocumentRoot permissions in /etc/apache2/apache2.conf:

```bash
<Directory /opt/bitnami/apache/htdocs>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```
### 2. MySQL Database Setup
Secured the database installation and set up the schema for the bulletin board.

**Security Hardening**: Run mysql_secure_installation to enforce security policies:

[x] Validate Password Component

[x] Disallow root login remotely

[x] Remove anonymous users

[x] Remove test database

**User & Database Creation:**

```bash
CREATE DATABASE knockon_db;
CREATE USER 'knockon_user'@'localhost' IDENTIFIED BY 'YOUR_SECURE_PASSWORD';
GRANT ALL PRIVILEGES ON knockon_db.* TO 'knockon_user'@'localhost';
FLUSH PRIVILEGES;
```

## Database Schema Design
Designed a relational database schema to support users, posts, and file uploads.

```bash
USE knockon_db;

/* User Table */
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Posts Table */
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

/* Files Table */
CREATE TABLE files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id)
);
```

## Application Development (PHP)
Developed the core backend logic for the bulletin board system using PHP.

**Key Files & Features**
- Authentication: login.php, register.php, logout.php (Session management)

- Board Functions:

-- create_posts.php: Write new posts with file attachments.

-- list_posts.php: Display list of posts from MySQL.

-- edit_post.php / delete_post.php: Modify or remove content.

- Infrastructure as Code:

-- Dockerfile.php & Dockerfile.db: Containerization setup for future migration.

-- docker-compose.yml: Orchestration configuration.

## Conclusion
This project successfully established a secure and functional LAMP environment. By manually configuring Apache ports and MySQL permissions, I gained a deep understanding of server administration, which serves as a strong foundation for my cybersecurity studies.
