import type { ApiResponse } from "$lib/models/response.model";
import { error } from "@sveltejs/kit";

type ApiError = { error: { error: string }, status: number };
type ApiSuccess<D> = { data: D };

export async function executeOrThrow<D>(
    apiCall: Promise<ApiError | ApiSuccess<D> | ApiResponse>
): Promise<ApiSuccess<D>> {
    const result = await apiCall;
    if ("error" in result) {

        console.error("Error in API call:", result.error.error);
        throw error(result.status ?? 500, result.error.error);
    }

    if ("message" in result) {
        return {
            data: {} as D
        }
    }
    return result;
}
