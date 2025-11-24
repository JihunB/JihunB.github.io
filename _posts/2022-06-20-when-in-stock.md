---
layout: single
title: "WhenInStock - Real-time Stock Availability Notifier"
excerpt: "An open-source automation tool using Docker and Raspberry Pi to track high-demand product availability and send real-time alerts via Webhooks."
categories:
  - Development
  - Automation
tags:
  - Docker
  - Raspberry Pi
  - Shell Scripting
  - Webhooks
header:
  teaser: /assets/images/WhenInStock.png # Make sure to add a thumbnail image with this name
sidebar:
  - title: "Role"
    image: /assets/images/profile.png # Optional: Your profile picture path
    image_alt: "logo"
    text: "Developer & Maintainer"
  - title: "Tech Stack"
    text: "Docker, Raspberry Pi, Bash, Webhooks"
  - title: "Source Code"
    text: "View the full source code and documentation."
    nav:
      - name: "View on GitHub"
        link: "https://github.com/JihunB/WhenInStock"
        icon: "fab fa-fw fa-github"
---

![Docker](https://img.shields.io/badge/Docker-Container-2496ED?logo=docker&logoColor=white)
![Raspberry Pi](https://img.shields.io/badge/Hardware-Raspberry%20Pi-C51A4A?logo=raspberrypi&logoColor=white)
![Discord](https://img.shields.io/badge/Alerts-Discord-5865F2?logo=discord&logoColor=white)

## 📌 Project Overview

**WhenInStock** is an open-source software solution designed to solve the problem of purchasing high-demand products that frequently go out of stock. 

The system continually monitors specified URLs for the "add to cart" phrase. Once a product is detected in stock (and below a specific price threshold), it triggers an immediate automated alert via the user's preferred communication channel (Discord, Slack, Telegram, or Email).

## 🚀 Key Features & Benefits
* **Real-time Monitoring:** Continually refreshes product pages to detect availability instantly.
* **Self-Hosted:** Runs on your own hardware (Raspberry Pi/Docker), ensuring privacy and dedicated processing power.
* **Customizable Alerts:** Supports multi-channel notifications via Webhooks.
* **User Control:** Users define the refresh frequency and specific products to track.

---

## 🛠️ Requirements
* **Hardware:** Raspberry Pi 2 or newer (or an always-on PC/Mac).
* **Software:** Docker ([Installation Tutorial](https://docs.docker.com/get-docker/)).
* **Notification Channel:** One of the following:
    * Discord Webhook URL
    * Slack Webhook URL
    * Telegram Webhook URL & Chat ID
    * SMTP Relay (for email alerts)

---

## 💻 How to Get Started

### 1. Installation
The project is optimized for Raspberry Pi OS with Docker installed.

```bash
# Clone the repository
git clone [https://github.com/JihunB/WhenInStock](https://github.com/JihunB/WhenInStock)

# Navigate to the directory
cd WhenInStock

# Pull the latest Docker image
sudo docker pull ericjmarti/inventory-hunter:latest
```

### 2. Configuration
Create your own configuration file based on the provided examples (e.g., Amazon RTX 3080, Newegg RTX 3070).

### 3. Execution
Start the Docker container using the provided bash script. You must specify the config file and your webhook details.

Example: Discord Alert
```bash
./docker_run.bash -c ./config/newegg_rtx_3070.yaml -a discord -w [https://discord.com/api/webhooks/](https://discord.com/api/webhooks/)...
```

Example: SMTP (Email) Alert
```bash
./docker_run.bash -c ./config/newegg_rtx_3070.yaml -e myemail@email.com -r 127.0.0.1
``` 

# ⚙️ Advanced Configuration: Multiple Alerters
To use multiple notification methods simultaneously, create a alerters.yaml file in the config directory.
```bash
alerters:
  discord:
    webhook_url: [https://discord.com/api/webhooks/YOUR_WEBHOOK_KEY](https://discord.com/api/webhooks/YOUR_WEBHOOK_KEY)
    mentions:
      - USER_ID_1
  telegram:
    webhook_url: [https://api.telegram.org/botKEY/sendMessage](https://api.telegram.org/botKEY/sendMessage)
    chat_id: CHAT_ID
  email:
    sender: myemail@email.com
    recipients:
      - myemail@email.com
    relay: 127.0.0.1
```
Run with the query flag -q:

```bash
./docker_run.bash -c ./config/newegg_rtx_3070.yaml -q ./config/alerters.yaml
```

## 👨‍💻 My Contributions
This project is a fork of the original Inventory Hunter. I have made the following specific contributions to improve stability and usability:

**1. Link Optimization:** Curated and reorganized product links, prioritizing those most likely to be restocked.

**2. Anti-Bot Evasion:** Removed links that triggered heavy Captcha security, which previously interrupted the 2-second refresh cycle and slowed down the program.

**3. Price Logic Adjustment:** Adjusted target price thresholds to reflect falling average market prices.

**4. Error Logging:** Consolidated frequent runtime errors into CheckError.txt for easier debugging and maintenance.

## Managing the Container
Stop and remove containers:
```bash
docker stop CONTAINER_NAME
docker rm CONTAINER_NAME
```

Update the repository:
```bash
git pull
```
