/* =====================================================
   Spinach Vascular Scaffold Simulation
   ===================================================== */

let currentStep = 1;
const totalSteps = 5;

let decellProgress = 0;
let decellRunning = false;

let flowRunning = false;
let flowStartTime = null;
let flowAnimationId = null;

let finalTime = 0;
let finalDistance = 0;
let finalSpeed = 0;


/* =====================================================
   DOM
   ===================================================== */

const steps = document.querySelectorAll(".experiment-step");
const progressSteps = document.querySelectorAll(".step");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const currentStepText = document.getElementById("currentStep");
const progressFill = document.getElementById("progressFill");

const decellButton = document.getElementById("decellButton");
const decellBar = document.getElementById("decellBar");
const decellPercent = document.getElementById("decellPercent");
const decellStatus = document.getElementById("decellStatus");
const decellBody = document.getElementById("decellBody");

const flowButton = document.getElementById("flowButton");
const dyeDot = document.getElementById("dyeDot");

const timeValue = document.getElementById("timeValue");
const distanceValue = document.getElementById("distanceValue");
const speedValue = document.getElementById("speedValue");

const finalDistanceText = document.getElementById("finalDistance");
const finalTimeText = document.getElementById("finalTime");
const finalSpeedText = document.getElementById("finalSpeed");


/* =====================================================
   STEP CONTROL
   ===================================================== */

