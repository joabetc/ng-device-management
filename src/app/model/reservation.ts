import { ReservationOwner } from './reservation-owner';

export class Reservation {
  constructor(
    public deviceId: string, 
    public reservationOwner: ReservationOwner[]) { }

  static fromJson({ deviceId, reservationOwner }) {
    return new Reservation(deviceId, ReservationOwner.fromJsonArray(reservationOwner));
  }

  static fromJsonArray(json: any[]): Reservation[] {
    return json.map(Reservation.fromJson);
  }
}
