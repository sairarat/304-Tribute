// layout.js — Shared site chrome for the Yearbook 2026 binder pages.
// Each page declares two empty mount points:
//   <div id="app-shell-top"></div>     (before <main>, gets header + sidebar)
//   <div id="app-shell-bottom"></div>  (after <main>, gets the mobile nav)
// then calls initLayout('home' | 'class' | 'memory') once layout.js has loaded.

const SIDEBAR_LINKS = [
  { key: "home", label: "Home", icon: "book", href: "home.html" },
  { key: "class", label: "Class of 2026", icon: "school", href: "index.html" },
  { key: "memory", label: "Memory Wall", icon: "auto_awesome", href: "memoryHall.html" },
];

const MOBILE_NAV_LINKS = [
  { key: "home", label: "HOME", icon: "home", href: "home.html" },
  { key: "class", label: "CLASS", icon: "school", href: "index.html" },
  { key: "memory", label: "MEMORY", icon: "auto_awesome", href: "memoryHall.html" },
];

function renderSidebarLink(item, active) {
  if (item.locked) {
    return `
      <a class="text-on-surface-variant px-8 py-3 hover:text-secondary hover:translate-x-1 transition-all duration-200 flex items-center gap-4" href="#" onclick="toggleSidebar(); alert('${item.label} is locked!')">
        <span class="material-symbols-outlined">${item.icon}</span> ${item.label}
      </a>`;
  }
  if (item.key === active) {
    return `
      <a class="bg-secondary-container text-on-secondary-container rounded-l-full ml-4 pl-4 py-3 rotate-[-1deg] sticker-shadow flex items-center gap-4 transition-all duration-200" href="${item.href}">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">${item.icon}</span> ${item.label}
      </a>`;
  }
  return `
    <a class="text-on-surface-variant px-8 py-3 hover:text-secondary hover:translate-x-1 transition-all duration-200 flex items-center gap-4" href="${item.href}">
      <span class="material-symbols-outlined">${item.icon}</span> ${item.label}
    </a>`;
}

function renderSidebar(active) {
  return `
    <aside id="sidebar-menu" class="h-full w-72 fixed left-0 top-0 pt-20 pb-8 bg-surface-container-high border-r-4 border-sticker-shadow z-40 flex flex-col gap-y-4 transform -translate-x-full transition-transform duration-300">
      <div class="px-8 mb-6">
        <h2 class="font-headline-lg text-headline-lg text-secondary underline decoration-secondary-container">Memory Binder</h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant opacity-70">Class of 2026</p>
      </div>
      <nav class="flex flex-col gap-y-2">
        ${SIDEBAR_LINKS.map((item) => renderSidebarLink(item, active)).join("")}
      </nav>
      
      <div id="sidebar-music-player" class="mt-auto mx-8 flex pb-4"></div>
    </aside>`;
}

function renderHeader(active) {
  const classActive = active === "class";
  return `
    <header class="bg-washi-tape-pink/80 backdrop-blur-sm fixed top-0 left-0 right-0 h-16 z-50 border-b-2 border-dashed border-primary/30 flex justify-between items-center px-8 py-2 shadow-sm">
      <div class="font-display-script text-[32px] md:text-display-script text-primary rotate-[-2deg] drop-shadow-sm flex items-center gap-3 font-bold">
        <button class="material-symbols-outlined text-primary cursor-pointer hover:scale-125 active:scale-90 transition-all select-none duration-200" onclick="toggleSidebar()">menu</button>
        304 Yearbook 
      </div>
      <nav class="hidden lg:flex items-center gap-8 font-medium">
        <a class="${classActive ? "text-primary font-bold underline decoration-wavy" : "text-on-surface-variant"} font-label-sm hover:rotate-1 hover:scale-105 transition-transform" href="index.html">Class Gallery</a>
        <a class="text-on-surface-variant font-label-sm hover:rotate-1 hover:scale-105 transition-transform" href="message.html">Messages</a>
      </nav>
      <div class="flex items-center gap-3">
        <div class="hidden md:flex bg-surface-container-lowest px-4 py-1 rounded-full border-2 border-primary/20 items-center gap-2">
          <span class="material-symbols-outlined text-primary text-xl">search</span>
          <input id="global-search-input" class="bg-transparent border-none focus:ring-0 text-label-sm font-label-sm w-32 md:w-48" placeholder="Search friends..." type="text" />
        </div>
        <button class="material-symbols-outlined text-primary hover:rotate-12 transition-transform p-2 cursor-pointer" onclick="triggerScreenMagic('hearts_flowers')">history_edu</button>
        <button class="material-symbols-outlined text-primary hover:rotate-12 transition-transform p-2 cursor-pointer" onclick="triggerScreenMagic('glitters_stars')">auto_fix_high</button>
      </div>
    </header>`;
}

