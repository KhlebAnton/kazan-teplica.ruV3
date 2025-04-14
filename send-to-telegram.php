<?php
header("Access-Control-Allow-Origin: https://kazan-teplica.ru");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json');

// Логирование
file_put_contents('form_log.txt', date('Y-m-d H:i:s')." - Начало обработки\n", FILE_APPEND);

// 1. Проверка частоты отправки
session_start();
$ipKey = 'submit_'.md5($_SERVER['REMOTE_ADDR']);

if (isset($_SESSION[$ipKey]) && (time() - $_SESSION[$ipKey] < 60)) {
    file_put_contents('form_log.txt', "Слишком частые запросы\n", FILE_APPEND);
    echo json_encode(['error' => 'Пожалуйста, подождите минуту перед повторной отправкой!']);
    exit;
}

// 2. Проверка reCAPTCHA
$recaptchaToken = $_POST['recaptcha_token'] ?? '';
$secretKey = "6Le1UAYrAAAAAGGsghrIVUvG6e-eQOEN8tgL5PJK";
$recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$recaptchaToken}";

$recaptchaResponse = json_decode(file_get_contents($recaptchaUrl), true);
file_put_contents('form_log.txt', "Ответ reCAPTCHA: ".print_r($recaptchaResponse, true)."\n", FILE_APPEND);

if (!$recaptchaResponse['success'] || $recaptchaResponse['score'] < 0.5) {
    echo json_encode(['error' => 'Ошибка проверки reCAPTCHA!']);
    exit;
}

// 3. Проверка Honeypot
if (!empty($_POST['honeypot'])) {
    echo json_encode(['error' => 'Bot detected (honeypot)!']);
    exit;
}

// 4. Валидация данных
$data = [
    'name' => trim($_POST['name'] ?? ''),
    'phone' => trim($_POST['phone'] ?? ''),
    'email' => trim($_POST['email'] ?? '')
];

if (empty($data['name']) || empty($data['phone'])) {
    echo json_encode(['error' => 'Заполните имя и телефон!']);
    exit;
}

// 5. Отправка в Telegram
$botToken = '7671516198:AAGQ1v_Tmnk_U3eeKCRRhrVw4pX8P10of7Y';
$chatId = '-1002651965571';
$message = "📄 Новая заявка с сайта:\n"
    ."👤 Имя: ".htmlspecialchars($data['name'])."\n"
    ."📞 Телефон: ".htmlspecialchars($data['phone'])."\n"
    ."📧 Email: ".htmlspecialchars($data['email'] ?? 'не указано');

$url = "https://api.telegram.org/bot{$botToken}/sendMessage";
$params = [
    'chat_id' => $chatId,
    'text' => $message
];

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $params,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => true
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response === false) {
    file_put_contents('form_log.txt', "CURL error: ".curl_error($ch)."\n", FILE_APPEND);
    echo json_encode(['error' => 'Ошибка подключения к серверу Telegram']);
    exit;
}

curl_close($ch);

// 6. Сохраняем время отправки и возвращаем результат
$_SESSION[$ipKey] = time();
file_put_contents('form_log.txt', "Успешная отправка: ".$response."\n", FILE_APPEND);
echo $response;
?>