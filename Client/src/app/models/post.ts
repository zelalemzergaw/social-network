export class Post {
    _id: string;
    title: string;
    description: string;
    images: string[] = [];
    postedBy: string;
    comments: Object[];
    likes: Object[];
    status: string;
    createdAt: any;

}