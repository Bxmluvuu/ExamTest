import type {
  Subject,
  Chapter,
  Topic,
  SourceDocument,
  ExamBlueprint,
  Question,
  QuestionChoice,
  QuestionAnswerKey,
  QuestionSource,
} from "../types/database";

export const idsSubject: Subject = {
  "id": "sub-ids-001",
  "slug": "cybersecurity-defense",
  "name": "Cybersecurity Defense and Intrusion Detection/Protection",
  "description": "ระบบความปลอดภัยเครือข่ายและการป้องกันการบุกรุกตามหลักสูตร Fortinet FortiOS 7.6 Administrator (System Settings, Logging, Firewall Policies, NAT, Routing, Firewall Auth, FSSO, PKI Certificates, Flow/Proxy Antivirus & FortiSandbox)",
  "language": "th",
  "question_target": 168,
  "icon": "ShieldAlert",
  "chapters_count": 8,
  "documents_count": 8,
  "created_at": "2026-08-19T00:00:00.000Z",
  "updated_at": "2026-08-19T00:00:00.000Z"
};

export const idsChapters: Chapter[] = [
  {
    "id": "ch-ids-01",
    "subject_id": "sub-ids-001",
    "sequence_order": 1,
    "title": "Chapter 1: System and Network Settings",
    "description": "FortiGate Deployment Modes (NAT vs Transparent), Administrator Access Protocols, Profiles, Two-Factor Authentication, Interface Types (VLAN, LACP, Redundant, Switch), DNS, DHCP และ Firmware Upgrade",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "ch-ids-02",
    "subject_id": "sub-ids-001",
    "sequence_order": 2,
    "title": "Chapter 2: Logging and Monitoring",
    "description": "Log Types (Traffic, Event, Security), Log Severity Levels (0-7), Log Storage Locations (Local, FortiAnalyzer, Cloud, Syslog), Real-time Diagnostic Tools, Packet Sniffing และ Automation Stitches",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "ch-ids-03",
    "subject_id": "sub-ids-001",
    "sequence_order": 3,
    "title": "Chapter 3: Firewall Policies and NAT",
    "description": "Firewall Policy Elements, Matching Order (Top-Down), Source NAT (Interface IP vs IP Pool Types), Destination NAT (Virtual IP / VIP), Central SNAT, Policy Objects และ Session Helpers",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "ch-ids-04",
    "subject_id": "sub-ids-001",
    "sequence_order": 4,
    "title": "Chapter 4: Routing",
    "description": "Static Routing, Administrative Distance vs Priority/Metric, Equal-Cost Multi-Path (ECMP Load Balancing), Floating Static Routes, Link Health Monitor (Performance SLA) และ Policy-Based Routing (PBR)",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "ch-ids-05",
    "subject_id": "sub-ids-001",
    "sequence_order": 5,
    "title": "Chapter 5: Firewall Authentication",
    "description": "Authentication Methods (Local, LDAP, RADIUS, TACACS+, SAML), User Groups, Captive Portal, Active vs Passive Authentication, Session Timeout Settings และ Two-Factor Authentication (FortiToken)",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "ch-ids-06",
    "subject_id": "sub-ids-001",
    "sequence_order": 6,
    "title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "description": "FSSO Architecture, Collector Agent Deployment (DC Agent mode vs Event Log Polling), Agentless Mode, Group Filtering, Workstation Verification และ Dead Entry/Logoff Timers",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "ch-ids-07",
    "subject_id": "sub-ids-001",
    "sequence_order": 7,
    "title": "Chapter 7: Certificate Operations",
    "description": "Public Key Infrastructure (PKI), Asymmetric Encryption, Digital Certificates, Certificate Authorities (CA), CSR Generation, Certificate Inspection vs Full/Deep SSL Inspection และ Client CA Deployment",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "ch-ids-08",
    "subject_id": "sub-ids-001",
    "sequence_order": 8,
    "title": "Chapter 8: Antivirus",
    "description": "Malware Scanning Databases (Standard, Extended, Extreme/AI), Flow-based vs Proxy-based Inspection Modes, Signature vs Heuristic Scanning, FortiSandbox Integration และ Action on Malware Detection",
    "created_at": "2026-08-19T00:00:00.000Z"
  }
];

export const idsTopics: Topic[] = [
  {
    "id": "top-ids-01-1",
    "chapter_id": "ch-ids-01",
    "title": "Deployment Modes & Administrative Access",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-01-2",
    "chapter_id": "ch-ids-01",
    "title": "Network Interfaces, VLANs & System Settings",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-02-1",
    "chapter_id": "ch-ids-02",
    "title": "Log Types, Levels & Storage Locations",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-02-2",
    "chapter_id": "ch-ids-02",
    "title": "Monitoring, Packet Capture & Automation Stitches",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-03-1",
    "chapter_id": "ch-ids-03",
    "title": "Firewall Policy Architecture & Matching",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-03-2",
    "chapter_id": "ch-ids-03",
    "title": "Network Address Translation (SNAT & DNAT/VIP)",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-04-1",
    "chapter_id": "ch-ids-04",
    "title": "Static Routing & Path Selection (AD vs Priority)",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-04-2",
    "chapter_id": "ch-ids-04",
    "title": "ECMP, Link Health Monitor & Policy-Based Routing",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-05-1",
    "chapter_id": "ch-ids-05",
    "title": "Authentication Methods & Remote Servers (LDAP/RADIUS)",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-05-2",
    "chapter_id": "ch-ids-05",
    "title": "Captive Portal, User Groups & Session Timeouts",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-06-1",
    "chapter_id": "ch-ids-06",
    "title": "FSSO Architecture & Collector Agent Modes",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-06-2",
    "chapter_id": "ch-ids-06",
    "title": "Agentless Polling, Workstation Verify & Timers",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-07-1",
    "chapter_id": "ch-ids-07",
    "title": "PKI, Digital Certificates & CA Operations",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-07-2",
    "chapter_id": "ch-ids-07",
    "title": "SSL/TLS Inspection (Certificate vs Deep Inspection)",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-08-1",
    "chapter_id": "ch-ids-08",
    "title": "Antivirus Databases & Scanning Techniques",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "top-ids-08-2",
    "chapter_id": "ch-ids-08",
    "title": "Flow-based vs Proxy-based Inspection & Sandbox",
    "created_at": "2026-08-19T00:00:00.000Z"
  }
];

export const idsDocuments: SourceDocument[] = [
  {
    "id": "doc-ids-01",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "title": "Chapter 1: System and Network Settings",
    "file_path": "cybersecurity-defense/slides/1-System and Network Settings.pdf",
    "document_type": "slide",
    "mime_type": "application/pdf",
    "file_size": 2843477,
    "page_count": 27,
    "ocr_status": "ready",
    "extraction_text_summary": "Deployment Modes, Management Access, Admin Profiles, Two-Factor Auth, Network Interfaces, VLAN 802.1Q, LACP, Redundant Interfaces, DNS และ DHCP Server",
    "storage_bucket": "source-documents",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "doc-ids-02",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "title": "Chapter 2: Logging and Monitoring",
    "file_path": "cybersecurity-defense/slides/2-Logging and Monitoring.pdf",
    "document_type": "slide",
    "mime_type": "application/pdf",
    "file_size": 4430124,
    "page_count": 37,
    "ocr_status": "ready",
    "extraction_text_summary": "Log Types & Subtypes, Severity Levels (Emergency to Debug), FortiAnalyzer Integration, Syslog over TLS, FortiView, Packet Sniffer (diagnose sniffer packet), Session Table และ Automation Stitches",
    "storage_bucket": "source-documents",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "doc-ids-03",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "title": "Chapter 3: Firewall Policies and NAT",
    "file_path": "cybersecurity-defense/slides/3-Firewall Policies and NAT.pdf",
    "document_type": "slide",
    "mime_type": "application/pdf",
    "file_size": 5009505,
    "page_count": 43,
    "ocr_status": "ready",
    "extraction_text_summary": "Firewall Policy Evaluation, Matching Criteria, Implicit Deny, Source NAT (Overload, One-to-One, PBA), Virtual IP (DNAT / Port Forwarding), Central SNAT และ Address/Service Objects",
    "storage_bucket": "source-documents",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "doc-ids-04",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "title": "Chapter 4: Routing",
    "file_path": "cybersecurity-defense/slides/4-Routing.pdf",
    "document_type": "slide",
    "mime_type": "application/pdf",
    "file_size": 3203816,
    "page_count": 31,
    "ocr_status": "ready",
    "extraction_text_summary": "Routing Table Lookup, Administrative Distance (AD), Priority, ECMP Methods (Source IP Hash, Weight, Spillover), Floating Static Route, Dead Gateway Detection (DGD) และ Policy Routes (PBR)",
    "storage_bucket": "source-documents",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "doc-ids-05",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "title": "Chapter 5: Firewall Authentication",
    "file_path": "cybersecurity-defense/slides/5-Firewall Authentication.pdf",
    "document_type": "slide",
    "mime_type": "application/pdf",
    "file_size": 3441581,
    "page_count": 32,
    "ocr_status": "ready",
    "extraction_text_summary": "Local vs Remote Authentication Servers (LDAP, RADIUS, SAML), Firewall User Groups, Captive Portal Web Authentication, Active vs Passive Auth, Idle/Hard Timeouts และ FortiToken 2FA",
    "storage_bucket": "source-documents",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "doc-ids-06",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "file_path": "cybersecurity-defense/slides/6-Fortinet Single Sign-On (FSSO).pdf",
    "document_type": "slide",
    "mime_type": "application/pdf",
    "file_size": 4804102,
    "page_count": 42,
    "ocr_status": "ready",
    "extraction_text_summary": "FSSO Architecture, Collector Agent vs Agentless Polling, DC Agent DLL (Event 4624), Event Log Polling, Workstation Verify (NetBIOS/WMI), User Group Filtering และ Timers",
    "storage_bucket": "source-documents",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "doc-ids-07",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "title": "Chapter 7: Certificate Operations",
    "file_path": "cybersecurity-defense/slides/7-Certificate Operations.pdf",
    "document_type": "slide",
    "mime_type": "application/pdf",
    "file_size": 4085997,
    "page_count": 34,
    "ocr_status": "ready",
    "extraction_text_summary": "Public Key Infrastructure (PKI), Digital Certificates & Signature, Certificate Authority (CA), CSR, Certificate Inspection (SNI) vs Deep SSL Inspection (MitM) และ Root CA Installation",
    "storage_bucket": "source-documents",
    "created_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "doc-ids-08",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "title": "Chapter 8: Antivirus",
    "file_path": "cybersecurity-defense/slides/8-Antivirus.pdf",
    "document_type": "slide",
    "mime_type": "application/pdf",
    "file_size": 3243479,
    "page_count": 29,
    "ocr_status": "ready",
    "extraction_text_summary": "Antivirus Databases (Standard, Extended, Extreme), Flow-based vs Proxy-based Inspection Modes, Signature vs Heuristic Analysis, FortiSandbox Cloud/On-Premise Integration และ File Quarantine",
    "storage_bucket": "source-documents",
    "created_at": "2026-08-19T00:00:00.000Z"
  }
];

export const idsBlueprints: ExamBlueprint[] = [
  {
    "id": "bp-ids-001",
    "subject_id": "sub-ids-001",
    "name": "Cybersecurity Defense & FortiOS Comprehensive Exam",
    "slug": "cybersecurity-defense-fortios-comprehensive",
    "description": "แบบทดสอบประมวลความรู้ครอบคลุมทั้ง 8 บทเรียน (System Settings, Logging, Firewall Policies, NAT, Routing, Authentication, FSSO, Certificates, Antivirus)",
    "question_count": 30,
    "duration_minutes": 60,
    "avoid_recent_question_count": 15,
    "is_active": true,
    "topic_distribution": [
      {
        "topic": "Deployment Modes & Administrative Access",
        "weight": 0.12
      },
      {
        "topic": "Log Types, Levels & Storage Locations",
        "weight": 0.12
      },
      {
        "topic": "Firewall Policy Architecture & Matching",
        "weight": 0.14
      },
      {
        "topic": "Network Address Translation (SNAT & DNAT/VIP)",
        "weight": 0.14
      },
      {
        "topic": "Static Routing & Path Selection (AD vs Priority)",
        "weight": 0.12
      },
      {
        "topic": "Authentication Methods & Remote Servers (LDAP/RADIUS)",
        "weight": 0.12
      },
      {
        "topic": "FSSO Architecture & Collector Agent Modes",
        "weight": 0.12
      },
      {
        "topic": "Antivirus Databases & Scanning Techniques",
        "weight": 0.12
      }
    ],
    "difficulty_distribution": {
      "easy": 0.3,
      "medium": 0.5,
      "hard": 0.2
    },
    "created_at": "2026-08-19T00:00:00.000Z"
  }
];

