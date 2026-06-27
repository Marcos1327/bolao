// ==========================================
// MATA-MATA (KNOCKOUT) LOGIC
// ==========================================

const KNOCKOUT_FLOW = {
    k17: ['k1', 'k2'], k18: ['k3', 'k4'], k19: ['k5', 'k6'], k20: ['k7', 'k8'],
    k21: ['k9', 'k10'], k22: ['k11', 'k12'], k23: ['k13', 'k14'], k24: ['k15', 'k16'],
    k25: ['k17', 'k18'], k26: ['k19', 'k20'], k27: ['k21', 'k22'], k28: ['k23', 'k24'],
    k29: ['k25', 'k26'], k30: ['k27', 'k28'],
    k31: ['k29', 'k30'] // Final
};

const PHASES = [
    { title: "16-avos de Final", start: 1, end: 16 },
    { title: "Oitavas de Final", start: 17, end: 24 },
    { title: "Quartas de Final", start: 25, end: 28 },
    { title: "Semifinais", start: 29, end: 30 },
    { title: "Final", start: 31, end: 31 }
];

/**
 * Obtém o time que ocupa a posição 1 ou 2 de uma partida, para um determinado tipo (p1, p2, real).
 */
function getKnockoutTeam(matchId, type, teamPos) {
    const num = parseInt(matchId.substring(1));
    if (num <= 16) {
        // Na primeira fase do mata-mata, os times são os mesmos para todos (escolhidos oficialmente)
        return appState.knockoutTeams[`${matchId}_${teamPos}`] || "";
    }
    
    // Nas fases seguintes, depende de quem venceu o jogo anterior na chave daquele jogador/real
    const prevMatchId = KNOCKOUT_FLOW[matchId][teamPos - 1];
    return getWinner(prevMatchId, type);
}

/**
 * Determina o vencedor de uma partida com base no placar e nos pênaltis.
 */
function getWinner(matchId, type) {
    const matchData = appState.matches[matchId];
    if (!matchData || !matchData[type]) return "";
    
    const score = matchData[type];
    if (score[0] === null || score[1] === null) return "";
    
    const t1 = getKnockoutTeam(matchId, type, 1) || "TBD 1";
    const t2 = getKnockoutTeam(matchId, type, 2) || "TBD 2";
    
    if (score[0] > score[1]) return t1;
    if (score[1] > score[0]) return t2;
    
    // Em caso de empate, olha os pênaltis
    const pen = matchData[`${type}Pen`];
    if (pen === 0) return t1;
    if (pen === 1) return t2;
    
    return "";
}

/**
 * Renderiza um input block específico para o mata-mata
 */
function renderKnockoutInputBlock(matchId, type, title, typeClass) {
    const stateVal = appState.matches[matchId] && appState.matches[matchId][type]
        ? appState.matches[matchId][type]
        : [null, null];

    let valH = stateVal[0] !== null ? stateVal[0] : '';
    let valA = stateVal[1] !== null ? stateVal[1] : '';

    const t1 = getKnockoutTeam(matchId, type, 1) || "TBD";
    const t2 = getKnockoutTeam(matchId, type, 2) || "TBD";

    // Pênaltis
    let isDraw = (stateVal[0] !== null && stateVal[1] !== null && stateVal[0] === stateVal[1]);
    const penVal = appState.matches[matchId] ? appState.matches[matchId][`${type}Pen`] : null;
    
    let penaltyHtml = '';
    if (isDraw) {
        penaltyHtml = `
            <div class="penalty-select-container">
                <span class="penalty-select-label">Quem passou?</span>
                <select class="penalty-select" data-match="${matchId}" data-type="${type}">
                    <option value="">Selecione...</option>
                    <option value="0" ${penVal === 0 ? 'selected' : ''}>${t1}</option>
                    <option value="1" ${penVal === 1 ? 'selected' : ''}>${t2}</option>
                </select>
            </div>
        `;
    }

    // Se for 16-avos e for o bloco REAL, mostramos dropdowns para selecionar os times
    let t1Html = `<span class="team-name" title="${t1}">${t1}</span>`;
    let t2Html = `<span class="team-name" title="${t2}">${t2}</span>`;

    const num = parseInt(matchId.substring(1));
    if (num <= 16 && type === 'real') {
        // Gerar options dos 48 times
        let optionsHTML = `<option value="">Selecione o Time</option>`;
        ALL_TEAMS.forEach(team => {
            optionsHTML += `<option value="${team}">${team}</option>`;
        });

        t1Html = `<div class="team-name" style="display: flex; justify-content: flex-end;">
            <select class="team-select knockout-team-select" data-match="${matchId}" data-pos="1" style="width: 100%; max-width: 120px; padding: 4px; font-size: 0.8rem;">
                ${optionsHTML.replace(`value="${t1}"`, `value="${t1}" selected`)}
            </select>
        </div>`;
        
        t2Html = `<div class="team-name" style="display: flex; justify-content: flex-start;">
            <select class="team-select knockout-team-select" data-match="${matchId}" data-pos="2" style="width: 100%; max-width: 120px; padding: 4px; font-size: 0.8rem;">
                ${optionsHTML.replace(`value="${t2}"`, `value="${t2}" selected`)}
            </select>
        </div>`;
    }

    return `
        <div class="input-block ${typeClass}">
            <div class="points-badge" id="badge-${matchId}-${type}"></div>
            <div class="block-title">${title}</div>
            <div class="score-inputs">
                ${t1Html}
                <input type="number" min="0" class="score-input ko-score" data-match="${matchId}" data-type="${type}" data-team="0" value="${valH}">
                <span class="versus">x</span>
                <input type="number" min="0" class="score-input ko-score" data-match="${matchId}" data-type="${type}" data-team="1" value="${valA}">
                ${t2Html}
            </div>
            ${penaltyHtml}
        </div>
    `;
}

