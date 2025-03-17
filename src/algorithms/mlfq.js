//very complicated, run processes based on burst time, but push to low priority queue if it takes too long
const mlfq = (processes, highQuantum, lowQuantum) => {
  let completionTimes = Array(processes.length).fill(0);
  let waitTimes = Array(processes.length).fill(0);
  let turnaroundTimes = Array(processes.length).fill(0);
  let totalWait = 0, totalTurnaround = 0;
  let queues = [[], []];
  let currentTime = 0;
  let processMap = new Map();
  
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime); // Sort by arrival time
  let index = 0;
  
  while (index < processes.length || queues[0].length > 0 || queues[1].length > 0) {
    while (index < processes.length && processes[index].arrivalTime <= currentTime) {
      let processCopy = { ...processes[index], remainingTime: processes[index].burstTime };
      queues[0].push(processCopy);
      processMap.set(processCopy.id, processCopy);
      index++;
    }
    
    let queueIndex = queues[0].length > 0 ? 0 : 1;
    if (queues[queueIndex].length === 0) {
      currentTime = processes[index].arrivalTime; // Jump to next arrival
      continue;
    }
    
    let process = queues[queueIndex].shift();
    let quantum = queueIndex === 0 ? highQuantum : lowQuantum;
    
    while (process.remainingTime > 0) {
      let executionTime = Math.min(quantum, process.remainingTime);
      process.remainingTime -= executionTime;
      currentTime += executionTime;
      
      // Check for new arrivals and preempt if necessary
      while (index < processes.length && processes[index].arrivalTime <= currentTime) {
        let newProcess = { ...processes[index], remainingTime: processes[index].burstTime };
        queues[0].push(newProcess);
        processMap.set(newProcess.id, newProcess);
        index++;
      }
      
      if (queues[0].length > 0) {
        queues[queueIndex].unshift(process);
        break;
      }
    }
    
    if (process.remainingTime === 0) {
      let turnaroundTime = currentTime - process.arrivalTime;
      let waitTime = turnaroundTime - process.burstTime;
      completionTimes[process.id] = currentTime;
      turnaroundTimes[process.id] = turnaroundTime;
      waitTimes[process.id] = waitTime;
      totalWait += waitTime;
      totalTurnaround += turnaroundTime;
    } else {
      queues[1].push(process);
    }
  }
  return [completionTimes, waitTimes, turnaroundTimes, totalWait, totalTurnaround];
};

export default mlfq;
