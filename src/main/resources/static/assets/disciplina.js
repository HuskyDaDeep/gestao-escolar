document.addEventListener("DOMContentLoaded", function () {
    const formDisciplina = document.querySelector("#formDisciplina");

    formDisciplina.addEventListener("submit", function (event) {
        event.preventDefault();

        

        const disciplina = {
            nome: document.querySelector("#nomeDisciplina").value,
            codigo: document.querySelector("#codigoDisciplina").value,
            cargaHoraria: document.querySelector("#cargaHoraria").value,
           
        };

        fetch("http://localhost:8080/api/disciplina/registrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(disciplina)
        })
        .then(response => response.json())
        .then(data => {
            alert("Disciplina cadastrada com sucesso!");
            formDisciplina.reset();
        })
        .catch(error => console.error("Erro ao cadastrar disciplina:", error));
    });
});