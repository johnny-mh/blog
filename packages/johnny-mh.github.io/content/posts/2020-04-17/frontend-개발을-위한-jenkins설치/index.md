---
title: FrontEnd 개발을 위한 Jenkins CI서버 세팅하기
categories: [development]
tags: [jenkins]
---

> CentOS 7.7 기준으로 작성

# Master, Slave 공통

패키지 업데이트, JDK설치

```bash
sudo yum update
sudo yum install -y java-1.8.0-openjdk-devel git
```

사내망일 경우 프록시 설정 필요

```bash
vim .bash_profile

# 맨밑에 아래 내용 추가
export http_proxy={{프록시 서버 주소}}
export HTTP_PROXY=$http_proxy
export https_proxy=$http_proxy
export HTTPS_PROXY=$http_proxy
export no_proxy="localhost,127.0.0.1"
export NO_PROXY=$no_proxy
```

# Master 설정

## Jenkins 설치 및 포트 설정

[https://linuxize.com/post/how-to-install-jenkins-on-centos-7](https://linuxize.com/post/how-to-install-jenkins-on-centos-7) 참고.

80포트로 사용할 수 있도록 설정

```bash
sudo -i
iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
iptables-save
```

jenkins계정 패스워드 삭제 및 로그인 가능하게 하기

```bash
sudo -i
passwd -d jenkins
sudo vim /etc/passwd

# jenkins 라인 마지막 /bin/false를 /bin/bash로 변경
```

## 인증 키 설정

```bash
su - jenkins
mkdir .ssh
cd .ssh
ssh-keygen

# id_rsa, id_rsa.pub생성됨
```

github.com 로그인 후 `Settings > Developer settings > Personal access tokens` 에서 새 토큰을 등록하고 이 값을 Jenkins 의 Crediential 에 Secret text 로 등록해둔다

## 플러그인 설치 및 설정

아래 플러그인들 설치

```text
NodeJS, AnsiColor, GitHub Pull Request Builder, Publish Over SSH
```

`Jenkins 관리 > Global Tool Configuration > NodeJS` 항목 추가

```text
Name: NodeJS 10.15.3
Version: NodeJS 10.15.3
Global npm packages to install: typescript@3.5.3 ts-node@8.8.2 @angular/cli@8.2.0 @sentry/cli@1.52.1
```

각 전역 패키지들의 버전을 명시해 두는게 좋음

사내 npm을 사용중이라면 `Jenkins 관리 > Managed Files > Npm config file` 을 추가하여 설정.

## 환경변수 설정

`Jenkins 관리 > 시스템 설정 > Global properties > Environment variables` 에 아래 값들 추가

위의 두 값은 언어 설정때문에 필요하고. 아래 프록시 설정은 해당할때만 추가한다

```text
이름: JAVA_TOOLS_OPTIONS
값: -Dfile.encoding=UTF-8

이름: LANG
값: ko_KR.UTF-8

이름: HTTP_PROXY
값: 프록시 주소

이름: HTTPS_PROXY
값: 프록시 주소

이름: NO_PROXY
값: 프록시 타면 안되는 도메인들
```

# Slave 설정

jenkins 계성 생성 및 패스워드 삭제

```bash
sudo i
useradd -d /var/lib/jenkins jenkins
passwd -d jenkins
exit
```

jenkins 계정에 ssh 키 추가후 Master 노드가 접근할 수 있도록 등록

```bash
su - jenkins
mkdir .ssh
cd .ssh
vim authorized_keys

# Master 노드의 인증서 설정에서 만든 id_rsa.pub의 컨텐츠를 붙여넣고 저장
```
