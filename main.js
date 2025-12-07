// DOM Content Loaded with error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeApp();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});

function initializeApp() {
    console.log('Initializing app...');
    console.log('Available bots:', botsModule.featured.length);
    
    // Initialize mobile menu FIRST
    initMobileMenu();
    
    // Load latest bots on home page (simplified cards)
    const latestBotsContainer = document.getElementById('latestBots');
    if (latestBotsContainer) {
        console.log('Loading latest bots...');
        loadLatestBots();
    }
    
    // Load all bots on tutorials page (full cards with buttons)
    const allBotsContainer = document.getElementById('allBots');
    if (allBotsContainer) {
        console.log('Loading all bots...');
        loadAllBots();
    }
    
    // Load special videos
    const specialVideosContainer = document.getElementById('specialVideos');
    if (specialVideosContainer) {
        console.log('Loading special videos...');
        loadSpecialVideos();
    }
    
    // Load social platforms
    const socialPlatformsContainer = document.getElementById('socialPlatforms');
    if (socialPlatformsContainer) {
        console.log('Loading social platforms...');
        loadSocialPlatforms();
    }
    
    console.log('App initialized successfully!');
}

// MOBILE MENU FUNCTION - ADD THIS
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    console.log('Initializing mobile menu...');
    console.log('Nav toggle found:', !!navToggle);
    console.log('Nav links found:', !!navLinks);
    
    if (!navToggle || !navLinks) {
        console.log('Mobile menu elements not found');
        return;
    }
    
    // Simple toggle function
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Menu toggle clicked');
        
        const isActive = navLinks.classList.contains('active');
        
        if (isActive) {
            // Close menu
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        } else {
            // Open menu
            navToggle.classList.add('active');
            navLinks.classList.add('active');
        }
    });
    
    // Close menu when clicking on links
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Prevent menu from closing when clicking inside it
    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

function loadLatestBots() {
    const container = document.getElementById('latestBots');
    const latestBots = botsModule.featured.slice(0, 4);
    
    console.log('Displaying latest bots:', latestBots.length);
    container.innerHTML = latestBots.map(bot => createHomeBotCard(bot)).join('');
}

function loadAllBots() {
    const container = document.getElementById('allBots');
    console.log('Displaying all bots:', botsModule.featured.length);
    container.innerHTML = botsModule.featured.map(bot => createFullBotCard(bot)).join('');
}

function loadSpecialVideos() {
    const container = document.getElementById('specialVideos');
    console.log('Displaying special videos:', specialVideosModule.videos.length);
    container.innerHTML = specialVideosModule.videos.map(video => {
        const thumbnailContent = video.thumbnail ? 
            `<img src="${video.thumbnail}" alt="${video.title}" class="thumbnail-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` :
            '';
        const panel = video.panelLink ? 
        `<br><div class="button-grid">
          <a href="${video.youtubeLink}" target="_blank" class="action-btn btn-active">🚀 Get Panel</a>
        </div>` : '';
        
        return `
            <div class="bot-card">
                <div class="card-thumbnail">
                    <div class="thumbnail-image">
                        ${thumbnailContent}
                        <div class="thumbnail-placeholder" style="${video.thumbnail ? 'display: none' : 'display: flex'}">
                            <span class="thumbnail-icon">🎬</span>
                        </div>
                    </div>
                    <div class="upload-time">
                        <span class="time-icon">🕒</span>
                        ${video.duration || 'Just Added'}
                    </div>
                </div>
                <h3 class="bot-name">${video.title}</h3>
                <p class="bot-description">${video.description}</p>
                <div class="button-grid">
                    <a href="${video.youtubeLink}" target="_blank" class="action-btn btn-active">📹 Watch Video</a>
                </div>
                ${panel}
            </div>
        `;
    }).join('');
}

function loadSocialPlatforms() {
    const container = document.getElementById('socialPlatforms');
    console.log('Displaying social platforms:', socialModule.platforms.length);
    container.innerHTML = socialModule.platforms.map(platform => `
        <div class="bot-card social-card">
            <div class="social-icon">${platform.icon}</div>
            <h3 class="bot-name">${platform.name}</h3>
            <p class="bot-description">${platform.description}</p>
            <a href="${platform.link}" target="_blank" class="action-btn btn-active">Visit ${platform.name}</a>
        </div>
    `).join('');
}

