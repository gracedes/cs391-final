import {authClient} from "@/lib/auth-client";

export interface ProfileDropdownProps {
    session: typeof authClient.$Infer.Session | null;
    isPending: boolean;
    imageSrc?: string;
    imageSize?: number | string;
    dropdownWidth?: string;
}