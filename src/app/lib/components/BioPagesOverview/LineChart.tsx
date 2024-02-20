'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import type { TBioPage, TTimerange } from '../../types';
import { formatDayOfWeekAndDate } from '../../utils/utils';
import { getLabelsPerTimerange } from '../../utils/timerange-utils';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

export default function LineChart({ bioPages, timerange }: {
    bioPages: TBioPage[],
    timerange: TTimerange
}) {
    const mapData = (bioPage: TBioPage) => {
        const result: any = {};
        bioPage.clicks.forEach(click => {
            const formattedDate = formatDayOfWeekAndDate(new Date(click.timestamp));

            if (result[formattedDate]) {
                result[formattedDate].push(click);
            } else {
                result[formattedDate] = [click];
            }
        });
        return labels.map(label => result[label]?.length ?? 0);
    };

    const colors = ['blue', 'green', 'yellow', 'orange', 'purple', 'red', 'black'];

    const labels = getLabelsPerTimerange(timerange);
    const datasets = bioPages.map((bioPage, index) => ({
        label: bioPage.name,
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
