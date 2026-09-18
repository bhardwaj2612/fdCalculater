// page.js this is the entry point of application
"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false,
});

const BarGraph = ({ Bardata }) => {
    return (
        <div style={{ width: '500px', height: '700px' }}>
            <h1>FD Calculator</h1>
            <Bar data={Bardata} />
        </div>
    );
};
export default BarGraph;