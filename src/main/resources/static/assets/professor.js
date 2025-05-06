document.addEventListener("DOMContentLoaded", function () {
    const formProfessor = document.querySelector("#formularioProfessor");

    formProfessor.addEventListener("submit", function (event) {
        event.preventDefault();

        const professor = {
            nome: document.querySelector("#nome").value,
            dataNascimento: document.querySelector("#dataNascimento").value,
            cpf: document.querySelector("#cpf").value,
            endereco: document.querySelector("#endereco").value,
            telefone: document.querySelector("#telefone").value,
            email: document.querySelector("#email").value
        };

        // Valida os campos
        if (!professor.nome || !professor.dataNascimento || !professor.cpf || !professor.endereco || !professor.telefone || !professor.email) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        

        fetch("http://localhost:8080/api/professor/registrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(professor)
        })
        .then(response => {
            if (!response.ok) {
                alert("Erro ao cadastrar professor.");
                throw new Error("Erro ao cadastrar professor.");
               
            }
            
            return response.json();
        })
        .then(data => {
            alert("Professor cadastrado com sucesso!");
            formProfessor.reset();
        })
        .catch(error => console.error("Erro ao cadastrar professor:", error));
    });
});




