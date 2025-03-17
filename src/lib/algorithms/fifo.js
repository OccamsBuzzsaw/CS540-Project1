const fifo = (processes) => {
  
  let completionTimes = [];
  let waitTimes = [];
  let turnaroundTimes = [];
  let totalWait = 0;
  let totalTurnaround = 0;
  
  let currentTime = 0;
  
  processes.forEach((process) => {
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }
    
    let completionTime = currentTime + process.burstTime;
    let turnaroundTime = completionTime - process.arrivalTime;
    let waitTime = turnaroundTime - process.burstTime;
    
    completionTimes.push(completionTime);
    turnaroundTimes.push(turnaroundTime);
    waitTimes.push(waitTime);
    
    totalWait += waitTime;
    totalTurnaround += turnaroundTime;
    
    currentTime = completionTime;
  });
  
  return [
    completionTimes, 
    waitTimes, 
    turnaroundTimes, 
    totalWait, 
    totalTurnaround
  ];
};

export default fifo;
