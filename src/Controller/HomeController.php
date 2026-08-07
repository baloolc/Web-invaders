<?php

namespace App\Controller;

use Symfony\Component\HttpClient\HttpClient;

class HomeController extends AbstractController
{
    public const API_URL = 'https://api.websitecarbon.com/';
    /**
     * Display home page
     */
    public function index(): string
    {
        $errors = [];
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $url = trim($_POST['url']);
            if (empty($url)) {
                $errors[] = 'L\'url est obligatoire';
            } elseif (!filter_var($url, FILTER_VALIDATE_URL)) {
                $errors[] = "Mauvais format pour l'url";
            }
            if (empty($errors)) {
                $name = $url;
                $url = trim($url, '/');
                $url = str_replace(':', '%3A', $url);
                $url = str_replace('/', '%2F', $url);
                $client = HttpClient::create();
                $response = $client->request('GET', self::API_URL . 'site?url=' . $url, [
                    'timeout' => 120,
                ]);
                $content = $response->toArray();
                header('Location: /game?webPower=' . $content['statistics']['co2']['grid']['grams'] . '&name=' . $name . '#game');
            }
        }

        return $this->twig->render('Home/index.html.twig');
    }

    public function article()
    {
        return $this->twig->render('Home/article.html.twig');
    }
}
