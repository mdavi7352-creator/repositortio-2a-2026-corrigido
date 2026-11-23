# Estrutura inicial da API

A interface não chama `fetch` diretamente. As requisições ficam centralizadas em `api.js`.

1. Crie/defina a URL do backend em `EXPO_PUBLIC_API_URL`.
2. Ajuste os caminhos (`/items`, `/users` etc.) conforme as rotas reais do backend.
3. Crie arquivos de serviço por domínio, por exemplo `itemsService.js`.
4. Nunca coloque senhas, tokens privados ou chaves secretas no aplicativo. Variáveis `EXPO_PUBLIC_` ficam visíveis no app.

A API ainda não está conectada: `https://api.exemplo.com` é apenas um endereço ilustrativo.
