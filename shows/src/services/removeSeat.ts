export function removeSeat(seats: Array<number>, selectedSeat: Array<number>): void {
  for(let seat of seats) {
    let i = selectedSeat.indexOf(seat)
    selectedSeat.splice(i, 1)
  }
}