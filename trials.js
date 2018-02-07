class SingleGame {
  constructor() {
    this.doorsAvailable = [1, 2, 3];
    this.doorWithCar = this.getRandomNumber(3);
    this.contestantInitialSelection = null;
    this.doorOpenedByHost = null;
    this.contestantPicksNewDoor = null;
    this.contestantFinalSelection = null;
    this.contestantWonCar = null;
  }
  contestantMakesInitialPick() {
    this.contestantInitialSelection = this.getRandomNumber(3);
  }
  hostOpensDoor() {
    if (this.doorWithCar === this.contestantInitialSelection) {
      this.removeDoor('host_picks_between_2_non_car_doors');
    } else {
      this.removeDoor('remove_door_with_car_so_host_doesnt_pick_it');
    }
  }
  decideIfContestantPicksNewDoor() {
    this.getRandomNumber(2) === 1 ? this.contestantPicksNewDoor = true : this.contestantPicksNewDoor = false;
    if (this.contestantPicksNewDoor) this.contestantFinalSelection = this.doorsAvailable[0];
    else this.contestantFinalSelection = this.contestantInitialSelection;
  }
  determineOutcome() {
    this.doorWithCar === this.contestantFinalSelection ? this.contestantWonCar = true : this.contestantWonCar = false;
  }
  getRandomNumber(numbersToChooseFrom) {
    return Math.floor(Math.random() * numbersToChooseFrom) + 1;
  }
  removeDoor(action) {
    this.doorsAvailable.splice(this.doorsAvailable.indexOf(this.contestantInitialSelection), 1);
    switch (action) {
      case 'host_picks_between_2_non_car_doors':
        this.doorOpenedByHost = this.doorsAvailable[this.getRandomNumber(2) - 1];
        this.doorsAvailable.splice(this.doorsAvailable.indexOf(this.doorOpenedByHost), 1);
        break;
      case 'remove_door_with_car_so_host_doesnt_pick_it':
        this.doorsAvailable.splice(this.doorsAvailable.indexOf(this.doorWithCar), 1);
        this.doorOpenedByHost = this.doorsAvailable[0];
        this.doorsAvailable.push(this.doorWithCar);
        this.doorsAvailable.splice(this.doorsAvailable.indexOf(this.doorOpenedByHost), 1);
        break;
      default:
        console.log('error: no pick made by host')
    }
  }
}

const simulate10000Games = () => {
  let totalGames = 0,
    totalTimesPickedNewDoor = 0,
    totalTimesKeptSameDoor = 0,
    totalWinsPickedNewDoor = 0,
    totalLossesPickedNewDoor = 0,
    totalWinsKeptSameDoor = 0,
    totalLossesKeptSameDoor = 0;
  for (let i = 0; i < 10000; i++) {
    const singleGame = new SingleGame();
    singleGame.contestantMakesInitialPick();
    singleGame.hostOpensDoor();
    singleGame.decideIfContestantPicksNewDoor();
    singleGame.determineOutcome();
    if (singleGame.contestantWonCar && singleGame.contestantPicksNewDoor) totalWinsPickedNewDoor++;
    if (!singleGame.contestantWonCar && singleGame.contestantPicksNewDoor) totalLossesPickedNewDoor++;
    if (singleGame.contestantWonCar && !singleGame.contestantPicksNewDoor) totalWinsKeptSameDoor++;
    if (!singleGame.contestantWonCar && !singleGame.contestantPicksNewDoor) totalLossesKeptSameDoor++;
  }
  totalTimesPickedNewDoor = totalWinsPickedNewDoor + totalLossesPickedNewDoor;
  totalTimesKeptSameDoor = totalWinsKeptSameDoor + totalLossesKeptSameDoor;
  totalGames = totalTimesPickedNewDoor + totalTimesKeptSameDoor;
  console.log('--------------');
  console.log('Total number of simulated games: ', totalGames);
  console.log('--------------');
  console.log('Total times contestant picked new door: ', totalTimesPickedNewDoor);
  console.log('Total wins - contestant picked new door: ', totalWinsPickedNewDoor);
  console.log('Total losses - contestant picked new door: ', totalLossesPickedNewDoor);
  console.log('--------------');
  console.log('Total times contestant kept same door: ', totalTimesKeptSameDoor);
  console.log('Total wins - contestant kept same door: ', totalWinsKeptSameDoor);
  console.log('Total losses - contestant kapt same door: ', totalLossesKeptSameDoor);
  console.log('--------------');
  console.log('Win % when contestant picked new door: ', (totalWinsPickedNewDoor / totalTimesPickedNewDoor * 100).toFixed(2) + '%');
  console.log('Win % when contestant kept same door: ', (totalWinsKeptSameDoor / totalTimesKeptSameDoor * 100).toFixed(2) + '%');
  console.log('--------------');
};

simulate10000Games();
