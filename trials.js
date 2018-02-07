function getRandomDoor(numberOfDoorsToChooseFrom) {
  return Math.floor(Math.random() * numberOfDoorsToChooseFrom) + 1;
}

//simulate pick new door
function simulate() {
  let totalWinsPickedNewDoor = 0;
  for (let i = 0; i < 10000; i++) {
    let doors = [1, 2, 3];
    let doorWithGoat = getRandomDoor(3);
    let contestantsDoorSelection = getRandomDoor(3);
    doors.splice(doors.indexOf(contestantsDoorSelection), 1);
    let hostDoorOpen = null;
    if (doorWithGoat === contestantsDoorSelection) {
      hostDoorOpen = doors[getRandomDoor(2)]
      doors.splice(doors.indexOf(hostDoorOpen), 1);
      contestantsDoorSelection = doors[0]
    } else {
      doors.splice(doors.indexOf(doorWithGoat), 1);
      hostDoorOpen = doors[0]
      contestantsDoorSelection = doorWithGoat;
    }

    if (doorWithGoat === contestantsDoorSelection) totalWinsPickedNewDoor++;
  }
  console.log('total wins when picking new door', totalWinsPickedNewDoor);
}

simulate();
