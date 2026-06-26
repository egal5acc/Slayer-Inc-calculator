// Rune Type Data
const runeTypes = {
    starter: {
        name: "⭐ Starter Rune",
        description: "Die Anfänger Runes. Einfach zu farmen.",
        color: "#5eff3c",
        multiplier: 1
    },
    golden: {
        name: "🟡 Golden Rune",
        description: "Mittlere Runes mit besseren Stats.",
        color: "#ffd700",
        multiplier: 1.5
    },
    magma: {
        name: "🔥 Magma Rune",
        description: "Starke Runes mit erhöhtem Drop Rate.",
        color: "#ff6b35",
        multiplier: 2
    },
    plasma: {
        name: "⚡ Plasma Rune",
        description: "Sehr starke Runes mit massiven Boni.",
        color: "#00d9ff",
        multiplier: 3
    },
    snow: {
        name: "❄️ Snow Rune",
        description: "Endgame Runes mit extremen Multiplikatoren.",
        color: "#87ceeb",
        multiplier: 4
    }
};

let selectedRuneType = 'starter';

function selectRuneType(type) {
    selectedRuneType = type;
    
    // Update buttons
    document.querySelectorAll('.rune-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    // Update info
    const rune = runeTypes[type];
    document.getElementById('runeTypeInfo').innerHTML = `
        <strong>${rune.name}</strong><br>
        ${rune.description}
    `;
    
    calculate();
}

function formatNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
}

function formatLargeNumber(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
}

function formatTime(minutes) {
    if (minutes < 1) {
        return (minutes * 60).toFixed(1) + ' Sekunden';
    }
    if (minutes < 60) {
        return minutes.toFixed(1) + ' Minuten';
    }
    if (minutes < 1440) {
        const hours = minutes / 60;
        return hours.toFixed(1) + ' Stunden';
    }
    const days = minutes / 1440;
    return days.toFixed(1) + ' Tage';
}

function calculate() {
    // Get inputs
    const runeLuck = parseFloat(document.getElementById('runeLuck').value) || 1;
    const runeBulk = parseFloat(document.getElementById('runeBulk').value) || 1;
    const clone = parseFloat(document.getElementById('clone').value) || 1;
    const runeSpeed = parseFloat(document.getElementById('runeSpeed').value) || 1;
    const baseDropRate = parseFloat(document.getElementById('baseDropRate').value) || 1;
    const fillerRunes = parseFloat(document.getElementById('fillerRunes').value) || 0;
    const targetRunes = parseFloat(document.getElementById('targetRunes').value) || 1000;

    // Get rune type multiplier
    const runeMultiplier = runeTypes[selectedRuneType].multiplier;

    // Calculate: (Rune Luck × Rune Bulk) × Clone × Rune Type × Rune Speed
    const basMultiplier = runeLuck * runeBulk;
    const cloneMultiplier = clone;
    const speedMultiplier = runeSpeed;
    
    // Filler runes reduce effectiveness
    const fillerFactor = 1 - (fillerRunes / 100);
    
    // Final multiplier
    const finalMultiplier = basMultiplier * cloneMultiplier * runeMultiplier * speedMultiplier * fillerFactor;

    // Calculate runes per time unit
    const runesPerMin = baseDropRate * finalMultiplier;
    const runesPerHour = runesPerMin * 60;
    const runesPerDay = runesPerHour * 24;

    // Time needed
    const timeNeededMinutes = targetRunes / runesPerMin;

    // Update display
    document.getElementById('multiplier').textContent = finalMultiplier.toFixed(2) + '×';
    document.getElementById('runesPerMin').textContent = formatNumber(runesPerMin);
    document.getElementById('runesPerHour').textContent = formatLargeNumber(runesPerHour);
    document.getElementById('runesPerDay').textContent = formatLargeNumber(runesPerDay);
    document.getElementById('timeNeeded').textContent = formatTime(timeNeededMinutes);

    // Update details
    document.getElementById('detail-base').textContent = baseDropRate.toFixed(2);
    document.getElementById('detail-luck').textContent = runeLuck.toFixed(2);
    document.getElementById('detail-bulk').textContent = runeBulk.toFixed(2);
    document.getElementById('detail-clone').textContent = clone.toFixed(2);
    document.getElementById('detail-speed').textContent = runeSpeed.toFixed(2);
    document.getElementById('detail-filler').textContent = fillerRunes.toFixed(0) + '%';
    document.getElementById('detail-final').textContent = finalMultiplier.toFixed(2) + '×';
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    selectRuneType('starter');
});