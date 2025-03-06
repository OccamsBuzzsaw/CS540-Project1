//doesn't care about any times, if process takes longer than time quantum, it goes to the end of the line (what an impatient algorithm!)
export const rr = (processes, timeQuantum) => {
    let totalWait = 0;
    let totalTurnaround = 0;
    let currTime = 0;
    let queue = [...processes];
    let completedProcesses = [];

    while (queue.length > 0) {
        const process = queue.shift();
        let execTime = Math.min(process.burstTime, timeQuantum);

        process.burstTime -= execTime;
        currTime += execTime;

        if (process.burstTime > 0) {
            queue.push(process);
        }
        else {
            process.endTime = currTime;
            process.turnaroundTime = process.endTime - process.arrivalTime;
            process.waitTime = process.turnaroundTime = (process.burstTime + execTime);

            totalWait += process.waitTime;
            totalTurnaround += process.turnaroundTime;
            completedProcesses.push(process);
        }
    }
    
    const avgWait = totalWait / processes.length;
    const avgTurnaround = totalTurnaround / processes.length;

    return [{processes, avgWait, avgTurnaround}];
};