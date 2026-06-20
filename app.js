// Yearbook Class Database updated for Multi-Layered Bento Grid
const students = {
    hanbin: {
        name: "Sung Hanbin",
        title: "The Creative Soul",
        birthday: "June 13, 2001",
        year: "2001",
        mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQs01-iLoEaTXktR-wbNT7FCPIveBqasf5vw60k-ppERrqtAvjhkszU4Oyj4GXuOYQnL9fnbq7iT4a8J7CU97TKpjIGCPzBLKWk_a8uuAywkx9fiSWqi7X7uy5_t1Knr5Rp8zGYpp-m27_XqFJbkbe9qJPCSC9tT2qZFhjANHmh4CnWZdCXmzAwcvm2p7noCk9-bKZlAXg8pexKoYC5f_CuOa1Zo0WbpuJW33PV7r7ZfxnIZZtw2KUrtCWUnxLHx8iSjf9eftn1EE",
        miniImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDldZmgvNZTyLoeq1uKOvJLRuuc6jrz4GQ8-61qanOssNnD_O6C-lNrjl1tN_yTTyoVUgkpWE7UmQa1-ES9zDFBi8rtBV8HfhgHlNIr8z_5LK92",
        mbti: "ENFJ-A",
        enneagram: "Enneagram 4",
        rank: "#03 / 450",
        club: "Music Ensemble",
        quote: "The best time to plant a tree was 20 years ago. The second best time is today. Class of 2026, let's bloom.",
        tagline: "Stay messy. Stay loud. Don't let the grid lines define your journey.",
        heroImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80",
        stats: [
            { label: "Credits Earned", value: "152" },
            { label: "Late Nights", value: "∞" },
            { label: "Lattes Consumed", value: "412" },
            { label: "GPA", value: "3.91" }
        ],
        note: "Never stop carrying a notebook. Ideas are like butterflies; if you don't catch them, they fly away forever.",
        sig: "SHB // 2024"
    },
    felita: {
        name: "Felita",
        title: "The Visual Architect",
        birthday: "April 24, 2002",
        year: "2002",
        mainImage: "http://googleusercontent.com/profile/picture/felita_main",
        miniImage: "http://googleusercontent.com/profile/picture/felita_mini",
        mbti: "INFP",
        enneagram: "Enneagram 5",
        rank: "#12 / 450",
        club: "Design Guild",
        quote: "Design is not what it looks like and feels like. Design is how it works.",
        tagline: "Structure your chaos, color your margins.",
        heroImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
        stats: [
            { label: "Designs Made", value: "89" },
            { label: "Figma Files", value: "204" },
            { label: "Coffee Cups", value: "318" },
            { label: "GPA", value: "3.85" }
        ],
        note: "The spaces between things are where the real stories hide. Look closely.",
        sig: "FLT // 2024"
    },
    kevin: {
        name: "Kevin",
        title: "The Engineering Anchor",
        birthday: "November 08, 2000",
        year: "2000",
        mainImage: "http://googleusercontent.com/profile/picture/kevin_main",
        miniImage: "http://googleusercontent.com/profile/picture/kevin_mini",
        mbti: "INTJ",
        enneagram: "Enneagram 1",
        rank: "#01 / 450",
        club: "Robotics & Tech",
        quote: "Code never lies, comments sometimes do.",
        tagline: "Build systems that outlast the temporary problems.",
        heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
        stats: [
            { label: "PRs Merged", value: "412" },
            { label: "Bugs Fixed", value: "1,024" },
            { label: "Energy Drinks", value: "510" },
            { label: "GPA", value: "4.00" }
        ],
        note: "Simplicity is the ultimate sophistication. Keep refactoring.",
        sig: "KVN // 2024"
    }
};

/**
 * Global search function triggered in real-time from layout.js header input field
 */
