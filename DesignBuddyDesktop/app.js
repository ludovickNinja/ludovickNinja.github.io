document.addEventListener("DOMContentLoaded", () => {
  // Dynamic Tab Creation
  const tabsData = [
    { id: "stone-count-full-eternity", title: "Stone Count: Full Eternity", content: "Add functionality here..." },
    { id: "stone-count-halo", title: "Stone Count: Halos", content: "Add functionality here..." },
    { id: "stone-count-hidden-halo", title: "Stone Count: Hidden Halos", content: "Add functionality here..." },
    {
      id: "weight-conversion",
      title: "Weight Conversion",
      content: `
        <div class="conversion-container">
          <div class="converter">
            <label for="known-material" title="Select the material of the object's current weight">Material of Known Weight:</label>
            <select id="known-material">
              <option value="0.01932">Gold (24K)</option>
              <option value="0.01762">Gold (22K)</option>
              <option value="0.0173">Gold (19K Super White)</option>
              <option value="0.016">Gold (18K Palladium White)</option>
              <option value="0.0155">Gold (18K)</option>
              <option value="0.0135">Gold (14K)</option>
              <option value="0.0117">Gold (10K)</option>
              <option value="0.01049">Fine Silver</option>
              <option value="0.01036">Sterling Silver</option>
              <option value="0.022">Platinum</option>
              <option value="0.01202">Palladium 950</option>
              <option value="0.00092">Wax</option>
              <option value="0.008">316L Stainless Steel</option>
            </select>
            <label for="known-weight">Enter Known Weight (grams):</label>
            <input type="number" id="known-weight" placeholder="Enter weight">
          </div>
          <div class="converter">
            <label for="target-material" title="Select the material to which you want to convert">Material to Convert To:</label>
            <select id="target-material">
              <option value="0.01932">Gold (24K)</option>
              <option value="0.01762">Gold (22K)</option>
              <option value="0.0173">Gold (19K Super White)</option>
              <option value="0.016">Gold (18K Palladium White)</option>
              <option value="0.0155">Gold (18K)</option>
              <option value="0.0135">Gold (14K)</option>
              <option value="0.0117">Gold (10K)</option>
              <option value="0.01049">Fine Silver</option>
              <option value="0.01036">Sterling Silver</option>
              <option value="0.022">Platinum</option>
              <option value="0.01202">Palladium 950</option>
              <option value="0.00092">Wax</option>
              <option value="0.008">316L Stainless Steel</option>
            </select>
            <label for="converted-weight">Converted Weight (grams):</label>
            <input type="text" id="converted-weight" placeholder="Converted weight" readonly>
          </div>
        </div>
      `
    },
  ];

  const tabsContainer = document.querySelector(".tabs");
  const contentContainer = document.querySelector(".content");

  tabsData.forEach((tab, index) => {
    // Create Tab
    const tabElement = document.createElement("li");
    tabElement.textContent = tab.title;
    tabElement.dataset.tab = tab.id;
    if (index === 0) tabElement.classList.add("active");
    tabsContainer.appendChild(tabElement);

    // Create Tab Content
    const sectionElement = document.createElement("section");
    sectionElement.id = tab.id;
    sectionElement.className = "tab-content";
    if (index === 0) sectionElement.classList.add("active");
    sectionElement.innerHTML = `<h3>${tab.title}</h3>${tab.content}`;
    contentContainer.appendChild(sectionElement);
  });

  // Tab Navigation
  const tabs = document.querySelectorAll(".tabs li");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(item => item.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.getAttribute("data-tab");
      document.getElementById(target).classList.add("active");
    });
  });

  // Weight Conversion Functionality
  const knownWeightInput = document.getElementById("known-weight");
  const knownMaterialSelect = document.getElementById("known-material");
  const targetMaterialSelect = document.getElementById("target-material");
  const convertedWeightInput = document.getElementById("converted-weight");

  function calculateWeightConversion() {
    const knownWeight = parseFloat(knownWeightInput.value);
    const knownDensity = parseFloat(knownMaterialSelect.value);
    const targetDensity = parseFloat(targetMaterialSelect.value);

    if (!isNaN(knownWeight) && !isNaN(knownDensity) && !isNaN(targetDensity) && knownDensity > 0) {
      const convertedWeight = (knownWeight * targetDensity) / knownDensity;
      convertedWeightInput.value = convertedWeight.toFixed(2);
    } else {
      convertedWeightInput.value = "";
    }
  }

  if (knownWeightInput) {
    knownWeightInput.addEventListener("input", calculateWeightConversion);
    knownMaterialSelect.addEventListener("change", calculateWeightConversion);
    targetMaterialSelect.addEventListener("change", calculateWeightConversion);
  }
});