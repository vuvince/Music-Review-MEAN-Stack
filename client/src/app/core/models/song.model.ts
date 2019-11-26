export class SongModel {
  constructor(
    public title: string,
    public artist: string,
    public album: string,
    public year?: Date,
    public genre?: string,
    public cViolation?: boolean, //viewPublic
    public _id?: string
  ) {}
}
