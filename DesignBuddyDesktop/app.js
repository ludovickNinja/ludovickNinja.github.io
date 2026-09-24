function calcEternityStoneCount(
    innerDiameterMm,
    stoneSizeMm,
    thicknessMm,
    extraGapMm = 0.2,
    coverageRatio = 1
) {
    const MM = stoneSizeMm;
    const thickness = thicknessMm;

    // Inner radius from finger size
    const baseRadius = innerDiameterMm / 2;

    // Radial offset used in your Grasshopper logic
    const radialOffset = baseRadius + thickness - (MM * 0.173);

    // Radius of the guide circle where stone centers sit
    const guideRadius = Math.sqrt(
        radialOffset * radialOffset + Math.pow(MM * 0.5, 2)
    );

    // Angle (in radians) from ring center to edge of stone
    const rad = Math.atan2(MM * 0.5, radialOffset);

    // Effective arc length along guide circle that one stone “occupies”
    const segmentLength = 2 * rad * guideRadius; // one stone "footprint" on the circle

    // Total arc length based on coverage ratio
    const coverageArc = coverageRatio * 2 * Math.PI * guideRadius;

    // Raw count before rounding
    let count = coverageArc / (segmentLength + extraGapMm);

    // Round to nearest whole number
    count = Math.max(1, Math.round(count));

    // Angle in degrees between stones within the covered arc
    const coverageAngleDeg = 360 * coverageRatio;
    const angleDeg = coverageAngleDeg / count;

    return {
        count,
        angleDeg,
        guideRadius,
        segmentLength,
        coverageArc,
        coverageAngleDeg,
    };
}

