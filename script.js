let scriptsData = [];

async function searchScripts() {
    let query = document.getElementById("searchBox").value;

    let res = await fetch(`https://scriptblox.com/api/script/search?q=${query}`);
    let data = await res.json();

    let grid = document.getElementById("grid");
    let cat = document.getElementById("category");

    grid.innerHTML = "";

    if (!data.result || data.result.length === 0) {
        showNotFound(query);
        return;
    }

    scriptsData = data.result.slice(0, 20);

    cat.innerHTML = "📂 Categoria: " + (query || "Todos");

    renderCards();
}

// render cards
function renderCards() {
    let grid = document.getElementById("grid");
    grid.innerHTML = "";

    scriptsData.forEach(script => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${script.image || 'https://i.imgur.com/8QfQh9B.png'}" />
            <div class="card-content">
                <b>${script.title}</b><br>
                <small style="color:#aaa">${script.game || "Universal"}</small>

                <button onclick="copyScript(\`${encodeURIComponent(script.script)}\`)">
                    Copy Script
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

// copiar
function copyScript(code) {
    navigator.clipboard.writeText(decodeURIComponent(code));
    alert("Copiado!");
}

// não encontrado
function showNotFound(query) {
    let grid = document.getElementById("grid");
    grid.innerHTML = `
        <div class="notfound">
            <img src="https://i.imgur.com/2yaf2wb.png" />
            <h3>Nenhum script encontrado</h3>
            <p>Categoria: ${query}</p>
        </div>
    `;
}
