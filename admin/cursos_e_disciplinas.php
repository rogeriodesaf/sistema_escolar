<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Adminstração</title>
<link rel="stylesheet" type="text/css" href="css/cursos_e_disciplinas.css" />
</head>

<body>
<?php require "topo.php"; ?>


<div id="caixa_preta"></div>
<?php if(@$_GET['pg'] == 'curso'){ ?>    <!-- se foi ativado o botão de pagamento de curso, esse botão está na linha 33; Se o botão for ativo ele vai mostrar a caixa box_curso na linha 15-->
<div id="box_curso">
<br/><br/>
<a class="a2" href="cursos_e_disciplinas.php?pg=curso&cadastra=sim">  <!--Classe que redireciona para este link -->
    Cadastrar Curso</a> <!-- Botão, ao clicar nele o usuário será redirecionado para o link da linha 17; onde vai expandir a DIV box_curso  -->
<?php if(@$_GET['cadastra'] =='sim'){?>  <!--Se essa variável receber sim, ele vai mostrar esse h1 na linha 21. Cadastra é o name associado ao botão da linha 39 -->
    <br/><br/>
<h1>Cadastrar curso</h1>
<?php if(isset($_POST['cadastra'])){  //se o botão cadastra for clicado ..
    $curso =$_POST['curso'];  //a variável curso vai receber o que foi digitado no campo curso da linha 38


$sql = "INSERT INTO cursos (curso) VALUES ('$curso')";  // será feita uma inserção na tabela cursos na linha cursos do valor que está na variável curso
mysqli_query($conexao, $sql);  // isso faz com que seja percorrida as linhas da tabela

echo "<script language='javascript'>window.alert('A entrada do aluno foi confirmada!');</script>";  // um alerta mostrando que o curso foi adicionado por meio desse código em javascript
}?>
<!--  Tabela     -->
<form name="form1" method="post" action="">
    <table width="900" border="0">
        <tr>
            <td width="134">Curso</td>
        </tr>
        <tr>
            <td><input type="text" name="curso" id="textfield"></td>
            <td><input class="input" type="submit" name="cadastra" id="button" value="Cadastrar"></td>
        </tr>
    </table>



</form>
<br/>
<?php die;

}
}?>






</div>


<?php require "rodape.php"; ?>
</body>
</html>