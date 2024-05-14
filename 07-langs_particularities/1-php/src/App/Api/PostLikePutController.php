<?php
declare(strict_types=1);

namespace CodelyTv\App\Api;

use CodelyTv\Contexts\PostLikes\Application\Like\PostLiker;
use CodelyTv\Contexts\Posts\Domain\PostDoesNotExistError;
use CodelyTv\Contexts\Shared\Infrastructure\Response;
use CodelyTv\Contexts\Users\Domain\UserDoesNotExistError;

final readonly class PostLikePutController
{
	public function __construct(private PostLiker $postLiker)
	{
	}

	public function __invoke(string $id, string $postId, string $likerUserId): Response
	{
		try {
			$this->postLiker->like($id, $postId, $likerUserId);

			return new Response(201);
		} catch (PostDoesNotExistError|UserDoesNotExistError $error) {
			return new Response(409, $error->getMessage());
		}
	}
}
