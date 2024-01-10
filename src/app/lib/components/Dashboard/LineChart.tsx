'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { getPreviousDates, formatDayOfWeekAndDate } from '../../utils/utils';
import { BioPage } from '../../types';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

export default function LineChart(props: {
    bioPages: BioPage[]
}) {
    const { bioPages } = props;

    const labels = getPreviousDates(7);

    const mapData = () => {
        const result: any = {};
        const allClicks = bioPages.map(bioPage => bioPage.clicks).flat();
        allClicks.forEach(click => {
            const formattedDate = formatDayOfWeekAndDate(new Date(click.t ?? click.timestamp));
            if (result[formattedDate]) {
                result[formattedDate].push(click);
            } else {
                result[formattedDate] = [click];
            }
        });
        return labels.map(label => result[label]?.length ?? 0);
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Visitors',
                data: mapData(),
                backgroundColor: 'aqua',
                borderColor: 'black',
                pointBorderColor: 'aqua',
                borderWidth: 1,
                tension: 0.4
            }
        ],
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    enabled: true
                }
            }
        },
    };

    return (
        <Line
            data={data}
        />
    )
}