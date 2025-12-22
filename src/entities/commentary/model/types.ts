export type CommentaryDto = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};

export type AddCommentaryRequestBody = {
  comment: string;
  rating: number;
};
