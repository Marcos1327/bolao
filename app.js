/**
 * Bolão da Copa do Mundo - Core Logic
 * 
 * Este arquivo gerencia os dados dos grupos, o estado da aplicação
 * (salvo no localStorage) e as regras de negócio para cálculo de pontos.
 */

// ==========================================
// 1. DADOS DOS GRUPOS E PARTIDAS
// ==========================================
const GROUPS_DATA = {
    A: {
        teams: ["Coreia do Sul", "México", "República Tcheca", "África do Sul"],
        matches: [
            { id: 'A1', t1: "México", t2: "África do Sul" },
            { id: 'A2', t1: "Coreia do Sul", t2: "República Tcheca" },
            { id: 'A3', t1: "República Tcheca", t2: "África do Sul" },
            { id: 'A4', t1: "México", t2: "Coreia do Sul" },
            { id: 'A5', t1: "África do Sul", t2: "Coreia do Sul" },
            { id: 'A6', t1: "República Tcheca", t2: "México" }
        ]
    },
    B: {
        teams: ["Bósnia", "Canadá", "Catar", "Suíça"],
        matches: [
            { id: 'B1', t1: "Canadá", t2: "Bósnia" },
            { id: 'B2', t1: "Catar", t2: "Suíça" },
            { id: 'B3', t1: "Suíça", t2: "Bósnia" },
            { id: 'B4', t1: "Canadá", t2: "Catar" },
            { id: 'B5', t1: "Suíça", t2: "Canadá" },
            { id: 'B6', t1: "Bósnia", t2: "Catar" }
        ]
    },
    C: {
        teams: ["Brasil", "Escócia", "Haiti", "Marrocos"],
        matches: [
            { id: 'C1', t1: "Brasil", t2: "Marrocos" },
            { id: 'C2', t1: "Haiti", t2: "Escócia" },
            { id: 'C3', t1: "Escócia", t2: "Marrocos" },
            { id: 'C4', t1: "Brasil", t2: "Haiti" },
            { id: 'C5', t1: "Marrocos", t2: "Haiti" },
            { id: 'C6', t1: "Escócia", t2: "Brasil" }
        ]
    },
    D: {
        teams: ["Austrália", "Estados Unidos", "Paraguai", "Turquia"],
        matches: [
            { id: 'D1', t1: "Estados Unidos", t2: "Paraguai" },
            { id: 'D2', t1: "Austrália", t2: "Turquia" },
            { id: 'D3', t1: "Estados Unidos", t2: "Austrália" },
            { id: 'D4', t1: "Turquia", t2: "Paraguai" },
            { id: 'D5', t1: "Turquia", t2: "Estados Unidos" },
            { id: 'D6', t1: "Paraguai", t2: "Austrália" }
        ]
    },
    E: {
        teams: ["Alemanha", "Costa do Marfim", "Curaçao", "Equador"],
        matches: [
            { id: 'E1', t1: "Alemanha", t2: "Curaçao" },
            { id: 'E2', t1: "Costa do Marfim", t2: "Equador" },
            { id: 'E3', t1: "Alemanha", t2: "Costa do Marfim" },
            { id: 'E4', t1: "Equador", t2: "Curaçao" },
            { id: 'E5', t1: "Equador", t2: "Alemanha" },
            { id: 'E6', t1: "Curaçao", t2: "Costa do Marfim" }
        ]
    },
    F: {
        teams: ["Holanda", "Japão", "Suécia", "Tunísia"],
        matches: [
            { id: 'F1', t1: "Holanda", t2: "Japão" },
            { id: 'F2', t1: "Suécia", t2: "Tunísia" },
            { id: 'F3', t1: "Holanda", t2: "Suécia" },
            { id: 'F4', t1: "Tunísia", t2: "Japão" },
            { id: 'F5', t1: "Tunísia", t2: "Holanda" },
            { id: 'F6', t1: "Japão", t2: "Suécia" }
        ]
    },
    G: {
        teams: ["Bélgica", "Egito", "Irã", "Nova Zelândia"],
        matches: [
            { id: 'G1', t1: "Bélgica", t2: "Egito" },
            { id: 'G2', t1: "Irã", t2: "Nova Zelândia" },
            { id: 'G3', t1: "Bélgica", t2: "Irã" },
            { id: 'G4', t1: "Nova Zelândia", t2: "Egito" },
            { id: 'G5', t1: "Egito", t2: "Irã" },
            { id: 'G6', t1: "Nova Zelândia", t2: "Bélgica" }
        ]
    },
    H: {
        teams: ["Arábia Saudita", "Cabo Verde", "Espanha", "Uruguai"],
        matches: [
            { id: 'H1', t1: "Espanha", t2: "Cabo Verde" },
            { id: 'H2', t1: "Arábia Saudita", t2: "Uruguai" },
            { id: 'H3', t1: "Espanha", t2: "Arábia Saudita" },
            { id: 'H4', t1: "Uruguai", t2: "Cabo Verde" },
            { id: 'H5', t1: "Cabo Verde", t2: "Arábia Saudita" },
            { id: 'H6', t1: "Uruguai", t2: "Espanha" }
        ]
    },
    I: {
        teams: ["França", "Iraque", "Noruega", "Senegal"],
        matches: [
            { id: 'I1', t1: "França", t2: "Senegal" },
            { id: 'I2', t1: "Iraque", t2: "Noruega" },
            { id: 'I3', t1: "França", t2: "Iraque" },
            { id: 'I4', t1: "Noruega", t2: "Senegal" },
            { id: 'I5', t1: "Senegal", t2: "Iraque" },
            { id: 'I6', t1: "Noruega", t2: "França" }
        ]
    },
    J: {
        teams: ["Argentina", "Argélia", "Jordânia", "Áustria"],
        matches: [
            { id: 'J1', t1: "Argentina", t2: "Argélia" },
            { id: 'J2', t1: "Áustria", t2: "Jordânia" },
            { id: 'J3', t1: "Argentina", t2: "Áustria" },
            { id: 'J4', t1: "Jordânia", t2: "Argélia" },
            { id: 'J5', t1: "Jordânia", t2: "Argentina" },
            { id: 'J6', t1: "Argélia", t2: "Áustria" }
        ]
    },
    K: {
        teams: ["Colômbia", "Portugal", "RD Congo", "Uzbequistão"],
        matches: [
            { id: 'K1', t1: "Portugal", t2: "RD Congo" },
            { id: 'K2', t1: "Uzbequistão", t2: "Colômbia" },
            { id: 'K3', t1: "Portugal", t2: "Uzbequistão" },
            { id: 'K4', t1: "Colômbia", t2: "RD Congo" },
            { id: 'K5', t1: "RD Congo", t2: "Uzbequistão" },
            { id: 'K6', t1: "Colômbia", t2: "Portugal" }
        ]
    },
    L: {
        teams: ["Croácia", "Gana", "Inglaterra", "Panamá"],
        matches: [
            { id: 'L1', t1: "Inglaterra", t2: "Croácia" },
            { id: 'L2', t1: "Gana", t2: "Panamá" },
            { id: 'L3', t1: "Inglaterra", t2: "Gana" },
            { id: 'L4', t1: "Panamá", t2: "Croácia" },
            { id: 'L5', t1: "Croácia", t2: "Gana" },
            { id: 'L6', t1: "Panamá", t2: "Inglaterra" }
        ]
    }
};

