// The hero's night desk: the laptop at a 3/4 view with a coffee and project sticky notes. Decorative
// (aria-hidden): the name, Download CV link and notes are real HTML on top of it (see page.tsx). Ids are
// prefixed "desk-" so they can't clash with other SVGs. Light theme = the same desk by day: only the
// room colours (background, ambience, steam) change; the laptop screen stays dark.
// Geometry is generated from a 3D model (32 × 22 base, 21-high lid opened to 110°) projected through a
// camera 18° right of front and 40° up; the overlay anchors in page.tsx come from the same model.
export function DeskScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 750" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="desk-ambience">
          <stop className="[stop-color:#ffffff] dark:[stop-color:#153f2e]" />
          <stop offset=".55" className="[stop-color:#eaf5ef] dark:[stop-color:#0c1e16]" />
          <stop offset="1" className="[stop-color:#d6e9df] dark:[stop-color:#070c0a]" />
        </radialGradient>
        <radialGradient id="desk-pool">
          <stop stopColor="#6ee7b7" stopOpacity=".26" />
          <stop offset=".6" stopColor="#6ee7b7" stopOpacity=".08" />
          <stop offset="1" stopColor="#6ee7b7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="desk-screen" x2=".5" y2="1">
          <stop stopColor="#0e3023" />
          <stop offset="1" stopColor="#030c08" />
        </linearGradient>
        <linearGradient id="desk-edge" x2=".2" y2="1">
          <stop stopColor="#b1e7d2" />
          <stop offset=".14" stopColor="#427364" />
          <stop offset=".55" stopColor="#20382e" />
          <stop offset="1" stopColor="#41715c" />
        </linearGradient>
        <linearGradient id="desk-bezel" x2="0" y2="1">
          <stop stopColor="#101b16" />
          <stop offset=".3" stopColor="#020705" />
          <stop offset="1" stopColor="#0a130e" />
        </linearGradient>
        <linearGradient id="desk-deck" x2=".9" y2="1">
          <stop stopColor="#527c6b" />
          <stop offset=".2" stopColor="#2d4a3d" />
          <stop offset=".6" stopColor="#233c31" />
          <stop offset="1" stopColor="#1a2d24" />
        </linearGradient>
        <linearGradient id="desk-trackpad" x2="1" y2="1">
          <stop stopColor="#12271c" />
          <stop offset="1" stopColor="#243f32" />
        </linearGradient>
        <linearGradient id="desk-ceramic" x2="1" y2=".3">
          <stop stopColor="#497d66" />
          <stop offset=".15" stopColor="#234a37" />
          <stop offset=".5" stopColor="#102b1e" />
          <stop offset="1" stopColor="#040c08" />
        </linearGradient>
        <radialGradient id="desk-coffee" cx=".4" cy=".35">
          <stop stopColor="#987149" />
          <stop offset=".55" stopColor="#715033" />
          <stop offset="1" stopColor="#352419" />
        </radialGradient>
        <linearGradient id="desk-steam" x2="0" y2="1">
          <stop stopOpacity="0" className="[stop-color:#5f8f78] dark:[stop-color:#c9ead8]" />
          <stop offset=".5" stopOpacity=".55" className="[stop-color:#5f8f78] dark:[stop-color:#c9ead8]" />
          <stop offset="1" stopOpacity="0" className="[stop-color:#5f8f78] dark:[stop-color:#c9ead8]" />
        </linearGradient>
        <filter id="desk-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="desk-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="desk-steam-blur" x="-100%" y="-30%" width="300%" height="160%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>

      <rect width="1000" height="750" className="fill-[#d6e9df] dark:fill-[#070c0a]" />
      <ellipse cx="500" cy="360" rx="500" ry="420" fill="url(#desk-ambience)" />

      <path
        d="M753.5 489.8 L759.7 468.8 L762.5 447.6 L761.9 426.6 L758 405.9 L750.9 385.8 L740.8 366.4 L727.9 348 L712.4 330.7 L694.4 314.7 L674.2 300 L652 286.8 L628.1 275.2 L602.7 265.2 L576 257 L548.3 250.5 L519.8 245.8 L490.7 243.1 L461.4 242.1 L432.1 243.1 L403 245.8 L374.3 250.5 L346.4 257 L319.5 265.2 L293.7 275.2 L269.4 286.8 L246.8 300 L226.2 314.7 L207.7 330.7 L191.6 348 L178.1 366.4 L167.4 385.8 L159.8 405.9 L155.2 426.6 L153.9 447.6 L156 468.8 L161.6 489.8 L170.6 510.5 L183 530.6 L198.8 549.8 L217.8 567.8 L239.9 584.5 L264.9 599.5 L292.4 612.6 L322.1 623.6 L353.6 632.4 L386.6 638.8 L420.6 642.6 L455.1 643.9 L489.6 642.6 L523.7 638.8 L556.9 632.4 L588.8 623.6 L618.8 612.6 L646.7 599.5 L672.2 584.5 L694.8 567.8 L714.4 549.8 L730.8 530.6 L743.9 510.5Z"
        fill="url(#desk-pool)"
      />
      <path
        d="M238.5 478.7 L637.8 567.6 L715.1 381.6 L341.3 304.9Z"
        fill="#000"
        opacity=".5"
        filter="url(#desk-soft)"
      />
      {/* Note shadows; the notes themselves are HTML, shown only when the whole desk fits. */}
      <path
        d="M59.8 222.2 L292.7 214.9 L292.2 297 L50.5 304.9Z M52.6 329.8 L248.6 338.5 L231.1 418.3 L28.6 409Z M40.2 459.9 L224.6 451.4 L224 534.9 L33.3 544Z M212.1 559.5 L390.2 566 L379.8 653 L195.7 646Z M621.4 597.3 L800.7 586.2 L821.9 674.4 L636.6 686.2Z"
        fill="#000"
        opacity=".35"
        filter="url(#desk-soft)"
        className="scene-narrow:hidden"
      />

      <g id="desk-laptop">
        <path d="M623.3 550.4 L695.7 378.4 L696.4 366.5 L623.8 538.3Z" fill="#0f1f18" />
        <path d="M243.9 466.1 L623.3 550.4 L623.8 538.3 L243 454.1Z" fill="#17291f" />
        <path
          d="M338.2 293.1 L696.4 366.5 L623.8 538.3 L243 454.1Z"
          fill="url(#desk-deck)"
          stroke="#5e927b"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M392.3 487.1 L468.4 504" stroke="#87e1b7" strokeOpacity=".5" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M354.7 305 L670.8 370 L634.8 453.1 L309 383.6Z"
          fill="#07110b"
          stroke="#567963"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M360 308.6 L378.5 312.4 L371.5 324.7 L352.9 320.9Z M381.3 313 L399.8 316.8 L392.9 329.2 L374.3 325.3Z M402.7 317.4 L421.3 321.2 L414.5 333.7 L395.8 329.8Z M445.7 326.3 L464.4 330.1 L457.8 342.6 L439 338.7Z M467.3 330.7 L486.1 334.6 L479.6 347.1 L460.7 343.2Z M489 335.2 L507.9 339.1 L501.5 351.7 L482.5 347.7Z M510.8 339.7 L529.8 343.6 L523.5 356.2 L504.4 352.3Z M532.7 344.2 L551.7 348.1 L545.5 360.8 L526.4 356.8Z M554.6 348.7 L573.7 352.6 L567.7 365.4 L548.4 361.4Z M598.8 357.8 L618.1 361.8 L612.2 374.6 L592.8 370.6Z M621 362.4 L640.3 366.3 L634.6 379.2 L615.1 375.2Z M643.3 367 L662.7 371 L657.1 383.9 L637.6 379.8Z M351.5 323.4 L370.1 327.2 L363 339.7 L344.3 335.8Z M372.9 327.8 L391.6 331.7 L384.6 344.2 L365.8 340.3Z M416 336.7 L434.8 340.6 L428 353.2 L409.1 349.3Z M437.6 341.2 L456.5 345.1 L449.8 357.8 L430.9 353.8Z M459.4 345.7 L478.3 349.7 L471.7 362.4 L452.7 358.4Z M503.1 354.8 L522.2 358.8 L515.8 371.6 L496.7 367.6Z M525.1 359.4 L544.3 363.3 L538 376.2 L518.8 372.2Z M547.2 363.9 L566.4 367.9 L560.3 380.8 L541 376.8Z M569.4 368.5 L588.7 372.6 L582.6 385.5 L563.2 381.5Z M591.6 373.2 L611 377.2 L605.1 390.2 L585.6 386.1Z M614 377.8 L633.4 381.8 L627.6 394.9 L608 390.8Z M636.4 382.4 L655.9 386.5 L650.2 399.6 L630.6 395.5Z M342.8 338.3 L361.5 342.2 L354.4 354.8 L335.6 350.9Z M364.4 342.8 L383.2 346.7 L376.1 359.4 L357.2 355.4Z M386 347.3 L404.8 351.2 L397.9 364 L378.9 360Z M407.7 351.8 L426.6 355.8 L419.7 368.6 L400.7 364.6Z M429.5 356.4 L448.5 360.3 L441.7 373.2 L422.6 369.2Z M451.4 361 L470.4 364.9 L463.8 377.8 L444.6 373.8Z M473.3 365.5 L492.5 369.5 L485.9 382.5 L466.7 378.4Z M495.4 370.1 L514.6 374.1 L508.1 387.1 L488.8 383.1Z M517.5 374.8 L536.8 378.8 L530.4 391.8 L511.1 387.7Z M562 384.1 L581.4 388.1 L575.3 401.2 L555.8 397.1Z M584.4 388.7 L603.9 392.8 L597.9 406 L578.3 401.9Z M629.4 398.1 L649.1 402.2 L643.3 415.5 L623.5 411.4Z M334.1 353.4 L352.9 357.4 L345.6 370.1 L326.7 366.2Z M355.8 358 L374.6 361.9 L367.5 374.8 L348.5 370.8Z M377.5 362.5 L396.5 366.5 L389.4 379.4 L370.4 375.4Z M399.3 367.1 L418.4 371.1 L411.4 384.1 L392.3 380Z M421.3 371.7 L440.3 375.8 L433.5 388.7 L414.3 384.7Z M465.3 381 L484.6 385.1 L477.9 398.1 L458.6 394.1Z M487.5 385.7 L506.8 389.7 L500.3 402.9 L480.9 398.8Z M509.8 390.4 L529.1 394.4 L522.7 407.6 L503.2 403.5Z M532.1 395.1 L551.6 399.1 L545.3 412.4 L525.7 408.3Z M554.5 399.8 L574.1 403.9 L567.9 417.2 L548.2 413Z M577 404.5 L596.7 408.6 L590.6 422 L570.9 417.8Z M599.7 409.3 L619.4 413.4 L613.4 426.8 L593.6 422.6Z M622.3 414 L642.1 418.2 L636.3 431.7 L616.4 427.4Z M323.8 368.4 L354.3 374.9 L347 387.9 L316.4 381.3Z M357.9 375.6 L388.6 382.1 L381.5 395.2 L350.6 388.6Z M392.3 382.9 L565.2 419.5 L558.9 433 L385.1 396Z M568.9 420.3 L600.8 427.1 L594.7 440.6 L562.6 433.8Z M604.5 427.9 L636.6 434.7 L630.7 448.3 L598.4 441.5Z"
          fill="#0f1d16"
          stroke="#395d4c"
          strokeWidth=".7"
          strokeLinejoin="round"
        />
        <path
          d="M424.1 321.8 L442.8 325.7 L436.1 338.1 L417.3 334.2Z M576.7 353.2 L595.9 357.2 L589.9 370 L570.6 366Z M394.4 332.3 L413.1 336.1 L406.2 348.7 L387.4 344.8Z M481.2 350.3 L500.2 354.2 L493.8 367 L474.6 363Z M539.7 379.4 L559.1 383.4 L552.8 396.5 L533.4 392.4Z M606.9 393.4 L626.4 397.5 L620.5 410.7 L600.9 406.6Z M443.2 376.4 L462.4 380.4 L455.7 393.4 L436.4 389.4Z"
          fill="#6ee7b7"
          filter="url(#desk-glow)"
        />
        <path
          d="M424.1 321.8 L442.8 325.7 L436.1 338.1 L417.3 334.2Z M576.7 353.2 L595.9 357.2 L589.9 370 L570.6 366Z M394.4 332.3 L413.1 336.1 L406.2 348.7 L387.4 344.8Z M481.2 350.3 L500.2 354.2 L493.8 367 L474.6 363Z M539.7 379.4 L559.1 383.4 L552.8 396.5 L533.4 392.4Z M606.9 393.4 L626.4 397.5 L620.5 410.7 L600.9 406.6Z M443.2 376.4 L462.4 380.4 L455.7 393.4 L436.4 389.4Z"
          fill="#b9f8dc"
        />
        <path
          d="M404.4 416.9 L523.4 442.5 L496.6 498.3 L375.2 471.6Z"
          fill="url(#desk-trackpad)"
          stroke="#5a7c65"
          strokeOpacity=".6"
          strokeLinejoin="round"
        />
        <path d="M359.7 58 L730.2 126 L731.8 124.3 L362.1 56.5Z" fill="#2d4a3d" />
        <path d="M696.4 366.5 L730.2 126 L731.8 124.3 L698 364.3Z" fill="#1c3128" />
        <path
          d="M359.7 58 L730.2 126 L696.4 366.5 L338.2 293.1Z"
          fill="url(#desk-edge)"
          stroke="url(#desk-edge)"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path d="M363.7 62.4 L725.1 128.9 L692.3 362.8 L342.6 291.2Z" fill="url(#desk-bezel)" />
        <path d="M372.5 77.6 L712.5 140.5 L683.9 347.2 L353.6 280Z" fill="url(#desk-screen)" />
        <path d="M372.5 77.6 L503.1 101.8 L381.6 285.7 L353.6 280Z" fill="#b0f4d4" opacity=".03" />
        <circle cx="540.8" cy="101.3" r="2.2" fill="#274a3a" />
        <g fill="#416c58">
          <circle cx="385.5" cy="94.7" r="4.5" />
          <circle cx="398.1" cy="97.1" r="4.5" />
          <circle cx="410.7" cy="99.4" r="4.5" />
        </g>
        {/* The name (h1), headline and Download CV prompt sit on the screen as real HTML, see page.tsx. */}
      </g>

      <g id="desk-mug">
        <path
          d="M888.6 497.1 L889.6 492.3 L889.7 487.4 L888.8 482.5 L887 477.6 L884.3 472.9 L880.7 468.5 L876.4 464.3 L871.3 460.5 L865.6 457.1 L859.4 454.2 L852.8 451.9 L845.8 450.1 L838.7 448.9 L831.4 448.4 L824.2 448.4 L817.2 449.1 L810.4 450.4 L804 452.3 L798.1 454.8 L792.8 457.8 L788.2 461.2 L784.3 465.1 L781.2 469.3 L779.1 473.9 L777.8 478.6 L777.5 483.5 L778.1 488.4 L779.7 493.3 L782.3 498.1 L785.7 502.7 L790 507 L795 510.9 L800.7 514.4 L807 517.4 L813.8 519.9 L820.9 521.8 L828.3 523 L835.7 523.6 L843.2 523.6 L850.4 522.8 L857.4 521.5 L863.9 519.5 L869.9 516.9 L875.2 513.8 L879.8 510.2 L883.6 506.1 L886.6 501.8Z"
          fill="#000"
          opacity=".45"
          filter="url(#desk-soft)"
        />
        <path
          d="M850 453.2 L855.6 452.5 L861 451.2 L866.1 449.1 L870.7 446.5 L874.7 443.4 L877.9 439.9 L880.3 436.1 L881.7 432.1 L882.2 428 L881.7 423.9 L880.2 420.1 L877.8 416.5 L874.5 413.4 L870.4 410.7 L865.7 408.6 L860.5 407.2 L855 406.5"
          fill="none"
          stroke="#163d2a"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M850 453.2 L855.6 452.5 L861 451.2 L866.1 449.1 L870.7 446.5 L874.7 443.4 L877.9 439.9 L880.3 436.1 L881.7 432.1"
          fill="none"
          stroke="#5c9e7a"
          strokeOpacity=".5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M766.7 465.7 L766.9 462.2 L772.8 391 L773.7 387.6 L775.3 384.3 L777.6 381.3 L780.5 378.5 L784 376 L788 373.8 L792.4 372.1 L797.2 370.7 L802.2 369.7 L807.5 369.3 L812.9 369.2 L818.3 369.6 L823.6 370.5 L828.8 371.7 L833.7 373.4 L838.3 375.5 L842.5 377.9 L846.3 380.7 L849.5 383.7 L852.1 386.9 L854.1 390.3 L855.4 393.8 L856 397.3 L855.8 400.8 L848.2 472.1 L847.4 475.6 L845.9 478.9 L843.7 482.1 L840.9 485 L837.5 487.6 L833.6 489.8 L829.2 491.7 L824.5 493.1 L819.4 494.1 L814.1 494.6 L808.8 494.7 L803.4 494.2 L798 493.3 L792.9 492 L788 490.2 L783.4 488 L779.3 485.5 L775.7 482.7 L772.6 479.6 L770.1 476.3 L768.3 472.8 L767.1 469.3Z"
          fill="url(#desk-ceramic)"
        />
        <path
          d="M855 404.3 L855.8 400.8 L856 397.3 L855.4 393.8 L854.1 390.3 L852.1 386.9 L849.5 383.7 L846.3 380.7 L842.5 377.9 L838.3 375.5 L833.7 373.4 L828.8 371.7 L823.6 370.5 L818.3 369.6 L812.9 369.2 L807.5 369.3 L802.2 369.7 L797.2 370.7 L792.4 372.1 L788 373.8 L784 376 L780.5 378.5 L777.6 381.3 L775.3 384.3 L773.7 387.6 L772.8 391 L772.5 394.5 L773 398 L774.2 401.5 L776.1 404.9 L778.6 408.2 L781.8 411.3 L785.5 414.1 L789.7 416.6 L794.4 418.8 L799.4 420.5 L804.7 421.9 L810.1 422.7 L815.6 423.2 L821.1 423.1 L826.5 422.6 L831.6 421.6 L836.5 420.2 L841 418.4 L845 416.1 L848.4 413.6 L851.3 410.7 L853.5 407.6Z"
          fill="#143020"
          stroke="#a7efd0"
          strokeWidth="1.6"
        />
        <path
          d="M848.6 409.8 L849.3 406.8 L849.4 403.8 L848.9 400.8 L847.8 397.8 L846.1 394.8 L843.9 392.1 L841.1 389.5 L837.9 387.1 L834.3 385 L830.3 383.2 L826.1 381.8 L821.6 380.7 L817.1 379.9 L812.4 379.6 L807.8 379.6 L803.3 380 L798.9 380.9 L794.8 382 L791 383.6 L787.6 385.4 L784.6 387.6 L782.2 390 L780.2 392.6 L778.8 395.4 L778 398.4 L777.8 401.4 L778.2 404.4 L779.2 407.4 L780.9 410.4 L783 413.2 L785.7 415.8 L788.9 418.2 L792.6 420.4 L796.6 422.2 L800.9 423.8 L805.4 424.9 L810 425.7 L814.8 426 L819.5 426 L824.1 425.5 L828.5 424.7 L832.7 423.5 L836.5 421.9 L839.9 420 L842.9 417.8 L845.4 415.3 L847.3 412.6Z"
          fill="url(#desk-coffee)"
          stroke="#a88659"
          strokeWidth="1"
        />
      </g>
      <g
        id="desk-steam-rising"
        fill="none"
        stroke="url(#desk-steam)"
        strokeLinecap="round"
        filter="url(#desk-steam-blur)"
        opacity=".35"
      >
        <path className="desk-wisp" d="M808.2 383.9c-14-20 16-34 7-54s-12-29-1-58" strokeWidth="7" />
        <path className="desk-wisp" d="M821.2 381.9c12-19-6-31 3-50s4-27-2-42" strokeWidth="3" />
        <path className="desk-wisp" d="M800.2 385.9c-9-16 11-30 5-46s-9-26-4-40" strokeWidth="4.5" />
      </g>
    </svg>
  );
}
