export class ReservationOwner {

  constructor(
    public userId: string, 
    public startDate: Date, 
    public endDate: Date) { }

  static fromJson({userId, startDate, endDate}) {
    return new ReservationOwner(userId, startDate, endDate);
  }

  static fromJsonArray(json: any[]): ReservationOwner[] {
    return json.map(ReservationOwner.fromJson);
  }
}