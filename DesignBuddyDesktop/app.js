// JavaScript for Tab Navigation
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabs li");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      tabs.forEach(item => item.classList.remove("active"));

      // Hide all tab contents
      tabContents.forEach(content => content.classList.remove("active"));

      // Add active class to the clicked tab
      tab.classList.add("active");

      // Show the corresponding tab content
      const target = tab.getAttribute("data-tab");
      document.getElementById(target).classList.add("active");
    });
  });
});
