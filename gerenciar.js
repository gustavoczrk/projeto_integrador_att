document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM totalmente carregado.');

    // Seleciona o formulário de adicionar HQ
    const formHq = document.getElementById('form-hq');

    if (formHq) {
        console.log('Formulário encontrado.');

        // Adiciona um listener para o evento de submissão do formulário
        formHq.addEventListener('submit', async function (event) {
            event.preventDefault();
            console.log('Formulário enviado.');

            // Cria um FormData com os dados do formulário
            const formData = new FormData(this);

            try {
                const response = await fetch('/adicionar-hq', {
                    method: 'POST',
                    body: formData
                });

                if (response.headers.get('content-type')?.includes('application/json')) {
                    const result = await response.json();
                    console.log('Resposta recebida do servidor:', result);

                    alert(result.message);

                    if (response.ok && result.redirect) {
                        console.log('Redirecionando para:', result.redirect);
                        window.location.href = result.redirect;
                    } else {
                        console.log('Redirecionamento não realizado, resposta inesperada.');
                    }
                } else {
                    alert('Erro: Resposta inesperada do servidor.');
                }
            } catch (error) {
                alert('Erro ao adicionar HQ. Tente novamente.');
                console.error('Erro na requisição:', error);
            }
        });
    } else {
        console.log('Formulário não encontrado no DOM.');
    }
});
