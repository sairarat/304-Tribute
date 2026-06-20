// music.js — Compact Music Player with Integrated SoundCloud Stream API Player
// Target Playlist: https://soundcloud.com/cruzo-4185381/sets/sad-playlist

window.MusicPlayer = (function () {
  let lastTargetContainerId = "sidebar-music-player";
  let scWidget = null;
  let isPlaying = false;
  let currentTrackTitle = "Loading playlist...";
  let currentTrackArtist = "SoundCloud Stream";

  const SOUNDCLOUD_PLAYLIST_URL = "https://soundcloud.com/cruzo-4185381/sets/sad-playlist"; 

  function renderPlayerUI() {
    return `
      <div id="custom-music-widget" class="w-full max-w-sm p-4 rounded-2xl border-4 border-black bg-amber-50 text-neutral-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none">
        
        <div class="flex justify-between items-center mb-3">
          <span id="player-status-text" class="text-[10px] font-mono font-bold tracking-widest uppercase opacity-70">
            ${isPlaying ? '▶ STREAMING' : '■ PAUSED'}
          </span>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/5 border border-black/10 font-bold">
            YEARBOOK AUDIO
          </span>
        </div>

        <div class="w-full mb-3 rounded-xl overflow-hidden border-2 border-black bg-black h-[100px] relative">
          <iframe 
            id="sc-iframe-bridge" 
            width="100%" 
            height="100" 
            scrolling="no" 
            frameborder="no" 
            allow="autoplay" 
            src="https://w.soundcloud.com/player/?url=${encodeURIComponent(SOUNDCLOUD_PLAYLIST_URL)}&color=%23f07035&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true">
          </iframe>
        </div>

        <div class="mb-4">
          <h4 id="track-meta-title" class="font-display-lg text-sm font-black truncate text-neutral-900 leading-tight">
            ${currentTrackTitle}
          </h4>
          <p id="track-meta-artist" class="text-xs font-mono truncate text-neutral-500 mt-0.5">
            ${currentTrackArtist}
          </p>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <button onclick="window.MusicPlayer.prevTrack()" class="bg-white border-2 border-black p-2 rounded-xl text-xs font-bold font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
            PREV
          </button>
          
          <button id="music-toggle-btn" onclick="window.MusicPlayer.togglePlay()" class="bg-primary text-white border-2 border-black p-2 rounded-xl text-xs font-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
            ${isPlaying ? 'PAUSE' : 'PLAY'}
          </button>
          
          <button onclick="window.MusicPlayer.nextTrack()" class="bg-white border-2 border-black p-2 rounded-xl text-xs font-bold font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
            NEXT
          </button>
        </div>

      </div>
    `;
  }

  function initSoundCloudWidget() {
    const iframe = document.getElementById('sc-iframe-bridge');
    if (!iframe || typeof SC === 'undefined') return;

    scWidget = SC.Widget(iframe);

    // Bind event hooks to update metadata during audio stream changes
    scWidget.bind(SC.Widget.Events.READY, () => {
      updateTrackDetails();
    });

    scWidget.bind(SC.Widget.Events.PLAY, () => {
      isPlaying = true;
      updateUIState();
    });

    scWidget.bind(SC.Widget.Events.PAUSE, () => {
      isPlaying = false;
      updateUIState();
    });

    scWidget.bind(SC.Widget.Events.FINISH, () => {
      isPlaying = false;
      updateUIState();
    });
  }

  function updateTrackDetails() {
    if (!scWidget) return;
    scWidget.getCurrentSound((sound) => {
      if (sound) {
        currentTrackTitle = sound.title || "Untitled Track";
        currentTrackArtist = sound.user.username || "Unknown Artist";
        
        const titleEl = document.getElementById('track-meta-title');
        const artistEl = document.getElementById('track-meta-artist');
        if (titleEl) titleEl.innerText = currentTrackTitle;
        if (artistEl) artistEl.innerText = currentTrackArtist;
      }
    });
  }

  function updateUIState() {
    const statusText = document.getElementById('player-status-text');
    const toggleBtn = document.getElementById('music-toggle-btn');
    
    if (statusText) statusText.innerText = isPlaying ? '▶ STREAMING' : '■ PAUSED';
    if (toggleBtn) toggleBtn.innerText = isPlaying ? 'PAUSE' : 'PLAY';
    
    updateTrackDetails();
  }

  function togglePlay() {
    if (!scWidget) return;
    scWidget.toggle();
  }

  function nextTrack() {
    if (!scWidget) return;
    scWidget.next();
    setTimeout(updateTrackDetails, 500);
  }

  function prevTrack() {
    if (!scWidget) return;
    scWidget.prev();
    setTimeout(updateTrackDetails, 500);
  }

  function init(targetContainerId) {
    if (scWidget) {
      console.log("SoundCloud Widget already initialized.");
      return;
    }
    if (targetContainerId) lastTargetContainerId = targetContainerId;
    const container = document.getElementById(lastTargetContainerId);
    if (!container) return;
    
    container.innerHTML = renderPlayerUI();
    
    // Inject SoundCloud Widget API Script dynamically if not already present
    if (typeof SC === 'undefined') {
      const script = document.createElement('script');
      script.src = "https://w.soundcloud.com/player/api.js";
      script.onload = initSoundCloudWidget;
      document.head.appendChild(script);
    } else {
      initSoundCloudWidget();
    }
  }

  // Runtime Auto-Init Framework hook loop configuration
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(() => init(), 100);
  } else {
    document.addEventListener("DOMContentLoaded", () => init());
  }

  return {
    init,
    togglePlay,
    nextTrack,
    prevTrack
  };
})();