<?php
declare(strict_types=1);

namespace CodelyTv\Contexts\Posts\Application\Find;

use CodelyTv\Contexts\Posts\Domain\Post;
use CodelyTv\Contexts\Posts\Domain\PostDoesNotExistError;
use CodelyTv\Contexts\Posts\Domain\PostRepository;

final class PostFinder
{
	public function __construct(private readonly PostRepository $repository)
	{
	}

	/** @throws PostDoesNotExistError */
	public function find(string $id): Post
	{
		$post = $this->repository->search($id);

		if (null === $post) {
			throw new PostDoesNotExistError($id);
		}

		return $post;
	}
}