window.performSearch = function(query) {
    if (!query) {
        // If query is cleared, make sure everything is visible if relevant
        const filmCards = document.querySelectorAll('[id^="film-"]');
        filmCards.forEach(card => card.style.opacity = "1");
        return;
    }

    // 1. Direct Scrapbook switching filter matching database keys
    for (const key in students) {
        if (students[key].name.toLowerCase().includes(query) || key.includes(query)) {
            // Found a clear candidate matching data - invoke page content switch handler
            switchStudent(key);
            break;
        }
    }

    // 2. Fallback filter overlay loop: visual dimming for sidebar profile ribbons
    ['hanbin', 'felita', 'kevin'].forEach(k => {
        const filmCard = document.getElementById(`film-${k}`);
        if (filmCard) {
            const matches = students[k].name.toLowerCase().includes(query) || k.includes(query);
            filmCard.style.opacity = matches ? "1" : "0.35";
        }
    });
};

function switchStudent(key) {
    const data = students[key];
    if (!data) return;

    const canvas = document.getElementById('binder-canvas');
    if (!canvas) return;

    // Apply smooth fade transaction transition
    canvas.classList.add('fade-out');

    setTimeout(() => {
        // Dynamically replace DOM nodes across the bento layout matrix grid system
        document.getElementById('binder-name').innerText = data.name;
        document.getElementById('binder-title').innerText = data.title;
        document.getElementById('binder-birthday').innerText = data.birthday;
        document.getElementById('binder-mbti').innerText = data.mbti;
        document.getElementById('binder-enneagram').innerText = data.enneagram;
        document.getElementById('binder-rank').innerText = data.rank;
        document.getElementById('binder-club').innerText = data.club;
        document.getElementById('binder-quote').innerText = `"${data.quote}"`;
        document.getElementById('binder-tagline').innerText = data.tagline;
        
        const heroImg = document.getElementById('binder-hero-image');
        if (heroImg) heroImg.src = data.heroImage;

        // Render localized array lists stats
        const statsContainer = document.getElementById('binder-stats');
        if (statsContainer) {
            statsContainer.innerHTML = data.stats.map(s => `
                <div class="bg-surface-bright/90 p-4 border-2 border-sticker-shadow sticker-shadow flex flex-col items-center justify-center text-center">
                    <span class="font-display-lg text-2xl text-primary font-bold">${s.value}</span>
                    <span class="font-label-sm text-[10px] text-on-surface-variant tracking-tighter uppercase mt-1">${s.label}</span>
                </div>
            `).join('');
        }

        document.getElementById('binder-note').innerText = `"${data.note}"`;
        document.getElementById('binder-sig').innerText = data.sig;

        // Manage film strip visual selections
        ['hanbin', 'felita', 'kevin'].forEach(k => {
            const filmCard = document.getElementById(`film-${k}`);
            if (filmCard) {
                if (k === key) {
                    filmCard.className = "w-16 h-20 bg-white p-1 pb-4 rotate-[6deg] polaroid-shadow flex-shrink-0 cursor-pointer border-4 border-secondary hover:rotate-0 transition-all active-bounce";
                    filmCard.querySelector('img').classList.remove('grayscale');
                } else {
                    const rotClass = k === 'hanbin' ? 'rotate-[-4deg]' : k === 'felita' ? 'rotate-[3deg]' : 'rotate-[-2deg]';
                    filmCard.className = `w-16 h-20 bg-white p-1 pb-4 ${rotClass} polaroid-shadow flex-shrink-0 cursor-pointer border-2 border-primary/20 hover:rotate-0 transition-all`;
                    filmCard.querySelector('img').classList.add('grayscale');
                }
            }
        });

        canvas.classList.remove('fade-out');
    }, 300);
}

// Window Load Handler for Scrapbook rotation setup
window.addEventListener('load', () => {
    // Add visual interactions on click/press
    document.querySelectorAll('button, .polaroid-shadow').forEach(el => {
        el.addEventListener('mousedown', () => {
            el.style.transform = 'scale(0.95) rotate(0deg)';
        });
        el.addEventListener('mouseup', () => {
            el.style.transform = '';
        });
    });
});