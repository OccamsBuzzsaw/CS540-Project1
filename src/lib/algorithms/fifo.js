//Super basic, processes get to go by order of arrival
const fifo = (processes) => {
    let time = 0;
  let completionTimes = [];
  let waitTimes = [];
  let turnaroundTimes = [];

  processes.sort((a, b) => a.arrival - b.arrival); //ensures processes are run by arrival time

  processes.forEach((process) => {
    time += process.burst;
    completionTimes.push(time);
    turnaroundTimes.push(time - process.arrival);
    waitTimes.push(turnaroundTimes[turnaroundTimes.length - 1] - process.burst);
  });

  const totalWaitTime = waitTimes.reduce((acc, curr) => acc + curr, 0);
  const totalTurnaroundTime = turnaroundTimes.reduce((acc, curr) => acc + curr, 0);

  return {
    completionTimes,
    waitTimes,
    turnaroundTimes,
    totalWaitTime,
    totalTurnaroundTime
  };
}

export default fifo;