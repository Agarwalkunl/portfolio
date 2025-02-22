(function () {
  emailjs.init(CONFIG.EMAILJS_USER_ID); // Use config.js values
})();

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const name = document.querySelector("input[name='name']").value;
    const email = document.querySelector("input[name='email']").value;
    const subject = document.querySelector("input[name='subject']").value;
    const message = document.querySelector("textarea[name='message']").value;

    // Prepare email parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
    };

    // Set loading state
    const loadingDiv = document.querySelector(".loading");
    const sentMessageDiv = document.querySelector(".sent-message");
    const errorMessageDiv = document.querySelector(".error-message");

    loadingDiv.style.display = "block";
    sentMessageDiv.style.display = "none";

    // Send email using EmailJS
    emailjs
      .send(
        CONFIG.EMAILJS_SERVICE_ID,
        CONFIG.EMAILJS_TEMPLATE_ID,
        templateParams
      )
      .then(
        function (response) {
          loadingDiv.style.display = "none";
          sentMessageDiv.style.display = "block";

          // Reset form
          document.getElementById("contactForm").reset();
        },
        function (error) {
          loadingDiv.style.display = "none";
          errorMessageDiv.textContent =
            "An error occurred. Please try again later.";
        }
      );
  });
