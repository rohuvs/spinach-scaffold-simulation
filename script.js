* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:root {
    --green-900: #183b29;
    --green-800: #245238;
    --green-700: #326847;
    --green-600: #43835b;
    --green-100: #eaf3ed;
    --green-50: #f5f9f6;

    --text: #202923;
    --text-light: #6d7971;

    --border: #dce5df;
    --border-light: #e8eee9;

    --background: #f5f7f5;
    --white: #ffffff;

    --red: #c95461;
    --blue: #547b9c;
}


html {
    scroll-behavior: smooth;
}


body {
    min-height: 100vh;

    background: var(--background);

    color: var(--text);

    font-family:
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        "Noto Sans KR",
        Arial,
        sans-serif;

    line-height: 1.6;
}


/* =====================================================
   HEADER
===================================================== */

.site-header {
    background: var(--white);

    border-bottom: 1px solid var(--border);
}


.header-inner {
    max-width: 1180px;

    margin: auto;

    padding: 28px 30px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 30px;
}


.eyebrow {
    color: var(--green-600);

    font-size: 10px;

    font-weight: 800;

    letter-spacing: 0.16em;

    margin-bottom: 7px;
}


.site-header h1 {
    color: var(--green-900);

    font-size: 24px;

    font-weight: 750;

    letter-spacing: -0.03em;
}


.site-header p {
    color: var(--text-light);

    font-size: 13px;

    margin-top: 3px;
}


.header-tag {
    border: 1px solid var(--border);

    border-radius: 10px;

    padding: 9px 13px;

    color: var(--green-700);

    font-size: 9px;

    line-height: 1.4;

    letter-spacing: 0.12em;

    font-weight: 800;

    text-align: center;
}


/* =====================================================
   APP
===================================================== */

.app {
    max-width: 1180px;

    margin: auto;

    padding: 38px 30px 70px;
}


/* =====================================================
   PROGRESS
===================================================== */

.progress-area {
    max-width: 850px;

    margin: 0 auto 35px;

    position: relative;
}


.progress-track {
    position: absolute;

    top: 18px;

    left: 10%;

    width: 80%;

    height: 2px;

    background: #dfe6e1;
}


.progress-value {
    width: 0%;

    height: 100%;

    background: var(--green-600);

    transition: width 0.4s ease;
}


.step-navigation {
    display: flex;

    justify-content: space-between;

    position: relative;

    z-index: 2;
}


.progress-step {
    border: none;

    background: transparent;

    cursor: pointer;

    display: flex;

    flex-direction: column;

    align-items: center;

    gap: 7px;

    color: #9aa59e;
}


.progress-step span {
    width: 37px;

    height: 37px;

    border-radius: 50%;

    display: flex;

    align-items: center;

    justify-content: center;

    background: #e5eae7;

    color: #7f8b84;

    font-size: 11px;

    font-weight: 800;

    transition: 0.25s;
}


.progress-step small {
    font-size: 10px;

    font-weight: 700;

    white-space: nowrap;
}


.progress-step.active {
    color: var(--green-700);
}


.progress-step.active span {
    background: var(--green-700);

    color: white;

    transform: scale(1.06);
}


.progress-step.completed {
    color: var(--green-800);
}


.progress-step.completed span {
    background: var(--green-800);

    color: white;
}


/* =====================================================
   PAGE
===================================================== */

.page {
    display: none;

    background: var(--white);

    border: 1px solid var(--border);

    border-radius: 20px;

    padding: 45px;

    box-shadow:
        0 12px 40px rgba(31, 59, 42, 0.05);

    animation: pageIn 0.35s ease;
}


.page.active {
    display: block;
}


@keyframes pageIn {

    from {
        opacity: 0;

        transform: translateY(8px);
    }

    to {
        opacity: 1;

        transform: translateY(0);
    }

}


.page-header {
    margin-bottom: 32px;

    max-width: 800px;
}


