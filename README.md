# DC Gráfica Rápida | Sistema de Orçamentos

Sistema de orçamentos da **DC Gráfica Rápida**, publicado com **GitHub Pages**.

**Site:** https://dcgraficarj.github.io/orcamentos-dc/

## Como o site funciona

O GitHub Pages publica o arquivo `index.html` que está na pasta principal (raiz) deste repositório, na branch `main`.

Quando o `index.html` é atualizado e a alteração é salva no GitHub por meio de um **commit**, o GitHub Pages inicia uma nova publicação. Não é necessário contratar hospedagem nem enviar arquivos a outro servidor.

## Como atualizar o site, passo a passo

1. **Prepare a nova versão.** Faça as alterações no sistema e teste o HTML no navegador para conferir preços, cálculos, botões e textos.
2. **Nomeie o arquivo como `index.html`.** Esse é o nome da página principal do site. Não envie o arquivo com outro nome, como `orcamento_atualizado.html`, esperando que ele substitua a página inicial.
3. Acesse o repositório: https://github.com/dcgraficarj/orcamentos-dc
4. Clique no arquivo **`index.html`** existente e, depois, no ícone de lápis (**Edit this file**) para editar o conteúdo diretamente. Substitua o conteúdo pelo HTML novo. Outra opção é usar **Add file → Upload files** para enviar o novo `index.html`, substituindo o arquivo existente.
5. Na parte inferior, escolha **Commit changes**, escreva uma descrição breve (por exemplo, `Atualiza preços dos crachás`) e confirme o commit **na branch `main`**.
6. Espere a publicação automática. Normalmente leva alguns minutos. Você pode acompanhar em **Actions** no repositório, procurando a execução do GitHub Pages. Aguarde a conclusão com sucesso.
7. Abra https://dcgraficarj.github.io/orcamentos-dc/ e confira se as alterações apareceram. Se ainda vir a versão anterior, atualize com **Ctrl + F5** no Windows (ou teste em uma janela anônima).

> **Importante:** subir um HTML com outro nome não substitui o `index.html` em produção. O arquivo publicado na raiz e na branch `main` é a referência para as atualizações do site.

## Conferir a configuração do GitHub Pages

Se o site deixar de publicar:

1. Abra **Settings → Pages** no repositório.
2. Em **Build and deployment**, confira:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main`
   - **Folder:** `/ (root)`
3. Salve se precisar corrigir alguma configuração.
4. Veja o resultado da publicação na aba **Actions**. Se houver erro, consulte os detalhes da execução.

## Atualização do aplicativo Windows

A versão online e o aplicativo Windows **não se atualizam automaticamente um pelo outro**.

- **Para atualizar o site:** substitua o `index.html` neste repositório e confirme o commit.
- **Para atualizar o aplicativo Windows instalado:** substitua o `index.html` no projeto local do Electron, gere um novo instalador e instale essa versão nos computadores. Publicar no GitHub Pages não altera o `.exe` instalado.

## Cuidados antes de publicar

- Verifique valores, descontos, prazos e mensagens de orçamento.
- Confira se as abas e o gerador de PDF continuam funcionando.
- Faça uma cópia da versão anterior caso precise voltar atrás. O próprio histórico de commits do GitHub também permite consultar versões anteriores.
- **Atenção à privacidade:** este repositório é público. Não inclua senhas, dados pessoais de clientes, chaves de acesso ou informações internas que não devam ficar públicas. Preços e regras de cálculo escritos diretamente no HTML/JavaScript podem ser visualizados por quem acessar o código.

## Resumo rápido

**Atualizou o HTML → substituiu `index.html` → fez commit na `main` → aguardou o GitHub Pages concluir → conferiu o site.**
