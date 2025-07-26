document.addEventListener("DOMContentLoaded", () => {
    // Function to update navigation visibility
    function updateNavVisibility() {
        const currentUser = localStorage.getItem("currentUser");
        const loginLinkLi = document.querySelector('nav a[href="login.html"]:not([title="Logout"])')?.parentElement; // Target <li> for Login
        const registerLinkLi = document.querySelector('nav a[href="register.html"]')?.parentElement; // Target <li> for Register
        const logoutLinkLi = document.querySelector('nav a[title="Logout"]')?.parentElement; // Target <li> for Logout

        if (currentUser) {
            // User is signed in
            if (loginLinkLi) loginLinkLi.style.display = 'none';
            if (registerLinkLi) registerLinkLi.style.display = 'none';
            if (logoutLinkLi) logoutLinkLi.style.display = 'block'; // Ensure Logout is visible
        } else {
            // User is NOT signed in
            if (loginLinkLi) loginLinkLi.style.display = 'block'; // Ensure Login is visible
            if (registerLinkLi) registerLinkLi.style.display = 'block'; // Ensure Register is visible
            if (logoutLinkLi) logoutLinkLi.style.display = 'none'; // Ensure Logout is hidden
        }
    }

    // Attach Logout Event Listener (important to do this only once)
    const logoutAnchor = document.querySelector('nav a[title="Logout"]');
    if (logoutAnchor) {
        logoutAnchor.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            localStorage.removeItem("currentUser");
            localStorage.removeItem("joinedGroups"); // Clear joined groups on logout
            sessionStorage.removeItem("createdGroups"); // Clear created groups on logout

            alert("You have been logged out.");
            window.location.href = "index.html"; // Redirect to home page after logout

            // After redirect, updateNavVisibility will run again on the new page load
            // but we can call it here for immediate visual feedback if not redirecting
            // updateNavVisibility(); // This would be called if not redirecting
        });
    }

    // Initial call to set navigation visibility when page loads
    updateNavVisibility();
});