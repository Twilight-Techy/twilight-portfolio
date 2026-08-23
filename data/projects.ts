export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with payment integration and admin dashboard.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "fullstack",
    link: "https://ecommerce-demo.vercel.app",
    github: "https://github.com/johndoe/ecommerce-platform",
  },
  {
    id: 2,
    slug: "ai-image-generator",
    title: "AI Image Generator",
    description: "Web app that generates images based on text prompts using AI models.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1528&auto=format&fit=crop",
    tags: ["Next.js", "OpenAI", "TailwindCSS", "TypeScript"],
    category: "ai",
    link: "https://ai-image-generator-demo.vercel.app",
    github: "https://github.com/johndoe/ai-image-generator",
  },
  {
    id: 3,
    slug: "fitness-tracker",
    title: "Fitness Tracker",
    description: "Mobile app for tracking workouts, nutrition, and fitness progress.",
    image: "https://images.unsplash.com/photo-1510440777527-38815cfc6cc2?q=80&w=1470&auto=format&fit=crop",
    tags: ["React Native", "Firebase", "Redux", "Expo"],
    category: "mobile",
    link: "https://fitness-tracker-demo.vercel.app",
    github: "https://github.com/johndoe/fitness-tracker",
  },
  {
    id: 4,
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    description: "Real-time weather dashboard with forecasts and historical data.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=1470&auto=format&fit=crop",
    tags: ["Vue.js", "WeatherAPI", "Chart.js", "SCSS"],
    category: "frontend",
    link: "https://weather-dashboard-demo.vercel.app",
    github: "https://github.com/johndoe/weather-dashboard",
  },
  {
    id: 5,
    slug: "blockchain-explorer",
    title: "Blockchain Explorer",
    description: "A web application to explore blockchain transactions and data.",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1632&auto=format&fit=crop",
    tags: ["React", "Web3.js", "Node.js", "Express"],
    category: "blockchain",
    link: "https://blockchain-explorer-demo.vercel.app",
    github: "https://github.com/johndoe/blockchain-explorer",
  },
  {
    id: 6,
    slug: "social-media-dashboard",
    title: "Social Media Dashboard",
    description: "A dashboard for managing and analyzing social media accounts.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1674&auto=format&fit=crop",
    tags: ["React", "Redux", "Firebase", "Material UI"],
    category: "frontend",
    link: "https://social-dashboard-demo.vercel.app",
    github: "https://github.com/johndoe/social-media-dashboard",
  },
  {
    id: 7,
    slug: "task-management-app",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=1632&auto=format&fit=crop",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "fullstack",
    link: "https://task-manager-demo.vercel.app",
    github: "https://github.com/johndoe/task-management-app",
  },
  {
    id: 8,
    slug: "recipe-finder",
    title: "Recipe Finder",
    description: "An app to discover recipes based on available ingredients.",
    image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=1467&auto=format&fit=crop",
    tags: ["React Native", "Firebase", "Spoonacular API"],
    category: "mobile",
    link: "https://recipe-finder-demo.vercel.app",
    github: "https://github.com/johndoe/recipe-finder",
  },
  {
    id: 9,
    slug: "portfolio-website",
    title: "Portfolio Website",
    description: "A responsive portfolio website built with modern web technologies.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1455&auto=format&fit=crop",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "frontend",
    link: "https://portfolio-demo.vercel.app",
    github: "https://github.com/johndoe/portfolio-website",
  },
];

export const projectCategories = ["All", "Frontend", "Fullstack", "Mobile", "AI", "Blockchain"];
