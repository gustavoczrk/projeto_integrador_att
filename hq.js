document.addEventListener('DOMContentLoaded', () => {
    const chaptersContainer = document.querySelector('.capitulos');
    const pdfPath = document.getElementById('hq-pdf-path').value;
    let chapters = [];

    try {
        chapters = JSON.parse(document.getElementById('hq-chapters').value);
    } catch (error) {
        console.error('Erro ao carregar capítulos:', error);
    }

    if (chapters && chapters.length > 0) {
        chapters.forEach((chapter, index) => {
            const chapterLink = document.createElement('a');
            chapterLink.href = `/hqs/${chapter}`; // Utiliza o capítulo já concatenado corretamente
            chapterLink.textContent = `Capítulo ${index + 1}`;
            chapterLink.target = '_blank';
            const listItem = document.createElement('li');
            listItem.appendChild(chapterLink);
            chaptersContainer.appendChild(listItem);
        });
    } else {
        chaptersContainer.textContent = 'Nenhum capítulo disponível.';
    }

    // Configuração para avaliar HQ
    const formAvaliacao = document.getElementById('form-avaliacao');
    if (formAvaliacao) {
        formAvaliacao.addEventListener('submit', async function(event) {
            event.preventDefault();

            const hqId = formAvaliacao.action.split('/').slice(-2)[0];
            const nota = document.getElementById('nota').value;

            try {
                const response = await fetch(`/hq/${hqId}/avaliar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nota: parseInt(nota) })
                });

                if (response.ok) {
                    alert('Avaliação registrada com sucesso.');
                    location.reload();
                } else {
                    alert('Erro ao registrar a avaliação.');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao registrar a avaliação.');
            }
        });
    }
});

    // Configuração para excluir comentários
    const excluirBotoes = document.querySelectorAll('.btn-excluir-comentario');
    excluirBotoes.forEach(botao => {
        botao.addEventListener('click', () => {
            const commentId = botao.getAttribute('data-id');
            excluirComentario(commentId);
        });
    });


// Função para excluir um comentário
function excluirComentario(commentId) {
    fetch(`/hq/excluir-comentario/${commentId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Comentário excluído com sucesso.');
            location.reload();
        } else {
            alert('Erro ao excluir o comentário.');
        }
    })
    .catch(error => console.error('Erro:', error));
}
