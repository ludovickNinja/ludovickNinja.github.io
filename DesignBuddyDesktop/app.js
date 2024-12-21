document.addEventListener("DOMContentLoaded", () => {
  // JSON Data for Finger Sizes
  const fingerSizes = {
    BaseChart: [
        { "Size": 1.0, "Finished": 12.47 },
        { "Size": 1.25, "Finished": 12.67 },
        { "Size": 1.5, "Finished": 12.87 },
        { "Size": 1.75, "Finished": 13.07 },
        { "Size": 2.0, "Finished": 13.27 },
        { "Size": 2.25, "Finished": 13.47 },
        { "Size": 2.5, "Finished": 13.67 },
        { "Size": 2.75, "Finished": 13.87 },
        { "Size": 3.0, "Finished": 14.07 },
        { "Size": 3.25, "Finished": 14.27 },
        { "Size": 3.5, "Finished": 14.47 },
        { "Size": 3.75, "Finished": 14.68 },
        { "Size": 4.0, "Finished": 14.88 },
        { "Size": 4.25, "Finished": 15.08 },
        { "Size": 4.5, "Finished": 15.29 },
        { "Size": 4.75, "Finished": 15.49 },
        { "Size": 5.0, "Finished": 15.69 },
        { "Size": 5.25, "Finished": 15.9 },
        { "Size": 5.5, "Finished": 16.1 },
        { "Size": 5.75, "Finished": 16.3 },
        { "Size": 6.0, "Finished": 16.5 },
        { "Size": 6.25, "Finished": 16.71 },
        { "Size": 6.5, "Finished": 16.91 },
        { "Size": 6.75, "Finished": 17.11 },
        { "Size": 7.0, "Finished": 17.32 },
        { "Size": 7.25, "Finished": 17.52 },
        { "Size": 7.5, "Finished": 17.72 },
        { "Size": 7.75, "Finished": 17.93 },
        { "Size": 8.0, "Finished": 18.13 },
        { "Size": 8.25, "Finished": 18.33 },
        { "Size": 8.5, "Finished": 18.54 },
        { "Size": 8.75, "Finished": 18.74 },
        { "Size": 9.0, "Finished": 18.94 },
        { "Size": 9.25, "Finished": 19.15 },
        { "Size": 9.5, "Finished": 19.35 },
        { "Size": 9.75, "Finished": 19.55 },
        { "Size": 10.0, "Finished": 19.76 },
        { "Size": 10.25, "Finished": 19.96 },
        { "Size": 10.5, "Finished": 20.16 },
        { "Size": 10.75, "Finished": 20.37 },
        { "Size": 11.0, "Finished": 20.57 },
        { "Size": 11.25, "Finished": 20.77 },
        { "Size": 11.5, "Finished": 20.98 },
        { "Size": 11.75, "Finished": 21.18 },
        { "Size": 12.0, "Finished": 21.38 },
        { "Size": 12.25, "Finished": 21.58 },
        { "Size": 12.5, "Finished": 21.79 },
        { "Size": 12.75, "Finished": 21.99 },
        { "Size": 13.0, "Finished": 22.19 },
        { "Size": 13.25, "Finished": 22.4 },
        { "Size": 13.5, "Finished": 22.6 },
        { "Size": 13.75, "Finished": 22.8 },
        { "Size": 14.0, "Finished": 23.01 },
        { "Size": 14.25, "Finished": 23.21 },
        { "Size": 14.5, "Finished": 23.41 },
        { "Size": 14.75, "Finished": 23.62 },
        { "Size": 15.0, "Finished": 23.82 }
    ],
    France: [
      { "Size": 42.0, "Finished": 13.57 },
      { "Size": 44.5, "Finished": 14.17 },
      { "Size": 45.0, "Finished": 14.32 },
      { "Size": 45.5, "Finished": 14.47 },
      { "Size": 46.0, "Finished": 14.63 },
      { "Size": 46.5, "Finished": 14.83 },
      { "Size": 47.0, "Finished": 14.98 },
      { "Size": 47.5, "Finished": 15.13 },
      { "Size": 48.0, "Finished": 15.29 },
      { "Size": 48.5, "Finished": 15.44 },
      { "Size": 49.0, "Finished": 15.59 },
      { "Size": 49.5, "Finished": 15.74 },
      { "Size": 50.0, "Finished": 15.9 },
      { "Size": 50.5, "Finished": 16.1 },
      { "Size": 51.0, "Finished": 16.25 },
      { "Size": 51.5, "Finished": 16.4 },
      { "Size": 52.0, "Finished": 16.56 },
      { "Size": 52.5, "Finished": 16.71 },
      { "Size": 53.0, "Finished": 16.86 },
      { "Size": 53.5, "Finished": 17.01 },
      { "Size": 54.0, "Finished": 17.22 },
      { "Size": 54.5, "Finished": 17.37 },
      { "Size": 55.0, "Finished": 17.52 },
      { "Size": 55.5, "Finished": 17.67 },
      { "Size": 56.0, "Finished": 17.83 },
      { "Size": 56.5, "Finished": 17.98 },
      { "Size": 57.0, "Finished": 18.13 },
      { "Size": 57.5, "Finished": 18.28 },
      { "Size": 58.0, "Finished": 18.44 },
      { "Size": 58.5, "Finished": 18.64 },
      { "Size": 59.0, "Finished": 18.79 },
      { "Size": 59.5, "Finished": 18.94 },
      { "Size": 60.0, "Finished": 19.1 },
      { "Size": 60.5, "Finished": 19.25 },
      { "Size": 60.75, "Finished": 19.35 },
      { "Size": 61.0, "Finished": 19.4 },
      { "Size": 61.5, "Finished": 19.55 },
      { "Size": 62.0, "Finished": 19.76 },
      { "Size": 62.5, "Finished": 19.91 },
      { "Size": 63.0, "Finished": 20.06 },
      { "Size": 63.5, "Finished": 20.21 },
      { "Size": 64.0, "Finished": 20.37 },
      { "Size": 64.5, "Finished": 20.52 },
      { "Size": 65.0, "Finished": 20.67 },
      { "Size": 65.5, "Finished": 20.82 },
      { "Size": 66.0, "Finished": 20.82 },
      { "Size": 66.5, "Finished": 21.18 },
      { "Size": 67.0, "Finished": 21.33 },
      { "Size": 67.5, "Finished": 21.48 },
      { "Size": 68.0, "Finished": 21.64 },
      { "Size": 68.5, "Finished": 21.79 },
      { "Size": 69.0, "Finished": 21.94 },
      { "Size": 69.5, "Finished": 22.14 },
      { "Size": 70.0, "Finished": 22.3 },
      { "Size": 70.5, "Finished": 22.45 },
      { "Size": 71.0, "Finished": 22.6 },
      { "Size": 71.5, "Finished": 22.75 },
      { "Size": 72.0, "Finished": 22.91 },
      { "Size": 72.5, "Finished": 23.06 },
      { "Size": 73.0, "Finished": 23.06 },
      { "Size": 73.5, "Finished": 23.41 },
      { "Size": 74.0, "Finished": 23.57 },
      { "Size": 74.5, "Finished": 23.72 },
      { "Size": 75.0, "Finished": 23.87 },
      { "Size": 75.5, "Finished": 24.02 },
      { "Size": 76.0, "Finished": 24.18 },
      { "Size": 76.5, "Finished": 24.33 },
      { "Size": 77.0, "Finished": 24.53 }
    ],
  };

  const tabsData = [
    {
      id: "stone-count-full-eternity",
      title: "Stone Count: Full Eternity",
      content: `
        <div class="eternity-calculator">
          <div class="input-section">
            <label for="coverage-type">Select Coverage Type:</label>
            <select id="coverage-type">
              <option value="full">Full Eternity</option>
              <option value="half">Half Eternity</option>
              <option value="three-quarters">Three Quarters Eternity</option>
            </select>

            <label for="region-type">Select Finger Size Region:</label>
            <select id="region-type">
              <option value="BaseChart">US</option>
              <option value="France">France</option>
            </select>

            <label for="finger-size">Enter Finger Size:</label>
            <input type="number" id="finger-size" placeholder="e.g., 6.5" />

            <label for="band-thickness">Enter Band Thickness (mm):</label>
            <input type="number" id="band-thickness" placeholder="e.g., 1.50" />

            <label for="spacing-eternity">Spacing Between Stones (mm):</label>
            <input type="number" id="spacing-eternity" placeholder="e.g., 0.20" />

            <label for="melee-diameter-eternity">Diameter of Melee Stones (mm):</label>
            <input type="number" id="melee-diameter-eternity" placeholder="e.g., 1.50" />
          </div>

          <div class="output-section">
            <label for="total-stones-eternity">Total Stones Needed:</label>
            <input type="text" id="total-stones-eternity" readonly placeholder="0" />
          </div>
        </div>
      `,
    },
    {
      id: "stone-count-halo",
      title: "Stone Count: Halos",
      content: `
        <div class="halo-calculator">
          <div class="input-section">
            <label for="center-shape-halo">Select Center Stone Shape:</label>
            <select id="center-shape-halo">
              <option value="round">Round</option>
              <option value="oval">Oval</option>
              <option value="cushion">Cushion</option>
              <option value="princess">Princess</option>
              <option value="emerald">Emerald</option>
              <option value="pear">Pear</option>
              <option value="marquise">Marquise</option>
            </select>

            <label for="width-halo">Width of Center Stone (mm):</label>
            <input type="number" id="width-halo" placeholder="e.g., 5.00" />

            <label for="length-halo" id="length-label-halo" style="display: none;">Length of Center Stone (mm):</label>
            <input type="number" id="length-halo" placeholder="e.g., 7.00" style="display: none;" />

            <label for="spacing-to-center">Spacing to Center Stone (mm):</label>
            <input type="number" id="spacing-to-center" value="0.2" placeholder="0.2" />

            <label for="melee-diameter-halo">Diameter of Melee Stones (mm):</label>
            <input type="number" id="melee-diameter-halo" placeholder="e.g., 1.50" />

            <label for="spacing-between-melees-halo">Spacing Between Melees (mm):</label>
            <input type="number" id="spacing-between-melees-halo" placeholder="e.g., 0.20" />
          </div>

          <div class="output-section">
            <label for="total-stones-halo">Total Stones Needed:</label>
            <input type="text" id="total-stones-halo" readonly placeholder="0" />
          </div>
        </div>
      `,
    },
    {
      id: "stone-count-hidden-halo",
      title: "Stone Count: Hidden Halos",
      content: `
        <div class="hidden-halo-calculator">
          <div class="input-section">
            <label for="center-shape-hidden-halo">Select Center Stone Shape:</label>
            <select id="center-shape-hidden-halo">
              <option value="round">Round</option>
              <option value="oval">Oval</option>
              <option value="cushion">Cushion</option>
              <option value="princess">Princess</option>
              <option value="emerald">Emerald</option>
              <option value="pear">Pear</option>
              <option value="marquise">Marquise</option>
            </select>

            <label for="width-hidden-halo">Width of Center Stone (mm):</label>
            <input type="number" id="width-hidden-halo" placeholder="e.g., 5.00" />

            <label for="spacing-between-hidden-halo">Spacing Between Stones (mm):</label>
            <input type="number" id="spacing-between-hidden-halo" placeholder="e.g., 0.20" />
          </div>

          <div class="output-section">
            <label for="total-stones-hidden-halo">Total Stones Needed:</label>
            <input type="text" id="total-stones-hidden-halo" readonly placeholder="0" />
          </div>
        </div>
      `,
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
      `,
    },
  ];

  // Dynamic Tab Generation
  const tabsContainer = document.querySelector(".tabs");
  const contentContainer = document.querySelector(".content");

  tabsData.forEach((tab, index) => {
    const tabElement = document.createElement("li");
    tabElement.textContent = tab.title;
    tabElement.dataset.tab = tab.id;
    if (index === 0) tabElement.classList.add("active");
    tabsContainer.appendChild(tabElement);

    const sectionElement = document.createElement("section");
    sectionElement.id = tab.id;
    sectionElement.className = "tab-content";
    if (index === 0) sectionElement.classList.add("active");
    sectionElement.innerHTML = `<h3>${tab.title}</h3>${tab.content}`;
    contentContainer.appendChild(sectionElement);
  });

  const tabs = document.querySelectorAll(".tabs li");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.getAttribute("data-tab");
      document.getElementById(target).classList.add("active");
    });
  });

  // Full Eternity Stone Count Logic
  const regionTypeSelect = document.getElementById("region-type");
  const fingerSizeInput = document.getElementById("finger-size");
  const bandThicknessInput = document.getElementById("band-thickness");
  const spacingEternityInput = document.getElementById("spacing-eternity");
  const meleeDiameterEternityInput = document.getElementById("melee-diameter-eternity");
  const coverageTypeSelect = document.getElementById("coverage-type");
  const totalStonesEternityOutput = document.getElementById("total-stones-eternity");

  const calculateEternityStones = () => {
    const region = regionTypeSelect.value;
    const fingerSize = parseFloat(fingerSizeInput.value) || 0;
    const bandThickness = parseFloat(bandThicknessInput.value) || 0;
    const spacing = parseFloat(spacingEternityInput.value) || 0;
    const meleeDiameter = parseFloat(meleeDiameterEternityInput.value) || 0;
    const coverageType = coverageTypeSelect.value;

    if (fingerSize <= 0 || bandThickness < 0 || spacing < 0 || meleeDiameter <= 0) {
      totalStonesEternityOutput.value = "Invalid Inputs";
      return;
    }

    const regionData = fingerSizes[region];
    const sizeData = regionData.find((item) => item.Size === fingerSize);
    if (!sizeData) {
      totalStonesEternityOutput.value = "Size Not Found";
      return;
    }

    const perimeter = Math.PI * sizeData.Finished;
    const adjustedPerimeter = perimeter + Math.PI * bandThickness;

    let finalPerimeter = adjustedPerimeter;
    if (coverageType === "half") {
      finalPerimeter /= 2;
    } else if (coverageType === "three-quarters") {
      finalPerimeter *= 0.75;
    }

    const totalStones = Math.floor(finalPerimeter / (meleeDiameter + spacing));
    totalStonesEternityOutput.value = totalStones;
  };

  regionTypeSelect.addEventListener("change", calculateEternityStones);
  fingerSizeInput.addEventListener("input", calculateEternityStones);
  bandThicknessInput.addEventListener("input", calculateEternityStones);
  spacingEternityInput.addEventListener("input", calculateEternityStones);
  meleeDiameterEternityInput.addEventListener("input", calculateEternityStones);
  coverageTypeSelect.addEventListener("change", calculateEternityStones);

  // Halo Stone Count Logic
  const haloShapeSelect = document.getElementById("center-shape-halo");
  const haloWidthInput = document.getElementById("width-halo");
  const haloLengthInput = document.getElementById("length-halo");
  const haloLengthLabel = document.getElementById("length-label-halo");
  const spacingToCenterInput = document.getElementById("spacing-to-center");
  const meleeDiameterHaloInput = document.getElementById("melee-diameter-halo");
  const spacingBetweenMeleesHaloInput = document.getElementById("spacing-between-melees-halo");
  const totalStonesHaloOutput = document.getElementById("total-stones-halo");

  haloShapeSelect?.addEventListener("change", () => {
    if (haloShapeSelect.value === "round") {
      haloLengthInput.style.display = "none";
      haloLengthLabel.style.display = "none";
    } else {
      haloLengthInput.style.display = "block";
      haloLengthLabel.style.display = "block";
    }
  });

  const calculateHaloStoneCount = () => {
    const shape = haloShapeSelect.value;
    const width = parseFloat(haloWidthInput.value) || 0;
    const length = parseFloat(haloLengthInput.value) || 0;
    const spacingToCenter = parseFloat(spacingToCenterInput.value) || 0;
    const meleeDiameter = parseFloat(meleeDiameterHaloInput.value) || 0;
    const spacingBetweenMelees = parseFloat(spacingBetweenMeleesHaloInput.value) || 0;

    if (meleeDiameter <= 0 || spacingBetweenMelees < 0 || spacingToCenter < 0 || width <= 0 || (length <= 0 && shape !== "round")) {
      totalStonesHaloOutput.value = "Invalid Inputs";
      return;
    }

    let perimeter = 0;
    const adjustedWidth = width + (2 * spacingToCenter);
    const adjustedLength = length + (2 * spacingToCenter);

    if (shape === "round") {
      perimeter = Math.PI * adjustedWidth;
    } else if (["oval", "pear", "marquise"].includes(shape)) {
      perimeter = Math.PI * ((adjustedWidth + adjustedLength) / 2);
    } else {
      perimeter = 2 * (adjustedWidth + adjustedLength);
    }

    const totalStones = Math.floor(perimeter / (meleeDiameter + spacingBetweenMelees));
    totalStonesHaloOutput.value = totalStones;
  };

  haloWidthInput?.addEventListener("input", calculateHaloStoneCount);
  haloLengthInput?.addEventListener("input", calculateHaloStoneCount);
  spacingToCenterInput?.addEventListener("input", calculateHaloStoneCount);
  meleeDiameterHaloInput?.addEventListener("input", calculateHaloStoneCount);
  spacingBetweenMeleesHaloInput?.addEventListener("input", calculateHaloStoneCount);

  // Hidden Halo Stone Count Logic
  const hiddenHaloShapeSelect = document.getElementById("center-shape-hidden-halo");
  const hiddenHaloWidthInput = document.getElementById("width-hidden-halo");
  const spacingBetweenHiddenHaloInput = document.getElementById("spacing-between-hidden-halo");
  const totalStonesHiddenHaloOutput = document.getElementById("total-stones-hidden-halo");

  const calculateHiddenHaloStoneCount = () => {
    const shape = hiddenHaloShapeSelect.value;
    const width = parseFloat(hiddenHaloWidthInput.value) || 0;
    const spacingBetween = parseFloat(spacingBetweenHiddenHaloInput.value) || 0;

    if (width <= 0 || spacingBetween < 0) {
      totalStonesHiddenHaloOutput.value = "Invalid Inputs";
      return;
    }

    let perimeter = 0;

    if (shape === "round") {
      perimeter = Math.PI * width;
    } else {
      perimeter = Math.PI * (width + 2 * spacingBetween);
    }

    const totalStones = Math.floor(perimeter / spacingBetween);
    totalStonesHiddenHaloOutput.value = totalStones;
  };

  hiddenHaloShapeSelect.addEventListener("change", calculateHiddenHaloStoneCount);
  hiddenHaloWidthInput.addEventListener("input", calculateHiddenHaloStoneCount);
  spacingBetweenHiddenHaloInput.addEventListener("input", calculateHiddenHaloStoneCount);

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

  knownWeightInput.addEventListener("input", calculateWeightConversion);
  knownMaterialSelect.addEventListener("change", calculateWeightConversion);
  targetMaterialSelect.addEventListener("change", calculateWeightConversion);
});