// ==========================================
// 2. GERENCIAMENTO DE ESTADO
// ==========================================
const STORAGE_KEY = 'bolao_copa_data_v1';

let appState = {
    players: { p1: "Jogador 1", p2: "Jogador 2" },
    matches: {},    // { "A1": { p1: [1, 0], p2: [null, null], real: [2, 1] } }
    standings: {}   // { "A": { p1: ["Time A", "Time B", ...], p2: [...], real: [...] } }
};

let uiState = {
    groupFilter: 'all',
    roundFilter: 'all',
    currentTab: 'groups'
};

const ALL_TEAMS = [];
for (const g in GROUPS_DATA) {
    ALL_TEAMS.push(...GROUPS_DATA[g].teams);
}
ALL_TEAMS.sort();

/**
 * Carrega os dados salvos no localStorage, ou inicializa um estado vazio.
 */
function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            appState = JSON.parse(saved);
        } catch (e) {
            console.error("Erro ao carregar estado do localStorage", e);
        }
    }

    // Assegura estrutura base caso seja um estado novo
    if (!appState.matches) appState.matches = {};
    if (!appState.standings) appState.standings = {};
    if (!appState.knockoutTeams) appState.knockoutTeams = {}; // Ex: { k1_0: "Brasil", k1_1: "Chile" }

    for (const groupId in GROUPS_DATA) {
        if (!appState.standings[groupId]) {
            appState.standings[groupId] = { p1: [], p2: [], real: [] };
        }
    }
}

