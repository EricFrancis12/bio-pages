'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import type { BioPage, Timeframe } from '../../types';
import { formatDayOfWeekAndDate } from '../../utils/utils';
import { clickIsWithinTimeframe, getLabelsPerTimeframe } from '../../utils/timeframe-utils';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

export default function LineChart(props: {
    bioPages: BioPage[],
    timeframe: Timeframe
}) {
    const { bioPages, timeframe } = props;

    const mapData = (bioPage: BioPage) => {
        const result: any = {};
        bioPage.clicks.forEach(click => {
            const formattedDate = formatDayOfWeekAndDate(new Date(click.t ?? click.timestamp));

            // if (!clickIsWithinTimeframe(click, timeframe)) {
            //     return;
            // }

            if (result[formattedDate]) {
                result[formattedDate].push(click);
            } else {
                result[formattedDate] = [click];
            }
        });
        return labels.map(label => result[label]?.length ?? 0);
    };

    const colors = ['blue', 'green', 'yellow', 'orange', 'purple', 'red', 'black'];

    const labels = getLabelsPerTimeframe(timeframe);
    const datasets = bioPages.map((bioPage, index) => ({
        label: bioPage._id,
        data: mapData(bioPage),
        backgroundColor: colors[index % colors.length],
        borderColor: colors[index % colors.length],
        pointBorderColor: colors[index % colors.length],
        borderWidth: 1,
        tension: 0.4
    }));

    const data = {
        labels: labels,
        datasets: datasets,
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
