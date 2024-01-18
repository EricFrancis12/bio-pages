'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { BioPage } from '../../types';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function PieChart(props: {
    bioPages: BioPage[]
}) {
    const { bioPages } = props;

    const data = {
        labels: bioPages.map(bioPage => bioPage._id),
        datasets: [
            {
                label: 'Visitors',
                data: bioPages.map(bioPage => bioPage.clicks.length),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }
        ]
    };

    return (
        <Pie data={data} />
    )
}