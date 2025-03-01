export const sjf = (processes) => {
    const sortedProcesses = [...processes].sort((a,b) => a.burstTime - b.burstTime);

    let waitingTimes = [];
    let turnaroundTimes = [];
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    //insert first val then loops, prevents an if-else in the loop
    waitingTimes.push(0);
    for (let i = 1; i < sortedProcesses.length; i++) {
        waitingTimes.push(sortedProcesses[i-1].burstTime + waitingTimes[i - 1]);
    }

    for (let i = 0; i < sortedProcesses.length; i++) {
        turnaroundTimes.push(sortedProcesses[i].burstTime + waitingTimes[i]);
        totalWaitingTime += waitingTimes[i];
        totalTurnaroundTime += turnaroundTimes[i];
    }

    const avgWait = totalWaitingTime / processes.length;
    const avgTurnaround = totalTurnaroundTime / processes.length;

    return {
        processes: processes.map((process, idx) => ({...process, waitingTime: waitingTimes[idx], turnaroundTime: turnaroundTimes[idx],})), avgWait, avgTurnaround
    }

}