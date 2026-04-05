import { PostProps } from "@/app/interfaces/PostProps";
import getCollection, { USERS_COLLECTION, POSTS_COLLECTION } from "@/lib/db";

export default async function getFollowingPosts(currentUsername: string): Promise<PostProps[]> {
    const usersCollection = await getCollection(USERS_COLLECTION);
    const currentUser = await usersCollection.findOne({ username: currentUsername });
    const followedUsernames: string[] = currentUser?.following || [];

    if (followedUsernames.length === 0) {
        return [];
    }

    const postsCollection = await getCollection(POSTS_COLLECTION);
    const data = await postsCollection.find({username: { $in: followedUsernames }}).toArray();
    const posts: PostProps[] = data.map((p) => (
        {
            id: p._id.toHexString(),
            title: p.title,
            username: p.username,
            tags: p.tags,
            content: p.content,
            image: p.image,
            upvotes: p.upvotes,
            downvotes: p.downvotes,
        }
    ));

    return posts.reverse();
}