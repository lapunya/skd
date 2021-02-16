<?php
    $userName = $_POST['userName'];
    $userSurname = $_POST['userSurname'];
    $userPatronymic = $_POST['userPatronymic'];
    $companyName = $_POST['companyName'];
    $to = "skd@kronwerk.ru";
    $from = $_POST['userEmail'];
    $subject = "Выбор лицензий";
    $licenses = $_POST['list'];
    $telephoneNumber = $_POST['telephoneNumber'];
    $offer = $_POST['offer'];
    $contacts = "Контактные данные:\nФамилия: $userSurname\nИмя: $userName\nОтчество: $userPatronymic\nНазвание организации: $companyName\nЭл.почта: $from";
    if ($telephoneNumber) {
        $contacts .= "\nНомер телефона: $telephoneNumber";
    }
    $message = "Пользователю требуются следующие лицензии:\n$licenses\n$contacts";
    if ($offer == on) {
        $message .= "\n\nПользователь запросил коммерческое предложение";
    }
    $headers = "From: $from\r\nReply-to: $from\r\nContent-type: text/plain; charset=utf-8\r\n";
    mail ($to, $subject, $message, $headers);
?>
