import { Component, createMemo, For, Loading, onSettled, Show } from "solid-js";
import styles from "./Analytics.module.css";
import { getLinkAnalytics } from "../services/linkService";
import { XIcon } from "@lucide/solid";
import { ClickLineChart } from "./ClicksChart";

export default function AnalyticsDashboard(props: { linkId: number, close(): void }) {
    const data = createMemo(() => getLinkAnalytics(props.linkId))

    return (
        <Loading>
            <div data-testid="analytics" class={styles.container}>
                {/* Header */}
                <header class={styles.header}>
                    <h1 class={styles.title}>Link Analytics Dashboard</h1>
                    <button
                        title="close"
                        onClick={props.close}
                        class={styles.closeBtn}
                    >
                        <XIcon />
                    </button>
                </header>

                {/* Metrics Overview Cards */}
                <section class={styles.metricsGrid}>
                    <div class={styles.card}>
                        <div class={styles.cardTitle}>Total Clicks</div>
                        <div class={styles.cardValue}>{data().totalClicks.toLocaleString()}</div>
                    </div>
                    <div class={styles.card}>
                        <div class={styles.cardTitle}>Active Regions Tracked</div>
                        <div class={styles.cardValue}>{data().topCountries.length}</div>
                    </div>
                </section>

                {/* Charts & Breakdown Grid */}
                <section class={styles.chartsGrid}>
                    {/* Top Countries Card */}
                    <div class={styles.chartCard}>
                        <h3 class={styles.cardTitle}>Top Countries</h3>
                        <div class={styles.tableWrapper}>
                            <table class={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Country Code</th>
                                        <th style={{ "text-align": "right" }}>Clicks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <For each={data().topCountries}>
                                        {(item) => (
                                            <tr>
                                                <td>{item.countryCode ?? "Unknown"}</td>
                                                <td style={{ "text-align": "right" }}>{item.count.toLocaleString()}</td>
                                            </tr>
                                        )}
                                    </For>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Top Referrers Card */}
                    <div class={styles.chartCard}>
                        <h3 class={styles.cardTitle}>Top Referrers</h3>
                        <div class={styles.tableWrapper}>
                            <table class={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Referrer URL</th>
                                        <th style={{ "text-align": "right" }}>Clicks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <For each={data().topReferrers}>
                                        {(item) => (
                                            <tr>
                                                <td>{item.referrer ?? "Direct / None"}</td>
                                                <td style={{ "text-align": "right" }}>{item.count.toLocaleString()}</td>
                                            </tr>
                                        )}
                                    </For>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Historical Clicks Table / Chart View */}
                <section class={styles.card}>
                    <h3 class={styles.cardTitle}>Clicks Over Time</h3>
                    <ClickLineChart data={data().byDate} />
                </section>
            </div>
        </Loading>
    )
};