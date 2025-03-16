//This is just SJF but new processes with shorter burst times get to go first
const stcf = (processes) => {
    let time = 0;
    let completionTimes = [];
    let waitTimes = [];
    let turnaroundTimes = [];
    let totalWait = 0;
    let totalTurnaround = 0;
    
    processes.sort((a, b) => a.arrival - b.arrival);
    
    while (processes.length > 0) {
        processes = processes.filter(p => p.arrival <= time); //gets all available processes, allows for preempting
        
        if (processes.length === 0) {
            time++;
            continue;
        }
        
        processes.sort((a, b) => a.burst - b.burst); //this is the SJF part, find shortest burst and go
        let process = processes.shift();
        
        time += process.burst;
        completionTimes.push(time);
        let turnaround = time - process.arrival;
        let wait = turnaround - process.burst;
        turnaroundTimes.push(turnaround);
        waitTimes.push(wait);
        totalTurnaround += turnaround;
        totalWait += wait;
    }
    
    return { completionTimes, waitTimes, turnaroundTimes, totalWait, totalTurnaround };
};

export default stcf;