import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { createMemo, onSettled } from 'solid-js';

type Props = {
    data: {
        clickDate: string;
        dailyClicks: number;
    }[]
}

export function ClickLineChart(props: Props) {
    let canvas!: HTMLCanvasElement
    const data = createMemo(() => props.data.reverse())
    onSettled(() => {
        Chart.register([LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement])
        new Chart(canvas.getContext("2d")!, {
            type: "line",
            options: {
                scales: {
                    y: {
                        ticks: {
                            precision: 0
                        }
                    }
                }
            },
            data: {
                labels: data().map(x => x.clickDate),
                datasets: [{
                    label: "Views",
                    data: data().map(x => x.dailyClicks),
                    borderColor: "white"
                }]
            }
        })
    })
    return (
        <canvas ref={canvas} />
    )
}