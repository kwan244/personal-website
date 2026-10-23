export type Profile = {
  name: string;
  headline: string;
  location: string;
  summary: string[];
  skills: { group: string; items: string[] }[];
  email: string;
  github: string;
  linkedin: string;
};

export const profile: Profile = {
  name: "Kevin Wang",
  headline: "Fourth-year Software Engineering student",
  location: "Auckland, New Zealand",
  summary: [
    "I'm a fourth-year Bachelor of Engineering (Honours) student specialising in Software Engineering at the University of Auckland, with a GPA of 7.25/9.",
    "Over the 2025–26 summer I interned at the Auckland Bioengineering Institute, building a Next.js and TypeScript frontend for an AI stroke outcome prediction platform. Customer-facing work alongside my studies has sharpened my communication and teamwork.",
    "I'm looking for a graduate full-stack software engineering role in New Zealand.",
  ],
  skills: [
    { group: "Languages", items: ["TypeScript", "JavaScript", "Java", "C", "MATLAB"] },
    { group: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "Vite", "HTML & CSS"] },
    { group: "Backend & data", items: ["REST APIs", "Spring Boot", "Prisma ORM", "MongoDB", "Database design"] },
    { group: "Testing", items: ["Jest", "Vitest", "React Testing Library", "Playwright"] },
  ],
  email: "kevinw4ng712@gmail.com",
  github: "https://github.com/kwan244",
  linkedin: "https://www.linkedin.com/in/kevin-wang-2464a4317/",
};
