import type {APIError} from "😺/types";

export type PostImageAPIError = APIError<{type: string | null} | {size: [number, number]}>;
