export class ReviewModel {
  constructor(
    public songID: string,
    public userID: string,
    public rBody: string,
    public rating?: number
  ) {}
}
