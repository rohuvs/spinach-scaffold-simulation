/* =====================================================
   SPINACH VASCULAR SCAFFOLD
   INTERACTIVE RESEARCH SIMULATION
===================================================== */


/* =====================================================
   GLOBAL STATE
===================================================== */

let currentStep = 1;

const totalSteps = 5;


/* Decellularization */

let decellRunning = false;

let decellProgress = 0;

let decellTimer = null;


/* Flow */

let flowRunning = false;

let flowStartTime = 0;

let flowAnimation = null;

let flowElapsed = 0;

let flowDistance = 0;

let flowSpeed = 0;


/*
   Educational model parameters.

   These are NOT experimental measurements.
*/

const MODEL = {

    flowDuration: 10,

    totalDistance: 42,

    flowRate: 1.0,

    branches: 7

};


/* =====================================================
   DOM
===================================================== */

const pages =
    document.querySelectorAll(".page");


const progressSteps =
    document.querySelectorAll(".progress-step");


const progressValue =
    document.getElementById("progressValue");


const previousButton =
    document.getElementById("previousButton");


const nextButton =
    document.getElementById("nextButton");


const currentStepText =
    document.getElementById("currentStep");


/* Decellularization */

const decellButton =
    document.getElementById("decellButton");


const decellBar =
    document.getElementById("decellBar");


const decellPercent =
    document.getElementById("decellPercent");


const decellStatus =
    document.getElementById("decellStatus");


const cellularLayer =
    document.getElementById("cellularLayer");


/* Flow */

const flowButton =
    document.getElementById("flowButton");


const particles =
    document.getElementById("particles");


const flowTime =
    document.getElementById("flowTime");


const flowDistance =
    document.getElementById("flowDistance");


const flowSpeedElement =
    document.getElementById("flowSpeed");


const flowRate =
    document.getElementById("flowRate");


/* Final results */

const resultDistance =
    document.getElementById("resultDistance");


const resultTime =
    document.getElementById("resultTime");


const resultSpeed =
    document.getElementById("resultSpeed");


/* =====================================================
   STEP NAVIGATION
===================================================== */

function updateStep() {

    pages.forEach((page, index) => {

        page.classList.toggle(
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


    const progress =
        ((currentStep - 1) /
        (totalSteps - 1)) * 100;


    progressValue.style.width =
        `${progress}%`;


    currentStepText.textContent =
        String(currentStep).padStart(2, "0");


    previousButton.disabled =
        currentStep === 1;


    if (currentStep === totalSteps) {

        nextButton.textContent =
            "처음으로 ↻";

    } else {

        nextButton.textContent =
            "다음 단계 →";

    }


    /*
       When entering Step 5,
       update final data.
    */

    updateResults();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   NEXT
===================================================== */

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


/* =====================================================
   PREVIOUS
===================================================== */

previousButton.addEventListener(
    "click",
    () => {

        if (currentStep > 1) {

            currentStep--;

            updateStep();

        }

    }
);


/* =====================================================
   PROGRESS BUTTONS
===================================================== */

progressSteps.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    Number(
                        button.dataset.step
                    );


                /*
                   Only allow navigation
                   to the current or completed
                   stage.
                */

                if (target <= currentStep) {

                    currentStep =
                        target;

                    updateStep();

                }

            }
        );

    }
);


/* =====================================================
   DECELLULARIZATION
===================================================== */

decellButton.addEventListener(
    "click",
    startDecellularization
);


function startDecellularization() {

    if (decellRunning) {
        return;
    }


    decellRunning = true;

    decellProgress = 0;


    decellButton.disabled = true;

    decellButton.textContent =
        "탈세포화 진행 중...";


    decellStatus.textContent =
        "계면활성제 처리 모델을 시작합니다.";


    runDecellularization();

}


