<?php
declare(strict_types=1);

namespace CodelyTv\Contexts\Users\Application\Find;

use CodelyTv\Contexts\Users\Domain\User;
use CodelyTv\Contexts\Users\Domain\UserDoesNotExistError;
use CodelyTv\Contexts\Users\Domain\UserRepository;

final class UserFinder
{
	public function __construct(private readonly UserRepository $repository)
	{
	}

	/** @throws UserDoesNotExistError */
	public function find(string $id): User
	{
		$post = $this->repository->search($id);

		if (null === $post) {
			throw new UserDoesNotExistError($id);
		}

		return $post;
	}
}
