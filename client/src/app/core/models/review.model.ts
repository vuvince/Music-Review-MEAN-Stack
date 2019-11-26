export class ReviewModel {
  constructor(
    public songID: string,
    public userID: string,
    public name: string,
    public comment: string,
    public reviewDate: Date,
    public rating?: number
  ) {}
}
