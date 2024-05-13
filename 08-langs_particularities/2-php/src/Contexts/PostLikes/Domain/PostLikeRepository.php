<?php
declare(strict_types=1);

namespace CodelyTv\Contexts\PostLikes\Domain;

interface PostLikeRepository
{
	public function save(PostLike $post): void;

	public function search(string $id): ?PostLike;
}
