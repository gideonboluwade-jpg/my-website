document.querySelectorAll(".page-link").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        document.body.classList.add("page-exit");
        setTimeout(() => { window.location.href = this.href; }, 500);
    });
});

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const sendButton = contactForm.querySelector("button");
        const message = document.getElementById("form-message");

        sendButton.textContent = "Sending...";
        sendButton.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: new FormData(contactForm)
            });

            const result = await response.json();

            if (result.success) {
                message.textContent = "Message sent successfully! ✅";
                message.style.color = "#00ff88";
                contactForm.reset();
            } else {
                message.textContent = "Message failed to send ❌";
                message.style.color = "#ff6b6b";
            }
        } catch (error) {
            message.textContent = "Something went wrong ❌";
            message.style.color = "#ff6b6b";
        }

        sendButton.textContent = "Send Message";
        sendButton.disabled = false;
    });
}