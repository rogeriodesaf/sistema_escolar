
<?php $painel_atual = "portaria"; ?>


<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <title>Portaria</title>
    <link rel="stylesheet" type="text/css" href="css/index.css"/>
    <meta charset="utf-8">
<?php require "../config.php"; ?>
  </head>
  <body>
  <div id="box">
 
 <div id="porteiro">
  <h1><strong>Seu código é:</strong>  <a href="../config.php?acao=quebra"><strong>SAIR</strong></a></h1>
 </div><!-- porteiro -->
 
 <div id="logo">
  <img src="../img/STCN.png" width="250px" />
 </div><!-- logo -->
 
 <div id="campo_busca">
   <form name="" method="post" action="" enctype="multipart/form-data">
   <input type="text" name="cpf" value="" /><input class="input" type="submit" name="send" value="" />
  </form>
  

<br><br><br><br><h3><strong>Aluno:</strong>  <strong>Nº de matricula:</strong> <strong>RG:</strong>  <a href="index.php?pg=confirma&code_a=<img src="../img/correto.jpg" title="Confirmar" border="0" /></a> <a href="index.php"><img src="img/delete.jpg" width="24px" title="Cancelar" /></a> </h3><input type="hidden" name="codes" value="" />  
 



 </div><!-- campo_busca -->
 <br><br><br>
</div><!-- box -->
  </body>















</html>