class SongModel {
  constructor(
    public title: string,
    public artist: string,
    public album: string,
    public year?: number,
    public genre?: string,
    public cViolation?: boolean, //viewPublic
    public avg?: number,
    public _id?: string
  ) {}
}

class FormSongModel {
  constructor(
    public title: string,
    public artist: string,
    public album: string,
    public year?: number,
    public genre?: string,
    public cViolation?: boolean, //viewPublic
    public avg?: number,
    public rating?: number,
    public reviewComments?: string,
    public _id?: string
  ) {}
}

export { SongModel, FormSongModel };
