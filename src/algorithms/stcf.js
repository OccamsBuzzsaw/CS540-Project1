//preemptive SJF, if a new process with shorter burst shows up, it gets to go now
const stcf = (processes) => {
  let completionTimes = Array(processes.length).fill(0);
  let waitTimes = Array(processes.length).fill(0);
  let turnaroundTimes = Array(processes.length).fill(0);
  let totalWait = 0, totalTurnaround = 0;
  let remainingProcesses = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  let currentTime = 0, completed = 0;
  let lastProcess = null;
  
  while (completed < processes.length) {
    let availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime && p.remainingTime > 0);
    
    if (availableProcesses.length === 0) {
      currentTime++;
      continue;
    }
    
    availableProcesses.sort((a, b) => a.remainingTime - b.remainingTime || a.arrivalTime - b.arrivalTime);
    let process = availableProcesses[0];
    
    if (lastProcess !== process.id) {
      lastProcess = process.id;
    }
    
    process.remainingTime--;
    currentTime++;
    
    if (process.remainingTime === 0) {
      completed++;
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
export default stcf;
