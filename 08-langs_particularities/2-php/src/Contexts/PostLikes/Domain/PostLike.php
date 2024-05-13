<?php
declare(strict_types=1);

namespace CodelyTv\Contexts\PostLikes\Domain;

final readonly class PostLike
{
	public function __construct(public string $id, public string $postId, public string $likerUserId) {}

	public static function create(string $id, string $postId, string $likerUserId): PostLike
	{
		return new self($id, $postId, $likerUserId);
	}
}
