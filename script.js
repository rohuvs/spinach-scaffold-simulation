/* =========================================================
   SPINACH VASCULAR SCAFFOLD SIMULATION
   ========================================================= */

let currentStep = 1;
const totalSteps = 5;


/* =========================================================
   DOM
   ========================================================= */

const screens =
    document.querySelectorAll(".screen");

const progressSteps =
    document.querySelectorAll(".progress-step");

const progressFill =
    document.getElementById("progressFill");

const prevButton =
    document.getElementById("prevButton");

const nextButton =
    document.getElementById("nextButton");

const currentStepText =
    document.getElementById("currentStep");


/* =========================================================
   STEP NAVIGATION
   ========================================================= */

function updateStep() {

    screens.forEach((screen, index) => {

        screen.classList.toggle(
            "active",
            index + 1 === currentStep
        );

    });


    progressSteps.forEach((step, index) => {

        const number = index + 1;

        step.classList.remove(
            "active",
            "completed"
        );

        if (number === currentStep) {
            step.classList.add("active");
        }

        if (number < currentStep) {
            step.classList.add("completed");
        }

    });


    const percentage =
        ((currentStep - 1) /
        (totalSteps - 1)) * 100;

    progressFill.style.width =
        `${percentage}%`;


    currentStepText.textContent =
        currentStep;


    prevButton.disabled =
        currentStep === 1;


    if (currentStep === totalSteps) {

        nextButton.textContent =
            "처음으로 ↻";

    } else {

        nextButton.textContent =
            "다음 단계 →";

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    updateFinalResults();
}


nextButton.addEventListener(
    "click",
    () => {

        if (currentStep < totalSteps) {

            currentStep++;

            updateStep();

        } else {

            resetSimulation();

        }

    }
);


prevButton.addEventListener(
    "click",
    () => {

        if (currentStep > 1) {

            currentStep--;

            updateStep();

        }

    }
);


/* =========================================================
   PROGRESS NAVIGATION
   ========================================================= */

progressSteps.forEach((step) => {

    step.addEventListener(
        "click",
        () => {

            const target =
                Number(step.dataset.step);

            /*
             * 현재까지 도달한 단계까지만
             * 직접 이동할 수 있도록 설정
             */

            if (target <= currentStep) {

                currentStep =
                    target;

                updateStep();

            }

        }
    );

});


/* =========================================================
   STEP 2
   DECELLULARIZATION
   ========================================================= */

let decellProgress = 0;
let decellRunning = false;

const decellButton =
    document.getElementById(
        "decellButton"
    );

const decellBar =
    document.getElementById(
        "decellBar"
    );

const decellPercent =
    document.getElementById(
        "decellPercent"
    );

const decellStatus =
    document.getElementById(
        "decellStatus"
    );

const decellLeaf =
    document.getElementById(
        "decellLeaf"
    );

const cellLayer =
    document.getElementById(
        "cellLayer"
    );

const decellState =
    document.getElementById(
        "decellState"
    );


decellButton.addEventListener(
    "click",
    () => {

        if (decellRunning) {
            return;
        }

        decellRunning = true;

        decellButton.disabled =
            true;

        decellButton.textContent =
            "탈세포화 진행 중...";

        decellProgress = 0;

        runDecellularization();

    }
);


function runDecellularization() {

    if (decellProgress >= 100) {

        finishDecellularization();

        return;
    }


    decellProgress += 1;


    decellBar.style.width =
        `${decellProgress}%`;

    decellPercent.textContent =
        `${decellProgress}%`;


    /*
     * 단계별 과학적 설명
     */

    if (decellProgress < 20) {

        decellState.textContent =
            "SOLUTION EXPOSURE";

        decellStatus.textContent =
            "처리 용액이 잎 조직의 관다발 경로에 접근하는 단계입니다.";

    }

    else if (decellProgress < 45) {

        decellState.textContent =
            "MEMBRANE DISRUPTION";

        decellStatus.textContent =
            "계면활성제에 의해 세포막과 세포 성분이 제거되는 과정을 모델링합니다.";

    }

    else if (decellProgress < 70) {

        decellState.textContent =
            "CELLULAR MATERIAL REMOVAL";

        decellStatus.textContent =
            "녹색 색소와 세포성 물질이 감소하면서 잎맥 구조가 상대적으로 드러납니다.";

    }

    else if (decellProgress < 90) {

        decellState.textContent =
            "CLEARING / WASHING";

        decellStatus.textContent =
            "잔여 처리 성분과 제거된 물질을 씻어내는 후처리 단계입니다.";

    }

    else {

        decellState.textContent =
            "SCAFFOLD REVEALED";

        decellStatus.textContent =
            "관다발 구조가 유지된 식물성 지지체 모델이 나타납니다.";

    }


    /*
     * 잎의 색소 감소 모델
     */

    const remaining =
        1 -
        decellProgress / 100;


    /*
     * green → pale scaffold
     */

    const red =
        Math.round(
            120 +
            (225 - 120) *
            (1 - remaining)
        );

    const green =
        Math.round(
            160 +
            (220 - 160) *
            (1 - remaining)
        );

    const blue =
        Math.round(
            105 +
            (215 - 105) *
            (1 - remaining)
        );


    decellLeaf.style.fill =
        `rgb(${red},${green},${blue})`;

    decellLeaf.style.opacity =
        Math.max(
            0.10,
            remaining
        );


    cellLayer.style.opacity =
        Math.max(
            0,
            remaining * 0.75
        );


    setTimeout(
        runDecellularization,
        45
    );
}


function finishDecellularization() {

    decellProgress = 100;

    decellBar.style.width =
        "100%";

    decellPercent.textContent =
        "100%";

    decellState.textContent =
        "SCAFFOLD READY";

    decellStatus.textContent =
        "모델상 탈세포화가 완료되었습니다. 다음 단계에서 구조 보존과 관류 가능성을 분석합니다.";

    decellButton.textContent =
        "탈세포화 완료";

    decellRunning = false;
}


/* =========================================================
   STEP 4
   PERFUSION NETWORK
   ========================================================= */

const flowButton =
    document.getElementById(
        "flowButton"
    );

const flowRate =
    document.getElementById(
        "flowRate"
    );

const flowRateValue =
    document.getElementById(
        "flowRateValue"
    );

const timeValue =
    document.getElementById(
        "timeValue"
    );

const distanceValue =
    document.getElementById(
        "distanceValue"
    );

const speedValue =
    document.getElementById(
        "speedValue"
    );

const activeBranches =
    document.getElementById(
        "activeBranches"
    );

const flowState =
    document.getElementById(
        "flowState"
    );

const particles =
    document.querySelectorAll(
        ".particle"
    );


/*
 * 모델상의 분지점
 */

const branchPoints = [
    { x: 210, y: 300 },
    { x: 285, y: 285 },
    { x: 365, y: 270 },
    { x: 450, y: 250 },
    { x: 545, y: 215 }
];


/*
 * 여러 branch path
 *
 * 색소가 하나의 직선이 아니라
 * 서로 다른 경로를 따라 이동하도록
 * 각각 별도의 경로를 정의한다.
 */

const branchPaths = [

    [
        {x:70,y:315},
        {x:150,y:308},
        {x:210,y:300},
        {x:175,y:220},
        {x:145,y:125}
    ],

    [
        {x:70,y:315},
        {x:150,y:308},
        {x:210,y:300},
        {x:285,y:285},
        {x:280,y:100}
    ],

    [
        {x:70,y:315},
        {x:160,y:305},
        {x:285,y:285},
        {x:365,y:270},
        {x:445,y:105}
    ],

    [
        {x:70,y:315},
        {x:170,y:310},
        {x:285,y:285},
        {x:365,y:270},
        {x:450,y:250},
        {x:585,y:125}
    ],

    [
        {x:70,y:315},
        {x:180,y:310},
        {x:365,y:270},
        {x:450,y:250},
        {x:545,y:215},
        {x:720,y:180}
    ],

    [
        {x:70,y:315},
        {x:180,y:310},
        {x:210,y:300},
        {x:150,y:440},
        {x:70,y:485}
    ],

    [
        {x:70,y:315},
        {x:190,y:305},
        {x:285,y:285},
        {x:275,y:475},
        {x:225,y:535}
    ],

    [
        {x:70,y:315},
        {x:200,y:305},
        {x:365,y:270},
        {x:430,y:440},
        {x:500,y:515}
    ]

];


let flowRunning = false;
let flowStartTime = null;
let animationFrame = null;

let simulationTime = 0;
let simulationDistance = 0;
let simulationSpeed = 0;

const modelDistance =
    42;


/* =========================================================
   FLOW RATE
   ========================================================= */

flowRate.addEventListener(
    "input",
    () => {

        flowRateValue.textContent =
            Number(flowRate.value)
                .toFixed(1);

    }
);


/* =========================================================
   START PERFUSION
   ========================================================= */

flowButton.addEventListener(
    "click",
    () => {

        if (flowRunning) {
            return;
        }

        startPerfusion();

    }
);


function startPerfusion() {

    flowRunning = true;

    flowStartTime =
        performance.now();

    simulationTime = 0;
    simulationDistance = 0;
    simulationSpeed = 0;


    flowButton.disabled =
        true;

    flowButton.textContent =
        "관류 진행 중...";

    flowState.textContent =
        "PERFUSING";


    particles.forEach(
        (particle) => {

            particle.style.opacity =
                "1";

        }
    );


    animatePerfusion();

}


/* =========================================================
   ANIMATION
   ========================================================= */

function animatePerfusion() {

    const now =
        performance.now();


    simulationTime =
        (now - flowStartTime) /
        1000;


    /*
     * 유량이 높을수록
     * 모델상의 이동 시간이 짧아진다.
     */

    const rate =
        Number(flowRate.value);


    const duration =
        9 / rate;


    let progress =
        simulationTime /
        duration;


    if (progress > 1) {
        progress = 1;
    }


    /*
     * 여러 입자를 각각 다른
     * branch path에 배치
     */

    particles.forEach(
        (particle, index) => {

            const delay =
                index * 0.055;

            let local =
                progress - delay;

            if (local < 0) {
                local = 0;
            }

            if (local > 1) {
                local = 1;
            }


            const path =
                branchPaths[
                    index %
                    branchPaths.length
                ];


            const position =
                positionOnPath(
                    path,
                    local
                );


            particle.setAttribute(
                "cx",
                position.x
            );

            particle.setAttribute(
                "cy",
                position.y
            );

        }
    );


    simulationDistance =
        modelDistance *
        progress;


    if (simulationTime > 0) {

        simulationSpeed =
            simulationDistance /
            simulationTime;

    }


    timeValue.textContent =
        `${simulationTime.toFixed(1)} s`;

    distanceValue.textContent =
        `${simulationDistance.toFixed(1)} mm`;

    speedValue.textContent =
        `${simulationSpeed.toFixed(2)} mm/s`;


    /*
     * 분지 활성화 모델
     */

    const branchNumber =
        Math.min(
            11,
            Math.floor(
                progress * 11
            )
        );

    activeBranches.textContent =
        `${branchNumber} / 11`;


    if (progress >= 1) {

        finishPerfusion();

        return;

    }


    animationFrame =
        requestAnimationFrame(
            animatePerfusion
        );
}


/* =========================================================
   PATH INTERPOLATION
   ========================================================= */

function positionOnPath(
    path,
    progress
) {

    if (progress <= 0) {

        return path[0];

    }

    if (progress >= 1) {

        return path[path.length - 1];

    }


    /*
     * 각 segment 길이를 계산
     */

    let totalLength = 0;

    const lengths = [];


    for (
        let i = 0;
        i < path.length - 1;
        i++
    ) {

        const dx =
            path[i + 1].x -
            path[i].x;

        const dy =
            path[i + 1].y -
            path[i].y;

        const length =
            Math.sqrt(
                dx * dx +
                dy * dy
            );

        lengths.push(length);

        totalLength += length;

    }


    let target =
        totalLength *
        progress;


    for (
        let i = 0;
        i < lengths.length;
        i++
    ) {

        if (target <= lengths[i]) {

            const ratio =
                target /
                lengths[i];

            return {

                x:
                    path[i].x +
                    (
                        path[i + 1].x -
                        path[i].x
                    ) *
                    ratio,

                y:
                    path[i].y +
                    (
                        path[i + 1].y -
                        path[i].y
                    ) *
                    ratio

            };

        }

        target -= lengths[i];

    }


    return path[path.length - 1];
}


/* =========================================================
   FINISH PERFUSION
   ========================================================= */

function finishPerfusion() {

    flowRunning = false;


    if (animationFrame) {

        cancelAnimationFrame(
            animationFrame
        );

    }


    simulationTime =
        9 /
        Number(flowRate.value);


    simulationDistance =
        modelDistance;


    simulationSpeed =
        simulationDistance /
        simulationTime;


    timeValue.textContent =
        `${simulationTime.toFixed(1)} s`;

    distanceValue.textContent =
        `${simulationDistance.toFixed(1)} mm`;

    speedValue.textContent =
        `${simulationSpeed.toFixed(2)} mm/s`;


    activeBranches.textContent =
        "11 / 11";


    flowState.textContent =
        "NETWORK PERFUSED";


    flowButton.disabled =
        false;

    flowButton.textContent =
        "다시 관류하기";


    updateFinalResults();

}


/* =========================================================
   FINAL RESULT
   ========================================================= */

function updateFinalResults() {

    const finalDistance =
        document.getElementById(
            "finalDistance"
        );

    const finalSpeed =
        document.getElementById(
            "finalSpeed"
        );


    if (finalDistance) {

        finalDistance.textContent =
            `${simulationDistance.toFixed(1)} mm`;

    }


    if (finalSpeed) {

        finalSpeed.textContent =
            `${simulationSpeed.toFixed(2)} mm/s`;

    }

}


/* =========================================================
   RESET
   ========================================================= */

function resetSimulation() {

    currentStep = 1;

    decellProgress = 0;
    decellRunning = false;

    decellBar.style.width =
        "0%";

    decellPercent.textContent =
        "0%";

    decellStatus.textContent =
        "탈세포화 모델을 시작하세요.";

    decellButton.disabled =
        false;

    decellButton.textContent =
        "탈세포화 시작";

    decellState.textContent =
        "READY";


    decellLeaf.style.fill =
        "#789e6c";

    decellLeaf.style.opacity =
        "1";

    cellLayer.style.opacity =
        "0.75";


    flowRunning = false;

    if (animationFrame) {

        cancelAnimationFrame(
            animationFrame
        );

    }


    simulationTime = 0;
    simulationDistance = 0;
    simulationSpeed = 0;


    timeValue.textContent =
        "0.0 s";

    distanceValue.textContent =
        "0.0 mm";

    speedValue.textContent =
        "0.0 mm/s";

    activeBranches.textContent =
        "0 / 11";


    flowState.textContent =
        "READY";


    particles.forEach(
        (particle) => {

            particle.style.opacity =
                "0";

            particle.setAttribute(
                "cx",
                "70"
            );

            particle.setAttribute(
                "cy",
                "315"
            );

        }
    );


    flowButton.disabled =
        false;

    flowButton.textContent =
        "관류 시작";


    updateFinalResults();

    updateStep();

}


/* =========================================================
   INITIALIZE
   ========================================================= */

updateStep();