export const idsQuestions: Question[] = [
  {
    "id": "q-ids-001",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-1",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Deployment Modes & Administrative Access",
    "question_text": "ในโหมดการทำงานเริ่มต้น (Factory Default) ของ FortiGate ค่าหมายเลข IP Address บนพอร์ตเชื่อมต่อหลัก (port1 / internal) คือค่าใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-002",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-1",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Deployment Modes & Administrative Access",
    "question_text": "ข้อใดอธิบายความแตกต่างระหว่างโหมดการทำงานแบบ NAT Mode และ Transparent Mode ของ FortiGate ได้ถูกต้อง?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-003",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-1",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Deployment Modes & Administrative Access",
    "question_text": "โปรไฟล์ผู้ดูแลระบบชนิดใดที่มีสิทธิ์สูงสุดในการตั้งค่าระบบและสามารถบริหารจัดการทุก Virtual Domain (VDOM) บน FortiGate ได้อย่างสมบูรณ์?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-004",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-1",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Deployment Modes & Administrative Access",
    "question_text": "ฟังก์ชัน Trusted Hosts ในการตั้งค่าบัญชีผู้ดูแลระบบ (Administrator Account) มีประโยชน์ด้านความปลอดภัยอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-005",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-2",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Network Interfaces, VLANs & System Settings",
    "question_text": "การสร้าง VLAN Interface (802.1Q Sub-interface) บน FortiGate จำเป็นต้องระบุข้อมูลสำคัญข้อใดเป็นหลัก?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-006",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-2",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Network Interfaces, VLANs & System Settings",
    "question_text": "อินเทอร์เฟซแบบ 802.3ad Aggregate (LACP) แตกต่างจาก Redundant Interface อย่างไรในการส่งข้อมูลเครือข่าย?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-007",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-1",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Deployment Modes & Administrative Access",
    "question_text": "โปรโตคอลการบริหารจัดการใดบน Administrative Access ของ Interface ที่ควรถูกปิดการใช้งานในสภาพแวดล้อมจริงเพื่อความปลอดภัยสูงสุด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-008",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-2",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Network Interfaces, VLANs & System Settings",
    "question_text": "เมื่อเปิดใช้งาน DHCP Server บน Interface ของ FortiGate ตัวเลือกใดที่ช่วยให้เครื่องเซิร์ฟเวอร์หรือเครื่องพิมพ์ได้รับ IP Address เดิมเสมอ?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-009",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-1",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Deployment Modes & Administrative Access",
    "question_text": "ก่อนดำเนินการอัปเกรดเฟิร์มแวร์ (Firmware Upgrade) ของ FortiGate แนวทางปฏิบัติที่ดีที่สุด (Best Practice) คือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-010",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-1",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Deployment Modes & Administrative Access",
    "question_text": "การเปิดใช้งาน Two-Factor Authentication (2FA) บนบัญชีผู้ดูแลระบบ FortiGate สามารถใช้ร่วมกับอุปกรณ์หรือเทคโนโลยีใดของ Fortinet?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-011",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-2",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Network Interfaces, VLANs & System Settings",
    "question_text": "FortiGuard DNS เซิร์ฟเวอร์เริ่มต้นของ Fortinet ใช้โปรโตคอลและหมายเลข IP Address เริ่มต้นใดในการค้นหาชื่อโดเมน?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-012",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-2",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Network Interfaces, VLANs & System Settings",
    "question_text": "ความแตกต่างระหว่าง Software Switch และ Hardware Switch บน FortiGate คือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-013",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-1",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Deployment Modes & Administrative Access",
    "question_text": "คำสั่ง CLI ใดที่ใช้ในการตรวจสอบและคืนค่า Configuration ย้อนหลังจากการสำรองในหน่วยความจำ (Revision History)?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-014",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-1",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Deployment Modes & Administrative Access",
    "question_text": "ฟังก์ชัน System Virtual Domains (VDOMs) บน FortiGate มีความสามารถหลักอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-015",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-2",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Network Interfaces, VLANs & System Settings",
    "question_text": "ค่า Maximum Transmission Unit (MTU) มาตรฐานบนอินเทอร์เฟซ Ethernet ของ FortiGate มีขนาดกี่ไบต์?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-016",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-1",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Deployment Modes & Administrative Access",
    "question_text": "เมื่อเปิดฟังก์ชัน Administrative Access: FMG-Access บน Interface จะอนุญาตให้อุปกรณ์ใดเชื่อมต่อเข้ามาบริหารจัดการ?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-017",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-2",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Network Interfaces, VLANs & System Settings",
    "question_text": "การตั้งค่า Interface Addressing Mode แบบ PPPoE มักถูกใช้งานในสถานการณ์ใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-018",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-1",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Deployment Modes & Administrative Access",
    "question_text": "ในการบริหารจัดการผ่าน CLI คำสั่งใดใช้สำหรับดูสถานะทั่วไปของอุปกรณ์ เช่น Serial Number, Version, และ Operation Mode?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-019",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-1",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Deployment Modes & Administrative Access",
    "question_text": "ไฟล์ Configuration Backup (.conf) ของ FortiGate ที่ไม่ได้เปิดการเข้ารหัสด้วยรหัสผ่านจะเก็บข้อมูลในรูปแบบใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-020",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-01",
    "topic_id": "top-ids-01-2",
    "chapter_title": "Chapter 1: System and Network Settings",
    "topic_title": "Network Interfaces, VLANs & System Settings",
    "question_text": "การตั้งค่า Network Time Protocol (NTP) บน FortiGate มีความสำคัญอย่างยิ่งต่อความถูกต้องของระบบรักษาความปลอดภัยในเรื่องใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-021",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-1",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Log Types, Levels & Storage Locations",
    "question_text": "ลำดับความรุนแรงของ Log (Log Severity Levels) ระดับใดบน FortiOS ที่บ่งบอกถึงเหตุการณ์ฉุกเฉินขั้นสูงสุดที่ส่งผลให้ระบบไม่สามารถใช้งานได้ (System Unusable)?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-022",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-1",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Log Types, Levels & Storage Locations",
    "question_text": "Traffic Logs บน FortiGate ทำหน้าที่บันทึกข้อมูลประเภทใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-023",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-1",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Log Types, Levels & Storage Locations",
    "question_text": "โปรโตคอล OFTP (Open Fortinet Protocol) ที่ใช้ส่ง Log ระหว่าง FortiGate ไปยัง FortiAnalyzer ทำงานผ่านการเข้ารหัส SSL บนพอร์ต TCP หมายเลขใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-024",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-2",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Monitoring, Packet Capture & Automation Stitches",
    "question_text": "พิจารณาคำสั่ง CLI: diagnose sniffer packet any 'host 10.0.1.10 and port 80' 4 10 หมายเลข 4 ในคำสั่งนี้หมายถึง Verbose Level ในระดับใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-025",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-1",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Log Types, Levels & Storage Locations",
    "question_text": "ข้อใดคือข้อเสียของการจัดเก็บ Log ไว้ในหน่วยความจำ RAM (System Memory) ของ FortiGate?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-026",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-2",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Monitoring, Packet Capture & Automation Stitches",
    "question_text": "ในกลไก Automation Stitches ของ FortiOS ส่วนประกอบใดทำหน้าที่เป็นเงื่อนไขตรวจจับเพื่อสั่งให้ระบบเริ่มทำงาน?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-027",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-1",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Log Types, Levels & Storage Locations",
    "question_text": "เมื่อพื้นที่จัดเก็บ Log บน Hard Disk ภายใน FortiGate เต็ม (Disk Full) พฤติกรรมเริ่มต้นของระบบคือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-028",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-1",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Log Types, Levels & Storage Locations",
    "question_text": "การส่ง Syslog ไปยัง Remote Syslog Server โดยเปิดใช้งานการเข้ารหัส SSL/TLS (Reliable Logging) จะทำงานบนพอร์ตมาตรฐานใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-029",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-2",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Monitoring, Packet Capture & Automation Stitches",
    "question_text": "เมนู FortiView บน FortiGate Management GUI มีจุดประสงค์การใช้งานหลักเพื่อสิ่งใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-030",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-2",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Monitoring, Packet Capture & Automation Stitches",
    "question_text": "คำสั่ง CLI ใดที่ใช้แสดงรายการ Session การเชื่อมต่อเครือข่ายที่กำลังทำงานอยู่บน FortiGate ทั้งหมดแบบเรียลไทม์?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-031",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-1",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Log Types, Levels & Storage Locations",
    "question_text": "Security Logs บน FortiGate ถูกแบ่งออกเป็น Subtypes หลายประเภท ข้อใดจัดเป็น Security Log Subtype ทั้งหมด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-032",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-2",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Monitoring, Packet Capture & Automation Stitches",
    "question_text": "ในคำสั่ง diagnose sniffer packet ตัวกรอง (Filter Syntax) พัฒนาขึ้นบนมาตรฐานไวยากรณ์ของระบบใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-033",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-1",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Log Types, Levels & Storage Locations",
    "question_text": "การตั้งค่า Log Setting ให้บันทึกเฉพาะ Security Events แตกต่างจาก All Sessions ใน Firewall Policy อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-034",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-2",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Monitoring, Packet Capture & Automation Stitches",
    "question_text": "เมื่อใช้งาน FortiGate Cloud สำหรับการจัดเก็บ Log ผู้ดูแลระบบจะได้รับประโยชน์หลักด้านใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-035",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-2",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Monitoring, Packet Capture & Automation Stitches",
    "question_text": "การสั่ง Quarantine Host ผ่าน Automation Stitch มีผลการทำงานอย่างไรต่อเครื่องคอมพิวเตอร์ลูกข่ายที่ถูกตรวจพบว่าติดมัลแวร์?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-036",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-1",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Log Types, Levels & Storage Locations",
    "question_text": "Event Logs ชนิด System Event บน FortiGate บันทึกเหตุการณ์ประเภทใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-037",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-2",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Monitoring, Packet Capture & Automation Stitches",
    "question_text": "ในหน้า Log Viewer การใช้ฟังก์ชัน Log Filter ช่วยเพิ่มประสิทธิภาพในการสืบสวนภัยคุกคามอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-038",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-1",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Log Types, Levels & Storage Locations",
    "question_text": "การเปิดใช้งาน Log Packet Payload (Capture Packet) ใน IPS หรือ Antivirus Profile มีข้อควรระวังสำคัญอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-039",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-2",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Monitoring, Packet Capture & Automation Stitches",
    "question_text": "รายงาน (Reports) ที่สร้างจาก FortiAnalyzer หรือ FortiGate สามารถส่งออก (Export) เป็นรูปแบบไฟล์ใดได้บ้าง?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-040",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-1",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Log Types, Levels & Storage Locations",
    "question_text": "คำสั่ง CLI: execute log delete-all มีผลการทำงานอย่างไรต่ออุปกรณ์?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-041",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-1",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Firewall Policy Architecture & Matching",
    "question_text": "Firewall Policy บน FortiGate มีลำดับการประมวลผลและการจับคู่ทราฟฟิก (Policy Matching Order) อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-042",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-1",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Firewall Policy Architecture & Matching",
    "question_text": "กฎ Implicit Deny Policy ที่อยู่บรรทัดล่างสุดของ Policy Table มีพฤติกรรมเริ่มต้นอย่างไรต่อทราฟฟิกที่ไม่ตรงกับนโยบายใดๆ ข้างต้น?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-043",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-2",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Network Address Translation (SNAT & DNAT/VIP)",
    "question_text": "การเปิดใช้งาน Source NAT (SNAT) แบบ Use Outgoing Interface IP บน Firewall Policy เหมาะสำหรับสถานการณ์ใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-044",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-2",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Network Address Translation (SNAT & DNAT/VIP)",
    "question_text": "การสร้าง Virtual IP (VIP) บน FortiGate เป็นการทำ Network Address Translation ในรูปแบบใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-045",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-2",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Network Address Translation (SNAT & DNAT/VIP)",
    "question_text": "IP Pool ชนิดใดบน FortiGate ที่ทำการจับคู่หมายเลข IP ภายใน 1 หมายเลข เข้ากับหมายเลข IP ภายนอก 1 หมายเลขแบบคงที่ถาวร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-046",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-1",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Firewall Policy Architecture & Matching",
    "question_text": "องค์ประกอบขั้นต่ำที่จำเป็นต้องระบุในการสร้าง Firewall Policy ประกอบด้วยอะไรบ้าง?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-047",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-2",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Network Address Translation (SNAT & DNAT/VIP)",
    "question_text": "IP Pool ชนิด Port Block Allocation (PBA) มักถูกเลือกใช้ในระบบขนาดใหญ่หรือระดับ ISP ด้วยเหตุผลใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-048",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-1",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Firewall Policy Architecture & Matching",
    "question_text": "Address Object ชนิด Fully Qualified Domain Name (FQDN) บน FortiGate มีหลักการทำงานอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-049",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-2",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Network Address Translation (SNAT & DNAT/VIP)",
    "question_text": "เมื่อเปิดใช้งานฟังก์ชัน Central SNAT บน FortiGate รูปแบบการจัดการ Source NAT จะเปลี่ยนแปลงอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-050",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-1",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Firewall Policy Architecture & Matching",
    "question_text": "ในการรวมกลุ่มของหมายเลข IP Address หรือ Subnet หลายรายการเข้าด้วยกันเพื่อความสะดวกในการอ้างอิงใน Policy ควรสร้างออบเจกต์ชนิดใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-051",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-2",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Network Address Translation (SNAT & DNAT/VIP)",
    "question_text": "Session Helper (Application Layer Gateway - ALG) บน FortiOS มีบทบาทสำคัญต่อโปรโตคอลที่มีการเปิดพอร์ตแบบไดนามิก เช่น FTP หรือ SIP อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-052",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-1",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Firewall Policy Architecture & Matching",
    "question_text": "หากต้องการสร้าง Firewall Policy ที่อนุญาตให้ใช้งานได้เฉพาะช่วงเวลาทำงาน (จันทร์-ศุกร์ 08:30 - 17:30) ต้องกำหนดที่ส่วนประกอบใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-053",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-2",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Network Address Translation (SNAT & DNAT/VIP)",
    "question_text": "Address Object ชนิด Geography (Country) บน FortiGate มีความสามารถอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-054",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-1",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Firewall Policy Architecture & Matching",
    "question_text": "เมื่อกำหนด Action ใน Firewall Policy เป็น DENY ตัวเลือก Action ต่อไปที่สามารถส่งให้ผู้ใช้ทราบได้คือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-055",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-2",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Network Address Translation (SNAT & DNAT/VIP)",
    "question_text": "ฟังก์ชัน Port Forwarding ภายใน Virtual IP (VIP) ช่วยแก้ปัญหาใดในระบบเครือข่าย?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-056",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-1",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Firewall Policy Architecture & Matching",
    "question_text": "Internet Service Database (ISDB) บน FortiGate นำมาใช้ใน Firewall Policy เพื่อประโยชน์ใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-057",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-1",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Firewall Policy Architecture & Matching",
    "question_text": "ปุ่ม Policy Lookup บนหน้าเมนู Firewall Policy มีประโยชน์สำหรับผู้ดูแลระบบอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-058",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-2",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Network Address Translation (SNAT & DNAT/VIP)",
    "question_text": "การเปิดใช้งาน Preserve Source Port ใน Source NAT IP Pool มีความจำเป็นสำหรับแอปพลิเคชันประเภทใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-059",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-1",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Firewall Policy Architecture & Matching",
    "question_text": "การเปิดใช้งาน Security Profiles (เช่น Antivirus หรือ Web Filter) บน Firewall Policy จำเป็นต้องตั้งค่า Action ของ Policy เป็นค่าใดก่อน?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-060",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-1",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Firewall Policy Architecture & Matching",
    "question_text": "เมื่อสร้าง Firewall Policy หลายข้อ การย้ายลำดับของ Policy (Move Up / Move Down) มีผลต่อความปลอดภัยอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-061",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-1",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "Static Routing & Path Selection (AD vs Priority)",
    "question_text": "ในกระบวนการค้นหาเส้นทางของ Routing Table ปัจจัยใดมีลำดับความสำคัญสูงสุดในการเลือกเส้นทางส่งต่อแพ็กเก็ต (Path Selection)?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-062",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-1",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "Static Routing & Path Selection (AD vs Priority)",
    "question_text": "ค่าเริ่มต้นของ Administrative Distance (AD) สำหรับ Static Route บน FortiOS มีค่าเท่ากับเท่าใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-063",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-1",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "Static Routing & Path Selection (AD vs Priority)",
    "question_text": "การสร้าง Floating Static Route สำหรับเป็นเส้นทางสำรอง (Backup Route) ทำได้โดยการกำหนดค่าพารามิเตอร์ใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-064",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-2",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "ECMP, Link Health Monitor & Policy-Based Routing",
    "question_text": "Equal-Cost Multi-Path (ECMP) จะเกิดขึ้นบน FortiGate เมื่อใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-065",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-2",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "ECMP, Link Health Monitor & Policy-Based Routing",
    "question_text": "อัลกอริทึม ECMP Load Balancing แบบ Source-IP Hash มีหลักการกระจายทราฟฟิกอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-066",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-2",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "ECMP, Link Health Monitor & Policy-Based Routing",
    "question_text": "Link Health Monitor (Performance SLA / Dead Gateway Detection - DGD) ทำงานอย่างไรในการป้องกันปัญหา Blackhole Routing?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-067",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-2",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "ECMP, Link Health Monitor & Policy-Based Routing",
    "question_text": "Policy-Based Routing (PBR / Policy Routes) มีลำดับการประมวลผลและการทำงานสัมพันธ์กับ Routing Table ปกติอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-068",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-1",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "Static Routing & Path Selection (AD vs Priority)",
    "question_text": "การสร้าง Default Route ไปยังอินเทอร์เน็ตบน FortiOS ต้องระบุ Destination IP และ Subnet Mask เป็นค่าใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-069",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-1",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "Static Routing & Path Selection (AD vs Priority)",
    "question_text": "เมื่อมี Static Route 2 เส้นทางไปยังปลายทางเดียวกัน โดยมีค่า AD เท่ากัน แต่มี Priority ต่างกัน (Route A: Priority 1, Route B: Priority 10) ระบบจะเลือกใช้เส้นทางใดเป็น Active Route?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-070",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-1",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "Static Routing & Path Selection (AD vs Priority)",
    "question_text": "Blackhole Route บน FortiGate มีวัตถุประสงค์เพื่อการทำงานด้านใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-071",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-2",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "ECMP, Link Health Monitor & Policy-Based Routing",
    "question_text": "หาก Policy Route ที่กำหนดไว้ไม่ตรงกับทราฟฟิกของแพ็กเก็ตที่ส่งเข้ามา ระบบ FortiOS จะดำเนินการอย่างไรต่อไป?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-072",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-1",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "Static Routing & Path Selection (AD vs Priority)",
    "question_text": "คำสั่ง CLI ใดที่ใช้สำหรับดู Forwarding Information Base (FIB / Active Routing Table) ที่กำลังถูกใช้งานบน Kernel ของ FortiGate?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-073",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-2",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "ECMP, Link Health Monitor & Policy-Based Routing",
    "question_text": "ในอัลกอริทึม ECMP Load Balancing แบบ Spillover ทราฟฟิกจะถูกส่งไปยังเส้นทางที่สองเมื่อใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-074",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-1",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "Static Routing & Path Selection (AD vs Priority)",
    "question_text": "Dynamic Routing Protocol ชนิดใดที่ FortiOS รองรับสำหรับการแลกเปลี่ยนข้อมูลเราต์ระหว่าง Autonomous System (AS) บนอินเทอร์เน็ต?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-075",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-2",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "ECMP, Link Health Monitor & Policy-Based Routing",
    "question_text": "SD-WAN (Software-Defined WAN) บน FortiOS ต่อยอดและพัฒนาขึ้นมาจากเทคโนโลยีพื้นฐานใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-076",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-1",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "Static Routing & Path Selection (AD vs Priority)",
    "question_text": "สัญลักษณ์ C ที่ปรากฏหน้าแถวข้อมูลในตารางเราต์จากการรันคำสั่ง get router info routing-table all หมายถึงเส้นทางประเภทใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-077",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-1",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "Static Routing & Path Selection (AD vs Priority)",
    "question_text": "เมื่อกำหนด Static Route หากระบุเฉพาะ Gateway IP แต่ไม่ระบุ Outgoing Interface ระบบ FortiOS จะดำเนินการอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-078",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-2",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "ECMP, Link Health Monitor & Policy-Based Routing",
    "question_text": "การกำหนดค่า Weight ใน ECMP Load Balancing มีวัตถุประสงค์เพื่ออะไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-079",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-1",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "Static Routing & Path Selection (AD vs Priority)",
    "question_text": "คำสั่ง CLI ใดที่ใช้ในการทดสอบการเชื่อมต่อเครือข่ายและวัดเวลาตอบสนองไปยัง Gateway ปลายทาง?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-080",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-2",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "ECMP, Link Health Monitor & Policy-Based Routing",
    "question_text": "หากต้องการให้ทราฟฟิกของเซิร์ฟเวอร์การเงิน (Source IP: 10.1.1.100) วิ่งออกทางพอร์ต wan2 เสมอ โดยไม่สนใจ Routing Table ปกติ ควรใช้เทคโนโลยีใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-081",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-1",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Authentication Methods & Remote Servers (LDAP/RADIUS)",
    "question_text": "ข้อใดอธิบายความแตกต่างระหว่าง Active Authentication และ Passive Authentication บน FortiGate ได้ถูกต้อง?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-082",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-1",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Authentication Methods & Remote Servers (LDAP/RADIUS)",
    "question_text": "โปรโตคอลมาตรฐานใดที่นิยมนำมาใช้เชื่อมต่อ FortiGate เข้ากับ Microsoft Active Directory เพื่อตรวจสอบสิทธิ์ผู้ใช้งานองค์กร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-083",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-2",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Captive Portal, User Groups & Session Timeouts",
    "question_text": "Captive Portal บน FortiGate ทำงานอย่างไรเมื่อผู้ใช้ที่ยังไม่ได้ยืนยันตัวตนพยายามเปิดเว็บไซต์ผ่านบราวเซอร์?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-084",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-2",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Captive Portal, User Groups & Session Timeouts",
    "question_text": "ความแตกต่างระหว่าง Authentication Idle Timeout กับ Hard Timeout (Absolute Timeout) คือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-085",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-1",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Authentication Methods & Remote Servers (LDAP/RADIUS)",
    "question_text": "เมื่อใช้งานเซิร์ฟเวอร์ RADIUS สำหรับการทำ Authentication ข้อความ RADIUS Attribute ชนิดใดที่เซิร์ฟเวอร์ส่งกลับมาเพื่อระบุกลุ่มสิทธิ์ (User Group) ของผู้ใช้?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-086",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-2",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Captive Portal, User Groups & Session Timeouts",
    "question_text": "หากต้องการบังคับให้ผู้ใช้งานต้องทำการ Authentication ก่อนใช้งานอินเทอร์เน็ต จะต้องนำ User Group ไปผูกไว้ที่ส่วนประกอบใดของระบบ?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-087",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-1",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Authentication Methods & Remote Servers (LDAP/RADIUS)",
    "question_text": "โปรโตคอล SAML 2.0 (Security Assertion Markup Language) บน FortiOS มักถูกนำมาใช้ในสถานการณ์ใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-088",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-2",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Captive Portal, User Groups & Session Timeouts",
    "question_text": "ฟังก์ชัน Guest Management บน FortiGate ช่วยอำนวยความสะดวกในการจัดการผู้ใช้อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-089",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-1",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Authentication Methods & Remote Servers (LDAP/RADIUS)",
    "question_text": "ประเภทของบัญชีผู้ใช้งาน (User Types) บน FortiGate แบ่งออกเป็น 2 ประเภทหลัก คือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-090",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-2",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Captive Portal, User Groups & Session Timeouts",
    "question_text": "การทำ Authentication by IP แตกต่างจาก Authentication by Session อย่างไรในการติดตามสถานะผู้ใช้งาน?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-091",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-1",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Authentication Methods & Remote Servers (LDAP/RADIUS)",
    "question_text": "เมื่อเปิดใช้งาน Two-Factor Authentication (2FA) บนบัญชีผู้ใช้ Remote LDAP รหัสผ่าน OTP จะถูกสร้างและตรวจสอบผ่านระบบใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-092",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-2",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Captive Portal, User Groups & Session Timeouts",
    "question_text": "หน้า Disclaimer Page บน Captive Portal มีวัตถุประสงค์การใช้งานเพื่อสิ่งใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-093",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-1",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Authentication Methods & Remote Servers (LDAP/RADIUS)",
    "question_text": "คำสั่ง CLI ใดที่ใช้สำหรับล้างสถานะ Authentication ของผู้ใช้งานที่กำลังล็อกอินอยู่ในระบบเพื่อบังคับให้ล็อกอินใหม่?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-094",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-2",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Captive Portal, User Groups & Session Timeouts",
    "question_text": "ข้อใดคือพอร์ตเริ่มต้นที่ Captive Portal ของ FortiGate ใช้สำหรับการเชื่อมต่อหน้าล็อกอินแบบปลอดภัย (HTTPS)?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-095",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-1",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Authentication Methods & Remote Servers (LDAP/RADIUS)",
    "question_text": "ในการตั้งค่าเซิร์ฟเวอร์ LDAP บน FortiGate ค่า Common Name Identifier สำหรับ Microsoft Active Directory มักกำหนดเป็นค่าใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-096",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-2",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Captive Portal, User Groups & Session Timeouts",
    "question_text": "เมื่อผู้ใช้เปิดหน้าเว็บไซต์ HTTPS แล้วถูก Redirect ไปยังหน้า Captive Portal เหตุใดจึงอาจปรากฏข้อความเตือน Certificate Warning บนเบราว์เซอร์?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-097",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-1",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Authentication Methods & Remote Servers (LDAP/RADIUS)",
    "question_text": "User Group ประเภทใดบน FortiOS ที่ใช้สำหรับรวบรวมรายชื่อผู้ใช้งานหลายคนที่มีระดับสิทธิ์เดียวกันเพื่อนำไปกำหนดใน Firewall Policy?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-098",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-2",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Captive Portal, User Groups & Session Timeouts",
    "question_text": "คำสั่ง CLI: diagnose firewall auth list แสดงข้อมูลสำคัญใดแก่ผู้ดูแลระบบ?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-099",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-1",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Authentication Methods & Remote Servers (LDAP/RADIUS)",
    "question_text": "การเปิดใช้งานฟังก์ชัน Match all user groups ในการตั้งค่า LDAP Group บน FortiOS มีพฤติกรรมอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-100",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-2",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Captive Portal, User Groups & Session Timeouts",
    "question_text": "เมื่อเปิดใช้งาน Two-Factor Authentication ผ่านทาง Email หรือ SMS ค่ารหัส OTP มีอายุการใช้งานเริ่มต้น (Token Expiry) ประมาณเท่าใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-101",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-1",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "FSSO Architecture & Collector Agent Modes",
    "question_text": "จุดประสงค์หลักของการนำระบบ Fortinet Single Sign-On (FSSO) มาใช้งานในองค์กรคือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-102",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-1",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "FSSO Architecture & Collector Agent Modes",
    "question_text": "ในสถาปัตยกรรม FSSO แบบ Collector Agent Mode หน้าที่หลักของโปรแกรม Forties FSSO Collector Agent คือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-103",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-1",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "FSSO Architecture & Collector Agent Modes",
    "question_text": "ในวิธีการตรวจจับการล็อกอินของ Collector Agent รูปแบบ DC Agent Mode มีข้อได้เปรียบเหนือรูปแบบ Event Log Polling Mode อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-104",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-2",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "Agentless Polling, Workstation Verify & Timers",
    "question_text": "โหมดการทำงานแบบ Agentless FSSO (Poll Active Directory Server) บน FortiGate มีลักษณะการทำงานอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-105",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-2",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "Agentless Polling, Workstation Verify & Timers",
    "question_text": "ฟังก์ชัน Workstation Verify ใน FSSO Collector Agent ทำหน้าที่ตรวจสอบสิ่งใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-106",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-1",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "FSSO Architecture & Collector Agent Modes",
    "question_text": "หมายเลขพอร์ตเริ่มต้นที่ FortiGate ใช้สื่อสารกับ FSSO Collector Agent คือพอร์ตใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-107",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-2",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "Agentless Polling, Workstation Verify & Timers",
    "question_text": "เมื่อเกิดกรณีที่ FSSO ไม่สามารถระบุตัวตนของผู้ใช้ได้ (เช่น ผู้ใช้ไม่ได้ล็อกอินผ่านโดเมน) ตัวเลือกความปลอดภัยใดที่ช่วยให้ระบบสลับไปใช้การตรวจสอบสิทธิ์แบบอื่น?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-108",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-1",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "FSSO Architecture & Collector Agent Modes",
    "question_text": "Windows Security Event ID หมายเลขใดที่บ่งบอกถึงเหตุการณ์ผู้ใช้งานล็อกอินเข้าสู่ระบบสำเร็จ (Successful Logon) ซึ่ง FSSO ใช้เป็นหลักในการตรวจจับ?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-109",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-2",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "Agentless Polling, Workstation Verify & Timers",
    "question_text": "ค่า Dead Entry Timeout ในการตั้งค่า FSSO มีบทบาทอย่างไรในการจัดการฐานข้อมูลผู้ใช้งาน?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-110",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-1",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "FSSO Architecture & Collector Agent Modes",
    "question_text": "การเปิดใช้งาน Group Filter บน FSSO Collector Agent มีประโยชน์สำคัญอย่างไรต่อประสิทธิภาพของ FortiGate?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-111",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-2",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "Agentless Polling, Workstation Verify & Timers",
    "question_text": "คำสั่ง CLI ใดที่ใช้ในการตรวจสอบรายชื่อผู้ใช้งานที่ล็อกอินผ่านระบบ FSSO บน FortiGate?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-112",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-1",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "FSSO Architecture & Collector Agent Modes",
    "question_text": "หมายเลขพอร์ต UDP 8002 ในสถาปัตยกรรม FSSO ถูกใช้สำหรับการสื่อสารระหว่างส่วนประกอบใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-113",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-2",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "Agentless Polling, Workstation Verify & Timers",
    "question_text": "ข้อจำกัดสำคัญของการใช้งาน Agentless FSSO เมื่อเทียบกับ Collector Agent Mode คือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-114",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-1",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "FSSO Architecture & Collector Agent Modes",
    "question_text": "เมื่อสร้าง User Group ชนิด Fortinet Single Sign-On (FSSO) บน FortiGate ผู้ดูแลระบบต้องระบุข้อมูลใดในกลุ่ม?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-115",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-2",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "Agentless Polling, Workstation Verify & Timers",
    "question_text": "การเปิดใช้งาน Logon Event Offset ในการทำ Event Log Polling มีจุดประสงค์เพื่ออะไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-116",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-1",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "FSSO Architecture & Collector Agent Modes",
    "question_text": "หากผู้ใช้คนหนึ่งทำการล็อกอินบนเครื่องคอมพิวเตอร์เครื่องแรก แล้วย้ายไปล็อกอินบนเครื่องคอมพิวเตอร์เครื่องที่สอง FSSO จะจัดการสิทธิ์การใช้งานอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-117",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-2",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "Agentless Polling, Workstation Verify & Timers",
    "question_text": "เมื่อใช้งาน FSSO ผู้ใช้งานจำเป็นต้องติดตั้งโปรแกรม FortiClient บนเครื่องคอมพิวเตอร์ลูกข่ายหรือไม่?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-118",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-1",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "FSSO Architecture & Collector Agent Modes",
    "question_text": "คำสั่ง CLI ใดที่ใช้ในการทดสอบการเชื่อมต่อระหว่าง FortiGate กับ FSSO Collector Agent Server?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-119",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-2",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "Agentless Polling, Workstation Verify & Timers",
    "question_text": "ในการตรวจสอบสิทธิ์ผ่าน FSSO หากเครื่องลูกข่ายเชื่อมต่อผ่านสถาปัตยกรรม NAT หรือ Proxy Server จะเกิดปัญหาใดขึ้น?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-120",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-1",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "FSSO Architecture & Collector Agent Modes",
    "question_text": "ไฟล์ติดตั้ง FSSO Collector Agent สามารถดาวน์โหลดได้จากแหล่งใดอย่างเป็นทางการ?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-121",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-1",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "PKI, Digital Certificates & CA Operations",
    "question_text": "ในระบบโครงสร้างพื้นฐานกุญแจสาธารณะ (Public Key Infrastructure - PKI) ข้อใดอธิบายการทำงานของคู่กุญแจ Asymmetric Keys ได้ถูกต้อง?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-122",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-2",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "SSL/TLS Inspection (Certificate vs Deep Inspection)",
    "question_text": "ข้อใดอธิบายความแตกต่างระหว่าง Certificate Inspection และ Deep SSL Inspection บน FortiGate ได้ถูกต้องที่สุด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-123",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-2",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "SSL/TLS Inspection (Certificate vs Deep Inspection)",
    "question_text": "เมื่อเปิดใช้งาน Deep SSL Inspection บน FortiGate เหตุใดจึงจำเป็นต้องติดตั้ง FortiGate CA Certificate ลงใน Trusted Root Certificate Store ของเครื่องลูกข่ายทุกเครื่อง?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-124",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-1",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "PKI, Digital Certificates & CA Operations",
    "question_text": "องค์กรหรือหน่วยงานใดที่ทำหน้าที่เป็นผู้มีอำนาจในการออกและรับรองความถูกต้องของใบรับรองดิจิทัล (Digital Certificate)?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-125",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-1",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "PKI, Digital Certificates & CA Operations",
    "question_text": "ไฟล์ Certificate Signing Request (CSR) ที่สร้างขึ้นบน FortiGate มีหน้าที่สำคัญอย่างไรในกระบวนการขอใบรับรอง?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-126",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-2",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "SSL/TLS Inspection (Certificate vs Deep Inspection)",
    "question_text": "หมวดหมู่เว็บไซต์ประเภทใดที่แนะนำให้ตั้งค่า SSL Inspection Exemption (ยกเว้นไม่ต้องถอดรหัส) ใน Deep Inspection Profile?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-127",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-1",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "PKI, Digital Certificates & CA Operations",
    "question_text": "โปรโตคอล Online Certificate Status Protocol (OCSP) แตกต่างจาก Certificate Revocation List (CRL) ในการตรวจสอบสถานะการเพิกถอนใบรับรองอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-128",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-1",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "PKI, Digital Certificates & CA Operations",
    "question_text": "ฟิลด์ Subject Alternative Name (SAN) ในใบรับรองดิจิทัลมีประโยชน์อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-129",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-2",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "SSL/TLS Inspection (Certificate vs Deep Inspection)",
    "question_text": "ในกระบวนการเชื่อมต่อ TLS ข้อมูล Server Name Indication (SNI) ถูกส่งอยู่ในข้อความแพ็กเก็ตใดของขั้นตอน Handshake?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-130",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-1",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "PKI, Digital Certificates & CA Operations",
    "question_text": "ใบรับรองดิจิทัลประเภท Self-Signed Certificate ที่สร้างขึ้นเองบน FortiGate มีลักษณะอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-131",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-2",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "SSL/TLS Inspection (Certificate vs Deep Inspection)",
    "question_text": "หาก FortiGate ไม่ได้เปิดใช้งาน Deep SSL Inspection ฟังก์ชัน Antivirus Profile บน Firewall Policy จะมีข้อจำกัดในการตรวจจับอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-132",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-1",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "PKI, Digital Certificates & CA Operations",
    "question_text": "การนำเข้า (Import) ใบรับรองดิจิทัลแบบสมบูรณ์พร้อม Private Key เข้าสู่ FortiGate นิยมใช้ไฟล์ฟอร์แมตมาตรฐานใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-133",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-2",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "SSL/TLS Inspection (Certificate vs Deep Inspection)",
    "question_text": "เมื่อทำการตรวจเช็กใบรับรองของเซิร์ฟเวอร์ปลายทาง (Server Certificate Check) ใน SSL/TLS Profile ออปชัน Block invalid certificates มีประโยชน์อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-134",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-1",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "PKI, Digital Certificates & CA Operations",
    "question_text": "การติดตั้ง Intermediate CA Certificate บน FortiGate มีความสำคัญต่อการสร้าง Certificate Chain of Trust อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-135",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-2",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "SSL/TLS Inspection (Certificate vs Deep Inspection)",
    "question_text": "ใบรับรองค่าเริ่มต้นที่ FortiOS ใช้สำหรับการทำ Deep SSL Inspection มีชื่อว่าอะไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-136",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-1",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "PKI, Digital Certificates & CA Operations",
    "question_text": "อัลกอริทึมการเข้ารหัสแบบสมมาตร (Symmetric Encryption) และอสมมาตร (Asymmetric Encryption) ถูกนำมาใช้งานร่วมกันในโปรโตคอล TLS อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-137",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-2",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "SSL/TLS Inspection (Certificate vs Deep Inspection)",
    "question_text": "เครื่องมือใดในระบบปฏิบัติการ Windows ที่นิยมนำมาใช้แจกจ่าย FortiGate CA Certificate ไปยังเครื่องคอมพิวเตอร์ในโดเมนทั้งหมดพร้อมกัน?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-138",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-1",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "PKI, Digital Certificates & CA Operations",
    "question_text": "เมนูสำหรับการจัดการและดูรายการใบรับรองดิจิทัลบน FortiGate GUI อยู่ภายใต้หัวข้อใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-139",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-2",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "SSL/TLS Inspection (Certificate vs Deep Inspection)",
    "question_text": "เทคโนโลยี HTTP Strict Transport Security (HSTS) ร่วมกับการทำ Certificate Pinning ส่งผลกระทบต่อการทำ Deep SSL Inspection อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-140",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-1",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "PKI, Digital Certificates & CA Operations",
    "question_text": "ข้อใดระบุข้อมูลสำคัญที่ไม่ควรปรากฏอยู่ใน Certificate Signing Request (CSR)?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-141",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-2",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Flow-based vs Proxy-based Inspection & Sandbox",
    "question_text": "ข้อใดอธิบายความแตกต่างระหว่างโหมดการตรวจสอบไวรัสแบบ Flow-Based Inspection และ Proxy-Based Inspection ได้ถูกต้องที่สุด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-142",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-1",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Antivirus Databases & Scanning Techniques",
    "question_text": "ฐานข้อมูลตรวจจับไวรัส (Antivirus Database) ชนิดใดบน FortiGate ที่มีชุด Signature สำหรับตรวจจับมัลแวร์ที่กำลังระบาดและพบบ่อยในปัจจุบัน (In-the-wild malware)?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-143",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-1",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Antivirus Databases & Scanning Techniques",
    "question_text": "ฐานข้อมูลมัลแวร์แบบ Extended Database แตกต่างจากฐานข้อมูลแบบ Normal อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-144",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-2",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Flow-based vs Proxy-based Inspection & Sandbox",
    "question_text": "เมื่อเปิดใช้งานการทำงานร่วมกับ FortiSandbox (FortiSandbox Integration) การจัดการกับไฟล์ที่ไม่เคยรู้จักมาก่อน (Zero-day / Unknown Files) จะเป็นอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-145",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-1",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Antivirus Databases & Scanning Techniques",
    "question_text": "เทคโนโลยีการสแกนแบบ Heuristic Analysis (Heuristics Engine) ใน Antivirus Profile มีหลักการทำงานอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-146",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-2",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Flow-based vs Proxy-based Inspection & Sandbox",
    "question_text": "เมื่อ Antivirus Profile บน FortiGate ตรวจพบไฟล์ไวรัสในทราฟฟิก HTTP พฤติกรรมเริ่มต้นของระบบคือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-147",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-2",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Flow-based vs Proxy-based Inspection & Sandbox",
    "question_text": "โปรโตคอลการถ่ายโอนไฟล์และอีเมลใดบ้างที่ Antivirus Profile ของ FortiGate รองรับการสแกนตรวจจับมัลแวร์?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-148",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-2",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Flow-based vs Proxy-based Inspection & Sandbox",
    "question_text": "ฟังก์ชัน Archive Decompression Depth ใน Proxy-Based Antivirus Profile มีบทบาทอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-149",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-1",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Antivirus Databases & Scanning Techniques",
    "question_text": "บริการใดของ Fortinet ที่ทำหน้าที่ส่งอัปเดต Signature ของ Antivirus และภัยคุกคามใหม่ๆ มายัง FortiGate แบบอัตโนมัติ?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-150",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-2",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Flow-based vs Proxy-based Inspection & Sandbox",
    "question_text": "ฟังก์ชัน File Quarantine ใน Antivirus Profile มีลักษณะการทำงานอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-151",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-1",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Antivirus Databases & Scanning Techniques",
    "question_text": "AI-based Malware Detection (Extreme Database) บน FortiOS ใช้เทคโนโลยีใดในการยกระดับการตรวจจับ?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-152",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-2",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Flow-based vs Proxy-based Inspection & Sandbox",
    "question_text": "ไฟล์ทดสอบไวรัสมาตรฐานระดับสากลที่ชื่อ EICAR Standard Anti-Virus Test File มีวัตถุประสงค์เพื่ออะไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-153",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-2",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Flow-based vs Proxy-based Inspection & Sandbox",
    "question_text": "เมื่อเปิดใช้งานตัวเลือก Outbreak Prevention (External Malware Block List) บน FortiGate ผู้ดูแลระบบสามารถทำสิ่งใดได้?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-154",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-1",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Antivirus Databases & Scanning Techniques",
    "question_text": "คำสั่ง CLI ใดที่ใช้ในการตรวจสอบเวอร์ชันของ Antivirus Engine และวันที่อัปเดต Signature ล่าสุดบน FortiGate?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-155",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-2",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Flow-based vs Proxy-based Inspection & Sandbox",
    "question_text": "ข้อจำกัดของ Flow-Based Antivirus Inspection เมื่อเปรียบเทียบกับ Proxy-Based คือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-156",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-2",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Flow-based vs Proxy-based Inspection & Sandbox",
    "question_text": "หากต้องการให้ระบบทำการตรวจสอบไวรัสในไฟล์แนบของอีเมลขาเข้า (Inbound Emails) ต้องกำหนดค่า Antivirus Profile บนโปรโตคอลใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-157",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-1",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Antivirus Databases & Scanning Techniques",
    "question_text": "เทคโนโลยี Mobile Malware Protection ใน Antivirus Profile มุ่งเน้นการตรวจจับภัยคุกคามประเภทใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-158",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-2",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Flow-based vs Proxy-based Inspection & Sandbox",
    "question_text": "การตั้งค่า Oversized File Handling ใน Antivirus Profile มีความสำคัญอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-159",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-1",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Antivirus Databases & Scanning Techniques",
    "question_text": "เมื่อผู้ใช้พยายามดาวน์โหลดไฟล์ไวรัสและถูกบล็อก ข้อมูลการตรวจพบจะถูกบันทึกไว้ใน Log ชนิดใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-160",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-2",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Flow-based vs Proxy-based Inspection & Sandbox",
    "question_text": "คำสั่ง CLI: diagnose autoupdate status แสดงสถานะใดของการอัปเดตระบบความปลอดภัย?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-fib-001",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-2",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Monitoring, Packet Capture & Automation Stitches",
    "question_text": "ในการตรวจสอบแพ็กเก็ตผ่าน CLI คำสั่ง [blank_1] ใช้สำหรับดักจับแพ็กเก็ต โดยพารามิเตอร์ [blank_2] ระบุอินเทอร์เฟซ, พารามิเตอร์ [blank_3] กำหนดตัวกรองตามมาตรฐาน pcap และตัวเลข [blank_4] กำหนดระดับความละเอียดของข้อมูล (Verbose Level)",
    "question_type": "fill_in_the_blank",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "word_bank": [
      "diagnose sniffer packet",
      "port1 หรือ any",
      "filter expression",
      "verbose level",
      "get system status",
      "ping",
      "traceroute",
      "tcpdump"
    ],
    "blanks": [
      {
        "id": "blank_1",
        "position": 1,
        "placeholder": "คำสั่งดักจับแพ็กเก็ต",
        "correct_word": "diagnose sniffer packet"
      },
      {
        "id": "blank_2",
        "position": 2,
        "placeholder": "ชื่อพอร์ตเป้าหมาย",
        "correct_word": "port1 หรือ any"
      },
      {
        "id": "blank_3",
        "position": 3,
        "placeholder": "เงื่อนไขตัวกรอง",
        "correct_word": "filter expression"
      },
      {
        "id": "blank_4",
        "position": 4,
        "placeholder": "ระดับการแสดงผล",
        "correct_word": "verbose level"
      }
    ],
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-fib-002",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-06",
    "topic_id": "top-ids-06-1",
    "chapter_title": "Chapter 6: Fortinet Single Sign-On (FSSO)",
    "topic_title": "FSSO Architecture & Collector Agent Modes",
    "question_text": "ในระบบ FSSO เมื่อผู้ใช้ล็อกอินบน Windows Domain เครื่อง Domain Controller จะสร้าง [blank_1] ซึ่งโปรแกรม [blank_2] จะตรวจจับและส่งรายการ IP-to-User ไปยัง [blank_3] ผ่านพอร์ต [blank_4] เพื่อให้สิทธิ์การใช้งานเครือข่ายอัตโนมัติ",
    "question_type": "fill_in_the_blank",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "word_bank": [
      "Event ID 4624",
      "Collector Agent",
      "FortiGate",
      "TCP 8000",
      "UDP 53",
      "Event ID 1102",
      "LDAP Server",
      "Captive Portal"
    ],
    "blanks": [
      {
        "id": "blank_1",
        "position": 1,
        "placeholder": "หมายเลข Security Event",
        "correct_word": "Event ID 4624"
      },
      {
        "id": "blank_2",
        "position": 2,
        "placeholder": "โปรแกรมรวบรวมข้อมูล",
        "correct_word": "Collector Agent"
      },
      {
        "id": "blank_3",
        "position": 3,
        "placeholder": "อุปกรณ์ไฟร์วอลล์",
        "correct_word": "FortiGate"
      },
      {
        "id": "blank_4",
        "position": 4,
        "placeholder": "พอร์ตการสื่อสาร",
        "correct_word": "TCP 8000"
      }
    ],
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-fib-003",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-07",
    "topic_id": "top-ids-07-2",
    "chapter_title": "Chapter 7: Certificate Operations",
    "topic_title": "SSL/TLS Inspection (Certificate vs Deep Inspection)",
    "question_text": "การตรวจสอบทราฟฟิก HTTPS แบบ [blank_1] ตรวจสอบเฉพาะข้อมูลใน SNI โดยไม่ถอดรหัสข้อมูล ส่วนแบบ [blank_2] ทำการถอดรหัสแพ็กเก็ตสมบูรณ์ ซึ่งจำเป็นต้องติดตั้ง [blank_3] ลงบนเครื่องลูกข่ายเพื่อป้องกันการแจ้งเตือน [blank_4]",
    "question_type": "fill_in_the_blank",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "word_bank": [
      "Certificate Inspection",
      "Deep SSL Inspection",
      "FortiGate Root CA",
      "Certificate Warning",
      "Transparent Mode",
      "Public IP",
      "Self-signed",
      "DHCP Option"
    ],
    "blanks": [
      {
        "id": "blank_1",
        "position": 1,
        "placeholder": "โหมดตรวจเฉพาะ SNI",
        "correct_word": "Certificate Inspection"
      },
      {
        "id": "blank_2",
        "position": 2,
        "placeholder": "โหมดถอดรหัสสมบูรณ์",
        "correct_word": "Deep SSL Inspection"
      },
      {
        "id": "blank_3",
        "position": 3,
        "placeholder": "ใบรับรองที่ต้องลงบนเครื่องลูก",
        "correct_word": "FortiGate Root CA"
      },
      {
        "id": "blank_4",
        "position": 4,
        "placeholder": "ข้อความเตือนของเบราว์เซอร์",
        "correct_word": "Certificate Warning"
      }
    ],
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-fib-004",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-08",
    "topic_id": "top-ids-08-2",
    "chapter_title": "Chapter 8: Antivirus",
    "topic_title": "Flow-based vs Proxy-based Inspection & Sandbox",
    "question_text": "การตรวจจับไวรัสแบบ [blank_1] สแกนแพ็กเก็ตแบบเรียลไทม์มีความเร็วสูง ส่วนแบบ [blank_2] พักข้อมูลทั้งไฟล์ลงในบัฟเฟอร์รองรับการกักกันไฟล์ และหากพบไฟล์ที่ไม่เคยรู้จักมาก่อน สามารถส่งไปวิเคราะห์พฤติกรรมเชิงลึกบน [blank_3] เพื่อป้องกันภัยคุกคามแบบ [blank_4]",
    "question_type": "fill_in_the_blank",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "word_bank": [
      "Flow-based Inspection",
      "Proxy-based Inspection",
      "FortiSandbox",
      "Zero-day Attack",
      "Stateful Inspection",
      "NAT Mode",
      "EICAR",
      "Syslog Server"
    ],
    "blanks": [
      {
        "id": "blank_1",
        "position": 1,
        "placeholder": "โหมดสแกนแบบสตรีมเร็ว",
        "correct_word": "Flow-based Inspection"
      },
      {
        "id": "blank_2",
        "position": 2,
        "placeholder": "โหมดพักไฟล์ในบัฟเฟอร์",
        "correct_word": "Proxy-based Inspection"
      },
      {
        "id": "blank_3",
        "position": 3,
        "placeholder": "ระบบวิเคราะห์พฤติกรรมใน VM",
        "correct_word": "FortiSandbox"
      },
      {
        "id": "blank_4",
        "position": 4,
        "placeholder": "การโจมตีช่องโหว่ที่ไม่เคยรู้จัก",
        "correct_word": "Zero-day Attack"
      }
    ],
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-mat-001",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-02",
    "topic_id": "top-ids-02-1",
    "chapter_title": "Chapter 2: Logging and Monitoring",
    "topic_title": "Log Types, Levels & Storage Locations",
    "question_text": "จงจับคู่หมายเลขระดับความรุนแรงของ Log (Log Severity Level) บน FortiOS กับความหมายของระดับเหตุการณ์ให้ถูกต้อง",
    "question_type": "matching",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "matching_pairs": [
      {
        "id": "p1",
        "left": "Level 0 - Emergency",
        "right": "เหตุการณ์ร้ายแรงสูงสุดส่งผลให้ระบบไม่สามารถทำงานต่อได้ (System Unusable)"
      },
      {
        "id": "p2",
        "left": "Level 2 - Critical",
        "right": "ระบบทำงานผิดพลาดขั้นวิกฤตและส่งผลกระทบต่อฟังก์ชันสำคัญ"
      },
      {
        "id": "p3",
        "left": "Level 4 - Warning",
        "right": "การแจ้งเตือนสภาวะที่อาจเกิดปัญหาขึ้นในอนาคตหากไม่ดำเนินการแก้ไข"
      },
      {
        "id": "p4",
        "left": "Level 6 - Information",
        "right": "บันทึกการทำงานตามปกติของระบบและข้อมูลทราฟฟิกทั่วไป"
      }
    ],
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-mat-002",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-03",
    "topic_id": "top-ids-03-2",
    "chapter_title": "Chapter 3: Firewall Policies and NAT",
    "topic_title": "Network Address Translation (SNAT & DNAT/VIP)",
    "question_text": "จงจับคู่ประเภทของ Network Address Translation (NAT) บน FortiGate กับลักษณะการใช้งานให้ถูกต้อง",
    "question_type": "matching",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "matching_pairs": [
      {
        "id": "p1",
        "left": "Use Outgoing Interface IP",
        "right": "แปลง Source IP ภายในออกสู่อินเทอร์เน็ตด้วย IP ของพอร์ต WAN (PAT / Overload)"
      },
      {
        "id": "p2",
        "left": "Virtual IP (VIP / DNAT)",
        "right": "แปลง Public IP/Port ภายนอกไปยัง Private Server IP/Port ภายใน (Port Forwarding)"
      },
      {
        "id": "p3",
        "left": "One-to-One IP Pool",
        "right": "จับคู่ 1 Private IP เข้ากับ 1 Public IP แบบตายตัวถาวร"
      },
      {
        "id": "p4",
        "left": "Port Block Allocation (PBA)",
        "right": "จัดสรรบล็อกของพอร์ตล่วงหน้าเพื่อลดปริมาณการบันทึก Log ในเครือข่ายขนาดใหญ่"
      }
    ],
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-mat-003",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-04",
    "topic_id": "top-ids-04-1",
    "chapter_title": "Chapter 4: Routing",
    "topic_title": "Static Routing & Path Selection (AD vs Priority)",
    "question_text": "จงจับคู่ที่มาของเส้นทาง (Routing Source) บน FortiOS กับค่าเริ่มต้นของ Administrative Distance (AD) ให้ถูกต้อง",
    "question_type": "matching",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "matching_pairs": [
      {
        "id": "p1",
        "left": "Connected Route",
        "right": "Administrative Distance = 0"
      },
      {
        "id": "p2",
        "left": "Static Route",
        "right": "Administrative Distance = 10"
      },
      {
        "id": "p3",
        "left": "OSPF Route",
        "right": "Administrative Distance = 110"
      },
      {
        "id": "p4",
        "left": "BGP Route (eBGP)",
        "right": "Administrative Distance = 20"
      }
    ],
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  },
  {
    "id": "q-ids-mat-004",
    "subject_id": "sub-ids-001",
    "chapter_id": "ch-ids-05",
    "topic_id": "top-ids-05-1",
    "chapter_title": "Chapter 5: Firewall Authentication",
    "topic_title": "Authentication Methods & Remote Servers (LDAP/RADIUS)",
    "question_text": "จงจับคู่โปรโตคอลและเทคโนโลยีการยืนยันตัวตนกับลักษณะการทำงานให้ถูกต้อง",
    "question_type": "matching",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "matching_pairs": [
      {
        "id": "p1",
        "left": "LDAP / Active Directory",
        "right": "สืบค้นและยืนยันตัวตนกับฐานข้อมูล Directory ด้วย sAMAccountName"
      },
      {
        "id": "p2",
        "left": "RADIUS Protocol",
        "right": "ใช้ Vendor-Specific Attributes (VSA) ส่งชื่อกลุ่มสิทธิ์กลับมายังไฟร์วอลล์"
      },
      {
        "id": "p3",
        "left": "SAML 2.0 Identity Provider",
        "right": "ทำ Single Sign-On ร่วมกับคลาวด์ IdP (Azure AD / Okta)"
      },
      {
        "id": "p4",
        "left": "FortiToken Mobile",
        "right": "สร้างรหัสผ่าน OTP แบบใช้ครั้งเดียวบนสมาร์ตโฟนสำหรับ 2FA"
      }
    ],
    "created_at": "2026-08-19T00:00:00.000Z",
    "updated_at": "2026-08-19T00:00:00.000Z"
  }
];

