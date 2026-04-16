"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";

export default function SetupUsernamePage() {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();
    const handleAction = async (formData: FormData)=> {
        setError("");
        setIsSubmitting(true);

        const rawUsername = formData.get("username");
        if(!rawUsername || typeof rawUsername !== "string"){
            setError("Username cannot contain spaces.");
            setIsSubmitting(false);
            return;
        }

        const cleanUsername = rawUsername.toLowerCase().trim();

        if (cleanUsername.includes(" ")){
            setError("Username cannot contain spaces.");
            setIsSubmitting(false);
            return;
        }

        const { error: updateError } = await authClient.updateUser({
            username: cleanUsername,
        });

        if(updateError){
            setError(updateError.message || "Failed to update username. It might be taken.");
            setIsSubmitting(false);
        } else {
            router.push("/following");
        }
    };

    return (
        <div>
            <h1>Choose your Username</h1>
            <p>This is how other users will see you and follow your posts</p>

            <form action={handleAction}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        disabled={isSubmitting}
                    />
                </div>
                {error && (
                    <div>
                        <strong>Error:</strong> {error}
                    </div>
                )}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save and Continue"}
                </button>
            </form>
        </div>
    );
}
