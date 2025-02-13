const backgroundMusic = document.getElementById("backgroundMusic");

// Hàm để phát nhạc nền
function playMusic() {
    localStorage.setItem("musicPlaying", "true");
    backgroundMusic.play().catch(error => {
        console.log("Âm thanh không thể phát:", error);
    });
}

// Lưu thời gian âm thanh khi nhấn nút "Em đồng ý"
function saveCurrentTime() {
    localStorage.setItem("musicCurrentTime", backgroundMusic.currentTime);
}

// Hàm khởi tạo nhạc nền khi trang được tải
function initializeMusic() {
    if (localStorage.getItem("musicPlaying") === "true") {
        backgroundMusic.currentTime = parseFloat(localStorage.getItem("musicCurrentTime")) || 0;
        backgroundMusic.play().catch(error => {
            console.log("Âm thanh không thể phát:", error);
        });
    }
}

// Xử lý khi nhấn nút "Em đồng ý"
document.getElementById("yes-btn")?.addEventListener("click", () => {
    saveCurrentTime(); // Lưu thời gian hiện tại
    playMusic();
    window.location.href = 'yay.html'; // Chuyển đến trang mới
});

// Xử lý khi nhấn nút "Không"
let noClicks = 0; 
const maxNoClicks = 4;
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1; 
const gifElement = document.getElementById("togepi-gif");
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const buttonContainer = document.querySelector(".btn-container");
const yesButtonStyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth);

const gifs = [
    "assets/images/togepi-happy.gif", 
    "assets/images/togepi-sad-1.gif", 
    "assets/images/togepi-sad-2.gif", 
    "assets/images/togepi-crying.gif"
];
const buttonMessages = [
    "Em chắc chứ??", 
    "Đồng ý đi mà...", 
    "Chọn đồng ý khó khăn với em thế sao?", 
    "Em nỡ làm thế với anh sao!"
];

// Xử lý nhấn nút "Không"
noButton?.addEventListener("click", () => {
    if (noClicks < maxNoClicks) {
        gifElement.src = gifs[noClicks];
    }

    noButton.textContent = buttonMessages[noClicks % maxNoClicks];

    noButton.style.width = 'auto';
    noButton.style.width = `${noButton.scrollWidth}px`;

    if (noScale > minNoScale) {
        noScale -= 0.1;
        noButton.style.transform = `scale(${noScale})`;
    }

    const baseWidth = parseFloat(yesButtonStyle.width);
    const scaledWidth = baseWidth * yesScale; 

    if (scaledWidth < maxYesWidth) {
        yesScale += 0.5; 
        yesButton.style.transform = `scale(${yesScale})`;

        const rootStyles = getComputedStyle(document.documentElement);
        const gapScaleFactor = parseFloat(rootStyles.getPropertyValue("--gap-scale-factor")) || 250;

        const currentGap = parseFloat(buttonContainer.style.gap) || 20;
        const newGap = Math.sqrt(currentGap * gapScaleFactor);
        buttonContainer.style.gap = `${newGap}px`;
    }

    noClicks++;
});

// Khởi tạo nhạc nền khi trang được tải
window.onload = initializeMusic;