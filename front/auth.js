// Check if logged in when loading protected pages
if (
  window.location.pathname.includes("groups.html") ||
  window.location.pathname.includes("dashboard.html")
) {
  if (!localStorage.getItem("currentUser")) {
    alert("Please log in first.");
    window.location.href = "login.html";
  }
}

// Handle Registration
if (document.getElementById("register-form")) {
  document.getElementById("register-form").addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (!email.endsWith(".edu")) {
      alert("Only .edu emails are allowed.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.email === email)) {
      alert("Email already registered.");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please log in.");
    window.location.href = "login.html";
  });
}

// Handle Login
if (document.getElementById("login-form")) {
  document.getElementById("login-form").addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid credentials.");
      return;
    }

    localStorage.setItem("currentUser", email);
    alert("Login successful.");
    window.location.href = "dashboard.html";
  });
}