/**
 * Salva o estado atual no localStorage.
 */
function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    calculateAndDisplayScores();
}

// ==========================================
// 3. LÓGICA DE PONTUAÇÃO
// ==========================================

/**
 * Retorna os pontos obtidos em uma partida (0, 3 ou 5).
 * @param {Array} guess - Palpite Ex: [1, 0]
 * @param {Array} real - Real Ex: [1, 0]
 * @param {number|null} guessPen - 0 ou 1 (time 1 ou time 2 venceu penaltis no palpite)
 * @param {number|null} realPen - 0 ou 1 (time 1 ou time 2 venceu penaltis no real)
 * @param {boolean} isKnockout - flag para indicar se é jogo de mata-mata
 */
function getMatchPoints(guess, real, guessPen = null, realPen = null, isKnockout = false) {
    if (!guess || !real || guess[0] === null || guess[1] === null || real[0] === null || real[1] === null) return 0;

    const [gH, gA] = guess; // Guess Home, Guess Away
    const [rH, rA] = real;  // Real Home, Real Away

    // Regra original: O placar oficial 0x0 não gera pontos para ninguém na fase de grupos
    if (!isKnockout && rH === 0 && rA === 0) return 0;

    // Placar Exato: 5 pontos (Para mata-mata, se for empate, precisa acertar quem passou nos pênaltis)
    const isGuessDraw = (gH === gA);
    const isRealDraw = (rH === rA);

    if (gH === rH && gA === rA) {
        if (isKnockout && isRealDraw) {
            // Acertou o placar de empate. Só ganha 5 pontos se acertar o vencedor dos pênaltis
            if (guessPen !== null && realPen !== null && guessPen === realPen) return 5;
            return 0; // Se errou o penalti, perde tudo (ou poderíamos dar 0). Regra diz: "A pontuação que valerá é de qual equipe irá passar"
        }
        return 5;
    }

    // Acertar o vencedor (ou empate): 3 pontos
    let gWinner = gH > gA ? 0 : (gH < gA ? 1 : guessPen);
    let rWinner = rH > rA ? 0 : (rH < rA ? 1 : realPen);

    if (gWinner !== null && rWinner !== null && gWinner === rWinner) return 3;

    return 0;
}

/**
 * Retorna os pontos obtidos na classificação de um grupo (0 a 4).
 * @param {Array} guessStandings - Array de times na ordem prevista
 * @param {Array} realStandings - Array de times na ordem real
 */
function getStandingsPoints(guessStandings, realStandings) {
    if (!guessStandings || !realStandings || guessStandings.length !== 4 || realStandings.length !== 4) return 0;
    if (realStandings.includes("") || realStandings.includes(null)) return 0; // Resultado oficial incompleto

    let points = 0;
    for (let i = 0; i < 4; i++) {
        if (guessStandings[i] && guessStandings[i] === realStandings[i]) {
            points += 1;
        }
    }
    return points;
}

