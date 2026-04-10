<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DownloadHighlightImages extends Command
{
    protected $signature = 'download:highlight-images';
    protected $description = 'Baixa imagens de destaques do hero de um CDN público';

    public function handle()
    {
        $this->info('Iniciando download de imagens de destaques...');

        $images = [
            [
                'url' => 'https://images.unsplash.com/photo-1552062407-c551eeda4bae?w=1920&h=600&fit=crop',
                'filename' => 'destaque-moda-homens.jpg',
                'name' => 'MODA PARA HOMENS'
            ],
            [
                'url' => 'https://images.unsplash.com/photo-1469280122803-624f355fa5de?w=1920&h=600&fit=crop',
                'filename' => 'destaque-moda-feminina.jpg',
                'name' => 'COLEÇÃO FEMININA'
            ],
            [
                'url' => 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=1920&h=600&fit=crop',
                'filename' => 'destaque-eletronicos.jpg',
                'name' => 'ELETRÔNICOS EM PROMOÇÃO'
            ],
        ];

        $path = public_path('images/highlights');

        if (!is_dir($path)) {
            mkdir($path, 0755, true);
            $this->info("✅ Pasta criada: {$path}");
        }

        $successCount = 0;
        $errorCount = 0;
        $skippedCount = 0;

        foreach ($images as $image) {
            $filePath = "{$path}/{$image['filename']}";
            
            // Se arquivo já existe, pula
            if (file_exists($filePath)) {
                $this->info("⏭️  Já existe: {$image['filename']}");
                $skippedCount++;
                continue;
            }

            try {
                $this->info("⏳ Baixando: {$image['name']}...");
                
                $imageContent = @file_get_contents($image['url']);
                
                if ($imageContent === false) {
                    $this->error("❌ Erro ao baixar: {$image['name']}");
                    $errorCount++;
                    continue;
                }

                file_put_contents($filePath, $imageContent);
                
                $this->info("✅ Salvo: {$image['filename']}");
                $successCount++;
            } catch (\Exception $e) {
                $this->error("❌ Erro ao processar {$image['name']}: " . $e->getMessage());
                $errorCount++;
            }
        }

        $this->line('');
        $this->info("════════════════════════════════════════");
        $this->info("Resumo do Download:");
        $this->info("✅ Sucesso: {$successCount}");
        $this->info("⏭️  Já existiam: {$skippedCount}");
        $this->info("❌ Erros: {$errorCount}");
        $this->info("Pasta: {$path}");
        $this->info("════════════════════════════════════════");
    }
}
