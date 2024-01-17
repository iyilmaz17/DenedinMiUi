export interface Commentt {
    id: number;
    name: string;
    starCount: number;
    commentDescription: string;
    createdDate: Date;
    updatedDate?: Date;
    productId: number;
  }