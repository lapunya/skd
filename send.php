<?php
    $userName = $_POST['userName'];
    $to = "skd@kronwerk.ru";
    $from = $_POST['userEmail'];
    $subject = "Выбор лицензий";
    $licenses = $_POST['list'];
    $telephoneNumber = $_POST['telephoneNumber'];
    $offer = $_POST['offer'];
    $message = "Пользователю требуются следующие лицензии:\n$licenses\nКонтактные данные:\nИмя: $userName\nТелефон: $telephoneNumber\nЭл.почта: $from";
    if ($offer == on) {
        $message .= "\n\nПользователь запросил коммерческое предложение";
    }
    $headers = "From: $from\r\nReply-to: $from\r\nContent-type: text/plain; charset=utf-8\r\n";
    mail ($to, $subject, $message, $headers);
?>
