import { NextRequest, NextResponse } from "next/server";

import { UsersByCriteriaSearcher } from "../../../contexts/rrss/users/application/search_by_criteria/UsersByCriteriaSearcher";
import { MySqlUserRepository } from "../../../contexts/rrss/users/infrastructure/MySqlUserRepository";
import { SearchParamsCriteriaFiltersParser } from "../../../contexts/shared/infrastructure/criteria/SearchParamsCriteriaFiltersParser";
import { MariaDBConnection } from "../../../contexts/shared/infrastructure/MariaDBConnection";

const searcher = new UsersByCriteriaSearcher(new MySqlUserRepository(new MariaDBConnection()));

export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams } = new URL(request.url);

	const filters = SearchParamsCriteriaFiltersParser.parse(searchParams);

	const users = await searcher.search(
		filters,
		searchParams.get("orderBy"),
		searchParams.get("order"),
		searchParams.has("pageSize") ? parseInt(searchParams.get("pageSize") as string, 10) : null,
		searchParams.has("pageNumber") ? parseInt(searchParams.get("pageNumber") as string, 10) : null,
	);

	const response = NextResponse.json(users.map((user) => user.toPrimitives()));
	response.headers.set("Cache-Control", "max-age=3600, s-maxage=6000");

	return response;
}
