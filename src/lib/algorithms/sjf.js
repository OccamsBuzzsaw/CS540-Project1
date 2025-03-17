const sjf = (processes) => {
    if (!Array.isArray(processes) || processes.length === 0) return [[], [], [], 0, 0];
    
    let completionTimes = [], waitTimes = [], turnaroundTimes = [], totalWait = 0, totalTurnaround = 0;
    let remainingProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let currentTime = 0;
  
    while (remainingProcesses.length > 0) {
      remainingProcesses.sort((a, b) => a.burstTime - b.burstTime);
      let process = remainingProcesses.shift();
      
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
    }
    
    return [completionTimes, waitTimes, turnaroundTimes, totalWait, totalTurnaround];
  };
  
  export default sjf;
  