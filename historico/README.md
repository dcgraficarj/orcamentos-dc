# Histórico compartilhado — ativação

A interface está na aba HISTÓRICO do site. O compartilhamento depende da instalação deste serviço na conta Google da loja; não está ativo só por publicar o HTML.

1. Abra https://script.google.com/home/start e crie um projeto.
2. Copie Code.gs para o editor e salve.
3. Execute configurarHistorico. Autorize na conta da loja. O registro de execução mostra a URL da planilha privada e a chave de acesso. A execução posterior reutiliza a mesma planilha e chave.
4. Implantar → Nova implantação → App da Web. Executar como você. Acesso: Qualquer pessoa. A chave aleatória é exigida para toda leitura e gravação; não publique a chave e não compartilhe a planilha publicamente.
5. Copie a URL /exec. Na aba Histórico do site, informe a URL e a chave e clique Conectar. Repita nos quatro computadores.

A URL permanece no navegador; a chave permanece apenas na sessão. Ao fechar a sessão será preciso informá-la novamente. Quem tiver a chave pode consultar os dados e alterar status. A base não tem permissões individuais por atendente.

Ao gerar uma proposta, marque Registrar no histórico compartilhado. A opção é marcada automaticamente quando a conexão está configurada. Sem essa opção o PDF é gerado sem registro. Nenhum orçamento antigo ou PDF avulso é importado automaticamente.

A aba Orcamentos contém os registros e dados originais em JSON. A aba Eventos guarda as mudanças de status. Não edite as colunas técnicas, números ou IDs. O servidor usa trava para numerar sem colisão e ID de operação para não duplicar uma tentativa repetida. Duplicar no site abre uma nova proposta para revisão sem alterar o registro original.

Teste de ativação: emitir uma proposta de teste no computador 1; atualizar a lista no computador 2; gerar novamente o PDF; atualizar um status e verificar em outro computador. A validação local não substitui esse teste real de conexão e autorização do Google.
