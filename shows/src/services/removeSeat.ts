export function removeSeat(seats: Array<number>, selectedSeat: Array<number>): void {
  for(let seat of seats) {
    let i = selectedSeat.indexOf(seat)
    if(i !== -1) selectedSeat.splice(i, 1)
  }
}