/**
 * AUTH CLIENT (Browser-Side)
 * ───────────────────────────────────────────────────────────────────────
 * • Creates a client-side auth instance using better-auth.
 * • Extends the client with additional field inference so that the
 *   TypeScript types match the custom user fields defined in auth.ts.
 * • Uses the BETTER_AUTH_URL environment variable as the base URL for
 *   API calls.
 *
 * Author: Edward Reyna
 */

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
    // Base URL for the auth server .
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        // Infers the additional user fields (username, following) so that
        // authClient methods return the correct types.
        inferAdditionalFields<typeof auth>(),
    ],
});