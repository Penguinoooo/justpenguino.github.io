document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".site-search")) {
        return;
    }

    const inDownloadsFolder = window.location.pathname.toLowerCase().includes("/downloads/");
    const basePath = inDownloadsFolder ? "../" : "";

    const searchItems = [
        { title: "Home", keywords: ["home", "main", "penguino", "landing"], href: "index.html" },
        { title: "Find Me Online", keywords: ["social", "socials", "youtube", "discord", "steam", "instagram", "twitch", "obs"], href: "index.html#socials" },
        { title: "Black Ops 3", keywords: ["bo3", "call of duty", "zombies"], href: "downloads/bo3.html" },
        { title: "Jedi: Survivor", keywords: ["jedi", "survivor", "star wars", "difficulty editor", "toggle hud", "unlimited stamina", "debug menu", "ai spawner"], href: "downloads/jedi-survivor.html" },
        { title: "Minecraft Modpack", keywords: ["minecraft", "forge", "modpack", "mods"], href: "downloads/minecraft-modpack.html" },
        { title: "Custom Mod", keywords: ["custom", "mod", "download"], href: "downloads/custom-mod.html" },
        { title: "Hall Of Fame", keywords: ["hall", "fame", "discord hall of fame", "hidden page"], href: "hall-of-fame.html" },
        { title: "Elders of Zion", keywords: ["Elders", "Zion", "wtf", "lmao", "pdf"], href: "placeholder.html" },
        { title: "Jumpscare", keywords: ["jumpscare", "scare", "scream", "spooky", "sound"], href: "jumpscare.html" }
    ];

    const resolveHref = (href) => {
        if (/^(https?:|mailto:|tel:)/i.test(href)) {
            return href;
        }

        return `${basePath}${href}`;
    };

    const siteSearch = document.createElement("div");
    siteSearch.className = "site-search";
    siteSearch.innerHTML = `
        <button class="site-search-trigger" type="button" aria-label="Open search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6"></circle>
                <path d="M20 20l-4.2-4.2"></path>
            </svg>
        </button>
        <div class="site-search-overlay" hidden>
            <div class="site-search-panel" role="dialog" aria-modal="true" aria-label="Site search">
                <div class="site-search-panel-header">
                    <form class="site-search-form" autocomplete="off">
                        <input class="site-search-input" type="text" placeholder="Search site..." aria-label="Search site">
                        <button class="site-search-button" type="submit">Search</button>
                    </form>
                    <button class="site-search-close" type="button" aria-label="Close search">✕</button>
                </div>
                <div class="site-search-results" hidden></div>
            </div>
        </div>
    `;

    document.body.appendChild(siteSearch);

    const trigger = siteSearch.querySelector(".site-search-trigger");
    const overlay = siteSearch.querySelector(".site-search-overlay");
    const form = siteSearch.querySelector(".site-search-form");
    const input = siteSearch.querySelector(".site-search-input");
    const closeButton = siteSearch.querySelector(".site-search-close");
    const results = siteSearch.querySelector(".site-search-results");

    const getMatches = (query) => {
        const normalized = query.trim().toLowerCase();

        if (!normalized) {
            return [];
        }

        return searchItems.filter((item) => {
            const haystack = `${item.title} ${item.keywords.join(" ")}`.toLowerCase();
            return haystack.includes(normalized);
        }).slice(0, 6);
    };

    const renderMatches = (matches) => {
        if (!input.value.trim()) {
            results.hidden = true;
            results.innerHTML = "";
            return;
        }

        results.hidden = false;

        if (!matches.length) {
            results.innerHTML = '<div class="site-search-empty">No matches found.</div>';
            return;
        }

        results.innerHTML = matches.map((item) => `
            <a class="site-search-result" href="${resolveHref(item.href)}">
                <span class="site-search-title">${item.title}</span>
            </a>
        `).join("");
    };

    const openSearch = () => {
        overlay.hidden = false;
        trigger.setAttribute("aria-expanded", "true");
        document.body.classList.add("search-open");
        window.setTimeout(() => input.focus(), 0);
        renderMatches(getMatches(input.value));
    };

    const closeSearch = () => {
        overlay.hidden = true;
        results.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
        input.blur();
        document.body.classList.remove("search-open");
    };

    trigger.addEventListener("click", openSearch);
    closeButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeSearch();
    });

    input.addEventListener("input", () => {
        renderMatches(getMatches(input.value));
    });

    input.addEventListener("focus", () => {
        renderMatches(getMatches(input.value));
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const [firstMatch] = getMatches(input.value);

        if (firstMatch) {
            window.location.href = resolveHref(firstMatch.href);
            return;
        }

        renderMatches([]);
    });

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeSearch();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !overlay.hidden) {
            closeSearch();
        }
    });
});