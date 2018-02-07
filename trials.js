let getRandomNumber = numbersToChooseFrom => Math.floor(Math.random() * numbersToChooseFrom) + 1

class SingleGame {
  constructor() {
    this.doorsAvailable = [1, 2, 3];
    this.doorWithCar = getRandomNumber(3);
    this.contestantInitialSelection = getRandomNumber(3);
    this.doorOpenedByHost = null;
    this.contestantPicksNewDoor = null;
    this.contestantFinalSelection = null;
  }
  removeDoor(action) {
    switch (action) {
      case 'initial_contestant_pick':
        this.doorsAvailable.splice(this.doorsAvailable.indexOf(this.contestantInitialSelection), 1);
        break;
      case 'host_picks_between_2_non_car_doors':
        this.doorOpenedByHost = this.doorsAvailable[getRandomNumber(2) - 1];
        this.doorsAvailable.splice(this.doorsAvailable.indexOf(this.doorOpenedByHost), 1);
        break;
      case 'remove_door_with_car_so_host_doesnt_pick_it':
        this.doorsAvailable.splice(this.doorsAvailable.indexOf(this.doorWithCar), 1);
        this.doorOpenedByHost = this.doorsAvailable[0];
        this.doorsAvailable.push(this.doorWithCar);
        this.doorsAvailable.splice(this.doorsAvailable.indexOf(this.doorOpenedByHost), 1);
        break;
      default:
        console.log('error: no match')
    }
  }
  hostOpensDoor() {
    if (this.doorWithCar === this.contestantInitialSelection) {
      this.removeDoor('host_picks_between_2_non_car_doors');
    } else {
      this.removeDoor('remove_door_with_car_so_host_doesnt_pick_it');
    }
  }
  decideIfContestantPicksNewDoor() {
    getRandomNumber(2) === 1 ? this.contestantPicksNewDoor = true : this.contestantPicksNewDoor = false;
  }
  finishGame() {
    if (this.contestantPicksNewDoor) this.contestantFinalSelection = this.doorsAvailable[0]
    else this.contestantFinalSelection = this.contestantInitialSelection;
  }
}

//simulate pick new door
function simulate() {
  let totalWinsPickedNewDoor = 0;
  let totalWinsKeptSameDoor = 0;
  for (let i = 0; i < 10000; i++) {
    const singleGame = new SingleGame();
    singleGame.removeDoor('initial_contestant_pick');
    singleGame.hostOpensDoor();
    singleGame.decideIfContestantPicksNewDoor();
    singleGame.finishGame();
    console.log(singleGame.doorWithCar, singleGame.contestantFinalSelection, singleGame.contestantPicksNewDoor)
    if (singleGame.doorWithCar === singleGame.contestantFinalSelection && singleGame.contestantPicksNewDoor) {
      totalWinsPickedNewDoor++;
    }
    if (singleGame.doorWithCar === singleGame.contestantFinalSelection && !singleGame.contestantPicksNewDoor) totalWinsKeptSameDoor++;
  }
  console.log('total wins - new door', totalWinsPickedNewDoor);
  console.log('total wins - same door', totalWinsKeptSameDoor);
}

simulate();