.step-number {
    display: inline-block;

    color: var(--green-700);

    background: var(--green-100);

    border-radius: 5px;

    padding: 5px 9px;

    font-size: 9px;

    letter-spacing: 0.12em;

    font-weight: 800;

    margin-bottom: 11px;
}


.page-header h2 {
    color: var(--green-900);

    font-size: 29px;

    line-height: 1.3;

    letter-spacing: -0.035em;

    margin-bottom: 11px;
}


.page-header > p {
    color: var(--text-light);

    font-size: 14px;

    line-height: 1.75;
}


/* =====================================================
   COMMON CARDS
===================================================== */

.visual-card,
.information-card,
.flow-card,
.flow-control,
.analysis-card,
.comparison-panel {
    border: 1px solid var(--border);

    background: #fbfcfb;

    border-radius: 15px;
}


.card-label {
    color: var(--green-600);

    font-size: 9px;

    font-weight: 850;

    letter-spacing: 0.14em;

    margin-bottom: 9px;
}


.information-card {
    padding: 25px;
}


.information-card h3,
.flow-control h3,
.analysis-card h3 {
    color: var(--green-900);

    font-size: 17px;

    margin-bottom: 18px;
}


/* =====================================================
   TWO COLUMN
===================================================== */

.two-column {
    display: grid;

    grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.8fr);

    gap: 25px;

    align-items: stretch;
}


.visual-card {
    padding: 25px;

    display: flex;

    flex-direction: column;

    justify-content: center;
}


.leaf-svg {
    width: 100%;

    max-height: 420px;

    display: block;

    margin: 0 auto;
}


/* =====================================================
   LEAF
===================================================== */

.leaf-tissue {
    fill: #759f6a;

    stroke: #507d53;

    stroke-width: 2;

    transition:
        fill 0.25s ease,
        opacity 0.25s ease;
}


.vein {
    fill: none;

    stroke-linecap: round;

    stroke-linejoin: round;
}


.primary-vein {
    stroke: #e1ebd5;

    stroke-width: 10;
}


.secondary-vein {
    stroke: #d2e3c8;

    stroke-width: 5;
}


.legend {
    border-top: 1px solid var(--border);

    padding-top: 15px;

    margin-top: 10px;

    display: flex;

    gap: 20px;

    color: var(--text-light);

    font-size: 11px;
}


.legend > div {
    display: flex;

    align-items: center;

    gap: 7px;
}


.legend-line {
    width: 25px;

    display: inline-block;

    border-top: 4px solid #b9d1b0;
}


.legend-line.primary {
    border-color: #d5e3ca;

    border-width: 6px;
}


/* =====================================================
   DATA
===================================================== */

.data-list {
    border-top: 1px solid var(--border);
}


.data-item {
    display: flex;

    justify-content: space-between;

    gap: 15px;

    padding: 12px 0;

    border-bottom: 1px solid var(--border-light);

    font-size: 12px;
}


.data-item span {
    color: var(--text-light);
}


.data-item strong {
    color: var(--green-800);

    text-align: right;
}


.research-question {
    margin-top: 22px;

    padding: 16px;

    background: var(--green-50);

    border-left: 3px solid var(--green-600);
}


.research-question span,
.final-statement > span {
    color: var(--green-600);

    font-size: 8px;

    font-weight: 850;

    letter-spacing: 0.14em;
}


.research-question p {
    color: var(--green-900);

    font-size: 12px;

    line-height: 1.65;

    margin-top: 6px;
}


.concept-tags {
    display: flex;

    flex-wrap: wrap;

    gap: 6px;

    margin-top: 18px;
}


.concept-tags span {
    border: 1px solid var(--border);

    color: var(--text-light);

    background: white;

    padding: 5px 8px;

    border-radius: 5px;

    font-size: 9px;
}


/* =====================================================
   STEP 2
===================================================== */

.decell-layer {
    fill: #739c67;
}


.simulation-status {
    border-top: 1px solid var(--border);

    margin-top: 10px;

    padding-top: 15px;

    display: flex;

    justify-content: space-between;

    gap: 15px;

    color: var(--text-light);

    font-size: 11px;
}


