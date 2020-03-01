<?php $painel_atual = "portaria"; ?>
<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Portaria</title>
<link rel="stylesheet" type="text/css" href="css/index.css"/>
<?php require "../config.php"; ?>
</head>

<body>

<div id="box">
 
 <div id="porteiro">
  <h1><strong><i><?php echo $nome ?> </i> - Seu código é:</strong> <?php echo $code ?> <a href="../config.php?acao=quebra">
  
  <a href="../config.php?acao=quebra"><strong>SAIR</strong></a></h1>
 </div><!-- porteiro -->
 
 <div id="logo">
  <img src="../img/STCN.png" width="250px" />
 </div><!-- logo -->
 
 <div id="campo_busca">
   <form name="" method="post" action="" enctype="multipart/form-data">
   <input type="text" name="cpf" value="" /><input class="input" type="submit" name="send" value="" />
  </form>
  
 
 <?php
if(isset($_POST['send'])){
	
	$_GET['pg'] = '';
	$busca = $_POST['cpf'];
	
	
	if($busca == ''){
		echo "<script language='javascript'> window.alert('Por favor, digite o número de matrícula ou CPF!');</script>";
		}
		
		else{
		$sql = "SELECT * FROM estudantes WHERE code = '$busca' OR nome = '$busca' OR cpf = '$busca' OR rg = '$busca' ";
		
		$result = mysqli_query($conexao, $sql);
		if(mysqli_num_rows($result) <= 0){
			echo "<br><br><br><br><h2> Aluno não Encontrado, verifique a informação inserida! </h2>";
			
		}else{
			while($res_1 = mysqli_fetch_assoc($result)){
				$nome = $res_1['nome'];
				$code = $res_1['code'];
				$rg = $res_1['rg'];
				
	
	?> 
  
  

<br><br><br><br>
<h3>
  <strong>Aluno:</strong> <?php echo $nome ?> 
  <strong>Nº de matricula:</strong> <?php echo $code; ?>
  <strong>RG:</strong> <?php echo $rg; ?> 

  <a href="index.php?pg=confirma&code_a=<?php echo $code; ?>"><img src="../img/simbolo-certo-1.png" title="Confirmar" border="0" width="22px" /></a> 

  <a href="index.php"><img src="img/delete.jpg" title="Cancelar" width="40px" /></a> 
</h3>

<input type="hidden" name="codes" value="" />    
 
<?php 	}	}	}   } ?>


<?php  
if(@$_GET['pg'] == 'confirma'){
	$data = date("d/m/Y H:i:s");
	$date = date("d/m/Y");
	
	$code_a = $_GET['code_a'];
	
	$sql = "INSERT INTO confirma_entrada_de_alunos (date, data_hoje, porteiro, code_aluno) VALUES ('$data', '$date', '$code', '$code_a')";	
	
	mysqli_query($conexao, $sql);
	
	echo "<script language='javascript'> window.alert('A entrada do aluno foi confirmada!');</script>";
	
}
?>


 </div><!-- campo_busca -->
 <br><br><br>
</div><!-- box -->
</body>
</html>