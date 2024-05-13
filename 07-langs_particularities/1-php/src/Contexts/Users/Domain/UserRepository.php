<?php
declare(strict_types=1);

namespace CodelyTv\Contexts\Users\Domain;

interface UserRepository
{
	public function save(User $post): void;

	public function search(string $id): ?User;
}