/**
 * Calcula e atualiza a pontuação total de ambos os jogadores na tela.
 */
function calculateAndDisplayScores() {
    let p1Total = 0;
    let p2Total = 0;

    // Calcular pontos das partidas
    for (const matchId in appState.matches) {
        const matchData = appState.matches[matchId];
        const isKnockout = matchId.startsWith('k');
        if (matchData.real && matchData.real[0] !== null && matchData.real[1] !== null) {

            // P1 Score
            if (matchData.p1) {
                const pts = getMatchPoints(matchData.p1, matchData.real, matchData.p1Pen, matchData.realPen, isKnockout);
                p1Total += pts;
                updateMatchBadge(matchId, 'p1', pts);
            }

            // P2 Score
            if (matchData.p2) {
                const pts = getMatchPoints(matchData.p2, matchData.real, matchData.p2Pen, matchData.realPen, isKnockout);
                p2Total += pts;
                updateMatchBadge(matchId, 'p2', pts);
            }
        } else {
            // Limpa os badges se não houver resultado real
            updateMatchBadge(matchId, 'p1', null);
            updateMatchBadge(matchId, 'p2', null);
        }
    }

    // Calcular pontos das classificações
    for (const groupId in appState.standings) {
        const groupData = appState.standings[groupId];
        const hasReal = groupData.real && groupData.real.length === 4 && !groupData.real.includes("") && !groupData.real.includes(null);

        if (hasReal) {
            if (groupData.p1 && groupData.p1.length === 4) {
                const pts = getStandingsPoints(groupData.p1, groupData.real);
                p1Total += pts;
                updateStandingsBadge(groupId, 'p1', pts);
            }
            if (groupData.p2 && groupData.p2.length === 4) {
                const pts = getStandingsPoints(groupData.p2, groupData.real);
                p2Total += pts;
                updateStandingsBadge(groupId, 'p2', pts);
            }
        } else {
            updateStandingsBadge(groupId, 'p1', null);
            updateStandingsBadge(groupId, 'p2', null);
        }
    }

    // Atualiza o DOM (Header)
    document.getElementById('p1-score').innerText = p1Total;
    document.getElementById('p2-score').innerText = p2Total;
}

// ==========================================
// 4. RENDERIZAÇÃO E DOM UPDATE
// ==========================================

/**
 * Atualiza o selo visual de pontos ao lado do input do placar
 */
function updateMatchBadge(matchId, player, points) {
    const badge = document.getElementById(`badge-${matchId}-${player}`);
    if (!badge) return;

    if (points === null) {
        badge.classList.remove('has-points', 'perfect', 'partial');
    } else {
        badge.innerText = `+${points}`;
        badge.classList.add('has-points');
        badge.classList.remove('perfect', 'partial');
        if (points === 5) badge.classList.add('perfect');
        if (points === 3) badge.classList.add('partial');
    }
}

/**
 * Atualiza o selo visual de pontos na área de classificação
 */
function updateStandingsBadge(groupId, player, points) {
    const badge = document.getElementById(`badge-std-${groupId}-${player}`);
    if (!badge) return;

    if (points === null) {
        badge.classList.remove('show');
    } else {
        badge.innerText = `+${points}`;
        badge.classList.add('show');
    }
}

/**
 * Renderiza um input block (Palpite 1, Palpite 2 ou Resultado Oficial) para uma partida.
 */
