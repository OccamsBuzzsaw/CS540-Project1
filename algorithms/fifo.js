//Super basic, processes get to go by order of arrival
export const fifo = (processes) => {
    let totalWait = 0;
    let totalTurnaround = 0;
    let currTime = 0;

    processes.forEach((process) => {
        process.startTime = currTime;
        process.endTime = currTime + process.burstTime;
        process.turnaroundTime = process.endTime - process.arrivalTime;
        process.waitTime = process.turnaroundTime - process.burstTime;

        totalWait += process.waitTime;
        totalTurnaround += process.turnaroundTime;
        currTime += process.burstTime;
    });

    const avgWait = totalWait / processes.length;
    const avgTurnaround = totalTurnaround / processes.length;

    return [{processes, avgWait, avgTurnaround}];
};