export interface Comment {
    id: number;
    name: string;
    starCount: number;
    commentDescription: string;
    createdDate: Date;
    updatedDate?: Date;
  }