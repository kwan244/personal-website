import type { StaticImageData } from "next/image";
import guessWhoImage from "./images/guess-whos-the-thief.jpg";
import platefulImage from "./images/plateful.png";
import rockPaperScissorsImage from "./images/rock-paper-scissors.png";
import strokeImage from "./images/stroke-outcome-prediction.png";

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
      "A full-stack web app that lets clinicians upload MRI scans and patient data, run AI stroke outcome predictions and view the results in a 3D brain viewer.",
    context: "Summer internship · Auckland Bioengineering Institute · 2025–26",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "MySQL (AWS RDS)",
      "AWS S3",
      "Niivue",
      "Jest",
      "React Testing Library",
      "Playwright",
    ],
    problem:
      "Clinicians need a straightforward way to submit MRI scans and patient assessment data to an AI model that predicts stroke outcomes, then follow each job through to its results.",
    role: [
      "Built the Next.js and TypeScript app that lets clinicians upload MRI scans (NIfTI, up to 500 MB), enter clinical assessments such as NIHSS and Fugl-Meyer scores, and submit prediction jobs.",
      "Implemented the API routes for creating, listing and tracking jobs, backed by Prisma on AWS RDS MySQL and AWS S3 file storage.",
      "Implemented the pages for new predictions, job history and result viewing, including a 3D brain viewer (Niivue) with an adjustable lesion overlay.",
      "Added client-side PDF reports and segmentation-mask downloads for completed jobs.",
      "Added mock and simulation modes alongside production (in-memory database, simulated processing, local files), so the app can be developed and demoed without the database or AI service.",
    ],
    challenges: [
      "Tracking each job through an eight-stage pipeline, from upload through preprocessing, segmentation and classification to a result or an error.",
      "Rendering MRI volumes and lesion masks in the browser with WebGL across axial, coronal, sagittal and 3D views.",
      "Validating large MRI uploads and every clinical score against its accepted range before a job is submitted.",
    ],
    results: [
      "Sole developer: wrote all 81 commits between December 2025 and March 2026.",
      "Wrote 157 unit tests (Jest + React Testing Library) plus Playwright end-to-end tests.",
    ],
    image: {
      src: strokeImage,
      alt: "StrokePred New Prediction page with a drag-and-drop area for a T1 MRI scan (.nii or .nii.gz, up to 500 MB) and a Clinical Data form with fields for age, comorbidity index, SAFE, NIHSS and Fugl-Meyer scores.",
    },
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
    results: [
      "Merged 6 pull requests into the team repository, covering the mobile-responsive UI, the frontend test setup, back navigation and accessibility fixes.",
      "Reviewed 5 of my teammates' pull requests.",
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
    context: "SOFTENG 206 team project (3 people) · University of Auckland · 2024",
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
    results: ["Contributed 74 commits, about 30% of the team's total."],
    repoUrl: "https://github.com/kwan244/Guess-Who-Game",
    image: {
      src: guessWhoImage,
      alt: "Game scene inside a jewellery store, with doors to the VIP room, manager's office and VIP lounge, a countdown timer, clue and suspect-interrogation counters, and Guess and Backstory buttons.",
    },
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
    results: ["Deployed and playable on GitHub Pages, with no build step or dependencies."],
    liveUrl: "https://kwan244.github.io/RockPaperScissorsWebsite/",
    repoUrl: "https://github.com/kwan244/RockPaperScissorsWebsite",
    image: {
      src: rockPaperScissorsImage,
      alt: "Rock Paper Scissors game with Easy, Medium and Hard difficulty buttons, three round buttons showing rock, paper and scissors hand emojis, a score line and a Reset Score button.",
    },
  },
];