function renderInputBlock(match, type, title, typeClass) {
    const stateVal = appState.matches[match.id] && appState.matches[match.id][type]
        ? appState.matches[match.id][type]
        : [null, null];

    let valH = stateVal[0] !== null ? stateVal[0] : '';
    let valA = stateVal[1] !== null ? stateVal[1] : '';

    // Inicializa o placar oficial com 0x0 visualmente
    if (type === 'real' && stateVal[0] === null && stateVal[1] === null) {
        valH = 0;
        valA = 0;
    }

    return `
        <div class="input-block ${typeClass}">
            <div class="points-badge" id="badge-${match.id}-${type}"></div>
            <div class="block-title">${title}</div>
            <div class="score-inputs">
                <span class="team-name" title="${match.t1}">${match.t1}</span>
                <input type="number" min="0" class="score-input" data-match="${match.id}" data-type="${type}" data-team="0" value="${valH}">
                <span class="versus">x</span>
                <input type="number" min="0" class="score-input" data-match="${match.id}" data-type="${type}" data-team="1" value="${valA}">
                <span class="team-name" title="${match.t2}">${match.t2}</span>
            </div>
        </div>
    `;
}

/**
 * Renderiza a coluna de seleção de classificação para um jogador/real.
 */
function renderStandingsColumn(groupId, teams, type, title, typeClass) {
    const stateVal = appState.standings[groupId] && appState.standings[groupId][type]
        ? appState.standings[groupId][type]
        : ["", "", "", ""];

    let optionsHTML = `<option value="">Selecione...</option>`;
    teams.forEach(team => {
        optionsHTML += `<option value="${team}">${team}</option>`;
    });

    let selectsHTML = '';
    for (let i = 0; i < 4; i++) {
        const val = stateVal[i] || '';
        selectsHTML += `
            <div class="team-select-row">
                <span class="position-label">${i + 1}º</span>
                <select class="team-select" data-group="${groupId}" data-type="${type}" data-pos="${i}">
                    ${optionsHTML.replace(`value="${val}"`, `value="${val}" selected`)}
                </select>
            </div>
        `;
    }

    return `
        <div class="standings-column ${typeClass}" style="position:relative;">
            <div class="standings-points" id="badge-std-${groupId}-${type}"></div>
            <div class="block-title" style="text-align:center;">${title}</div>
            ${selectsHTML}
        </div>
    `;
}

/**
 * Renderiza os filtros
 */
function renderFilters() {
    const groupFiltersContainer = document.getElementById('group-filters');
    const roundFiltersContainer = document.getElementById('round-filters');

    // Group Filters
    let groupHtml = `<button class="filter-btn ${uiState.groupFilter === 'all' ? 'active' : ''}" data-filter="group" data-value="all">Todos</button>`;
    for (const groupId in GROUPS_DATA) {
        groupHtml += `<button class="filter-btn ${uiState.groupFilter === groupId ? 'active' : ''}" data-filter="group" data-value="${groupId}">Grupo ${groupId}</button>`;
    }
    groupFiltersContainer.innerHTML = groupHtml;

    // Round Filters
    const roundHtml = `
        <button class="filter-btn ${uiState.roundFilter === 'all' ? 'active' : ''}" data-filter="round" data-value="all">Todas as Rodadas</button>
        <button class="filter-btn ${uiState.roundFilter === '1' ? 'active' : ''}" data-filter="round" data-value="1">Rodada 1</button>
        <button class="filter-btn ${uiState.roundFilter === '2' ? 'active' : ''}" data-filter="round" data-value="2">Rodada 2</button>
        <button class="filter-btn ${uiState.roundFilter === '3' ? 'active' : ''}" data-filter="round" data-value="3">Rodada 3</button>
    `;
    roundFiltersContainer.innerHTML = roundHtml;

    // Add listeners to these buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.target.dataset.filter;
            const value = e.target.dataset.value;

            if (type === 'group') uiState.groupFilter = value;
            if (type === 'round') uiState.roundFilter = value;

            renderFilters();
            renderApp();
        });
    });
}

/**
 * Renderiza toda a interface de grupos.
 */
