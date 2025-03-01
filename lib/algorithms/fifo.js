export const fifo = (processes) => {
    let waitingTimes = [];
    let turnaroundTimes = [];
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    //insert first val then loops, prevents an if-else in the loop
    waitingTimes.push(0);
    for (let i = 1; i < processes.length; i++) {
        waitingTimes.push(processes[i-1].burstTime + waitingTimes[i - 1]);
    }

    //don't like having 2 loops like this, but vals wouldn't update right without it
    for (let i = 0; i < processes.length; i++) {
        turnaroundTimes.push(processes[i].burstTime + waitingTimes[i]);
        totalWaitingTime += waitingTimes[i];
        totalTurnaroundTime += turnaroundTimes[i];
    }

    const avgWait = totalWaitingTime / processes.length;
    const avgTurnaround = totalTurnaroundTime / processes.length;

    return {
        processes: processes.map((process, idx) => ({...process, waitingTime: waitingTimes[idx], turnaroundTime: turnaroundTimes[idx],})), avgWait, avgTurnaround
    }

}