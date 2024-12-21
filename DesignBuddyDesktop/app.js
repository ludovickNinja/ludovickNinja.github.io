document.addEventListener("DOMContentLoaded", () => {
  // Dynamic Tab Creation
  const tabsData = [
    { id: "stone-count-full-eternity", title: "Stone Count: Full Eternity", content: "Add functionality here..." },
    { id: "stone-count-halo", title: "Stone Count: Halos", content: "Add functionality here..." },
    {
      id: "stone-count-hidden-halo",
      title: "Stone Count: Hidden Halos",
      content: `
        <div class="halo-calculator">
          <div class="input-section">
            <label for="center-shape">Select Center Stone Shape:</label>
            <select id="center-shape">
              <option value="round">Round</option>
              <option value="oval">Oval</option>
              <option value="cushion">Cushion</option>
              <option value="princess">Princess</option>
              <option value="emerald">Emerald</option>
              <option value="pear">Pear</option>
              <option value="marquise">Marquise</option>
            </select>

            <label for="width">Width of Center Stone (mm):</label>
            <input type="number" id="width" placeholder="e.g., 5.00" />

            <label for="length" id="length-label" style="display: none;">Length of Center Stone (mm):</label>
            <input type="number" id="length" placeholder="e.g., 7.00" style="display: none;" />

            <label for="stone-size">Diameter of Stones (mm):</label>
            <input type="number" id="stone-size" placeholder="e.g., 1.50" />

            <label for="spacing">Spacing Between Stones (mm):</label>
            <input type="number" id="spacing" placeholder="e.g., 0.20" />
          </div>

          <div class="output-section">
            <label for="total-stones">Total Stones Needed for Hidden Halo:</label>
            <input type="text" id="total-stones" readonly placeholder="0" />

            <small>Formula: Total Stones = Perimeter ÷ (Stone Diameter + Spacing)</small>
          </div>
        </div>
      `
    },
    {
      id: "weight-conversion",
      title: "Weight Conversion",
      content: `
        <div class="conversion-container">
          <div class="converter">
            <label for="known-material">Material of Known Weight:</label>
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
            <label for="target-material">Material to Convert To:</label>
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
            <input type="text" id="converted-weight" readonly placeholder="Converted weight">
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

  // Hidden Halo Calculation Logic
  const shapeSelect = document.getElementById("center-shape");
  const widthInput = document.getElementById("width");
  const lengthInput = document.getElementById("length");
  const lengthLabel = document.getElementById("length-label");
  const stoneSizeInput = document.getElementById("stone-size");
  const spacingInput = document.getElementById("spacing");
  const totalStonesOutput = document.getElementById("total-stones");

  shapeSelect?.addEventListener("change", () => {
    if (shapeSelect.value === "round") {
      lengthInput.style.display = "none";
      lengthLabel.style.display = "none";
    } else {
      lengthInput.style.display = "block";
      lengthLabel.style.display = "block";
    }
  });

  const calculateHiddenHalo = () => {
    const shape = shapeSelect.value;
    const width = parseFloat(widthInput.value) || 0;
    const length = parseFloat(lengthInput.value) || 0;
    const stoneSize = parseFloat(stoneSizeInput.value) || 0;
    const spacing = parseFloat(spacingInput.value) || 0;

    if (stoneSize <= 0 || spacing < 0 || width <= 0 || (length <= 0 && shape !== "round")) {
      totalStonesOutput.value = "Invalid Inputs";
      return;
    }

    let perimeter = 0;
    if (shape === "round") {
      perimeter = Math.PI * width;
    } else if (["oval", "pear", "marquise"].includes(shape)) {
      perimeter = Math.PI * ((width + length) / 2);
    } else {
      perimeter = 2 * (width + length);
    }

    const totalStones = Math.floor(perimeter / (stoneSize + spacing));
    totalStonesOutput.value = totalStones;
  };

  widthInput?.addEventListener("input", calculateHiddenHalo);
  lengthInput?.addEventListener("input", calculateHiddenHalo);
  stoneSizeInput?.addEventListener("input", calculateHiddenHalo);
  spacingInput?.addEventListener("input", calculateHiddenHalo);

  // Weight Conversion Logic
  const knownWeightInput = document.getElementById("known-weight");
  const knownMaterialSelect = document.getElementById("known-material");
  const targetMaterialSelect = document.getElementById("target-material");
  const convertedWeightInput = document.getElementById("converted-weight");

  const calculateWeightConversion = () => {
    const knownWeight = parseFloat(knownWeightInput.value);
    const knownDensity = parseFloat(knownMaterialSelect.value);
    const targetDensity = parseFloat(targetMaterialSelect.value);

    if (!isNaN(knownWeight) && !isNaN(knownDensity) && !isNaN(targetDensity) && knownDensity > 0) {
      const convertedWeight = (knownWeight * targetDensity) / knownDensity;
      convertedWeightInput.value = convertedWeight.toFixed(2);
    } else {
      convertedWeightInput.value = "Invalid Inputs";
    }
  };

  knownWeightInput?.addEventListener("input", calculateWeightConversion);
  knownMaterialSelect?.addEventListener("change", calculateWeightConversion);
  targetMaterialSelect?.addEventListener("change", calculateWeightConversion);
});