/* =========================================================
   시금치 잎 기반 인공 혈관 스캐폴드 시뮬레이션
   STEP 1 → 5 인터랙션 전체 제어
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    /* =====================================================
       BASIC ELEMENTS
    ===================================================== */
    const steps = Array.from(
        document.querySelectorAll(".experiment-step")
    );
    const progressSteps = Array.from(
        document.querySelectorAll(".progress-step")
    );
    const progressFill =
        document.querySelector(".progress-fill");
    const previousButton =
        document.querySelector("#previousStep");
    const nextButton =
        document.querySelector("#nextStep");
    const currentStepText =
        document.querySelector("#currentStep");
    let currentStep = 1;
    const TOTAL_STEPS = 5;
    /* =====================================================
       STEP NAVIGATION
    ===================================================== */
    function showStep(stepNumber) {
        currentStep = Math.max(
            1,
            Math.min(TOTAL_STEPS, stepNumber)
        );
        steps.forEach((step, index) => {
            step.classList.toggle(
                "active",
                index + 1 === currentStep
            );
        });
        progressSteps.forEach((step, index) => {
            const number = index + 1;
            step.classList.toggle(
                "active",
                number === currentStep
            );
            step.classList.toggle(
                "completed",
                number < currentStep
            );
        });
        const progress =
            ((currentStep - 1) /
                (TOTAL_STEPS - 1)) * 100;
        if (progressFill) {
            progressFill.style.width =
                `${progress}%`;
        }
        if (currentStepText) {
            currentStepText.textContent =
                `${String(currentStep).padStart(2, "0")} / 05`;
        }
        if (previousButton) {
            previousButton.disabled =
                currentStep === 1;
        }
        if (nextButton) {
            nextButton.disabled =
                currentStep === TOTAL_STEPS;
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        /*
         * 각 Step에 진입할 때 필요한 초기화
         */
        if (currentStep === 2) {
            resetDecellularization();
        }
        if (currentStep === 4) {
            resetFlowSimulation();
        }
        if (currentStep === 5) {
            updateFinalResults();
        }
    }
    progressSteps.forEach((button, index) => {
        button.addEventListener("click", () => {
            showStep(index + 1);
        });
    });
    if (previousButton) {
        previousButton.addEventListener(
            "click",
            () => showStep(currentStep - 1)
        );
    }
    if (nextButton) {
        nextButton.addEventListener(
            "click",
            () => showStep(currentStep + 1)
        );
    }
    /* =====================================================
       STEP 2
       DECELLULARIZATION SIMULATION
    ===================================================== */
    const decellButton =
        document.querySelector("#startDecellularization");
    const decellFill =
        document.querySelector("#decellFill");
    const decellPercent =
        document.querySelector("#decellPercent");
    const decellStatus =
        document.querySelector("#decellStatus");
    const decellLeaf =
        document.querySelector("#decellLeaf");
    let decellTimer = null;
    let decellProgress = 0;
    function resetDecellularization() {
        if (decellTimer) {
            clearInterval(decellTimer);
            decellTimer = null;
        }
        decellProgress = 0;
        if (decellFill) {
            decellFill.style.width = "0%";
        }
        if (decellPercent) {
            decellPercent.textContent = "0%";
        }
        if (decellStatus) {
            decellStatus.textContent =
                "READY — 처리 대기";
        }
        if (decellLeaf) {
            decellLeaf.style.filter =
                "saturate(1)";
            decellLeaf.style.opacity =
                "1";
        }
        if (decellButton) {
            decellButton.disabled = false;
            decellButton.textContent =
                "탈세포화 시작";
        }
    }
    function updateDecellularizationVisual() {
        /*
         * 실제 실험의 화학적 과정을
         * 시각적으로 단순화하여 표현한다.
         *
         * 진행:
         * 0–20% : 세포막과 세포 내용물에 접근
         * 20–50%: 세포막 파괴 및 세포 성분 제거
         * 50–80%: 잔여 유기물/지질 제거
         * 80–100%: 셀룰로오스 기반 구조 노출
         */
        const p = decellProgress;
        if (decellLeaf) {
            /*
             * 녹색이 점점 빠지는 효과
             */
            const saturation =
                Math.max(0, 1 - p / 100);
            const brightness =
                1 + (p / 100) * 0.15;
            decellLeaf.style.filter =
                `saturate(${saturation})
                 brightness(${brightness})`;
            /*
             * 100%에 가까워질수록
             * 반투명한 scaffold처럼 표현
             */
            if (p >= 85) {
                decellLeaf.style.opacity =
                    `${1 - ((p - 85) / 15) * 0.12`;
            }
        }
        if (decellStatus) {
            if (p < 20) {
                decellStatus.textContent =
                    "PHASE 01 — 세포막 접근";
            } else if (p < 50) {
                decellStatus.textContent =
                    "PHASE 02 — 세포 성분 제거";
            } else if (p < 80) {
                decellStatus.textContent =
                    "PHASE 03 — 잔여 유기물 제거";
            } else if (p < 100) {
                decellStatus.textContent =
                    "PHASE 04 — ECM 구조 노출";
            } else {
                decellStatus.textContent =
                    "COMPLETE — Cellulose scaffold";
            }
        }
    }
    function startDecellularization() {
        if (decellTimer) return;
        decellProgress = 0;
        if (decellButton) {
            decellButton.disabled = true;
            decellButton.textContent =
                "탈세포화 진행 중...";
        }
        decellTimer = setInterval(() => {
            /*
             * 너무 빠르지 않도록
             * 단계별 과정을 확인할 수 있게 한다.
             */
            decellProgress += 1;
            if (decellProgress > 100) {
                decellProgress = 100;
            }
            if (decellFill) {
                decellFill.style.width =
                    `${decellProgress}%`;
            }
            if (decellPercent) {
                decellPercent.textContent =
                    `${decellProgress}%`;
            }
            updateDecellularizationVisual();
            if (decellProgress >= 100) {
                clearInterval(decellTimer);
                decellTimer = null;
                if (decellButton) {
                    decellButton.disabled = false;
                    decellButton.textContent =
                        "다시 시뮬레이션";
                }
                if (decellStatus) {
                    decellStatus.textContent =
                        "COMPLETE — 탈세포화 완료";
                }
            }
        }, 55);
    }
    if (decellButton) {
        decellButton.addEventListener(
            "click",
            startDecellularization
        );
    }
    /* =====================================================
       STEP 4
       MICROFLUIDIC / DYE FLOW SIMULATION
    ===================================================== */
    const flowButton =
        document.querySelector("#startFlow");
    const flowStatus =
        document.querySelector("#flowStatus");
    const flowParticles =
        Array.from(
            document.querySelectorAll(".particle")
        );
    const distanceValue =
        document.querySelector("#distanceValue");
    const timeValue =
        document.querySelector("#timeValue");
    const velocityValue =
        document.querySelector("#velocityValue");
    const branchValue =
        document.querySelector("#branchValue");
    const flowProgress =
        document.querySelector("#flowProgress");
    let flowTimer = null;
    let flowStartTime = null;
    let flowRunning = false;
    let particleIndex = 0;
    /*
     * 실제 잎맥의 분지 네트워크를
     * 따라 움직이는 것처럼 보이도록
     * 여러 개의 경로를 사용한다.
     *
     * SVG path의 getPointAtLength()를 이용하여
     * particle이 경로를 따라 이동한다.
     */
    const flowPaths =
        Array.from(
            document.querySelectorAll(".flow-path")
        );
    function resetFlowSimulation() {
        if (flowTimer) {
            cancelAnimationFrame(flowTimer);
            flowTimer = null;
        }
        flowRunning = false;
        particleIndex = 0;
        flowParticles.forEach(
            particle => {
                particle.classList.remove(
                    "visible"
                );
                particle.style.opacity = "0";
            }
        );
        if (flowStatus) {
            flowStatus.textContent =
                "READY";
            flowStatus.classList.remove(
                "running"
            );
        }
        if (flowButton) {
            flowButton.disabled = false;
            flowButton.textContent =
                "색소 주입 시작";
        }
        if (distanceValue) {
            distanceValue.textContent =
                "0.0 mm";
        }
        if (timeValue) {
            timeValue.textContent =
                "0.0 s";
        }
        if (velocityValue) {
            velocityValue.textContent =
                "0.00 mm/s";
        }
        if (branchValue) {
            branchValue.textContent =
                "0";
        }
        if (flowProgress) {
            flowProgress.style.width =
                "0%";
        }
    }
    function getPathLength(path) {
        try {
            return path.getTotalLength();
        } catch (error) {
            return 1;
        }
    }
    function moveParticle(
        particle,
        path,
        progress
    ) {
        if (!particle || !path) return;
        const length =
            getPathLength(path);
        const point =
            path.getPointAtLength(
                length * progress
            );
        particle.setAttribute(
            "cx",
            point.x
        );
        particle.setAttribute(
            "cy",
            point.y
        );
    }
    function runFlowAnimation(timestamp) {
        if (!flowRunning) return;
        if (!flowStartTime) {
            flowStartTime = timestamp;
        }
        const elapsed =
            timestamp - flowStartTime;
        /*
         * 0~12초 동안 전체 네트워크를
         * 통과하는 시뮬레이션
         */
        const totalDuration = 12000;
        const overallProgress =
            Math.min(
                elapsed / totalDuration,
                1
            );
        /*
         * 각 경로마다 서로 다른 시작 지연을 둔다.
         * 이것 때문에 직선 하나가 아니라
         * 여러 분지에서 동시에 색소가 퍼지는
         * 형태로 보인다.
         */
        flowPaths.forEach(
            (path, pathIndex) => {
                const delay =
                    pathIndex * 0.045;
                const localProgress =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            (overallProgress - delay)
                            / (1 - delay)
                        )
                    );
                const particle =
                    flowParticles[
                        pathIndex %
                        flowParticles.length
                    ];
                if (
                    localProgress > 0 &&
                    localProgress < 1
                ) {
                    particle.classList.add(
                        "visible"
                    );
                    particle.style.opacity =
                        "0.95";
                    moveParticle(
                        particle,
                        path,
                        localProgress
                    );
                }
                if (
                    localProgress >= 1
                ) {
                    particle.style.opacity =
                        "0.55";
                }
            }
        );
        /*
         * 실험에서 측정되는 이동 거리와 시간
         * 예시 모델값
         *
         * 실제 실험에서는 스마트폰 영상이나
         * 자/눈금으로 측정한 값을 넣으면 된다.
         */
        const distance =
            42 * overallProgress;
        const time =
            elapsed / 1000;
        const velocity =
            time > 0
                ? distance / time
                : 0;
        if (distanceValue) {
            distanceValue.textContent =
                `${distance.toFixed(1)} mm`;
        }
        if (timeValue) {
            timeValue.textContent =
                `${time.toFixed(1)} s`;
        }
        if (velocityValue) {
            velocityValue.textContent =
                `${velocity.toFixed(2)} mm/s`;
        }
        /*
         * 분지 수가 점차 활성화되는 효과
         */
        const activeBranches =
            Math.min(
                12,
                Math.floor(
                    overallProgress * 12
                )
            );
        if (branchValue) {
            branchValue.textContent =
                activeBranches;
        }
        if (flowProgress) {
            flowProgress.style.width =
                `${overallProgress * 100}%`;
        }
        if (overallProgress >= 1) {
            flowRunning = false;
            flowTimer = null;
            if (flowStatus) {
                flowStatus.textContent =
                    "COMPLETE — 분지 네트워크 관류 완료";
                flowStatus.classList.remove(
                    "running"
                );
            }
            if (flowButton) {
                flowButton.disabled = false;
                flowButton.textContent =
                    "다시 시뮬레이션";
            }
            return;
        }
        flowTimer =
            requestAnimationFrame(
                runFlowAnimation
            );
    }
    function startFlowSimulation() {
        if (flowRunning) return;
        resetFlowSimulation();
        flowRunning = true;
        flowStartTime = null;
        if (flowStatus) {
            flowStatus.textContent =
                "RUNNING — 미세유체 관류 중";
            flowStatus.classList.add(
                "running"
            );
        }
        if (flowButton) {
            flowButton.disabled = true;
            flowButton.textContent =
                "관류 진행 중...";
        }
        flowTimer =
            requestAnimationFrame(
                runFlowAnimation
            );
    }
    if (flowButton) {
        flowButton.addEventListener(
            "click",
            startFlowSimulation
        );
    }
    /* =====================================================
       STEP 5
       RESULT ANALYSIS
    ===================================================== */
    const finalVelocity =
        document.querySelector("#finalVelocity");
    const finalBranches =
        document.querySelector("#finalBranches");
    const finalDistance =
        document.querySelector("#finalDistance");
    const finalTime =
        document.querySelector("#finalTime");
    function updateFinalResults() {
        /*
         * 기본 시뮬레이션 결과값
         *
         * 실제 실험 데이터를 넣고 싶다면
         * 아래 숫자만 수정하면 된다.
         */
        const result = {
            distance: 42.0,
            time: 12.0,
            velocity: 3.50,
            branches: 12
        };
        if (finalVelocity) {
            finalVelocity.textContent =
                `${result.velocity.toFixed(2)} mm/s`;
        }
        if (finalBranches) {
            finalBranches.textContent =
                result.branches;
        }
        if (finalDistance) {
            finalDistance.textContent =
                `${result.distance.toFixed(1)} mm`;
        }
        if (finalTime) {
            finalTime.textContent =
                `${result.time.toFixed(1)} s`;
        }
    }
    /* =====================================================
       OPTIONAL — DATA MODEL
       실험 데이터를 JS에서 관리할 수 있도록 구성
    ===================================================== */
    const experimentData = {
        specimen: {
            material: "Spinacia oleracea",
            scaffold: "Plant-derived cellulose",
            structure: "Leaf vascular network"
        },
        decellularization: {
            surfactant:
                "SDS / Triton X-100",
            target:
                "plant cellular components",
            remainingStructure:
                "cellulose-rich vascular scaffold"
        },
        perfusion: {
            model:
                "microfluidic perfusion",
            injection:
                "constant-flow concept",
            tracer:
                "food-grade dye"
        },
        analysis: {
            law:
                "Hagen–Poiseuille Law",
            branching:
                "Murray's Law",
            biomimicry:
                true
        }
    };
    /*
     * 브라우저 개발자 도구에서
     * experimentData를 확인할 수 있다.
     */
    window.experimentData =
        experimentData;
    /* =====================================================
       INITIAL STATE
    ===================================================== */
    showStep(1);
});
