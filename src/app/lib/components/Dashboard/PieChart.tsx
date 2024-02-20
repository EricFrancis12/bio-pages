'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { TBioPage } from '../../types';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function PieChart({ bioPages }: {
    bioPages: TBioPage[]
}) {
    const data = {
        labels: bioPages.map(bioPage => bioPage.name),
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
