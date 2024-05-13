<?php
declare(strict_types=1);

namespace CodelyTv\Contexts\PostLikes\Application\Like;

use CodelyTv\Contexts\PostLikes\Domain\PostLike;
use CodelyTv\Contexts\PostLikes\Domain\PostLikeRepository;
use CodelyTv\Contexts\Posts\Application\Find\PostFinder;
use CodelyTv\Contexts\Posts\Domain\PostDoesNotExistError;
use CodelyTv\Contexts\Users\Application\Find\UserFinder;
use CodelyTv\Contexts\Users\Domain\UserDoesNotExistError;

final readonly class PostLiker
{
	public function __construct(
		private PostFinder $postFinder,
		private UserFinder $userFinder,
		private PostLikeRepository $repository
	) {
	}

	/**
	 * @throws UserDoesNotExistError
	 * @throws PostDoesNotExistError
	 */
	public function like(string $id, string $postId, string $likerUserId): void
	{
		$this->postFinder->find($postId);
		$this->userFinder->find($likerUserId);

		$postLike = PostLike::create($id, $postId, $likerUserId);

		$this->repository->save($postLike);
	}
}
