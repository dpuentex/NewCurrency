const welcomePage_header = document.querySelector(".welcomePage_footer");
const cookie_message = document.createElement("div");
cookie_message.classList.add("cookie-message");
cookie_message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>`;
welcomePage_header.append(cookie_message);

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    cookie_message.remove();
  });
