/\*\*

- Esta pasta (`table`) contém arquivos de configuração para definir colunas e ações
- de tabelas de dados usadas na aplicação. Cada arquivo é específico para uma tabela e inclui:
-
- - **Configuração de Colunas (`Column<T>`):**
- Estrutura e comportamento das colunas, como:
- - `key`: Propriedade do objeto exibida na coluna.
- - `label`: Texto do cabeçalho.
- - `width`: Largura da coluna (%).
- - `render`: (Opcional) Função para renderização customizada.
-
- - **Configuração de Ações (`ActionButton<T>`):**
- Ações disponíveis para cada linha, como:
- - `icon`: Ícone da ação.
- - `onClick`: Função executada ao clicar.
- - `color`: Cor do botão.
- - `title`: Texto do tooltip.
-
- Exemplos:
- - `UsuarioTableConfig.tsx`: Configurações da tabela de "Usuários".
- - `ViagensTableConfig.tsx`: Configurações da tabela de "Viagens".
-
- Centralizar essas configurações facilita a manutenção e escalabilidade.
  \*/