.simulation-status strong {
    color: var(--green-700);
}


.progress-bar {
    height: 7px;

    background: #e5ebe6;

    border-radius: 10px;

    overflow: hidden;

    margin-top: 10px;
}


.progress-bar > div {
    height: 100%;

    width: 0%;

    background: var(--green-600);

    transition: width 0.08s linear;
}


.process-list {
    display: flex;

    flex-direction: column;

    gap: 17px;
}


.process-item {
    display: grid;

    grid-template-columns: 25px 1fr;

    gap: 10px;
}


.process-item > span {
    width: 23px;

    height: 23px;

    border-radius: 50%;

    background: var(--green-100);

    color: var(--green-700);

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 8px;

    font-weight: 850;
}


.process-item strong {
    color: var(--green-900);

    font-size: 12px;
}


.process-item p {
    color: var(--text-light);

    font-size: 10px;

    line-height: 1.55;

    margin-top: 3px;
}


.materials {
    margin-top: 22px;

    border-top: 1px solid var(--border);

    padding-top: 18px;
}


.materials h4 {
    color: var(--green-800);

    font-size: 11px;

    margin-bottom: 10px;
}


.material-row {
    display: grid;

    grid-template-columns: 110px 1fr;

    gap: 10px;

    padding: 8px 0;

    border-bottom: 1px solid var(--border-light);

    font-size: 10px;
}


.material-row strong {
    color: var(--green-700);
}


.material-row span {
    color: var(--text-light);
}


.scientific-note {
    margin-top: 18px;

    padding: 13px;

    border-radius: 8px;

    background: #f8f8f5;

    border: 1px solid #e8e5dc;
}


.scientific-note span {
    color: #827967;

    font-size: 8px;

    font-weight: 850;

    letter-spacing: 0.12em;
}


.scientific-note p {
    color: #777064;

    font-size: 10px;

    line-height: 1.6;

    margin-top: 4px;
}


/* =====================================================
   BUTTONS
===================================================== */

.primary-button,
.secondary-button {
    border: none;

    border-radius: 9px;

    padding: 12px 18px;

    cursor: pointer;

    font-size: 12px;

    font-weight: 750;

    transition:
        transform 0.2s,
        box-shadow 0.2s,
        opacity 0.2s;
}


.primary-button {
    color: white;

    background: var(--green-700);
}


.primary-button:hover {
    transform: translateY(-1px);

    box-shadow:
        0 7px 18px rgba(50, 104, 71, 0.18);
}


.primary-button:disabled {
    opacity: 0.55;

    cursor: not-allowed;

    transform: none;

    box-shadow: none;
}


.secondary-button {
    color: var(--green-800);

    background: #e9efeb;
}


.secondary-button:hover:not(:disabled) {
    transform: translateY(-1px);
}


.secondary-button:disabled {
    opacity: 0.4;

    cursor: not-allowed;
}


.full {
    width: 100%;

    margin-top: 18px;
}


/* =====================================================
   STEP 3
===================================================== */

.comparison-grid {
    display: grid;

    grid-template-columns: 1fr 45px 1fr;

    gap: 18px;

    align-items: center;
}


.comparison-panel {
    padding: 25px;
}


.comparison-panel h3 {
    color: var(--green-900);

    font-size: 16px;

    margin-bottom: 15px;
}


.comparison-panel > p {
    color: var(--text-light);

    font-size: 11px;

    line-height: 1.6;

    margin-top: 14px;
}


.comparison-arrow {
    color: var(--green-600);

    font-size: 27px;

    text-align: center;
}


/* =====================================================
   STRUCTURE MINI MODEL
===================================================== */

.structure-view {
    height: 220px;

    position: relative;

    overflow: hidden;

    border-radius: 10px;

    background: #f4f8f5;
}


