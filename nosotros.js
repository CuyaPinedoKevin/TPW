
document.addEventListener("DOMContentLoaded", function() {
  
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.borderColor = "var(--primary-color)";
        });
        card.addEventListener("mouseleave", function() {
            this.style.borderColor = "var(--border-color)";
        });
    });
});
