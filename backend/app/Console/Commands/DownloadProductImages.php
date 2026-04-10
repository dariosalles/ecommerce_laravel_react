<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DownloadProductImages extends Command
{
    protected $signature = 'download:product-images';
    protected $description = 'Baixa imagens de exemplo dos produtos de um CDN público';

    public function handle()
    {
        $this->info('Iniciando download de imagens de exemplo...');

        // Array com URLs de imagens e nomes
        $images = [
            [
                'url' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
                'filename' => 'product-001.jpg',
                'name' => 'Tênis Esportivo'
            ],
            [
                'url' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
                'filename' => 'product-002.jpg',
                'name' => 'Sneaker Moderno'
            ],
            [
                'url' => 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
                'filename' => 'product-003.jpg',
                'name' => 'Bolsa Elegante'
            ],
            [
                'url' => 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&h=500&fit=crop',
                'filename' => 'product-004.jpg',
                'name' => 'Sapato Formal'
            ],
            [
                'url' => 'https://images.unsplash.com/photo-1459262838948-3e59a75a84e9?w=500&h=500&fit=crop',
                'filename' => 'product-005.jpg',
                'name' => 'Relógio Premium'
            ],
            [
                'url' => 'https://images.unsplash.com/photo-1516762714618-e620b8b67dff?w=500&h=500&fit=crop',
                'filename' => 'product-006.jpg',
                'name' => 'Óculos de Sol'
            ],
            [
                'url' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
                'filename' => 'product-007.jpg',
                'name' => 'Jóia Brilhante'
            ],
            [
                'url' => 'https://images.unsplash.com/photo-1517670244965-e3b5b7c3cd0b?w=500&h=500&fit=crop',
                'filename' => 'product-008.jpg',
                'name' => 'Cinto Couro'
            ],
            [
                'url' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
                'filename' => 'product-009.jpg',
                'name' => 'Sapato Tamanho Grande'
            ],
            [
                'url' => 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
                'filename' => 'product-010.jpg',
                'name' => 'Mochila Urbana'
            ],
        ];

        $path = public_path('images/products');

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
