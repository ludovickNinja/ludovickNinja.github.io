document.addEventListener("DOMContentLoaded", () => {
    // Finger size data loaded from fingerSizes.js
    const fingerSizes = window.fingerSizes;

    const tabsData = [
        {
            id: "stone-count-full-eternity",
            title: "Stone Count: Full Eternity",
            file: "partials/stone-count-full-eternity.html",
            setup: setupFullEternity
        },
        {
            id: "stone-count-halo",
            title: "Stone Count: Halos",
            file: "partials/stone-count-halo.html",
            setup: setupHalo
        },
        {
            id: "stone-count-hidden-halo",
            title: "Stone Count: Hidden Halos",
            file: "partials/stone-count-hidden-halo.html",
            setup: setupHiddenHalo
        },
        {
            id: "weight-conversion",
            title: "Weight: Karat Conversion",
            file: "partials/weight-conversion.html",
            setup: setupWeightConversion
        },
        {
            id: "width-conversion",
            title: "Weight: Width Conversion",
            file: "partials/width-conversion.html",
            setup: setupWidthConversion
        },
        {
            id: "weight-diamond-sizes",
            title: "Weight: Diamond Sizes",
            file: "partials/weight-diamond-sizes.html",
            setup: setupDiamondSizes
        },
        {
            id: "useful-links",
            title: "Useful Links",
            file: "partials/useful-links.html"
        },
        {
            id: "contact-repository",
            title: "Contact Repository",
            file: "partials/contact-repository.html",
            setup: setupContactRepository
        },
        {
            id: "rush-requests",
            title: "RUSH REQUESTS",
            file: "partials/rush-requests.html"
        }
    ];

    // Add a new tab dynamically
    function addTab(id, title, content, url = null) {
        const tabsContainer = document.querySelector(".tabs");
        const contentContainer = document.querySelector(".content");

        // Create the tab in the sidebar
        const tabElement = document.createElement("li");
        tabElement.textContent = title;
        tabElement.dataset.tab = id;

        // If a URL is provided, make the tab a link
        if (url) {
            tabElement.addEventListener("click", () => {
                window.open(url, "_blank");
            });
        } else {
            // Otherwise, create a regular tab
            const sectionElement = document.createElement("section");
            sectionElement.id = id;
            sectionElement.className = "tab-content";
            sectionElement.innerHTML = `<h2>${title}</h2>${content}`;
            contentContainer.appendChild(sectionElement);

            tabElement.addEventListener("click", () => {
                const tabs = document.querySelectorAll(".tabs li");
                const tabContents = document.querySelectorAll(".tab-content");
                tabs.forEach((tab) => tab.classList.remove("active"));
                tabContents.forEach((content) => content.classList.remove("active"));
                tabElement.classList.add("active");
                sectionElement.classList.add("active");
            });
        }

        tabsContainer.appendChild(tabElement);
    }

    // Initialize tabs
    const tabsContainer = document.querySelector(".tabs");
    const contentContainer = document.querySelector(".content");

    function loadTabContent(tab, sectionElement) {
        fetch(tab.file)
            .then((r) => r.text())
            .then((html) => {
                sectionElement.innerHTML = `<h3>${tab.title}</h3>${html}`;
                sectionElement.dataset.loaded = "true";
                tab.setup?.();
            });
    }

    tabsData.forEach((tab, index) => {
        const tabElement = document.createElement("li");
        tabElement.textContent = tab.title;
        tabElement.dataset.tab = tab.id;
        if (index === 0) tabElement.classList.add("active");
        tabsContainer.appendChild(tabElement);

        const sectionElement = document.createElement("section");
        sectionElement.id = tab.id;
        sectionElement.className = "tab-content";
        if (index === 0) {
            sectionElement.classList.add("active");
            loadTabContent(tab, sectionElement);
        }
        contentContainer.appendChild(sectionElement);

        tabElement.addEventListener("click", () => {
            const tabs = document.querySelectorAll(".tabs li");
            const tabContents = document.querySelectorAll(".tab-content");
            tabs.forEach((t) => t.classList.remove("active"));
            tabContents.forEach((c) => c.classList.remove("active"));
            tabElement.classList.add("active");
            sectionElement.classList.add("active");

            if (!sectionElement.dataset.loaded) {
                loadTabContent(tab, sectionElement);
            }
        });
    });

    // Add the "Design Buddy Chat" tab dynamically
    addTab(
        "design-buddy-chat",
        "Design Buddy Chat",
        null, // No content since it links to a URL
        "https://chatgpt.com/g/g-67672f631ab481918af63d9ae2b38271-design-buddy"
    );

    // Add the "Design Buddy Chat V2" tab dynamically
    addTab(
        "design-buddy-chat-v2",
        "Design Buddy Chat V2",
        null, // No content since it links to a URL
        "https://chatgpt.com/g/g-67bc9728e6f88191a75a4edb4afb10c2-design-buddy-v2"
    );


    function setupFullEternity() {
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
    }

    function setupHalo() {
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
            const adjustedWidth = width + (2 * spacingToCenter) + meleeDiameter;
            const adjustedLength = length + (2 * spacingToCenter) + meleeDiameter;

            if (shape === "round") {
                perimeter = Math.PI * adjustedWidth;
            } else if (["oval", "pear", "marquise"].includes(shape)) {
                perimeter = Math.PI * ((adjustedWidth + adjustedLength) / 2);
            } else {
                perimeter = 2 * (adjustedWidth + adjustedLength);
            }

            const totalStones = Math.floor(perimeter / (meleeDiameter + spacingBetweenMelees));

            const roundedDownEven = totalStones % 2 === 0 ? totalStones : totalStones - 1;
            totalStonesHaloOutput.value = roundedDownEven;
        };

        haloWidthInput?.addEventListener("input", calculateHaloStoneCount);
        haloLengthInput?.addEventListener("input", calculateHaloStoneCount);
        spacingToCenterInput?.addEventListener("input", calculateHaloStoneCount);
        meleeDiameterHaloInput?.addEventListener("input", calculateHaloStoneCount);
        spacingBetweenMeleesHaloInput?.addEventListener("input", calculateHaloStoneCount);
    }

    function setupHiddenHalo() {
        const hiddenHaloShapeSelect = document.getElementById("center-shape");
        const hiddenHaloWidthInput = document.getElementById("width");
        const hiddenHaloLengthInput = document.getElementById("length");
        const hiddenHaloLengthLabel = document.getElementById("length-label");
        const stoneSizeInput = document.getElementById("stone-size");
        const spacingInput = document.getElementById("spacing");
        const hiddenHaloTotalStonesOutput = document.getElementById("total-stones");

        hiddenHaloShapeSelect?.addEventListener("change", () => {
            if (hiddenHaloShapeSelect.value === "round") {
                hiddenHaloLengthInput.style.display = "none";
                hiddenHaloLengthLabel.style.display = "none";
            } else {
                hiddenHaloLengthInput.style.display = "block";
                hiddenHaloLengthLabel.style.display = "block";
            }
        });

        const calculateHiddenHalo = () => {
            const shape = hiddenHaloShapeSelect.value;
            const width = parseFloat(hiddenHaloWidthInput.value) || 0;
            const length = parseFloat(hiddenHaloLengthInput.value) || 0;
            const stoneSize = parseFloat(stoneSizeInput.value) || 0;
            const spacing = parseFloat(spacingInput.value) || 0;

            if (stoneSize <= 0 || spacing < 0 || width <= 0 || (length <= 0 && shape !== "round")) {
                hiddenHaloTotalStonesOutput.value = "Invalid Inputs";
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

            const totalStones = Math.floor(perimeter / (stoneSize + spacing) - 4);

            const roundedDownEven = totalStones % 2 === 0 ? totalStones : totalStones - 1;
            hiddenHaloTotalStonesOutput.value = roundedDownEven;
        };

        hiddenHaloWidthInput?.addEventListener("input", calculateHiddenHalo);
        hiddenHaloLengthInput?.addEventListener("input", calculateHiddenHalo);
        stoneSizeInput?.addEventListener("input", calculateHiddenHalo);
        spacingInput?.addEventListener("input", calculateHiddenHalo);
    }

    function setupWeightConversion() {
        const knownWeightInput = document.getElementById("known-weight");
        const knownMaterialSelect = document.getElementById("known-material");
        const targetMaterialSelect = document.getElementById("target-material");
        const convertedWeightInput = document.getElementById("converted-weight");

        const calculateConversion = () => {
            const knownWeight = parseFloat(knownWeightInput.value);
            const knownMaterial = knownMaterialSelect.value;
            const targetDensity = parseFloat(targetMaterialSelect.value);
            const diamondDensity = 3.52; // g/cm³

            if (isNaN(knownWeight) || knownWeight <= 0 || isNaN(targetDensity) || targetDensity <= 0) {
                convertedWeightInput.value = "Invalid Inputs";
                return;
            }

            let volume;

            if (knownMaterial === "carat") {
                const weightInGrams = knownWeight * 0.5;
                volume = weightInGrams / diamondDensity;
            } else {
                const knownDensity = parseFloat(knownMaterial);
                volume = knownWeight / knownDensity;
            }

            const convertedWeight = volume * targetDensity;
            convertedWeightInput.value = convertedWeight.toFixed(3);
        };

        knownWeightInput.addEventListener("input", calculateConversion);
        knownMaterialSelect.addEventListener("change", calculateConversion);
        targetMaterialSelect.addEventListener("change", calculateConversion);
    }

    function setupWidthConversion() {
        const widthInputs = document.querySelectorAll('#width-conversion input');
        const result = document.getElementById('estimated-weight');

        function calculateWeight() {
            const originalWeight = parseFloat(document.getElementById('original-weight').value);
            const originalWidth = parseFloat(document.getElementById('original-width').value);
            const originalThickness = parseFloat(document.getElementById('original-thickness').value);
            const newWidth = parseFloat(document.getElementById('new-width').value);
            const newThickness = parseFloat(document.getElementById('new-thickness').value);

            if (!originalWeight || !originalWidth || !originalThickness || !newWidth || !newThickness) {
                result.textContent = 'Estimated New Weight: 0 g';
                return;
            }

            const newWeight =
                originalWeight * (newWidth / originalWidth) * (newThickness / originalThickness);

            result.textContent = `Estimated New Weight: ${newWeight.toFixed(2)} g`;
        }

        widthInputs.forEach(input => input.addEventListener('input', calculateWeight));
    }

    function setupDiamondSizes() {
        const diamondInputs = document.querySelectorAll('#weight-diamond-sizes input');
        const newWeightOutput = document.getElementById('ds-new-weight');
        const newThicknessOutput = document.getElementById('ds-new-thickness');

        function calculateDiamondSize() {
            const currentSize = parseFloat(document.getElementById('current-diamond-size').value);
            const targetSize = parseFloat(document.getElementById('target-diamond-size').value);
            const bandWidth = parseFloat(document.getElementById('ds-current-width').value);
            const bandThickness = parseFloat(document.getElementById('ds-current-thickness').value);
            const bandWeight = parseFloat(document.getElementById('ds-current-weight').value);

            if (!currentSize || !targetSize || !bandWidth || !bandThickness || !bandWeight) {
                newWeightOutput.textContent = 'Estimated New Weight: 0 g';
                newThicknessOutput.textContent = 'Estimated New Thickness: 0 mm';
                return;
            }

            const newWidth = (bandWidth - currentSize) + targetSize;

            if (bandThickness - (0.65 * targetSize) > 0.4) {
               newThickness = bandThickness;
            } else {
                newThickness = Math.ceil(((0.65 * targetSize) + 0.4) / 0.05) * 0.05;
            }

            const newBandWeight = bandWeight * (newWidth / bandWidth) * (newThickness / bandThickness);

            newThicknessOutput.textContent = `Estimated New Thickness: ${newThickness.toFixed(2)} mm`;
            newWeightOutput.textContent = `Estimated New Weight: ${newBandWeight.toFixed(2)} g`;
        }

        diamondInputs.forEach(input => input.addEventListener('input', calculateDiamondSize));
    }

    function setupContactRepository() {
        const contacts = window.contacts || [];

        const searchInput = document.getElementById('contact-search');
        const tagFilter = document.getElementById('contact-tag-filter');
        const list = document.getElementById('contact-list');

        const tagSet = new Set();
        contacts.forEach(c => c.tags.forEach(t => tagSet.add(t)));
        tagSet.forEach(tag => {
            const opt = document.createElement('option');
            opt.value = tag;
            opt.textContent = tag;
            tagFilter.appendChild(opt);
        });

        function renderContacts() {
            const term = searchInput.value.toLowerCase();
            const selectedTags = Array.from(tagFilter.selectedOptions)
                .map(o => o.value)
                .filter(v => v);
            list.innerHTML = '';

            contacts
                .filter(c => {
                    const matchesTag =
                        selectedTags.length === 0 ||
                        selectedTags.every(tag => c.tags.includes(tag));
                    const searchable = `
                        ${c.name ?? ''} ${c.company ?? ''} ${c.description ?? ''}
                        ${c.email ?? ''} ${c.phone ?? ''}
                        ${c.website ?? ''} ${c.address ?? ''}
                        ${c.tags.join(' ')}
                    `.toLowerCase();
                    const matchesSearch = searchable.includes(term);
                    return matchesTag && matchesSearch;
                })
                .sort((a, b) => {
                    const titleA = [a.company, a.name]
                        .filter(Boolean)
                        .join(' - ')
                        .toLowerCase();
                    const titleB = [b.company, b.name]
                        .filter(Boolean)
                        .join(' - ')
                        .toLowerCase();
                    return titleA.localeCompare(titleB);
                })
                .forEach(c => {
                    const div = document.createElement('div');
                    div.className = 'contact-card';

                    const title = [c.company, c.name].filter(Boolean).join(' - ');
                    const info = `
                        <h4>${title}</h4>
                        ${c.description ? `<p>${c.description}</p>` : ''}
                        ${c.email ? `<p>Email: <a href="mailto:${c.email}">${c.email}</a></p>` : ''}
                        ${c.phone ? `<p>Phone: ${c.phone}</p>` : ''}
                        ${c.website ? `<p>Website: <a href="${c.website}" target="_blank">${c.website}</a></p>` : ''}
                        ${c.address ? `<p>Address: ${c.address}</p>` : ''}
                        <div class="contact-tags">${c.tags.map(t => '#' + t).join(' ')}</div>
                    `;

                    const image = c.image ? `<img src="${c.image}" class="contact-image" alt="${c.name}">` : '';

                    div.innerHTML = `<div class="contact-info">${info}</div>${image}`;
                    
                    list.appendChild(div);
                });
        }

        searchInput.addEventListener('input', renderContacts);
        tagFilter.addEventListener('change', renderContacts);

        renderContacts();
    }

    
        
    
});
