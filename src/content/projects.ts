import type { StaticImageData } from "next/image";
import aussImage from "./images/auss.jpg";
import guessWhoImage from "./images/guess-whos-the-thief.jpg";
import platefulImage from "./images/plateful.png";
import rockPaperScissorsImage from "./images/rock-paper-scissors.png";
import strokeImage from "./images/stroke-outcome-prediction.png";

// The pen sketch on a project's sticky note (see NoteDoodle).
export type NoteDoodle = "brain" | "dumbbell" | "plate" | "magnifier" | "fist";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  context: string;
  // My part in one line (clear on team projects) and when, for the case study's at-a-glance panel.
  roleLabel: string;
  dates: string;
  // One- or two-word context on the project's sticky note in the home page hero.
  noteLabel: string;
  noteDoodle: NoteDoodle;
  // Featured projects get a large card with a screenshot on the home page.
  featured?: boolean;
  stack: string[];
  problem: string;
  role: string[];
  challenges?: string[];
  results?: string[];
  liveUrl?: string;
  repoUrl?: string;
  // Shown instead of a source link when the code can't be public.
  repoNote?: string;
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
    roleLabel: "Sole developer, as a summer intern",
    dates: "Dec 2025 – Mar 2026",
    noteLabel: "Internship",
    noteDoodle: "brain",
    featured: true,
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
    repoNote: "Private repository (internship work)",
    image: {
      src: strokeImage,
      alt: "StrokePred New Prediction page with a drag-and-drop area for a T1 MRI scan (.nii or .nii.gz, up to 500 MB) and a Clinical Data form with fields for age, comorbidity index, SAFE, NIHSS and Fugl-Meyer scores.",
    },
  },
  {
    slug: "auss-member-platform",
    title: "AUSS Member Platform",
    summary:
      "The live membership, events and check-in platform for the Auckland University Strength Society, built by the club's student dev team.",
    context: "AUSS club dev team · Auckland University Strength Society · 2026",
    roleLabel: "Developer on the club's dev team",
    dates: "Feb 2026 – present",
    noteLabel: "Club platform",
    noteDoodle: "dumbbell",
    featured: true,
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Zod",
      "Stripe",
      "Railway",
    ],
    problem:
      "AUSS needed one place for members to join and pay, for execs to run events and check people in, and for visitors to find out about the club and its sponsors.",
    role: [
      "Took features from solutioning tickets through to release, across visitor pages, admin tools, payments and security.",
      "Migrated the frontend to TypeScript (TSX) and Tailwind CSS v4, with a config refactor.",
      "Built RSVP and event attendee management.",
      "Delivered a security hardening pass: URL validation against SSRF, open redirects and javascript: URIs; centralised Zod input validation; trust-proxy and HTTPS enforcement; student ID privacy; per-route auth assertion tests.",
      "Built the cash and bank-transfer membership flow: proof-of-payment upload, then admin review and approval of membership status.",
      "Let non-UoA members register without a Student ID, and fixed the signup consent flow alongside published Terms of Service and Privacy Policy.",
    ],
    challenges: [
      "Making sure user-supplied links stored by admins can't be used for server-side request forgery, open redirects or script injection.",
      "Mitigating plaintext storage of student IDs and confirming compliance with University data policy.",
      "Agreeing Terms of Service, Privacy Policy content and data retention with the club before publishing them.",
      "Supporting manual cash and bank-transfer payments alongside online payments, with an admin approval step before membership activates.",
    ],
    results: [
      "Owned 38 Jira issues: 17 user stories released or ready for release, 20 solutioning and development tickets done, and a P1 registration bug fixed.",
      "Merged 6 pull requests into the team repository.",
    ],
    liveUrl: "https://auss-backend-production.up.railway.app/",
    repoUrl: "https://github.com/ProjectAuss2026/Myauss",
    image: {
      src: aussImage,
      alt: "AUSS website home page: navigation (Home, About, Sponsorship, Social, Activities, Join AUSS) over a dimmed training photo, with the heading “A Community of Strength Athletes” and Join AUSS and Learn More buttons.",
    },
  },
  {
    slug: "plateful",
    title: "Plateful",
    summary:
      "An open-source, full-stack restaurant discovery app. I forked the public repository and contributed responsive UI, testing and accessibility features through pull requests.",
    context: "SOFTENG 310 open-source contribution · University of Auckland · 2025",
    roleLabel: "Contributor: mobile UI, frontend tests and accessibility",
    dates: "Sep – Oct 2025",
    noteLabel: "Open source",
    noteDoodle: "plate",
    stack: ["React", "Vite", "Spring Boot", "MongoDB", "TomTom Maps", "Vitest", "React Testing Library"],
    problem:
      "Finding a restaurant means juggling cuisine, price, tags, name and location. Plateful brings search, filters, favourites and map-based search together in one responsive app, with a React frontend, a Spring Boot API and a MongoDB database.",
    role: [
      "Worked from my own fork of the public repository, as SOFTENG 310 students extend an existing open-source codebase, and contributed changes back through reviewed pull requests.",
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
    liveUrl: "https://uoa-dcml.github.io/se310-plateful/",
    repoUrl: "https://github.com/UOA-DCML/se310-plateful",
    image: {
      src: platefulImage,
      alt: "Plateful home page with the heading “Looking for something to eat?”, a search bar, filters for cuisine, price, reservation, opening hours and city, and a text-size control in the navigation bar.",
    },
  },
  {
    slug: "guess-whos-the-thief",
    title: "Guess Who's the Thief",
    summary: "An AI-driven detective game where players question suspects and solve clues to crack a jewellery theft.",
    context: "SOFTENG 206 team project (3 people) · University of Auckland · 2024",
    roleLabel: "One of 3: AI dialogue, game logic, puzzles and media",
    dates: "Sep – Dec 2024",
    noteLabel: "Team project",
    noteDoodle: "magnifier",
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
    context: "Self-learning project · 2025",
    roleLabel: "Solo",
    dates: "Jan 2025",
    noteLabel: "Self-taught",
    noteDoodle: "fist",
    stack: ["HTML", "CSS", "JavaScript"],
    problem:
      "I wanted to learn HTML, CSS and JavaScript properly, step by step, by building one complete thing without a framework: a game against the computer with three difficulty levels and progress that survives a page refresh.",
    role: [
      "Built the whole game on my own in plain HTML, CSS and JavaScript.",
      "Implemented Easy, Medium and Hard modes; the computer tracks how often you pick each move and adapts.",
      "Saved score, round, difficulty and move history in localStorage, with a reset that clears it.",
    ],
    challenges: [
      "Learning each layer in turn: structuring the page in HTML, styling it in CSS, then wiring up the game logic and DOM events in JavaScript.",
      "Making the Medium and Hard modes adapt by tracking how often the player picks each move, while keeping the game fair to play.",
      "Keeping the score, round, difficulty and move history in localStorage in step with what's on screen, including after a reset.",
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