/**
 * Renderiza os filtros do Mata-Mata
 */
function renderKnockoutFilters() {
    if (uiState.knockoutFilter === undefined) {
        uiState.knockoutFilter = 'all';
    }

    const container = document.getElementById('knockout-phase-filters');
    if (!container) return;

    let html = `<button class="filter-btn ${uiState.knockoutFilter === 'all' ? 'active' : ''}" data-kfilter="all">Todas as Fases</button>`;

    PHASES.forEach((phase, index) => {
        html += `<button class="filter-btn ${uiState.knockoutFilter === index.toString() ? 'active' : ''}" data-kfilter="${index}">${phase.title}</button>`;
    });

    container.innerHTML = html;

    // Listeners para os botões de filtro
    document.querySelectorAll('[data-kfilter]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            uiState.knockoutFilter = e.target.dataset.kfilter;
            renderKnockout();
        });
    });
}

/**
 * Renderiza todo o container de mata-mata
 */
function renderKnockout() {
    renderKnockoutFilters();

    const container = document.getElementById('knockout-container');
    if (!container) return;
    let html = '';

    PHASES.forEach((phase, index) => {
        if (uiState.knockoutFilter !== 'all' && uiState.knockoutFilter !== index.toString()) {
            return; // Ignora esta fase se estiver filtrada
        }

        html += `
            <div class="knockout-phase">
                <h2 class="knockout-phase-title">${phase.title}</h2>
                <div class="matches-list">
        `;

        for (let i = phase.start; i <= phase.end; i++) {
            const matchId = `k${i}`;
            html += `
                <div class="match-row">
                    <div class="match-info">Jogo ${i}</div>
                    <div class="match-inputs-container">
                        ${renderKnockoutInputBlock(matchId, 'p1', 'Palpite Marcos', 'p1-block')}
                        ${renderKnockoutInputBlock(matchId, 'real', 'Oficial', 'real-block')}
                        ${renderKnockoutInputBlock(matchId, 'p2', 'Palpite Rebeka', 'p2-block')}
                    </div>
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    attachKnockoutListeners();
}

/**
 * Anexa listeners específicos do mata-mata
 */
function attachKnockoutListeners() {
    // Placares
    document.querySelectorAll('.ko-score').forEach(input => {
        input.addEventListener('input', (e) => {
            const matchId = e.target.dataset.match;
            const type = e.target.dataset.type;
            const teamIdx = parseInt(e.target.dataset.team);
            let val = e.target.value === '' ? null : parseInt(e.target.value);

            if (!appState.matches[matchId]) {
                appState.matches[matchId] = { p1: [null, null], p2: [null, null], real: [null, null] };
            }
            if (!appState.matches[matchId][type]) {
                appState.matches[matchId][type] = [null, null];
            }

            appState.matches[matchId][type][teamIdx] = val;
            saveState();
            renderKnockout(); // Re-renderiza para atualizar dependências nas próximas fases
        });
    });

    // Pênaltis
    document.querySelectorAll('.penalty-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const matchId = e.target.dataset.match;
            const type = e.target.dataset.type;
            const val = e.target.value === '' ? null : parseInt(e.target.value);

            if (!appState.matches[matchId]) {
                appState.matches[matchId] = {};
            }
            appState.matches[matchId][`${type}Pen`] = val;
            saveState();
            renderKnockout();
        });
    });

    // Seleção de Times nos 16-avos (só existe no bloco real)
    document.querySelectorAll('.knockout-team-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const matchId = e.target.dataset.match;
            const pos = e.target.dataset.pos;
            
            appState.knockoutTeams[`${matchId}_${pos}`] = e.target.value;
            saveState();
            renderKnockout();
        });
    });
}

// Interceptar o carregamento e navegação de abas
document.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabGroups = document.getElementById('tab-groups');
    const tabKnockout = document.getElementById('tab-knockout');

    function switchTab(tabId) {
        tabBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');

        if (tabId === 'groups') {
            tabGroups.style.display = 'block';
            tabKnockout.style.display = 'none';
        } else {
            tabGroups.style.display = 'none';
            tabKnockout.style.display = 'block';
            renderKnockout(); // Renderiza sempre que entra na aba para garantir consistência
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            uiState.currentTab = e.target.dataset.tab;
            switchTab(uiState.currentTab);
        });
    });
    
    // Inicia renderização se o knockout for a aba inicial (por default é groups, mas garante)
    if (uiState.currentTab === 'knockout') {
        switchTab('knockout');
    }
});
