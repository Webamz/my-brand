document.addEventListener("DOMContentLoaded", function () {});

const createQuerry = async (
  firstname,
  lastname,
  email,
  mobile,
  message,
  review
) => {
  try {
    const response = await fetch(
      "https://my-brand-backend-tfnq.onrender.com/api/v1/querries/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          mobile: mobile,
          message: message,
          review: review,
        }),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      console.log("Message sent successfully:", responseData);
      return responseData;
    } else {
      throw new Error("Failed to sent message");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const mobile = document.getElementById("mobile").value;
  const review = "Not yet";

  try {
    await createQuerry(firstname, lastname, email, mobile, message, review);
    alert("Message sent successfully!");
    contactForm.reset();
  } catch (error) {
    alert("Failed to send message. Please try again.");
    console.error("Error creating message:", error);
  }
});