// Home Page Card (Simplified) - WITH THUMBNAILS
function createHomeBotCard(bot) {
    const thumbnailContent = bot.thumbnail ? 
        `<img src="${bot.thumbnail}" alt="${bot.name}" class="thumbnail-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` :
        '';
    
    return `
        <div class="bot-card home-card" onclick="location.href='tutorials.html#${bot.name.toLowerCase().replace(/\s+/g, '-')}'" style="cursor: pointer;">
            <div class="card-thumbnail">
                <div class="thumbnail-image">
                    ${thumbnailContent}
                    <div class="thumbnail-placeholder" style="${bot.thumbnail ? 'display: none' : 'display: flex'}">
                        <span class="thumbnail-icon">🤖</span>
                    </div>
                </div>
                <div class="upload-time">
                    <span class="time-icon">🕒</span>
                    ${formatDate(bot.lastUpdated)}
                </div>
            </div>
            
            <div class="card-content">
                <h3 class="bot-name">${bot.name}</h3>
                <p class="bot-description">${bot.description}</p>
                
                <div class="card-meta">
                    <span class="meta-item">
                        <span class="meta-icon">⏱️</span>
                        ${bot.estimatedTime}
                    </span>
                    <span class="meta-item">
                        <span class="meta-icon">📊</span>
                        ${bot.difficulty}
                    </span>
                </div>
                
                <div class="read-more">
                    <span class="read-more-text">Read More →</span>
                </div>
            </div>
        </div>
    `;
}

// Tutorials Page Card (Full with buttons) - WITH THUMBNAILS
function createFullBotCard(bot) {
    const difficultyClass = `difficulty-${bot.difficulty}`;
    const thumbnailContent = bot.thumbnail ? 
        `<img src="${bot.thumbnail}" alt="${bot.name}" class="thumbnail-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` :
        '';
    
    return `
        <div class="bot-card full-card" id="${bot.name.toLowerCase().replace(/\s+/g, '-')}">
            <div class="card-header">
                <div class="card-thumbnail">
                    <div class="thumbnail-image">
                        ${thumbnailContent}
                        <div class="thumbnail-placeholder" style="${bot.thumbnail ? 'display: none' : 'display: flex'}">
                            <span class="thumbnail-icon">🍃</span>
                        </div>
                    </div>
                    <div class="upload-time">
                        <span class="time-icon">🕒</span>
                        ${formatDate(bot.lastUpdated)}
                    </div>
                </div>
                
                <div class="card-title-section">
                    <h3 class="bot-name">${bot.name}</h3>
                    <span class="difficulty-badge ${difficultyClass}">${bot.difficulty}</span>
                </div>
            </div>
            
            <p class="bot-description">${bot.description}</p>
            
            <div class="bot-meta">
                <span class="meta-tag">⏱️ ${bot.estimatedTime}</span>
                <span class="meta-tag">📦 v${bot.version}</span>
                ${bot.tags.map(tag => `<span class="meta-tag">#${tag}</span>`).join('')}
            </div>
            
            <div class="button-grid">
                ${createButton('📹 Tutorial', bot.youtubeLink, bot.youtubeLink ? 'btn-active' : 'btn-inactive')}
                ${createButton('🚀 panel', bot.deploymentLink, bot.deploymentLink ? 'btn-active' : 'btn-inactive')}
                ${createButton('💻 repo', bot.githubLink, bot.githubLink ? 'btn-active' : 'btn-inactive')}
                ${createButton('🔗 pair', bot.pairingLink, bot.pairingLink ? 'btn-active' : 'btn-inactive')}
            </div>
        </div>
    `;
}

function createButton(text, link, className) {
    if (link && className === 'btn-active') {
        return `<a href="${link}" target="_blank" class="action-btn ${className}">${text}</a>`;
    } else {
        return `<button class="action-btn ${className}">${text}</button>`;
    }
}

function formatDate(dateString) {
    try {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    } catch (error) {
        return 'Recent';
    }
}