function runDecellularization() {

    decellProgress += 1;


    decellBar.style.width =
        `${decellProgress}%`;


    decellPercent.textContent =
        `${decellProgress}%`;


    /*
       Visual tissue removal
    */

    const remaining =
        1 -
        (decellProgress / 100);


    cellularLayer.style.opacity =
        Math.max(
            0.06,
            remaining
        );


    /*
       Change tissue color
       from green toward pale scaffold.
    */

    const green =
        Math.round(
            156 -
            decellProgress * 0.45
        );


    const red =
        Math.round(
            115 +
            decellProgress * 0.45
        );


    const blue =
        Math.round(
            103 +
            decellProgress * 0.52
        );


    cellularLayer.style.fill =
        `rgb(${red}, ${green}, ${blue})`;


    /*
       Scientific process messages
    */

    if (decellProgress < 15) {

        decellStatus.textContent =
            "용액이 식물 조직 내부로 확산되는 과정을 모델링합니다.";

    }

    else if (decellProgress < 35) {

        decellStatus.textContent =
            "세포막 및 세포 성분의 제거가 진행되고 있습니다.";

    }

    else if (decellProgress < 60) {

        decellStatus.textContent =
            "엽육 조직의 세포 성분이 점차 감소하고 있습니다.";

    }

    else if (decellProgress < 80) {

        decellStatus.textContent =
            "잎맥의 연결 구조가 상대적으로 드러나고 있습니다.";

    }

    else if (decellProgress < 100) {

        decellStatus.textContent =
            "탈세포화 모델이 종료 단계에 도달했습니다.";

    }

    else {

        decellStatus.textContent =
            "탈세포화 완료 — 잎맥 구조 분석 단계로 이동할 수 있습니다.";

    }


    /*
       Completion
    */

    if (decellProgress >= 100) {

        decellRunning = false;

        decellButton.disabled = false;

        decellButton.textContent =
            "탈세포화 다시 실행";

        return;

    }


    decellTimer =
        setTimeout(
            runDecellularization,
            55
        );

}


/* =====================================================
   FLOW NETWORK
===================================================== */


/*
   Each branch is represented by
   an SVG path.

   This is intentionally a network,
   not a single straight line.
*/

const flowPaths = [

    {
        id: "flowMain",
        weight: 1.0
    },

    {
        id: "branchA",
        weight: 0.55
    },

    {
        id: "branchB",
        weight: 0.50
    },

    {
        id: "branchC",
        weight: 0.45
    },

    {
        id: "branchD",
        weight: 0.40
    },

    {
        id: "branchE",
        weight: 0.42
    },

    {
        id: "branchF",
        weight: 0.38
    },

    {
        id: "branchG",
        weight: 0.34
    }

];


/* =====================================================
   CREATE PARTICLE
===================================================== */

function createParticle(
    pathElement,
    delay,
    size
) {

    const circle =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );


    circle.setAttribute(
        "r",
        size
    );


    circle.classList.add(
        "dye-particle"
    );


    particles.appendChild(circle);


    animateParticle(
        circle,
        pathElement,
        delay
    );

}


/* =====================================================
   PARTICLE ANIMATION
===================================================== */

function animateParticle(
    particle,
    pathElement,
    delay
) {

    const pathLength =
        pathElement.getTotalLength();


    const startTime =
        performance.now() +
        delay;


    const duration =
        5000 +
        Math.random() * 2500;


    function frame(now) {

        if (!flowRunning) {
            return;
        }


        if (now < startTime) {

            requestAnimationFrame(frame);

            return;

        }


        let progress =
            (now - startTime) /
            duration;


        /*
           Repeat particle
           continuously.
        */

        if (progress > 1) {

            progress =
                progress - 1;

        }


        const point =
            pathElement.getPointAtLength(
                progress * pathLength
            );


        particle.setAttribute(
            "cx",
            point.x
        );


        particle.setAttribute(
            "cy",
            point.y
        );


        requestAnimationFrame(frame);

    }


    requestAnimationFrame(frame);

}


/* =====================================================
   START FLOW
===================================================== */

flowButton.addEventListener(
    "click",
    startFlow
);


function startFlow() {

    if (flowRunning) {
        return;
    }


    flowRunning = true;

    flowStartTime =
        performance.now();


    flowElapsed = 0;

    flowDistance = 0;

    flowSpeed = 0;


    flowButton.disabled = true;

    flowButton.textContent =
        "관류 진행 중...";


    particles.innerHTML = "";


    /*
       Obtain SVG paths.
    */

    const pathElements =
        flowPaths
            .map(
                item =>
                    document.getElementById(
                        item.id
                    )
            )
            .filter(Boolean);


    /*
       Create multiple particles
       on each branch.
    */

    pathElements.forEach(
        (path, index) => {

            const particleCount =
                index === 0
                    ? 5
                    : 3;


            for (
                let i = 0;
                i < particleCount;
                i++
            ) {

                createParticle(
                    path,
                    i * 450 + index * 160,
                    index === 0 ? 4.2 : 3.5
                );

            }

        }
    );


    updateFlow();

}


