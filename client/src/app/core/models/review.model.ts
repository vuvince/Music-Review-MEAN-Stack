export class ReviewModel {
  constructor(
    public songId: string,
    public userId: string,
    public name: string,
    public comments?: string,
    public reviewDate?: Date,
    public rating?: number
  ) {}
}
