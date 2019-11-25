<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title> Sistema Escolar</title> 
<link rel="stylesheet" type="text/css" href="css/estilo.css"/>
<link rel="shortcut icon" href="img/iconfinder_Education_3069198.ico"/>
 
 



<script type="text/javascript" language="javascript" charset="euc-jp" src="http://www.hapinemu.net/fobp/bp037/bp037.js"> </script>





<? require "conexao.php" ?>

</head>


<body>
    
    <div id="logo">
        <img src="img/STCN.png">
    </div>


    <div id="caixa_login">

    <?php
        if (isset ( $_POST ['button'])){
            $code = $_POST [ 'code'];
            $password = $_POST['password'];

            if ($code == ''){
                echo "<h2> Por favor, digite o número do cartão ou código de acesso! </h2>";
            }
            
                else if ($password == ''){
                echo "<h2> Por favor, digite sua senha!</h2>";
                }
            
        }

    ?>
        <form name="form" method="post" action="" enctype="multipart/form-data">
            <table>
                <tr>
                    <td><h1>Nº Cartão ou Código de Acesso: </h1></td>
                </tr>
                <tr>
                    <td><input type="text" name="code"/></td>
                </tr>
                <tr>
                    <td><h1>Senha: </h1></td>
                </tr>
                <tr>
                    <td><input type="password" name="password" /></td>
                </tr>
                <tr>
                <td><input class="input" type="submit" name="button" value="Entrar" /></td>
                </tr>   
            </table>
        </form>
    </div>




</body>












</html>