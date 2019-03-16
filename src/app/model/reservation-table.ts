import { Reservation } from './reservation';

export class ReservationTable {
  constructor(
    public deviceId: string,
    public userId: string,
    public startDate: Date,
    public endDate: Date
  ) { }

  static fromReservation(reservation: Reservation): ReservationTable[] {
    let reservationTable = new Array<ReservationTable>();
    reservation.reservationOwner.map(owner => {
      reservationTable.push(new ReservationTable(
        reservation.deviceId,
        owner.userId,
        owner.startDate,
        owner.endDate
      ));
    });
    return reservationTable;
  }

  static fromReservationArray(reservations: Reservation[]): ReservationTable[] {
    let reservationTable = new Array<ReservationTable>();
    reservations.map(reservation => {
      reservationTable = reservationTable.concat(ReservationTable.fromReservation(reservation));
    })
    return reservationTable;
  }
}