function renderApp() {
    const container = document.getElementById('groups-container');
    let html = '';

    for (const [groupId, groupData] of Object.entries(GROUPS_DATA)) {
        if (uiState.groupFilter !== 'all' && uiState.groupFilter !== groupId) {
            continue;
        }

        html += `
            <div class="group-card">
                <div class="group-header">
                    <h2 class="group-title">Grupo ${groupId}</h2>
                </div>
                
                <div class="matches-list">
        `;

        // Renderiza cada partida do grupo
        groupData.matches.forEach((match, index) => {
            const round = Math.floor(index / 2) + 1;
            if (uiState.roundFilter !== 'all' && parseInt(uiState.roundFilter) !== round) {
                return;
            }

            html += `
                <div class="match-row">
                    <div class="match-info">Rodada ${round}</div>
                    <div class="match-inputs-container">
                        ${renderInputBlock(match, 'p1', 'Palpite Marcos', 'p1-block')}
                        ${renderInputBlock(match, 'real', 'Oficial', 'real-block')}
                        ${renderInputBlock(match, 'p2', 'Palpite Rebeka', 'p2-block')}
                    </div>
                </div>
            `;
        });

        html += `
                </div>
                
                <div class="standings-section">
                    <div class="standings-header">Classificação do Grupo</div>
                    <div class="standings-grid">
                        ${renderStandingsColumn(groupId, groupData.teams, 'p1', 'Palpite Marcos', 'p1-col')}
                        ${renderStandingsColumn(groupId, groupData.teams, 'real', 'Oficial', 'real-col')}
                        ${renderStandingsColumn(groupId, groupData.teams, 'p2', 'Palpite Rebeka', 'p2-col')}
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;

    // Atualiza os nomes nos headers baseados no state
    document.getElementById('p1-name').value = appState.players.p1;
    document.getElementById('p2-name').value = appState.players.p2;

    // Attach Event Listeners
    attachEventListeners();

    // Calcula as pontuações iniciais
    calculateAndDisplayScores();
}

// ==========================================
// 5. EVENT LISTENERS
// ==========================================

function attachEventListeners() {
    // Nomes dos jogadores
    document.getElementById('p1-name').addEventListener('input', (e) => {
        appState.players.p1 = e.target.value;
        saveState();
    });

    document.getElementById('p2-name').addEventListener('input', (e) => {
        appState.players.p2 = e.target.value;
        saveState();
    });

    // Inputs de Placar (Jogos)
    document.querySelectorAll('.score-input').forEach(input => {
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
        });
    });

    // Selects de Classificação
    document.querySelectorAll('.team-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const groupId = e.target.dataset.group;
            const type = e.target.dataset.type;
            const posIdx = parseInt(e.target.dataset.pos);
            const val = e.target.value;

            if (!appState.standings[groupId]) {
                appState.standings[groupId] = { p1: [], p2: [], real: [] };
            }
            if (!appState.standings[groupId][type]) {
                appState.standings[groupId][type] = [];
            }

            appState.standings[groupId][type][posIdx] = val;
            saveState();
        });
    });

    // ==========================================
    // Export / Import Data
    // ==========================================
    document.getElementById('btn-export').addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "bolao_copa_backup.json");
        document.body.appendChild(downloadAnchorNode); // Required for Firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });

    document.getElementById('file-import').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            try {
                const importedState = JSON.parse(event.target.result);
                if (importedState && importedState.players && importedState.matches && importedState.standings) {
                    appState = importedState;
                    saveState();
                    renderFilters();
                    renderApp();
                    alert("Dados importados com sucesso!");
                } else {
                    alert("Arquivo JSON inválido para este bolão.");
                }
            } catch (err) {
                alert("Erro ao ler o arquivo JSON.");
            }
            // Reset input so the same file can be selected again
            e.target.value = '';
        };
        reader.readAsText(file);
    });
}

// ==========================================
// 6. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderFilters();
    renderApp();
});