/* =====================================================
   FLOW DATA
===================================================== */

function updateFlow() {

    if (!flowRunning) {
        return;
    }


    const now =
        performance.now();


    flowElapsed =
        (now - flowStartTime) /
        1000;


    /*
       Cap the simulation at 10 seconds.
    */

    const progress =
        Math.min(
            flowElapsed /
            MODEL.flowDuration,
            1
        );


    /*
       Model distance.

       This is an educational
       simulation value, not a
       measurement from a real leaf.
    */

    flowDistance =
        MODEL.totalDistance *
        progress;


    /*
       v = d / t
    */

    if (flowElapsed > 0) {

        flowSpeed =
            flowDistance /
            flowElapsed;

    } else {

        flowSpeed = 0;

    }


    /*
       Update UI
    */

    flowTime.textContent =
        flowElapsed.toFixed(1);


    flowDistanceElement(
        flowDistance
    );


    flowSpeedElement.textContent =
        flowSpeed.toFixed(2);


    if (progress >= 1) {

        finishFlow();

        return;

    }


    flowAnimation =
        requestAnimationFrame(
            updateFlow
        );

}


/* =====================================================
   DISTANCE DISPLAY
===================================================== */

function flowDistanceElement(
    value
) {

    flowDistanceElementValue =
        value;


    flowDistance.textContent =
        value.toFixed(1);

}


/*
   Keep a separate numeric state
   in case the UI is reset.
*/

let flowDistanceElementValue = 0;


/* =====================================================
   FINISH FLOW
===================================================== */

function finishFlow() {

    flowRunning = false;


    if (flowAnimation) {

        cancelAnimationFrame(
            flowAnimation
        );

    }


    flowElapsed =
        MODEL.flowDuration;


    flowDistance =
        MODEL.totalDistance;


    flowSpeed =
        MODEL.totalDistance /
        MODEL.flowDuration;


    flowTime.textContent =
        flowElapsed.toFixed(1);


    flowDistance.textContent =
        flowDistance.toFixed(1);


    flowSpeedElement.textContent =
        flowSpeed.toFixed(2);


    flowButton.disabled = false;

    flowButton.textContent =
        "관류 다시 실행";


    updateResults();

}


/* =====================================================
   RESULTS
===================================================== */

function updateResults() {

    if (resultDistance) {

        resultDistance.textContent =
            flowDistance.toFixed(1);

    }


    if (resultTime) {

        resultTime.textContent =
            flowElapsed.toFixed(1);

    }


    if (resultSpeed) {

        resultSpeed.textContent =
            flowSpeed.toFixed(2);

    }

}


/* =====================================================
   RESET
===================================================== */

function resetSimulation() {

    /*
       Stop decellularization
    */

    if (decellTimer) {

        clearTimeout(
            decellTimer
        );

    }


    decellRunning = false;

    decellProgress = 0;


    decellBar.style.width =
        "0%";


    decellPercent.textContent =
        "0%";


    decellStatus.textContent =
        "대기 중 — 탈세포화를 시작하세요.";


    decellButton.disabled = false;

    decellButton.textContent =
        "탈세포화 시작";


    cellularLayer.style.opacity =
        "1";


    cellularLayer.style.fill =
        "#737c67";


    /*
       Stop flow
    */

    flowRunning = false;


    if (flowAnimation) {

        cancelAnimationFrame(
            flowAnimation
        );

    }


    particles.innerHTML = "";


    flowElapsed = 0;

    flowDistance = 0;

    flowSpeed = 0;


    flowTime.textContent =
        "0.0";


    flowDistance.textContent =
        "0.0";


    flowSpeedElement.textContent =
        "0.00";


    flowButton.disabled = false;

    flowButton.textContent =
        "관류 시작";


    updateResults();


    /*
       Return to Step 1
    */

    currentStep = 1;

    updateStep();

}


/* =====================================================
   INITIALIZE
===================================================== */

flowRate.textContent =
    MODEL.flowRate.toFixed(2);


updateStep();