document.addEventListener("DOMContentLoaded", () => {
    // Skip the splash on subsequent loads within the same browser session.
    const splash = document.getElementById("splash-screen");
    if (splash) {
        if (sessionStorage.getItem("dbd-splash-seen")) {
            splash.remove();
        } else {
            sessionStorage.setItem("dbd-splash-seen", "1");
        }
    }

    // Finger size data loaded from fingerSizes.js
    const fingerSizes = window.fingerSizes;

    const translations = {
        en: {
            appTitle: "Design Buddy Desktop",
            footer: "Presented by Ludo B.",
            languageLabel: "Language",
            loading: "Loading…",
            loadError: "Unable to load this tab.",
            categories: {
                stoneCounts: "Stone Counts",
                weights: "Weights",
                informations: "Informations",
                forms: "Forms",
                gpts: "GPTs",
                tools: "Tools"
            },
            tabs: {
                stoneCountFullEternity: "Stone Count: Full Eternity",
                stoneCountHalo: "Stone Count: Halos",
                stoneCountHiddenHalo: "Stone Count: Hidden Halos",
                weightConversion: "Weight: Karat Conversion",
                weightWeddingBand: "Weight: Wedding Band",
                widthConversion: "Weight: Width Conversion",
                weightDiamondSizes: "Weight: Diamond Sizes",
                usefulLinks: "Useful Links",
                faq: "FAQ",
                newsFeed: "Jewelry News Feed",
                contactRepository: "Contact Repository",
                rushRequests: "RUSH REQUESTS",
                stoneOrderForm: "Stone Order Form",
                employeeSuggestions: "Employee Suggestions",
                designBuddyChat: "Design Buddy Chat",
                designBuddyChatV2: "Design Buddy Chat V2",
                styleMatch: "Style Match WIP",
                threeDmToGlb: "3DM to GLB"
            },
            common: {
                regionLabel: "Select Finger Size Region:",
                regionUS: "US",
                regionFrance: "France",
                fingerSizeLabel: "Enter Finger Size:",
                invalidInputs: "Invalid Inputs",
                sizeNotFound: "Size Not Found",
                formulaLabel: "Formula:"
            },
            fullEternity: {
                descriptionStrong: "Estimate total stone count for eternity-style bands based on finger size and coverage.",
                descriptionBody: "Pick full, three-quarter, or semi coverage, then enter finger size, band thickness, spacing, and melee diameter to quickly preview the number of stones needed.",
                coverageLabel: "Select Coverage Type:",
                coverageFull: "Full",
                coverageThreeQuarter: "Three Quarter",
                coverageSemi: "Semi",
                bandThicknessLabel: "Enter Band Thickness (mm):",
                spacingLabel: "Spacing Between Stones (mm):",
                meleeDiameterLabel: "Diameter of Melee Stones (mm):",
                totalStonesLabel: "Total Stones Needed:",
                formulaInline: "Stone Count ≈ <em>(coverage × 2πR)</em> ÷ <em>(2R·atan((d⁄2)/offset) + gap)</em>",
                spacingRefHeading: "Typical Spacing by Setting Style",
                settingStyleCol: "Setting Style",
                suggestedSpacingCol: "Suggested Spacing (mm)",
                channelSetting: "Channel Setting",
                pave: "Pavé",
                sharedProng: "Shared Prong",
                microProng: "Micro Prong",
                singleProng: "Single Prong",
                stonesUnit: "stones",
                stepUnit: "step",
                requiredThickness: "Required band thickness:",
                adjustedNote: "adjusted for stone depth"
            },
            halo: {
                descriptionStrong: "Estimates the number of stones in a halo based on the center size.",
                descriptionBody: "Enter the <em>center stone shape, dimensions</em> and <em>halo stone size</em> to calculate an <u>even</u> count that fits the halo circumference.",
                shapeLabel: "Select Center Stone Shape:",
                shapeRound: "Round",
                shapeOval: "Oval",
                shapeCushion: "Cushion",
                shapePrincess: "Princess",
                shapeEmerald: "Emerald",
                shapePear: "Pear",
                shapeMarquise: "Marquise",
                widthLabel: "Width of Center Stone (mm):",
                lengthLabel: "Length of Center Stone (mm):",
                spacingToCenterLabel: "Spacing to Center Stone (mm):",
                meleeDiameterLabel: "Diameter of Melee Stones (mm):",
                spacingBetweenLabel: "Spacing Between Melees (mm):",
                totalStonesLabel: "Total Stones Needed:"
            },
            hiddenHalo: {
                descriptionStrong: "Estimate the stone count for a hidden halo from the center stone dimensions.",
                descriptionBody: "Select the center stone shape, enter the width/length, then set melee diameter and spacing to calculate an even hidden halo stone count around the center perimeter.",
                shapeLabel: "Select Center Stone Shape:",
                widthLabel: "Width of Center Stone (mm):",
                lengthLabel: "Length of Center Stone (mm):",
                stoneSizeLabel: "Diameter of Melee Stones (mm):",
                spacingLabel: "Spacing Between Melee Stones (mm):",
                totalStonesLabel: "Total Stones Needed for Hidden Halo:",
                formulaInline: "Total Stones = Perimeter ÷ (Stone Diameter + Spacing)"
            },
            weightConversion: {
                descriptionStrong: "Estimate the weight of the same design in a different gold karat.",
                descriptionBody: "Enter the design's current weight and karat, choose a target karat, and the tool will calculate an estimated converted weight based on the density difference between the two alloys.",
                knownMaterialLabel: "Material of Known Weight:",
                knownWeightLabel: "Enter Known Weight (grams):",
                knownWeightPlaceholder: "Enter weight",
                targetMaterialLabel: "Material to Convert To:",
                convertedWeightLabel: "Converted Weight (grams):",
                convertedWeightPlaceholder: "Converted weight"
            },
            weddingBand: {
                descriptionStrong: "Estimate the volume and finished metal weight for classic wedding bands.",
                descriptionBody: "Choose between a pipe-cut (tubular) profile or a round band profile, select your finger size, and enter the band width and thickness to see the calculated volume and weight.",
                pipeCut: "Pipe Cut",
                roundBand: "Round Band",
                bandWidthLabel: "Enter Band Width (mm):",
                bandThicknessLabel: "Enter Band Thickness (mm):",
                karatLabel: "Select Gold Karat:",
                volumeLabel: "Calculated Volume (mm³):",
                weightLabel: "Estimated Weight (grams):",
                pipeFormulaLabel: "Pipe Cut Formula:",
                roundFormulaLabel: "Round Band Formula:"
            },
            widthConversion: {
                descriptionStrong: "Estimate updated ring weight when width or thickness changes.",
                descriptionBody: "Enter the original weight, width, and thickness, then provide the new dimensions to calculate an adjusted weight and suggested diamond size for the updated proportions.",
                originalWeightLabel: "Original Weight (g)",
                originalWidthLabel: "Original Width (mm)",
                originalThicknessLabel: "Original Thickness (mm)",
                currentDiamondSizeLabel: "Current Diamond Size (mm)",
                optional: "(optional)",
                newWidthLabel: "New Width (mm)",
                newThicknessLabel: "New Thickness (mm)",
                estimatedWeight: "Estimated New Weight:",
                recommendedDiamond: "Recommended Diamond Size:",
                referenceHeading: "Average Thickness by MM Width",
                widthCol: "MM width",
                thicknessCol: "MM thickness"
            },
            diamondSizes: {
                descriptionStrong: "Used to scale the weight of a ring when changing the diamond size.",
                descriptionBody: "For example, if a ring currently uses 1.2&nbsp;mm diamonds and they want to upgrade to 2.0&nbsp;mm stones, enter the <em>current diamond size</em>, <em>target diamond size</em>, <em>band width</em>, <em>band thickness</em>, and <em>current weight</em>.<br> The tool will estimate the new weight and indicate whether the band thickness needs to be adjusted to maintain proper proportions.",
                currentDiamondLabel: "Current Diamond Size (mm)",
                targetDiamondLabel: "Target Diamond Size (mm)",
                bandWidthLabel: "Current Band Width (mm)",
                bandThicknessLabel: "Current Band Thickness (mm)",
                bandWeightLabel: "Current Band Weight (g)",
                estimatedThickness: "Estimated New Thickness:",
                estimatedWeight: "Estimated New Weight:"
            },
            usefulLinks: {
                cadHeading: "CAD",
                shopHeading: "Shop",
                referencesHeading: "References"
            },
            faq: {
                note: "Use this embedded FAQ tool to search and submit employee questions through your n8n webhooks."
            },
            newsFeed: {
                chooseSource: "Choose a source:",
                refresh: "Refresh",
                loading: "Loading the latest stories…",
                noArticles: "No articles available right now.",
                dateUnavailable: "Date unavailable",
                rssUnavailable: "Unable to reach the RSS service.",
                feedUnavailable: "Unable to load news right now.",
                tagline: "Pulling live headlines from leading jewelry industry RSS feeds."
            },
            contactRepository: {
                searchPlaceholder: "Search contacts...",
                allTags: "All Tags"
            },
            styleMatch: {
                description: "Upload an image to find the best matching SKU.",
                chooseImage: "Choose an image",
                findStyle: "Find Style",
                pleaseSelect: "Please select an image",
                processing: "Processing...",
                error: "Error:"
            },
            threeDmToGlb: {
                description: "Import a 3DM file and view it in the browser."
            },
            employeeSuggestions: {
                descriptionStrong: "Anonymous employee suggestion form.",
                descriptionBody: "Use this form to submit process improvements, suggested changes, and feedback to help improve our workflow."
            }
        },
        fr: {
            appTitle: "Assistant Design Bureau",
            footer: "Présenté par Ludo B.",
            languageLabel: "Langue",
            loading: "Chargement…",
            loadError: "Impossible de charger cet onglet.",
            categories: {
                stoneCounts: "Comptes de pierres",
                weights: "Poids",
                informations: "Informations",
                forms: "Formulaires",
                gpts: "GPTs",
                tools: "Outils"
            },
            tabs: {
                stoneCountFullEternity: "Compte de pierres : Tour complet",
                stoneCountHalo: "Compte de pierres : Halos",
                stoneCountHiddenHalo: "Compte de pierres : Halos cachés",
                weightConversion: "Poids : Conversion de Karats",
                weightWeddingBand: "Poids : Alliance/Jonc",
                widthConversion: "Poids : Conversion de largeur",
                weightDiamondSizes: "Poids : Tailles des diamants",
                usefulLinks: "Liens utiles",
                faq: "FAQ",
                newsFeed: "Actualités joaillerie",
                contactRepository: "Répertoire de contacts",
                rushRequests: "DEMANDES URGENTES",
                stoneOrderForm: "Formulaire de commande de pierres",
                employeeSuggestions: "Suggestions des employés",
                designBuddyChat: "Discussion Design Buddy",
                designBuddyChatV2: "Discussion Design Buddy V2",
                styleMatch: "Style Match WIP",
                threeDmToGlb: "3DM vers GLB"
            },
            common: {
                regionLabel: "Région de taille de doigt :",
                regionUS: "US",
                regionFrance: "France",
                fingerSizeLabel: "Taille de doigt :",
                invalidInputs: "Valeurs invalides",
                sizeNotFound: "Taille introuvable",
                formulaLabel: "Formule :"
            },
            fullEternity: {
                descriptionStrong: "Estime le nombre total de pierres pour les alliances « eternity » selon la taille du doigt et la couverture.",
                descriptionBody: "Choisissez une couverture pleine, trois-quarts ou demi, puis entrez la taille de doigt, l'épaisseur de l'anneau, l'espacement et le diamètre du melee pour prévisualiser le nombre de pierres requis.",
                coverageLabel: "Type de couverture :",
                coverageFull: "Pleine",
                coverageThreeQuarter: "Trois-quarts",
                coverageSemi: "Demi",
                bandThicknessLabel: "Épaisseur de l'anneau (mm) :",
                spacingLabel: "Espacement entre les pierres (mm) :",
                meleeDiameterLabel: "Diamètre des melees (mm) :",
                totalStonesLabel: "Nombre total de pierres :",
                formulaInline: "Nombre de pierres ≈ <em>(couverture × 2πR)</em> ÷ <em>(2R·atan((d⁄2)/offset) + espace)</em>",
                spacingRefHeading: "Espacement typique selon le sertissage",
                settingStyleCol: "Type de sertissage",
                suggestedSpacingCol: "Espacement suggéré (mm)",
                channelSetting: "Serti rail",
                pave: "Pavé",
                sharedProng: "Griffes partagées",
                microProng: "Micro-griffes",
                singleProng: "Griffe simple",
                stonesUnit: "pierres",
                stepUnit: "pas",
                requiredThickness: "Épaisseur d'anneau requise :",
                adjustedNote: "ajustée pour la profondeur de pierre"
            },
            halo: {
                descriptionStrong: "Estime le nombre de pierres d'un halo en fonction de la taille centrale.",
                descriptionBody: "Entrez la <em>forme et les dimensions de la pierre centrale</em> et la <em>taille du melee</em> pour calculer un nombre <u>pair</u> de pierres adapté à la circonférence du halo.",
                shapeLabel: "Forme de la pierre centrale :",
                shapeRound: "Ronde",
                shapeOval: "Ovale",
                shapeCushion: "Coussin",
                shapePrincess: "Princesse",
                shapeEmerald: "Émeraude",
                shapePear: "Poire",
                shapeMarquise: "Marquise",
                widthLabel: "Largeur de la pierre centrale (mm) :",
                lengthLabel: "Longueur de la pierre centrale (mm) :",
                spacingToCenterLabel: "Espacement avec la pierre centrale (mm) :",
                meleeDiameterLabel: "Diamètre des melees (mm) :",
                spacingBetweenLabel: "Espacement entre les melees (mm) :",
                totalStonesLabel: "Nombre total de pierres :"
            },
            hiddenHalo: {
                descriptionStrong: "Estime le nombre de pierres d'un halo caché à partir des dimensions de la pierre centrale.",
                descriptionBody: "Sélectionnez la forme de la pierre centrale, entrez la largeur/longueur, puis indiquez le diamètre du melee et l'espacement pour calculer un nombre pair de pierres autour du périmètre.",
                shapeLabel: "Forme de la pierre centrale :",
                widthLabel: "Largeur de la pierre centrale (mm) :",
                lengthLabel: "Longueur de la pierre centrale (mm) :",
                stoneSizeLabel: "Diamètre des melees (mm) :",
                spacingLabel: "Espacement entre les melees (mm) :",
                totalStonesLabel: "Nombre total de pierres pour le halo caché :",
                formulaInline: "Nombre de pierres = Périmètre ÷ (Diamètre de la pierre + Espacement)"
            },
            weightConversion: {
                descriptionStrong: "Estime le poids du même design dans un autre karat d'or.",
                descriptionBody: "Entrez le poids actuel et le karat, choisissez un karat cible, et l'outil calculera un poids converti estimé selon la différence de densité entre les deux alliages.",
                knownMaterialLabel: "Matière du poids connu :",
                knownWeightLabel: "Poids connu (grammes) :",
                knownWeightPlaceholder: "Entrer le poids",
                targetMaterialLabel: "Matière de conversion :",
                convertedWeightLabel: "Poids converti (grammes) :",
                convertedWeightPlaceholder: "Poids converti"
            },
            weddingBand: {
                descriptionStrong: "Estime le volume et le poids du métal pour les alliances classiques.",
                descriptionBody: "Choisissez entre un profil pipe-cut (tubulaire) ou un anneau rond, sélectionnez la taille de doigt, et entrez la largeur et l'épaisseur pour voir le volume et le poids calculés.",
                pipeCut: "Pipe Cut",
                roundBand: "Anneau rond",
                bandWidthLabel: "Largeur de l'anneau (mm) :",
                bandThicknessLabel: "Épaisseur de l'anneau (mm) :",
                karatLabel: "Karat de l'or :",
                volumeLabel: "Volume calculé (mm³) :",
                weightLabel: "Poids estimé (grammes) :",
                pipeFormulaLabel: "Formule Pipe Cut :",
                roundFormulaLabel: "Formule Anneau rond :"
            },
            widthConversion: {
                descriptionStrong: "Estime le nouveau poids de la bague lorsque la largeur ou l'épaisseur change.",
                descriptionBody: "Entrez le poids, la largeur et l'épaisseur d'origine, puis indiquez les nouvelles dimensions pour calculer un poids ajusté et une taille de diamant suggérée pour les nouvelles proportions.",
                originalWeightLabel: "Poids d'origine (g)",
                originalWidthLabel: "Largeur d'origine (mm)",
                originalThicknessLabel: "Épaisseur d'origine (mm)",
                currentDiamondSizeLabel: "Taille du diamant actuel (mm)",
                optional: "(optionnel)",
                newWidthLabel: "Nouvelle largeur (mm)",
                newThicknessLabel: "Nouvelle épaisseur (mm)",
                estimatedWeight: "Nouveau poids estimé :",
                recommendedDiamond: "Taille de diamant suggérée :",
                referenceHeading: "Épaisseur moyenne par largeur en mm",
                widthCol: "Largeur (mm)",
                thicknessCol: "Épaisseur (mm)"
            },
            diamondSizes: {
                descriptionStrong: "Sert à recalculer le poids d'une bague lors du changement de taille du diamant.",
                descriptionBody: "Par exemple, si une bague utilise des diamants de 1.2&nbsp;mm et que l'on souhaite passer à 2.0&nbsp;mm, entrez la <em>taille actuelle</em>, la <em>taille cible</em>, la <em>largeur</em>, l'<em>épaisseur</em> et le <em>poids</em> actuels.<br> L'outil estimera le nouveau poids et indiquera si l'épaisseur doit être ajustée pour conserver les bonnes proportions.",
                currentDiamondLabel: "Taille du diamant actuel (mm)",
                targetDiamondLabel: "Taille du diamant cible (mm)",
                bandWidthLabel: "Largeur actuelle de l'anneau (mm)",
                bandThicknessLabel: "Épaisseur actuelle de l'anneau (mm)",
                bandWeightLabel: "Poids actuel de l'anneau (g)",
                estimatedThickness: "Nouvelle épaisseur estimée :",
                estimatedWeight: "Nouveau poids estimé :"
            },
            usefulLinks: {
                cadHeading: "CAO",
                shopHeading: "Achat",
                referencesHeading: "Références"
            },
            faq: {
                note: "Utilisez cet outil FAQ intégré pour rechercher et soumettre les questions des employés via vos webhooks n8n."
            },
            newsFeed: {
                chooseSource: "Choisir une source :",
                refresh: "Actualiser",
                loading: "Chargement des dernières nouvelles…",
                noArticles: "Aucun article disponible pour le moment.",
                dateUnavailable: "Date indisponible",
                rssUnavailable: "Impossible de joindre le service RSS.",
                feedUnavailable: "Impossible de charger les nouvelles pour le moment.",
                tagline: "Manchettes en direct des principaux flux RSS de l'industrie de la joaillerie."
            },
            contactRepository: {
                searchPlaceholder: "Rechercher des contacts...",
                allTags: "Toutes les étiquettes"
            },
            styleMatch: {
                description: "Téléversez une image pour trouver le SKU le plus proche.",
                chooseImage: "Choisir une image",
                findStyle: "Trouver le style",
                pleaseSelect: "Veuillez sélectionner une image",
                processing: "Traitement…",
                error: "Erreur :"
            },
            threeDmToGlb: {
                description: "Importez un fichier 3DM et visualisez-le dans le navigateur."
            },
            employeeSuggestions: {
                descriptionStrong: "Formulaire de suggestions anonyme pour les employés.",
                descriptionBody: "Utilisez ce formulaire pour soumettre des améliorations de processus, des changements suggérés et des commentaires afin d'améliorer notre flux de travail."
            }
        }
    };

    let currentLanguage = "en";

    function t(path) {
        return path.split(".").reduce((acc, key) => acc?.[key], translations[currentLanguage]) ?? path;
    }

    function translatePartial(root) {
        root.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.dataset.i18n;
            const value = t(key);
            if (value !== key) el.textContent = value;
        });
        root.querySelectorAll("[data-i18n-html]").forEach((el) => {
            const key = el.dataset.i18nHtml;
            const value = t(key);
            if (value !== key) el.innerHTML = value;
        });
        root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const key = el.dataset.i18nPlaceholder;
            const value = t(key);
            if (value !== key) el.placeholder = value;
        });
    }

    const tabsData = [
        {
            id: "stone-count-full-eternity",
            categoryKey: "stoneCounts",
            titleKey: "stoneCountFullEternity",
            file: "partials/stone-count-full-eternity.html",
            setup: setupFullEternity
        },
        {
            id: "stone-count-halo",
            categoryKey: "stoneCounts",
            titleKey: "stoneCountHalo",
            file: "partials/stone-count-halo.html",
            setup: setupHalo
        },
        {
            id: "stone-count-hidden-halo",
            categoryKey: "stoneCounts",
            titleKey: "stoneCountHiddenHalo",
            file: "partials/stone-count-hidden-halo.html",
            setup: setupHiddenHalo
        },
        {
            id: "weight-conversion",
            categoryKey: "weights",
            titleKey: "weightConversion",
            file: "partials/weight-conversion.html",
            setup: setupWeightConversion
        },
        {
            id: "weight-wedding-band",
            categoryKey: "weights",
            titleKey: "weightWeddingBand",
            file: "partials/weight-wedding-band.html",
            setup: setupWeddingBandWeight
        },
        {
            id: "width-conversion",
            categoryKey: "weights",
            titleKey: "widthConversion",
            file: "partials/width-conversion.html",
            setup: setupWidthConversion
        },
        {
            id: "weight-diamond-sizes",
            categoryKey: "weights",
            titleKey: "weightDiamondSizes",
            file: "partials/weight-diamond-sizes.html",
            setup: setupDiamondSizes
        },
        {
            id: "useful-links",
            categoryKey: "informations",
            titleKey: "usefulLinks",
            file: "partials/useful-links.html"
        },
        {
            id: "faq",
            categoryKey: "informations",
            titleKey: "faq",
            file: "partials/faq.html"
        },
        {
            id: "news-feed",
            categoryKey: "informations",
            titleKey: "newsFeed",
            file: "partials/news-feed.html",
            setup: setupNewsFeed
        },
        {
            id: "contact-repository",
            categoryKey: "informations",
            titleKey: "contactRepository",
            file: "partials/contact-repository.html",
            setup: setupContactRepository
        },
        {
            id: "rush-requests",
            categoryKey: "forms",
            titleKey: "rushRequests",
            file: "partials/rush-requests.html"
        },
        {
            id: "stone-order-form",
            categoryKey: "forms",
            titleKey: "stoneOrderForm",
            file: "partials/stone-order-form.html"
        },
        {
            id: "employee-suggestions",
            categoryKey: "forms",
            titleKey: "employeeSuggestions",
            file: "partials/employee-suggestions.html"
        }
    ];

    function addCategoryHeader(title) {
        const tabsContainer = document.querySelector(".tabs");
        const headerElement = document.createElement("li");
        headerElement.className = "tab-category";
        headerElement.textContent = title;
        tabsContainer.appendChild(headerElement);
    }

    // Add a new tab dynamically
    function addTab(id, title, content, url = null, category = null) {
        const tabsContainer = document.querySelector(".tabs");
        const contentContainer = document.querySelector(".content");

        if (category) {
            const existingHeader = Array.from(
                tabsContainer.querySelectorAll(".tab-category")
            ).find((header) => header.textContent === category);

            if (!existingHeader) {
                addCategoryHeader(category);
            }
        }

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
            const headingMarkup = title ? `<h2>${title}</h2>` : "";
            sectionElement.innerHTML = `${headingMarkup}${content}`;
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
        const heading = `<h3>${t(`tabs.${tab.titleKey}`)}</h3>`;
        sectionElement.innerHTML = `${heading}<div class="loading-indicator" role="status" aria-live="polite">${t("loading")}</div>`;
        fetch(tab.file)
            .then((r) => r.text())
            .then((html) => {
                sectionElement.innerHTML = `${heading}${html}`;
                translatePartial(sectionElement);
                sectionElement.dataset.loaded = "true";
                tab.setup?.();
            })
            .catch(() => {
                sectionElement.innerHTML = `${heading}<p class="error-message">${t("loadError")}</p>`;
            });
    }

    function renderStaticLanguage() {
        document.documentElement.lang = currentLanguage;
        const splashTitle = document.getElementById("splash-title");
        if (splashTitle) splashTitle.textContent = t("appTitle");
        document.getElementById("sidebar-title").textContent = t("appTitle");
        document.getElementById("footer-text").textContent = t("footer");
        document.getElementById("language-label").textContent = t("languageLabel");
    }

    function renderTabs() {
        tabsContainer.innerHTML = "";
        contentContainer.innerHTML = "";

        let currentCategory = "";

        tabsData.forEach((tab, index) => {
            const categoryLabel = t(`categories.${tab.categoryKey}`);
            if (categoryLabel !== currentCategory) {
                addCategoryHeader(categoryLabel);
                currentCategory = categoryLabel;
            }

            const tabElement = document.createElement("li");
            tabElement.textContent = t(`tabs.${tab.titleKey}`);
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
            t("tabs.designBuddyChat"),
            null,
            "https://chatgpt.com/g/g-67672f631ab481918af63d9ae2b38271-design-buddy",
            t("categories.gpts")
        );

        // Add the "Design Buddy Chat V2" tab dynamically
        addTab(
            "design-buddy-chat-v2",
            t("tabs.designBuddyChatV2"),
            null,
            "https://chatgpt.com/g/g-67bc9728e6f88191a75a4edb4afb10c2-design-buddy-v2",
            t("categories.gpts")
        );

        addTab(
            "style-match",
            t("tabs.styleMatch"),
            `
                <div class="style-match-tool">
                    <p class="style-match-description" data-i18n="styleMatch.description">Upload an image to find the best matching SKU.</p>
                    <label class="file-input-label" for="imageInput" data-i18n="styleMatch.chooseImage">Choose an image</label>
                    <input type="file" id="imageInput" accept="image/*" />
                    <button id="style-match-button" type="button" data-i18n="styleMatch.findStyle">Find Style</button>
                    <pre id="style-match-result" aria-live="polite"></pre>
                </div>
            `,
            null,
            t("categories.tools")
        );
        const styleMatchSection = document.getElementById("style-match");
        if (styleMatchSection) translatePartial(styleMatchSection);
        setupStyleMatch();

        // Add the "3DM to GLB" converter tab (embedded via iframe)
        addTab(
            "3dm-to-glb",
            t("tabs.threeDmToGlb"),
            `
                <p class="tab-description">${t("threeDmToGlb.description")}</p>
                <iframe
                  src="https://ludovickninja.github.io/3DMtoGLB/"
                  loading="lazy"
                  frameborder="0"
                  marginwidth="0"
                  marginheight="0"
                  style="border: none; width: 100%; height: 100vh;"
                  allowfullscreen
                  webkitallowfullscreen
                  mozallowfullscreen
                  msallowfullscreen
                ></iframe>
            `,
            null,
            t("categories.tools")
        );
    }

    const languageSelect = document.getElementById("language-select");
    languageSelect.value = currentLanguage;
    languageSelect.addEventListener("change", (event) => {
        currentLanguage = event.target.value;
        renderStaticLanguage();
        renderTabs();
    });

    renderStaticLanguage();
    renderTabs();


    function setupStyleMatch() {
        const fileInput = document.getElementById("imageInput");
        const button = document.getElementById("style-match-button");
        const resultBox = document.getElementById("style-match-result");

        if (!fileInput || !button || !resultBox) return;

        const webhookUrl = window.DESIGN_BUDDY_STYLE_MATCH_URL || "https://crownring.app.n8n.cloud/webhook-test/43ac772c-997f-4224-acfb-12b2ea22d027";

        const sendImage = async () => {
            if (!fileInput.files.length) {
                window.alert(t("styleMatch.pleaseSelect"));
                return;
            }

            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append("file", file);

            resultBox.textContent = t("styleMatch.processing");
            button.disabled = true;

            try {
                const response = await fetch(webhookUrl, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();
                resultBox.textContent = JSON.stringify(data, null, 2);
            } catch (error) {
                resultBox.textContent = `${t("styleMatch.error")} ${error.message}`;
            } finally {
                button.disabled = false;
            }
        };

        button.addEventListener("click", sendImage);
    }


    function applyFingerSizeConstraints(regionSelect, fingerInput) {
        if (regionSelect.value === "France") {
            fingerInput.step = "0.5";
            fingerInput.min = "42";
            fingerInput.max = "77";
        } else {
            fingerInput.step = "0.25";
            fingerInput.min = "1";
            fingerInput.max = "15";
        }
    }

    function setupFullEternity() {
        const regionTypeSelect = document.getElementById("region-type");
        const fingerSizeInput = document.getElementById("finger-size");
        const bandThicknessInput = document.getElementById("band-thickness");
        const spacingEternityInput = document.getElementById("spacing-eternity");
        const meleeDiameterEternityInput = document.getElementById("melee-diameter-eternity");
        const coverageButtons = document.querySelectorAll(".coverage-button");
        let selectedCoverageType = "full";
        const totalStonesEternityOutput = document.getElementById("total-stones-eternity");
        const requiredThicknessOutput = document.getElementById(
            "required-band-thickness-text"
        );

        applyFingerSizeConstraints(regionTypeSelect, fingerSizeInput);

        const calculateEternityStones = () => {
            const region = regionTypeSelect.value;
            const fingerSize = parseFloat(fingerSizeInput.value) || 0;
            const bandThickness = parseFloat(bandThicknessInput.value) || 0;
            const spacing = parseFloat(spacingEternityInput.value) || 0;
            const meleeDiameter = parseFloat(meleeDiameterEternityInput.value) || 0;
            const coverageType = selectedCoverageType;

            if (fingerSize <= 0 || bandThickness < 0 || spacing < 0 || meleeDiameter <= 0) {
                totalStonesEternityOutput.value = t("common.invalidInputs");
                if (requiredThicknessOutput) requiredThicknessOutput.textContent = "";
                return;
            }

            const regionData = fingerSizes[region];
            const sizeData = regionData.find((item) => item.Size === fingerSize);
            if (!sizeData) {
                totalStonesEternityOutput.value = t("common.sizeNotFound");
                if (requiredThicknessOutput) requiredThicknessOutput.textContent = "";
                return;
            }

            const coverageMap = {
                full: 1,
                half: 0.5,
                semi: 0.5,
                "three-quarters": 0.75,
            };

            const coverageRatio = coverageMap[coverageType] ?? 1;
            const minimumRequiredThickness = meleeDiameter * 0.65 + 0.4;
            const effectiveThickness = Math.max(
                bandThickness,
                minimumRequiredThickness
            );

            const { count, angleDeg } = calcEternityStoneCount(
                sizeData.Finished,
                meleeDiameter,
                effectiveThickness,
                spacing,
                coverageRatio
            );

            totalStonesEternityOutput.value = `${count} ${t("fullEternity.stonesUnit")} (${angleDeg.toFixed(2)}° ${t("fullEternity.stepUnit")})`;

            if (requiredThicknessOutput) {
                const adjusted = effectiveThickness > bandThickness;
                const baseText = `${t("fullEternity.requiredThickness")} ${effectiveThickness.toFixed(
                    2
                )} mm`;
                requiredThicknessOutput.textContent = adjusted
                    ? `${baseText} (${t("fullEternity.adjustedNote")})`
                    : baseText;
            }
        };

        const handleCoverageSelection = (event) => {
            const { coverage } = event.target.dataset;
            if (!coverage) return;

            selectedCoverageType = coverage;
            coverageButtons.forEach((button) => {
                button.classList.toggle(
                    "active",
                    button.dataset.coverage === coverage
                );
            });
            calculateEternityStones();
        };

        regionTypeSelect.addEventListener("change", () => {
            applyFingerSizeConstraints(regionTypeSelect, fingerSizeInput);
            calculateEternityStones();
        });
        fingerSizeInput.addEventListener("input", calculateEternityStones);
        bandThicknessInput.addEventListener("input", calculateEternityStones);
        spacingEternityInput.addEventListener("input", calculateEternityStones);
        meleeDiameterEternityInput.addEventListener("input", calculateEternityStones);
        coverageButtons.forEach((button) =>
            button.addEventListener("click", handleCoverageSelection)
        );

        calculateEternityStones();
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
                totalStonesHaloOutput.value = t("common.invalidInputs");
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
                hiddenHaloTotalStonesOutput.value = t("common.invalidInputs");
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
        const materials = window.materialDensities || [];

        function populateMaterialOptions() {
            if (!knownMaterialSelect || !targetMaterialSelect) return;
            knownMaterialSelect.innerHTML = "";
            targetMaterialSelect.innerHTML = "";

            materials.forEach((material) => {
                const knownOption = document.createElement("option");
                knownOption.value = material.value;
                knownOption.textContent = material.label;
                knownMaterialSelect.appendChild(knownOption);

                if (material.targetEligible !== false) {
                    const targetOption = document.createElement("option");
                    targetOption.value = material.value;
                    targetOption.textContent = material.label;
                    targetMaterialSelect.appendChild(targetOption);
                }
            });
        }

        const calculateConversion = () => {
            const knownWeight = parseFloat(knownWeightInput.value);
            const knownMaterial = parseFloat(knownMaterialSelect.value);
            const targetDensity = parseFloat(targetMaterialSelect.value);

            if (
                isNaN(knownWeight) ||
                knownWeight <= 0 ||
                isNaN(knownMaterial) ||
                knownMaterial <= 0 ||
                isNaN(targetDensity) ||
                targetDensity <= 0
            ) {
                convertedWeightInput.value = t("common.invalidInputs");
                return;
            }
            const volume = knownWeight / knownMaterial;

            const convertedWeight = volume * targetDensity;
            convertedWeightInput.value = convertedWeight.toFixed(3);
        };

        knownWeightInput.addEventListener("input", calculateConversion);
        knownMaterialSelect.addEventListener("change", calculateConversion);
        targetMaterialSelect.addEventListener("change", calculateConversion);
        populateMaterialOptions();
    }

    function setupWeddingBandWeight() {
        const bandButtons = document.querySelectorAll(".band-type-card");
        const regionSelect = document.getElementById("wedding-region-type");
        const fingerSizeInput = document.getElementById("wedding-finger-size");
        const widthInput = document.getElementById("wedding-band-width");
        const thicknessInput = document.getElementById("wedding-band-thickness");
        const karatSelect = document.getElementById("wedding-karat");
        const volumeOutput = document.getElementById("wedding-volume");
        const weightOutput = document.getElementById("wedding-weight");
        const materials = window.materialDensities || [];

        applyFingerSizeConstraints(regionSelect, fingerSizeInput);

        let selectedBand = "pipe";

        function populateKaratOptions() {
            if (!karatSelect) return;
            karatSelect.innerHTML = "";
            materials
                .filter((material) => material.label.includes("Gold"))
                .forEach((material) => {
                    const option = document.createElement("option");
                    option.value = material.value;
                    option.textContent = material.label;
                    karatSelect.appendChild(option);
                });
        }

        function calculateWeddingBandWeight() {
            const region = regionSelect.value;
            const fingerSize = parseFloat(fingerSizeInput.value);
            const width = parseFloat(widthInput.value);
            const thickness = parseFloat(thicknessInput.value);
            const density = parseFloat(karatSelect.value);

            if (
                Number.isNaN(fingerSize) ||
                Number.isNaN(width) ||
                Number.isNaN(thickness) ||
                Number.isNaN(density) ||
                fingerSize <= 0 ||
                width <= 0 ||
                thickness <= 0
            ) {
                volumeOutput.value = t("common.invalidInputs");
                weightOutput.value = t("common.invalidInputs");
                return;
            }

            const regionData = fingerSizes[region];
            const sizeData = regionData?.find((item) => item.Size === fingerSize);
            if (!sizeData) {
                volumeOutput.value = t("common.sizeNotFound");
                weightOutput.value = t("common.sizeNotFound");
                return;
            }

            const innerDiameter = sizeData.Finished;
            const innerRadius = innerDiameter / 2;
            let volumeMm3 = 0;

            if (selectedBand === "pipe") {
                const outerDiameter = innerDiameter + 2 * thickness;
                const outerRadius = outerDiameter / 2;
                volumeMm3 =
                    Math.PI * (outerRadius ** 2 - innerRadius ** 2) * width;
            } else {
                const centerRadius = innerRadius + thickness / 2;
                const crossSectionArea =
                    Math.PI * (width / 2) * (thickness / 2);
                volumeMm3 = 2 * Math.PI * centerRadius * crossSectionArea;
            }

            const weight = volumeMm3 * density;
            volumeOutput.value = volumeMm3.toFixed(2);
            weightOutput.value = weight.toFixed(3);
        }

        function handleBandSelection(event) {
            const { band } = event.currentTarget.dataset;
            if (!band) return;
            selectedBand = band;
            bandButtons.forEach((button) => {
                button.classList.toggle(
                    "active",
                    button.dataset.band === band
                );
            });
            calculateWeddingBandWeight();
        }

        bandButtons.forEach((button) =>
            button.addEventListener("click", handleBandSelection)
        );
        regionSelect.addEventListener("change", () => {
            applyFingerSizeConstraints(regionSelect, fingerSizeInput);
            calculateWeddingBandWeight();
        });
        fingerSizeInput.addEventListener("input", calculateWeddingBandWeight);
        widthInput.addEventListener("input", calculateWeddingBandWeight);
        thicknessInput.addEventListener("input", calculateWeddingBandWeight);
        karatSelect.addEventListener("change", calculateWeddingBandWeight);

        populateKaratOptions();
        calculateWeddingBandWeight();
    }

    function setupWidthConversion() {
        const widthInputs = document.querySelectorAll('#width-conversion input');
        const result = document.getElementById('estimated-weight');
        const diamondResult = document.getElementById('recommended-diamond-size');

        function calculateWeight() {
            const originalWeight = parseFloat(document.getElementById('original-weight').value);
            const originalWidth = parseFloat(document.getElementById('original-width').value);
            const originalThickness = parseFloat(document.getElementById('original-thickness').value);
            const currentDiamondSize = parseFloat(document.getElementById('current-diamond-size').value);
            const newWidth = parseFloat(document.getElementById('new-width').value);
            const newThickness = parseFloat(document.getElementById('new-thickness').value);

            const requiredValues = [
                originalWeight,
                originalWidth,
                originalThickness,
                newWidth,
                newThickness
            ];

            if (requiredValues.some(value => Number.isNaN(value) || value <= 0)) {
                result.textContent = `${t("widthConversion.estimatedWeight")} 0 g`;
            } else {
                const newWeight =
                    originalWeight * (newWidth / originalWidth) * (newThickness / originalThickness);

                result.textContent = `${t("widthConversion.estimatedWeight")} ${newWeight.toFixed(2)} g`;
            }

            if (
                !Number.isNaN(currentDiamondSize) && currentDiamondSize > 0 &&
                !Number.isNaN(originalWidth) && originalWidth > 0 &&
                !Number.isNaN(newWidth) && newWidth > 0
            ) {
                const recommendedSize = newWidth - originalWidth + currentDiamondSize;
                const formattedSize = recommendedSize > 0 ? recommendedSize.toFixed(2) : '0.00';
                diamondResult.textContent = `${t("widthConversion.recommendedDiamond")} ${formattedSize} mm`;
            } else {
                diamondResult.textContent = `${t("widthConversion.recommendedDiamond")} -- mm`;
            }
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
                newWeightOutput.textContent = `${t("diamondSizes.estimatedWeight")} 0 g`;
                newThicknessOutput.textContent = `${t("diamondSizes.estimatedThickness")} 0 mm`;
                return;
            }

            const newWidth = (bandWidth - currentSize) + targetSize;
            let newThickness;

            if (bandThickness - (0.65 * targetSize) > 0.4) {
               newThickness = bandThickness;
            } else {
                newThickness = Math.ceil(((0.65 * targetSize) + 0.4) / 0.05) * 0.05;
            }

            const newBandWeight = bandWeight * (newWidth / bandWidth) * (newThickness / bandThickness);

            newThicknessOutput.textContent = `${t("diamondSizes.estimatedThickness")} ${newThickness.toFixed(2)} mm`;
            newWeightOutput.textContent = `${t("diamondSizes.estimatedWeight")} ${newBandWeight.toFixed(2)} g`;
        }

        diamondInputs.forEach(input => input.addEventListener('input', calculateDiamondSize));
    }

    function setupNewsFeed() {
        const newsList = document.getElementById('news-list');
        const sourceSelect = document.getElementById('feed-source');
        const refreshButton = document.getElementById('refresh-feed');

        if (!newsList || !sourceSelect || !refreshButton) return;

        const rssFeeds = [
            { name: 'National Jeweler', url: 'https://nationaljeweler.com/feed' },
            { name: 'JCK Online', url: 'https://www.jckonline.com/feed/' },
            { name: 'Instore Magazine', url: 'https://instoremag.com/feed/' }
        ];

        rssFeeds.forEach((feed, index) => {
            const option = document.createElement('option');
            option.value = feed.url;
            option.textContent = feed.name;
            if (index === 0) option.selected = true;
            sourceSelect.appendChild(option);
        });

        async function loadFeed(rssUrl) {
            newsList.innerHTML = `<p>${t("newsFeed.loading")}</p>`;

            try {
                const response = await fetch(
                    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
                );

                if (!response.ok) {
                    throw new Error(t("newsFeed.rssUnavailable"));
                }

                const data = await response.json();
                const items = data.items ?? [];

                if (!items.length) {
                    newsList.innerHTML = `<p>${t("newsFeed.noArticles")}</p>`;
                    return;
                }

                const list = document.createElement('ul');
                list.className = 'news-items';

                items.slice(0, 12).forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'news-item';

                    const publishedDate = item.pubDate
                        ? new Date(item.pubDate).toLocaleDateString()
                        : t("newsFeed.dateUnavailable");

                    li.innerHTML = `
                        <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
                        <div class="news-meta">${item.author ? `${item.author} · ` : ''}${publishedDate}</div>
                        ${item.description ? `<p>${item.description.slice(0, 200)}...</p>` : ''}
                    `;

                    list.appendChild(li);
                });

                newsList.innerHTML = '';
                newsList.appendChild(list);
            } catch (error) {
                newsList.innerHTML = `
                    <p class="error-message">${t("newsFeed.feedUnavailable")}</p>
                    <p class="muted">${error.message}</p>
                `;
            }
        }

        sourceSelect.addEventListener('change', () => {
            loadFeed(sourceSelect.value);
        });

        refreshButton.addEventListener('click', () => {
            loadFeed(sourceSelect.value);
        });

        loadFeed(sourceSelect.value);
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
