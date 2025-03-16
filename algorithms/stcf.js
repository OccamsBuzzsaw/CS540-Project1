//This is just SJF but new processes with shorter burst times get to go first
const stcf = (processes) => {
    let totalWait = 0;
    let totalTurnaround = 0;
    let currTime = 0;
    let completedProcesses = [];
    let remainingProcesses = [];
    let ready = [];

    remainingProcesses.sort((a,b) => a.arrivalTime - b.arrivalTime);

    while (remainingProcesses.length > 0 || ready.length > 0) {
        while (remainingProcesses.length > 0 && remainingProcesses[0].arrivalTime <= currTime) {
            ready.push(remainingProcesses.shift());
    }

    if (ready.length == 0) {
        if (remainingProcesses.length > 0) {
            currTime = remainingProcesses[0].arrivalTime;
        }
        continue;
    }

    ready.sort((a,b) => a.burstTime - b.burstTime);

    const next = ready.shift();

    next.startTime = currTime;
    currTime += next.burstTime;
    next.endTime = currTime;
    next.turnaroundTime = next.endTime - next.arrivalTime;
    next.waitTime = next.turnaroundTime - next.burstTime;

    totalWait += next.waitTime;
    totalTurnaround += next.turnaroundTime;
    completedProcesses.push(next);
}

const avgWait = totalWait / processes.length;
const avgTurnaround = totalTurnaround / processes.length;

return [{processes: completedProcesses, avgWait, avgTurnaround}];
};

export default stcf;