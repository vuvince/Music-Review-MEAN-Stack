export class ReviewModel {
  constructor(
    public songId: string,
    public userId: string,
    public name: string,
    public comment: string,
    public reviewDate: Date,
    public rating?: number
  ) {}
}
