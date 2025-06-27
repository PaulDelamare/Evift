// types.ts
export type SuccessResponse<T = undefined> = T extends undefined
    ? { status: number; message: string; }
    : { status: number; data: T; message: string; };

export interface ErrorResponse {
    error: {
        error: string;
    };
    status: 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 425 | 426 | 427 | 428 | 429 | 430 | 431 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 509 | 510 | 511 | undefined;
}

export type ApiResponse<T = undefined> = SuccessResponse<T> | ErrorResponse;