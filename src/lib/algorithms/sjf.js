//Like FIFO, but processes go by shortest to longest burst time
const sjf = (processes) => {
    let time = 0;
  let completionTimes = [];
  let waitTimes = [];
  let turnaroundTimes = [];

  // Sort processes by arrival time, then by burst time
  processes.sort((a, b) => a.arrival - b.arrival || a.burst - b.burst);

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

export default sjf;