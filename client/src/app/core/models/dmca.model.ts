export class DmcaModel {
  constructor(
    public email: string,
    public songId: string,
    public songName: string,
    public dReqRec: Date,
    public dNoticeSent: Date,
    public dDispRec: Date,
    public _id?: string
  ) {}
}
