
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
  <h1><strong>Seu código é:</strong> <?php echo $code ?> <a href="../config.php?acao=quebra"> <a href="../config.php?acao=quebra"> <strong> SAIR</strong></a></h1>
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
        $_GET['pg'] = '';
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
            $rg = $res_1 ['rg'];
            
        

                



?>

<br><br><br><br><h3><strong>Aluno:</strong> <?php echo $nome;?> <strong>Nº de matricula:</strong>  <?php echo $cpf;?> <strong>RG:</strong>  <?php echo $rg;?>
 <a href="index.php?pg=confirma&code_a=<?php echo $code; ?> "> <img src="../img/simbolo-certo-1.png" title="Confirmar" border="0" width="22px"/></a>
 <a href="index.php"><img src="../img/images.jpg" width="24px" title="Cancelar" width="22px"/></a> </h3>
 <input type="hidden" name="codes" value="" />  
 
<?php   }
            
    
          }
  }



          }

          ?>

<?php 
if( @$_GET['pg'] == 'confirma'){
  $data = date("d/m/Y H:i:s");
  $date = date("d/m/Y");

  $code_a = $_GET['code_a'];
  $sql ="INSERT INTO confirma_entrada_de_alunos(date,  data_hoje, porteiro, code_aluno) VALUES ('$data','$date','$code','$code_a')";
  mysqli_query($conexao, $sql);
  echo "<script language='javascript'>window.alert('A entrada do aluno foi confirmada!');</script>";
}


?>

 </div><!-- campo_busca -->
 <br><br><br>
</div><!-- box -->
  </body>















</html>