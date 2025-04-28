function carregarTurmas() {
    fetch("http://localhost:8080/api/turma/listar")
        .then(response => response.json())
        .then(turmas => {
            const listaTurmas = document.getElementById("listaTurmas");
            listaTurmas.innerHTML = "";

            if (turmas.length === 0) {
                listaTurmas.innerHTML = `<p class="text-center">Nenhuma turma encontrada.</p>`;
                return;
            }

            turmas.forEach((turma, index) => {
                const card = document.createElement("div");
                card.className = "col-md-4"; // Três cards por linha em telas médias
                card.innerHTML = `
                    <div class="card mb-4 card-turma" data-index="${index}" style="cursor: pointer;">
                        <div class="card-body text-center">
                            <h5 class="card-title">${turma.codigo}</h5>
                            <p><strong>Ano Letivo:</strong> ${turma.anoLetivo}</p>
                            <p><strong>Turno:</strong> ${turma.turno}</p>
                        </div>
                    </div>
                `;
                listaTurmas.appendChild(card);

                // Armazena a turma no atributo para usar no clique
                card.dataset.turma = JSON.stringify(turma);

                // Adiciona evento de clique para abrir o modal
                card.addEventListener('click', () => abrirModal(turma));
            });
        })
        .catch(error => {
            console.error("Erro ao carregar turmas:", error);
            const listaTurmas = document.getElementById("listaTurmas");
            listaTurmas.innerHTML = `<p class="text-center text-danger">Erro ao carregar turmas. Tente novamente mais tarde.</p>`;
        });
}
function abrirModal(turma) {
    const modalTitle = document.getElementById('modalTurmaLabel');
    const modalBody = document.getElementById('modalTurmaBody');

    modalTitle.innerText = `${turma.codigo} - ${turma.turno}`;
    modalBody.innerHTML = `
        <p><strong>Ano Letivo:</strong> ${turma.anoLetivo}</p>
        <p><strong>Professor:</strong> ${turma.professor?.nome || "Não informado"}</p>
        <p><strong>Disciplina:</strong> ${turma.disciplina?.nome || "Não informado"}</p>
        <p><strong>Alunos:</strong></p>
        <ul>
            ${turma.alunos?.map(aluno => `<li>${aluno.nome}</li>`).join("") || "<li>Nenhum aluno matriculado</li>"}
        </ul>
    `;

    const modal = new bootstrap.Modal(document.getElementById('modalTurma'));
    modal.show();
}
document.addEventListener("DOMContentLoaded", carregarTurmas);