export const idsChoices: QuestionChoice[] = [
  {
    "id": "c-001-A",
    "question_id": "q-ids-001",
    "choice_key": "A",
    "choice_text": "192.168.1.99 / 24",
    "sequence_order": 1
  },
  {
    "id": "c-001-B",
    "question_id": "q-ids-001",
    "choice_key": "B",
    "choice_text": "192.168.0.1 / 24",
    "sequence_order": 2
  },
  {
    "id": "c-001-C",
    "question_id": "q-ids-001",
    "choice_key": "C",
    "choice_text": "10.0.0.1 / 8",
    "sequence_order": 3
  },
  {
    "id": "c-001-D",
    "question_id": "q-ids-001",
    "choice_key": "D",
    "choice_text": "172.16.1.1 / 16",
    "sequence_order": 4
  },
  {
    "id": "c-002-A",
    "question_id": "q-ids-002",
    "choice_key": "A",
    "choice_text": "NAT Mode ทำงานเป็น Layer 3 Router ทำการเราต์และแปลง IP ส่วน Transparent Mode ทำงานเป็น Layer 2 Bridge สอดแทรกในเครือข่ายโดยไม่ต้องเปลี่ยนโครงสร้าง IP เดิม",
    "sequence_order": 1
  },
  {
    "id": "c-002-B",
    "question_id": "q-ids-002",
    "choice_key": "B",
    "choice_text": "NAT Mode ทำงานเป็น Layer 2 Switch ส่วน Transparent Mode ทำงานเป็น VPN Server",
    "sequence_order": 2
  },
  {
    "id": "c-002-C",
    "question_id": "q-ids-002",
    "choice_key": "C",
    "choice_text": "Transparent Mode ไม่สามารถเปิดใช้งาน Security Profiles เช่น Antivirus ได้",
    "sequence_order": 3
  },
  {
    "id": "c-002-D",
    "question_id": "q-ids-002",
    "choice_key": "D",
    "choice_text": "NAT Mode ใช้เฉพาะกับการเชื่อมต่ออินเทอร์เน็ตผ่านสายโทรศัพท์",
    "sequence_order": 4
  },
  {
    "id": "c-003-A",
    "question_id": "q-ids-003",
    "choice_key": "A",
    "choice_text": "super_admin",
    "sequence_order": 1
  },
  {
    "id": "c-003-B",
    "question_id": "q-ids-003",
    "choice_key": "B",
    "choice_text": "prof_admin",
    "sequence_order": 2
  },
  {
    "id": "c-003-C",
    "question_id": "q-ids-003",
    "choice_key": "C",
    "choice_text": "security_admin",
    "sequence_order": 3
  },
  {
    "id": "c-003-D",
    "question_id": "q-ids-003",
    "choice_key": "D",
    "choice_text": "read_only_admin",
    "sequence_order": 4
  },
  {
    "id": "c-004-A",
    "question_id": "q-ids-004",
    "choice_key": "A",
    "choice_text": "จำกัดหมายเลข IP หรือ Subnet ของเครื่องไคลเอนต์ที่ได้รับอนุญาตให้ล็อกอินเข้าจัดการ FortiGate ผ่าน GUI/SSH",
    "sequence_order": 1
  },
  {
    "id": "c-004-B",
    "question_id": "q-ids-004",
    "choice_key": "B",
    "choice_text": "บล็อกการโจมตีไวรัสจากเครื่องภายนอกเข้าสู่ระบบเครือข่าย",
    "sequence_order": 2
  },
  {
    "id": "c-004-C",
    "question_id": "q-ids-004",
    "choice_key": "C",
    "choice_text": "ทำการเข้ารหัสการส่งต่อข้อมูลระหว่าง FortiGate 2 เครื่องอัตโนมัติ",
    "sequence_order": 3
  },
  {
    "id": "c-004-D",
    "question_id": "q-ids-004",
    "choice_key": "D",
    "choice_text": "บันทึกรายชื่อเว็บไซต์ที่ผู้ดูแลระบบเข้าชมลงใน Log",
    "sequence_order": 4
  },
  {
    "id": "c-005-A",
    "question_id": "q-ids-005",
    "choice_key": "A",
    "choice_text": "Physical Interface หลักและหมายเลข VLAN ID (1-4094)",
    "sequence_order": 1
  },
  {
    "id": "c-005-B",
    "question_id": "q-ids-005",
    "choice_key": "B",
    "choice_text": "ชื่อผู้ดูแลระบบและรหัสผ่าน Wi-Fi",
    "sequence_order": 2
  },
  {
    "id": "c-005-C",
    "question_id": "q-ids-005",
    "choice_key": "C",
    "choice_text": "หมายเลข MAC Address ของคอมพิวเตอร์ลูกข่าย",
    "sequence_order": 3
  },
  {
    "id": "c-005-D",
    "question_id": "q-ids-005",
    "choice_key": "D",
    "choice_text": "พอร์ตเชื่อมต่อของสวิตช์ปลายทาง",
    "sequence_order": 4
  },
  {
    "id": "c-006-A",
    "question_id": "q-ids-006",
    "choice_key": "A",
    "choice_text": "802.3ad รวมแบนด์วิดท์ของทุกลิงก์และทำ Load Balancing พร้อมกัน ส่วน Redundant Interface ใช้งานเพียงลิงก์เดียวในโหมด Active/Standby",
    "sequence_order": 1
  },
  {
    "id": "c-006-B",
    "question_id": "q-ids-006",
    "choice_key": "B",
    "choice_text": "802.3ad ใช้งานได้เฉพาะกับสาย Fiber Optic เท่านั้น",
    "sequence_order": 2
  },
  {
    "id": "c-006-C",
    "question_id": "q-ids-006",
    "choice_key": "C",
    "choice_text": "Redundant Interface มีความเร็วในการส่งข้อมูลสูงกว่า 802.3ad",
    "sequence_order": 3
  },
  {
    "id": "c-006-D",
    "question_id": "q-ids-006",
    "choice_key": "D",
    "choice_text": "ทั้งสองรูปแบบทำงานเหมือนกันทุกประการ",
    "sequence_order": 4
  },
  {
    "id": "c-007-A",
    "question_id": "q-ids-007",
    "choice_key": "A",
    "choice_text": "HTTP และ Telnet (เนื่องจากส่งข้อมูลและรหัสผ่านเป็น Cleartext)",
    "sequence_order": 1
  },
  {
    "id": "c-007-B",
    "question_id": "q-ids-007",
    "choice_key": "B",
    "choice_text": "HTTPS และ SSH",
    "sequence_order": 2
  },
  {
    "id": "c-007-C",
    "question_id": "q-ids-007",
    "choice_key": "C",
    "choice_text": "PING",
    "sequence_order": 3
  },
  {
    "id": "c-007-D",
    "question_id": "q-ids-007",
    "choice_key": "D",
    "choice_text": "SNMP",
    "sequence_order": 4
  },
  {
    "id": "c-008-A",
    "question_id": "q-ids-008",
    "choice_key": "A",
    "choice_text": "IP / MAC Address Reservation (MAC Binding)",
    "sequence_order": 1
  },
  {
    "id": "c-008-B",
    "question_id": "q-ids-008",
    "choice_key": "B",
    "choice_text": "DNS Forwarding",
    "sequence_order": 2
  },
  {
    "id": "c-008-C",
    "question_id": "q-ids-008",
    "choice_key": "C",
    "choice_text": "DHCP Relay Agent",
    "sequence_order": 3
  },
  {
    "id": "c-008-D",
    "question_id": "q-ids-008",
    "choice_key": "D",
    "choice_text": "Lease Time = 0",
    "sequence_order": 4
  },
  {
    "id": "c-009-A",
    "question_id": "q-ids-009",
    "choice_key": "A",
    "choice_text": "ตรวจสอบ Fortinet Upgrade Path Tool และสำรองไฟล์ Configuration (System Backup) เก็บไว้นอกอุปกรณ์เสมอ",
    "sequence_order": 1
  },
  {
    "id": "c-009-B",
    "question_id": "q-ids-009",
    "choice_key": "B",
    "choice_text": "ทำการ Factory Reset อุปกรณ์ก่อนอัปเกรดทุกครั้ง",
    "sequence_order": 2
  },
  {
    "id": "c-009-C",
    "question_id": "q-ids-009",
    "choice_key": "C",
    "choice_text": "ปิดการทำงานของ Firewall Policy ทั้งหมด",
    "sequence_order": 3
  },
  {
    "id": "c-009-D",
    "question_id": "q-ids-009",
    "choice_key": "D",
    "choice_text": "ลบผู้ดูแลระบบคนอื่นออกจากระบบก่อน",
    "sequence_order": 4
  },
  {
    "id": "c-010-A",
    "question_id": "q-ids-010",
    "choice_key": "A",
    "choice_text": "FortiToken Mobile หรือ FortiToken Hardware",
    "sequence_order": 1
  },
  {
    "id": "c-010-B",
    "question_id": "q-ids-010",
    "choice_key": "B",
    "choice_text": "FortiSwitch Console Cable",
    "sequence_order": 2
  },
  {
    "id": "c-010-C",
    "question_id": "q-ids-010",
    "choice_key": "C",
    "choice_text": "FortiAP Wi-Fi Signal",
    "sequence_order": 3
  },
  {
    "id": "c-010-D",
    "question_id": "q-ids-010",
    "choice_key": "D",
    "choice_text": "FortiClient VPN License Key",
    "sequence_order": 4
  },
  {
    "id": "c-011-A",
    "question_id": "q-ids-011",
    "choice_key": "A",
    "choice_text": "DNS-over-TLS / DNS-over-HTTPS (DoH) และ Anycast IPs (เช่น 208.91.112.53 / 208.91.112.52)",
    "sequence_order": 1
  },
  {
    "id": "c-011-B",
    "question_id": "q-ids-011",
    "choice_key": "B",
    "choice_text": "Telnet DNS Protocol",
    "sequence_order": 2
  },
  {
    "id": "c-011-C",
    "question_id": "q-ids-011",
    "choice_key": "C",
    "choice_text": "FTP DNS Port 21",
    "sequence_order": 3
  },
  {
    "id": "c-011-D",
    "question_id": "q-ids-011",
    "choice_key": "D",
    "choice_text": "DHCP Port 67",
    "sequence_order": 4
  },
  {
    "id": "c-012-A",
    "question_id": "q-ids-012",
    "choice_key": "A",
    "choice_text": "Hardware Switch ประมวลผลแพ็กเก็ตผ่านชิปเซ็ตฮาร์ดแวร์ Switch ASIC เร็วขึ้นระดับ Wire-speed ส่วน Software Switch ประมวลผลผ่าน CPU หลัก",
    "sequence_order": 1
  },
  {
    "id": "c-012-B",
    "question_id": "q-ids-012",
    "choice_key": "B",
    "choice_text": "Software Switch ทำงานได้เร็วกว่า Hardware Switch 10 เท่า",
    "sequence_order": 2
  },
  {
    "id": "c-012-C",
    "question_id": "q-ids-012",
    "choice_key": "C",
    "choice_text": "Hardware Switch รองรับเฉพาะการต่อสายแลนแบบ Cross",
    "sequence_order": 3
  },
  {
    "id": "c-012-D",
    "question_id": "q-ids-012",
    "choice_key": "D",
    "choice_text": "Software Switch ใช้งานได้เฉพาะใน Transparent Mode",
    "sequence_order": 4
  },
  {
    "id": "c-013-A",
    "question_id": "q-ids-013",
    "choice_key": "A",
    "choice_text": "execute restore config",
    "sequence_order": 1
  },
  {
    "id": "c-013-B",
    "question_id": "q-ids-013",
    "choice_key": "B",
    "choice_text": "diagnose sys reboot",
    "sequence_order": 2
  },
  {
    "id": "c-013-C",
    "question_id": "q-ids-013",
    "choice_key": "C",
    "choice_text": "get system status",
    "sequence_order": 3
  },
  {
    "id": "c-013-D",
    "question_id": "q-ids-013",
    "choice_key": "D",
    "choice_text": "show full-configuration",
    "sequence_order": 4
  },
  {
    "id": "c-014-A",
    "question_id": "q-ids-014",
    "choice_key": "A",
    "choice_text": "แบ่ง FortiGate เครื่องเดียวให้ทำงานเสมือนเป็น Firewall หลายเครื่องแยกขาดจากกัน (Multi-tenancy)",
    "sequence_order": 1
  },
  {
    "id": "c-014-B",
    "question_id": "q-ids-014",
    "choice_key": "B",
    "choice_text": "เพิ่มความเร็วอินเทอร์เน็ตให้เร็วขึ้น 2 เท่า",
    "sequence_order": 2
  },
  {
    "id": "c-014-C",
    "question_id": "q-ids-014",
    "choice_key": "C",
    "choice_text": "ทำการเปลี่ยนภาษาบนหน้า GUI เป็นภาษาไทย",
    "sequence_order": 3
  },
  {
    "id": "c-014-D",
    "question_id": "q-ids-014",
    "choice_key": "D",
    "choice_text": "สำรองข้อมูลลงใน Google Drive อัตโนมัติ",
    "sequence_order": 4
  },
  {
    "id": "c-015-A",
    "question_id": "q-ids-015",
    "choice_key": "A",
    "choice_text": "1500 Bytes",
    "sequence_order": 1
  },
  {
    "id": "c-015-B",
    "question_id": "q-ids-015",
    "choice_key": "B",
    "choice_text": "9000 Bytes",
    "sequence_order": 2
  },
  {
    "id": "c-015-C",
    "question_id": "q-ids-015",
    "choice_key": "C",
    "choice_text": "64 Bytes",
    "sequence_order": 3
  },
  {
    "id": "c-015-D",
    "question_id": "q-ids-015",
    "choice_key": "D",
    "choice_text": "512 Bytes",
    "sequence_order": 4
  },
  {
    "id": "c-016-A",
    "question_id": "q-ids-016",
    "choice_key": "A",
    "choice_text": "FortiManager (สำหรับทำ Centralized Management)",
    "sequence_order": 1
  },
  {
    "id": "c-016-B",
    "question_id": "q-ids-016",
    "choice_key": "B",
    "choice_text": "FortiMail Server",
    "sequence_order": 2
  },
  {
    "id": "c-016-C",
    "question_id": "q-ids-016",
    "choice_key": "C",
    "choice_text": "FortiClient EMS",
    "sequence_order": 3
  },
  {
    "id": "c-016-D",
    "question_id": "q-ids-016",
    "choice_key": "D",
    "choice_text": "FortiSandbox",
    "sequence_order": 4
  },
  {
    "id": "c-017-A",
    "question_id": "q-ids-017",
    "choice_key": "A",
    "choice_text": "เชื่อมต่ออินเทอร์เน็ต WAN โดยตรงกับผู้ให้บริการ ISP ผ่านโมเด็มในโหมด Bridge",
    "sequence_order": 1
  },
  {
    "id": "c-017-B",
    "question_id": "q-ids-017",
    "choice_key": "B",
    "choice_text": "เชื่อมต่อสวิตช์ภายในองค์กร",
    "sequence_order": 2
  },
  {
    "id": "c-017-C",
    "question_id": "q-ids-017",
    "choice_key": "C",
    "choice_text": "เชื่อมต่อระบบฐานข้อมูล MySQL",
    "sequence_order": 3
  },
  {
    "id": "c-017-D",
    "question_id": "q-ids-017",
    "choice_key": "D",
    "choice_text": "เชื่อมต่อกล้องวงจรปิด IP Camera",
    "sequence_order": 4
  },
  {
    "id": "c-018-A",
    "question_id": "q-ids-018",
    "choice_key": "A",
    "choice_text": "get system status",
    "sequence_order": 1
  },
  {
    "id": "c-018-B",
    "question_id": "q-ids-018",
    "choice_key": "B",
    "choice_text": "show firewall policy",
    "sequence_order": 2
  },
  {
    "id": "c-018-C",
    "question_id": "q-ids-018",
    "choice_key": "C",
    "choice_text": "diagnose sys top",
    "sequence_order": 3
  },
  {
    "id": "c-018-D",
    "question_id": "q-ids-018",
    "choice_key": "D",
    "choice_text": "execute reboot",
    "sequence_order": 4
  },
  {
    "id": "c-019-A",
    "question_id": "q-ids-019",
    "choice_key": "A",
    "choice_text": "Plaintext CLI Script ที่สามารถเปิดอ่านและแก้ไขด้วยโปรแกรม Text Editor ได้",
    "sequence_order": 1
  },
  {
    "id": "c-019-B",
    "question_id": "q-ids-019",
    "choice_key": "B",
    "choice_text": "Binary Code ที่เปิดอ่านไม่ได้",
    "sequence_order": 2
  },
  {
    "id": "c-019-C",
    "question_id": "q-ids-019",
    "choice_key": "C",
    "choice_text": "ไฟล์ภาพ PNG",
    "sequence_order": 3
  },
  {
    "id": "c-019-D",
    "question_id": "q-ids-019",
    "choice_key": "D",
    "choice_text": "ฐานข้อมูล SQLite แบบเข้ารหัส",
    "sequence_order": 4
  },
  {
    "id": "c-020-A",
    "question_id": "q-ids-020",
    "choice_key": "A",
    "choice_text": "ความถูกต้องของ Time Stamp ใน Log, การตรวจสอบวันหมดอายุของ Digital Certificate และการทำงานของ FortiToken 2FA",
    "sequence_order": 1
  },
  {
    "id": "c-020-B",
    "question_id": "q-ids-020",
    "choice_key": "B",
    "choice_text": "ความเร็วในการส่งผ่านข้อมูลของพอร์ตแลน",
    "sequence_order": 2
  },
  {
    "id": "c-020-C",
    "question_id": "q-ids-020",
    "choice_key": "C",
    "choice_text": "การประหยัดพลังงานของอุปกรณ์",
    "sequence_order": 3
  },
  {
    "id": "c-020-D",
    "question_id": "q-ids-020",
    "choice_key": "D",
    "choice_text": "การเชื่อมต่อสายเคเบิลแบบ Fiber",
    "sequence_order": 4
  },
  {
    "id": "c-021-A",
    "question_id": "q-ids-021",
    "choice_key": "A",
    "choice_text": "Level 0 - Emergency",
    "sequence_order": 1
  },
  {
    "id": "c-021-B",
    "question_id": "q-ids-021",
    "choice_key": "B",
    "choice_text": "Level 1 - Alert",
    "sequence_order": 2
  },
  {
    "id": "c-021-C",
    "question_id": "q-ids-021",
    "choice_key": "C",
    "choice_text": "Level 2 - Critical",
    "sequence_order": 3
  },
  {
    "id": "c-021-D",
    "question_id": "q-ids-021",
    "choice_key": "D",
    "choice_text": "Level 3 - Error",
    "sequence_order": 4
  },
  {
    "id": "c-022-A",
    "question_id": "q-ids-022",
    "choice_key": "A",
    "choice_text": "การรับส่งข้อมูลของแพ็กเก็ตเครือข่ายที่วิ่งผ่าน Firewall Policy (Forward Traffic, Local Traffic, Sniffer Traffic)",
    "sequence_order": 1
  },
  {
    "id": "c-022-B",
    "question_id": "q-ids-022",
    "choice_key": "B",
    "choice_text": "ประวัติการล็อกอินของผู้ดูแลระบบ",
    "sequence_order": 2
  },
  {
    "id": "c-022-C",
    "question_id": "q-ids-022",
    "choice_key": "C",
    "choice_text": "การตรวจพบไฟล์ไวรัสในอีเมล",
    "sequence_order": 3
  },
  {
    "id": "c-022-D",
    "question_id": "q-ids-022",
    "choice_key": "D",
    "choice_text": "การแจ้งเตือนความร้อนของ CPU",
    "sequence_order": 4
  },
  {
    "id": "c-023-A",
    "question_id": "q-ids-023",
    "choice_key": "A",
    "choice_text": "TCP Port 514",
    "sequence_order": 1
  },
  {
    "id": "c-023-B",
    "question_id": "q-ids-023",
    "choice_key": "B",
    "choice_text": "UDP Port 514",
    "sequence_order": 2
  },
  {
    "id": "c-023-C",
    "question_id": "q-ids-023",
    "choice_key": "C",
    "choice_text": "TCP Port 443",
    "sequence_order": 3
  },
  {
    "id": "c-023-D",
    "question_id": "q-ids-023",
    "choice_key": "D",
    "choice_text": "TCP Port 6514",
    "sequence_order": 4
  },
  {
    "id": "c-024-A",
    "question_id": "q-ids-024",
    "choice_key": "A",
    "choice_text": "แสดงชื่อ Interface และ Packet Header ของแพ็กเก็ต",
    "sequence_order": 1
  },
  {
    "id": "c-024-B",
    "question_id": "q-ids-024",
    "choice_key": "B",
    "choice_text": "แสดงเฉพาะ Header ของแพ็กเก็ตโดยไม่มีชื่อ Interface",
    "sequence_order": 2
  },
  {
    "id": "c-024-C",
    "question_id": "q-ids-024",
    "choice_key": "C",
    "choice_text": "แสดง Payload ข้อมูลทั้งหมดแบบ Hex Dump",
    "sequence_order": 3
  },
  {
    "id": "c-024-D",
    "question_id": "q-ids-024",
    "choice_key": "D",
    "choice_text": "แสดง Ethernet Header ร่วมกับ IP Header",
    "sequence_order": 4
  },
  {
    "id": "c-025-A",
    "question_id": "q-ids-025",
    "choice_key": "A",
    "choice_text": "ข้อมูล Log ทั้งหมดจะสูญหายทันทีเมื่ออุปกรณ์ทำการ Reboot หรือไฟฟ้าดับ",
    "sequence_order": 1
  },
  {
    "id": "c-025-B",
    "question_id": "q-ids-025",
    "choice_key": "B",
    "choice_text": "ทำให้ความเร็วของอินเทอร์เน็ตลดลง",
    "sequence_order": 2
  },
  {
    "id": "c-025-C",
    "question_id": "q-ids-025",
    "choice_key": "C",
    "choice_text": "ไม่สามารถดูผ่าน Web GUI ได้",
    "sequence_order": 3
  },
  {
    "id": "c-025-D",
    "question_id": "q-ids-025",
    "choice_key": "D",
    "choice_text": "ไม่สามารถบันทึก Log ระดับ Error ได้",
    "sequence_order": 4
  },
  {
    "id": "c-026-A",
    "question_id": "q-ids-026",
    "choice_key": "A",
    "choice_text": "Trigger (เช่น ตรวจพบ Log Event ที่กำหนด หรือตามตารางเวลา Schedule)",
    "sequence_order": 1
  },
  {
    "id": "c-026-B",
    "question_id": "q-ids-026",
    "choice_key": "B",
    "choice_text": "Action",
    "sequence_order": 2
  },
  {
    "id": "c-026-C",
    "question_id": "q-ids-026",
    "choice_key": "C",
    "choice_text": "Filter",
    "sequence_order": 3
  },
  {
    "id": "c-026-D",
    "question_id": "q-ids-026",
    "choice_key": "D",
    "choice_text": "Policy",
    "sequence_order": 4
  },
  {
    "id": "c-027-A",
    "question_id": "q-ids-027",
    "choice_key": "A",
    "choice_text": "บันทึกทับข้อมูล Log ที่เก่าที่สุดโดยอัตโนมัติ (Overwrite Oldest Logs)",
    "sequence_order": 1
  },
  {
    "id": "c-027-B",
    "question_id": "q-ids-027",
    "choice_key": "B",
    "choice_text": "หยุดการส่งผ่านข้อมูลเครือข่ายทั้งหมดทันที",
    "sequence_order": 2
  },
  {
    "id": "c-027-C",
    "question_id": "q-ids-027",
    "choice_key": "C",
    "choice_text": "ทำการ Factory Reset อุปกรณ์",
    "sequence_order": 3
  },
  {
    "id": "c-027-D",
    "question_id": "q-ids-027",
    "choice_key": "D",
    "choice_text": "ลบ Firewall Policies ทิ้งทั้งหมด",
    "sequence_order": 4
  },
  {
    "id": "c-028-A",
    "question_id": "q-ids-028",
    "choice_key": "A",
    "choice_text": "TCP Port 6514",
    "sequence_order": 1
  },
  {
    "id": "c-028-B",
    "question_id": "q-ids-028",
    "choice_key": "B",
    "choice_text": "UDP Port 514",
    "sequence_order": 2
  },
  {
    "id": "c-028-C",
    "question_id": "q-ids-028",
    "choice_key": "C",
    "choice_text": "TCP Port 8080",
    "sequence_order": 3
  },
  {
    "id": "c-028-D",
    "question_id": "q-ids-028",
    "choice_key": "D",
    "choice_text": "UDP Port 161",
    "sequence_order": 4
  },
  {
    "id": "c-029-A",
    "question_id": "q-ids-029",
    "choice_key": "A",
    "choice_text": "แสดงภาพรวมและแดชบอร์ดสถิติทราฟฟิก, แอปพลิเคชันที่ใช้งานสูงสุด (Top Applications), ภัยคุกคาม และผู้ใช้งานแบบ Real-time",
    "sequence_order": 1
  },
  {
    "id": "c-029-B",
    "question_id": "q-ids-029",
    "choice_key": "B",
    "choice_text": "ใช้สำหรับเขียนโค้ดภาษา PHP",
    "sequence_order": 2
  },
  {
    "id": "c-029-C",
    "question_id": "q-ids-029",
    "choice_key": "C",
    "choice_text": "ใช้สำหรับตั้งค่าการต่อสายแลน",
    "sequence_order": 3
  },
  {
    "id": "c-029-D",
    "question_id": "q-ids-029",
    "choice_key": "D",
    "choice_text": "ใช้ดาวน์โหลดไฟล์หนังและเพลง",
    "sequence_order": 4
  },
  {
    "id": "c-030-A",
    "question_id": "q-ids-030",
    "choice_key": "A",
    "choice_text": "get system session list",
    "sequence_order": 1
  },
  {
    "id": "c-030-B",
    "question_id": "q-ids-030",
    "choice_key": "B",
    "choice_text": "show log event",
    "sequence_order": 2
  },
  {
    "id": "c-030-C",
    "question_id": "q-ids-030",
    "choice_key": "C",
    "choice_text": "diagnose hardware test",
    "sequence_order": 3
  },
  {
    "id": "c-030-D",
    "question_id": "q-ids-030",
    "choice_key": "D",
    "choice_text": "execute clear session",
    "sequence_order": 4
  },
  {
    "id": "c-031-A",
    "question_id": "q-ids-031",
    "choice_key": "A",
    "choice_text": "Antivirus, Web Filter, Application Control, IPS",
    "sequence_order": 1
  },
  {
    "id": "c-031-B",
    "question_id": "q-ids-031",
    "choice_key": "B",
    "choice_text": "System, Router, VPN, User",
    "sequence_order": 2
  },
  {
    "id": "c-031-C",
    "question_id": "q-ids-031",
    "choice_key": "C",
    "choice_text": "Forward, Local, Sniffer",
    "sequence_order": 3
  },
  {
    "id": "c-031-D",
    "question_id": "q-ids-031",
    "choice_key": "D",
    "choice_text": "Power, Fan, Temperature, Battery",
    "sequence_order": 4
  },
  {
    "id": "c-032-A",
    "question_id": "q-ids-032",
    "choice_key": "A",
    "choice_text": "libpcap / tcpdump filter syntax",
    "sequence_order": 1
  },
  {
    "id": "c-032-B",
    "question_id": "q-ids-032",
    "choice_key": "B",
    "choice_text": "SQL Query syntax",
    "sequence_order": 2
  },
  {
    "id": "c-032-C",
    "question_id": "q-ids-032",
    "choice_key": "C",
    "choice_text": "HTML Tags",
    "sequence_order": 3
  },
  {
    "id": "c-032-D",
    "question_id": "q-ids-032",
    "choice_key": "D",
    "choice_text": "JSON format",
    "sequence_order": 4
  },
  {
    "id": "c-033-A",
    "question_id": "q-ids-033",
    "choice_key": "A",
    "choice_text": "Security Events จะบันทึก Log เฉพาะเมื่อทราฟฟิกนั้นถูกตรวจพบว่ามีภัยคุกคามหรือผิดกฎความปลอดภัย ช่วยประหยัดพื้นที่จัดเก็บและลดภาระ CPU",
    "sequence_order": 1
  },
  {
    "id": "c-033-B",
    "question_id": "q-ids-033",
    "choice_key": "B",
    "choice_text": "Security Events จะบล็อกการเชื่อมต่อทั้งหมด",
    "sequence_order": 2
  },
  {
    "id": "c-033-C",
    "question_id": "q-ids-033",
    "choice_key": "C",
    "choice_text": "All Sessions บันทึกเฉพาะเมื่อเกิดระบบล่ม",
    "sequence_order": 3
  },
  {
    "id": "c-033-D",
    "question_id": "q-ids-033",
    "choice_key": "D",
    "choice_text": "ทั้งสองตัวเลือกให้ปริมาณ Log เท่ากัน",
    "sequence_order": 4
  },
  {
    "id": "c-034-A",
    "question_id": "q-ids-034",
    "choice_key": "A",
    "choice_text": "จัดเก็บ Log บนคลาวด์ ดูรายงาน และบริหารจัดการอุปกรณ์จากระยะไกลได้โดยไม่ต้องติดตั้ง FortiAnalyzer ในองค์กร",
    "sequence_order": 1
  },
  {
    "id": "c-034-B",
    "question_id": "q-ids-034",
    "choice_key": "B",
    "choice_text": "เพิ่มความเร็วดาวน์โหลดเน็ต 100Mbps",
    "sequence_order": 2
  },
  {
    "id": "c-034-C",
    "question_id": "q-ids-034",
    "choice_key": "C",
    "choice_text": "ขยายขนาด RAM ของตัวเครื่อง FortiGate",
    "sequence_order": 3
  },
  {
    "id": "c-034-D",
    "question_id": "q-ids-034",
    "choice_key": "D",
    "choice_text": "ทำการปิดพอร์ต USB ทุกพอร์ต",
    "sequence_order": 4
  },
  {
    "id": "c-035-A",
    "question_id": "q-ids-035",
    "choice_key": "A",
    "choice_text": "บล็อกทราฟฟิกทั้งหมดของเครื่องลูกข่ายนั้นที่ระดับ MAC/IP ป้องกันไม่ให้แพร่กระจายการโจมตีไปยังส่วนอื่นของเครือข่าย",
    "sequence_order": 1
  },
  {
    "id": "c-035-B",
    "question_id": "q-ids-035",
    "choice_key": "B",
    "choice_text": "สั่งลบไฟล์ Windows บนเครื่องลูกข่ายทิ้ง",
    "sequence_order": 2
  },
  {
    "id": "c-035-C",
    "question_id": "q-ids-035",
    "choice_key": "C",
    "choice_text": "ปิดหน้าจอคอมพิวเตอร์ของเครื่องลูกข่าย",
    "sequence_order": 3
  },
  {
    "id": "c-035-D",
    "question_id": "q-ids-035",
    "choice_key": "D",
    "choice_text": "ส่งเสียงร้องเตือนจากลำโพงเครื่องลูกข่าย",
    "sequence_order": 4
  },
  {
    "id": "c-036-A",
    "question_id": "q-ids-036",
    "choice_key": "A",
    "choice_text": "การเปลี่ยนแปลงคอนฟิกูเรชัน, การรีบูตเครื่อง, การอัปเกรดเฟิร์มแวร์ และสถานะอินเทอร์เฟซ Up/Down",
    "sequence_order": 1
  },
  {
    "id": "c-036-B",
    "question_id": "q-ids-036",
    "choice_key": "B",
    "choice_text": "เว็บไซต์ที่ผู้ใช้ทั่วไปเข้าชม",
    "sequence_order": 2
  },
  {
    "id": "c-036-C",
    "question_id": "q-ids-036",
    "choice_key": "C",
    "choice_text": "จำนวนการส่งอีเมลของพนักงาน",
    "sequence_order": 3
  },
  {
    "id": "c-036-D",
    "question_id": "q-ids-036",
    "choice_key": "D",
    "choice_text": "การเล่นเกมออนไลน์ในเครือข่าย",
    "sequence_order": 4
  },
  {
    "id": "c-037-A",
    "question_id": "q-ids-037",
    "choice_key": "A",
    "choice_text": "สามารถกรองค้นหาตาม Source IP, Destination IP, Policy ID, Service หรือช่วงเวลาที่เกิดเหตุได้อย่างเจาะจง",
    "sequence_order": 1
  },
  {
    "id": "c-037-B",
    "question_id": "q-ids-037",
    "choice_key": "B",
    "choice_text": "ลบ Log ที่ไม่ต้องการทิ้งทันที",
    "sequence_order": 2
  },
  {
    "id": "c-037-C",
    "question_id": "q-ids-037",
    "choice_key": "C",
    "choice_text": "ทำการส่งอีเมลแจ้งเตือนผู้บริหาร",
    "sequence_order": 3
  },
  {
    "id": "c-037-D",
    "question_id": "q-ids-037",
    "choice_key": "D",
    "choice_text": "แปลงข้อความ Log เป็นภาษาไทย",
    "sequence_order": 4
  },
  {
    "id": "c-038-A",
    "question_id": "q-ids-038",
    "choice_key": "A",
    "choice_text": "ใช้พื้นที่จัดเก็บ Log สูงขึ้นมาก และเพิ่มภาระการประมวลผลของอุปกรณ์",
    "sequence_order": 1
  },
  {
    "id": "c-038-B",
    "question_id": "q-ids-038",
    "choice_key": "B",
    "choice_text": "ทำให้ Firewall Policy หยุดทำงาน",
    "sequence_order": 2
  },
  {
    "id": "c-038-C",
    "question_id": "q-ids-038",
    "choice_key": "C",
    "choice_text": "ทำให้ไม่สามารถใช้งานอินเทอร์เน็ตได้",
    "sequence_order": 3
  },
  {
    "id": "c-038-D",
    "question_id": "q-ids-038",
    "choice_key": "D",
    "choice_text": "ทำให้รหัสผ่านของผู้ดูแลระบบถูกลบทิ้ง",
    "sequence_order": 4
  },
  {
    "id": "c-039-A",
    "question_id": "q-ids-039",
    "choice_key": "A",
    "choice_text": "PDF, HTML, CSV, XML",
    "sequence_order": 1
  },
  {
    "id": "c-039-B",
    "question_id": "q-ids-039",
    "choice_key": "B",
    "choice_text": "ไฟล์เสียง MP3",
    "sequence_order": 2
  },
  {
    "id": "c-039-C",
    "question_id": "q-ids-039",
    "choice_key": "C",
    "choice_text": "ไฟล์วิดีโอ MP4",
    "sequence_order": 3
  },
  {
    "id": "c-039-D",
    "question_id": "q-ids-039",
    "choice_key": "D",
    "choice_text": "ไฟล์รูปภาพ GIF",
    "sequence_order": 4
  },
  {
    "id": "c-040-A",
    "question_id": "q-ids-040",
    "choice_key": "A",
    "choice_text": "ล้างข้อมูล Log ทั้งหมดที่บันทึกอยู่ในหน่วยความจำและดิสก์ของเครื่อง FortiGate",
    "sequence_order": 1
  },
  {
    "id": "c-040-B",
    "question_id": "q-ids-040",
    "choice_key": "B",
    "choice_text": "ลบคอนฟิกูเรชันทั้งหมด",
    "sequence_order": 2
  },
  {
    "id": "c-040-C",
    "question_id": "q-ids-040",
    "choice_key": "C",
    "choice_text": "ลบผู้ดูแลระบบทั้งหมด",
    "sequence_order": 3
  },
  {
    "id": "c-040-D",
    "question_id": "q-ids-040",
    "choice_key": "D",
    "choice_text": "สั่งรีสตาร์ตเครื่องทันที",
    "sequence_order": 4
  },
  {
    "id": "c-041-A",
    "question_id": "q-ids-041",
    "choice_key": "A",
    "choice_text": "ประมวลผลจากบนลงล่างตามลำดับ (Top-Down Evaluation) โดยนโยบายแรกที่ตรงกับเงื่อนไขจะถูกนำมาใช้ทันที",
    "sequence_order": 1
  },
  {
    "id": "c-041-B",
    "question_id": "q-ids-041",
    "choice_key": "B",
    "choice_text": "ประมวลผลนโยบายที่สร้างขึ้นล่าสุดก่อนเสมอ",
    "sequence_order": 2
  },
  {
    "id": "c-041-C",
    "question_id": "q-ids-041",
    "choice_key": "C",
    "choice_text": "ประมวลผลตามขนาดของ Bandwidth",
    "sequence_order": 3
  },
  {
    "id": "c-041-D",
    "question_id": "q-ids-041",
    "choice_key": "D",
    "choice_text": "ประมวลผลพร้อมกันทุกนโยบายแล้วเลือกนโยบายที่เข้มงวดที่สุด",
    "sequence_order": 4
  },
  {
    "id": "c-042-A",
    "question_id": "q-ids-042",
    "choice_key": "A",
    "choice_text": "ปฏิเสธและทิ้งแพ็กเก็ตทั้งหมด (Drop All Traffic) โดยไม่ส่ง Log เว้นแต่จะเปิดใช้งานผ่าน CLI",
    "sequence_order": 1
  },
  {
    "id": "c-042-B",
    "question_id": "q-ids-042",
    "choice_key": "B",
    "choice_text": "อนุญาตให้ผ่านได้ทั้งหมดเพื่อความสะดวก",
    "sequence_order": 2
  },
  {
    "id": "c-042-C",
    "question_id": "q-ids-042",
    "choice_key": "C",
    "choice_text": "ส่งต่อแพ็กเก็ตไปยังพอร์ต USB",
    "sequence_order": 3
  },
  {
    "id": "c-042-D",
    "question_id": "q-ids-042",
    "choice_key": "D",
    "choice_text": "ทำการรีบูตอุปกรณ์ FortiGate",
    "sequence_order": 4
  },
  {
    "id": "c-043-A",
    "question_id": "q-ids-043",
    "choice_key": "A",
    "choice_text": "ให้เครื่องคอมพิวเตอร์ภายในองค์กร (Private IP) ใช้อินเทอร์เน็ตออกสู่ภายนอกโดยแปลงเป็น Public IP ของขา WAN",
    "sequence_order": 1
  },
  {
    "id": "c-043-B",
    "question_id": "q-ids-043",
    "choice_key": "B",
    "choice_text": "เปิดให้ผู้ใช้ภายนอกเข้าถึงเว็บเซิร์ฟเวอร์ภายใน",
    "sequence_order": 2
  },
  {
    "id": "c-043-C",
    "question_id": "q-ids-043",
    "choice_key": "C",
    "choice_text": "เชื่อมต่อสายแลนระหว่างคอมพิวเตอร์ 2 เครื่อง",
    "sequence_order": 3
  },
  {
    "id": "c-043-D",
    "question_id": "q-ids-043",
    "choice_key": "D",
    "choice_text": "กำหนดค่าความเร็วของพอร์ตเชื่อมต่อ",
    "sequence_order": 4
  },
  {
    "id": "c-044-A",
    "question_id": "q-ids-044",
    "choice_key": "A",
    "choice_text": "Destination NAT (DNAT) เพื่อแปลง Public IP/Port ภายนอกไปยัง Private Server IP/Port ภายใน (Port Forwarding)",
    "sequence_order": 1
  },
  {
    "id": "c-044-B",
    "question_id": "q-ids-044",
    "choice_key": "B",
    "choice_text": "Source NAT สำหรับออกเน็ต",
    "sequence_order": 2
  },
  {
    "id": "c-044-C",
    "question_id": "q-ids-044",
    "choice_key": "C",
    "choice_text": "DHCP Server",
    "sequence_order": 3
  },
  {
    "id": "c-044-D",
    "question_id": "q-ids-044",
    "choice_key": "D",
    "choice_text": "DNS Translation",
    "sequence_order": 4
  },
  {
    "id": "c-045-A",
    "question_id": "q-ids-045",
    "choice_key": "A",
    "choice_text": "One-to-One",
    "sequence_order": 1
  },
  {
    "id": "c-045-B",
    "question_id": "q-ids-045",
    "choice_key": "B",
    "choice_text": "Overload",
    "sequence_order": 2
  },
  {
    "id": "c-045-C",
    "question_id": "q-ids-045",
    "choice_key": "C",
    "choice_text": "Fixed Port Range",
    "sequence_order": 3
  },
  {
    "id": "c-045-D",
    "question_id": "q-ids-045",
    "choice_key": "D",
    "choice_text": "Port Block Allocation (PBA)",
    "sequence_order": 4
  },
  {
    "id": "c-046-A",
    "question_id": "q-ids-046",
    "choice_key": "A",
    "choice_text": "Incoming Interface, Outgoing Interface, Source Address, Destination Address, Schedule, Service, Action",
    "sequence_order": 1
  },
  {
    "id": "c-046-B",
    "question_id": "q-ids-046",
    "choice_key": "B",
    "choice_text": "ชื่อผู้ดูแลระบบ, เบอร์โทรศัพท์, อีเมล",
    "sequence_order": 2
  },
  {
    "id": "c-046-C",
    "question_id": "q-ids-046",
    "choice_key": "C",
    "choice_text": "หมายเลข Serial Number ของคอมพิวเตอร์",
    "sequence_order": 3
  },
  {
    "id": "c-046-D",
    "question_id": "q-ids-046",
    "choice_key": "D",
    "choice_text": "ยี่ห้อของเร้าเตอร์ภายนอก",
    "sequence_order": 4
  },
  {
    "id": "c-047-A",
    "question_id": "q-ids-047",
    "choice_key": "A",
    "choice_text": "จัดสรรพอร์ตเป็นช่วงบล็อกคงที่ล่วงหน้า ช่วยลดปริมาณการสร้าง Log ของการแปลง NAT ลงได้อย่างมหาศาล",
    "sequence_order": 1
  },
  {
    "id": "c-047-B",
    "question_id": "q-ids-047",
    "choice_key": "B",
    "choice_text": "ทำให้ส่งข้อมูลได้เร็วขึ้น 10 เท่า",
    "sequence_order": 2
  },
  {
    "id": "c-047-C",
    "question_id": "q-ids-047",
    "choice_key": "C",
    "choice_text": "ป้องกันไม่ให้ผู้ใช้เล่นเกม",
    "sequence_order": 3
  },
  {
    "id": "c-047-D",
    "question_id": "q-ids-047",
    "choice_key": "D",
    "choice_text": "ทำการเข้ารหัสข้อมูลทุกแพ็กเก็ตด้วย AES-256",
    "sequence_order": 4
  },
  {
    "id": "c-048-A",
    "question_id": "q-ids-048",
    "choice_key": "A",
    "choice_text": "FortiGate จะทำการส่งคำขอ DNS Resolve ชื่อโดเมนเป็นชุดหมายเลข IP Address เก็บไว้ในแคช และอัปเดตตามค่า TTL ของ DNS อัตโนมัติ",
    "sequence_order": 1
  },
  {
    "id": "c-048-B",
    "question_id": "q-ids-048",
    "choice_key": "B",
    "choice_text": "บล็อกชื่อโดเมนนั้นไม่ให้ใครเปิดได้",
    "sequence_order": 2
  },
  {
    "id": "c-048-C",
    "question_id": "q-ids-048",
    "choice_key": "C",
    "choice_text": "แปลงชื่อโดเมนเป็นตัวพิมพ์ใหญ่",
    "sequence_order": 3
  },
  {
    "id": "c-048-D",
    "question_id": "q-ids-048",
    "choice_key": "D",
    "choice_text": "บังคับให้ใช้เฉพาะเว็บบราวเซอร์ Chrome",
    "sequence_order": 4
  },
  {
    "id": "c-049-A",
    "question_id": "q-ids-049",
    "choice_key": "A",
    "choice_text": "การตั้งค่า Source NAT และ IP Pool จะถูกแยกออกมาจัดการในตาราง Central SNAT Policy โดยอิสระ ไม่ต้องตั้งค่าใน Firewall Policy แต่ละข้อ",
    "sequence_order": 1
  },
  {
    "id": "c-049-B",
    "question_id": "q-ids-049",
    "choice_key": "B",
    "choice_text": "ปิดการใช้งาน NAT ทั้งหมด",
    "sequence_order": 2
  },
  {
    "id": "c-049-C",
    "question_id": "q-ids-049",
    "choice_key": "C",
    "choice_text": "บังคับให้ใช้เฉพาะ Public IP ของ ISP เจ้าเดียว",
    "sequence_order": 3
  },
  {
    "id": "c-049-D",
    "question_id": "q-ids-049",
    "choice_key": "D",
    "choice_text": "ลบ Firewall Policies ทั้งหมดออกจากระบบ",
    "sequence_order": 4
  },
  {
    "id": "c-050-A",
    "question_id": "q-ids-050",
    "choice_key": "A",
    "choice_text": "Address Group",
    "sequence_order": 1
  },
  {
    "id": "c-050-B",
    "question_id": "q-ids-050",
    "choice_key": "B",
    "choice_text": "Service Group",
    "sequence_order": 2
  },
  {
    "id": "c-050-C",
    "question_id": "q-ids-050",
    "choice_key": "C",
    "choice_text": "User Group",
    "sequence_order": 3
  },
  {
    "id": "c-050-D",
    "question_id": "q-ids-050",
    "choice_key": "D",
    "choice_text": "Interface Group",
    "sequence_order": 4
  },
  {
    "id": "c-051-A",
    "question_id": "q-ids-051",
    "choice_key": "A",
    "choice_text": "ตรวจสอบเนื้อหาข้างใน Control Connection และทำการเปิดพอร์ตชั่วคราว (Pin-hole) ใน Firewall/NAT สำหรับ Data Connection ให้อัตโนมัติ",
    "sequence_order": 1
  },
  {
    "id": "c-051-B",
    "question_id": "q-ids-051",
    "choice_key": "B",
    "choice_text": "ทำการปิดพอร์ต FTP ทันทีเพื่อความปลอดภัย",
    "sequence_order": 2
  },
  {
    "id": "c-051-C",
    "question_id": "q-ids-051",
    "choice_key": "C",
    "choice_text": "แปลงเสียงพูดใน SIP ให้เป็นตัวอักษร",
    "sequence_order": 3
  },
  {
    "id": "c-051-D",
    "question_id": "q-ids-051",
    "choice_key": "D",
    "choice_text": "ทำการจำกัดความเร็วของไฟล์ดาวน์โหลด",
    "sequence_order": 4
  },
  {
    "id": "c-052-A",
    "question_id": "q-ids-052",
    "choice_key": "A",
    "choice_text": "Recurring Schedule Object ในช่อง Schedule ของ Policy",
    "sequence_order": 1
  },
  {
    "id": "c-052-B",
    "question_id": "q-ids-052",
    "choice_key": "B",
    "choice_text": "System Time Settings",
    "sequence_order": 2
  },
  {
    "id": "c-052-C",
    "question_id": "q-ids-052",
    "choice_key": "C",
    "choice_text": "Session Timeout",
    "sequence_order": 3
  },
  {
    "id": "c-052-D",
    "question_id": "q-ids-052",
    "choice_key": "D",
    "choice_text": "Authentication Timeout",
    "sequence_order": 4
  },
  {
    "id": "c-053-A",
    "question_id": "q-ids-053",
    "choice_key": "A",
    "choice_text": "กำหนดเป้าหมายของ Source หรือ Destination ตามประเทศต้นทาง/ปลายทาง โดยใช้ฐานข้อมูล Geo-IP ของ FortiGuard",
    "sequence_order": 1
  },
  {
    "id": "c-053-B",
    "question_id": "q-ids-053",
    "choice_key": "B",
    "choice_text": "แสดงแผนที่โลกบนหน้าจอ GUI",
    "sequence_order": 2
  },
  {
    "id": "c-053-C",
    "question_id": "q-ids-053",
    "choice_key": "C",
    "choice_text": "แปลภาษาหน้าเว็บเป็นภาษาของประเทศนั้น",
    "sequence_order": 3
  },
  {
    "id": "c-053-D",
    "question_id": "q-ids-053",
    "choice_key": "D",
    "choice_text": "เปลี่ยน Timezone ของอุปกรณ์ตามประเทศปลายทาง",
    "sequence_order": 4
  },
  {
    "id": "c-054-A",
    "question_id": "q-ids-054",
    "choice_key": "A",
    "choice_text": "Send Reset (ส่ง TCP RST กลับไป) หรือ Drop แพ็กเก็ตทิ้งเงียบๆ",
    "sequence_order": 1
  },
  {
    "id": "c-054-B",
    "question_id": "q-ids-054",
    "choice_key": "B",
    "choice_text": "ส่งอีเมลแจ้งผู้ใช้ทุกคน",
    "sequence_order": 2
  },
  {
    "id": "c-054-C",
    "question_id": "q-ids-054",
    "choice_key": "C",
    "choice_text": "เปิดหน้าเว็บ Google ให้ผู้ใช้",
    "sequence_order": 3
  },
  {
    "id": "c-054-D",
    "question_id": "q-ids-054",
    "choice_key": "D",
    "choice_text": "ทำการปิดเครื่องคอมพิวเตอร์ของผู้ใช้",
    "sequence_order": 4
  },
  {
    "id": "c-055-A",
    "question_id": "q-ids-055",
    "choice_key": "A",
    "choice_text": "ช่วยให้สามารถใช้ Public IP เดียวกันเปิดบริการหลายเซิร์ฟเวอร์ภายในได้ โดยแยกตามหมายเลขพอร์ตภายนอกและภายในที่ต่างกัน",
    "sequence_order": 1
  },
  {
    "id": "c-055-B",
    "question_id": "q-ids-055",
    "choice_key": "B",
    "choice_text": "เพิ่มความเร็วฮาร์ดดิสก์ของเซิร์ฟเวอร์",
    "sequence_order": 2
  },
  {
    "id": "c-055-C",
    "question_id": "q-ids-055",
    "choice_key": "C",
    "choice_text": "ป้องกันการถูกขโมยสายแลน",
    "sequence_order": 3
  },
  {
    "id": "c-055-D",
    "question_id": "q-ids-055",
    "choice_key": "D",
    "choice_text": "แปลงสัญญาณ Wi-Fi ให้เป็น 5G",
    "sequence_order": 4
  },
  {
    "id": "c-056-A",
    "question_id": "q-ids-056",
    "choice_key": "A",
    "choice_text": "ใช้อ้างอิงบริการคลาวด์ยอดนิยม (เช่น Microsoft 365, AWS, Google) เป็น Destination Object ได้โดยตรง โดย FortiGuard จะอัปเดตชุด IP และ Port ให้ตลอดเวลา",
    "sequence_order": 1
  },
  {
    "id": "c-056-B",
    "question_id": "q-ids-056",
    "choice_key": "B",
    "choice_text": "ใช้ตรวจสอบความเร็วอินเทอร์เน็ตของ ISP",
    "sequence_order": 2
  },
  {
    "id": "c-056-C",
    "question_id": "q-ids-056",
    "choice_key": "C",
    "choice_text": "ใช้ดาวน์โหลดไฟล์อัปเดต Windows",
    "sequence_order": 3
  },
  {
    "id": "c-056-D",
    "question_id": "q-ids-056",
    "choice_key": "D",
    "choice_text": "ใช้สั่งเปิดปิดเราเตอร์ของผู้ให้บริการ",
    "sequence_order": 4
  },
  {
    "id": "c-057-A",
    "question_id": "q-ids-057",
    "choice_key": "A",
    "choice_text": "จำลองการส่งข้อมูล (Source IP/Port, Destination IP/Port, Protocol) เพื่อตรวจสอบว่าทราฟฟิกนั้นจะตรงกับ Firewall Policy ข้อใดในตาราง",
    "sequence_order": 1
  },
  {
    "id": "c-057-B",
    "question_id": "q-ids-057",
    "choice_key": "B",
    "choice_text": "ค้นหาเบอร์โทรศัพท์ของช่างเทคนิค",
    "sequence_order": 2
  },
  {
    "id": "c-057-C",
    "question_id": "q-ids-057",
    "choice_key": "C",
    "choice_text": "สั่งอัปเกรดเฟิร์มแวร์",
    "sequence_order": 3
  },
  {
    "id": "c-057-D",
    "question_id": "q-ids-057",
    "choice_key": "D",
    "choice_text": "ลบ Policy ที่ซ้ำซ้อนทิ้งอัตโนมัติ",
    "sequence_order": 4
  },
  {
    "id": "c-058-A",
    "question_id": "q-ids-058",
    "choice_key": "A",
    "choice_text": "แอปพลิเคชันหรือโปรโตคอลที่ต้องการให้พอร์ตต้นทางฝั่งภายนอกตรงกับพอร์ตต้นทางของเครื่องภายในอย่างเคร่งครัด (เช่น VoIP / IKE)",
    "sequence_order": 1
  },
  {
    "id": "c-058-B",
    "question_id": "q-ids-058",
    "choice_key": "B",
    "choice_text": "เว็บบราวเซอร์ทั่วไป",
    "sequence_order": 2
  },
  {
    "id": "c-058-C",
    "question_id": "q-ids-058",
    "choice_key": "C",
    "choice_text": "การรับส่งอีเมลธรรมดา",
    "sequence_order": 3
  },
  {
    "id": "c-058-D",
    "question_id": "q-ids-058",
    "choice_key": "D",
    "choice_text": "การดาวน์โหลดไฟล์ผ่าน HTTP",
    "sequence_order": 4
  },
  {
    "id": "c-059-A",
    "question_id": "q-ids-059",
    "choice_key": "A",
    "choice_text": "ACCEPT",
    "sequence_order": 1
  },
  {
    "id": "c-059-B",
    "question_id": "q-ids-059",
    "choice_key": "B",
    "choice_text": "DENY",
    "sequence_order": 2
  },
  {
    "id": "c-059-C",
    "question_id": "q-ids-059",
    "choice_key": "C",
    "choice_text": "DROP",
    "sequence_order": 3
  },
  {
    "id": "c-059-D",
    "question_id": "q-ids-059",
    "choice_key": "D",
    "choice_text": "REDIRECT",
    "sequence_order": 4
  },
  {
    "id": "c-060-A",
    "question_id": "q-ids-060",
    "choice_key": "A",
    "choice_text": "เปลี่ยนลำดับการตรวจจับทราฟฟิก โดยนโยบายที่อยู่ด้านบนจะถูกตรวจสอบและบังคับใช้ก่อนนโยบายด้านล่างเสมอ",
    "sequence_order": 1
  },
  {
    "id": "c-060-B",
    "question_id": "q-ids-060",
    "choice_key": "B",
    "choice_text": "ไม่มีผลใดๆ เนื่องจากระบบตรวจสอบตาม Policy ID",
    "sequence_order": 2
  },
  {
    "id": "c-060-C",
    "question_id": "q-ids-060",
    "choice_key": "C",
    "choice_text": "ทำให้ขนาดไฟล์คอนฟิกเล็กลง",
    "sequence_order": 3
  },
  {
    "id": "c-060-D",
    "question_id": "q-ids-060",
    "choice_key": "D",
    "choice_text": "เพิ่มความเร็วในการเชื่อมต่อสายแลน",
    "sequence_order": 4
  },
  {
    "id": "c-061-A",
    "question_id": "q-ids-061",
    "choice_key": "A",
    "choice_text": "Longest Prefix Match (เส้นทางที่มี Subnet Mask ยาวและเฉพาะเจาะจงที่สุด เช่น /32 ชนะ /24 ชนะ /0)",
    "sequence_order": 1
  },
  {
    "id": "c-061-B",
    "question_id": "q-ids-061",
    "choice_key": "B",
    "choice_text": "ค่า Administrative Distance ที่ต่ำที่สุด",
    "sequence_order": 2
  },
  {
    "id": "c-061-C",
    "question_id": "q-ids-061",
    "choice_key": "C",
    "choice_text": "ค่า Metric / Priority ที่ต่ำที่สุด",
    "sequence_order": 3
  },
  {
    "id": "c-061-D",
    "question_id": "q-ids-061",
    "choice_key": "D",
    "choice_text": "หมายเลขพอร์ตแลนที่น้อยที่สุด",
    "sequence_order": 4
  },
  {
    "id": "c-062-A",
    "question_id": "q-ids-062",
    "choice_key": "A",
    "choice_text": "10",
    "sequence_order": 1
  },
  {
    "id": "c-062-B",
    "question_id": "q-ids-062",
    "choice_key": "B",
    "choice_text": "0",
    "sequence_order": 2
  },
  {
    "id": "c-062-C",
    "question_id": "q-ids-062",
    "choice_key": "C",
    "choice_text": "110",
    "sequence_order": 3
  },
  {
    "id": "c-062-D",
    "question_id": "q-ids-062",
    "choice_key": "D",
    "choice_text": "120",
    "sequence_order": 4
  },
  {
    "id": "c-063-A",
    "question_id": "q-ids-063",
    "choice_key": "A",
    "choice_text": "กำหนดค่า Administrative Distance (AD) ให้สูงกว่าเส้นทางหลัก (เช่น เส้นทางหลัก AD 10, เส้นทางสำรอง AD 20)",
    "sequence_order": 1
  },
  {
    "id": "c-063-B",
    "question_id": "q-ids-063",
    "choice_key": "B",
    "choice_text": "กำหนดให้มี Subnet Mask สั้นกว่า",
    "sequence_order": 2
  },
  {
    "id": "c-063-C",
    "question_id": "q-ids-063",
    "choice_key": "C",
    "choice_text": "กำหนดให้อยู่บนพอร์ตเดียวกัน",
    "sequence_order": 3
  },
  {
    "id": "c-063-D",
    "question_id": "q-ids-063",
    "choice_key": "D",
    "choice_text": "ลบเส้นทางหลักทิ้งเมื่อต้องการใช้งาน",
    "sequence_order": 4
  },
  {
    "id": "c-064-A",
    "question_id": "q-ids-064",
    "choice_key": "A",
    "choice_text": "เมื่อมีเส้นทางไปยังปลายทางเดียวกัน ที่มีทั้งขนาด Prefix, ค่า Administrative Distance และค่า Priority เท่ากันทุกประการ",
    "sequence_order": 1
  },
  {
    "id": "c-064-B",
    "question_id": "q-ids-064",
    "choice_key": "B",
    "choice_text": "เมื่อใช้สายแลนยี่ห้อเดียวกัน",
    "sequence_order": 2
  },
  {
    "id": "c-064-C",
    "question_id": "q-ids-064",
    "choice_key": "C",
    "choice_text": "เมื่อเปิดใช้งาน Transparent Mode",
    "sequence_order": 3
  },
  {
    "id": "c-064-D",
    "question_id": "q-ids-064",
    "choice_key": "D",
    "choice_text": "เมื่อมีการส่งข้อมูลเกิน 1 Gbps",
    "sequence_order": 4
  },
  {
    "id": "c-065-A",
    "question_id": "q-ids-065",
    "choice_key": "A",
    "choice_text": "ทราฟฟิกทั้งหมดที่มาจากหมายเลข Source IP เดียวกัน จะถูกส่งออกไปยังลิงก์เดิมเสมอ เพื่อรักษาความต่อเนื่องของ Session",
    "sequence_order": 1
  },
  {
    "id": "c-065-B",
    "question_id": "q-ids-065",
    "choice_key": "B",
    "choice_text": "สลับส่งทีละแพ็กเก็ตแบบ Round-robin",
    "sequence_order": 2
  },
  {
    "id": "c-065-C",
    "question_id": "q-ids-065",
    "choice_key": "C",
    "choice_text": "ส่งออกเฉพาะลิงก์ที่ใช้พลังงานน้อยที่สุด",
    "sequence_order": 3
  },
  {
    "id": "c-065-D",
    "question_id": "q-ids-065",
    "choice_key": "D",
    "choice_text": "กระจายข้อมูลตามขนาดของไฟล์",
    "sequence_order": 4
  },
  {
    "id": "c-066-A",
    "question_id": "q-ids-066",
    "choice_key": "A",
    "choice_text": "ส่งโพรบ (PING หรือ HTTP) ไปทดสอบสถานะของ Gateway หากไม่ได้รับการตอบกลับตามเกณฑ์ จะทำการถอด Static Route นั้นออกจาก Routing Table อัตโนมัติ",
    "sequence_order": 1
  },
  {
    "id": "c-066-B",
    "question_id": "q-ids-066",
    "choice_key": "B",
    "choice_text": "ทำการตัดสายไฟของโมเด็มทิ้ง",
    "sequence_order": 2
  },
  {
    "id": "c-066-C",
    "question_id": "q-ids-066",
    "choice_key": "C",
    "choice_text": "สั่งให้อุปกรณ์รีบูตตัวเอง",
    "sequence_order": 3
  },
  {
    "id": "c-066-D",
    "question_id": "q-ids-066",
    "choice_key": "D",
    "choice_text": "แจ้งเตือนด้วยการส่งข้อความ SMS",
    "sequence_order": 4
  },
  {
    "id": "c-067-A",
    "question_id": "q-ids-067",
    "choice_key": "A",
    "choice_text": "Policy Routes จะถูกตรวจสอบและประมวลผล ก่อนหน้า การค้นหาตาราง Routing Table ปกติเสมอ",
    "sequence_order": 1
  },
  {
    "id": "c-067-B",
    "question_id": "q-ids-067",
    "choice_key": "B",
    "choice_text": "Policy Routes จะทำงานหลังจากดู Routing Table เสร็จแล้ว",
    "sequence_order": 2
  },
  {
    "id": "c-067-C",
    "question_id": "q-ids-067",
    "choice_key": "C",
    "choice_text": "Policy Routes ใช้ได้เฉพาะกับ IPv6 เท่านั้น",
    "sequence_order": 3
  },
  {
    "id": "c-067-D",
    "question_id": "q-ids-067",
    "choice_key": "D",
    "choice_text": "Policy Routes จะลบตาราง Routing Table ทิ้งทั้งหมด",
    "sequence_order": 4
  },
  {
    "id": "c-068-A",
    "question_id": "q-ids-068",
    "choice_key": "A",
    "choice_text": "0.0.0.0 / 0.0.0.0 (หรือ 0.0.0.0/0)",
    "sequence_order": 1
  },
  {
    "id": "c-068-B",
    "question_id": "q-ids-068",
    "choice_key": "B",
    "choice_text": "255.255.255.255 / 32",
    "sequence_order": 2
  },
  {
    "id": "c-068-C",
    "question_id": "q-ids-068",
    "choice_key": "C",
    "choice_text": "127.0.0.1 / 8",
    "sequence_order": 3
  },
  {
    "id": "c-068-D",
    "question_id": "q-ids-068",
    "choice_key": "D",
    "choice_text": "192.168.1.1 / 24",
    "sequence_order": 4
  },
  {
    "id": "c-069-A",
    "question_id": "q-ids-069",
    "choice_key": "A",
    "choice_text": "เลือก Route A เป็นหลักเพียงเส้นทางเดียว เนื่องจากมีค่า Priority ตัวเลขน้อยกว่า (Lower Priority wins)",
    "sequence_order": 1
  },
  {
    "id": "c-069-B",
    "question_id": "q-ids-069",
    "choice_key": "B",
    "choice_text": "เลือก Route B เนื่องจากตัวเลขมากกว่า",
    "sequence_order": 2
  },
  {
    "id": "c-069-C",
    "question_id": "q-ids-069",
    "choice_key": "C",
    "choice_text": "ทำ ECMP กระจายข้อมูลเท่ากันทั้งสองเส้นทาง",
    "sequence_order": 3
  },
  {
    "id": "c-069-D",
    "question_id": "q-ids-069",
    "choice_key": "D",
    "choice_text": "ไม่เลือกเส้นทางใดเลยและแจ้ง Error",
    "sequence_order": 4
  },
  {
    "id": "c-070-A",
    "question_id": "q-ids-070",
    "choice_key": "A",
    "choice_text": "ทิ้งแพ็กเก็ตที่ส่งมายังเส้นทางนี้ทิ้งทันทีโดยไม่ส่ง ICMP Unreachable กลับไป ป้องกันปัญหา Routing Loop สำหรับ Subnet ที่สรุปไว้ (Summary Route)",
    "sequence_order": 1
  },
  {
    "id": "c-070-B",
    "question_id": "q-ids-070",
    "choice_key": "B",
    "choice_text": "เร่งความเร็วในการดาวน์โหลดข้อมูล",
    "sequence_order": 2
  },
  {
    "id": "c-070-C",
    "question_id": "q-ids-070",
    "choice_key": "C",
    "choice_text": "สำรองข้อมูลลงคลาวด์",
    "sequence_order": 3
  },
  {
    "id": "c-070-D",
    "question_id": "q-ids-070",
    "choice_key": "D",
    "choice_text": "บล็อกสัญญาณรบกวนของ Wi-Fi",
    "sequence_order": 4
  },
  {
    "id": "c-071-A",
    "question_id": "q-ids-071",
    "choice_key": "A",
    "choice_text": "ข้าม Policy Route นั้นและส่งแพ็กเก็ตไปค้นหาเส้นทางใน Routing Table ปกติ",
    "sequence_order": 1
  },
  {
    "id": "c-071-B",
    "question_id": "q-ids-071",
    "choice_key": "B",
    "choice_text": "ทิ้งแพ็กเก็ตนั้นทิ้งทันที (Drop)",
    "sequence_order": 2
  },
  {
    "id": "c-071-C",
    "question_id": "q-ids-071",
    "choice_key": "C",
    "choice_text": "ส่งแพ็กเก็ตวนกลับไปยังต้นทาง",
    "sequence_order": 3
  },
  {
    "id": "c-071-D",
    "question_id": "q-ids-071",
    "choice_key": "D",
    "choice_text": "ทำการปิดพอร์ตเชื่อมต่อนั้น",
    "sequence_order": 4
  },
  {
    "id": "c-072-A",
    "question_id": "q-ids-072",
    "choice_key": "A",
    "choice_text": "get router info routing-table all",
    "sequence_order": 1
  },
  {
    "id": "c-072-B",
    "question_id": "q-ids-072",
    "choice_key": "B",
    "choice_text": "show firewall service",
    "sequence_order": 2
  },
  {
    "id": "c-072-C",
    "question_id": "q-ids-072",
    "choice_key": "C",
    "choice_text": "diagnose sys top",
    "sequence_order": 3
  },
  {
    "id": "c-072-D",
    "question_id": "q-ids-072",
    "choice_key": "D",
    "choice_text": "execute ping",
    "sequence_order": 4
  },
  {
    "id": "c-073-A",
    "question_id": "q-ids-073",
    "choice_key": "A",
    "choice_text": "เมื่อปริมาณ Bandwidth บนเส้นทางแรกใช้งานเกินค่าขีดจำกัด (Spillover Threshold) ที่กำหนดไว้",
    "sequence_order": 1
  },
  {
    "id": "c-073-B",
    "question_id": "q-ids-073",
    "choice_key": "B",
    "choice_text": "เมื่อเส้นทางแรกเกิดไฟดับ",
    "sequence_order": 2
  },
  {
    "id": "c-073-C",
    "question_id": "q-ids-073",
    "choice_key": "C",
    "choice_text": "เมื่อผู้ใช้สั่งงานผ่านปุ่ม GUI",
    "sequence_order": 3
  },
  {
    "id": "c-073-D",
    "question_id": "q-ids-073",
    "choice_key": "D",
    "choice_text": "เมื่อเป็นวันหยุดเสาร์-อาทิตย์",
    "sequence_order": 4
  },
  {
    "id": "c-074-A",
    "question_id": "q-ids-074",
    "choice_key": "A",
    "choice_text": "Border Gateway Protocol (BGP)",
    "sequence_order": 1
  },
  {
    "id": "c-074-B",
    "question_id": "q-ids-074",
    "choice_key": "B",
    "choice_text": "Open Shortest Path First (OSPF)",
    "sequence_order": 2
  },
  {
    "id": "c-074-C",
    "question_id": "q-ids-074",
    "choice_key": "C",
    "choice_text": "Routing Information Protocol (RIP)",
    "sequence_order": 3
  },
  {
    "id": "c-074-D",
    "question_id": "q-ids-074",
    "choice_key": "D",
    "choice_text": "Spanning Tree Protocol (STP)",
    "sequence_order": 4
  },
  {
    "id": "c-075-A",
    "question_id": "q-ids-075",
    "choice_key": "A",
    "choice_text": "ECMP และ Link Health Monitor (Performance SLA) เพื่อเลือกเส้นทางส่งข้อมูลตามคุณภาพลิงก์ (Latency, Jitter, Packet Loss)",
    "sequence_order": 1
  },
  {
    "id": "c-075-B",
    "question_id": "q-ids-075",
    "choice_key": "B",
    "choice_text": "Transparent Mode",
    "sequence_order": 2
  },
  {
    "id": "c-075-C",
    "question_id": "q-ids-075",
    "choice_key": "C",
    "choice_text": "DHCP Server",
    "sequence_order": 3
  },
  {
    "id": "c-075-D",
    "question_id": "q-ids-075",
    "choice_key": "D",
    "choice_text": "Software Switch",
    "sequence_order": 4
  },
  {
    "id": "c-076-A",
    "question_id": "q-ids-076",
    "choice_key": "A",
    "choice_text": "Connected Route (เครือข่ายที่เชื่อมต่ออยู่กับ Interface โดยตรง)",
    "sequence_order": 1
  },
  {
    "id": "c-076-B",
    "question_id": "q-ids-076",
    "choice_key": "B",
    "choice_text": "Static Route",
    "sequence_order": 2
  },
  {
    "id": "c-076-C",
    "question_id": "q-ids-076",
    "choice_key": "C",
    "choice_text": "OSPF Route",
    "sequence_order": 3
  },
  {
    "id": "c-076-D",
    "question_id": "q-ids-076",
    "choice_key": "D",
    "choice_text": "BGP Route",
    "sequence_order": 4
  },
  {
    "id": "c-077-A",
    "question_id": "q-ids-077",
    "choice_key": "A",
    "choice_text": "ทำ Recursive Lookup โดยค้นหาใน Routing Table เพื่อตรวจสอบว่า Gateway IP นั้นสามารถเข้าถึงผ่าน Interface ใดได้บ้าง",
    "sequence_order": 1
  },
  {
    "id": "c-077-B",
    "question_id": "q-ids-077",
    "choice_key": "B",
    "choice_text": "ปฏิเสธและไม่ยอมให้บันทึกคำสั่ง",
    "sequence_order": 2
  },
  {
    "id": "c-077-C",
    "question_id": "q-ids-077",
    "choice_key": "C",
    "choice_text": "ส่งข้อมูลออกพอร์ต 1 เสมอ",
    "sequence_order": 3
  },
  {
    "id": "c-077-D",
    "question_id": "q-ids-077",
    "choice_key": "D",
    "choice_text": "ทำการรีสตาร์ตระบบเราต์",
    "sequence_order": 4
  },
  {
    "id": "c-078-A",
    "question_id": "q-ids-078",
    "choice_key": "A",
    "choice_text": "กำหนดสัดส่วนปริมาณทราฟฟิกที่จะส่งออกแต่ละลิงก์ตามขนาดของแบนด์วิดท์ เช่น ลิงก์ 100M (Weight 2) ได้รับทราฟฟิกเป็น 2 เท่าของลิงก์ 50M (Weight 1)",
    "sequence_order": 1
  },
  {
    "id": "c-078-B",
    "question_id": "q-ids-078",
    "choice_key": "B",
    "choice_text": "กำหนดน้ำหนักของอุปกรณ์ฮาร์ดแวร์",
    "sequence_order": 2
  },
  {
    "id": "c-078-C",
    "question_id": "q-ids-078",
    "choice_key": "C",
    "choice_text": "จำกัดจำนวนผู้ใช้งานบนลิงก์",
    "sequence_order": 3
  },
  {
    "id": "c-078-D",
    "question_id": "q-ids-078",
    "choice_key": "D",
    "choice_text": "เพิ่มความปลอดภัยในการเข้ารหัส",
    "sequence_order": 4
  },
  {
    "id": "c-079-A",
    "question_id": "q-ids-079",
    "choice_key": "A",
    "choice_text": "execute ping <IP_Address>",
    "sequence_order": 1
  },
  {
    "id": "c-079-B",
    "question_id": "q-ids-079",
    "choice_key": "B",
    "choice_text": "diagnose sys top",
    "sequence_order": 2
  },
  {
    "id": "c-079-C",
    "question_id": "q-ids-079",
    "choice_key": "C",
    "choice_text": "get system status",
    "sequence_order": 3
  },
  {
    "id": "c-079-D",
    "question_id": "q-ids-079",
    "choice_key": "D",
    "choice_text": "show firewall address",
    "sequence_order": 4
  },
  {
    "id": "c-080-A",
    "question_id": "q-ids-080",
    "choice_key": "A",
    "choice_text": "Policy-Based Routing (Policy Route / PBR)",
    "sequence_order": 1
  },
  {
    "id": "c-080-B",
    "question_id": "q-ids-080",
    "choice_key": "B",
    "choice_text": "Floating Static Route",
    "sequence_order": 2
  },
  {
    "id": "c-080-C",
    "question_id": "q-ids-080",
    "choice_key": "C",
    "choice_text": "ECMP Spillover",
    "sequence_order": 3
  },
  {
    "id": "c-080-D",
    "question_id": "q-ids-080",
    "choice_key": "D",
    "choice_text": "DNS Translation",
    "sequence_order": 4
  },
  {
    "id": "c-081-A",
    "question_id": "q-ids-081",
    "choice_key": "A",
    "choice_text": "Active Authentication ผู้ใช้ต้องกรอก Username/Password บนหน้า Captive Portal ส่วน Passive Authentication ระบบระบุตัวตนผู้ใช้อัตโนมัติเบื้องหลัง (เช่น FSSO) โดยไม่ต้องกรอกรหัสผ่าน",
    "sequence_order": 1
  },
  {
    "id": "c-081-B",
    "question_id": "q-ids-081",
    "choice_key": "B",
    "choice_text": "Active ใช้เฉพาะกับผู้ดูแลระบบ ส่วน Passive ใช้กับผู้ใช้ทั่วไป",
    "sequence_order": 2
  },
  {
    "id": "c-081-C",
    "question_id": "q-ids-081",
    "choice_key": "C",
    "choice_text": "Passive Authentication ทำงานได้เฉพาะเมื่อผู้ใช้ปิดเครื่องคอมพิวเตอร์",
    "sequence_order": 3
  },
  {
    "id": "c-081-D",
    "question_id": "q-ids-081",
    "choice_key": "D",
    "choice_text": "ทั้งสองรูปแบบให้ผู้ใช้กรอกรหัสผ่านเหมือนกันทุกประการ",
    "sequence_order": 4
  },
  {
    "id": "c-082-A",
    "question_id": "q-ids-082",
    "choice_key": "A",
    "choice_text": "LDAP (Lightweight Directory Access Protocol) หรือ LDAPS (Port 636)",
    "sequence_order": 1
  },
  {
    "id": "c-082-B",
    "question_id": "q-ids-082",
    "choice_key": "B",
    "choice_text": "SNMP",
    "sequence_order": 2
  },
  {
    "id": "c-082-C",
    "question_id": "q-ids-082",
    "choice_key": "C",
    "choice_text": "Telnet",
    "sequence_order": 3
  },
  {
    "id": "c-082-D",
    "question_id": "q-ids-082",
    "choice_key": "D",
    "choice_text": "TFTP",
    "sequence_order": 4
  },
  {
    "id": "c-083-A",
    "question_id": "q-ids-083",
    "choice_key": "A",
    "choice_text": "ดักจับคำขอ HTTP/HTTPS และทำการ Redirect เบราว์เซอร์ของผู้ใช้ไปยังหน้าเว็บล็อกอินเพื่อกรอกชื่อและรหัสผ่านก่อนอนุญาตให้ออกสู่อินเทอร์เน็ต",
    "sequence_order": 1
  },
  {
    "id": "c-083-B",
    "question_id": "q-ids-083",
    "choice_key": "B",
    "choice_text": "ทำการปิดบราวเซอร์ของผู้ใช้ทันที",
    "sequence_order": 2
  },
  {
    "id": "c-083-C",
    "question_id": "q-ids-083",
    "choice_key": "C",
    "choice_text": "ส่งสัญญาณเตือนไปยังผู้ดูแลระบบ",
    "sequence_order": 3
  },
  {
    "id": "c-083-D",
    "question_id": "q-ids-083",
    "choice_key": "D",
    "choice_text": "ลบประวัติการท่องเว็บของผู้ใช้ทิ้ง",
    "sequence_order": 4
  },
  {
    "id": "c-084-A",
    "question_id": "q-ids-084",
    "choice_key": "A",
    "choice_text": "Idle Timeout นับเวลาจากที่ผู้ใช้หยุดใช้งาน (เช่น ไม่ส่งทราฟฟิกเกิน 15 นาที) ส่วน Hard Timeout บังคับให้เซสชันหมดอายุเมื่อครบเวลาสูงสุด (เช่น 8 ชั่วโมง) ไม่ว่าจะใช้งานอยู่หรือไม่",
    "sequence_order": 1
  },
  {
    "id": "c-084-B",
    "question_id": "q-ids-084",
    "choice_key": "B",
    "choice_text": "Idle Timeout ตัดการเชื่อมต่อทันทีที่เริ่มใช้งาน",
    "sequence_order": 2
  },
  {
    "id": "c-084-C",
    "question_id": "q-ids-084",
    "choice_key": "C",
    "choice_text": "Hard Timeout ใช้เฉพาะตอนไฟฟ้าดับ",
    "sequence_order": 3
  },
  {
    "id": "c-084-D",
    "question_id": "q-ids-084",
    "choice_key": "D",
    "choice_text": "ทั้งสองตัวเลือกมีความหมายเดียวกัน",
    "sequence_order": 4
  },
  {
    "id": "c-085-A",
    "question_id": "q-ids-085",
    "choice_key": "A",
    "choice_text": "Vendor-Specific Attributes (VSA) เช่น Fortinet-Group-Name (Attribute 1)",
    "sequence_order": 1
  },
  {
    "id": "c-085-B",
    "question_id": "q-ids-085",
    "choice_key": "B",
    "choice_text": "Password Hash String",
    "sequence_order": 2
  },
  {
    "id": "c-085-C",
    "question_id": "q-ids-085",
    "choice_key": "C",
    "choice_text": "Serial Number ของเซิร์ฟเวอร์",
    "sequence_order": 3
  },
  {
    "id": "c-085-D",
    "question_id": "q-ids-085",
    "choice_key": "D",
    "choice_text": "IP Address ของเร้าเตอร์",
    "sequence_order": 4
  },
  {
    "id": "c-086-A",
    "question_id": "q-ids-086",
    "choice_key": "A",
    "choice_text": "ช่อง Source ของ Firewall Policy ที่อนุญาตทราฟฟิกนั้น",
    "sequence_order": 1
  },
  {
    "id": "c-086-B",
    "question_id": "q-ids-086",
    "choice_key": "B",
    "choice_text": "ตาราง Routing Table",
    "sequence_order": 2
  },
  {
    "id": "c-086-C",
    "question_id": "q-ids-086",
    "choice_key": "C",
    "choice_text": "การตั้งค่า DNS Server",
    "sequence_order": 3
  },
  {
    "id": "c-086-D",
    "question_id": "q-ids-086",
    "choice_key": "D",
    "choice_text": "การตั้งค่าพอร์ต LAN",
    "sequence_order": 4
  },
  {
    "id": "c-087-A",
    "question_id": "q-ids-087",
    "choice_key": "A",
    "choice_text": "การทำ Single Sign-On (SSO) ร่วมกับ Cloud Identity Providers เช่น Microsoft Entra ID (Azure AD), Okta หรือ Google Workspace",
    "sequence_order": 1
  },
  {
    "id": "c-087-B",
    "question_id": "q-ids-087",
    "choice_key": "B",
    "choice_text": "การเชื่อมต่อสายแลนแบบ Trunk",
    "sequence_order": 2
  },
  {
    "id": "c-087-C",
    "question_id": "q-ids-087",
    "choice_key": "C",
    "choice_text": "การส่งข้อความ Syslog",
    "sequence_order": 3
  },
  {
    "id": "c-087-D",
    "question_id": "q-ids-087",
    "choice_key": "D",
    "choice_text": "การสำรองข้อมูลลงฮาร์ดดิสก์",
    "sequence_order": 4
  },
  {
    "id": "c-088-A",
    "question_id": "q-ids-088",
    "choice_key": "A",
    "choice_text": "อนุญาตให้ผู้ดูแลระบบเฉพาะกลุ่ม (เช่น พนักงานต้อนรับ) สามารถสร้างบัญชีผู้ใช้ชั่วคราว หรือเปิดให้ผู้ใช้ลงทะเบียนขอรหัสผ่านด้วยตนเองผ่าน SMS/Email (Self-Registration)",
    "sequence_order": 1
  },
  {
    "id": "c-088-B",
    "question_id": "q-ids-088",
    "choice_key": "B",
    "choice_text": "ลบผู้ใช้งานทั้งหมดทิ้งทุกเที่ยงคืน",
    "sequence_order": 2
  },
  {
    "id": "c-088-C",
    "question_id": "q-ids-088",
    "choice_key": "C",
    "choice_text": "แจกจ่ายรหัสผ่านของผู้ดูแลระบบให้ทุกคน",
    "sequence_order": 3
  },
  {
    "id": "c-088-D",
    "question_id": "q-ids-088",
    "choice_key": "D",
    "choice_text": "ปิดการทำงานของไฟร์วอลล์ชั่วคราว",
    "sequence_order": 4
  },
  {
    "id": "c-089-A",
    "question_id": "q-ids-089",
    "choice_key": "A",
    "choice_text": "Local User (สร้างและเก็บรหัสผ่านไว้บน FortiGate) และ Remote User (อ้างอิงการตรวจสอบสิทธิ์ไปยัง LDAP/RADIUS/SAML Server)",
    "sequence_order": 1
  },
  {
    "id": "c-089-B",
    "question_id": "q-ids-089",
    "choice_key": "B",
    "choice_text": "Online User และ Offline User",
    "sequence_order": 2
  },
  {
    "id": "c-089-C",
    "question_id": "q-ids-089",
    "choice_key": "C",
    "choice_text": "Static User และ Dynamic User",
    "sequence_order": 3
  },
  {
    "id": "c-089-D",
    "question_id": "q-ids-089",
    "choice_key": "D",
    "choice_text": "Super User และ Mini User",
    "sequence_order": 4
  },
  {
    "id": "c-090-A",
    "question_id": "q-ids-090",
    "choice_key": "A",
    "choice_text": "Auth by IP จะถือว่าทราฟฟิกทั้งหมดที่มาจากหมายเลข IP นั้นได้รับการยืนยันตัวตนแล้ว เหมาะกับ Single-user PC ส่วน Auth by Session จะตรวจสอบและจดจำตัวตนแยกเป็นราย Session เหมาะกับ Terminal Server / Citrix",
    "sequence_order": 1
  },
  {
    "id": "c-090-B",
    "question_id": "q-ids-090",
    "choice_key": "B",
    "choice_text": "Auth by IP ปลอดภัยกว่าเสมอในทุกกรณี",
    "sequence_order": 2
  },
  {
    "id": "c-090-C",
    "question_id": "q-ids-090",
    "choice_key": "C",
    "choice_text": "Auth by Session ไม่รองรับการใช้งานกับโปรโตคอล TCP",
    "sequence_order": 3
  },
  {
    "id": "c-090-D",
    "question_id": "q-ids-090",
    "choice_key": "D",
    "choice_text": "ทั้งสองแบบทำงานเหมือนกันทุกประการ",
    "sequence_order": 4
  },
  {
    "id": "c-091-A",
    "question_id": "q-ids-091",
    "choice_key": "A",
    "choice_text": "FortiToken Mobile ทำการสร้างรหัส OTP 6 หลักบนสมาร์ตโฟน และ FortiGate ทำการตรวจสอบความถูกต้อง",
    "sequence_order": 1
  },
  {
    "id": "c-091-B",
    "question_id": "q-ids-091",
    "choice_key": "B",
    "choice_text": "เซิร์ฟเวอร์ LDAP ทำการส่งรหัสผ่านทางไปรษณีย์",
    "sequence_order": 2
  },
  {
    "id": "c-091-C",
    "question_id": "q-ids-091",
    "choice_key": "C",
    "choice_text": "ผู้ใช้ต้องพิมพ์รหัสผ่านเดิมซ้ำ 2 ครั้ง",
    "sequence_order": 3
  },
  {
    "id": "c-091-D",
    "question_id": "q-ids-091",
    "choice_key": "D",
    "choice_text": "บราวเซอร์จะทำการสุ่มตัวเลขให้อัตโนมัติ",
    "sequence_order": 4
  },
  {
    "id": "c-092-A",
    "question_id": "q-ids-092",
    "choice_key": "A",
    "choice_text": "แสดงข้อตกลงและนโยบายการใช้งานระบบ (Acceptable Use Policy) ให้ผู้ใช้กดยอมรับก่อนเข้าใช้งานอินเทอร์เน็ต",
    "sequence_order": 1
  },
  {
    "id": "c-092-B",
    "question_id": "q-ids-092",
    "choice_key": "B",
    "choice_text": "แสดงโฆษณาสินค้า",
    "sequence_order": 2
  },
  {
    "id": "c-092-C",
    "question_id": "q-ids-092",
    "choice_key": "C",
    "choice_text": "แสดงผลการตรวจไวรัส",
    "sequence_order": 3
  },
  {
    "id": "c-092-D",
    "question_id": "q-ids-092",
    "choice_key": "D",
    "choice_text": "แสดงคะแนนการทดสอบ",
    "sequence_order": 4
  },
  {
    "id": "c-093-A",
    "question_id": "q-ids-093",
    "choice_key": "A",
    "choice_text": "diagnose firewall auth clear",
    "sequence_order": 1
  },
  {
    "id": "c-093-B",
    "question_id": "q-ids-093",
    "choice_key": "B",
    "choice_text": "execute reboot",
    "sequence_order": 2
  },
  {
    "id": "c-093-C",
    "question_id": "q-ids-093",
    "choice_key": "C",
    "choice_text": "get system status",
    "sequence_order": 3
  },
  {
    "id": "c-093-D",
    "question_id": "q-ids-093",
    "choice_key": "D",
    "choice_text": "show user local",
    "sequence_order": 4
  },
  {
    "id": "c-094-A",
    "question_id": "q-ids-094",
    "choice_key": "A",
    "choice_text": "Port 1003 (HTTPS Authentication Portal)",
    "sequence_order": 1
  },
  {
    "id": "c-094-B",
    "question_id": "q-ids-094",
    "choice_key": "B",
    "choice_text": "Port 1000 (HTTP Authentication Portal)",
    "sequence_order": 2
  },
  {
    "id": "c-094-C",
    "question_id": "q-ids-094",
    "choice_key": "C",
    "choice_text": "Port 8080",
    "sequence_order": 3
  },
  {
    "id": "c-094-D",
    "question_id": "q-ids-094",
    "choice_key": "D",
    "choice_text": "Port 22",
    "sequence_order": 4
  },
  {
    "id": "c-095-A",
    "question_id": "q-ids-095",
    "choice_key": "A",
    "choice_text": "sAMAccountName",
    "sequence_order": 1
  },
  {
    "id": "c-095-B",
    "question_id": "q-ids-095",
    "choice_key": "B",
    "choice_text": "userPrincipalName",
    "sequence_order": 2
  },
  {
    "id": "c-095-C",
    "question_id": "q-ids-095",
    "choice_key": "C",
    "choice_text": "displayName",
    "sequence_order": 3
  },
  {
    "id": "c-095-D",
    "question_id": "q-ids-095",
    "choice_key": "D",
    "choice_text": "mail",
    "sequence_order": 4
  },
  {
    "id": "c-096-A",
    "question_id": "q-ids-096",
    "choice_key": "A",
    "choice_text": "เพราะเบราว์เซอร์คาดหวังใบรับรองของเว็บไซต์เป้าหมายเดิม แต่ได้รับใบรับรอง HTTPS Portal ของ FortiGate แทน ซึ่งหากเป็น Self-signed CA เครื่องลูกข่ายจะยังไม่เชื่อถือ",
    "sequence_order": 1
  },
  {
    "id": "c-096-B",
    "question_id": "q-ids-096",
    "choice_key": "B",
    "choice_text": "เพราะอินเทอร์เน็ตหลุด",
    "sequence_order": 2
  },
  {
    "id": "c-096-C",
    "question_id": "q-ids-096",
    "choice_key": "C",
    "choice_text": "เพราะแป้นพิมพ์คอมพิวเตอร์เสีย",
    "sequence_order": 3
  },
  {
    "id": "c-096-D",
    "question_id": "q-ids-096",
    "choice_key": "D",
    "choice_text": "เพราะผู้ใช้กรอกรหัสผ่านผิด",
    "sequence_order": 4
  },
  {
    "id": "c-097-A",
    "question_id": "q-ids-097",
    "choice_key": "A",
    "choice_text": "Firewall User Group",
    "sequence_order": 1
  },
  {
    "id": "c-097-B",
    "question_id": "q-ids-097",
    "choice_key": "B",
    "choice_text": "System Group",
    "sequence_order": 2
  },
  {
    "id": "c-097-C",
    "question_id": "q-ids-097",
    "choice_key": "C",
    "choice_text": "Network Group",
    "sequence_order": 3
  },
  {
    "id": "c-097-D",
    "question_id": "q-ids-097",
    "choice_key": "D",
    "choice_text": "Domain Group",
    "sequence_order": 4
  },
  {
    "id": "c-098-A",
    "question_id": "q-ids-098",
    "choice_key": "A",
    "choice_text": "รายชื่อผู้ใช้ที่กำลังล็อกอินผ่านไฟร์วอลล์, หมายเลข IP, Group, เวลาที่เริ่มล็อกอิน และปริมาณทราฟฟิกที่ใช้งาน",
    "sequence_order": 1
  },
  {
    "id": "c-098-B",
    "question_id": "q-ids-098",
    "choice_key": "B",
    "choice_text": "รหัสผ่านของผู้ใช้ทุกคนแบบ Cleartext",
    "sequence_order": 2
  },
  {
    "id": "c-098-C",
    "question_id": "q-ids-098",
    "choice_key": "C",
    "choice_text": "ประวัติการแชตของผู้ใช้",
    "sequence_order": 3
  },
  {
    "id": "c-098-D",
    "question_id": "q-ids-098",
    "choice_key": "D",
    "choice_text": "หมายเลขบัตรประชาชนของผู้ใช้",
    "sequence_order": 4
  },
  {
    "id": "c-099-A",
    "question_id": "q-ids-099",
    "choice_key": "A",
    "choice_text": "อนุญาตให้ผู้ใช้ทุกคนที่มีบัญชีอยู่ใน LDAP Server สามารถผ่านการยืนยันตัวตนได้โดยไม่ต้องตรงกับกลุ่มเฉพาะเจาะจง",
    "sequence_order": 1
  },
  {
    "id": "c-099-B",
    "question_id": "q-ids-099",
    "choice_key": "B",
    "choice_text": "บังคับให้ผู้ใช้ต้องเป็นสมาชิกของทุกกลุ่มในระบบพร้อมกัน",
    "sequence_order": 2
  },
  {
    "id": "c-099-C",
    "question_id": "q-ids-099",
    "choice_key": "C",
    "choice_text": "ลบกลุ่มทั้งหมดใน Active Directory ออก",
    "sequence_order": 3
  },
  {
    "id": "c-099-D",
    "question_id": "q-ids-099",
    "choice_key": "D",
    "choice_text": "ทำการปิดระบบ Authentication ทั้งหมด",
    "sequence_order": 4
  },
  {
    "id": "c-100-A",
    "question_id": "q-ids-100",
    "choice_key": "A",
    "choice_text": "60 ถึง 300 วินาที (1 - 5 นาที)",
    "sequence_order": 1
  },
  {
    "id": "c-100-B",
    "question_id": "q-ids-100",
    "choice_key": "B",
    "choice_text": "24 ชั่วโมง",
    "sequence_order": 2
  },
  {
    "id": "c-100-C",
    "question_id": "q-ids-100",
    "choice_key": "C",
    "choice_text": "30 วัน",
    "sequence_order": 3
  },
  {
    "id": "c-100-D",
    "question_id": "q-ids-100",
    "choice_key": "D",
    "choice_text": "ไม่มีวันหมดอายุ",
    "sequence_order": 4
  },
  {
    "id": "c-101-A",
    "question_id": "q-ids-101",
    "choice_key": "A",
    "choice_text": "ระบุตัวตนและตรวจสอบสิทธิ์ของผู้ใช้งานในระบบ Windows Domain อัตโนมัติ โดยที่ผู้ใช้ไม่ต้องพิมพ์ Username/Password ซ้ำอีกครั้งเมื่อเปิดใช้งานอินเทอร์เน็ต (Seamless / Transparent Authentication)",
    "sequence_order": 1
  },
  {
    "id": "c-101-B",
    "question_id": "q-ids-101",
    "choice_key": "B",
    "choice_text": "ทำการแจกจ่ายรหัสผ่านใหม่ให้พนักงานทุกคน",
    "sequence_order": 2
  },
  {
    "id": "c-101-C",
    "question_id": "q-ids-101",
    "choice_key": "C",
    "choice_text": "สั่งเปิดเครื่องคอมพิวเตอร์ในออฟฟิศพร้อมกัน",
    "sequence_order": 3
  },
  {
    "id": "c-101-D",
    "question_id": "q-ids-101",
    "choice_key": "D",
    "choice_text": "บล็อกสัญญาณโทรศัพท์มือถือในองค์กร",
    "sequence_order": 4
  },
  {
    "id": "c-102-A",
    "question_id": "q-ids-102",
    "choice_key": "A",
    "choice_text": "รวบรวมข้อมูล User Logon Events จาก Domain Controllers (DC), จัดการจับคู่ IP-to-User, กรองกลุ่มผู้ใช้ และส่งข้อมูลไปยัง FortiGate",
    "sequence_order": 1
  },
  {
    "id": "c-102-B",
    "question_id": "q-ids-102",
    "choice_key": "B",
    "choice_text": "ทำหน้าที่เป็น Antivirus บนเครื่องลูกข่าย",
    "sequence_order": 2
  },
  {
    "id": "c-102-C",
    "question_id": "q-ids-102",
    "choice_key": "C",
    "choice_text": "ทำหน้าที่เป็น Web Server สำหรับแสดงหน้าเว็บ",
    "sequence_order": 3
  },
  {
    "id": "c-102-D",
    "question_id": "q-ids-102",
    "choice_key": "D",
    "choice_text": "ทำการตัดสายไฟของเครื่องแม่ข่าย",
    "sequence_order": 4
  },
  {
    "id": "c-103-A",
    "question_id": "q-ids-103",
    "choice_key": "A",
    "choice_text": "DC Agent (dcagent.dll) จะดักจับเหตุการณ์ Logon Event บน Domain Controller แบบเรียลไทม์ทันที และไม่พลาดการบันทึกเมื่อมีปริมาณการล็อกอินหนาแน่น",
    "sequence_order": 1
  },
  {
    "id": "c-103-B",
    "question_id": "q-ids-103",
    "choice_key": "B",
    "choice_text": "DC Agent ไม่ต้องติดตั้งโปรแกรมใดๆ บน Domain Controller",
    "sequence_order": 2
  },
  {
    "id": "c-103-C",
    "question_id": "q-ids-103",
    "choice_key": "C",
    "choice_text": "Event Log Polling ทำงานได้เร็วกว่า 100 เท่า",
    "sequence_order": 3
  },
  {
    "id": "c-103-D",
    "question_id": "q-ids-103",
    "choice_key": "D",
    "choice_text": "DC Agent ใช้เฉพาะกับระบบ Linux เท่านั้น",
    "sequence_order": 4
  },
  {
    "id": "c-104-A",
    "question_id": "q-ids-104",
    "choice_key": "A",
    "choice_text": "FortiGate ทำหน้าที่ส่งคำสั่งไปดึงข้อมูล Security Event Logs จาก Domain Controller โดยตรงผ่านโปรโตคอล SMB / WinRM โดยไม่ต้องติดตั้งโปรแกรม Collector Agent เพิ่มเติม",
    "sequence_order": 1
  },
  {
    "id": "c-104-B",
    "question_id": "q-ids-104",
    "choice_key": "B",
    "choice_text": "ผู้ใช้ต้องทำการติดตั้งแอปบนมือถือ",
    "sequence_order": 2
  },
  {
    "id": "c-104-C",
    "question_id": "q-ids-104",
    "choice_key": "C",
    "choice_text": "เซิร์ฟเวอร์ AD ต้องส่งอีเมลแจ้งเตือนทุกครั้ง",
    "sequence_order": 3
  },
  {
    "id": "c-104-D",
    "question_id": "q-ids-104",
    "choice_key": "D",
    "choice_text": "ทำงานโดยไม่ต้องเชื่อมต่อกับ Active Directory",
    "sequence_order": 4
  },
  {
    "id": "c-105-A",
    "question_id": "q-ids-105",
    "choice_key": "A",
    "choice_text": "ส่งคำขอ NetBIOS / WMI Probe ไปยังเครื่องลูกข่ายเป็นระยะ เพื่อตรวจสอบว่าผู้ใช้คนเดิมยังคงล็อกอินใช้งานอยู่ที่เครื่องคอมพิวเตอร์หมายเลข IP นั้นจริงหรือไม่",
    "sequence_order": 1
  },
  {
    "id": "c-105-B",
    "question_id": "q-ids-105",
    "choice_key": "B",
    "choice_text": "ตรวจสอบว่าเครื่องลูกข่ายเปิดไฟหน้าจออยู่หรือไม่",
    "sequence_order": 2
  },
  {
    "id": "c-105-C",
    "question_id": "q-ids-105",
    "choice_key": "C",
    "choice_text": "ตรวจสอบความเร็วของการ์ดจอ",
    "sequence_order": 3
  },
  {
    "id": "c-105-D",
    "question_id": "q-ids-105",
    "choice_key": "D",
    "choice_text": "ทำการแสกนหาไฟล์เอกสาร Word",
    "sequence_order": 4
  },
  {
    "id": "c-106-A",
    "question_id": "q-ids-106",
    "choice_key": "A",
    "choice_text": "TCP Port 8000",
    "sequence_order": 1
  },
  {
    "id": "c-106-B",
    "question_id": "q-ids-106",
    "choice_key": "B",
    "choice_text": "UDP Port 53",
    "sequence_order": 2
  },
  {
    "id": "c-106-C",
    "question_id": "q-ids-106",
    "choice_key": "C",
    "choice_text": "TCP Port 443",
    "sequence_order": 3
  },
  {
    "id": "c-106-D",
    "question_id": "q-ids-106",
    "choice_key": "D",
    "choice_text": "UDP Port 161",
    "sequence_order": 4
  },
  {
    "id": "c-107-A",
    "question_id": "q-ids-107",
    "choice_key": "A",
    "choice_text": "NTLM Authentication Fallback หรือส่งไปยัง Captive Portal",
    "sequence_order": 1
  },
  {
    "id": "c-107-B",
    "question_id": "q-ids-107",
    "choice_key": "B",
    "choice_text": "ทำการปิดอินเทอร์เน็ตของผู้ใช้ถาวร",
    "sequence_order": 2
  },
  {
    "id": "c-107-C",
    "question_id": "q-ids-107",
    "choice_key": "C",
    "choice_text": "ส่งอีเมลแจ้งเตือนผู้บริหาร",
    "sequence_order": 3
  },
  {
    "id": "c-107-D",
    "question_id": "q-ids-107",
    "choice_key": "D",
    "choice_text": "ลบบัญชีผู้ใช้ใน Active Directory ทิ้ง",
    "sequence_order": 4
  },
  {
    "id": "c-108-A",
    "question_id": "q-ids-108",
    "choice_key": "A",
    "choice_text": "Event ID 4624",
    "sequence_order": 1
  },
  {
    "id": "c-108-B",
    "question_id": "q-ids-108",
    "choice_key": "B",
    "choice_text": "Event ID 1102",
    "sequence_order": 2
  },
  {
    "id": "c-108-C",
    "question_id": "q-ids-108",
    "choice_key": "C",
    "choice_text": "Event ID 4634",
    "sequence_order": 3
  },
  {
    "id": "c-108-D",
    "question_id": "q-ids-108",
    "choice_key": "D",
    "choice_text": "Event ID 7036",
    "sequence_order": 4
  },
  {
    "id": "c-109-A",
    "question_id": "q-ids-109",
    "choice_key": "A",
    "choice_text": "กำหนดระยะเวลาที่ระบบจะลบข้อมูล Session ของผู้ใช้ออกจากฐานข้อมูล เมื่อเครื่องลูกข่ายไม่ตอบสนองต่อการทำ Workstation Verify ตามเกณฑ์",
    "sequence_order": 1
  },
  {
    "id": "c-109-B",
    "question_id": "q-ids-109",
    "choice_key": "B",
    "choice_text": "กำหนดเวลาหมดอายุของรหัสผ่านผู้ดูแลระบบ",
    "sequence_order": 2
  },
  {
    "id": "c-109-C",
    "question_id": "q-ids-109",
    "choice_key": "C",
    "choice_text": "กำหนดเวลาการรีบูตเซิร์ฟเวอร์",
    "sequence_order": 3
  },
  {
    "id": "c-109-D",
    "question_id": "q-ids-109",
    "choice_key": "D",
    "choice_text": "กำหนดเวลาการส่งอีเมล",
    "sequence_order": 4
  },
  {
    "id": "c-110-A",
    "question_id": "q-ids-110",
    "choice_key": "A",
    "choice_text": "กรองส่งเฉพาะ Security Groups ที่เกี่ยวข้องกับ Firewall Policy มายัง FortiGate ช่วยลดภาระหน่วยความจำและขนาดของ FSSO Cache บนอุปกรณ์",
    "sequence_order": 1
  },
  {
    "id": "c-110-B",
    "question_id": "q-ids-110",
    "choice_key": "B",
    "choice_text": "บล็อกไม่ให้ผู้ใช้ทุกคนเข้าใช้งานเครือข่าย",
    "sequence_order": 2
  },
  {
    "id": "c-110-C",
    "question_id": "q-ids-110",
    "choice_key": "C",
    "choice_text": "ทำการรวมไฟล์เอกสารทั้งหมดในองค์กร",
    "sequence_order": 3
  },
  {
    "id": "c-110-D",
    "question_id": "q-ids-110",
    "choice_key": "D",
    "choice_text": "เพิ่มความเร็วการทำงานของ Active Directory",
    "sequence_order": 4
  },
  {
    "id": "c-111-A",
    "question_id": "q-ids-111",
    "choice_key": "A",
    "choice_text": "diagnose debug authd fsso list",
    "sequence_order": 1
  },
  {
    "id": "c-111-B",
    "question_id": "q-ids-111",
    "choice_key": "B",
    "choice_text": "show system interface",
    "sequence_order": 2
  },
  {
    "id": "c-111-C",
    "question_id": "q-ids-111",
    "choice_key": "C",
    "choice_text": "get router info bgp",
    "sequence_order": 3
  },
  {
    "id": "c-111-D",
    "question_id": "q-ids-111",
    "choice_key": "D",
    "choice_text": "execute formatlogdisk",
    "sequence_order": 4
  },
  {
    "id": "c-112-A",
    "question_id": "q-ids-112",
    "choice_key": "A",
    "choice_text": "ระหว่าง DC Agent (บน Domain Controller) ส่งข้อมูล Logon Event ไปยัง FSSO Collector Agent",
    "sequence_order": 1
  },
  {
    "id": "c-112-B",
    "question_id": "q-ids-112",
    "choice_key": "B",
    "choice_text": "ระหว่าง FortiGate ไปยัง Web Browser",
    "sequence_order": 2
  },
  {
    "id": "c-112-C",
    "question_id": "q-ids-112",
    "choice_key": "C",
    "choice_text": "ระหว่าง FortiAnalyzer ไปยัง FortiManager",
    "sequence_order": 3
  },
  {
    "id": "c-112-D",
    "question_id": "q-ids-112",
    "choice_key": "D",
    "choice_text": "ระหว่าง FortiClient ไปยังเครื่องพิมพ์",
    "sequence_order": 4
  },
  {
    "id": "c-113-A",
    "question_id": "q-ids-113",
    "choice_key": "A",
    "choice_text": "ไม่รองรับฟังก์ชัน Workstation Verify และอาจเพิ่มภาระการประมวลผล (Polling Overhead) ให้กับ Domain Controller หากมีขนาดเครือข่ายใหญ่มาก",
    "sequence_order": 1
  },
  {
    "id": "c-113-B",
    "question_id": "q-ids-113",
    "choice_key": "B",
    "choice_text": "ไม่สามารถใช้งานร่วมกับ Windows Server ได้",
    "sequence_order": 2
  },
  {
    "id": "c-113-C",
    "question_id": "q-ids-113",
    "choice_key": "C",
    "choice_text": "ต้องเสียค่าใช้จ่าย License เพิ่มเติมเสมอ",
    "sequence_order": 3
  },
  {
    "id": "c-113-D",
    "question_id": "q-ids-113",
    "choice_key": "D",
    "choice_text": "ใช้งานได้เฉพาะบนระบบปฏิบัติการ Mac",
    "sequence_order": 4
  },
  {
    "id": "c-114-A",
    "question_id": "q-ids-114",
    "choice_key": "A",
    "choice_text": "ชื่อกลุ่มผู้ใช้ใน Active Directory (AD Group Name) ที่ตรงกับในระบบโดเมน",
    "sequence_order": 1
  },
  {
    "id": "c-114-B",
    "question_id": "q-ids-114",
    "choice_key": "B",
    "choice_text": "หมายเลขบัตรประชาชนของพนักงาน",
    "sequence_order": 2
  },
  {
    "id": "c-114-C",
    "question_id": "q-ids-114",
    "choice_key": "C",
    "choice_text": "รหัสผ่านของผู้ดูแลระบบโดเมน",
    "sequence_order": 3
  },
  {
    "id": "c-114-D",
    "question_id": "q-ids-114",
    "choice_key": "D",
    "choice_text": "หมายเลขพอร์ตของสวิตช์",
    "sequence_order": 4
  },
  {
    "id": "c-115-A",
    "question_id": "q-ids-115",
    "choice_key": "A",
    "choice_text": "ป้องกันการดึงข้อมูล Log ซ้ำซ้อน โดยบันทึกตำแหน่ง Record ล่าสุดที่อ่านไปแล้วใน Event Log ของ Domain Controller",
    "sequence_order": 1
  },
  {
    "id": "c-115-B",
    "question_id": "q-ids-115",
    "choice_key": "B",
    "choice_text": "เลื่อนเวลาการล็อกอินของผู้ใช้ไปอีก 1 ชั่วโมง",
    "sequence_order": 2
  },
  {
    "id": "c-115-C",
    "question_id": "q-ids-115",
    "choice_key": "C",
    "choice_text": "ทำการลบ Log ใน Domain Controller ทิ้ง",
    "sequence_order": 3
  },
  {
    "id": "c-115-D",
    "question_id": "q-ids-115",
    "choice_key": "D",
    "choice_text": "เปลี่ยนรูปแบบฟอนต์ของข้อความแจ้งเตือน",
    "sequence_order": 4
  },
  {
    "id": "c-116-A",
    "question_id": "q-ids-116",
    "choice_key": "A",
    "choice_text": "FSSO จะอัปเดต Mapping ให้ผู้ใช้นั้นผูกกับ IP ของเครื่องที่สอง และหากเปิดใช้งานฟังก์ชันตรวจจับ จะทำการเคลียร์สิทธิ์ของเครื่องแรกออก",
    "sequence_order": 1
  },
  {
    "id": "c-116-B",
    "question_id": "q-ids-116",
    "choice_key": "B",
    "choice_text": "บล็อกการใช้งานของทั้งสองเครื่องทันที",
    "sequence_order": 2
  },
  {
    "id": "c-116-C",
    "question_id": "q-ids-116",
    "choice_key": "C",
    "choice_text": "ลบบัญชีผู้ใช้คนนั้นออกจาก Active Directory",
    "sequence_order": 3
  },
  {
    "id": "c-116-D",
    "question_id": "q-ids-116",
    "choice_key": "D",
    "choice_text": "ส่งสัญญาณเตือนภัยไซเบอร์ระดับสีแดง",
    "sequence_order": 4
  },
  {
    "id": "c-117-A",
    "question_id": "q-ids-117",
    "choice_key": "A",
    "choice_text": "ไม่จำเป็นต้องติดตั้ง (Clientless Architecture) เนื่องจากระบบดึงข้อมูลจากระบบล็อกอินของ Windows Domain โดยตรง",
    "sequence_order": 1
  },
  {
    "id": "c-117-B",
    "question_id": "q-ids-117",
    "choice_key": "B",
    "choice_text": "จำเป็นต้องติดตั้งบนคอมพิวเตอร์ทุกเครื่อง",
    "sequence_order": 2
  },
  {
    "id": "c-117-C",
    "question_id": "q-ids-117",
    "choice_key": "C",
    "choice_text": "ต้องติดตั้งเฉพาะบนเครื่องที่เป็นระบบปฏิบัติการ Linux",
    "sequence_order": 3
  },
  {
    "id": "c-117-D",
    "question_id": "q-ids-117",
    "choice_key": "D",
    "choice_text": "ต้องติดตั้งเฉพาะเมื่อต้องการใช้งานเว็บเบราว์เซอร์",
    "sequence_order": 4
  },
  {
    "id": "c-118-A",
    "question_id": "q-ids-118",
    "choice_key": "A",
    "choice_text": "diagnose debug authd fsso server-status",
    "sequence_order": 1
  },
  {
    "id": "c-118-B",
    "question_id": "q-ids-118",
    "choice_key": "B",
    "choice_text": "get system status",
    "sequence_order": 2
  },
  {
    "id": "c-118-C",
    "question_id": "q-ids-118",
    "choice_key": "C",
    "choice_text": "execute formatlogdisk",
    "sequence_order": 3
  },
  {
    "id": "c-118-D",
    "question_id": "q-ids-118",
    "choice_key": "D",
    "choice_text": "show firewall service",
    "sequence_order": 4
  },
  {
    "id": "c-119-A",
    "question_id": "q-ids-119",
    "choice_key": "A",
    "choice_text": "FSSO จะเห็นเฉพาะหมายเลข IP ของ Proxy/NAT Gateway ทำให้ไม่สามารถระบุตัวตนที่แท้จริงของผู้ใช้แต่ละคนได้ (IP-to-User Mapping ล้มเหลว)",
    "sequence_order": 1
  },
  {
    "id": "c-119-B",
    "question_id": "q-ids-119",
    "choice_key": "B",
    "choice_text": "ทำให้ความเร็วของเครือข่ายเร็วขึ้น",
    "sequence_order": 2
  },
  {
    "id": "c-119-C",
    "question_id": "q-ids-119",
    "choice_key": "C",
    "choice_text": "ทำให้ผู้ใช้ทุกคนได้รับสิทธิ์เป็น Super Admin",
    "sequence_order": 3
  },
  {
    "id": "c-119-D",
    "question_id": "q-ids-119",
    "choice_key": "D",
    "choice_text": "ไม่มีผลกระทบใดๆ",
    "sequence_order": 4
  },
  {
    "id": "c-120-A",
    "question_id": "q-ids-120",
    "choice_key": "A",
    "choice_text": "Fortinet Support Portal (support.fortinet.com)",
    "sequence_order": 1
  },
  {
    "id": "c-120-B",
    "question_id": "q-ids-120",
    "choice_key": "B",
    "choice_text": "Google Play Store",
    "sequence_order": 2
  },
  {
    "id": "c-120-C",
    "question_id": "q-ids-120",
    "choice_key": "C",
    "choice_text": "Apple App Store",
    "sequence_order": 3
  },
  {
    "id": "c-120-D",
    "question_id": "q-ids-120",
    "choice_key": "D",
    "choice_text": "Windows Update",
    "sequence_order": 4
  },
  {
    "id": "c-121-A",
    "question_id": "q-ids-121",
    "choice_key": "A",
    "choice_text": "Public Key ใช้สำหรับเข้ารหัสข้อมูลหรือตรวจสอบลายมือชื่อดิจิทัล ส่วน Private Key เก็บเป็นความลับใช้สำหรับถอดรหัสหรือสร้างลายมือชื่อดิจิทัล",
    "sequence_order": 1
  },
  {
    "id": "c-121-B",
    "question_id": "q-ids-121",
    "choice_key": "B",
    "choice_text": "Private Key ใช้แจกจ่ายให้ทุกคนในอินเทอร์เน็ต",
    "sequence_order": 2
  },
  {
    "id": "c-121-C",
    "question_id": "q-ids-121",
    "choice_key": "C",
    "choice_text": "ทั้ง Public และ Private Key มีรหัสเหมือนกันทุกประการ",
    "sequence_order": 3
  },
  {
    "id": "c-121-D",
    "question_id": "q-ids-121",
    "choice_key": "D",
    "choice_text": "Public Key ใช้เฉพาะในวันหยุดราชการ",
    "sequence_order": 4
  },
  {
    "id": "c-122-A",
    "question_id": "q-ids-122",
    "choice_key": "A",
    "choice_text": "Certificate Inspection ตรวจสอบเฉพาะข้อมูลใน SNI Header และใบรับรองโดยไม่ถอดรหัสข้อมูล ส่วน Deep SSL Inspection ทำการถอดรหัสเนื้อหาแพ็กเก็ต (Decryption) เพื่อให้ Security Profiles ตรวจหาไวรัสและภัยคุกคามข้างในได้",
    "sequence_order": 1
  },
  {
    "id": "c-122-B",
    "question_id": "q-ids-122",
    "choice_key": "B",
    "choice_text": "Certificate Inspection ทำการถอดรหัสข้อมูลทั้งหมดแต่ Deep Inspection ตรวจเฉพาะชื่อเว็บ",
    "sequence_order": 2
  },
  {
    "id": "c-122-C",
    "question_id": "q-ids-122",
    "choice_key": "C",
    "choice_text": "Deep SSL Inspection ใช้เฉพาะกับเครือข่ายไร้สาย Wi-Fi",
    "sequence_order": 3
  },
  {
    "id": "c-122-D",
    "question_id": "q-ids-122",
    "choice_key": "D",
    "choice_text": "ทั้งสองรูปแบบให้ประสิทธิภาพการตรวจจับไวรัสเท่ากัน 100%",
    "sequence_order": 4
  },
  {
    "id": "c-123-A",
    "question_id": "q-ids-123",
    "choice_key": "A",
    "choice_text": "เพื่อป้องกันไม่ให้เว็บเบราว์เซอร์แจ้งเตือนข้อผิดพลาด Untrusted Connection / Invalid Certificate Authority เนื่องจาก FortiGate ทำการเซ็นใบรับรองใหม่แทนเว็บไซต์จริง",
    "sequence_order": 1
  },
  {
    "id": "c-123-B",
    "question_id": "q-ids-123",
    "choice_key": "B",
    "choice_text": "เพื่อเพิ่มความเร็วในการเชื่อมต่อสายแลน",
    "sequence_order": 2
  },
  {
    "id": "c-123-C",
    "question_id": "q-ids-123",
    "choice_key": "C",
    "choice_text": "เพื่อป้องกันไม่ให้ผู้ใช้ปิดคอมพิวเตอร์",
    "sequence_order": 3
  },
  {
    "id": "c-123-D",
    "question_id": "q-ids-123",
    "choice_key": "D",
    "choice_text": "เพื่อทำการแปลงรหัสผ่านของผู้ใช้เป็นตัวพิมพ์ใหญ่",
    "sequence_order": 4
  },
  {
    "id": "c-124-A",
    "question_id": "q-ids-124",
    "choice_key": "A",
    "choice_text": "Certificate Authority (CA)",
    "sequence_order": 1
  },
  {
    "id": "c-124-B",
    "question_id": "q-ids-124",
    "choice_key": "B",
    "choice_text": "Internet Service Provider (ISP)",
    "sequence_order": 2
  },
  {
    "id": "c-124-C",
    "question_id": "q-ids-124",
    "choice_key": "C",
    "choice_text": "Hardware Vendor",
    "sequence_order": 3
  },
  {
    "id": "c-124-D",
    "question_id": "q-ids-124",
    "choice_key": "D",
    "choice_text": "Domain Registrar",
    "sequence_order": 4
  },
  {
    "id": "c-125-A",
    "question_id": "q-ids-125",
    "choice_key": "A",
    "choice_text": "บรรจุข้อมูลตัวตนของอุปกรณ์ (Subject Identity) และ Public Key เพื่อนำไปส่งให้ CA ลงลายมือชื่อรับรองเป็น Digital Certificate ฉบับสมบูรณ์",
    "sequence_order": 1
  },
  {
    "id": "c-125-B",
    "question_id": "q-ids-125",
    "choice_key": "B",
    "choice_text": "ทำหน้าที่เป็นรหัสผ่านของผู้ดูแลระบบ",
    "sequence_order": 2
  },
  {
    "id": "c-125-C",
    "question_id": "q-ids-125",
    "choice_key": "C",
    "choice_text": "ใช้สำหรับสำรองข้อมูลคอนฟิก",
    "sequence_order": 3
  },
  {
    "id": "c-125-D",
    "question_id": "q-ids-125",
    "choice_key": "D",
    "choice_text": "ใช้บล็อกการโจมตีจากแฮกเกอร์",
    "sequence_order": 4
  },
  {
    "id": "c-126-A",
    "question_id": "q-ids-126",
    "choice_key": "A",
    "choice_text": "การเงินและธนาคาร (Finance and Banking) และบริการสุขภาพ (Healthcare)",
    "sequence_order": 1
  },
  {
    "id": "c-126-B",
    "question_id": "q-ids-126",
    "choice_key": "B",
    "choice_text": "เว็บบอร์ดบันเทิง",
    "sequence_order": 2
  },
  {
    "id": "c-126-C",
    "question_id": "q-ids-126",
    "choice_key": "C",
    "choice_text": "เว็บดาวน์โหลดเกมเถื่อน",
    "sequence_order": 3
  },
  {
    "id": "c-126-D",
    "question_id": "q-ids-126",
    "choice_key": "D",
    "choice_text": "เว็บแชร์ไฟล์สาธารณะ",
    "sequence_order": 4
  },
  {
    "id": "c-127-A",
    "question_id": "q-ids-127",
    "choice_key": "A",
    "choice_text": "OCSP เป็นการส่งคำถามแบบ Real-time ไปเช็กสถานะใบรับรองกับเซิร์ฟเวอร์โดยตรง ส่วน CRL ต้องดาวน์โหลดไฟล์รายการใบรับรองที่ถูกยกเลิกมาเก็บไว้เป็นระยะ",
    "sequence_order": 1
  },
  {
    "id": "c-127-B",
    "question_id": "q-ids-127",
    "choice_key": "B",
    "choice_text": "CRL ทำงานเร็วกว่าและอัปเดตแบบเรียลไทม์",
    "sequence_order": 2
  },
  {
    "id": "c-127-C",
    "question_id": "q-ids-127",
    "choice_key": "C",
    "choice_text": "OCSP ใช้ได้เฉพาะกับเครือข่ายโทรศัพท์เคลื่อนที่",
    "sequence_order": 3
  },
  {
    "id": "c-127-D",
    "question_id": "q-ids-127",
    "choice_key": "D",
    "choice_text": "ทั้งสองระบบใช้โปรโตคอลเดียวกัน",
    "sequence_order": 4
  },
  {
    "id": "c-128-A",
    "question_id": "q-ids-128",
    "choice_key": "A",
    "choice_text": "ระบุชื่อโดเมนเนมหลายชื่อ (Multiple FQDNs) หรือหมายเลข IP ที่ใบรับรองฉบับนี้คุ้มครองเพิ่มเติมจาก Common Name (CN)",
    "sequence_order": 1
  },
  {
    "id": "c-128-B",
    "question_id": "q-ids-128",
    "choice_key": "B",
    "choice_text": "กำหนดรหัสผ่านของฐานข้อมูล",
    "sequence_order": 2
  },
  {
    "id": "c-128-C",
    "question_id": "q-ids-128",
    "choice_key": "C",
    "choice_text": "กำหนดขนาดของไฟล์ที่จะอัปโหลด",
    "sequence_order": 3
  },
  {
    "id": "c-128-D",
    "question_id": "q-ids-128",
    "choice_key": "D",
    "choice_text": "ระบุหมายเลขโทรศัพท์ของผู้ดูแลระบบ",
    "sequence_order": 4
  },
  {
    "id": "c-129-A",
    "question_id": "q-ids-129",
    "choice_key": "A",
    "choice_text": "TLS Client Hello",
    "sequence_order": 1
  },
  {
    "id": "c-129-B",
    "question_id": "q-ids-129",
    "choice_key": "B",
    "choice_text": "TLS Server Hello",
    "sequence_order": 2
  },
  {
    "id": "c-129-C",
    "question_id": "q-ids-129",
    "choice_key": "C",
    "choice_text": "Certificate Verify",
    "sequence_order": 3
  },
  {
    "id": "c-129-D",
    "question_id": "q-ids-129",
    "choice_key": "D",
    "choice_text": "Finished Message",
    "sequence_order": 4
  },
  {
    "id": "c-130-A",
    "question_id": "q-ids-130",
    "choice_key": "A",
    "choice_text": "ใบรับรองที่เซ็นรับรองความถูกต้องด้วย Private Key ของตัวเองโดยไม่ได้ผ่านการรับรองจาก Trusted Third-party CA ทำให้เบราว์เซอร์จะแจ้งเตือนความไม่ปลอดภัยโดยค่าเริ่มต้น",
    "sequence_order": 1
  },
  {
    "id": "c-130-B",
    "question_id": "q-ids-130",
    "choice_key": "B",
    "choice_text": "ใบรับรองที่ออกโดย Google โดยอัตโนมัติ",
    "sequence_order": 2
  },
  {
    "id": "c-130-C",
    "question_id": "q-ids-130",
    "choice_key": "C",
    "choice_text": "ใบรับรองที่ไม่มีวันหมดอายุตลอดกาล",
    "sequence_order": 3
  },
  {
    "id": "c-130-D",
    "question_id": "q-ids-130",
    "choice_key": "D",
    "choice_text": "ใบรับรองที่ใช้ได้เฉพาะกับระบบ Linux",
    "sequence_order": 4
  },
  {
    "id": "c-131-A",
    "question_id": "q-ids-131",
    "choice_key": "A",
    "choice_text": "จะไม่สามารถตรวจสอบและดักจับมัลแวร์ที่ดาวน์โหลดผ่านโปรโตคอล HTTPS ได้เลย เนื่องจากข้อมูลถูกเข้ารหัสไว้",
    "sequence_order": 1
  },
  {
    "id": "c-131-B",
    "question_id": "q-ids-131",
    "choice_key": "B",
    "choice_text": "จะทำการบล็อกการเข้าเว็บไซต์ HTTPS ทั้งหมด",
    "sequence_order": 2
  },
  {
    "id": "c-131-C",
    "question_id": "q-ids-131",
    "choice_key": "C",
    "choice_text": "จะสามารถตรวจจับไวรัสได้เฉพาะในเวลากลางวัน",
    "sequence_order": 3
  },
  {
    "id": "c-131-D",
    "question_id": "q-ids-131",
    "choice_key": "D",
    "choice_text": "จะทำให้ความเร็วในการตรวจจับช้าลง 2 เท่า",
    "sequence_order": 4
  },
  {
    "id": "c-132-A",
    "question_id": "q-ids-132",
    "choice_key": "A",
    "choice_text": "PKCS#12 (.pfx หรือ .p12)",
    "sequence_order": 1
  },
  {
    "id": "c-132-B",
    "question_id": "q-ids-132",
    "choice_key": "B",
    "choice_text": "ไฟล์ .txt ธรรมดา",
    "sequence_order": 2
  },
  {
    "id": "c-132-C",
    "question_id": "q-ids-132",
    "choice_key": "C",
    "choice_text": "ไฟล์ .docx",
    "sequence_order": 3
  },
  {
    "id": "c-132-D",
    "question_id": "q-ids-132",
    "choice_key": "D",
    "choice_text": "ไฟล์ .exe",
    "sequence_order": 4
  },
  {
    "id": "c-133-A",
    "question_id": "q-ids-133",
    "choice_key": "A",
    "choice_text": "บล็อกการเชื่อมต่อทันทีหากเว็บไซต์ปลายทางใช้ใบรับรองที่หมดอายุ, โดเมนไม่ตรง, หรือถูกเพิกถอน (Revoked) เพื่อป้องกันผู้ใช้จากเว็บปลอมแปลง",
    "sequence_order": 1
  },
  {
    "id": "c-133-B",
    "question_id": "q-ids-133",
    "choice_key": "B",
    "choice_text": "ทำการต่ออายุใบรับรองของเว็บไซต์นั้นให้อัตโนมัติ",
    "sequence_order": 2
  },
  {
    "id": "c-133-C",
    "question_id": "q-ids-133",
    "choice_key": "C",
    "choice_text": "ส่งอีเมลแจ้งเจ้าของเว็บไซต์",
    "sequence_order": 3
  },
  {
    "id": "c-133-D",
    "question_id": "q-ids-133",
    "choice_key": "D",
    "choice_text": "อนุญาตให้เข้าใช้งานได้โดยไม่ต้องใส่รหัสผ่าน",
    "sequence_order": 4
  },
  {
    "id": "c-134-A",
    "question_id": "q-ids-134",
    "choice_key": "A",
    "choice_text": "ช่วยเชื่อมโยงความน่าเชื่อถือจาก Server Certificate ไปจนถึง Root CA ทำให้เครื่องไคลเอนต์สามารถตรวจสอบความถูกต้องได้อย่างสมบูรณ์",
    "sequence_order": 1
  },
  {
    "id": "c-134-B",
    "question_id": "q-ids-134",
    "choice_key": "B",
    "choice_text": "เพิ่มความเร็วในการส่งผ่านข้อมูล",
    "sequence_order": 2
  },
  {
    "id": "c-134-C",
    "question_id": "q-ids-134",
    "choice_key": "C",
    "choice_text": "ทำการเข้ารหัสข้อมูลฮาร์ดดิสก์",
    "sequence_order": 3
  },
  {
    "id": "c-134-D",
    "question_id": "q-ids-134",
    "choice_key": "D",
    "choice_text": "เปลี่ยนชื่อเว็บไซต์ให้สวยงาม",
    "sequence_order": 4
  },
  {
    "id": "c-135-A",
    "question_id": "q-ids-135",
    "choice_key": "A",
    "choice_text": "Fortinet_CA_SSL",
    "sequence_order": 1
  },
  {
    "id": "c-135-B",
    "question_id": "q-ids-135",
    "choice_key": "B",
    "choice_text": "Fortinet_Default_Cert",
    "sequence_order": 2
  },
  {
    "id": "c-135-C",
    "question_id": "q-ids-135",
    "choice_key": "C",
    "choice_text": "GlobalSign_Root",
    "sequence_order": 3
  },
  {
    "id": "c-135-D",
    "question_id": "q-ids-135",
    "choice_key": "D",
    "choice_text": "VeriSign_Standard",
    "sequence_order": 4
  },
  {
    "id": "c-136-A",
    "question_id": "q-ids-136",
    "choice_key": "A",
    "choice_text": "ใช้ Asymmetric Encryption ในช่วง Handshake เพื่อแลกเปลี่ยน Session Key อย่างปลอดภัย จากนั้นใช้ Symmetric Encryption (เช่น AES-GCM) ในการเข้ารหัสข้อมูลจริงเพื่อความรวดเร็ว",
    "sequence_order": 1
  },
  {
    "id": "c-136-B",
    "question_id": "q-ids-136",
    "choice_key": "B",
    "choice_text": "ใช้เฉพาะ Symmetric Encryption ตลอดทั้งกระบวนการ",
    "sequence_order": 2
  },
  {
    "id": "c-136-C",
    "question_id": "q-ids-136",
    "choice_key": "C",
    "choice_text": "ใช้ Asymmetric เข้ารหัสข้อมูลจริงทั้งหมด",
    "sequence_order": 3
  },
  {
    "id": "c-136-D",
    "question_id": "q-ids-136",
    "choice_key": "D",
    "choice_text": "ทั้งสองแบบไม่มีการทำงานร่วมกัน",
    "sequence_order": 4
  },
  {
    "id": "c-137-A",
    "question_id": "q-ids-137",
    "choice_key": "A",
    "choice_text": "Group Policy Object (GPO) ใน Active Directory",
    "sequence_order": 1
  },
  {
    "id": "c-137-B",
    "question_id": "q-ids-137",
    "choice_key": "B",
    "choice_text": "Windows Defender",
    "sequence_order": 2
  },
  {
    "id": "c-137-C",
    "question_id": "q-ids-137",
    "choice_key": "C",
    "choice_text": "Control Panel",
    "sequence_order": 3
  },
  {
    "id": "c-137-D",
    "question_id": "q-ids-137",
    "choice_key": "D",
    "choice_text": "Task Manager",
    "sequence_order": 4
  },
  {
    "id": "c-138-A",
    "question_id": "q-ids-138",
    "choice_key": "A",
    "choice_text": "System > Certificates",
    "sequence_order": 1
  },
  {
    "id": "c-138-B",
    "question_id": "q-ids-138",
    "choice_key": "B",
    "choice_text": "Network > Interfaces",
    "sequence_order": 2
  },
  {
    "id": "c-138-C",
    "question_id": "q-ids-138",
    "choice_key": "C",
    "choice_text": "Log & Report > Events",
    "sequence_order": 3
  },
  {
    "id": "c-138-D",
    "question_id": "q-ids-138",
    "choice_key": "D",
    "choice_text": "Policy & Objects > Addresses",
    "sequence_order": 4
  },
  {
    "id": "c-139-A",
    "question_id": "q-ids-139",
    "choice_key": "A",
    "choice_text": "หากเบราว์เซอร์หรือแอปพลิเคชันมีการทำ Certificate Pinning (ฝังค่าลายนิ้วมือใบรับรองจริงไว้ในโค้ด) เบราว์เซอร์จะปฏิเสธใบรับรองของ FortiGate และบล็อกการเชื่อมต่อทันที",
    "sequence_order": 1
  },
  {
    "id": "c-139-B",
    "question_id": "q-ids-139",
    "choice_key": "B",
    "choice_text": "ทำให้การเชื่อมต่อเร็วขึ้น 10 เท่า",
    "sequence_order": 2
  },
  {
    "id": "c-139-C",
    "question_id": "q-ids-139",
    "choice_key": "C",
    "choice_text": "ทำให้ใบรับรองไม่หมดอายุ",
    "sequence_order": 3
  },
  {
    "id": "c-139-D",
    "question_id": "q-ids-139",
    "choice_key": "D",
    "choice_text": "ไม่มีผลกระทบใดๆ ต่อการตรวจสอบ",
    "sequence_order": 4
  },
  {
    "id": "c-140-A",
    "question_id": "q-ids-140",
    "choice_key": "A",
    "choice_text": "Private Key",
    "sequence_order": 1
  },
  {
    "id": "c-140-B",
    "question_id": "q-ids-140",
    "choice_key": "B",
    "choice_text": "Public Key",
    "sequence_order": 2
  },
  {
    "id": "c-140-C",
    "question_id": "q-ids-140",
    "choice_key": "C",
    "choice_text": "Common Name (CN)",
    "sequence_order": 3
  },
  {
    "id": "c-140-D",
    "question_id": "q-ids-140",
    "choice_key": "D",
    "choice_text": "Organization (O)",
    "sequence_order": 4
  },
  {
    "id": "c-141-A",
    "question_id": "q-ids-141",
    "choice_key": "A",
    "choice_text": "Flow-Based สแกนแพ็กเก็ตแบบเรียลไทม์ขณะข้อมูลกำลังไหลผ่าน (Stream) มีความเร็วสูงและ Latency ต่ำ ส่วน Proxy-Based จะพักข้อมูลทั้งไฟล์ลงในบัฟเฟอร์ก่อนสแกนอย่างละเอียดและรองรับฟังก์ชันขั้นสูงเช่น File Quarantine",
    "sequence_order": 1
  },
  {
    "id": "c-141-B",
    "question_id": "q-ids-141",
    "choice_key": "B",
    "choice_text": "Flow-Based ตรวจจับไวรัสได้ละเอียดกว่า Proxy-Based เสมอ",
    "sequence_order": 2
  },
  {
    "id": "c-141-C",
    "question_id": "q-ids-141",
    "choice_key": "C",
    "choice_text": "Proxy-Based ทำงานได้เฉพาะกับสาย Fiber",
    "sequence_order": 3
  },
  {
    "id": "c-141-D",
    "question_id": "q-ids-141",
    "choice_key": "D",
    "choice_text": "ทั้งสองโหมดมีสถาปัตยกรรมการทำงานเหมือนกันทุกประการ",
    "sequence_order": 4
  },
  {
    "id": "c-142-A",
    "question_id": "q-ids-142",
    "choice_key": "A",
    "choice_text": "Normal / Standard Antivirus Database",
    "sequence_order": 1
  },
  {
    "id": "c-142-B",
    "question_id": "q-ids-142",
    "choice_key": "B",
    "choice_text": "Extended Database",
    "sequence_order": 2
  },
  {
    "id": "c-142-C",
    "question_id": "q-ids-142",
    "choice_key": "C",
    "choice_text": "Extreme Database",
    "sequence_order": 3
  },
  {
    "id": "c-142-D",
    "question_id": "q-ids-142",
    "choice_key": "D",
    "choice_text": "Legacy Database",
    "sequence_order": 4
  },
  {
    "id": "c-143-A",
    "question_id": "q-ids-143",
    "choice_key": "A",
    "choice_text": "บรรจุ Signature ของมัลแวร์เพิ่มเติมครอบคลุมถึงมัลแวร์เก่าและมัลแวร์บนระบบปฏิบัติการอื่นๆ สำหรับอุปกรณ์ที่มีพื้นที่หน่วยความจำและฮาร์ดแวร์รองรับ",
    "sequence_order": 1
  },
  {
    "id": "c-143-B",
    "question_id": "q-ids-143",
    "choice_key": "B",
    "choice_text": "ใช้สำหรับตรวจจับไฟล์รูปภาพเท่านั้น",
    "sequence_order": 2
  },
  {
    "id": "c-143-C",
    "question_id": "q-ids-143",
    "choice_key": "C",
    "choice_text": "ทำงานโดยไม่ต้องเชื่อมต่อกับ FortiGuard",
    "sequence_order": 3
  },
  {
    "id": "c-143-D",
    "question_id": "q-ids-143",
    "choice_key": "D",
    "choice_text": "ใช้เฉพาะในโหมด Transparent",
    "sequence_order": 4
  },
  {
    "id": "c-144-A",
    "question_id": "q-ids-144",
    "choice_key": "A",
    "choice_text": "FortiGate จะส่งสำเนาไฟล์ที่น่าสงสัยไปยัง FortiSandbox เพื่อทำการรันและวิเคราะห์พฤติกรรมในสภาพแวดล้อมเสมือนที่ถูกแยกส่วน (Isolated VM Execution)",
    "sequence_order": 1
  },
  {
    "id": "c-144-B",
    "question_id": "q-ids-144",
    "choice_key": "B",
    "choice_text": "FortiGate จะลบระบบปฏิบัติการทิ้งทันที",
    "sequence_order": 2
  },
  {
    "id": "c-144-C",
    "question_id": "q-ids-144",
    "choice_key": "C",
    "choice_text": "สั่งให้ผู้ใช้ปิดเครื่องคอมพิวเตอร์",
    "sequence_order": 3
  },
  {
    "id": "c-144-D",
    "question_id": "q-ids-144",
    "choice_key": "D",
    "choice_text": "ส่งไฟล์ไปให้ผู้ใช้เปิดทดสอบเอง",
    "sequence_order": 4
  },
  {
    "id": "c-145-A",
    "question_id": "q-ids-145",
    "choice_key": "A",
    "choice_text": "วิเคราะห์โครงสร้างและคำสั่งที่น่าสงสัยในไฟล์เพื่อตรวจจับมัลแวร์สายพันธุ์ใหม่หรือ Polymorphic Virus ที่ยังไม่มี Signature เฉพาะเจาะจง",
    "sequence_order": 1
  },
  {
    "id": "c-145-B",
    "question_id": "q-ids-145",
    "choice_key": "B",
    "choice_text": "เปรียบเทียบเฉพาะค่า MD5 Hash ของไฟล์",
    "sequence_order": 2
  },
  {
    "id": "c-145-C",
    "question_id": "q-ids-145",
    "choice_key": "C",
    "choice_text": "ตรวจสอบเฉพาะขนาดของไฟล์",
    "sequence_order": 3
  },
  {
    "id": "c-145-D",
    "question_id": "q-ids-145",
    "choice_key": "D",
    "choice_text": "ตรวจสอบชื่อของไฟล์ที่ดาวน์โหลด",
    "sequence_order": 4
  },
  {
    "id": "c-146-A",
    "question_id": "q-ids-146",
    "choice_key": "A",
    "choice_text": "บล็อกการดาวน์โหลดไฟล์ และส่งหน้าข้อความแจ้งเตือน (Replacement Message) แสดงบนหน้าจอเบราว์เซอร์ของผู้ใช้",
    "sequence_order": 1
  },
  {
    "id": "c-146-B",
    "question_id": "q-ids-146",
    "choice_key": "B",
    "choice_text": "อนุญาตให้ดาวน์โหลดไฟล์ต่อจนเสร็จ",
    "sequence_order": 2
  },
  {
    "id": "c-146-C",
    "question_id": "q-ids-146",
    "choice_key": "C",
    "choice_text": "ทำการปิดเครื่องเซิร์ฟเวอร์ปลายทาง",
    "sequence_order": 3
  },
  {
    "id": "c-146-D",
    "question_id": "q-ids-146",
    "choice_key": "D",
    "choice_text": "ลบประวัติการเข้าชมเว็บของผู้ใช้",
    "sequence_order": 4
  },
  {
    "id": "c-147-A",
    "question_id": "q-ids-147",
    "choice_key": "A",
    "choice_text": "HTTP, HTTPS, FTP, FTPS, SMTP, SMTPS, POP3, POP3S, IMAP, IMAPS, CIFS (SMB)",
    "sequence_order": 1
  },
  {
    "id": "c-147-B",
    "question_id": "q-ids-147",
    "choice_key": "B",
    "choice_text": "เฉพาะโปรโตคอล PING",
    "sequence_order": 2
  },
  {
    "id": "c-147-C",
    "question_id": "q-ids-147",
    "choice_key": "C",
    "choice_text": "เฉพาะโปรโตคอล DNS",
    "sequence_order": 3
  },
  {
    "id": "c-147-D",
    "question_id": "q-ids-147",
    "choice_key": "D",
    "choice_text": "เฉพาะโปรโตคอล Telnet",
    "sequence_order": 4
  },
  {
    "id": "c-148-A",
    "question_id": "q-ids-148",
    "choice_key": "A",
    "choice_text": "กำหนดระดับความลึกของการแตกไฟล์บีบอัดซ้อนกัน (เช่น zip ซ้อน zip) เพื่อเข้าไปสแกนหามัลแวร์ที่แอบซ่อนอยู่ภายในหลายชั้น",
    "sequence_order": 1
  },
  {
    "id": "c-148-B",
    "question_id": "q-ids-148",
    "choice_key": "B",
    "choice_text": "บีบอัดขนาดของไฟล์ให้เล็กลง",
    "sequence_order": 2
  },
  {
    "id": "c-148-C",
    "question_id": "q-ids-148",
    "choice_key": "C",
    "choice_text": "แปลงไฟล์ zip ให้เป็นไฟล์รูปภาพ",
    "sequence_order": 3
  },
  {
    "id": "c-148-D",
    "question_id": "q-ids-148",
    "choice_key": "D",
    "choice_text": "ลบไฟล์ zip ทิ้งทั้งหมด",
    "sequence_order": 4
  },
  {
    "id": "c-149-A",
    "question_id": "q-ids-149",
    "choice_key": "A",
    "choice_text": "FortiGuard Security Services",
    "sequence_order": 1
  },
  {
    "id": "c-149-B",
    "question_id": "q-ids-149",
    "choice_key": "B",
    "choice_text": "Microsoft Update",
    "sequence_order": 2
  },
  {
    "id": "c-149-C",
    "question_id": "q-ids-149",
    "choice_key": "C",
    "choice_text": "Google Security Service",
    "sequence_order": 3
  },
  {
    "id": "c-149-D",
    "question_id": "q-ids-149",
    "choice_key": "D",
    "choice_text": "Ubuntu Repository",
    "sequence_order": 4
  },
  {
    "id": "c-150-A",
    "question_id": "q-ids-150",
    "choice_key": "A",
    "choice_text": "ทำการกักกันไฟล์ที่ต้องสงสัยหรือติดไวรัสเก็บไว้ในพื้นที่จัดเก็บที่ปลอดภัย (Local Disk / FortiAnalyzer) เพื่อให้ผู้ดูแลระบบดาวน์โหลดไปตรวจสอบ Forensic",
    "sequence_order": 1
  },
  {
    "id": "c-150-B",
    "question_id": "q-ids-150",
    "choice_key": "B",
    "choice_text": "ส่งไฟล์ไปให้ผู้ใช้ทุกคนในบริษัท",
    "sequence_order": 2
  },
  {
    "id": "c-150-C",
    "question_id": "q-ids-150",
    "choice_key": "C",
    "choice_text": "เปิดไฟล์ขึ้นมาทำงานบนหน้าจอของแอดมิน",
    "sequence_order": 3
  },
  {
    "id": "c-150-D",
    "question_id": "q-ids-150",
    "choice_key": "D",
    "choice_text": "ส่งไฟล์ไปที่เครื่องพิมพ์",
    "sequence_order": 4
  },
  {
    "id": "c-151-A",
    "question_id": "q-ids-151",
    "choice_key": "A",
    "choice_text": "โมเดล Machine Learning / Deep Learning ที่ได้รับการฝึกฝนจากตัวอย่างมัลแวร์หลายพันล้านตัวเพื่อทำนายคุณลักษณะของไฟล์อันตราย",
    "sequence_order": 1
  },
  {
    "id": "c-151-B",
    "question_id": "q-ids-151",
    "choice_key": "B",
    "choice_text": "การส่งข้อความถามผู้ใช้ทางโทรศัพท์",
    "sequence_order": 2
  },
  {
    "id": "c-151-C",
    "question_id": "q-ids-151",
    "choice_key": "C",
    "choice_text": "การสุ่มเดาผลลัพธ์",
    "sequence_order": 3
  },
  {
    "id": "c-151-D",
    "question_id": "q-ids-151",
    "choice_key": "D",
    "choice_text": "การตรวจสอบเฉพาะชื่อผู้สร้างไฟล์",
    "sequence_order": 4
  },
  {
    "id": "c-152-A",
    "question_id": "q-ids-152",
    "choice_key": "A",
    "choice_text": "ใช้ทดสอบการทำงานของระบบ Antivirus ว่าสามารถตรวจจับและบล็อกไฟล์ได้อย่างถูกต้อง โดยตัวไฟล์ไม่มีอันตรายต่อเครื่องคอมพิวเตอร์",
    "sequence_order": 1
  },
  {
    "id": "c-152-B",
    "question_id": "q-ids-152",
    "choice_key": "B",
    "choice_text": "ใช้สำหรับทำลายฮาร์ดดิสก์",
    "sequence_order": 2
  },
  {
    "id": "c-152-C",
    "question_id": "q-ids-152",
    "choice_key": "C",
    "choice_text": "ใช้สำหรับแฮกระบบเครือข่าย",
    "sequence_order": 3
  },
  {
    "id": "c-152-D",
    "question_id": "q-ids-152",
    "choice_key": "D",
    "choice_text": "ใช้สำหรับกู้รหัสผ่าน",
    "sequence_order": 4
  },
  {
    "id": "c-153-A",
    "question_id": "q-ids-153",
    "choice_key": "A",
    "choice_text": "ดึงรายการ Hash/URL ของมัลแวร์จากแหล่งภายนอก (Threat Intelligence Feeds) มาบล็อกเพิ่มเติมแบบ Real-time",
    "sequence_order": 1
  },
  {
    "id": "c-153-B",
    "question_id": "q-ids-153",
    "choice_key": "B",
    "choice_text": "สั่งปิดเครื่องคอมพิวเตอร์ที่อยู่ในรายชื่อ",
    "sequence_order": 2
  },
  {
    "id": "c-153-C",
    "question_id": "q-ids-153",
    "choice_key": "C",
    "choice_text": "เปลี่ยนสีไอคอนของไฟล์",
    "sequence_order": 3
  },
  {
    "id": "c-153-D",
    "question_id": "q-ids-153",
    "choice_key": "D",
    "choice_text": "ส่งข้อความเตือนไปยัง LINE",
    "sequence_order": 4
  },
  {
    "id": "c-154-A",
    "question_id": "q-ids-154",
    "choice_key": "A",
    "choice_text": "get system autoupdate status",
    "sequence_order": 1
  },
  {
    "id": "c-154-B",
    "question_id": "q-ids-154",
    "choice_key": "B",
    "choice_text": "diagnose sys session list",
    "sequence_order": 2
  },
  {
    "id": "c-154-C",
    "question_id": "q-ids-154",
    "choice_key": "C",
    "choice_text": "show firewall policy",
    "sequence_order": 3
  },
  {
    "id": "c-154-D",
    "question_id": "q-ids-154",
    "choice_key": "D",
    "choice_text": "execute formatlogdisk",
    "sequence_order": 4
  },
  {
    "id": "c-155-A",
    "question_id": "q-ids-155",
    "choice_key": "A",
    "choice_text": "ไม่รองรับฟังก์ชัน File Quarantine และไม่สามารถทำการตรวจวิเคราะห์ไฟล์ Archive บีบอัดซับซ้อนหลายชั้นได้อย่างสมบูรณ์",
    "sequence_order": 1
  },
  {
    "id": "c-155-B",
    "question_id": "q-ids-155",
    "choice_key": "B",
    "choice_text": "กินทรัพยากร CPU สูงกว่า Proxy-based",
    "sequence_order": 2
  },
  {
    "id": "c-155-C",
    "question_id": "q-ids-155",
    "choice_key": "C",
    "choice_text": "ไม่สามารถใช้งานร่วมกับโปรโตคอล HTTP ได้",
    "sequence_order": 3
  },
  {
    "id": "c-155-D",
    "question_id": "q-ids-155",
    "choice_key": "D",
    "choice_text": "ใช้งานได้เฉพาะบนระบบคลาวด์",
    "sequence_order": 4
  },
  {
    "id": "c-156-A",
    "question_id": "q-ids-156",
    "choice_key": "A",
    "choice_text": "SMTP, POP3, IMAP",
    "sequence_order": 1
  },
  {
    "id": "c-156-B",
    "question_id": "q-ids-156",
    "choice_key": "B",
    "choice_text": "HTTP",
    "sequence_order": 2
  },
  {
    "id": "c-156-C",
    "question_id": "q-ids-156",
    "choice_key": "C",
    "choice_text": "FTP",
    "sequence_order": 3
  },
  {
    "id": "c-156-D",
    "question_id": "q-ids-156",
    "choice_key": "D",
    "choice_text": "DNS",
    "sequence_order": 4
  },
  {
    "id": "c-157-A",
    "question_id": "q-ids-157",
    "choice_key": "A",
    "choice_text": "มัลแวร์, โทรจัน และแอปพลิเคชันอันตรายบนระบบปฏิบัติการสมาร์ตโฟน (Android APK และ iOS)",
    "sequence_order": 1
  },
  {
    "id": "c-157-B",
    "question_id": "q-ids-157",
    "choice_key": "B",
    "choice_text": "ไวรัสคอมพิวเตอร์ Windows 95",
    "sequence_order": 2
  },
  {
    "id": "c-157-C",
    "question_id": "q-ids-157",
    "choice_key": "C",
    "choice_text": "การแฮกสายโทรศัพท์บ้าน",
    "sequence_order": 3
  },
  {
    "id": "c-157-D",
    "question_id": "q-ids-157",
    "choice_key": "D",
    "choice_text": "การบล็อกสัญญาณดาวเทียม",
    "sequence_order": 4
  },
  {
    "id": "c-158-A",
    "question_id": "q-ids-158",
    "choice_key": "A",
    "choice_text": "กำหนดพฤติกรรมของระบบ (Block หรือ Pass) เมื่อไฟล์ที่ดาวน์โหลดมีขนาดใหญ่เกินกว่าขีดจำกัดหน่วยความจำบัฟเฟอร์ที่สามารถสแกนได้",
    "sequence_order": 1
  },
  {
    "id": "c-158-B",
    "question_id": "q-ids-158",
    "choice_key": "B",
    "choice_text": "บีบอัดขนาดของไฟล์ให้เล็กลงอัตโนมัติ",
    "sequence_order": 2
  },
  {
    "id": "c-158-C",
    "question_id": "q-ids-158",
    "choice_key": "C",
    "choice_text": "ลบไฟล์ทั้งหมดในเซิร์ฟเวอร์",
    "sequence_order": 3
  },
  {
    "id": "c-158-D",
    "question_id": "q-ids-158",
    "choice_key": "D",
    "choice_text": "ทำการตัดการเชื่อมต่ออินเทอร์เน็ต",
    "sequence_order": 4
  },
  {
    "id": "c-159-A",
    "question_id": "q-ids-159",
    "choice_key": "A",
    "choice_text": "Security Log ชนิด Antivirus (Log Subtype: virus)",
    "sequence_order": 1
  },
  {
    "id": "c-159-B",
    "question_id": "q-ids-159",
    "choice_key": "B",
    "choice_text": "System Event Log",
    "sequence_order": 2
  },
  {
    "id": "c-159-C",
    "question_id": "q-ids-159",
    "choice_key": "C",
    "choice_text": "Routing Log",
    "sequence_order": 3
  },
  {
    "id": "c-159-D",
    "question_id": "q-ids-159",
    "choice_key": "D",
    "choice_text": "VPN Event Log",
    "sequence_order": 4
  },
  {
    "id": "c-160-A",
    "question_id": "q-ids-160",
    "choice_key": "A",
    "choice_text": "สถานะการเชื่อมต่อกับ FortiGuard Distribution Network (FDN), ผลการอัปเดตล่าสุด และสถานะ Scheduled Update ของ Antivirus/IPS Engine",
    "sequence_order": 1
  },
  {
    "id": "c-160-B",
    "question_id": "q-ids-160",
    "choice_key": "B",
    "choice_text": "สถานะแบตเตอรี่ของอุปกรณ์",
    "sequence_order": 2
  },
  {
    "id": "c-160-C",
    "question_id": "q-ids-160",
    "choice_key": "C",
    "choice_text": "สถานะการพิมพ์ของเครื่องพิมพ์",
    "sequence_order": 3
  },
  {
    "id": "c-160-D",
    "question_id": "q-ids-160",
    "choice_key": "D",
    "choice_text": "สถานะการสำรองข้อมูลลงเทป",
    "sequence_order": 4
  }
];