function renderMobileNav(active) {
  const tabs = MOBILE_NAV_LINKS.map((item) => {
    if (item.key === active) {
      return `
        <a class="flex flex-col items-center gap-1 text-primary scale-110" href="${item.href}">
          <div class="bg-primary-container text-on-primary-container p-2 rounded-xl sticker-shadow rotate-[-2deg]">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">${item.icon}</span>
          </div>
          <span class="font-label-sm text-[10px] font-bold">${item.label}</span>
        </a>`;
    }
    return `
      <a class="flex flex-col items-center gap-1 text-on-surface-variant" href="${item.href}">
        <span class="material-symbols-outlined">${item.icon}</span>
        <span class="font-label-sm text-[10px]">${item.label}</span>
      </a>`;
  }).join("");

  return `
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 flex justify-around items-center py-3 border-t border-outline/10 h-20 px-4">
      ${tabs}
      <button class="flex flex-col items-center gap-1 text-on-surface-variant" onclick="toggleSidebar()">
        <span class="material-symbols-outlined">menu</span>
        <span class="font-label-sm text-[10px]">MENU</span>
      </button>
    </nav>`;
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar-menu");
  if (sidebar) {
    sidebar.classList.toggle("-translate-x-full");
  }
}

// Fullscreen Screen Magic Particle Animation Pipeline (CSS Driven)
window.triggerScreenMagic = function(type) {
  const pool = type === 'hearts_flowers' 
    ? ['❤️', '💖', '💕', '🌸', '🌹', '🌻', '🌺'] 
    : ['✨', '⭐', '🌟', '💫', '💎', '✨'];

  let overlay = document.getElementById('screen-magic-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'screen-magic-overlay';
    document.body.appendChild(overlay);
  }

  const particleCount = 35;
  const spawnedParticles = [];

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.innerText = pool[Math.floor(Math.random() * pool.length)];
    p.className = 'magic-particle';
    
    // Aesthetic size variance configuration
    p.style.fontSize = `${Math.floor(Math.random() * 20) + 20}px`;
    
    // Micro staggered delay layout so entries arrive naturally
    p.style.animationDelay = `${Math.random() * 0.4}s`;

    if (type === 'hearts_flowers') {
      p.classList.add('particle-float');
      p.style.left = `${Math.random() * 100}vw`;
      p.style.setProperty('--drift-start', `${(Math.random() * 40) - 20}px`);
      p.style.setProperty('--drift-end', `${(Math.random() * 160) - 80}px`);
      p.style.setProperty('--spin-deg', `${(Math.random() * 360) - 180}deg`);
    } else {
      p.classList.add('particle-burst');
      
      const startX = Math.random() * 100;
      const startY = Math.random() * 70 + 15;
      p.style.left = `${startX}vw`;
      p.style.top = `${startY}vh`;
      
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.floor(Math.random() * 160) + 100; 
      const tx = Math.cos(angle) * radius;
      const ty = Math.sin(angle) * radius;
      
      p.style.setProperty('--tx', `${tx}px`);
      p.style.setProperty('--ty', `${ty}px`);
      p.style.setProperty('--spin-deg', `${(Math.random() * 720) - 360}deg`);
    }

    overlay.appendChild(p);
    spawnedParticles.push(p);
  }

  // Clear elements safely after sequence finishes execution loop
  setTimeout(() => {
    spawnedParticles.forEach(p => p.remove());
  }, 3600);
};

// Mounts the shared header, sidebar, and mobile nav into a page.
function initLayout(active) {
  const top = document.getElementById("app-shell-top");
  const bottom = document.getElementById("app-shell-bottom");
  
  if (top) top.innerHTML = renderHeader(active) + renderSidebar(active);
  if (bottom) bottom.innerHTML = renderMobileNav(active);
  
  const searchInput = document.getElementById("global-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (window.performSearch) {
        window.performSearch(query);
      }
    });
  }

  setTimeout(() => {
    if (window.MusicPlayer) {
      window.MusicPlayer.init("sidebar-music-player");
    }
  }, 0);
}