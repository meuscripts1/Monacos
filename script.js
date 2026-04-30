let scriptsData = [];

// buscar API
async function searchScripts() {
    let query = document.getElementById("searchBox").value;

    let res = await fetch(`https://scriptblox.com/api/script/search?q=${query}`);
    let data = await res.json();

    scriptsData = data.result.slice(0, 20); // 🔥 só 20 scripts
    renderCards();
}

// renderizar cards
function renderCards() {
    let grid = document.getElementById("grid");
    grid.innerHTML = "";

    scriptsData.forEach(script => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${script.image || 'https://i.imgur.com/8QfQh9B.png'}" />
            
            <div class="card-content">
                <b>${script.title}</b>

                <button onclick="copyScript(\`${encodeURIComponent(script.script)}\`)">
                    Copy Script
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

// copiar script
function copyScript(code) {
    navigator.clipboard.writeText(decodeURIComponent(code));
    alert("Script copiado!");
}
