<?php 

   // $db = mysqli_connect("localhost", "root", " ");
    //$conexao = mysqli_select_db ("sistema_escolar");
function conectar () {
    $servidor = "localhost";
    $usuario = "root";
    $senha = "";
    $bd = "sistema_escolar";


    $con = new mysqli ($servidor, $usuario, $senha, $bd);
    return $con;


}

$conexao = conectar();


?>