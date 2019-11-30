class DmcaModel {
  constructor(
    public email: string,
    public songId: string,
    public songTitle: string,
    public dReqRec: Date,
    public dNoticeSent: Date,
    public dDispRec: Date
  ) {}
}

export { DmcaModel };
