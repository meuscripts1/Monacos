let editor;

// Monaco init
require.config({ paths: { vs: "https://unpkg.com/monaco-editor@0.45.0/min/vs" }});

require(["vs/editor/editor.main"], function () {
    editor = monaco.editor.create(document.getElementById("editor"), {
        value: "-- Script aqui",
        language: "lua",
        theme: "vs-dark",
        automaticLayout: true
    });
});

// Buscar scripts ScriptBlox
async function searchScripts() {
    let query = document.getElementById("searchBox").value;

    let res = await fetch(`https://scriptblox.com/api/script/search?q=${query}`);
    let data = await res.json();

    let results = document.getElementById("results");
    results.innerHTML = "";

    data.result.forEach(script => {
        let div = document.createElement("div");
        div.className = "script";

        div.innerHTML = `
            <b>${script.title}</b><br><br>
            <button onclick="loadScript(\`${encodeURIComponent(script.script)}\`)">Load</button>
            <button onclick="copyScript(\`${encodeURIComponent(script.script)}\`)">Copy</button>
        `;

        results.appendChild(div);
    });
}

// Carregar no Monaco
function loadScript(code) {
    editor.setValue(decodeURIComponent(code));
}

// Copiar script
function copyScript(code) {
    navigator.clipboard.writeText(decodeURIComponent(code));
    alert("Copiado!");
}
