const mlfq = (processes, timeQuantum1 = 4, timeQuantum2 = 6) => {
    let results = [];
    let totalWait = 0;
    let totalTurnaround = 0;

    let highQ = processes.filter(p => p.burstTime <= timeQuantum1);
    let lowQ = processes.filter(p => p.burstTime > timeQuantum1);

    let currTime = 0;
    highQ.forEach(process => {
        process.startTime = currTime;
        process.endTime = currTime + process.burstTime;
        process.turnaroundTime = process.endTime - process.arrivalTime;
        process.waitTime = process.turnaroundTime - process.burstTime;

        totalWait += process.waitTime;
        totalTurnaround += process.turnaroundTime;
        currTime += process.burstTime;
    });

    lowQ.forEach(process => {
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

export default mlfq;