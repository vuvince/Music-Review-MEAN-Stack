class SongModel {
  constructor(
    public title: string,
    public artist: string,
    public album: string,
    public year?: Date,
    public genre?: string,
    public cViolation?: boolean, //viewPublic
    public avgRating?: number,
    public _id?: string
  ) {}
}

class FormSongModel {
  constructor(
    public title: string,
    public artist: string,
    public album: string,
    public year?: Date,
    public genre?: string,
    public cViolation?: boolean, //viewPublic
    public avgRating?: number,
    public _id?: string
  ) {}
}

export { SongModel, FormSongModel };
