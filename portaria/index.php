
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
  <img src="../img/STCN.png" width="400px" />
 </div><!-- logo -->
 
 <div id="campo_busca">
   <form name="" method="post" action="" enctype="multipart/form-data">
   <input type="text" name="cpf" value="" /><input class="input" type="submit" name="send" value="" />
  </form>
  <?php  
    if(isset($_POST['send'])){  //se o botão send for pressionado ele vai criar uma variável chamada cpf que vai receber o que vier do campo CPF. 
         $cpf = $_POST['cpf'];
        
    if($cpf == ''){      //se o meu cpf for vazio.
            echo "<script language='javascript'> window.alert ('Por favor, digite o seu cpf!'); </script>";

        }  
        else {
          $sql = "SELECT * FROM estudantes WHERE code ='$cpf' OR nome='$cpf' OR  cpf = '$cpf' OR rg = '$cpf'"   ;  //essa função faz uma consulta no banco de dados.Selecione na tabela login os campos code e senha.
          $result = mysqli_query($conexao, $sql);//criei uma variável que vai fazer uma consulta no banco de dados e na conexão caso os campos não estejam vazios. 
          if(mysqli_num_rows($result) <=0){ //mysqli_num_rows consulta nas linhas do banco de dados. Se essa consulta for maior que 0 significa que tem alguma coisa no banco. Ou seja, se tiver um cógido e uma senha .
                 echo "<br><br><br><br><br><br><br><h2> Aluno não encontrado, verifique a informação inserida!</h2>";
          }
          else{
              while($res_1 = mysqli_fetch_assoc($result)){
            $nome = $res_1 ['nome'];
            $cpf = $res_1 ['cpf'];
            $code = $res_1 ['code'];
            echo "<br><br><br><br>".$nome;
          }
            
    
                  }
          }
    
    
    
                  }

                



?>

<br><br><br><br><h3><strong>Aluno:</strong>  <strong>Nº de matricula:</strong> <strong>RG:</strong>  <a href="index.php?pg=confirma&code_a=<img src="../img/correto.jpg" title="Confirmar" border="0" /></a> <a href="index.php"><img src="img/delete.jpg" width="24px" title="Cancelar" /></a> </h3><input type="hidden" name="codes" value="" />  
 



 </div><!-- campo_busca -->
 <br><br><br>
</div><!-- box -->
  </body>















</html>