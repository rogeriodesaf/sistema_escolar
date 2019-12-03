<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title> Sistema Escolar</title> 
<link rel="stylesheet" href="css/estilo.css">
<link rel="shortcut icon" href="img/iconfinder_Education_3069198.ico"/>
 

<!-- <?php require "conexao.php" ?> ISTO VAI PUXAR AS INFORMAÇÕES DA PÁGINA CONEXAO.PHP -->

</head>


<body>
    
    <div id="logo">
        <img src="img/STCN.png">
    </div>

    <div id="caixa_login">
        <?php   //se existir (isset) um método post que foi chamado através do meu botão 'button'é porque o botão foi pressionado, eu quero que ele verifique as minhas caixas de texto
            if(isset($_POST['button'])){
                $code = $_POST['code']; //cria uma variável com o nome igual ao da caixa de texto, ele recebe um valor vindo do método POST . Essa variável ($code) recebe o que foi digitado dentro da minha caixa de texto que tem o nome ('code')
                $password = $_POST['password']; //a nesna coisa aqui. Cria uma variável que vai receber o que for digitado dentro de 'password'
        //vamos testar agora se essas variáveis estão vazias
            if($code == ''){      //se o valor no campo 'code' for vazio...
            echo "<h2> Por favor, digite o número do cartão ou código de acesso.</h2>";

        }  
        else if($password == ''){    //da mesma forma se o campo password for vazio...
            echo "<h2> Por favor, digite sua senha.</h2>";
        }  //Só vai dar essas mensagens se os campos estiverem vazios. 
        else {
            $sql = "SELECT * FROM login WHERE code ='$code' AND senha='$password' "   ;  //essa função faz uma consulta no banco de dados.Selecione na tabela login os campos code e senha.
            $result = mysqli_query($conexao, $sql);//criei uma variável que vai fazer uma consulta no banco de dados e na conexão caso os campos não estejam vazios. 
            if(mysqli_num_rows($result) >0){ //mysqli_num_rows consulta nas linhas do banco de dados. Se essa consulta for maior que 0 significa que tem alguma coisa no banco. Ou seja, se tiver um cógido e uma senha .
                    while($res_1 = mysqli_fetch_assoc($result)){
                        $status = $res_1['status']; 
                        $code = $res_1['code']; 
                        $senha = $res_1['senha']; 
                        $nome = $res_1['nome']; 
                        $painel = $res_1['painel'];  //vou criar uma variavel e passar para essa variável que estiver nesse campo específico da tabela.

                        if($status == 'Inativo'){
                        echo "<h2> Usuário Inativo.</h2>";
                        }
                            else{
                                session_start(); //variável global de sessão
                                $_SESSION['code'] = $code;
                                $_SESSION['nome'] = $nome;
                                $_SESSION['senha'] = $senha;
                                $_SESSION['painel'] = $painel;

                                if($painel == 'admin') {echo "<script language='javascript' > window.location = 'admin';</script>"; }   //ele vai buscar em todas as linhas que ele encontrou
                        
                                else if($painel == 'aluno') {echo "<script language='javascript' > window.location = 'aluno';</script>";}
                                else if($painel == 'professor') {echo "<script language='javascript' > window.location = 'professor';</script>";}
                                else if($painel == 'portaria') {echo "<script language='javascript' > window.location = 'portaria';</script>";}
                                else if($painel == 'tesouraria') { echo "<script language='javascript' > window.location = 'tesouraria';</script>";}
                                    } //fechamento do else
                            }//fechamento do while
                    } //fechamento do if
                    else{
                        echo "<h2>Dados incorretos</h2>";
                    }//fechamento else
                }//fechamento do else
            }//fechamento do if 


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