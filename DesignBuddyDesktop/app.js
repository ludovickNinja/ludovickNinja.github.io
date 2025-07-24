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
        const contacts = [
            {
                name: 'John Doe',
                company: 'Example Corp',
                email: 'john@example.com',
                phone: '123-456-7890',
                website: 'https://example.com',
                address: '123 Main St, Toronto, Canada',
                image: 'https://via.placeholder.com/100',
                tags: ['supplier', 'diamond'],
                description: 'Wholesale diamond supplier.'
            },
            {
                name: 'Jane Smith',
                company: 'ACME Casting',
                email: 'jane@acme.com',
                phone: '555-123-4567',
                address: '456 Industrial Rd, Ottawa, Canada',
                image: 'https://via.placeholder.com/100',
                tags: ['casting', 'metal'],
                description: 'Go-to casting house for platinum and gold.'
            },
            {
                name: 'Bob Johnson',
                company: 'Gem Traders',
                email: 'bob@gemtraders.com',
                phone: '555-987-6543',
                website: 'https://gemtraders.com',
                image: 'https://via.placeholder.com/100',
                tags: ['gem', 'supplier'],
                description: 'Loose gemstone distributor.'
            }
        ];

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
            const selectedTag = tagFilter.value;
            list.innerHTML = '';

            contacts
                .filter(c => {
                    const matchesTag = !selectedTag || c.tags.includes(selectedTag);
                    const searchable = `
                        ${c.name} ${c.company ?? ''} ${c.description ?? ''}
                        ${c.email ?? ''} ${c.phone ?? ''}
                        ${c.website ?? ''} ${c.address ?? ''}
                        ${c.tags.join(' ')}
                    `.toLowerCase();
                    const matchesSearch = searchable.includes(term);
                    return matchesTag && matchesSearch;
                })
                .forEach(c => {
                    const div = document.createElement('div');
                    div.className = 'contact-card';

                    const info = `
                        <h4>${c.name}${c.company ? ' - ' + c.company : ''}</h4>
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
