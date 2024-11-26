async function saveChanges() {
  const name = document.getElementById('name').value;
  const nickname = document.getElementById('nickname').value;
  const description = document.getElementById('description').value;

  try {
      const response = await fetch('http://localhost:3000/editar-perfil', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token JWT
          },
          body: JSON.stringify({ name, nickname, description }),
      });

      if (response.ok) {
          alert('Alterações salvas com sucesso!');
      } else {
          const error = await response.json();
          alert(`Erro ao salvar alterações: ${error.message}`);
      }
  } catch (err) {
      console.error('Erro ao salvar as alterações:', err);
      alert('Erro ao salvar as alterações. Tente novamente.');
  }
}

// Garante que a função está associada ao botão
document.getElementById('saveButton').addEventListener('click', saveChanges);


document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('saveButton');
  if (saveButton) {
      saveButton.addEventListener('click', saveChanges);
  } else {
      console.error('Elemento saveButton não encontrado no DOM.');
  }
});

async function loadProfile() {
  try {
      const response = await fetch('http://localhost:3000/perfil/dados', {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`, // Envia o token para autenticação
          },
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Dados carregados:', data); // Log para verificar os dados recebidos
          document.getElementById('name').value = data.nome || '';
          document.getElementById('nickname').value = data.nickname || ''; // Atualiza o campo nickname
          document.getElementById('description').value = data.descricao || '';
      } else {
          console.error('Erro ao carregar dados do perfil:', await response.json());
      }
  } catch (err) {
      console.error('Erro na conexão ao carregar perfil:', err);
  }
}


// Carrega o perfil ao abrir a página
document.addEventListener('DOMContentLoaded', loadProfile);
