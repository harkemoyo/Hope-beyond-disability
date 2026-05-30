document.addEventListener("DOMContentLoaded", () => {
    const loginOverlay = document.getElementById("loginOverlay");
    const dashboardApp = document.getElementById("dashboardApp");
    const loginBtn = document.getElementById("loginBtn");
    const adminCodeInput = document.getElementById("adminCodeInput");
    const loginError = document.getElementById("loginError");

    const VALID_ADMIN_CODE = "1234";

    // Handle Login
    loginBtn.addEventListener("click", () => {
        const code = adminCodeInput.value.trim();
        if (code === VALID_ADMIN_CODE) {
            loginOverlay.classList.add("hidden");
            dashboardApp.classList.remove("hidden");
        } else {
            loginError.style.display = "block";
        }
    });

    // Handle enter key in input
    adminCodeInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            loginBtn.click();
        }
    });
});

// Handle Verify Button Click
function verifyDonation(buttonElement) {
    // Find the row
    const row = buttonElement.closest("tr");
    
    // Change Status Badge
    const statusBadge = row.querySelector(".status-badge");
    statusBadge.classList.remove("status-badge--pending");
    statusBadge.classList.add("status-badge--verified");
    statusBadge.textContent = "Verified";

    // Update Button
    buttonElement.classList.remove("action-btn--verify");
    buttonElement.classList.add("action-btn--disabled");
    buttonElement.disabled = true;
    buttonElement.textContent = "Verified";
    
    // Update pending count (demo logic)
    const pendingStat = document.querySelector(".stat-value.text-red");
    let currentPending = parseInt(pendingStat.textContent);
    if(currentPending > 0) {
        pendingStat.textContent = currentPending - 1;
        if(currentPending - 1 === 0) {
            pendingStat.classList.remove("text-red");
            pendingStat.style.color = "var(--success-green)";
        }
    }
}
