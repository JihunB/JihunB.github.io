---
layout: home
title: "Portfolio"
permalink: /
header:
  overlay_image: /assets/images/main-banner.jpg # 메인 배경 이미지 (선택)
  overlay_filter: 0.5 # 배경 어둡게 처리
  caption: "Security & Infrastructure Developer"
excerpt: "Hello, I'm Jihun, a developer who enjoys security and infrastructure construction"
author_profile: true # 왼쪽에 내 프로필 사진 나오게 하기
---

## 🚀 Projects

These are my main IT projects:

{% include feature_row id="intro" type="center" %} # (선택사항)

{% for post in site.posts %}
  {% include archive-single.html type="grid" teaser=post.header.teaser %}
{% endfor %}
