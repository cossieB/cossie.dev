import { addDoc, collection, query, orderBy, limit, getDocs, where } from "firebase/firestore";
import { createSignal, onMount, useContext } from "solid-js";
import Leaders from "./Leaders";
import { MemoryContext } from "./MemoryProvider";
import { type Times } from "../types/interfaces";
import { db } from "~/integrations/firebase";
import { useSearchParams } from "@solidjs/router";

export function GlobalScores() {
    const { state } = useContext(MemoryContext)!
    const [searchParams] = useSearchParams()
    const [globalLeaders, setGlobalLeaders] = createSignal<Times[]>([])
    onMount(() => {
        addGlobal()
    })

    async function addGlobal() {
        try {
            await addDoc(collection(db, 'times'), {
                name: searchParams.name as string,
                time: state.time,
                date: new Date(),
                flips: state.flips,
                total: state.flips + state.time,
                gameSize: state.gameSize
            })
        }
        catch (err: any) {
            console.log(err.message)
        }
        try {
            const q = query(collection(db, 'times'), orderBy('total', 'asc'), limit(50), where("gameSize", "==", state.gameSize))
            const data = await getDocs(q)

            let resArr: Times[] = data.docs.map(doc => {
                let time = Number(doc.data().time);
                let date = new Date(doc.data().date.seconds * 1000);
                let name = doc.data().name;
                let flips = Number(doc.data().flips);
                let total = Number(doc.data().total);
                return { time, name, date, flips, total, gameSize: state.gameSize }
            })
            setGlobalLeaders(resArr)
        }
        catch (err: any) {
            console.log(err.message)
        }
    }
    return <Leaders leaders={globalLeaders()} header="Around The World" />
}

export function LocalScores() {
    const { state } = useContext(MemoryContext)!
    const [locallLeaders, setLocalLeaders] = createSignal<Times[]>([])
    const [searchParams] = useSearchParams()
    onMount(addLocal)

    function addLocal() {
        const obj = {
            name: searchParams.name as string,
            date: new Date(),
            time: state.time,
            flips: state.flips,
            total: state.flips + state.time,
            gameSize: state.gameSize
        }
        let localLeaders = localStorage.getItem('memory');
        let leaders: Times[]
        if (localLeaders) {
            leaders = JSON.parse(localLeaders)
            leaders.push(obj)
            leaders.sort((a, b) => a.total - b.total).slice(0, 1000);
            localStorage.setItem('memory', JSON.stringify(leaders))
        }
        else {
            leaders = [obj]
            localStorage.setItem('memory', JSON.stringify(leaders))
        }
        leaders = leaders.map(item => {
            let time = Number(item.time);
            let date = new Date(item.date);
            let { name, gameSize } = item;
            let flips = Number(item.flips);
            let total = Number(item.total);
            return {
                time,
                date,
                name,
                flips,
                total,
                gameSize
            }
        }).
            filter(item => item.gameSize == state.gameSize);
        setLocalLeaders(leaders)

    }
    return <Leaders leaders={locallLeaders()} header="On This Device" />
}
