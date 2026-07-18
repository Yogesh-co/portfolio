import nexusImg from '../assets/images/nexus_platform.jpg';
import cipherImg from '../assets/images/cipher_chat.jpg';
import synthImg from '../assets/images/synthwave_studio.jpg';
import terraformImg from '../assets/images/terraform_viz.jpg';

const projects = [
  {
    id: 1,
    slug: 'nexus-platform',
    title: 'Nexus Platform',
    subtitle: 'Enterprise SaaS Dashboard',
    image: nexusImg,
    description: 'A comprehensive enterprise analytics platform featuring real-time data visualization, AI-powered insights, and collaborative workspaces for distributed teams.',
    challenge: 'Enterprise teams needed a unified platform to consolidate data from multiple sources, visualize trends in real-time, and collaborate on data-driven decisions without switching between tools.',
    solution: 'Built a modular SaaS dashboard with WebSocket-powered real-time updates, custom D3.js visualization components, role-based access control, and an AI assistant that surfaces actionable insights from complex datasets.',
    results: 'Reduced decision-making time by 40% for pilot customers. Achieved 99.9% uptime with the microservices architecture. Onboarded 50+ enterprise teams in the first quarter.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'D3.js', 'Docker', 'AWS'],
    github: 'https://github.com',
    live: 'https://example.com',
    year: '2025',
  },
  {
    id: 2,
    slug: 'cipher-chat',
    title: 'Cipher Chat',
    subtitle: 'End-to-End Encrypted Messenger',
    image: cipherImg,
    description: 'A privacy-first messaging application with end-to-end encryption, disappearing messages, and zero-knowledge architecture ensuring complete user privacy.',
    challenge: 'Users increasingly demand private communication tools that don\'t compromise on modern messaging features like group chats, media sharing, and real-time presence indicators.',
    solution: 'Implemented Signal Protocol for E2E encryption, built a custom WebRTC layer for voice/video calls, and designed a zero-knowledge server architecture where even the platform cannot access user messages.',
    results: 'Achieved top security audit scores from independent reviewers. Grew to 10,000+ active users organically. Featured in privacy-focused tech publications.',
    tech: ['React Native', 'TypeScript', 'Go', 'WebRTC', 'Signal Protocol', 'MongoDB'],
    github: 'https://github.com',
    live: 'https://example.com',
    year: '2024',
  },
  {
    id: 3,
    slug: 'synthwave-studio',
    title: 'Synthwave Studio',
    subtitle: 'AI Music Production Suite',
    image: synthImg,
    description: 'An AI-assisted digital audio workstation that helps musicians compose, arrange, and produce music using machine learning models trained on diverse musical genres.',
    challenge: 'Independent musicians often lack access to expensive production tools and professional arrangers, limiting their ability to produce polished, release-ready tracks.',
    solution: 'Created a browser-based DAW with TensorFlow.js-powered chord suggestion, melody generation, and auto-mixing capabilities. Integrated a real-time collaboration feature for remote co-production sessions.',
    results: 'Over 5,000 tracks produced using the platform. Average production time reduced by 60%. Won \'Best Creative Tool\' at an indie developer showcase.',
    tech: ['Next.js', 'Python', 'TensorFlow', 'Web Audio API', 'WebSocket', 'Supabase'],
    github: 'https://github.com',
    live: 'https://example.com',
    year: '2024',
  },
  {
    id: 4,
    slug: 'terraform-viz',
    title: 'Terraform Viz',
    subtitle: 'Infrastructure Visualization Tool',
    image: terraformImg,
    description: 'An interactive visualization tool that transforms Terraform infrastructure-as-code into beautiful, navigable 3D topology maps with real-time cost estimation.',
    challenge: 'DevOps engineers struggle to understand complex cloud infrastructure defined in hundreds of Terraform files. Traditional 2D diagrams fail to convey the scale and relationships between resources.',
    solution: 'Built a 3D force-directed graph renderer using Three.js that parses Terraform HCL files, maps resource dependencies, and overlays real-time cost data from cloud provider APIs.',
    results: 'Adopted by 200+ DevOps teams. Reduced infrastructure review time by 70%. Open-sourced with 2,000+ GitHub stars.',
    tech: ['React', 'Three.js', 'Rust', 'WASM', 'Terraform HCL', 'Cloud APIs'],
    github: 'https://github.com',
    live: 'https://example.com',
    year: '2023',
  },
];

export default projects;
