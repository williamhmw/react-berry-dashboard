---
id: alteracao-da-logo
title: Alteração da logo
---

## Informações

Para fazer alterações de logotipo nas páginas de login, registro e dentro da dashboard seguir os passos abaixo.

### Alteração de logo

Para inserir um novo logo deve-se colocar o código da imagem em SVG na linha destacada abaixo.

```jsx {7} title="/src/ui-component/Logo.js"
const Logo = () => {
    const theme = useTheme();

    return (
        
        <svg width="132" height="62" viewBox="0 0 92 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          // Inserir aqui o código em SVG
        </svg>

    );
};

export default Logo;
}
```
Para fazer alteração do tamanho deve-se mudar as dimensões nas tags `width` e `height`.

