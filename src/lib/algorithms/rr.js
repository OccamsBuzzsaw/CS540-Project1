//every process gets a time slot to run, it has to wait for it's next turn if it goes over
const rr = (processes, quantum) => {
  let completionTimes = Array(processes.length).fill(0);
  let waitTimes = Array(processes.length).fill(0);
  let turnaroundTimes = Array(processes.length).fill(0);
  let totalWait = 0, totalTurnaround = 0;
  let queue = processes.map(p => ({ ...p, remainingTime: p.burstTime, startTime: -1 }));
  let currentTime = 0;
  
  while (queue.length > 0) {
    let process = queue.shift();
    if (process.startTime === -1) {
      process.startTime = Math.max(currentTime, process.arrivalTime);
    }
    let executionTime = Math.min(quantum, process.remainingTime);
    
    currentTime += executionTime;
    process.remainingTime -= executionTime;
    
    if (process.remainingTime > 0) {
      queue.push(process);
    } else {
      let turnaroundTime = currentTime - process.arrivalTime;
      let waitTime = turnaroundTime - process.burstTime;
      completionTimes[process.id] = currentTime;
      turnaroundTimes[process.id] = turnaroundTime;
      waitTimes[process.id] = waitTime;
      totalWait += waitTime;
      totalTurnaround += turnaroundTime;
    }
  }
  return [completionTimes, waitTimes, turnaroundTimes, totalWait, totalTurnaround];
};
export default rr;