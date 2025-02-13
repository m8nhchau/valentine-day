let noClicks = 1;
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

const gifs = ["assets/images/togepi-happy.gif", "assets/images/togepi-sad-1.gif", "assets/images/togepi-sad-2.gif", "assets/images/togepi-crying.gif"];

const buttonMessages = ["Em chắc chứ??", "Đồng ý đi mà...", "Chọn đồng ý khó khăn với em thế sao?", "Em nỡ làm thế với anh sao!"];

noButton.addEventListener("click", () => {
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

    console.log(`Scaled Width: ${scaledWidth}, Max Width: ${maxYesWidth}`);

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
