import {PostProps} from "@/app/interfaces/PostProps";

export interface PostPopupProps {
    post: PostProps;
    onClose: () => void;
}