.before-view {
    background:
        radial-gradient(circle at 20% 30%, #7ca76d 0 4px, transparent 5px),
        radial-gradient(circle at 60% 60%, #719b66 0 5px, transparent 6px),
        radial-gradient(circle at 75% 25%, #80a972 0 4px, transparent 5px),
        #eef5ef;
}


.cell-layer span {
    position: absolute;

    width: 25px;

    height: 25px;

    border-radius: 50%;

    background: rgba(90, 133, 79, 0.35);

    border: 1px solid rgba(70, 110, 65, 0.25);
}


.cell-layer span:nth-child(1) {
    left: 15%;

    top: 30%;
}


.cell-layer span:nth-child(2) {
    left: 28%;

    top: 45%;
}


.cell-layer span:nth-child(3) {
    left: 45%;

    top: 25%;
}


.cell-layer span:nth-child(4) {
    left: 58%;

    top: 45%;
}


.cell-layer span:nth-child(5) {
    left: 72%;

    top: 32%;
}


.cell-layer span:nth-child(6) {
    left: 22%;

    top: 65%;
}


.cell-layer span:nth-child(7) {
    left: 50%;

    top: 70%;
}


.cell-layer span:nth-child(8) {
    left: 76%;

    top: 65%;
}


.network-mini {
    position: absolute;

    inset: 0;
}


.network-main {
    position: absolute;

    height: 7px;

    width: 75%;

    left: 12%;

    top: 53%;

    background: #9bb58f;

    border-radius: 10px;

    transform: rotate(-8deg);
}


.network-branch {
    position: absolute;

    width: 5px;

    height: 75px;

    background: #aec3a5;

    border-radius: 10px;

    transform-origin: bottom center;
}


.network-branch.b1 {
    left: 30%;

    top: 25%;

    transform: rotate(-25deg);
}


.network-branch.b2 {
    left: 43%;

    top: 20%;

    transform: rotate(-8deg);
}


.network-branch.b3 {
    left: 53%;

    top: 56%;

    transform: rotate(10deg);
}


.network-branch.b4 {
    left: 66%;

    top: 55%;

    transform: rotate(28deg);
}


.clean-network .network-main {
    background: #799b78;
}


.clean-network .network-branch {
    background: #89a988;
}


.after-view {
    background: #f8faf8;
}


/* =====================================================
   STEP 3 ANALYSIS
===================================================== */

.analysis-section {
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 18px;

    margin-top: 20px;
}


.analysis-card {
    padding: 24px;
}


.analysis-list {
    display: flex;

    flex-direction: column;

    gap: 15px;
}


.analysis-list strong {
    display: block;

    color: var(--green-800);

    font-size: 12px;
}


.analysis-list p {
    color: var(--text-light);

    font-size: 10px;

    margin-top: 3px;
}


.long-text {
    color: var(--text-light);

    font-size: 11px;

    line-height: 1.7;
}


.concept-box {
    margin-top: 18px;

    padding: 15px;

    background: var(--green-50);

    border-radius: 9px;
}


.concept-box strong {
    color: var(--green-800);

    font-size: 12px;
}


.concept-box p {
    color: var(--text-light);

    font-size: 10px;

    line-height: 1.6;

    margin-top: 5px;
}


/* =====================================================
   STEP 4 FLOW
===================================================== */

.flow-layout {
    display: grid;

    grid-template-columns: minmax(0, 1.55fr) minmax(280px, 0.75fr);

    gap: 20px;
}


.flow-card {
    padding: 22px;
}


.flow-canvas {
    background: #f5f9f6;

    border: 1px solid var(--border-light);

    border-radius: 12px;

    position: relative;
}


.flow-canvas svg {
    width: 100%;

    display: block;
}


.flow-path {
    fill: none;

    stroke: #94aa91;

    stroke-width: 7;

    stroke-linecap: round;

    stroke-linejoin: round;
}


.main-flow-path {
    stroke: #829e80;

    stroke-width: 10;
}


.junction {
    fill: white;

    stroke: #6f906e;

    stroke-width: 3;
}


.injection-point {
    fill: var(--red);

    stroke: white;

    stroke-width: 4;
}


.injection-label {
    position: absolute;

    left: 16px;

    bottom: 13px;

    background: white;

    border: 1px solid var(--border);

    color: var(--red);

    border-radius: 5px;

    padding: 4px 7px;

    font-size: 8px;

    font-weight: 850;

    letter-spacing: 0.1em;
}


.dye-particle {
    fill: var(--red);

    filter:
        drop-shadow(0 2px 3px rgba(0, 0, 0, 0.16));
}


.flow-legend {
    display: flex;

    gap: 20px;

    padding-top: 14px;

    color: var(--text-light);

    font-size: 9px;
}


.flow-legend span {
    display: flex;

    align-items: center;

    gap: 6px;
}


.legend-dot {
    width: 8px;

    height: 8px;

    border-radius: 50%;

    display: inline-block;
}


.legend-dot.inlet {
    background: var(--red);
}


.legend-dot.particle {
    background: #df6672;
}


.legend-line.flow {
    width: 20px;

    border-top: 4px solid #94aa91;
}


/* =====================================================
   FLOW CONTROL
===================================================== */

.flow-control {
    padding: 24px;
}


.parameter {
    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 13px 0;

    border-bottom: 1px solid var(--border-light);

    font-size: 11px;
}


.parameter span:first-child {
    color: var(--text-light);
}


.parameter strong {
    color: var(--green-800);

    font-size: 12px;
}


.flow-explanation {
    margin-top: 22px;

    padding-top: 17px;

    border-top: 1px solid var(--border);
}


.flow-explanation h4 {
    color: var(--green-800);

    font-size: 12px;

    margin-bottom: 5px;
}


.flow-explanation p {
    color: var(--text-light);

    font-size: 10px;

    line-height: 1.65;
}


.branch-analysis {
    margin-top: 20px;

    border: 1px solid var(--border);

    border-radius: 12px;

    display: grid;

    grid-template-columns: repeat(4, 1fr);

    background: #fbfcfb;
}


.branch-analysis > div {
    padding: 15px;

    border-right: 1px solid var(--border);
}


.branch-analysis > div:last-child {
    border-right: none;
}


.branch-analysis span {
    display: block;

    color: var(--text-light);

    font-size: 8px;

    letter-spacing: 0.1em;

    font-weight: 800;

    margin-bottom: 5px;
}


.branch-analysis strong {
    color: var(--green-800);

    font-size: 12px;
}


/* =====================================================
   STEP 5 RESULTS
===================================================== */

.result-dashboard {
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 12px;

    margin-bottom: 22px;
}


.result-card {
    border: 1px solid var(--border);

    border-radius: 12px;

    padding: 18px;

    background: #fbfcfb;
}


.result-card span {
    display: block;

    color: var(--text-light);

    font-size: 8px;

    font-weight: 850;

    letter-spacing: 0.1em;

    margin-bottom: 6px;
}


.result-card strong {
    display: block;

    color: var(--green-900);

    font-size: 19px;

    line-height: 1.3;
}


.result-card small {
    display: block;

    color: #8b958f;

    font-size: 9px;

    margin-top: 5px;
}


/* =====================================================
   THEORY GRID
===================================================== */

.theory-grid {
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 12px;
}


.theory-card {
    border: 1px solid var(--border);

    border-radius: 12px;

    padding: 22px;

    display: grid;

    grid-template-columns: 36px 1fr;

    gap: 15px;

    background: #ffffff;
}


.theory-number {
    width: 31px;

    height: 31px;

    border-radius: 50%;

    background: var(--green-100);

    color: var(--green-700);

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 9px;

    font-weight: 850;
}


.theory-label {
    color: var(--green-600);

    font-size: 8px;

    font-weight: 850;

    letter-spacing: 0.11em;
}


.theory-card h3 {
    color: var(--green-900);

    font-size: 15px;

    margin: 4px 0 7px;
}


.theory-card p {
    color: var(--text-light);

    font-size: 10px;

    line-height: 1.7;
}


/* =====================================================
   LIMITATIONS
===================================================== */

.research-limitations {
    margin-top: 20px;

    padding: 24px;

    border: 1px solid var(--border);

    border-radius: 13px;

    background: #fbfcfb;
}


.research-limitations h3 {
    color: var(--green-900);

    font-size: 16px;

    margin-bottom: 18px;
}


.limitation-grid {
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 20px;
}


.status-tag {
    display: inline-block;

    border-radius: 5px;

    padding: 4px 6px;

    font-size: 7px;

    font-weight: 850;

    letter-spacing: 0.08em;
}


.status-tag.observation {
    background: #edf4ed;

    color: var(--green-700);
}


.status-tag.model {
    background: #f0f2f7;

    color: #63738d;
}


.status-tag.literature {
    background: #f5f2eb;

    color: #81745f;
}


.limitation-grid p {
    color: var(--text-light);

    font-size: 10px;

    line-height: 1.6;

    margin-top: 8px;
}


.final-statement {
    margin-top: 20px;

    padding: 25px;

    background: var(--green-900);

    color: white;

    border-radius: 13px;
}


.final-statement > span {
    color: #a7c6b1;
}


.final-statement p {
    font-size: 12px;

    line-height: 1.8;

    margin-top: 7px;

    color: #e2ebe5;
}


/* =====================================================
   BOTTOM NAVIGATION
===================================================== */

.bottom-navigation {
    margin-top: 22px;

    display: grid;

    grid-template-columns: 1fr auto 1fr;

    align-items: center;

    gap: 15px;
}


.bottom-navigation .primary-button {
    justify-self: end;
}


.page-counter {
    color: #8b958f;

    font-size: 11px;
}


.page-counter strong {
    color: var(--green-800);

    font-size: 14px;
}


/* =====================================================
   FOOTER
===================================================== */

.site-footer {
    border-top: 1px solid var(--border);

    padding: 25px 20px;

    text-align: center;

    color: #929b95;

    font-size: 9px;

    line-height: 1.8;
}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 900px) {

    .page {
        padding: 30px;
    }


    .two-column,
    .flow-layout {
        grid-template-columns: 1fr;
    }


    .analysis-section {
        grid-template-columns: 1fr;
    }


    .theory-grid {
        grid-template-columns: 1fr;
    }

}


@media (max-width: 650px) {

    .header-inner {
        padding: 20px;

        align-items: flex-start;
    }


    .header-tag {
        display: none;
    }


    .site-header h1 {
        font-size: 20px;
    }


    .app {
        padding: 25px 12px 50px;
    }


    .page {
        padding: 22px 17px;

        border-radius: 15px;
    }


    .page-header h2 {
        font-size: 24px;
    }


    .page-header > p {
        font-size: 12px;
    }


    .progress-area {
        overflow-x: auto;

        padding-bottom: 5px;
    }


    .step-navigation {
        min-width: 480px;
    }


    .progress-track {
        min-width: 380px;
    }


    .comparison-grid {
        grid-template-columns: 1fr;
    }


    .comparison-arrow {
        transform: rotate(90deg);
    }


    .branch-analysis {
        grid-template-columns: 1fr 1fr;
    }


    .branch-analysis > div:nth-child(2) {
        border-right: none;
    }


    .branch-analysis > div {
        border-bottom: 1px solid var(--border);
    }


    .result-dashboard {
        grid-template-columns: 1fr 1fr;
    }


    .limitation-grid {
        grid-template-columns: 1fr;
    }


    .bottom-navigation {
        grid-template-columns: auto 1fr auto;
    }


    .bottom-navigation .secondary-button,
    .bottom-navigation .primary-button {
        padding: 10px 12px;
    }

}


@media (max-width: 420px) {

    .result-dashboard {
        grid-template-columns: 1fr;
    }


    .material-row {
        grid-template-columns: 90px 1fr;
    }

}
