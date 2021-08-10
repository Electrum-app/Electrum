<?php
$param1=$_POST['var1'];
$param2=$_POST['var2'];
$command="python bin/substructure-enrich/substructure-enrich.py $param1 $param2";  
$buffer='';
ob_start(); // prevent outputting till you are done
passthru($command);

$buffer=ob_get_contents();

ob_end_clean();

echo "PHP and".$buffer;

?>