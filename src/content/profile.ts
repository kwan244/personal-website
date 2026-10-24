export type Profile = {
  name: string;
  legalName: string;
  headline: string;
  location: string;
  // Text around the circular hero badge.
  badge: string;
  summary: string[];
  skills: { group: string; items: string[] }[];
  email: string;
  github: string;
  linkedin: string;
  cv: string;
};

export const profile: Profile = {
  name: "Kevin Wang",
  // Shown so recruiters can match the site to the CV, which uses the legal name.
  legalName: "Wangxun Wang",
  headline: "Fourth-year Software Engineering student",
  location: "Auckland, New Zealand",
  badge: "KEVIN WANG · SOFTWARE ENGINEERING · AUCKLAND · ",
  summary: [
    "I'm a fourth-year Bachelor of Engineering (Honours) student specialising in Software Engineering at the University of Auckland, with a GPA of 7.37/9.",
    "Over the 2025–26 summer I interned at the Auckland Bioengineering Institute, building a full-stack Next.js and TypeScript app for an AI stroke outcome prediction platform. Customer-facing work alongside my studies has sharpened my communication and teamwork.",
    "I'm looking for a graduate full-stack software engineering role in New Zealand.",
  ],
  skills: [
    { group: "Languages", items: ["TypeScript", "JavaScript", "Java", "C", "MATLAB"] },
    { group: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "Vite", "HTML & CSS"] },
    { group: "Backend & data", items: ["REST APIs", "Spring Boot", "Prisma ORM", "MySQL", "MongoDB", "AWS S3", "Database design"] },
    { group: "Testing", items: ["Jest", "Vitest", "React Testing Library", "Playwright"] },
  ],
  email: "kevinw4ng712@gmail.com",
  github: "https://github.com/kwan244",
  linkedin: "https://www.linkedin.com/in/kevin-wang-2464a4317/",
  // Public copy without the phone number.
  cv: "/Kevin-Wang-CV.pdf",
};
