// The hero's night desk, seen from above and behind. Decorative (aria-hidden): the name, project
// notes, scroll cue and badge are real HTML on top of it. Ids are prefixed "desk-" so they can't
// clash with other SVGs. Static pose: thought bubble showing, spark hidden (also the reduced-motion pose).
// Light theme = the same desk by day: only the room colours (background, ambience, steam) change.
const typeScriptIcon =
  "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z";

export function DeskScene({ projectCount, className }: { projectCount: number; className?: string }) {
  return (
    <svg viewBox="0 0 1000 750" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="desk-ambience">
          <stop className="[stop-color:#ffffff] dark:[stop-color:#153f2e]" />
          <stop offset=".55" className="[stop-color:#eaf5ef] dark:[stop-color:#0c1e16]" />
          <stop offset="1" className="[stop-color:#d6e9df] dark:[stop-color:#070c0a]" />
        </radialGradient>
        <radialGradient id="desk-halo"><stop stopColor="#54f5b2" stopOpacity=".55" /><stop offset=".45" stopColor="#3cd69c" stopOpacity=".13" /><stop offset="1" stopColor="#3cd69c" stopOpacity="0" /></radialGradient>
        <linearGradient id="desk-screen" x2=".5" y2="1"><stop stopColor="#0e3023" /><stop offset="1" stopColor="#030c08" /></linearGradient>
        <linearGradient id="desk-edge" x2=".15" y2="1"><stop stopColor="#b1e7d2" /><stop offset=".12" stopColor="#427364" /><stop offset=".5" stopColor="#20382e" /><stop offset="1" stopColor="#41715c" /></linearGradient>
        <linearGradient id="desk-bezel" x2="0" y2="1"><stop stopColor="#101b16" /><stop offset=".3" stopColor="#020705" /><stop offset="1" stopColor="#0a130e" /></linearGradient>
        <linearGradient id="desk-deck" x2=".9" y2="1"><stop stopColor="#527c6b" /><stop offset=".12" stopColor="#2d4a3d" /><stop offset=".55" stopColor="#233c31" /><stop offset=".85" stopColor="#1c3027" /><stop offset="1" stopColor="#3b5e4e" /></linearGradient>
        <linearGradient id="desk-key" x2=".2" y2="1"><stop stopColor="#20372d" /><stop offset=".35" stopColor="#101e17" /><stop offset="1" stopColor="#070f0b" /></linearGradient>
        <pattern id="desk-key-grid" width="23.4" height="18" patternUnits="userSpaceOnUse">
          <rect x="1.4" y="1.5" width="21" height="15" rx="3" fill="url(#desk-key)" stroke="#395d4c" strokeWidth=".65" />
          <path d="M5 3h13" stroke="#78b79b" strokeOpacity=".08" strokeLinecap="round" />
        </pattern>
        <linearGradient id="desk-trackpad" x2="1" y2="1"><stop stopColor="#12271c" /><stop offset="1" stopColor="#243f32" /></linearGradient>
        <linearGradient id="desk-cloth" x2=".9" y2=".7"><stop stopColor="#345f4e" /><stop offset=".18" stopColor="#173a2a" /><stop offset=".48" stopColor="#0c2017" /><stop offset="1" stopColor="#050e09" /></linearGradient>
        <linearGradient id="desk-arm" x2="1" y2=".6"><stop stopColor="#254e3e" /><stop offset=".26" stopColor="#19382a" /><stop offset=".6" stopColor="#0c2017" /><stop offset="1" stopColor="#07100b" /></linearGradient>
        <linearGradient id="desk-cuff" x2=".7" y2="1"><stop stopColor="#315341" /><stop offset=".2" stopColor="#173729" /><stop offset="1" stopColor="#08150e" /></linearGradient>
        <linearGradient id="desk-skin" x2=".3" y2="1"><stop stopColor="#5f8f78" /><stop offset=".45" stopColor="#2f4d40" /><stop offset="1" stopColor="#16251e" /></linearGradient>
        <linearGradient id="desk-hand-skin" gradientUnits="userSpaceOnUse" x1="0" y1="-72" x2="0" y2="6"><stop stopColor="#6a9c84" /><stop offset=".4" stopColor="#3a5c4c" /><stop offset="1" stopColor="#1b2d24" /></linearGradient>
        <radialGradient id="desk-hair" cx=".36" cy=".12" r=".87"><stop stopColor="#254c38" /><stop offset=".35" stopColor="#10271a" /><stop offset=".7" stopColor="#070e09" /><stop offset="1" stopColor="#030705" /></radialGradient>
        <linearGradient id="desk-hair-light" x2=".5" y2="1"><stop stopColor="#a4f5cf" stopOpacity=".8" /><stop offset=".28" stopColor="#498466" stopOpacity=".4" /><stop offset="1" stopColor="#142a1c" stopOpacity="0" /></linearGradient>
        <linearGradient id="desk-ceramic" x2="1" y2=".4"><stop stopColor="#497d66" /><stop offset=".12" stopColor="#234a37" /><stop offset=".4" stopColor="#102b1e" /><stop offset="1" stopColor="#040c08" /></linearGradient>
        <radialGradient id="desk-coffee" cx=".4" cy=".32"><stop stopColor="#987149" /><stop offset=".5" stopColor="#715033" /><stop offset="1" stopColor="#352419" /></radialGradient>
        <linearGradient id="desk-steam" x2="0" y2="1">
          <stop stopOpacity="0" className="[stop-color:#5f8f78] dark:[stop-color:#c9ead8]" />
          <stop offset=".5" stopOpacity=".55" className="[stop-color:#5f8f78] dark:[stop-color:#c9ead8]" />
          <stop offset="1" stopOpacity="0" className="[stop-color:#5f8f78] dark:[stop-color:#c9ead8]" />
        </linearGradient>
        <filter id="desk-blur"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id="desk-steam-blur" x="-100%" y="-30%" width="300%" height="160%"><feGaussianBlur stdDeviation="2.6" /></filter>
        <filter id="desk-shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity=".55" /></filter>
        <g id="desk-relaxed-hand">
          <g transform="translate(343 476) rotate(18) scale(1.4)">
            <path fill="url(#desk-hand-skin)" d="M-22 4C-28 -12 -32 -30 -31 -44C-31 -52 -29 -58 -24 -58C-19 -58 -18 -53 -18 -48C-18 -60 -14 -66 -9 -66C-4 -66 -2 -61 -3 -53C-2 -66 2 -71 7 -71C12 -71 14 -65 12 -55C14 -63 19 -66 24 -64C29 -62 29 -55 26 -46C25 -40 27 -35 31 -35C35 -42 39 -50 43 -49C47 -48 46 -41 43 -34C36 -20 28 -6 20 4Z" />
            <path d="M-27 -42Q0 -52 24 -44" fill="none" stroke="#a7e9c9" strokeOpacity=".16" strokeWidth="3" filter="url(#desk-steam-blur)" />
          </g>
        </g>
        <linearGradient id="desk-chair" x2="0" y2="1"><stop stopColor="#1b3328" /><stop offset=".25" stopColor="#10221a" /><stop offset="1" stopColor="#060d09" /></linearGradient>
        <linearGradient id="desk-chair-pad" x2="0" y2="1"><stop stopColor="#162c22" /><stop offset=".45" stopColor="#0b1a13" /><stop offset="1" stopColor="#040a07" /></linearGradient>
        <linearGradient id="desk-chair-rim" x2="1" y2="0"><stop stopColor="#7fe3b6" stopOpacity=".08" /><stop offset=".5" stopColor="#9df6cf" stopOpacity=".55" /><stop offset="1" stopColor="#7fe3b6" stopOpacity=".08" /></linearGradient>
      </defs>

      <rect width="1000" height="750" className="fill-[#d6e9df] dark:fill-[#070c0a]" />
      <ellipse cx="500" cy="340" rx="510" ry="420" fill="url(#desk-ambience)" />
      <ellipse cx="495" cy="285" rx="320" ry="245" fill="url(#desk-halo)" opacity=".24" />
      {/* The idea glow (replaces the old hero blob); lit in the static pose. */}
      <ellipse id="desk-idea-halo" cx="500" cy="554" rx="240" ry="170" fill="url(#desk-halo)" opacity=".72" />

      <g id="desk-laptop" filter="url(#desk-shadow)" transform="translate(496 420) scale(1.15) translate(-496 -420)">
        <path d="M338 71H654Q665 71 666 84L688 288Q689 301 676 302H318Q305 302 306 289L327 84Q328 72 338 71Z" fill="url(#desk-edge)" />
        <path d="M339 73H653Q664 73 665 85L686 288Q686 299 675 299H319Q308 299 308 288L329 85Q330 74 339 73Z" fill="url(#desk-bezel)" />
        <path d="M341 89H651L672 280H321Z" fill="url(#desk-screen)" />
        <path d="M341 89H476L352 280H321Z" fill="#b0f4d4" opacity=".025" />
        <circle cx="496" cy="81" r="2.3" fill="#274a3a" />
        <g fill="#416c58"><circle cx="353" cy="109" r="4.4" /><circle cx="368" cy="109" r="4.4" /><circle cx="383" cy="109" r="4.4" /></g>
        <g className="font-mono" fontSize="13.5">
          <text x="352" y="143" fill="#d8ebdf">$ npm run build-me</text>
          <path d="m353 160 3 4 7-10" fill="none" stroke="#80f2c4" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <text x="372" y="165" fill="#7ff1c5">compiled {projectCount} projects</text>
        </g>
        {/* The name (h1) and the Download CV prompt line sit here as real HTML, see page.tsx. */}
        <path d="M315 301H678Q687 301 689 312L716 478Q718 489 706 492H287Q274 490 276 479L304 313Q306 303 315 301Z" fill="url(#desk-deck)" stroke="#5e927b" strokeWidth="1" />
        <path d="M347 300H647L649 306H345Z" fill="#040c08" stroke="#1c3929" />
        <path d="M309 312L280 477Q279 486 289 488H705Q713 487 711 478L686 313" fill="none" stroke="#8cd2b0" strokeOpacity=".18" strokeWidth="2" />
        <path d="M337 318H655Q661 318 662 324L676 406Q677 414 669 414H324Q316 414 318 406L330 325Q331 318 337 318Z" fill="#07110b" stroke="#567963" strokeWidth="1.5" />
        <path d="M336 321H657L672 410H322Z" fill="url(#desk-key-grid)" />
        <path d="M415 395H570L572 410H413Z" fill="url(#desk-key)" stroke="#365543" strokeWidth="1" />
        <path d="M447 422H545Q549 422 549 426L552 477Q552 481 548 481H444Q440 481 440 477L443 426Q443 422 447 422Z" fill="url(#desk-trackpad)" stroke="#5a7c65" strokeOpacity=".6" />
        <path d="M448 424H544" stroke="#050d08" strokeOpacity=".7" />
        <path d="M291 493H702" stroke="#030906" strokeWidth="4" strokeLinecap="round" />
        <path d="M455 492H546" stroke="#87e1b7" strokeOpacity=".6" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      <g id="desk-mug" filter="url(#desk-shadow)">
        <ellipse cx="833" cy="424" rx="59" ry="21" fill="#000" opacity=".3" />
        <path d="M868 376C898 366 914 384 909 400C904 414 886 418 866 410" fill="none" stroke="#163d2a" strokeWidth="11" strokeLinecap="round" />
        <path d="M872 372C898 364 911 380 906 395" fill="none" stroke="#5c9e7a" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
        <path d="M783 359C782 391 786 430 816 437C851 446 872 425 877 361Z" fill="url(#desk-ceramic)" />
        <path d="M784 361Q782 406 802 425" fill="none" stroke="#99eac3" strokeOpacity=".18" strokeWidth="1.5" />
        <ellipse cx="830" cy="357" rx="48" ry="41" fill="#143020" stroke="#a7efd0" strokeWidth="1.7" />
        <ellipse cx="830" cy="361" rx="43" ry="35" fill="#352c1e" stroke="#64917a" strokeWidth="1" />
        <ellipse cx="830" cy="364" rx="40" ry="32" fill="url(#desk-coffee)" stroke="#a88659" strokeWidth="1.2" />
        <path d="M794 362C801 333 838 327 859 347" fill="none" stroke="#d5b48b" strokeOpacity=".35" strokeWidth="1.5" />
        <ellipse cx="810" cy="347" rx="8" ry="3.5" transform="rotate(-28 810 347)" fill="#e4cfa8" opacity=".16" />
        <path d="M808 370c4-14 24-18 36-8c8 7 4 18-6 18" fill="none" stroke="#e2c49b" strokeOpacity=".28" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g id="desk-steam-rising" fill="none" stroke="url(#desk-steam)" strokeLinecap="round" filter="url(#desk-steam-blur)" opacity=".35">
        <path className="desk-wisp" d="M822 332C808 312 840 298 831 278S813 249 822 219" strokeWidth="7" />
        <path className="desk-wisp" d="M834 329C847 310 829 296 839 276S841 247 834 231" strokeWidth="3" />
        <path className="desk-wisp" d="M814 332C804 315 825 298 819 281S809 251 814 236" strokeWidth="4.5" />
      </g>

      <g id="desk-person">
        <path d="M196 750C196 705 214 668 252 650C290 632 340 632 380 650L425 662H575L620 650C660 632 710 632 748 650C786 668 804 705 804 750Z" fill="url(#desk-cloth)" />
        <path d="M214 690C222 664 238 652 262 645C300 634 342 636 380 650M786 690C778 664 762 652 738 645C700 634 658 636 620 650" fill="none" stroke="#7fe3b6" strokeOpacity=".2" strokeWidth="6" filter="url(#desk-blur)" />
        <path d="M190 770C176 732 174 690 191 660C204 636 220 605 237 579L299 495L319 465Q335 455 361 479L369 496L337 540L302 623L268 705L252 770Z" fill="url(#desk-arm)" />
        <path d="M810 770C824 732 826 690 809 660C796 636 780 605 763 579L701 495L681 465Q665 455 639 479L631 496L663 540L698 623L732 705L748 770Z" fill="url(#desk-arm)" />
        <g className="desk-hand"><use href="#desk-relaxed-hand" /></g>
        <g className="desk-hand desk-hand-right"><use href="#desk-relaxed-hand" transform="translate(1000 0) scale(-1 1)" /></g>
        <path d="M299 495L319 467Q340 452 367 481L369 493L349 524Q324 495 299 495Z" fill="url(#desk-cuff)" />
        <path d="M701 495L681 467Q660 452 633 481L631 493L651 524Q676 495 701 495Z" fill="url(#desk-cuff)" />
        <path d="M318 467Q338 453 367 481M682 467Q662 453 633 481" fill="none" stroke="#7ec599" strokeOpacity=".3" strokeWidth="1.4" />
        <path d="M427 654Q450 646 456 637H544Q550 646 573 654L565 703H435Z" fill="#0a1a10" />
        <path d="M457 643H543L545 691Q502 715 454 691Z" fill="url(#desk-skin)" />
        <ellipse cx="412" cy="640" rx="10" ry="20" fill="url(#desk-skin)" transform="rotate(-9 412 640)" />
        <ellipse cx="588" cy="640" rx="10" ry="20" fill="url(#desk-skin)" transform="rotate(9 588 640)" />
        <path d="M411 615C397 586 409 549 433 532C444 512 480 500 505 511C539 507 566 528 578 554C601 573 599 615 585 641C576 669 547 701 501 703C455 702 424 666 415 641Z" fill="url(#desk-hair)" />
        <path d="M411 611C403 581 414 554 437 536C453 513 480 505 504 512C538 509 562 527 578 554" fill="none" stroke="#79dfad" strokeOpacity=".17" strokeWidth="5" filter="url(#desk-blur)" />
        <g fill="none" stroke="url(#desk-hair-light)" strokeLinecap="round" strokeWidth="2" opacity=".55">
          <path d="M440 545Q452 528 472 522" /><path d="M466 528Q484 512 506 513" /><path d="M500 516Q526 512 548 528" /><path d="M536 528Q556 536 568 552" />
        </g>
        <path d="M405 684Q425 675 449 695Q500 712 551 695Q575 675 595 684L610 711H389Z" fill="#07150c" />
      </g>

      <g id="desk-chair-back">
        <path d="M200 760L206 690C210 660 238 645 280 641Q500 622 720 641C762 645 790 660 794 690L800 760Z" fill="url(#desk-chair)" />
        <path d="M206 690C210 660 238 645 280 641Q500 622 720 641C762 645 790 660 794 690" fill="none" stroke="#7fe3b6" strokeOpacity=".14" strokeWidth="8" filter="url(#desk-blur)" />
        <path d="M206 690C210 660 238 645 280 641Q500 622 720 641C762 645 790 660 794 690" fill="none" stroke="url(#desk-chair-rim)" strokeWidth="1.8" />
        <path d="M232 760L236 698C239 676 258 664 292 661Q500 645 708 661C742 664 761 676 764 698L768 760Z" fill="url(#desk-chair-pad)" />
        <ellipse cx="500" cy="668" rx="210" ry="16" fill="#7fe3b6" opacity=".05" filter="url(#desk-blur)" />
      </g>

      <path id="desk-spark" d="m591 511 5.5 12 12 5.5-12 5.5-5.5 12-5.5-12-12-5.5 12-5.5Z" fill="#91f6c9" opacity="0" />
      {/* Hidden on narrow screens: the crop would cut the bubble in half. */}
      <g id="desk-thought" className="scene-narrow:hidden">
        <g fill="#08140d" stroke="#a1f3ce" strokeWidth="1.5">
          <circle cx="615" cy="550" r="5" />
          <circle cx="639" cy="536" r="8" />
          <rect x="663" y="500" width="190" height="47" rx="23.5" />
        </g>
        {/* HTML inside the pill so the icon (18px) + name centre together without measuring text. */}
        <foreignObject x="663" y="500" width="190" height="47">
          <div className="flex h-full items-center justify-center gap-[10px] font-sans text-[15px] text-[#e5f6eb]">
            <svg viewBox="0 0 24 24" className="size-[18px] shrink-0 fill-[#a1f3ce]">
              <path d={typeScriptIcon} />
            </svg>
            TypeScript
          </div>
        </foreignObject>
      </g>
    </svg>
  );
}
