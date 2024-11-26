async function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                usuario: usuario,
                senha: senha
            })
        });

        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
            window.location.href = '/login';  // Redireciona para o login
        } else {
            alert('Erro ao cadastrar. Tente novamente.');
        }
    } catch (error) {
        alert('Erro de conexão. Tente novamente.');
    }
}
