// Function to hide error message while typing
function validateField(field, errorId) {
    const value = field.value.trim();
    const errorMessage = document.getElementById(errorId);
    if (value !== "" && errorMessage) {
        errorMessage.style.display = "none";
    }
}

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Elements Selection
    const first = document.getElementById("fname");
    const last = document.getElementById("lname");
    const email = document.getElementById("Email");
    const msg = document.getElementById("Msg");
    const checkbox = document.getElementById("agree");
    const radioChecked = document.querySelector('input[name="opt"]:checked');

    // Error Message Elements
    const statuserr = document.getElementById("status");
    const checkerr = document.getElementById("checkErr");

    // Validation Patterns
    const namePattern = /^[A-Za-z]{2,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const msgPattern = /^.{5,}$/;

    // 1. First Name Validation
    if (!namePattern.test(first.value.trim())) {
        document.getElementById("first").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("first").style.display = "none";
    }

    // 2. Last Name Validation
    if (last.value.trim() === "") {
        document.getElementById("last").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("last").style.display = "none";
    }

    // 3. Email Validation
    if (!emailPattern.test(email.value.trim())) {
        document.getElementById("emails").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("emails").style.display = "none";
        email.classList.remove("error-border");
    }
    // 4. Radio Validation
    if (!radioChecked) {
        statuserr.setAttribute("style", "display: block !important;");
        isValid = false;
    } else {
        statuserr.style.display = "none";
    }

    // 6. Checkbox Validation
    if (!checkbox.checked) {
        checkerr.setAttribute("style", "display: block !important; color: red !important; visibility: visible !important; opacity: 1 !important;");
        isValid = false;
    } else {
        checkerr.style.display = "none";
    }

    // 5. Message Validation
    if (!msgPattern.test(msg.value.trim())) {
        document.getElementById("msgs").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("msgs").style.display = "none";
    }

    // Stop form submission if any field is invalid
    if (!isValid) return;

    // If all valid, send via EmailJS
    emailjs.sendForm("service_c3a2rqb", "template_etzy8ni", form, "NPWjUn3mKRemBUG5N")
        .then(() => {
            showToast();
            form.reset();
            // Reset borders if any manual styles were applied
            document.querySelectorAll('.error-message, .radio-error, .boxerror').forEach(el => el.style.display = 'none');
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
        });
});

// Event Listeners for hiding error on input
document.querySelectorAll("input[type='text'], input[type='email'], textarea").forEach(field => {
    field.addEventListener("input", () => {
        const errorId = field.getAttribute("data-error");
        if (errorId) validateField(field, errorId);
    });
});

// Radio & Checkbox change listeners to hide error immediately
document.querySelectorAll('input[name="opt"]').forEach(radio => {
    radio.addEventListener("change", () => {
        document.getElementById("status").style.display = "none";
    });
});

document.getElementById("agree").addEventListener("change", (e) => {
    if (e.target.checked) {
        document.getElementById("checkErr").style.display = "none";
    }
});

// Toast Notification Function
function showToast() {
    const toast = document.getElementById("toast");
    toast.style.display = "flex";
    toast.style.flexDirection = "column";
    setTimeout(() => {
        toast.style.display = "none";
    }, 2000);
}