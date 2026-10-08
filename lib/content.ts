export const siteConfig = {
  name: "Sanskar Gupta",
  role: "Data Science Student & AI Builder",
  location: "Ghaziabad, Uttar Pradesh, India",
  email: "sanskargupta1314@gmail.com",
  resume:
    "https://drive.google.com/file/d/1kDzGB_21uUpgiVoKk-TimiH8v0K1r9lF/view?usp=drive_link",
  phone: "+91-7985674096",
  github: "https://github.com/Sanskar1314",
  linkedin: "https://www.linkedin.com/in/sanskar-gupta-0a7b3529a/",
  url: "https://sanskar-gupta.vercel.app",
  description:
    "Sanskar Gupta is a data science student building useful AI systems, retrieval experiences, and intelligent data products.",
};

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const skillGroups = [
  {
    label: "Languages",
    skills: ["Python", "SQL", "Java"],
  },
  {
    label: "AI / ML",
    skills: [
      "PyTorch",
      "TensorFlow Keras",
      "Scikit-learn",
      "Deep Learning",
      "Feature Engineering",
    ],
  },
  {
    label: "NLP & LLMs",
    skills: [
      "NLTK",
      "spaCy",
      "TF-IDF",
      "Cosine Similarity",
      "Prompt Engineering",
      "Gemini API",
      "Ollama",
    ],
  },
  {
    label: "Tools & Frameworks",
    skills: [
      "Whisper",
      "BGE-M3",
      "FastAPI",
      "Streamlit",
      "Flask",
      "Git",
      "AWS",
      "n8n",
      "Docker",
    ],
  },
  {
    label: "Data Science",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "BeautifulSoup"],
  },
];

export const education = {
  degree: "B.Tech · Data Science",
  institution: "ABES Engineering College",
  years: "2023 — 2027",
};

export const projects = [
  {
    number: "01",
    title: "MovieMind",
    eyebrow: "AI-Powered Movie Recommendation System",
    date: "April 2026",
    description:
      "A content-based recommendation system that turns a 45,000+ movie metadata dataset into sharply ranked, relevant discoveries.",
    details: [
      "Engineered TF-IDF vectorization and cosine similarity into a RESTful recommendation API.",
      "Built a feature pipeline across genres, overviews, and taglines with sub-second query latency.",
      "Added fuzzy title matching, TMDB poster fetching with caching, and a Netflix-style Streamlit experience.",
    ],
    stack: ["Python", "NLP", "FastAPI", "Streamlit", "Scikit-learn"],
    github: "https://github.com/Sanskar1314/Movie_Recommendation_End_to_End",
    accent: "mint",
  },
  {
    number: "02",
    title: "SigmaLearn AI",
    eyebrow: "RAG-Based AI Teaching Assistant",
    date: "August 2025",
    description:
      "A teaching assistant that transforms course-video audio into a searchable knowledge base for grounded student answers.",
    details: [
      "Transcribed course videos with Whisper and built a searchable collection of subtitle chunks.",
      "Grounded Gemini-generated answers in retrieved course material with exact video timestamps.",
      "Shipped a Next.js and React chat interface with source cards, deployed on Vercel.",
    ],
    stack: ["Python", "Next.js", "React", "Gemini API", "Whisper", "RAG"],
    github: "https://github.com/Sanskar1314/RAG_Based_Teaching_Assistant",
    live: "https://sigmalearn-ai.vercel.app",
    accent: "cyan",
  },
];

export const experience = [
  {
    date: "June — July 2026",
    company: "Wheeltrix",
    role: "Data Analyst Intern",
    type: "Project-based internship · 1 month",
    points: [
      "Cleaned and preprocessed raw datasets to improve accuracy, consistency, and analysis readiness.",
      "Analyzed data to surface actionable insights and support data-driven decisions for the project team.",
    ],
  },
];

export const achievements = [
  {
    metric: "99%",
    title: "Brain Tumor Detection research",
    copy: "Published MRI tumor-classification research using Xception across Glioma, Meningioma, Pituitary, and No Tumor categories.",
  },
  {
    metric: "Top 50",
    title: "Smart India Hackathon 2025",
    copy: "Ranked among the top 50 teams out of 348 during the college-level selection round.",
  },
  {
    metric: "250+",
    title: "DSA problems solved",
    copy: "Solved across LeetCode, CodeChef, and GeeksforGeeks.",
  },
];

export const certifications = [
  {
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    issuer: "Amazon Web Services",
    date: "Aug 2025",
    link: "https://drive.google.com/file/d/1E35PKVpXpCqVBpWM3JIJyJfPAVj8h3cz/view?usp=drive_link",
  },
  {
    title: "Data Science Job Ready Course",
    issuer: "Code With Harry",
    date: "Oct 2025",
    link: "https://drive.google.com/file/d/14Higs2_75FCcH3eIxsk0wvSIh25YnI0b/view?usp=drive_link",
  },
  {
    title: "Complete Data Science, Machine Learning, DL, NLP Bootcamp",
    issuer: "Krish Naik — Udemy",
    date: "Mar 2026",
  },
];
