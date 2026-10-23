import type { StaticImageData } from "next/image";
import platefulImage from "./images/plateful.png";
import rockPaperScissorsImage from "./images/rock-paper-scissors.png";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  context: string;
  stack: string[];
  problem: string;
  role: string[];
  challenges?: string[];
  results?: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: { src: StaticImageData; alt: string };
};

// Ordered by relevance to full-stack grad roles; the home page shows them in this order.
export const projects: Project[] = [
  {
    slug: "stroke-outcome-prediction",
    title: "AI Stroke Outcome Prediction Platform",
    summary:
      "A web app that lets clinicians upload MRI scans and patient data to run AI stroke outcome predictions.",
    context: "Summer internship · Auckland Bioengineering Institute · 2025–26",
    stack: ["Next.js", "TypeScript", "React"],
    problem:
      "Clinicians need a straightforward way to submit MRI scans and patient assessment data to an AI model that predicts stroke outcomes, then follow each job through to its results.",
    role: [
      "Developed the Next.js and TypeScript frontend that lets clinicians upload MRI scans, enter patient assessment data and submit prediction jobs.",
      "Implemented and refined the key pages for new predictions, job tracking and result viewing, improving the usability of the end-to-end workflow.",
      "Contributed to interactive neuroimaging visualisation and structured clinical data input.",
    ],
  },
  {
    slug: "plateful",
    title: "Plateful",
    summary:
      "A full-stack restaurant discovery app with search, filters, favourites and map-based search.",
    context: "SOFTENG 310 team project · University of Auckland · 2025",
    stack: ["React", "Vite", "Spring Boot", "MongoDB", "Vitest", "React Testing Library"],
    problem:
      "Finding a restaurant means juggling cuisine, tags, name and location. Plateful brings search, filters, favourites and a map together in one responsive app.",
    role: [
      "Implemented major mobile-responsive UI improvements across the Home, Search and Restaurant Details pages, including adaptive layouts, grid restructuring and map fixes.",
      "Set up the frontend testing framework (Vitest + React Testing Library) and wrote regression, navigation and UI behaviour tests.",
      "Added dynamic API configuration and backend security updates to support mobile testing over the local network.",
      "Improved UX and accessibility, including cursor interaction fixes, a text-size adjustment feature and component layout refactors.",
      "Reviewed teammates' pull requests and tested features to keep code quality consistent.",
    ],
    challenges: [
      "Making the map and grid layouts behave on small screens without breaking the desktop experience.",
      "Testing on real phones over the local network, which needed the frontend's API address to be configurable and the backend's security settings updated.",
    ],
    repoUrl: "https://github.com/kwan244/se310-plateful",
    image: {
      src: platefulImage,
      alt: "Plateful home page with the headline “Discover, share, and savour with Plateful”, buttons to explore restaurants or view the code, and feature cards for smart discovery, real reviews and community.",
    },
  },
  {
    slug: "guess-whos-the-thief",
    title: "Guess Who's the Thief",
    summary:
      "An AI-driven detective game where players question suspects and solve clues to crack a jewellery theft.",
    context: "Team project (3 people) · University of Auckland · 2024",
    stack: ["Java", "JavaFX", "Maven", "OpenAI API", "JLayer"],
    problem:
      "A mystery game where questioning suspects feels open-ended, with AI-generated responses to whatever the player asks instead of a fixed script.",
    role: [
      "Designed and implemented AI-powered dialogue using OpenAI Chat Completions for dynamic, story-driven suspect questioning.",
      "Built the core game logic and backend systems, including clue progression, scene transitions and the central gameplay flow.",
      "Developed interactive clue-solving mechanics such as the connect-the-lines puzzle.",
      "Implemented custom MP3 and MP4 playback (JLayer + JavaFX Media) for sound effects, music and storytelling sequences.",
    ],
    challenges: ["Keeping a real-time countdown timer synchronised across every game scene."],
    repoUrl: "https://github.com/kwan244/Guess-Who-Game",
  },
  {
    slug: "rock-paper-scissors",
    title: "Rock Paper Scissors",
    summary: "A browser game against a computer opponent that adapts to how you play.",
    context: "Personal project · 2025",
    stack: ["HTML", "CSS", "JavaScript"],
    problem:
      "A classic game against the computer, with three difficulty levels and progress that survives a page refresh, built without a framework.",
    role: [
      "Built the whole game on my own in plain HTML, CSS and JavaScript.",
      "Implemented Easy, Medium and Hard modes; the computer tracks how often you pick each move and adapts.",
      "Saved score, round, difficulty and move history in localStorage, with a reset that clears it.",
    ],
    liveUrl: "https://kwan244.github.io/RockPaperScissorsWebsite/",
    repoUrl: "https://github.com/kwan244/RockPaperScissorsWebsite",
    image: {
      src: rockPaperScissorsImage,
      alt: "Rock Paper Scissors game with Easy, Medium and Hard difficulty buttons, three round buttons showing rock, paper and scissors hand emojis, a score line and a Reset Score button.",
    },
  },
];
