/**
 * AUTH ROUTING PAGE
 * ───────────────────────────────────────────────────────────────────────
 * • Checks the current session on the server.
 * • Redirects unauthenticated users to the home page.
 * • Redirects authenticated users without a username to the username‑setup page.
 * • Otherwise sends the user to their profile page.
 *
 * Author: Edward Reyna
 */

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthRouting() {
    // Retrieve the session on the server side.
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // No session → user is not logged in; send them to the landing page.
    if (!session || !session.user) {
        redirect("/");
    }

    // Cast to any because the user object may have extra fields that are not typed.
    const currentUser = session.user as any;

    // If the user hasn't set a username yet, force them through the setup flow.
    if (!currentUser.username || currentUser.username.trim() === "") {
        redirect("/setup-username");
    }

    // Everything is fine – go to the profile page.
    redirect("/profile");
}