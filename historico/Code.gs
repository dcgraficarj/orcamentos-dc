/** DC Gráfica — histórico compartilhado. Instale na conta Google da loja. */
function configurarHistorico() {
 const props=PropertiesService.getScriptProperties();
 if (!props.getProperty('PLANILHA_ID')) {
  const ss=SpreadsheetApp.create('DC Gráfica — Histórico de Orçamentos');
  const sh=ss.getSheets()[0];sh.setName('Orcamentos');
  sh.appendRow(['ID','Número','Emissão','Cliente','Atendente','Total','Status','Atualizado em','Dados originais (JSON)']);
  const eventos=ss.insertSheet('Eventos');eventos.appendRow(['Data','ID','Ação','Status anterior','Status novo']);
  [sh,eventos].forEach(s=>{s.setFrozenRows(1);s.getRange(1,1,1,s.getLastColumn()).setBackground('#f97316').setFontColor('#ffffff').setFontWeight('bold');});
  sh.getRange('F2:F').setNumberFormat('"R$" #,##0.00');sh.setColumnWidth(4,280);sh.hideColumns(9);
  props.setProperty('PLANILHA_ID',ss.getId());
 }
 if(!props.getProperty('CHAVE'))props.setProperty('CHAVE',Utilities.getUuid()+Utilities.getUuid());
 console.log('Planilha: https://docs.google.com/spreadsheets/d/'+props.getProperty('PLANILHA_ID'));
 console.log('Chave de acesso (somente equipe): '+props.getProperty('CHAVE'));
}
function doGet(){return ContentService.createTextOutput('DC Gráfica — serviço de histórico. Acesso autenticado por POST.');}
function doPost(e){
 let lock;
 try{
  const req=JSON.parse(e.postData.contents),props=PropertiesService.getScriptProperties();
  const key=props.getProperty('CHAVE');
  if(!key||req.key!==key)throw Error('Chave de acesso inválida.');
  lock=LockService.getScriptLock();lock.waitLock(30000);
  const ss=SpreadsheetApp.openById(props.getProperty('PLANILHA_ID')),sh=ss.getSheetByName('Orcamentos');
  const rows=sh.getLastRow()>1?sh.getRange(2,1,sh.getLastRow()-1,9).getValues():[];
  const idx=rows.findIndex(r=>r[0]===req.id);
  let result;
  if(req.action==='list'){
   const filter=req.filter||{},q=String(filter.q||'').toLowerCase();
   const selected=rows.filter(r=>{
    const p=JSON.parse(r[8]),date=String(r[2]).slice(0,10);
    return (!q||[r[1],r[3],r[4],p.dados.cnpj||''].join(' ').toLowerCase().includes(q))&&(!filter.from||date>=filter.from)&&(!filter.to||date<=filter.to);
   }).reverse();
   result={total:selected.length,records:selected.slice(Number(req.offset)||0,(Number(req.offset)||0)+100).map(r=>({id:r[0],numero:r[1],emissao:r[2],cliente:r[3],atendente:r[4],total:r[5],status:r[6]})),planilha:'https://docs.google.com/spreadsheets/d/'+ss.getId()};
  }else if(req.action==='get'){
   if(idx<0)throw Error('Orçamento não encontrado.');
   result={...JSON.parse(rows[idx][8]),numero:rows[idx][1],status:rows[idx][6]};
  }else if(req.action==='save'){
   if(idx>=0)result={id:req.id,numero:rows[idx][1]};
   else{
    const p=req.payload;
    if(!/^[a-zA-Z0-9-]{10,80}$/.test(req.id||'')||!p||!p.dados||!String(p.dados.cliente||'').trim()||!Array.isArray(p.itens)||!p.itens.length)throw Error('Dados do orçamento inválidos.');
    if(p.itens.some(i=>!String(i.descricao||'').trim()||!Number.isInteger(i.quantidade)||i.quantidade<1||!Number.isFinite(i.valor)||i.valor<0))throw Error('Itens inválidos.');
    const json=JSON.stringify({id:req.id,dados:p.dados,itens:p.itens});if(json.length>45000)throw Error('Orçamento muito extenso para registro.');
    const now=new Date(),emissao=Utilities.formatDate(now,'America/Sao_Paulo',"yyyy-MM-dd'T'HH:mm:ss"),year=emissao.slice(0,4);
    const next=Number(props.getProperty('SEQ_'+year)||0)+1;props.setProperty('SEQ_'+year,String(next));
    const numero=year+'-'+String(next).padStart(5,'0'),total=Math.round(p.itens.reduce((a,i)=>a+i.valor,0)*100)/100;
    // Escape texto de cliente para impedir fórmulas na planilha.
    const safe=v=>/^[=+@-]/.test(String(v))?"'"+v:String(v||'');
    sh.appendRow([req.id,numero,emissao,safe(p.dados.cliente),safe(p.dados.atendente),total,'Emitido',emissao,json]);
    ss.getSheetByName('Eventos').appendRow([emissao,req.id,'Emissão','','Emitido']);
    result={id:req.id,numero};
   }
  }else if(req.action==='status'){
   if(idx<0)throw Error('Orçamento não encontrado.');
   if(!['Emitido','Enviado','Aprovado','Recusado','Cancelado'].includes(req.status))throw Error('Status inválido.');
   if(req.previous!==rows[idx][6])throw Error('Outro computador alterou o status. Atualize a lista antes de tentar novamente.');
   const now=Utilities.formatDate(new Date(),'America/Sao_Paulo',"yyyy-MM-dd'T'HH:mm:ss");
   ss.getSheetByName('Eventos').appendRow([now,req.id,'Mudança de status',rows[idx][6],req.status]);
   sh.getRange(idx+2,7,1,2).setValues([[req.status,now]]);result={status:req.status};
  }else throw Error('Ação inválida.');
  return historicoResposta({ok:true,result});
 }catch(err){return historicoResposta({ok:false,error:err.message});}
 finally{if(lock)lock.releaseLock();}
}
function historicoResposta(data){return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);}
