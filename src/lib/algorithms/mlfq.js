//Much more complicated, splits processes into 2 queues based on burst time
const mlfq = (processes, tqHigh, tqLow) => {
    let time = 0;
    let queueHigh = [];
    let queueLow = [];
    let completionTimes = [];
    let waitTimes = [];
    let turnaroundTimes = [];
    let totalWait = 0;
    let totalTurnaround = 0;
    
    processes.sort((a, b) => a.arrival - b.arrival);
    
    queueHigh = [...processes];
    
    while (queueHigh.length > 0 || queueLow.length > 0) {
        if (queueHigh.length > 0) {
            let process = queueHigh.shift();
            let execTime = Math.min(process.burst, tqHigh);
            
            time += execTime;
            process.burst -= execTime;
            
            if (process.burst > 0) {
                queueLow.push(process); // if not done, push to low priority
            } else {
                completionTimes.push(time);
                let turnaround = time - process.arrival;
                let wait = turnaround - process.burst;
                turnaroundTimes.push(turnaround);
                waitTimes.push(wait);
                totalTurnaround += turnaround;
                totalWait += wait;
            }
        } else if (queueLow.length > 0) {
            let process = queueLow.shift();
            let execTime = Math.min(process.burst, tqLow);
            
            time += execTime;
            process.burst -= execTime;
            
            if (process.burst > 0) {
                queueLow.push(process);
            } else {
                completionTimes.push(time);
                let turnaround = time - process.arrival;
                let wait = turnaround - process.burst;
                turnaroundTimes.push(turnaround);
                waitTimes.push(wait);
                totalTurnaround += turnaround;
                totalWait += wait;
            }
        }
    }
    
    return { completionTimes, waitTimes, turnaroundTimes, totalWait, totalTurnaround };
};

export default mlfq;
