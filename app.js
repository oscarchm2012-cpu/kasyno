let cases = JSON.parse(localStorage.getItem("cases"));
let balance = Number(localStorage.getItem("balance") || 0);
document.getElementById("balance").textContent = balance;

function save() {
    localStorage.setItem("cases", JSON.stringify(cases));
    localStorage.setItem("balance", balance);
}

// PAGE SWITCHING
document.querySelectorAll(".navbar li[data-page]").forEach(li => {
    li.onclick = () => {
        document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
        document.getElementById("page-" + li.dataset.page).classList.add("active");
    };
});

// RENDER CASES
function renderCases() {
    const c = document.getElementById("cases-container");
    c.innerHTML = "";
    cases.forEach(cs => {
        let div = document.createElement("div");
        div.className = "case-card";
        div.innerHTML = `
            <img src="${cs.image}">
            <h3>${cs.name}</h3>
            <p>$${cs.price}</p>
        `;
        div.onclick = () => openCase(cs);
        c.appendChild(div);
    });
}
renderCases();

function chooseSkin(cs) {
    let roll = Math.random() * 100;
    let sum = 0;
    for (let s of cs.skins) {
        sum += s.chance;
        if (roll <= sum) return s;
    }
    return cs.skins.at(-1);
}

function animateOpening(winSkin) {
    const modal = document.getElementById("case-opening-modal");
    modal.classList.remove("hidden");

    const strip = document.getElementById("rolling-strip");
    strip.innerHTML = "";

    let items = [];

    for (let i = 0; i < 60; i++) {
        let rnd = cases[0].skins[Math.floor(Math.random()*cases[0].skins.length)];
        items.push(rnd);
    }

    items.push(winSkin);

    items.forEach(s => {
        let img = document.createElement("img");
        img.src = s.image;
        strip.appendChild(img);
    });

    strip.style.transition = "transform 3.2s cubic-bezier(.18,.89,.32,1.28)";
    strip.style.transform = "translateX(-1200px)";

    setTimeout(() => {
        alert("Wygrałeś: " + winSkin.name);
        modal.classList.add("hidden");
        strip.style.transition = "";
        strip.style.transform = "";
        addToInventory(winSkin);
    }, 3400);
}

function openCase(cs) {
    if (balance < cs.price) return alert("Brak środków!");

    balance -= cs.price;
    document.getElementById("balance").textContent = balance;

    const win = chooseSkin(cs);
    animateOpening(win);
    save();
}

function addToInventory(skin) {
    let inv = JSON.parse(localStorage.getItem("inventory") || "[]");
    inv.push(skin);
    localStorage.setItem("inventory", JSON.stringify(inv));
    renderInventory();
}

function renderInventory() {
    const invDiv = document.getElementById("inventory-container");
    const inv = JSON.parse(localStorage.getItem("inventory") || "[]");
    invDiv.innerHTML = "";

    inv.forEach(i => {
        let d = document.createElement("div");
        d.className = "case-card";
        d.innerHTML = `
            <img src="${i.image}">
            <p>${i.name}</p>
            <p>$${i.value}</p>
            <button>Sprzedaj</button>
        `;
        d.querySelector("button").onclick = () => {
            balance += i.value;
            document.getElementById("balance").textContent = balance;
            save();
            const newInv = inv.filter(x => x !== i);
            localStorage.setItem("inventory", JSON.stringify(newInv));
            renderInventory();
        };
        invDiv.appendChild(d);
    });
}
renderInventory();
