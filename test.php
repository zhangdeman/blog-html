<?php

$a = array(123,234,567);
$b = array(123,234,789);

var_dump(array_diff($a,$b));
var_dump(array_diff($b,$a));
