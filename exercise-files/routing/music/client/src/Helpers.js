/* eslint-disable import/prefer-default-export */
export function durationToHuman(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  const paddedSeconds = pad(seconds.toString(), 2);
  const paddedMinutes = pad(minutes.toString(), 2);
  let humanized;

  if (hours > 0) {
    humanized = `${hours}:${paddedMinutes}:${paddedSeconds}`;
  } else {
    humanized = `${minutes.toString()}:${paddedSeconds}`;
  }

  return humanized;
}

function pad(numberString, size) {
  let padded = numberString;
  while (padded.length < size) padded = `0${padded}`;
  return padded;
}
