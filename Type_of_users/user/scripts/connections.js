// Sample followed mechanics data
const followedMechanics = [
    {
        id: 1,
        name: "Ricardo Dalisay",
        specialty: "Engine Specialist",
        rating: 4.9,
        avatar: "../../Assets/Profiles/mcado.jpg"
    },
    {
        id: 2,
        name: "Cardo Dalistep",
        specialty: "Brake & Suspension",
        rating: 4.7,
        avatar: "../../Assets/Profiles/mcado.jpg"
    },
    {
        id: 3,
        name: "Ramon Delgado",
        specialty: "Transmission Expert",
        rating: 4.8,
        avatar: "../../Assets/Profiles/mcado.jpg"
    },
    {
        id: 4,
        name: "Sofia Cruz",
        specialty: "Electrical Diagnostics",
        rating: 4.9,
        avatar: "../../Assets/Profiles/mcado.jpg"
    }
];

// Sample recent interactions
const recentInteractions = [
    {
        mechanicId: 1,
        name: "Ricardo Dalisay",
        lastMessage: "Your car is ready for pickup. Please come by the shop.",
        date: "2025-04-02T10:30:00",
        avatar: "../../Assets/Profiles/mcado.jpg"
    },
    {
        mechanicId: 2,
        name: "Cardo Dalistep",
        lastMessage: "I can check your brake issue tomorrow at 9 AM.",
        date: "2025-04-01T15:20:00",
        avatar: "../../Assets/Profiles/mcado.jpg"
    },
    {
        mechanicId: 3,
        name: "Ramon Delgado",
        lastMessage: "Thank you for choosing our service! Your transmission is fixed.",
        date: "2025-03-30T09:00:00",
        avatar: "../../Assets/Profiles/mcado.jpg"
    }
];

function renderFollowedMechanics() {
    const container = document.getElementById('followedMechanicsGrid');
    const countSpan = document.getElementById('followedCount');
    countSpan.innerText = followedMechanics.length;
    
    container.innerHTML = followedMechanics.map(mechanic => `
        <div class="mechanic-card" data-id="${mechanic.id}">
            <img src="${mechanic.avatar}" alt="${mechanic.name}">
            <div class="mechanic-info">
                <h3>${mechanic.name}</h3>
                <p>${mechanic.specialty}</p>
                <p><i class="fas fa-star" style="color: #fbbf24;"></i> ${mechanic.rating} ★</p>
            </div>
            <button class="unfollow-btn" data-id="${mechanic.id}">Unfollow</button>
        </div>
    `).join('');

    // Add unfollow event listeners
    document.querySelectorAll('.unfollow-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'));
            const index = followedMechanics.findIndex(m => m.id === id);
            if (index !== -1) {
                followedMechanics.splice(index, 1);
                renderFollowedMechanics();
                alert('Mechanic unfollowed successfully.');
            }
        });
    });
}

function renderInteractions() {
    const container = document.getElementById('interactionsList');
    const countSpan = document.getElementById('interactionCount');
    countSpan.innerText = recentInteractions.length;
    
    container.innerHTML = recentInteractions.map(interaction => `
        <div class="interaction-item">
            <div class="interaction-info">
                <img src="${interaction.avatar}" alt="${interaction.name}">
                <div class="interaction-details">
                    <h3>${interaction.name}</h3>
                    <p>${interaction.lastMessage}</p>
                </div>
            </div>
            <div class="interaction-date">
                ${new Date(interaction.date).toLocaleString()}
            </div>
            <button class="message-btn" data-id="${interaction.mechanicId}">Message</button>
        </div>
    `).join('');

    // Add message button event listeners
    document.querySelectorAll('.message-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Open chat with mechanic (chat feature coming soon).');
        });
    });
}

// Initialize page
renderFollowedMechanics();
renderInteractions();