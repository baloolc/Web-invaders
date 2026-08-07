<?php

namespace App\Controller;

class GameController extends AbstractController
{
    /**
     * Display home page
     */
    public function index(string $webPower= '', string $name = ''): string
    {
        $webPower = trim($webPower);
        $name = trim($name);

        $webPower = number_format($webPower, 2);
        return $this->twig->render('Game/index.html.twig', [
            'webPower' => $webPower,
            'name' =>$name,
        ]);
    }
}
