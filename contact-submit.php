<?php
declare(strict_types=1);

ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/contact-form-error.log');

function redirectToContact(string $status, string $message = ''): never
{
    $params = ['form' => $status];

    if ($message !== '') {
        $params['message'] = $message;
    }

    header('Location: contact.html?' . http_build_query($params) . '#success', true, 303);
    exit;
}

function cleanText(string $value): string
{
    $value = trim($value);
    $value = str_replace(["\r", "\n"], ' ', $value);

    return preg_replace('/\s+/', ' ', $value) ?? '';
}

function hostDomain(): string
{
    $host = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? '';
    $host = strtolower(trim($host));
    $host = preg_replace('/:\d+$/', '', $host) ?? '';
    $host = preg_replace('/^www\./', '', $host) ?? '';

    if ($host === '' || strpos($host, '.') === false) {
        return 'localhost.localdomain';
    }

    return $host;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirectToContact('error', 'Gecersiz istek.');
}

if (trim((string) ($_POST['website'] ?? '')) !== '') {
    redirectToContact('error', 'Gonderim tamamlanamadi.');
}

$company = cleanText((string) ($_POST['company'] ?? ''));
$contactPerson = cleanText((string) ($_POST['contact-person'] ?? ''));
$location = cleanText((string) ($_POST['location'] ?? ''));
$phone = cleanText((string) ($_POST['phone'] ?? ''));
$email = cleanText((string) ($_POST['Email'] ?? ''));
$message = trim((string) ($_POST['Message'] ?? ''));

if (
    $company === '' ||
    $contactPerson === '' ||
    $location === '' ||
    $phone === '' ||
    $message === '' ||
    !filter_var($email, FILTER_VALIDATE_EMAIL)
) {
    redirectToContact('error', 'Lutfen tum alanlari dogru bicimde doldurun.');
}

$recipient = 'iamburakeryilmaz@gmail.com';
$subject = 'Neta Ecza Iletisim Formu';
$fromEmail = 'no-reply@' . hostDomain();
$body = implode("\n", [
    'Yeni iletisim formu mesaji',
    '',
    'Kurum: ' . $company,
    'Ilgili kisi: ' . $contactPerson,
    'Il / Ilce: ' . $location,
    'Telefon: ' . $phone,
    'E-posta: ' . $email,
    '',
    'Mesaj:',
    $message,
]);

$headers = [
    'From: Neta Ecza Form <' . $fromEmail . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$mailSent = @mail(
    $recipient,
    $subject,
    $body,
    implode("\r\n", $headers),
    '-f ' . $fromEmail
);

if (!$mailSent) {
    error_log('Contact form mail failed for ' . $email);
    redirectToContact('error', 'Mesaj gonderilirken bir sorun olustu.');
}

redirectToContact('success');
