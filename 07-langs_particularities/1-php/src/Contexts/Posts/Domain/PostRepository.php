<?php
declare(strict_types=1);

namespace CodelyTv\Contexts\Posts\Domain;

interface PostRepository
{
	public function save(Post $post): void;

	public function search(string $id): ?Post;
}