export const idsAnswerKeys: QuestionAnswerKey[] = [
  {
    "id": "k-001",
    "question_id": "q-ids-001",
    "correct_choice_key": "A",
    "explanation": "FortiGate ตั้งค่า Factory Default IP Address เป็น 192.168.1.99/24 บน port1 หรือพอร์ต internal โดยเปิดใช้งาน HTTPS, HTTP, PING และ SSH สำหรับการบริหารจัดการเริ่มต้น"
  },
  {
    "id": "k-002",
    "question_id": "q-ids-002",
    "correct_choice_key": "A",
    "explanation": "NAT Mode ทำหน้าที่เป็น Layer 3 Gateway ที่เราต์ทราฟฟิกระหว่างเครือข่าย ขณะที่ Transparent Mode สอดแทรกเป็น Layer 2 Bridge โดยทุกอินเทอร์เฟซอยู่บนบรอดคาสต์โดเมนเดียวกัน"
  },
  {
    "id": "k-003",
    "question_id": "q-ids-003",
    "correct_choice_key": "A",
    "explanation": "super_admin คือ Administrator Profile สิทธิ์สูงสุดแบบเบ็ดเสร็จ (Full Access) บน Global configuration และทุก VDOM ที่มีอยู่ในระบบ"
  },
  {
    "id": "k-004",
    "question_id": "q-ids-004",
    "correct_choice_key": "A",
    "explanation": "Trusted Hosts บังคับให้ผู้ดูแลระบบสามารถเข้าถึงหน้า Management ได้จาก IP หรือ Subnet ที่กำหนดไว้เท่านั้น หากล็อกอินจาก IP อื่นจะถูกปฏิเสธทันที"
  },
  {
    "id": "k-005",
    "question_id": "q-ids-005",
    "correct_choice_key": "A",
    "explanation": "การสร้าง VLAN Interface ต้องผูกกับ Physical Interface ที่ทำหน้าที่เป็น Trunk และระบุค่า VLAN ID ตามมาตรฐาน IEEE 802.1Q"
  },
  {
    "id": "k-006",
    "question_id": "q-ids-006",
    "correct_choice_key": "A",
    "explanation": "802.3ad Aggregate รวม Bandwidth ของหลายลิงก์เข้าด้วยกันและทำ Traffic Balancing ขณะที่ Redundant Interface เป็นแบบ Active-Backup ที่ใช้ทีละลิงก์"
  },
  {
    "id": "k-007",
    "question_id": "q-ids-007",
    "correct_choice_key": "A",
    "explanation": "HTTP (port 80) และ Telnet (port 23) ส่งข้อมูลแบบไม่เข้ารหัส (Cleartext) จึงควรปิดใช้งานและเปลี่ยนไปใช้ HTTPS (port 443) และ SSH (port 22) แทน"
  },
  {
    "id": "k-008",
    "question_id": "q-ids-008",
    "correct_choice_key": "A",
    "explanation": "MAC Address Reservation ผูกหมายเลข MAC เข้ากับ IP เพื่อให้เครื่องดังกล่าวได้รับ IP เดิมทุกครั้งที่ขอเช่าสัญญาณ DHCP"
  },
  {
    "id": "k-009",
    "question_id": "q-ids-009",
    "correct_choice_key": "A",
    "explanation": "ต้องตรวจสอบลำดับการอัปเกรดตาม Upgrade Path Tool เสมอเพื่อป้องกันคอนฟิกเสียหาย และต้อง Backup Configuration ไว้ก่อนเริ่มอัปเกรด"
  },
  {
    "id": "k-010",
    "question_id": "q-ids-010",
    "correct_choice_key": "A",
    "explanation": "2FA สำหรับ Administrator รองรับ FortiToken Mobile (App บนสมาร์ตโฟน) และ FortiToken Hardware รวมทั้ง Email และ SMS"
  },
  {
    "id": "k-011",
    "question_id": "q-ids-011",
    "correct_choice_key": "A",
    "explanation": "FortiOS ใช้บริการ FortiGuard Anycast DNS เพื่อความเสถียรและความปลอดภัย โดยรองรับการเข้ารหัสคำขอผ่าน DoT/DoH"
  },
  {
    "id": "k-012",
    "question_id": "q-ids-012",
    "correct_choice_key": "A",
    "explanation": "Hardware Switch ใช้ Integrated Switch Fabric (ISF) ASIC ประมวลผลการสลับแพ็กเก็ตระดับฮาร์ดแวร์ ขณะที่ Software Switch ใช้ CPU ทำงาน"
  },
  {
    "id": "k-013",
    "question_id": "q-ids-013",
    "correct_choice_key": "A",
    "explanation": "execute restore config ใช้กู้คืนไฟล์ configuration จากแหล่งเก็บข้อมูลภายนอก (USB, TFTP, FTP) หรือ Revision ที่บันทึกไว้"
  },
  {
    "id": "k-014",
    "question_id": "q-ids-014",
    "correct_choice_key": "A",
    "explanation": "VDOMs ช่วยแบ่งฮาร์ดแวร์ FortiGate เครื่องจริงออกเป็นหลาย Virtual Firewalls ที่มี routing table, policies และ interfaces แยกอิสระต่อกัน"
  },
  {
    "id": "k-015",
    "question_id": "q-ids-015",
    "correct_choice_key": "A",
    "explanation": "MTU มาตรฐานของ Ethernet คือ 1500 bytes (และสามารถเปิด Jumbo Frame ขนาด 9000 bytes บนพอร์ตที่รองรับ)"
  },
  {
    "id": "k-016",
    "question_id": "q-ids-016",
    "correct_choice_key": "A",
    "explanation": "FMG-Access (FortiManager Access) ใช้เปิดพอร์ต FGFM (TCP 541) ให้ FortiManager เข้ามาบริหารจัดการคอนฟิกจากศูนย์กลาง"
  },
  {
    "id": "k-017",
    "question_id": "q-ids-017",
    "correct_choice_key": "A",
    "explanation": "PPPoE (Point-to-Point Protocol over Ethernet) ใช้สำหรับอินเทอร์เฟซ WAN ที่ต้อง Authentication บัญชีผู้ใช้กับผู้ให้บริการ ISP"
  },
  {
    "id": "k-018",
    "question_id": "q-ids-018",
    "correct_choice_key": "A",
    "explanation": "get system status แสดงข้อมูลสรุปของระบบทั้งหมด เช่น Firmware Version, Hostname, Operation Mode, VDOM Status และ Serial Number"
  },
  {
    "id": "k-019",
    "question_id": "q-ids-019",
    "correct_choice_key": "A",
    "explanation": "ไฟล์ System Backup ที่ไม่ได้ใส่ Password จะอยู่ในรูปแบบ Plaintext CLI Script ที่สามารถนำมาเปิดอ่านและ Audit คอนฟิกได้โดยตรง"
  },
  {
    "id": "k-020",
    "question_id": "q-ids-020",
    "correct_choice_key": "A",
    "explanation": "NTP ซิงค์เวลาระบบให้ตรงกัน ซึ่งจำเป็นอย่างยิ่งต่อการตรวจสอบ Log Timestamps, ใบรับรองดิจิทัล (SSL/TLS Validity) และ Time-based OTP (TOTP)"
  },
  {
    "id": "k-021",
    "question_id": "q-ids-021",
    "correct_choice_key": "A",
    "explanation": "Level 0 (Emergency) เป็นระดับสูงสุด หมายถึงระบบไม่สามารถทำงานต่อได้ ตามด้วย 1-Alert, 2-Critical, 3-Error, 4-Warning, 5-Notification, 6-Information, 7-Debug"
  },
  {
    "id": "k-022",
    "question_id": "q-ids-022",
    "correct_choice_key": "A",
    "explanation": "Traffic Logs บันทึกรายละเอียดการไหลของข้อมูลผ่านไฟร์วอลล์ ได้แก่ IP ต้นทาง/ปลายทาง, พอร์ต, จำนวนไบต์, Interface และ Policy ID ที่อนุญาตหรือปฏิเสธ"
  },
  {
    "id": "k-023",
    "question_id": "q-ids-023",
    "correct_choice_key": "A",
    "explanation": "FortiGate ส่ง Log ไปยัง FortiAnalyzer ด้วย OFTP ผ่านพอร์ต TCP 514 โดยมีการเข้ารหัส SSL/TLS เพื่อความปลอดภัย"
  },
  {
    "id": "k-024",
    "question_id": "q-ids-024",
    "correct_choice_key": "A",
    "explanation": "Verbose 4 หมายถึง Print header of packets with interface name (Verbose 1=Header, 2=Header+Data, 3=Ethernet+Header+Data, 4=Interface+Header)"
  },
  {
    "id": "k-025",
    "question_id": "q-ids-025",
    "correct_choice_key": "A",
    "explanation": "Memory Logging เก็บข้อมูลบน RAM ชั่วคราว เมื่อเครื่องรีบูตหรือดับ ข้อมูล Log ในหน่วยความจำจะหายไปทั้งหมด"
  },
  {
    "id": "k-026",
    "question_id": "q-ids-026",
    "correct_choice_key": "A",
    "explanation": "Automation Stitch ประกอบด้วย Trigger (ตัวตรวจจับเหตุการณ์) และ Action (การกระทำตอบสนอง เช่น ส่ง Email, ยิง Webhook หรือกักกันเครื่อง)"
  },
  {
    "id": "k-027",
    "question_id": "q-ids-027",
    "correct_choice_key": "A",
    "explanation": "ค่าเริ่มต้นของ FortiOS เมื่อ Disk เต็มคือ Overwrite Oldest เพื่อให้สามารถบันทึก Log ล่าสุดได้อย่างต่อเนื่อง"
  },
  {
    "id": "k-028",
    "question_id": "q-ids-028",
    "correct_choice_key": "A",
    "explanation": "มาตรฐาน Syslog over TLS (RFC 5425) ใช้พอร์ต TCP 6514 สำหรับการส่ง Log แบบเข้ารหัส"
  },
  {
    "id": "k-029",
    "question_id": "q-ids-029",
    "correct_choice_key": "A",
    "explanation": "FortiView รวบรวมข้อมูล Log และสถิติเครือข่ายมาแสดงผลเชิงภาพ (Visual Dashboard) เพื่อให้เห็น Top Sources, Top Threats และ Bandwidth Usage"
  },
  {
    "id": "k-030",
    "question_id": "q-ids-030",
    "correct_choice_key": "A",
    "explanation": "get system session list (หรือ diagnose sys session list) แสดงตาราง State Table ของทุก Session ที่กำลังเปิดใช้งานบน Firewall"
  },
  {
    "id": "k-031",
    "question_id": "q-ids-031",
    "correct_choice_key": "A",
    "explanation": "Security Logs บันทึกเหตุการณ์ด้านความปลอดภัย ได้แก่ Antivirus, Web Filter, App Control, IPS, DLP, SSL, WAF"
  },
  {
    "id": "k-032",
    "question_id": "q-ids-032",
    "correct_choice_key": "A",
    "explanation": "Sniffer Filter บน FortiOS ใช้มาตรฐาน libpcap (แบบเดียวกับ tcpdump และ Wireshark) เช่น 'src host 1.1.1.1 and tcp port 443'"
  },
  {
    "id": "k-033",
    "question_id": "q-ids-033",
    "correct_choice_key": "A",
    "explanation": "การเลือก Log Security Events ช่วยประหยัดพื้นที่จัดเก็บ โดยจะสร้าง Log เฉพาะเมื่อ Security Profiles ตรวจจับสิ่งผิดปกติได้"
  },
  {
    "id": "k-034",
    "question_id": "q-ids-034",
    "correct_choice_key": "A",
    "explanation": "FortiGate Cloud ให้บริการ Cloud-based logging, analytics และ management สะดวกสำหรับองค์กรที่ไม่มี Log Server ภายใน"
  },
  {
    "id": "k-035",
    "question_id": "q-ids-035",
    "correct_choice_key": "A",
    "explanation": "Quarantine Host จะเพิ่ม IP/MAC ลงในรายการกักกัน ตัดการเชื่อมต่อของเครื่องเป้าหมายไม่ให้สื่อสารกับเครือข่ายส่วนอื่นได้"
  },
  {
    "id": "k-036",
    "question_id": "q-ids-036",
    "correct_choice_key": "A",
    "explanation": "System Event Logs บันทึกการทำงานระดับระบบ เช่น แอดมินแก้คอนฟิก, อินเทอร์เฟซสถานะเปลี่ยน, HA failover, เครื่องรีบูต"
  },
  {
    "id": "k-037",
    "question_id": "q-ids-037",
    "correct_choice_key": "A",
    "explanation": "Log Filter ช่วยให้ Security Analyst เจาะจงค้นหา Log ตาม Attributes ต่างๆ เช่น srcip, dstip, action, policyid ได้อย่างรวดเร็ว"
  },
  {
    "id": "k-038",
    "question_id": "q-ids-038",
    "correct_choice_key": "A",
    "explanation": "Packet Payload Logging เก็บ Raw Packet ของการโจมตีไว้เพื่อทำ Forensic แต่จะใช้ Disk และ CPU Resource สูงมาก"
  },
  {
    "id": "k-039",
    "question_id": "q-ids-039",
    "correct_choice_key": "A",
    "explanation": "Fortinet Reporting Engine รองรับการส่งออกรายงานสรุปความปลอดภัยในฟอร์แมตมาตรฐาน เช่น PDF, HTML, CSV และ XML"
  },
  {
    "id": "k-040",
    "question_id": "q-ids-040",
    "correct_choice_key": "A",
    "explanation": "execute log delete-all ใช้ลบไฟล์ Log ท้องถิ่นทั้งหมดบนอุปกรณ์ (มักใช้ก่อนส่งมอบเครื่องหรือล้างพื้นที่)"
  },
  {
    "id": "k-041",
    "question_id": "q-ids-041",
    "correct_choice_key": "A",
    "explanation": "FortiOS ตรวจสอบ Firewall Policy แบบเรียงลำดับจากบนลงล่าง (Top-Down Sequence) หากตรงกับ Policy ใดจะประมวลผลทันทีและหยุดการค้นหา"
  },
  {
    "id": "k-042",
    "question_id": "q-ids-042",
    "correct_choice_key": "A",
    "explanation": "Implicit Deny (Policy ID 0) ปฏิเสธทราฟฟิกทั้งหมดที่ไม่ตรงกับกฎใดๆ ข้างต้น เป็นมาตรฐานความปลอดภัยแบบ Default-Deny"
  },
  {
    "id": "k-043",
    "question_id": "q-ids-043",
    "correct_choice_key": "A",
    "explanation": "Use Outgoing Interface IP เป็นการทำ PAT (Port Address Translation) แปลง IP ต้นทางหลายเครื่องให้เป็น IP ของพอร์ตขาออก (WAN)"
  },
  {
    "id": "k-044",
    "question_id": "q-ids-044",
    "correct_choice_key": "A",
    "explanation": "Virtual IP (VIP) คือการทำ Destination NAT (DNAT) เพื่อเปิดบริการเซิร์ฟเวอร์ภายใน (เช่น Web/Mail Server) ให้ภายนอกเข้าถึงผ่าน Public IP"
  },
  {
    "id": "k-045",
    "question_id": "q-ids-045",
    "correct_choice_key": "A",
    "explanation": "One-to-One IP Pool จับคู่ 1 Private IP ต่อ 1 Public IP โดยไม่ทำ Port Translation เหมาะกับเซิร์ฟเวอร์เฉพาะทาง"
  },
  {
    "id": "k-046",
    "question_id": "q-ids-046",
    "correct_choice_key": "A",
    "explanation": "Firewall Policy บังคับระบุ: Incoming Interface, Outgoing Interface, Source, Destination, Schedule (always), Service (ALL) และ Action (ACCEPT/DENY)"
  },
  {
    "id": "k-047",
    "question_id": "q-ids-047",
    "correct_choice_key": "A",
    "explanation": "PBA จ่าย Port Block ให้ผู้ใช้ทีละบล็อก ทำให้บันทึก Log เฉพาะตอนจ่าย Block ไม่ต้องบันทึก Log ทุก Session ช่วยลด Log Volume มหาศาล"
  },
  {
    "id": "k-048",
    "question_id": "q-ids-048",
    "correct_choice_key": "A",
    "explanation": "FQDN Address Object ให้ระบุชื่อโดเมน (เช่น update.microsoft.com) โดย FortiOS จะ Query DNS หา IP และอัปเดตใน Policy ตลอดเวลา"
  },
  {
    "id": "k-049",
    "question_id": "q-ids-049",
    "correct_choice_key": "A",
    "explanation": "Central SNAT แยกตาราง SNAT ออกจาก Firewall Policy ช่วยให้บริหารจัดการทราฟฟิก NAT จำนวนมากในระดับองค์กรใหญ่ได้ง่ายขึ้น"
  },
  {
    "id": "k-050",
    "question_id": "q-ids-050",
    "correct_choice_key": "A",
    "explanation": "Address Group ใช้รวมกลุ่ม Address Objects หลายตัวเข้าด้วยกัน ทำให้เวลาเขียน Policy สามารถเลือก Group เดียวได้"
  },
  {
    "id": "k-051",
    "question_id": "q-ids-051",
    "correct_choice_key": "A",
    "explanation": "Session Helpers ตรวจจับคำสั่งพอร์ตใน Control Session (เช่น FTP PASV / SIP SDP) และเปิดพอร์ต Data Channel ข้าม NAT ให้โดยอัตโนมัติ"
  },
  {
    "id": "k-052",
    "question_id": "q-ids-052",
    "correct_choice_key": "A",
    "explanation": "Schedule Object (แบบ Recurring Schedule) ใช้กำหนดช่วงวันและเวลาที่ Policy จะมีผลบังคับใช้"
  },
  {
    "id": "k-053",
    "question_id": "q-ids-053",
    "correct_choice_key": "A",
    "explanation": "Geography Address Object ใช้ฐานข้อมูล FortiGuard Geo-IP จับคู่ IP กับประเทศ เพื่อบล็อกหรืออนุญาตทราฟฟิกตามประเทศเป้าหมาย (Geo-blocking)"
  },
  {
    "id": "k-054",
    "question_id": "q-ids-054",
    "correct_choice_key": "A",
    "explanation": "เมื่อ Action เป็น DENY สามารถเลือก Drop ทราฟฟิกเงียบๆ หรือเลือก Send RST เพื่อปฏิเสธการเชื่อมต่อ TCP ทันที"
  },
  {
    "id": "k-055",
    "question_id": "q-ids-055",
    "correct_choice_key": "A",
    "explanation": "Port Forwarding บน VIP แมป Public IP พอร์ตหนึ่ง (เช่น พอร์ต 8080) ไปยัง Private IP พอร์ตอื่น (เช่น พอร์ต 80) ทำให้แชร์ Public IP ได้คุ้มค่า"
  },
  {
    "id": "k-056",
    "question_id": "q-ids-056",
    "correct_choice_key": "A",
    "explanation": "ISDB รวม IP addresses, ports และ protocols ของบริการ Cloud ระดับโลกไว้ใน Object สำเร็จรูป ช่วยให้เขียน Policy ไปยัง Cloud Service ได้ง่ายและแม่นยำ"
  },
  {
    "id": "k-057",
    "question_id": "q-ids-057",
    "correct_choice_key": "A",
    "explanation": "Policy Lookup เป็นเครื่องมือ Troubleshooting ช่วยจำลอง Packet เพื่อดูว่าทราฟฟิกตามเงื่อนไขจะไป Match กับ Policy ข้อไหน"
  },
  {
    "id": "k-058",
    "question_id": "q-ids-058",
    "correct_choice_key": "A",
    "explanation": "Preserve Source Port บังคับให้ NAT พยายามคง Source Port เดิมไว้ เหมาะกับระบบโทรศัพท์ VoIP หรือโปรโตคอลที่ตรวจสอบ Port ต้นทาง"
  },
  {
    "id": "k-059",
    "question_id": "q-ids-059",
    "correct_choice_key": "A",
    "explanation": "Security Profiles สามารถเปิดใช้งานได้เฉพาะบน Policy ที่มี Action เป็น ACCEPT เท่านั้น (เพื่อตรวจสอบแพ็กเก็ตที่ได้รับอนุญาตให้ผ่าน)"
  },
  {
    "id": "k-060",
    "question_id": "q-ids-060",
    "correct_choice_key": "A",
    "explanation": "ลำดับในตารางมีความสำคัญสูงสุด (Top-Down Sequence) หากวาง Policy กว้างๆ ไว้ด้านบน Policy ที่เฉพาะเจาะจงด้านล่างจะไม่มีวันถูกเรียกใช้งาน (Shadowing)"
  },
  {
    "id": "k-061",
    "question_id": "q-ids-061",
    "correct_choice_key": "A",
    "explanation": "การตัดสินใจเลือกเส้นทางใช้ Longest Prefix Match เป็นอันดับแรกเสมอ หากความยาว Prefix เท่ากันจึงพิจารณา Administrative Distance และ Priority ต่อไป"
  },
  {
    "id": "k-062",
    "question_id": "q-ids-062",
    "correct_choice_key": "A",
    "explanation": "ค่าเริ่มต้นของ Administrative Distance สำหรับ Static Route ใน FortiOS คือ 10 (Connected Routes = 0, OSPF = 110, RIP = 120, BGP = 200)"
  },
  {
    "id": "k-063",
    "question_id": "q-ids-063",
    "correct_choice_key": "A",
    "explanation": "Floating Static Route คือเส้นทางสำรองที่ตั้งค่า AD ให้สูงกว่า เมื่อเส้นทางหลักใช้งานได้ เส้นทางสำรองจะไม่ปรากฏในตารางเราต์ แต่จะเข้ามาทำงานทันทีเมื่อเส้นทางหลักล่ม"
  },
  {
    "id": "k-064",
    "question_id": "q-ids-064",
    "correct_choice_key": "A",
    "explanation": "ECMP จะติดตั้งหลายเส้นทางลงใน Routing Table พร้อมกันเมื่อ Destination, AD และ Priority เท่ากันทั้งหมด เพื่อทำ Load Balancing ข้ามหลายลิงก์"
  },
  {
    "id": "k-065",
    "question_id": "q-ids-065",
    "correct_choice_key": "A",
    "explanation": "Source-IP Hash นำ IP ต้นทางมาคำนวณ Hash เพื่อเลือก Link ทำให้เครื่องลูกข่ายเครื่องเดิมวิ่งออก Link เดิมเสมอ ป้องกันปัญหา Session หลุดในบางแอปพลิเคชัน"
  },
  {
    "id": "k-066",
    "question_id": "q-ids-066",
    "correct_choice_key": "A",
    "explanation": "Link Health Monitor ส่ง Probe ตรวจสอบ Gateway สม่ำเสมอ หากลิงก์ตาย จะดึง Static Route ออกจาก Routing Table เพื่อให้ทราฟฟิกสลับไปใช้ลิงก์สำรองทันที"
  },
  {
    "id": "k-067",
    "question_id": "q-ids-067",
    "correct_choice_key": "A",
    "explanation": "Policy Routes (PBR) มีลำดับความสำคัญสูงกว่า โดยจะถูกประเมินก่อน Routing Table ปกติ ช่วยให้สามารถเราต์ทราฟฟิกตาม Source IP, Port หรือ Protocol ได้"
  },
  {
    "id": "k-068",
    "question_id": "q-ids-068",
    "correct_choice_key": "A",
    "explanation": "Default Route หรือ Gateway of Last Resort ระบุปลายทางเป็น 0.0.0.0/0 ซึ่งครอบคลุมทุก IP Address ในโลกที่ไม่ตรงกับเส้นทางอื่น"
  },
  {
    "id": "k-069",
    "question_id": "q-ids-069",
    "correct_choice_key": "A",
    "explanation": "เมื่อ AD เท่ากัน FortiOS จะดูค่า Priority โดยค่าตัวเลขน้อยกว่าคือเส้นทางที่มีความสำคัญสูงกว่า (Higher Preference) จึงเลือก Route A เข้า Routing Table"
  },
  {
    "id": "k-070",
    "question_id": "q-ids-070",
    "correct_choice_key": "A",
    "explanation": "Blackhole Route ใช้ทิ้งทราฟฟิกที่ไม่ต้องการลงหลุมดำแบบเงียบๆ ป้องกัน Routing Loops ในสถาปัตยกรรม Route Summarization และ BGP"
  },
  {
    "id": "k-071",
    "question_id": "q-ids-071",
    "correct_choice_key": "A",
    "explanation": "หากทราฟฟิกไม่ตรงกับเงื่อนไขใน Policy Route (Bypass) ระบบจะส่งต่อแพ็กเก็ตไปค้นหาเส้นทางใน Routing Table ปกติต่อไป"
  },
  {
    "id": "k-072",
    "question_id": "q-ids-072",
    "correct_choice_key": "A",
    "explanation": "get router info routing-table all แสดงตารางเราต์จริงที่ Active อยู่บนระบบพร้อมระบุ Routing Source (C, S, O, B)"
  },
  {
    "id": "k-073",
    "question_id": "q-ids-073",
    "correct_choice_key": "A",
    "explanation": "Spillover Algorithm จะส่งข้อมูลผ่านลิงก์แรกจนกระทั่งแบนด์วิดท์ชนเพดาน Threshold จึงจะเริ่มระบายทราฟฟิกส่วนเกินไปยังลิงก์ที่สอง"
  },
  {
    "id": "k-074",
    "question_id": "q-ids-074",
    "correct_choice_key": "A",
    "explanation": "BGP (Border Gateway Protocol) เป็น Exterior Gateway Protocol มาตรฐานสำหรับการแลกเปลี่ยนเส้นทางระหว่าง ISP และต่าง Autonomous Systems"
  },
  {
    "id": "k-075",
    "question_id": "q-ids-075",
    "correct_choice_key": "A",
    "explanation": "SD-WAN พัฒนาต่อยอดจาก ECMP และ Health Check SLA โดยวัดค่า Latency, Jitter และ Packet Loss เพื่อสลับเส้นทางให้แอปพลิเคชันทำงานได้ดีที่สุด"
  },
  {
    "id": "k-076",
    "question_id": "q-ids-076",
    "correct_choice_key": "A",
    "explanation": "ตัวอักษร C ย่อมาจาก Connected Route ซึ่งเป็นซับเน็ตของพอร์ตที่เชื่อมต่ออยู่โดยตรง มีค่า AD = 0"
  },
  {
    "id": "k-077",
    "question_id": "q-ids-077",
    "correct_choice_key": "A",
    "explanation": "หากไม่ระบุ Interface ระบบจะทำ Recursive Routing Lookup หา Next-hop Interface ที่ตรงกับ Gateway IP นั้นโดยอัตโนมัติ"
  },
  {
    "id": "k-078",
    "question_id": "q-ids-078",
    "correct_choice_key": "A",
    "explanation": "Weight-based ECMP ช่วยแบ่งทราฟฟิกตามสัดส่วนของขนาดท่ออินเทอร์เน็ตที่ต่างกันระหว่าง WAN แต่ละเส้น"
  },
  {
    "id": "k-079",
    "question_id": "q-ids-079",
    "correct_choice_key": "A",
    "explanation": "execute ping ส่งแพ็กเก็ต ICMP Echo Request ไปยังปลายทางเพื่อทดสอบการเชื่อมต่อและความเสถียรของเส้นทาง"
  },
  {
    "id": "k-080",
    "question_id": "q-ids-080",
    "correct_choice_key": "A",
    "explanation": "Policy Route (PBR) บังคับเราต์ทราฟฟิกตามเงื่อนไขเฉพาะเจาะจง (เช่น มาจาก IP 10.1.1.100 ให้บังคับออก wan2) ลัดตาราง Routing ปกติได้ทันที"
  },
  {
    "id": "k-081",
    "question_id": "q-ids-081",
    "correct_choice_key": "A",
    "explanation": "Active Auth บังคับให้ผู้ใช้กรอกข้อมูลยืนยันตัวตนผ่านหน้าเว็บ Captive Portal ขณะที่ Passive Auth (เช่น FSSO) ดึงข้อมูลการล็อกอินจาก Active Directory โดยที่ผู้ใช้ไม่รู้สึกตัว"
  },
  {
    "id": "k-082",
    "question_id": "q-ids-082",
    "correct_choice_key": "A",
    "explanation": "LDAP / LDAPS เป็นโปรโตคอลมาตรฐานที่ FortiGate ใช้สืบค้นและยืนยันตัวตนผู้ใช้กับ Active Directory หรือ OpenLDAP Server"
  },
  {
    "id": "k-083",
    "question_id": "q-ids-083",
    "correct_choice_key": "A",
    "explanation": "Captive Portal จะดัก HTTP/HTTPS Request แล้วส่ง HTTP Redirect ไปยังหน้า Authentication Portal (พอร์ต 1000/1003) ให้ผู้ใช้ล็อกอินก่อน"
  },
  {
    "id": "k-084",
    "question_id": "q-ids-084",
    "correct_choice_key": "A",
    "explanation": "Idle Timeout ตรวจจับ Inactivity Time ส่วน Hard Timeout กำหนดอายุขัยสูงสุดของเซสชันเพื่อบังคับ Re-authentication เป็นระยะ"
  },
  {
    "id": "k-085",
    "question_id": "q-ids-085",
    "correct_choice_key": "A",
    "explanation": "Fortinet VSA (Vendor-Specific Attribute) ค่า Fortinet-Group-Name ช่วยให้ RADIUS Server ส่งชื่อกลุ่มผู้ใช้กลับมายัง FortiGate เพื่อจับคู่กับ User Group อัตโนมัติ"
  },
  {
    "id": "k-086",
    "question_id": "q-ids-086",
    "correct_choice_key": "A",
    "explanation": "การเปิดใช้ Firewall Authentication ทำได้โดยการเพิ่ม User หรือ User Group ลงในส่วน Source ของ Firewall Policy"
  },
  {
    "id": "k-087",
    "question_id": "q-ids-087",
    "correct_choice_key": "A",
    "explanation": "SAML 2.0 ใช้สำหรับ Federated Identity และ Single Sign-On กับผู้ให้บริการคลาวด์ IdP (เช่น Azure AD, Okta) สำหรับหน้า Captive Portal และ SSL-VPN"
  },
  {
    "id": "k-088",
    "question_id": "q-ids-088",
    "correct_choice_key": "A",
    "explanation": "Guest Management ช่วยให้สร้าง Guest Account ที่มีอายุการใช้งานจำกัด และรองรับการทำ Self-Registration ผ่าน Captive Portal"
  },
  {
    "id": "k-089",
    "question_id": "q-ids-089",
    "correct_choice_key": "A",
    "explanation": "Local User จัดเก็บบนเครื่อง FortiGate ส่วน Remote User อ้างอิงการตรวจสอบรหัสผ่านไปยัง Directory Server ภายนอก"
  },
  {
    "id": "k-090",
    "question_id": "q-ids-090",
    "correct_choice_key": "A",
    "explanation": "IP-based Auth ผูกตัวตนกับ IP Address ทั้งเครื่อง ส่วน Session-based Auth ผูกตัวตนกับ Session การเชื่อมต่อ ช่วยรองรับ Multi-user Environments (เช่น Citrix/RDP)"
  },
  {
    "id": "k-091",
    "question_id": "q-ids-091",
    "correct_choice_key": "A",
    "explanation": "เมื่อผูก FortiToken เข้ากับ Remote User ผู้ใช้จะกรอกรหัสผ่าน AD ก่อน ตามด้วยรหัสผ่าน OTP จากแอป FortiToken Mobile"
  },
  {
    "id": "k-092",
    "question_id": "q-ids-092",
    "correct_choice_key": "A",
    "explanation": "Disclaimer Page บังคับให้ผู้ใช้อ่านและยอมรับนโยบายความปลอดภัยขององค์กรก่อนที่จะได้รับอนุญาตให้ใช้ระบบ"
  },
  {
    "id": "k-093",
    "question_id": "q-ids-093",
    "correct_choice_key": "A",
    "explanation": "diagnose firewall auth clear ใช้ล้างตารางผู้ใช้ที่ Authenticate ค้างอยู่ทั้งหมด ทำให้ผู้ใช้ต้องทำการล็อกอินใหม่อีกครั้ง"
  },
  {
    "id": "k-094",
    "question_id": "q-ids-094",
    "correct_choice_key": "A",
    "explanation": "FortiOS ใช้พอร์ต TCP 1000 สำหรับ HTTP Captive Portal และพอร์ต TCP 1003 สำหรับ HTTPS Secure Captive Portal"
  },
  {
    "id": "k-095",
    "question_id": "q-ids-095",
    "correct_choice_key": "A",
    "explanation": "sAMAccountName เป็น Attribute มาตรฐานของ Active Directory ที่ใช้ระบุชื่อ Username สำหรับการล็อกอินของผู้ใช้ Windows"
  },
  {
    "id": "k-096",
    "question_id": "q-ids-096",
    "correct_choice_key": "A",
    "explanation": "HTTPS Redirection จะสลับ Certificate เป็นของ FortiGate หากเครื่องลูกข่ายไม่ได้ลงทะเบียน Root CA ของ FortiGate ไว้ เบราว์เซอร์จะเตือนว่าใบรับรองไม่น่าเชื่อถือ"
  },
  {
    "id": "k-097",
    "question_id": "q-ids-097",
    "correct_choice_key": "A",
    "explanation": "Firewall User Group รวบรวมทั้ง Local Users และ Remote Users เข้าเป็นกลุ่มเดียวเพื่อนำไปใส่ใน Policy สะดวกต่อการบริหารจัดการ"
  },
  {
    "id": "k-098",
    "question_id": "q-ids-098",
    "correct_choice_key": "A",
    "explanation": "diagnose firewall auth list แสดงรายชื่อ Active Users ทั้งหมดในตาราง Authentication Table พร้อมเวลา Timeout และ IP Address"
  },
  {
    "id": "k-099",
    "question_id": "q-ids-099",
    "correct_choice_key": "A",
    "explanation": "Match all user groups ทำการ Authenticate บัญชีผู้ใช้ใดๆ ก็ตามที่มีอยู่ใน Directory โดยไม่จำกัดว่าจะต้องสังกัด Security Group ใด"
  },
  {
    "id": "k-100",
    "question_id": "q-ids-100",
    "correct_choice_key": "A",
    "explanation": "Email/SMS OTP มีอายุจำกัดตามมาตรฐานความปลอดภัย (ปกติ 1-5 นาที) เพื่อป้องกันการนำรหัสที่ตกค้างมาใช้งานซ้ำ"
  },
  {
    "id": "k-101",
    "question_id": "q-ids-101",
    "correct_choice_key": "A",
    "explanation": "FSSO ให้บริการ Transparent Passive Authentication โดยดึงข้อมูล Logon Event จาก Active Directory ทำให้ผู้ใช้เข้าใช้อินเทอร์เน็ตได้ทันทีโดยไม่ต้องผ่าน Captive Portal"
  },
  {
    "id": "k-102",
    "question_id": "q-ids-102",
    "correct_choice_key": "A",
    "explanation": "Collector Agent ทำหน้าที่เป็นตัวกลางในการรวบรวม Event 4624 จาก Domain Controller ทุกตัว ประมวลผล IP-to-User Mapping และส่งให้ FortiGate ผ่าน TCP port 8000"
  },
  {
    "id": "k-103",
    "question_id": "q-ids-103",
    "correct_choice_key": "A",
    "explanation": "DC Agent ฝังตัวใน LSASS บน Domain Controller จึงตรวจจับการล็อกอินได้แบบ Real-time 100% ขณะที่ Polling Mode อาจพลาดเหตุการณ์ได้หาก Log หมุนเร็วเกินไป"
  },
  {
    "id": "k-104",
    "question_id": "q-ids-104",
    "correct_choice_key": "A",
    "explanation": "Agentless Mode ให้ FortiGate เชื่อมต่อผ่าน SMB/WMI ไปดึง Security Event Log จาก Domain Controller โดยตรง เหมาะกับองค์กรขนาดเล็กถึงกลาง"
  },
  {
    "id": "k-105",
    "question_id": "q-ids-105",
    "correct_choice_key": "A",
    "explanation": "Workstation Verify ตรวจสอบว่าผู้ใช้ยัง Login อยู่ที่เครื่องนั้นหรือไม่ หากผู้ใช้ Log off ไปแล้ว FSSO จะได้ลบ Record ออกจากตารางเพื่อป้องกันสิทธิ์ตกค้าง"
  },
  {
    "id": "k-106",
    "question_id": "q-ids-106",
    "correct_choice_key": "A",
    "explanation": "FortiGate เชื่อมต่อไปยัง FSSO Collector Agent ผ่านพอร์ต TCP 8000 เพื่อรับรายการผู้ใช้ที่ล็อกอิน"
  },
  {
    "id": "k-107",
    "question_id": "q-ids-107",
    "correct_choice_key": "A",
    "explanation": "หาก FSSO ตรวจไม่พบผู้ใช้ ระบบสามารถตั้งค่า Fallback ไปยัง Active Authentication เช่น NTLM Browser Challenge หรือ Captive Portal ได้"
  },
  {
    "id": "k-108",
    "question_id": "q-ids-108",
    "correct_choice_key": "A",
    "explanation": "Event ID 4624 (An account was successfully logged on) บน Windows Security Log คือเหตุการณ์สำคัญที่สุดที่ FSSO ใช้ตรวจจับการเข้าสู่ระบบ"
  },
  {
    "id": "k-109",
    "question_id": "q-ids-109",
    "correct_choice_key": "A",
    "explanation": "Dead Entry Timeout จะตัด Record ผู้ใช้ออกจาก FSSO Table หากเครื่อง Workstation ปิดเครื่องหรือขาดการติดต่อเป็นเวลานานเกินกำหนด"
  },
  {
    "id": "k-110",
    "question_id": "q-ids-110",
    "correct_choice_key": "A",
    "explanation": "Group Filter ช่วยคัดเลือกเฉพาะ AD Groups ที่ใช้ใน Firewall Policy ส่งไปให้ FortiGate ทำให้ประหยัด RAM และลด Overhead ในการประมวลผล"
  },
  {
    "id": "k-111",
    "question_id": "q-ids-111",
    "correct_choice_key": "A",
    "explanation": "diagnose debug authd fsso list (หรือ diagnose test authserver fsso) แสดงรายชื่อผู้ใช้ FSSO พร้อม Group และ IP Address ปัจจุบัน"
  },
  {
    "id": "k-112",
    "question_id": "q-ids-112",
    "correct_choice_key": "A",
    "explanation": "DC Agent ส่งข้อมูลเหตุการณ์การล็อกอินแบบเรียลไทม์ไปยัง FSSO Collector Agent ผ่านพอร์ต UDP 8002"
  },
  {
    "id": "k-113",
    "question_id": "q-ids-113",
    "correct_choice_key": "A",
    "explanation": "Agentless FSSO ดึง Log ผ่าน Polling โดยตรง จึงไม่มี Workstation Check แบบ NetBIOS และสร้าง Overhead สูงขึ้นในองค์กรขนาดใหญ่ที่มีผู้ใช้หลายพันคน"
  },
  {
    "id": "k-114",
    "question_id": "q-ids-114",
    "correct_choice_key": "A",
    "explanation": "FSSO User Group บน FortiOS จะผูกเข้ากับชื่อ Security Group ของ Active Directory เช่น CN=Domain Users,CN=Users,DC=example,DC=com"
  },
  {
    "id": "k-115",
    "question_id": "q-ids-115",
    "correct_choice_key": "A",
    "explanation": "Logon Event Offset จดจำตำแหน่ง Record ID ล่าสุด เพื่อให้การ Polling รอบถัดไปดึงเฉพาะ Event ใหม่ที่เกิดขึ้นเท่านั้น"
  },
  {
    "id": "k-116",
    "question_id": "q-ids-116",
    "correct_choice_key": "A",
    "explanation": "FSSO รองรับการอัปเดต IP-to-User Mapping เมื่อผู้ใช้ย้ายเครื่อง และสามารถตั้งค่า Multi-logon behavior เพื่อควบคุมการใช้งานพร้อมกันได้"
  },
  {
    "id": "k-117",
    "question_id": "q-ids-117",
    "correct_choice_key": "A",
    "explanation": "FSSO เป็น Clientless Architecture เครื่องลูกข่ายไม่จำเป็นต้องลงโปรแกรมใดๆ เพียงแค่ Join Domain และ Login ตามปกติ"
  },
  {
    "id": "k-118",
    "question_id": "q-ids-118",
    "correct_choice_key": "A",
    "explanation": "diagnose debug authd fsso server-status (หรือ diagnose test authserver fsso) ใช้ทดสอบสถานะการเชื่อมต่อ TCP 8000 ไปยัง Collector Agent"
  },
  {
    "id": "k-119",
    "question_id": "q-ids-119",
    "correct_choice_key": "A",
    "explanation": "FSSO อ้างอิงตัวตนจาก Source IP ของแพ็กเก็ต หากมี NAT/Proxy ขวางกั้นจะทำให้ Source IP ซ้ำกันจนแยกแยะตัวตนรายคนไม่ได้"
  },
  {
    "id": "k-120",
    "question_id": "q-ids-120",
    "correct_choice_key": "A",
    "explanation": "ซอฟต์แวร์ FSSO Collector Agent ดาวน์โหลดได้ฟรีจาก Fortinet Support Portal ภายใต้หมวดหมู่ Firmware Downloads"
  },
  {
    "id": "k-121",
    "question_id": "q-ids-121",
    "correct_choice_key": "A",
    "explanation": "Asymmetric Encryption ใช้คู่กุญแจ Public Key (เปิดเผยได้ สำหรับเข้ารหัส/ตรวจ Signature) และ Private Key (เก็บลับเฉพาะเจ้าของ สำหรับถอดรหัส/เซ็น Signature)"
  },
  {
    "id": "k-122",
    "question_id": "q-ids-122",
    "correct_choice_key": "A",
    "explanation": "Certificate Inspection ดูแค่ SNI (ไม่ถอดรหัส ประหยัด CPU) ขณะที่ Deep SSL Inspection ทำหน้าที่เป็น Man-in-the-Middle ถอดรหัส Payload เพื่อให้ Antivirus/DLP/IPS สแกนข้างในได้"
  },
  {
    "id": "k-123",
    "question_id": "q-ids-123",
    "correct_choice_key": "A",
    "explanation": "เมื่อทำ Deep Inspection ตัว FortiGate จะ Re-sign ใบรับรองเว็บไซต์ด้วย CA ของตัวเอง หากเครื่องลูกข่ายไม่ไว้ใจ CA นี้ เบราว์เซอร์จะเตือนว่าเป็นเว็บอันตราย (MitM Warning)"
  },
  {
    "id": "k-124",
    "question_id": "q-ids-124",
    "correct_choice_key": "A",
    "explanation": "Certificate Authority (CA) คือหน่วยงานที่ได้รับความไว้วางใจในการออกใบรับรองดิจิทัลและลงลายมือชื่อดิจิทัลรับรองความถูกต้องของตัวตน"
  },
  {
    "id": "k-125",
    "question_id": "q-ids-125",
    "correct_choice_key": "A",
    "explanation": "CSR สร้างขึ้นบนอุปกรณ์โดยนำ Public Key และข้อมูล Subject Identity (เช่น CN, O, OU, Country) ไปให้ CA ทำการลงนามเพื่อออก Certificate"
  },
  {
    "id": "k-126",
    "question_id": "q-ids-126",
    "correct_choice_key": "A",
    "explanation": "เว็บสถาบันการเงินและข้อมูลส่วนบุคคลสุขภาพควรได้รับการยกเว้นจากการถอดรหัส (SSL Exemption) เพื่อคุ้มครองความเป็นส่วนตัวและปฏิบัติตามข้อกำหนดทางกฎหมาย (Compliance/PDPA)"
  },
  {
    "id": "k-127",
    "question_id": "q-ids-127",
    "correct_choice_key": "A",
    "explanation": "OCSP ตรวจสอบสถานะใบรับรองแบบ Online Real-time คำต่อคำ ขณะที่ CRL เป็นการดาวน์โหลด Blacklist File ขนาดใหญ่มาตรวจสอบแบบออฟไลน์"
  },
  {
    "id": "k-128",
    "question_id": "q-ids-128",
    "correct_choice_key": "A",
    "explanation": "SAN (Subject Alternative Name) ช่วยให้ใบรับรองฉบับเดียวสามารถคุ้มครองได้หลายโดเมน เช่น example.com, www.example.com และ mail.example.com"
  },
  {
    "id": "k-129",
    "question_id": "q-ids-129",
    "correct_choice_key": "A",
    "explanation": "SNI Extension จะถูกส่งไปในแพ็กเก็ต TLS Client Hello ตั้งแต่ขั้นตอนแรกสุดของการเปิดการเชื่อมต่อแบบ Plaintext ทำให้ Certificate Inspection อ่านชื่อเว็บได้โดยไม่ต้องถอดรหัส"
  },
  {
    "id": "k-130",
    "question_id": "q-ids-130",
    "correct_choice_key": "A",
    "explanation": "Self-Signed Certificate เป็นใบรับรองที่ตัวอุปกรณ์เซ็นรับรองตัวเอง ไม่ได้ผ่าน Trusted Public CA จึงไม่น่าเชื่อถือสำหรับเบราว์เซอร์ภายนอก"
  },
  {
    "id": "k-131",
    "question_id": "q-ids-131",
    "correct_choice_key": "A",
    "explanation": "ทราฟฟิกเว็บปัจจุบันกว่า 90% เป็น HTTPS หากไม่เปิด Deep Inspection ข้อมูลที่วิ่งผ่านจะถูกเข้ารหัส ทำให้ Antivirus Profile มองไม่เห็นไฟล์มัลแวร์ที่แฝงมา"
  },
  {
    "id": "k-132",
    "question_id": "q-ids-132",
    "correct_choice_key": "A",
    "explanation": "PKCS#12 (ไฟล์นามสกุล .pfx หรือ .p12) เป็นรูปแบบมาตรฐานสำหรับบรรจุทั้ง Certificate, Intermediate CAs และ Private Key ไว้ในไฟล์เดียวแบบเข้ารหัสด้วยรหัสผ่าน"
  },
  {
    "id": "k-133",
    "question_id": "q-ids-133",
    "correct_choice_key": "A",
    "explanation": "Block invalid certificates ช่วยปกป้องผู้ใช้จากการเข้าชมเว็บไซต์ที่มีใบรับรองน่าสงสัย หมดอายุ หรือโดเมนไม่ตรงกับ Subject"
  },
  {
    "id": "k-134",
    "question_id": "q-ids-134",
    "correct_choice_key": "A",
    "explanation": "Certificate Chain ต้องมี Intermediate CA เพื่อเชื่อมต่อความไว้วางใจระหว่าง Server Certificate กับ Root CA หากขาดไปจะเกิด Chain Incomplete Error"
  },
  {
    "id": "k-135",
    "question_id": "q-ids-135",
    "correct_choice_key": "A",
    "explanation": "Fortinet_CA_SSL คือ Built-in CA Certificate เริ่มต้นที่ FortiOS สร้างขึ้นมาเพื่อใช้สำหรับทำ Deep SSL Inspection"
  },
  {
    "id": "k-136",
    "question_id": "q-ids-136",
    "correct_choice_key": "A",
    "explanation": "TLS ใช้ Asymmetric Key ในขั้นตอน Handshake เพื่อยืนยันตัวตนและสร้าง Symmetric Session Key จากนั้นเปลี่ยนมาใช้ Symmetric Key ในการเข้ารหัสข้อมูลจริงเพื่อความรวดเร็ว"
  },
  {
    "id": "k-137",
    "question_id": "q-ids-137",
    "correct_choice_key": "A",
    "explanation": "Active Directory Group Policy (GPO) ใช้แจกจ่าย Root CA Certificate เข้าสู่ Trusted Root Certification Authorities ของคอมพิวเตอร์ทุกเครื่องในโดเมนอัตโนมัติ"
  },
  {
    "id": "k-138",
    "question_id": "q-ids-138",
    "correct_choice_key": "A",
    "explanation": "เมนู System > Certificates เป็นศูนย์กลางในการดูรายการใบรับรอง สร้าง CSR นำเข้าใบรับรอง CA และตรวจสอบวันหมดอายุ"
  },
  {
    "id": "k-139",
    "question_id": "q-ids-139",
    "correct_choice_key": "A",
    "explanation": "Certificate Pinning บังคับให้ตรวจสอบ Certificate Hash ตรงกับต้นฉบับ เมื่อ FortiGate ทำ Deep Inspection จะทำให้ Pinning ไม่ตรงและแอปพลิเคชันหยุดทำงาน จึงต้องทำ Exemption"
  },
  {
    "id": "k-140",
    "question_id": "q-ids-140",
    "correct_choice_key": "A",
    "explanation": "Private Key ต้องถูกเก็บรักษาเป็นความลับสูงสุดบนอุปกรณ์เท่านั้น CSR จะมีเพียง Public Key และข้อมูล Identity ส่งไปยัง CA"
  },
  {
    "id": "k-141",
    "question_id": "q-ids-141",
    "correct_choice_key": "A",
    "explanation": "Flow-based สแกนข้อมูลขณะเป็น Packet Stream (ขับเคลื่อนด้วย IPS engine / CP9 processor) เน้นความเร็ว ส่วน Proxy-based ทำการ Reassemble ไฟล์ทั้งไฟล์ใน Buffer ก่อนสแกน รองรับ Quarantine และ Archive Deep Scanning"
  },
  {
    "id": "k-142",
    "question_id": "q-ids-142",
    "correct_choice_key": "A",
    "explanation": "Normal / Standard Database บรรจุ Signatures ของมัลแวร์ที่ตรวจพบว่ามีการระบาดในปัจจุบัน มีขนาดกะทัดรัดและทำงานได้รวดเร็ว"
  },
  {
    "id": "k-143",
    "question_id": "q-ids-143",
    "correct_choice_key": "A",
    "explanation": "Extended Database มี Signature ของมัลแวร์เก่าหรือมัลแวร์หายากเพิ่มเติม ให้การปกป้องที่ครอบคลุมขึ้นบนอุปกรณ์ที่มี Resource เพียงพอ"
  },
  {
    "id": "k-144",
    "question_id": "q-ids-144",
    "correct_choice_key": "A",
    "explanation": "FortiSandbox ทำการ Detonate / Dynamic Behavioral Analysis ไฟล์ที่ไม่รู้จักใน Isolated Virtual Machines เพื่อตรวจจับ Zero-Day Malware และส่ง Signature กลับมายัง FortiGate"
  },
  {
    "id": "k-145",
    "question_id": "q-ids-145",
    "correct_choice_key": "A",
    "explanation": "Heuristic Scanning ตรวจหาพฤติกรรมหรือโค้ดที่น่าสงสัย ช่วยดักจับมัลแวร์กลายพันธุ์ (Polymorphic) แม้จะยังไม่มี Signature ในฐานข้อมูล"
  },
  {
    "id": "k-146",
    "question_id": "q-ids-146",
    "correct_choice_key": "A",
    "explanation": "FortiOS จะตัดการส่งต่อไฟล์อันตรายทันที (Block Action) และแสดง Replacement Message แจ้งผู้ใช้ว่าตรวจพบมัลแวร์และถูกบล็อก"
  },
  {
    "id": "k-147",
    "question_id": "q-ids-147",
    "correct_choice_key": "A",
    "explanation": "FortiGate Antivirus รองรับการตรวจสอบโปรโตคอลหลัก: Web (HTTP/HTTPS), File Transfer (FTP/FTPS/CIFS) และ Mail (SMTP/POP3/IMAP)"
  },
  {
    "id": "k-148",
    "question_id": "q-ids-148",
    "correct_choice_key": "A",
    "explanation": "Archive Decompression Depth สั่งให้แตกไฟล์ Archive ที่ซ้อนกันหลายชั้นเพื่อสแกนไฟล์ข้างใน ป้องกันเทคนิค Evasion ที่นำมัลแวร์ไปซ่อนใน Zip ซ้อน Zip"
  },
  {
    "id": "k-149",
    "question_id": "q-ids-149",
    "correct_choice_key": "A",
    "explanation": "FortiGuard Labs พัฒนาและส่งมอบการอัปเดต Antivirus Signatures และ Threat Intelligence มายัง FortiGate ตลอด 24 ชม."
  },
  {
    "id": "k-150",
    "question_id": "q-ids-150",
    "correct_choice_key": "A",
    "explanation": "File Quarantine จะบันทึกไฟล์มัลแวร์ตัวจริงเก็บไว้ใน Quarantine Storage เพื่อใช้ในการวิเคราะห์ทางนิติวิทยาศาสตร์ไซเบอร์ (Forensics)"
  },
  {
    "id": "k-151",
    "question_id": "q-ids-151",
    "correct_choice_key": "A",
    "explanation": "Extreme/AI Database ใช้ Machine Learning Model วิเคราะห์คุณลักษณะเชิงลึกของไฟล์ เพื่อตรวจจับมัลแวร์ที่ไม่เคยพบมาก่อนได้อย่างแม่นยำ"
  },
  {
    "id": "k-152",
    "question_id": "q-ids-152",
    "correct_choice_key": "A",
    "explanation": "EICAR เป็นไฟล์สตริงทดสอบมาตรฐานสากลที่ไม่เป็นอันตราย ใช้ทดสอบว่า Antivirus Profile บนไฟร์วอลล์ทำงานบล็อกไฟล์ได้สมบูรณ์"
  },
  {
    "id": "k-153",
    "question_id": "q-ids-153",
    "correct_choice_key": "A",
    "explanation": "Outbreak Prevention & External Threat Feeds ช่วยให้ FortiGate รับค่า Threat Intelligence Hash จากภายนอกมาบล็อกการแพร่ระบาดได้ทันที"
  },
  {
    "id": "k-154",
    "question_id": "q-ids-154",
    "correct_choice_key": "A",
    "explanation": "get system autoupdate status (หรือ get system status) แสดงเวอร์ชันของ AV Engine, Extended DB และเวลาที่รับการอัปเดตจาก FortiGuard"
  },
  {
    "id": "k-155",
    "question_id": "q-ids-155",
    "correct_choice_key": "A",
    "explanation": "Flow-based สแกนเป็นสตรีมแพ็กเก็ต จึงไม่เก็บทั้งไฟล์ลงหน่วยความจำ ทำให้ไม่สามารถทำ File Quarantine หรือแตก Zip ซับซ้อนได้"
  },
  {
    "id": "k-156",
    "question_id": "q-ids-156",
    "correct_choice_key": "A",
    "explanation": "การสแกนไวรัสในระบบอีเมลต้องเปิดการตรวจสอบบน Mail Protocols ได้แก่ SMTP (รับส่งเมล), POP3 และ IMAP (ดึงเมลเข้าไคลเอนต์)"
  },
  {
    "id": "k-157",
    "question_id": "q-ids-157",
    "correct_choice_key": "A",
    "explanation": "Mobile Malware Engine มี Signature เฉพาะสำหรับตรวจจับมัลแวร์บนมือถือ เช่น ไฟล์ APK อันตรายที่ส่งผ่านเครือข่าย"
  },
  {
    "id": "k-158",
    "question_id": "q-ids-158",
    "correct_choice_key": "A",
    "explanation": "Oversized File Action กำหนดว่าจะยอมให้ไฟล์ขนาดใหญ่เกิน Buffer ข้ามไป (Pass) หรือบล็อกทิ้ง (Block) เพื่อป้องกัน Buffer Exhaustion"
  },
  {
    "id": "k-159",
    "question_id": "q-ids-159",
    "correct_choice_key": "A",
    "explanation": "การตรวจพบไวรัสจะถูกบันทึกลงใน Security Log ภายใต้ Subtype: Antivirus พร้อมรายละเอียด Virus Name, URL, Source และ Destination"
  },
  {
    "id": "k-160",
    "question_id": "q-ids-160",
    "correct_choice_key": "A",
    "explanation": "diagnose autoupdate status ใช้ตรวจสอบการเชื่อมต่อไปยัง FDN และสถานะการดาวน์โหลดฐานข้อมูล Signature ล่าสุดของ FortiGuard"
  },
  {
    "id": "k-ids-fib-001",
    "question_id": "q-ids-fib-001",
    "correct_blank_answers": {
      "blank_1": "diagnose sniffer packet",
      "blank_2": "port1 หรือ any",
      "blank_3": "filter expression",
      "blank_4": "verbose level"
    },
    "explanation": "โครงสร้างคำสั่ง Packet Sniffer บน FortiOS: diagnose sniffer packet <interface> <filter> <verbose> <count>"
  },
  {
    "id": "k-ids-fib-002",
    "question_id": "q-ids-fib-002",
    "correct_blank_answers": {
      "blank_1": "Event ID 4624",
      "blank_2": "Collector Agent",
      "blank_3": "FortiGate",
      "blank_4": "TCP 8000"
    },
    "explanation": "วงจรการทำงานของ FSSO: DC สร้าง Event 4624 -> Collector Agent รวบรวมข้อมูล -> ส่งผ่าน TCP 8000 ไปยัง FortiGate"
  },
  {
    "id": "k-ids-fib-003",
    "question_id": "q-ids-fib-003",
    "correct_blank_answers": {
      "blank_1": "Certificate Inspection",
      "blank_2": "Deep SSL Inspection",
      "blank_3": "FortiGate Root CA",
      "blank_4": "Certificate Warning"
    },
    "explanation": "Certificate Inspection ตรวจแค่ SNI ส่วน Deep Inspection ถอดรหัสทั้งแพ็กเก็ตและต้องติดตั้ง CA บนลูกข่าย"
  },
  {
    "id": "k-ids-fib-004",
    "question_id": "q-ids-fib-004",
    "correct_blank_answers": {
      "blank_1": "Flow-based Inspection",
      "blank_2": "Proxy-based Inspection",
      "blank_3": "FortiSandbox",
      "blank_4": "Zero-day Attack"
    },
    "explanation": "สถาปัตยกรรม Antivirus: Flow-based (เน้นความเร็ว) vs Proxy-based (เน้นฟังก์ชัน) และ FortiSandbox ตรวจจับ Zero-day"
  },
  {
    "id": "k-ids-mat-001",
    "question_id": "q-ids-mat-001",
    "correct_matching": {
      "p1": "เหตุการณ์ร้ายแรงสูงสุดส่งผลให้ระบบไม่สามารถทำงานต่อได้ (System Unusable)",
      "p2": "ระบบทำงานผิดพลาดขั้นวิกฤตและส่งผลกระทบต่อฟังก์ชันสำคัญ",
      "p3": "การแจ้งเตือนสภาวะที่อาจเกิดปัญหาขึ้นในอนาคตหากไม่ดำเนินการแก้ไข",
      "p4": "บันทึกการทำงานตามปกติของระบบและข้อมูลทราฟฟิกทั่วไป"
    },
    "explanation": "ลำดับความรุนแรงของ Log บน FortiOS: 0-Emergency, 1-Alert, 2-Critical, 3-Error, 4-Warning, 5-Notification, 6-Information, 7-Debug"
  },
  {
    "id": "k-ids-mat-002",
    "question_id": "q-ids-mat-002",
    "correct_matching": {
      "p1": "แปลง Source IP ภายในออกสู่อินเทอร์เน็ตด้วย IP ของพอร์ต WAN (PAT / Overload)",
      "p2": "แปลง Public IP/Port ภายนอกไปยัง Private Server IP/Port ภายใน (Port Forwarding)",
      "p3": "จับคู่ 1 Private IP เข้ากับ 1 Public IP แบบตายตัวถาวร",
      "p4": "จัดสรรบล็อกของพอร์ตล่วงหน้าเพื่อลดปริมาณการบันทึก Log ในเครือข่ายขนาดใหญ่"
    },
    "explanation": "การจับคู่รูปแบบ NAT บน FortiOS: SNAT Interface IP, VIP DNAT, One-to-One และ PBA IP Pool"
  },
  {
    "id": "k-ids-mat-003",
    "question_id": "q-ids-mat-003",
    "correct_matching": {
      "p1": "Administrative Distance = 0",
      "p2": "Administrative Distance = 10",
      "p3": "Administrative Distance = 110",
      "p4": "Administrative Distance = 20"
    },
    "explanation": "ค่า Administrative Distance เริ่มต้นบน FortiOS: Connected = 0, Static = 10, eBGP = 20, OSPF = 110, RIP = 120, iBGP = 200"
  },
  {
    "id": "k-ids-mat-004",
    "question_id": "q-ids-mat-004",
    "correct_matching": {
      "p1": "สืบค้นและยืนยันตัวตนกับฐานข้อมูล Directory ด้วย sAMAccountName",
      "p2": "ใช้ Vendor-Specific Attributes (VSA) ส่งชื่อกลุ่มสิทธิ์กลับมายังไฟร์วอลล์",
      "p3": "ทำ Single Sign-On ร่วมกับคลาวด์ IdP (Azure AD / Okta)",
      "p4": "สร้างรหัสผ่าน OTP แบบใช้ครั้งเดียวบนสมาร์ตโฟนสำหรับ 2FA"
    },
    "explanation": "การจับคู่โปรโตคอลการยืนยันตัวตน (LDAP, RADIUS, SAML 2.0, FortiToken 2FA)"
  }
];

