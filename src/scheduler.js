"use client"

import React, { useState } from "react";
import { Chart } from "react-chartjs-2";
import fifo from "./algorithms/fifo";
import mlfq from "./algorithms/mlfq";
import rr from "./algorithms/rr";
import sjf from "./algorithms/sjf";
import stcf from "./algorithms/stcf";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import jsPDF from "jspdf"
import html2canvas from "html2canvas";

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const SimulationScheduler = () => {
  const [numProcesses, setNumProcesses] = useState(5);
  const [rrQuantum, setRrQuantum] = useState(4);
  const [mlfqHigh, setMlfqHigh] = useState(5);
  const [mlfqLow, setMlfqLow] = useState(10);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState({
    FIFO: false,
    MLFQ: false,
    RR: false,
    SJF: false,
    STCF: false
  });
  const [results, setResults] = useState({});

  //each process gets random arrival 0-10 & burst 1-10
  const generateProcesses = () => {
    return Array.from({ length: numProcesses }, (_, id) => ({
      id,
      arrivalTime: Math.floor(Math.random() * 11),
      burstTime: Math.floor(Math.random() * 10) + 1,
    })).sort((a, b) => a.arrivalTime - b.arrivalTime);
  };

  const runSimulation = () => {
    const processes = generateProcesses();
    const res = {};

    //this just checks which algorithms need to run and switches to them
    Object.keys(selectedAlgorithms).forEach((alg) => {  
      if (!selectedAlgorithms[alg]) return;
      let completionTimes, waitTimes, turnaroundTimes, totalWait, totalTurnaround;
      switch (alg) {
        case "FIFO":
          [completionTimes, waitTimes, turnaroundTimes, totalWait, totalTurnaround] = fifo(processes);
          break;
        case "MLFQ":
          [completionTimes, waitTimes, turnaroundTimes, totalWait, totalTurnaround] = mlfq(processes, mlfqHigh, mlfqLow);
          break;
        case "RR":
          [completionTimes, waitTimes, turnaroundTimes, totalWait, totalTurnaround] = rr(processes, rrQuantum);
          break;
        case "SJF":
          [completionTimes, waitTimes, turnaroundTimes, totalWait, totalTurnaround] = sjf(processes);
          break;
        case "STCF":
          [completionTimes, waitTimes, turnaroundTimes, totalWait, totalTurnaround] = stcf(processes);
          break;
        default:
          return;
      }
      res[alg] = { completionTimes, waitTimes, turnaroundTimes, totalWait, totalTurnaround };
    });

    setResults(res);
  };

  //This is the part where I needed to use AI, html2canvas just doesn't make sense to me
  const saveAsPDF = () => {
    const element = document.getElementById("results-container");
    html2canvas(element, { backgroundColor: "#ffffff", scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const imgWidth = 190;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
  
      while (heightLeft > 0) {  //this part is cool, it dynamically adds pages when the canvas gets too long
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
  
        if (heightLeft > 0) {
          pdf.addPage();
        }
      }
  
      pdf.save("scheduling_results.pdf");
    });
  };

  //If I ever have to do HTML again, it'll be too soon
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">CPU Scheduling Simulation</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label>Number of Processes:</label>
          <input type="number" value={numProcesses} onChange={(e) => setNumProcesses(e.target.value)} className="border p-2" />
        </div>
        <div>
          <label>Round Robin Quantum:</label>
          <input type="number" value={rrQuantum} onChange={(e) => setRrQuantum(e.target.value)} className="border p-2" />
        </div>
        <div>
          <label>MLFQ High Priority Quantum:</label>
          <input type="number" value={mlfqHigh} onChange={(e) => setMlfqHigh(e.target.value)} className="border p-2" />
        </div>
        <div>
          <label>MLFQ Low Priority Quantum:</label>
          <input type="number" value={mlfqLow} onChange={(e) => setMlfqLow(e.target.value)} className="border p-2" />
        </div>
      </div>
      <div className="mt-4">
        {["FIFO", "MLFQ", "RR", "SJF", "STCF"].map((alg) => (
          <label key={alg} className="block">
            <input type="checkbox" checked={!!selectedAlgorithms[alg]} onChange={(e) => setSelectedAlgorithms({ ...selectedAlgorithms, [alg]: e.target.checked })} />
            {alg}
          </label>
        ))}
      </div>
      <div>
      <button onClick={runSimulation} className="mt-4 p-2 bg-blue-500 text-white">Run Simulation</button>
      </div>
      <button onClick={saveAsPDF} className="mt-4 p-2 bg-blue-500 text-white">Save as PDF (Make Sure to Generate First!)</button>
      <div className="mt-4">
        <div id="results-container" style={{backgroundColor: "white", color:"black", fontSize: "20px", padding:"20px"}}>
        {Object.entries(results).map(([alg, data]) => (
          <div key={alg}>
            <h2>{alg} Results</h2>
            <Chart type="bar" data={{
              labels: Array.from({ length: numProcesses }, (_, i) => `P${i}`),
              datasets: [
                {
                  label: "Wait Time",
                  data: data.waitTimes,
                  backgroundColor: "rgba(255, 99, 132, 0.6)",
                },
                {
                  label: "Turnaround Time",
                  data: data.turnaroundTimes,
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                }
              ]
            }} />
            <p>Total Wait Time: {data.totalWait}</p>
            <p>Total Turnaround Time: {data.totalTurnaround}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
};


export default SimulationScheduler;