function updateStep() {

    steps.forEach((step, index) => {
        step.classList.toggle("active", index + 1 === currentStep);
    });

    progressSteps.forEach((step, index) => {

        const stepNumber = index + 1;

        step.classList.remove("active");
        step.classList.remove("completed");

        if (stepNumber === currentStep) {
            step.classList.add("active");
        }

        if (stepNumber < currentStep) {
            step.classList.add("completed");
        }
    });


    /*
       Progress bar
       Step 1 = 0%
       Step 5 = 100%
    */

    const progress =
        ((currentStep - 1) / (totalSteps - 1)) * 100;

    progressFill.style.width = `${progress}%`;

    currentStepText.textContent = currentStep;


    prevButton.disabled = currentStep === 1;


    if (currentStep === totalSteps) {
        nextButton.textContent = "처음으로 ↻";
    } else {
        nextButton.textContent = "다음 단계 →";
    }


    /*
       결과 화면에 최신 값 반영
    */

    updateFinalResults();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   NEXT BUTTON
   ===================================================== */

nextButton.addEventListener("click", () => {

    if (currentStep < totalSteps) {

        currentStep++;

        updateStep();

    } else {

        resetSimulation();

    }
});


/* =====================================================
   PREVIOUS BUTTON
   ===================================================== */

prevButton.addEventListener("click", () => {

    if (currentStep > 1) {

        currentStep--;

        updateStep();

    }
});


/* =====================================================
   STEP INDICATOR CLICK
   ===================================================== */

progressSteps.forEach((step) => {

    step.addEventListener("click", () => {

        const targetStep =
            Number(step.dataset.step);

        /*
           이미 진행한 단계 또는 현재 단계로 이동 가능
        */

        if (targetStep <= currentStep) {

            currentStep = targetStep;

            updateStep();

        }
    });

});


/* =====================================================
   DECELLULARIZATION
   ===================================================== */

decellButton.addEventListener("click", () => {

    if (decellRunning) {
        return;
    }

    decellRunning = true;

    decellButton.disabled = true;

    decellButton.textContent = "탈세포화 진행 중...";

    decellProgress = 0;

    runDecellularization();

});


function runDecellularization() {

    if (decellProgress >= 100) {

        decellProgress = 100;

        decellBar.style.width = "100%";
        decellPercent.textContent = "100%";

        decellStatus.textContent =
            "탈세포화가 완료되었습니다. 잎맥 구조가 드러났습니다.";

        decellButton.textContent = "탈세포화 완료";

        decellRunning = false;

        return;
    }


    /*
       진행률 증가
    */

    decellProgress += 1;


    decellBar.style.width =
        `${decellProgress}%`;

    decellPercent.textContent =
        `${decellProgress}%`;


    /*
       상태 메시지
    */

    if (decellProgress < 25) {

        decellStatus.textContent =
            "잎 조직에 용액이 침투하고 있습니다.";

    } else if (decellProgress < 50) {

        decellStatus.textContent =
            "세포 조직이 점차 제거되고 있습니다.";

    } else if (decellProgress < 75) {

        decellStatus.textContent =
            "녹색 조직이 감소하고 있습니다.";

    } else if (decellProgress < 100) {

        decellStatus.textContent =
            "잎맥 구조가 점차 드러나고 있습니다.";

    }


    /*
       잎의 녹색 감소
    */

    const opacity =
        1 - decellProgress / 100;

    const green =
        Math.max(0, 111 - decellProgress * 0.7);

    const red =
        Math.min(220, 111 + decellProgress * 0.9);

    const blue =
        Math.min(220, 99 + decellProgress * 0.9);


    decellBody.style.fill =
        `rgb(${red}, ${green}, ${blue})`;

    decellBody.style.opacity =
        Math.max(0.08, opacity);


    /*
       60ms마다 업데이트
    */

    setTimeout(runDecellularization, 60);
}


/* =====================================================
   FLOW / DYE SIMULATION
   ===================================================== */


/*
   실제 SVG 잎맥 경로를 단순화하여
   색소 이동을 하나의 경로로 모델링한다.

   시작점:
   (80, 230)

   최종점:
   (420, 170)

   전체 이동 거리:
   약 374 mm로 가정
*/

const flowPath = [
    { x: 80, y: 230 },
    { x: 120, y: 224 },
    { x: 160, y: 218 },
    { x: 200, y: 210 },
    { x: 240, y: 202 },
    { x: 280, y: 195 },
    { x: 320, y: 187 },
    { x: 360, y: 180 },
    { x: 420, y: 170 }
];

const simulatedDistance = 40;


/* =====================================================
   FLOW BUTTON
   ===================================================== */

flowButton.addEventListener("click", () => {

    if (flowRunning) {
        return;
    }

    startFlowSimulation();

});


/* =====================================================
   START FLOW
   ===================================================== */

function startFlowSimulation() {

    flowRunning = true;

    flowButton.disabled = true;

    flowButton.textContent =
        "색소 이동 중...";

    flowStartTime = performance.now();

    finalTime = 0;
    finalDistance = 0;
    finalSpeed = 0;

    dyeDot.setAttribute(
        "cx",
        flowPath[0].x
    );

    dyeDot.setAttribute(
        "cy",
        flowPath[0].y
    );


    animateFlow();

}


/* =====================================================
   FLOW ANIMATION
   ===================================================== */

function animateFlow() {

    const now = performance.now();

    const elapsed =
        (now - flowStartTime) / 1000;


    /*
       이동 시간 설정
       8초 동안 전체 경로 이동
    */

    const duration = 8;

    let progress =
        elapsed / duration;


    if (progress > 1) {
        progress = 1;
    }


    /*
       전체 경로에서 현재 위치 계산
    */

    const position =
        getPositionAlongPath(progress);


    dyeDot.setAttribute(
        "cx",
        position.x
    );

    dyeDot.setAttribute(
        "cy",
        position.y
    );


    /*
       이동 거리
    */

    finalDistance =
        simulatedDistance * progress;


    /*
       실제 측정 시간
    */

    finalTime = elapsed;


    /*
       속도 = 거리 / 시간
    */

    if (finalTime > 0) {

        finalSpeed =
            finalDistance / finalTime;

    } else {

        finalSpeed = 0;

    }


    /*
       화면 표시
    */

    timeValue.textContent =
        `${finalTime.toFixed(1)} s`;

    distanceValue.textContent =
        `${finalDistance.toFixed(1)} mm`;

    speedValue.textContent =
        `${finalSpeed.toFixed(2)} mm/s`;


    /*
       완료
    */

    if (progress >= 1) {

        finishFlowSimulation();

        return;
    }


    flowAnimationId =
        requestAnimationFrame(animateFlow);
}


/* =====================================================
   POSITION CALCULATION
   ===================================================== */

function getPositionAlongPath(progress) {

    const segments =
        flowPath.length - 1;

    const exactPosition =
        progress * segments;

    const index =
        Math.floor(exactPosition);

    const safeIndex =
        Math.min(index, segments - 1);

    const localProgress =
        exactPosition - safeIndex;

    const start =
        flowPath[safeIndex];

    const end =
        flowPath[safeIndex + 1];


    return {

        x:
            start.x +
            (end.x - start.x) *
            localProgress,

        y:
            start.y +
            (end.y - start.y) *
            localProgress

    };
}


/* =====================================================
   FINISH FLOW
   ===================================================== */

function finishFlowSimulation() {

    flowRunning = false;

    if (flowAnimationId) {

        cancelAnimationFrame(
            flowAnimationId
        );

    }


    /*
       최종값 보정
    */

    finalTime = 8.0;

    finalDistance = simulatedDistance;

    finalSpeed =
        finalDistance / finalTime;


    timeValue.textContent =
        `${finalTime.toFixed(1)} s`;

    distanceValue.textContent =
        `${finalDistance.toFixed(1)} mm`;

    speedValue.textContent =
        `${finalSpeed.toFixed(2)} mm/s`;


    flowButton.disabled = false;

    flowButton.textContent =
        "다시 측정하기";


    updateFinalResults();
}


/* =====================================================
   FINAL RESULTS
   ===================================================== */

function updateFinalResults() {

    if (finalDistanceText) {

        finalDistanceText.textContent =
            `${finalDistance.toFixed(1)} mm`;

    }

    if (finalTimeText) {

        finalTimeText.textContent =
            `${finalTime.toFixed(1)} s`;

    }

    if (finalSpeedText) {

        finalSpeedText.textContent =
            `${finalSpeed.toFixed(2)} mm/s`;

    }
}


/* =====================================================
   RESET
   ===================================================== */

function resetSimulation() {

    /*
       Step 초기화
    */

    currentStep = 1;


    /*
       탈세포화 초기화
    */

    decellProgress = 0;
    decellRunning = false;

    decellBar.style.width = "0%";
    decellPercent.textContent = "0%";

    decellStatus.textContent =
        "탈세포화를 시작해주세요.";

    decellButton.disabled = false;

    decellButton.textContent =
        "탈세포화 시작";


    /*
       잎 색상 초기화
    */

    decellBody.style.fill =
        "#6f9f63";

    decellBody.style.opacity =
        "1";


    /*
       색소 이동 초기화
    */

    flowRunning = false;

    if (flowAnimationId) {

        cancelAnimationFrame(
            flowAnimationId
        );

    }

    dyeDot.setAttribute(
        "cx",
        flowPath[0].x
    );

    dyeDot.setAttribute(
        "cy",
        flowPath[0].y
    );


    finalTime = 0;
    finalDistance = 0;
    finalSpeed = 0;


    timeValue.textContent =
        "0.0 s";

    distanceValue.textContent =
        "0.0 mm";

    speedValue.textContent =
        "0.0 mm/s";


    flowButton.disabled = false;

    flowButton.textContent =
        "색소 이동 시작";


    updateFinalResults();

    updateStep();

}


/* =====================================================
   INITIALIZE
   ===================================================== */

updateStep();
