# Projeto organizado

## Páginas
- `src/screens/HomeScreen.js`: página inicial.
- `src/screens/ExploreScreen.js`: listagem/área de exploração.
- `src/screens/DetailsScreen.js`: detalhes de um conteúdo.
- `src/components/`: componentes reutilizáveis.
- `src/constants/theme.js`: cores e identidade visual.
- `src/services/api.js`: ponto central para futuras chamadas à API.

## Executar
Na pasta que contém `package.json`:

```bash
npm install
npx expo start
```

## Observação
O projeto original continha uma pasta `my-app` com outro projeto Expo duplicado e páginas de exemplo conflitantes. Ela foi retirada desta versão organizada para evitar dois pontos de entrada diferentes. O `package.json` principal e a configuração Expo da raiz foram mantidos.
