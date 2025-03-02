const featureTag = document.querySelectorAll(".feature");
const featureSection = document.querySelectorAll(".feature-section");

const sections = featureTag.forEach((tag, index) => {
  tag.addEventListener("click", function () {
    featureSection[index].scrollIntoView({ behavior: "smooth" });
  });
});
