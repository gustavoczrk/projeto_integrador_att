async function entrar() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario, senha }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Armazena o token no localStorage
            alert('Login bem-sucedido!');
            window.location.href = '/inicio'; // Redireciona para a página inicial
        } else {
            const error = await response.json();
            document.getElementById('msgError').innerText = error.message || 'Erro ao fazer login.';
        }
    } catch (err) {
        console.error('Erro na requisição:', err);
        document.getElementById('msgError').innerText = 'Erro ao conectar ao servidor.';
    }
}
