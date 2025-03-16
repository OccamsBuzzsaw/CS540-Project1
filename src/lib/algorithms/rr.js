//doesn't care about any times, if process takes longer than time quantum, it goes to the end of the line (what an impatient algorithm!)
const rr = (processes, timeQuantum) => {
    let time = 0;
    let queue = [...processes];
    let completionTimes = [];
    let waitTimes = [];
    let turnaroundTimes = [];
    let totalWait = 0;
    let totalTurnaround = 0;
    
    processes.sort((a, b) => a.arrival - b.arrival);
    
    while (queue.length > 0) {
        let process = queue.shift();
        let execTime = Math.min(process.burst, timeQuantum);
        
        time += execTime;
        process.burst -= execTime;
        
        if (process.burst > 0) {
            queue.push(process); //if not done, push to end of queue
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
    
    return { completionTimes, waitTimes, turnaroundTimes, totalWait, totalTurnaround };
};

export default rr;
