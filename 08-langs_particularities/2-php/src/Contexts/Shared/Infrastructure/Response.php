<?php
declare(strict_types=1);

namespace CodelyTv\Contexts\Shared\Infrastructure;

final readonly class Response {
	public function __construct(public int $code, public string $message = "")
	{
	}
}
