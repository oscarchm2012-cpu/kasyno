let cases = JSON.parse(localStorage.getItem("cases"));
let editingCase = null;

function save() {
    localStorage.setItem("cases", JSON.stringify(cases));
    render();
}

function render() {
    const list = document.getElementById("cases-list");
    list.innerHTML = "";

    cases.forEach(cs => {
        let div = document.createElement("div");
        div.className = "admin-case";
        div.innerHTML = `
            <h3>${cs.name}</h3>
            <img src="${cs.image}">
            <p>Cena: $${cs.price}</p>

            <button onclick="editCase('${cs.id}')">Edytuj</button>
            <button onclick="removeCase('${cs.id}')">Usuń</button>
        `;
        list.appendChild(div);
    });
}
render();

document.getElementById("add-case").onclick = () => {
    editingCase = null;
    openModal();
};

function openModal() {
    document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

function editCase(id) {
    editingCase = cases.find(c => c.id === id);
    document.getElementById("case-name").value = editingCase.name;
    document.getElementById("case-price").value = editingCase.price;
    document.getElementById("case-image").value = editingCase.image;
    openModal();
}

document.getElementById("save-case").onclick = () => {
    const name = document.getElementById("case-name").value;
    const price = Number(document.getElementById("case-price").value);
    const img = document.getElementById("case-image").value;

    if (editingCase) {
        editingCase.name = name;
        editingCase.image = img;
        editingCase.price = price;
    } else {
        cases.push({
            id: Math.random().toString(36).slice(2),
            name,
            price,
            image: img,
            skins: []
        });
    }

    save();
    closeModal();
};

function removeCase(id) {
    cases = cases.filter(c => c.id !== id);
    save();
}
