import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { onSettled } from 'solid-js';

type Props = {
    data: {
        clickDate: string;
        dailyClicks: number;
    }[]
}

export function ClickLineChart(props: Props) {
    let canvas!: HTMLCanvasElement
    onSettled(() => {
        Chart.register([LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement])
        new Chart(canvas.getContext("2d")!, {
            type: "line",
            data: {
                labels: props.data.map(x => x.clickDate),
                datasets: [{
                    label: "Views",
                    data: props.data.map(x => x.dailyClicks),
                    borderColor: "white"
                }]
            }
        })
    })
    return (
        <canvas ref={canvas} />
    )
}