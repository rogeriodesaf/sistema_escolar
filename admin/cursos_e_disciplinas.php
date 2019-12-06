<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <title>Adminstração</title>
    <link href="css/cursos_e_disciplinas.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <?php require "topo.php";?>


    <!CADASTRAR O CURSO>

        <div id="caixa_preta">
        </div><!-- caixa_preta -->

        <?php if (@$_GET['pg'] == 'curso') {?>
        <div id="box_curso">
            <br /><br />
            <a class="a2" href="cursos_e_disciplinas.php?pg=curso&cadastra=sim">Cadastrar Curso</a>
            <?php if (@$_GET['cadastra'] == 'sim') {?>
            <br /><br />
            <h1>Cadastrar curso</h1>
            <?php if (isset($_POST['cadastra'])) {

    $curso = $_POST['curso'];

    $sql = "INSERT INTO cursos (curso) VALUES ('$curso')";

    $cad = mysqli_query($conexao, $sql);

    if ($cad == '') {
        echo "<script language='javascript'> window.alert('Erro ao Cadastrar, Curso já Cadastrado!');</script>";
    } else {

        echo "<script language='javascript'> window.alert('Cadastro Realizado com sucesso!!');</script>";
        echo "<script language='javascript'>window.location='cursos_e_disciplinas.php?pg=curso';</script>";
    }

}?>
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
            <br />
            <?php die;}?>







            <?php }?>



        </div>
        <?php require "rodape.php";?>
</body>

</html>