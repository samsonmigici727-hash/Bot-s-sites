// Filter and search functionality for tutorials page
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
});

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('botSearch');
    const allBotsContainer = document.getElementById('allBots');
    
    if (!allBotsContainer) return;

    // Initialize stats
    updateStats();

    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterBots(filter, searchInput.value);
        });
    });

    // Search input event listener
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            filterBots(activeFilter, this.value);
        });
    }
}

function filterBots(difficultyFilter, searchTerm) {
    const allBotsContainer = document.getElementById('allBots');
    const bots = botsModule.featured;
    
    let filteredBots = bots;

    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
        filteredBots = filteredBots.filter(bot => bot.difficulty === difficultyFilter);
    }

    // Apply search filter
    if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filteredBots = filteredBots.filter(bot => 
            bot.name.toLowerCase().includes(searchLower) ||
            bot.description.toLowerCase().includes(searchLower) ||
            bot.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    }

    // Display filtered bots
    displayFilteredBots(filteredBots);
    updateStats(filteredBots);
}

function displayFilteredBots(bots) {
    const allBotsContainer = document.getElementById('allBots');
    
    if (bots.length === 0) {
        allBotsContainer.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>No bots found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
    } else {
        allBotsContainer.innerHTML = bots.map(bot => createFullBotCard(bot)).join('');
    }
}

function updateStats(filteredBots = null) {
    const totalBots = document.getElementById('totalBots');
    const activeBots = document.getElementById('activeBots');
    const lastUpdate = document.getElementById('lastUpdate');
    
    const bots = filteredBots || botsModule.featured;
    
    if (totalBots) totalBots.textContent = bots.length;
    
    if (activeBots) {
        const activeCount = bots.filter(bot => 
            bot.youtubeLink && bot.githubLink
        ).length;
        activeBots.textContent = activeCount;
    }
    
    if (lastUpdate) {
        const latestUpdate = bots.reduce((latest, bot) => {
            const botDate = new Date(bot.lastUpdated);
            return botDate > latest ? botDate : latest;
        }, new Date(0));
        
        if (latestUpdate.getTime() > 0) {
            lastUpdate.textContent = latestUpdate.toLocaleDateString();
        }
    }
}