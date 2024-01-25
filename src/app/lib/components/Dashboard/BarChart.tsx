'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { BioPage } from '../../types';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

export default function BarChart({ bioPages }: {
    bioPages: BioPage[]
}) {
    const labels = [
        '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM',
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
    ];

    const mapData = () => {
        const result: any = {};
        const allClicks = bioPages.map(bioPage => bioPage.clicks).flat();
        allClicks.forEach(click => {
            const timestamp = new Date(click.timestamp);
            const hour = timestamp.getHours();
            if (result[labels[hour]]) {
                result[labels[hour]].push(click);
            } else {
                result[labels[hour]] = [click];
            }
        });
        return labels.map(label => result[label]?.length ?? 0);
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Clicks',
                data: mapData(),
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                barThickness: 10,
                categoryScale: 10
            }
        ],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                bar: {
                    innerWidth: 100,
                    outerWidth: 100,
                    innerHeight: 100,
                    outerHeight: 100
                },
            },
            plugins: {
                legend: {
                    display: 'right'
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    };

    return (
        <Bar
            data={data}
            options={{
                indexAxis: 'x',
                elements: {
                    bar: {
                        borderWidth: 10
                    }
                }
            }}
        />
    )
}