export const idsSources: QuestionSource[] = [
  {
    "id": "src-001",
    "question_id": "q-ids-001",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      8,
      10
    ],
    "evidence_text": "Factory default settings: port1 IP is 192.168.1.99 with HTTPS/HTTP/PING/SSH enabled."
  },
  {
    "id": "src-002",
    "question_id": "q-ids-002",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      6,
      9
    ],
    "evidence_text": "FortiGate operation modes: NAT mode (Layer 3) vs Transparent mode (Layer 2 bridge)."
  },
  {
    "id": "src-003",
    "question_id": "q-ids-003",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      14,
      17
    ],
    "evidence_text": "Administrator profiles: super_admin profile has full access to all VDOMs and global settings."
  },
  {
    "id": "src-004",
    "question_id": "q-ids-004",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      15,
      18
    ],
    "evidence_text": "Trusted Hosts setting restricts administrative access to specific source IP addresses/subnets."
  },
  {
    "id": "src-005",
    "question_id": "q-ids-005",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      18,
      22
    ],
    "evidence_text": "VLAN sub-interface configuration requires binding to physical interface and specifying VLAN ID."
  },
  {
    "id": "src-006",
    "question_id": "q-ids-006",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      20,
      24
    ],
    "evidence_text": "802.3ad Link Aggregation bundles bandwidth; Redundant interfaces operate in active-standby mode."
  },
  {
    "id": "src-007",
    "question_id": "q-ids-007",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      11,
      13
    ],
    "evidence_text": "Administrative Access: Plaintext protocols HTTP and Telnet should be disabled in production."
  },
  {
    "id": "src-008",
    "question_id": "q-ids-008",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      22,
      26
    ],
    "evidence_text": "DHCP Server MAC Address Reservation for static IP assignment to specific endpoints."
  },
  {
    "id": "src-009",
    "question_id": "q-ids-009",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      25,
      27
    ],
    "evidence_text": "Firmware upgrade best practices: follow Fortinet upgrade path and perform full system backup."
  },
  {
    "id": "src-010",
    "question_id": "q-ids-010",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      16,
      18
    ],
    "evidence_text": "Two-Factor Authentication using FortiToken Mobile and FortiToken Hardware tokens."
  },
  {
    "id": "src-011",
    "question_id": "q-ids-011",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      21,
      23
    ],
    "evidence_text": "FortiGuard DNS servers and secure DNS resolution configuration."
  },
  {
    "id": "src-012",
    "question_id": "q-ids-012",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      19,
      21
    ],
    "evidence_text": "Hardware Switch ASIC acceleration vs CPU-bound Software Switch interfaces."
  },
  {
    "id": "src-013",
    "question_id": "q-ids-013",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      24,
      26
    ],
    "evidence_text": "System configuration backup and restore commands in FortiOS CLI."
  },
  {
    "id": "src-014",
    "question_id": "q-ids-014",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      7,
      10
    ],
    "evidence_text": "Virtual Domains (VDOMs) for multi-tenancy logical firewall segmentation."
  },
  {
    "id": "src-015",
    "question_id": "q-ids-015",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      17,
      20
    ],
    "evidence_text": "Network Interface MTU configuration and packet size constraints."
  },
  {
    "id": "src-016",
    "question_id": "q-ids-016",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      12,
      15
    ],
    "evidence_text": "FMG-Access protocol for central management via FortiManager over TCP port 541."
  },
  {
    "id": "src-017",
    "question_id": "q-ids-017",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      18,
      21
    ],
    "evidence_text": "Interface addressing modes: Manual, DHCP, and PPPoE for ISP uplinks."
  },
  {
    "id": "src-018",
    "question_id": "q-ids-018",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      10,
      13
    ],
    "evidence_text": "CLI basic troubleshooting: get system status command."
  },
  {
    "id": "src-019",
    "question_id": "q-ids-019",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      23,
      26
    ],
    "evidence_text": "FortiGate configuration file structure: plaintext CLI commands vs password encrypted."
  },
  {
    "id": "src-020",
    "question_id": "q-ids-020",
    "file_name": "1-System and Network Settings.pdf",
    "page_numbers": [
      15,
      18
    ],
    "evidence_text": "NTP synchronization importance for logging, certificates, and FortiToken OTP time accuracy."
  },
  {
    "id": "src-021",
    "question_id": "q-ids-021",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      8,
      12
    ],
    "evidence_text": "Log severity levels from 0 (Emergency) to 7 (Debug)."
  },
  {
    "id": "src-022",
    "question_id": "q-ids-022",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      6,
      9
    ],
    "evidence_text": "Traffic log types and subtypes: forward traffic, local traffic, and sniffer traffic."
  },
  {
    "id": "src-023",
    "question_id": "q-ids-023",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      14,
      18
    ],
    "evidence_text": "FortiAnalyzer logging protocol: OFTP over SSL using TCP port 514."
  },
  {
    "id": "src-024",
    "question_id": "q-ids-024",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      28,
      33
    ],
    "evidence_text": "Packet Sniffer CLI verbose levels: level 4 shows interface name with packet header."
  },
  {
    "id": "src-025",
    "question_id": "q-ids-025",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      11,
      14
    ],
    "evidence_text": "Local logging options: memory logging is volatile and lost upon reboot."
  },
  {
    "id": "src-026",
    "question_id": "q-ids-026",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      34,
      37
    ],
    "evidence_text": "Automation Stitches architecture: Trigger (event condition) and Action (automated response)."
  },
  {
    "id": "src-027",
    "question_id": "q-ids-027",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      13,
      16
    ],
    "evidence_text": "Disk full logging behavior: overwrite oldest logs vs do not log."
  },
  {
    "id": "src-028",
    "question_id": "q-ids-028",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      16,
      19
    ],
    "evidence_text": "Syslog over TLS/SSL standard port TCP 6514 for secure log transport."
  },
  {
    "id": "src-029",
    "question_id": "q-ids-029",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      22,
      26
    ],
    "evidence_text": "FortiView monitoring dashboard for real-time traffic and threat visibility."
  },
  {
    "id": "src-030",
    "question_id": "q-ids-030",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      26,
      30
    ],
    "evidence_text": "CLI session table diagnostic commands: get system session list."
  },
  {
    "id": "src-031",
    "question_id": "q-ids-031",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      7,
      10
    ],
    "evidence_text": "Security log subtypes: Antivirus, Web Filter, Application Control, IPS."
  },
  {
    "id": "src-032",
    "question_id": "q-ids-032",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      29,
      32
    ],
    "evidence_text": "Packet sniffer filter syntax based on libpcap/tcpdump expressions."
  },
  {
    "id": "src-033",
    "question_id": "q-ids-033",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      19,
      22
    ],
    "evidence_text": "Policy logging options: Log all sessions vs Log security events only."
  },
  {
    "id": "src-034",
    "question_id": "q-ids-034",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      17,
      20
    ],
    "evidence_text": "FortiGate Cloud hosted logging and reporting capabilities."
  },
  {
    "id": "src-035",
    "question_id": "q-ids-035",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      35,
      37
    ],
    "evidence_text": "Automated host quarantine action against compromised endpoints."
  },
  {
    "id": "src-036",
    "question_id": "q-ids-036",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      9,
      12
    ],
    "evidence_text": "System event logs recording administrative changes, reboot, and interface state changes."
  },
  {
    "id": "src-037",
    "question_id": "q-ids-037",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      23,
      27
    ],
    "evidence_text": "Log viewer search and filtering capabilities for incident investigation."
  },
  {
    "id": "src-038",
    "question_id": "q-ids-038",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      20,
      23
    ],
    "evidence_text": "Packet payload logging resource considerations and forensic benefits."
  },
  {
    "id": "src-039",
    "question_id": "q-ids-039",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      25,
      28
    ],
    "evidence_text": "Report generation formats in FortiAnalyzer and FortiOS."
  },
  {
    "id": "src-040",
    "question_id": "q-ids-040",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      14,
      16
    ],
    "evidence_text": "CLI command execute log delete-all for purging local log storage."
  },
  {
    "id": "src-041",
    "question_id": "q-ids-041",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      8,
      12
    ],
    "evidence_text": "Firewall Policy top-down evaluation order and first-match execution."
  },
  {
    "id": "src-042",
    "question_id": "q-ids-042",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      10,
      14
    ],
    "evidence_text": "Implicit Deny policy behavior: drops all unmatched traffic by default."
  },
  {
    "id": "src-043",
    "question_id": "q-ids-043",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      16,
      20
    ],
    "evidence_text": "Source NAT using outgoing interface IP (Port Overload/Masquerade)."
  },
  {
    "id": "src-044",
    "question_id": "q-ids-044",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      24,
      29
    ],
    "evidence_text": "Virtual IP (VIP) configuration for Destination NAT and Port Forwarding."
  },
  {
    "id": "src-045",
    "question_id": "q-ids-045",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      21,
      25
    ],
    "evidence_text": "IP Pool types: One-to-One vs Overload vs Port Block Allocation (PBA)."
  },
  {
    "id": "src-046",
    "question_id": "q-ids-046",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      6,
      10
    ],
    "evidence_text": "Core components required in a FortiGate firewall policy."
  },
  {
    "id": "src-047",
    "question_id": "q-ids-047",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      23,
      27
    ],
    "evidence_text": "Port Block Allocation (PBA) IP Pool for carrier-grade NAT and log reduction."
  },
  {
    "id": "src-048",
    "question_id": "q-ids-048",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      12,
      16
    ],
    "evidence_text": "FQDN Address Objects and dynamic DNS resolution cache."
  },
  {
    "id": "src-049",
    "question_id": "q-ids-049",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      32,
      36
    ],
    "evidence_text": "Central SNAT table vs Policy-based SNAT configuration."
  },
  {
    "id": "src-050",
    "question_id": "q-ids-050",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      14,
      17
    ],
    "evidence_text": "Address Groups for organizing multiple address objects into single policy entity."
  },
  {
    "id": "src-051",
    "question_id": "q-ids-051",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      36,
      40
    ],
    "evidence_text": "Session helpers and ALGs for dynamic multi-channel protocols (SIP, FTP, H.323)."
  },
  {
    "id": "src-052",
    "question_id": "q-ids-052",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      15,
      18
    ],
    "evidence_text": "Recurring Schedule objects for time-based firewall policy enforcement."
  },
  {
    "id": "src-053",
    "question_id": "q-ids-053",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      13,
      16
    ],
    "evidence_text": "Geography-based Address Objects for country-level geo-blocking."
  },
  {
    "id": "src-054",
    "question_id": "q-ids-054",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      9,
      13
    ],
    "evidence_text": "DENY action options: Drop silently vs Send TCP Reset (RST)."
  },
  {
    "id": "src-055",
    "question_id": "q-ids-055",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      26,
      30
    ],
    "evidence_text": "Virtual IP Port Forwarding mapping external port to internal port."
  },
  {
    "id": "src-056",
    "question_id": "q-ids-056",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      17,
      21
    ],
    "evidence_text": "Internet Service Database (ISDB) objects for cloud service policy matching."
  },
  {
    "id": "src-057",
    "question_id": "q-ids-057",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      11,
      15
    ],
    "evidence_text": "Policy Lookup diagnostic tool for verifying policy hits and matches."
  },
  {
    "id": "src-058",
    "question_id": "q-ids-058",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      22,
      26
    ],
    "evidence_text": "Preserve source port option in IP Pool for port-sensitive protocols."
  },
  {
    "id": "src-059",
    "question_id": "q-ids-059",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      8,
      11
    ],
    "evidence_text": "Security profiles attachment requirements: Policy Action must be ACCEPT."
  },
  {
    "id": "src-060",
    "question_id": "q-ids-060",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      10,
      14
    ],
    "evidence_text": "Policy reordering and shadowing impact on firewall enforcement."
  },
  {
    "id": "src-061",
    "question_id": "q-ids-061",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      6,
      10
    ],
    "evidence_text": "Routing table lookup hierarchy: 1. Longest prefix match 2. Lowest AD 3. Lowest Priority."
  },
  {
    "id": "src-062",
    "question_id": "q-ids-062",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      8,
      12
    ],
    "evidence_text": "Default Administrative Distance values in FortiOS (Static Route = 10)."
  },
  {
    "id": "src-063",
    "question_id": "q-ids-063",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      14,
      18
    ],
    "evidence_text": "Floating static route mechanism using higher Administrative Distance."
  },
  {
    "id": "src-064",
    "question_id": "q-ids-064",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      16,
      20
    ],
    "evidence_text": "Equal-Cost Multi-Path (ECMP) prerequisites and concurrent routing installation."
  },
  {
    "id": "src-065",
    "question_id": "q-ids-065",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      18,
      22
    ],
    "evidence_text": "ECMP load balancing algorithms: Source-IP hash session persistence."
  },
  {
    "id": "src-066",
    "question_id": "q-ids-066",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      22,
      26
    ],
    "evidence_text": "Link Health Monitor (Dead Gateway Detection) automated route removal upon failover."
  },
  {
    "id": "src-067",
    "question_id": "q-ids-067",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      26,
      30
    ],
    "evidence_text": "Policy-Based Routing (PBR) precedence over traditional destination-based routing table."
  },
  {
    "id": "src-068",
    "question_id": "q-ids-068",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      7,
      11
    ],
    "evidence_text": "Default static route syntax 0.0.0.0/0 pointing to next-hop ISP gateway."
  },
  {
    "id": "src-069",
    "question_id": "q-ids-069",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      9,
      13
    ],
    "evidence_text": "Path selection: between identical AD routes, lower priority number wins."
  },
  {
    "id": "src-070",
    "question_id": "q-ids-070",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      15,
      18
    ],
    "evidence_text": "Blackhole routes for silent packet discarding and routing loop prevention."
  },
  {
    "id": "src-071",
    "question_id": "q-ids-071",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      27,
      30
    ],
    "evidence_text": "Policy route bypass behavior falling back to standard FIB/routing table lookup."
  },
  {
    "id": "src-072",
    "question_id": "q-ids-072",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      11,
      14
    ],
    "evidence_text": "CLI command get router info routing-table all for inspecting active FIB routes."
  },
  {
    "id": "src-073",
    "question_id": "q-ids-073",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      19,
      23
    ],
    "evidence_text": "ECMP Spillover load balancing method based on bandwidth threshold limits."
  },
  {
    "id": "src-074",
    "question_id": "q-ids-074",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      12,
      16
    ],
    "evidence_text": "Dynamic routing protocols: BGP for inter-AS routing."
  },
  {
    "id": "src-075",
    "question_id": "q-ids-075",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      24,
      28
    ],
    "evidence_text": "SD-WAN architecture built on dynamic link quality probing (Latency, Jitter, Loss)."
  },
  {
    "id": "src-076",
    "question_id": "q-ids-076",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      10,
      13
    ],
    "evidence_text": "Routing table source codes: C = Connected, S = Static, O = OSPF, B = BGP."
  },
  {
    "id": "src-077",
    "question_id": "q-ids-077",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      8,
      12
    ],
    "evidence_text": "Recursive routing lookup behavior when outgoing interface is omitted."
  },
  {
    "id": "src-078",
    "question_id": "q-ids-078",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      18,
      22
    ],
    "evidence_text": "Weight-based ECMP load distribution proportionally matching WAN bandwidth capacities."
  },
  {
    "id": "src-079",
    "question_id": "q-ids-079",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      21,
      24
    ],
    "evidence_text": "Network connectivity testing using execute ping command."
  },
  {
    "id": "src-080",
    "question_id": "q-ids-080",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      28,
      31
    ],
    "evidence_text": "Policy-Based Routing implementation for source-specific dedicated path steering."
  },
  {
    "id": "src-081",
    "question_id": "q-ids-081",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      6,
      10
    ],
    "evidence_text": "Active authentication (Captive Portal prompt) vs Passive authentication (FSSO seamless)."
  },
  {
    "id": "src-082",
    "question_id": "q-ids-082",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      12,
      16
    ],
    "evidence_text": "Remote authentication using LDAP and secure LDAPS (port 636) with Active Directory."
  },
  {
    "id": "src-083",
    "question_id": "q-ids-083",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      18,
      22
    ],
    "evidence_text": "Captive Portal interception and HTTP/HTTPS redirection to authentication portal."
  },
  {
    "id": "src-084",
    "question_id": "q-ids-084",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      22,
      26
    ],
    "evidence_text": "Authentication timeout mechanisms: Inactivity Idle timeout vs Maximum Hard timeout."
  },
  {
    "id": "src-085",
    "question_id": "q-ids-085",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      14,
      18
    ],
    "evidence_text": "RADIUS Vendor-Specific Attributes (VSA) for dynamic Fortinet user group assignment."
  },
  {
    "id": "src-086",
    "question_id": "q-ids-086",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      8,
      12
    ],
    "evidence_text": "Applying user authentication groups to Firewall Policy Source criteria."
  },
  {
    "id": "src-087",
    "question_id": "q-ids-087",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      16,
      20
    ],
    "evidence_text": "SAML 2.0 integration with cloud Identity Providers (Azure AD, Okta) as Service Provider (SP)."
  },
  {
    "id": "src-088",
    "question_id": "q-ids-088",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      26,
      30
    ],
    "evidence_text": "Guest user management, sponsorship, and captive portal self-registration workflows."
  },
  {
    "id": "src-089",
    "question_id": "q-ids-089",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      7,
      11
    ],
    "evidence_text": "Local user accounts vs Remote authentication user accounts."
  },
  {
    "id": "src-090",
    "question_id": "q-ids-090",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      20,
      24
    ],
    "evidence_text": "IP-based authentication vs Session-based authentication in multi-user environments."
  },
  {
    "id": "src-091",
    "question_id": "q-ids-091",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      15,
      19
    ],
    "evidence_text": "Two-Factor Authentication integration with remote LDAP/RADIUS user accounts."
  },
  {
    "id": "src-092",
    "question_id": "q-ids-092",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      21,
      25
    ],
    "evidence_text": "Captive Portal Disclaimer page and Acceptable Use Policy (AUP) enforcement."
  },
  {
    "id": "src-093",
    "question_id": "q-ids-093",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      28,
      31
    ],
    "evidence_text": "CLI diagnostic command diagnose firewall auth clear for purging active auth sessions."
  },
  {
    "id": "src-094",
    "question_id": "q-ids-094",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      19,
      23
    ],
    "evidence_text": "Captive Portal standard listening ports: HTTP 1000 and HTTPS 1003."
  },
  {
    "id": "src-095",
    "question_id": "q-ids-095",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      13,
      17
    ],
    "evidence_text": "LDAP Common Name Identifier sAMAccountName configuration for Active Directory."
  },
  {
    "id": "src-096",
    "question_id": "q-ids-096",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      23,
      27
    ],
    "evidence_text": "HTTPS Captive Portal certificate warning causes and resolution using trusted CA."
  },
  {
    "id": "src-097",
    "question_id": "q-ids-097",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      9,
      13
    ],
    "evidence_text": "Firewall User Groups for grouping local and directory users into policy objects."
  },
  {
    "id": "src-098",
    "question_id": "q-ids-098",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      27,
      30
    ],
    "evidence_text": "CLI troubleshooting: diagnose firewall auth list output analysis."
  },
  {
    "id": "src-099",
    "question_id": "q-ids-099",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      14,
      18
    ],
    "evidence_text": "LDAP group matching options: specific group membership vs match all user groups."
  },
  {
    "id": "src-100",
    "question_id": "q-ids-100",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      17,
      20
    ],
    "evidence_text": "Email and SMS one-time password (OTP) token expiry lifetime settings."
  },
  {
    "id": "src-101",
    "question_id": "q-ids-101",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      6,
      10
    ],
    "evidence_text": "Fortinet Single Sign-On (FSSO) primary purpose: transparent passive user authentication."
  },
  {
    "id": "src-102",
    "question_id": "q-ids-102",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      12,
      16
    ],
    "evidence_text": "FSSO Collector Agent architecture and centralized logon event aggregation."
  },
  {
    "id": "src-103",
    "question_id": "q-ids-103",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      18,
      23
    ],
    "evidence_text": "DC Agent mode (real-time DLL capture) vs Event Log Polling mode (periodic polling)."
  },
  {
    "id": "src-104",
    "question_id": "q-ids-104",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      24,
      28
    ],
    "evidence_text": "Agentless FSSO mode polling Active Directory domain controllers directly via SMB/WinRM."
  },
  {
    "id": "src-105",
    "question_id": "q-ids-105",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      30,
      34
    ],
    "evidence_text": "FSSO Workstation Verification mechanism using NetBIOS/WMI probes."
  },
  {
    "id": "src-106",
    "question_id": "q-ids-106",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      14,
      17
    ],
    "evidence_text": "FSSO communication ports: TCP port 8000 (Collector Agent to FortiGate)."
  },
  {
    "id": "src-107",
    "question_id": "q-ids-107",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      36,
      40
    ],
    "evidence_text": "FSSO fallback mechanisms: NTLM authentication and Captive Portal fallback."
  },
  {
    "id": "src-108",
    "question_id": "q-ids-108",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      19,
      22
    ],
    "evidence_text": "Windows Security Event ID 4624 for successful logon detection in FSSO."
  },
  {
    "id": "src-109",
    "question_id": "q-ids-109",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      32,
      36
    ],
    "evidence_text": "FSSO Dead Entry Timeout for purging stale user session records."
  },
  {
    "id": "src-110",
    "question_id": "q-ids-110",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      22,
      26
    ],
    "evidence_text": "FSSO Group Filtering to optimize FortiGate user table memory and performance."
  },
  {
    "id": "src-111",
    "question_id": "q-ids-111",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      38,
      41
    ],
    "evidence_text": "CLI command diagnose debug authd fsso list for inspecting active FSSO logon sessions."
  },
  {
    "id": "src-112",
    "question_id": "q-ids-112",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      15,
      18
    ],
    "evidence_text": "FSSO communication ports: UDP port 8002 (DC Agent to Collector Agent)."
  },
  {
    "id": "src-113",
    "question_id": "q-ids-113",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      26,
      29
    ],
    "evidence_text": "Agentless FSSO limitations: lack of workstation verification and scaling constraints."
  },
  {
    "id": "src-114",
    "question_id": "q-ids-114",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      20,
      24
    ],
    "evidence_text": "FSSO User Group mapping to Active Directory security group distinguished names."
  },
  {
    "id": "src-115",
    "question_id": "q-ids-115",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      25,
      28
    ],
    "evidence_text": "Logon Event Offset mechanism preventing duplicate event processing."
  },
  {
    "id": "src-116",
    "question_id": "q-ids-116",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      31,
      35
    ],
    "evidence_text": "FSSO handling of multiple logons and user-to-IP mapping updates."
  },
  {
    "id": "src-117",
    "question_id": "q-ids-117",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      8,
      12
    ],
    "evidence_text": "FSSO clientless architecture requiring no endpoint agent installation."
  },
  {
    "id": "src-118",
    "question_id": "q-ids-118",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      37,
      40
    ],
    "evidence_text": "FSSO Collector Agent connectivity troubleshooting and status validation commands."
  },
  {
    "id": "src-119",
    "question_id": "q-ids-119",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      28,
      32
    ],
    "evidence_text": "FSSO limitations in NATed or proxy environments due to IP ambiguity."
  },
  {
    "id": "src-120",
    "question_id": "q-ids-120",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      11,
      14
    ],
    "evidence_text": "FSSO software acquisition via Fortinet Customer Support Portal."
  },
  {
    "id": "src-121",
    "question_id": "q-ids-121",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      6,
      10
    ],
    "evidence_text": "Public Key Infrastructure (PKI) asymmetric key pair roles: Public vs Private Key."
  },
  {
    "id": "src-122",
    "question_id": "q-ids-122",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      18,
      24
    ],
    "evidence_text": "SSL/TLS Inspection modes: Certificate Inspection (SNI only) vs Deep SSL Inspection (Full Decryption)."
  },
  {
    "id": "src-123",
    "question_id": "q-ids-123",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      25,
      30
    ],
    "evidence_text": "Endpoint CA certificate deployment requirement for Deep SSL Inspection to eliminate untrusted warnings."
  },
  {
    "id": "src-124",
    "question_id": "q-ids-124",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      8,
      12
    ],
    "evidence_text": "Certificate Authority (CA) role in issuing and digitally signing certificates."
  },
  {
    "id": "src-125",
    "question_id": "q-ids-125",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      13,
      17
    ],
    "evidence_text": "Certificate Signing Request (CSR) creation and CA submission process."
  },
  {
    "id": "src-126",
    "question_id": "q-ids-126",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      28,
      32
    ],
    "evidence_text": "SSL Inspection exemptions for privacy and regulatory compliance (Banking, Healthcare)."
  },
  {
    "id": "src-127",
    "question_id": "q-ids-127",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      15,
      19
    ],
    "evidence_text": "Certificate revocation checking: Online Certificate Status Protocol (OCSP) vs Certificate Revocation List (CRL)."
  },
  {
    "id": "src-128",
    "question_id": "q-ids-128",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      9,
      13
    ],
    "evidence_text": "Subject Alternative Name (SAN) extension for multi-domain certificate validation."
  },
  {
    "id": "src-129",
    "question_id": "q-ids-129",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      19,
      23
    ],
    "evidence_text": "Server Name Indication (SNI) extension transmitted in TLS Client Hello message."
  },
  {
    "id": "src-130",
    "question_id": "q-ids-130",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      10,
      14
    ],
    "evidence_text": "Self-signed certificate characteristics and default browser distrust behavior."
  },
  {
    "id": "src-131",
    "question_id": "q-ids-131",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      21,
      26
    ],
    "evidence_text": "Antivirus visibility limitations on encrypted HTTPS traffic without Deep SSL Inspection."
  },
  {
    "id": "src-132",
    "question_id": "q-ids-132",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      14,
      18
    ],
    "evidence_text": "PKCS#12 (.pfx/.p12) certificate and private key bundle format."
  },
  {
    "id": "src-133",
    "question_id": "q-ids-133",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      26,
      30
    ],
    "evidence_text": "Server certificate validation and invalid certificate blocking options."
  },
  {
    "id": "src-134",
    "question_id": "q-ids-134",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      11,
      15
    ],
    "evidence_text": "Certificate Chain of Trust: Root CA -> Intermediate CA -> End-Entity Certificate."
  },
  {
    "id": "src-135",
    "question_id": "q-ids-135",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      20,
      24
    ],
    "evidence_text": "Fortinet_CA_SSL built-in default certificate for SSL inspection."
  },
  {
    "id": "src-136",
    "question_id": "q-ids-136",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      7,
      11
    ],
    "evidence_text": "Hybrid encryption architecture in TLS: Asymmetric for handshake, Symmetric for bulk data."
  },
  {
    "id": "src-137",
    "question_id": "q-ids-137",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      27,
      31
    ],
    "evidence_text": "Automated CA certificate deployment across domain endpoints using Active Directory GPO."
  },
  {
    "id": "src-138",
    "question_id": "q-ids-138",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      12,
      16
    ],
    "evidence_text": "FortiOS GUI System > Certificates management interface."
  },
  {
    "id": "src-139",
    "question_id": "q-ids-139",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      31,
      34
    ],
    "evidence_text": "Certificate Pinning and HSTS interactions with Deep SSL Inspection."
  },
  {
    "id": "src-140",
    "question_id": "q-ids-140",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      13,
      16
    ],
    "evidence_text": "Private Key confidentiality during CSR generation and export."
  },
  {
    "id": "src-141",
    "question_id": "q-ids-141",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      8,
      14
    ],
    "evidence_text": "Antivirus inspection modes: Flow-based (streaming/low latency) vs Proxy-based (full buffering)."
  },
  {
    "id": "src-142",
    "question_id": "q-ids-142",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      6,
      9
    ],
    "evidence_text": "FortiGate Antivirus database types: Standard / Normal database."
  },
  {
    "id": "src-143",
    "question_id": "q-ids-143",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      7,
      10
    ],
    "evidence_text": "Extended Antivirus database for legacy and broader malware coverage."
  },
  {
    "id": "src-144",
    "question_id": "q-ids-144",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      20,
      25
    ],
    "evidence_text": "FortiSandbox integration for zero-day dynamic behavioral analysis in isolated VMs."
  },
  {
    "id": "src-145",
    "question_id": "q-ids-145",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      11,
      15
    ],
    "evidence_text": "Heuristic analysis for proactive detection of unknown and polymorphic malware variants."
  },
  {
    "id": "src-146",
    "question_id": "q-ids-146",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      15,
      18
    ],
    "evidence_text": "Antivirus detection actions: Block action and web replacement message display."
  },
  {
    "id": "src-147",
    "question_id": "q-ids-147",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      9,
      13
    ],
    "evidence_text": "Protocols supported by FortiGate Antivirus inspection."
  },
  {
    "id": "src-148",
    "question_id": "q-ids-148",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      16,
      20
    ],
    "evidence_text": "Archive decompression scanning depth for nested archives inspection."
  },
  {
    "id": "src-149",
    "question_id": "q-ids-149",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      5,
      8
    ],
    "evidence_text": "FortiGuard Security Services automated antivirus signature updates."
  },
  {
    "id": "src-150",
    "question_id": "q-ids-150",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      17,
      21
    ],
    "evidence_text": "File Quarantine functionality in Proxy-based Antivirus profile."
  },
  {
    "id": "src-151",
    "question_id": "q-ids-151",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      7,
      11
    ],
    "evidence_text": "AI and Machine Learning malware detection engine in Extreme database."
  },
  {
    "id": "src-152",
    "question_id": "q-ids-152",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      24,
      27
    ],
    "evidence_text": "EICAR standard antivirus test file for validating inspection profiles."
  },
  {
    "id": "src-153",
    "question_id": "q-ids-153",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      13,
      17
    ],
    "evidence_text": "Outbreak Prevention and External Threat Feeds integration."
  },
  {
    "id": "src-154",
    "question_id": "q-ids-154",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      26,
      29
    ],
    "evidence_text": "CLI command get system autoupdate status for verifying AV engine versions."
  },
  {
    "id": "src-155",
    "question_id": "q-ids-155",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      9,
      13
    ],
    "evidence_text": "Flow-based inspection functional trade-offs compared to Proxy-based inspection."
  },
  {
    "id": "src-156",
    "question_id": "q-ids-156",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      10,
      14
    ],
    "evidence_text": "Email malware inspection protocols: SMTP, POP3, IMAP."
  },
  {
    "id": "src-157",
    "question_id": "q-ids-157",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      8,
      12
    ],
    "evidence_text": "Mobile Malware protection for smartphone platforms (Android, iOS)."
  },
  {
    "id": "src-158",
    "question_id": "q-ids-158",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      18,
      22
    ],
    "evidence_text": "Oversized file handling configuration (Pass vs Block) in Antivirus profiles."
  },
  {
    "id": "src-159",
    "question_id": "q-ids-159",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      22,
      26
    ],
    "evidence_text": "Antivirus security log recording virus signature name, file name, and actions taken."
  },
  {
    "id": "src-160",
    "question_id": "q-ids-160",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      27,
      29
    ],
    "evidence_text": "CLI troubleshooting for FortiGuard update daemon and signature distribution network."
  },
  {
    "id": "src-ids-fib-001",
    "question_id": "q-ids-fib-001",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      28,
      33
    ],
    "evidence_text": "Packet sniffer command structure and parameters."
  },
  {
    "id": "src-ids-fib-002",
    "question_id": "q-ids-fib-002",
    "file_name": "6-Fortinet Single Sign-On (FSSO).pdf",
    "page_numbers": [
      12,
      22
    ],
    "evidence_text": "FSSO end-to-end logon processing and communication architecture."
  },
  {
    "id": "src-ids-fib-003",
    "question_id": "q-ids-fib-003",
    "file_name": "7-Certificate Operations.pdf",
    "page_numbers": [
      18,
      28
    ],
    "evidence_text": "SSL/TLS Inspection comparison and CA deployment requirements."
  },
  {
    "id": "src-ids-fib-004",
    "question_id": "q-ids-fib-004",
    "file_name": "8-Antivirus.pdf",
    "page_numbers": [
      8,
      24
    ],
    "evidence_text": "Antivirus scanning modes and FortiSandbox integration."
  },
  {
    "id": "src-ids-mat-001",
    "question_id": "q-ids-mat-001",
    "file_name": "2-Logging and Monitoring.pdf",
    "page_numbers": [
      8,
      13
    ],
    "evidence_text": "Log severity levels and descriptions."
  },
  {
    "id": "src-ids-mat-002",
    "question_id": "q-ids-mat-002",
    "file_name": "3-Firewall Policies and NAT.pdf",
    "page_numbers": [
      16,
      30
    ],
    "evidence_text": "NAT types and operational mechanisms on FortiGate."
  },
  {
    "id": "src-ids-mat-003",
    "question_id": "q-ids-mat-003",
    "file_name": "4-Routing.pdf",
    "page_numbers": [
      8,
      12
    ],
    "evidence_text": "Default Administrative Distance values in FortiOS routing."
  },
  {
    "id": "src-ids-mat-004",
    "question_id": "q-ids-mat-004",
    "file_name": "5-Firewall Authentication.pdf",
    "page_numbers": [
      12,
      20
    ],
    "evidence_text": "Authentication protocols (LDAP, RADIUS, SAML, FortiToken) features."
  }
];
