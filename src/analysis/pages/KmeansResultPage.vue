<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Elbow Method</h1>
                <div ref="elbowChart" :style="{ width: '100%', height: '500px' }"></div>
                <h2>K-Means Clustering</h2>
                <div ref="chart" :style="{ width: '100%', height: '500px' }"></div>
                <h2>Scatter Plot</h2>
                <img :src="scatterPlotUrl" alt="Scatter Plot">
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import * as d3 from 'd3';
import axios from 'axios';

export default {
    name: 'ClusterVisualization',
    data() {
        return {
            centers: [],
            labels: [],
            points: [],
            sse: [], // SSE 데이터를 저장할 배열
            scatterPlotUrl: ''
        };
    },
    async mounted() {
        try {
            const response = await axios.get('http://192.168.0.24:33333/kmeans-test');
            this.centers = response.data.centers;
            this.labels = response.data.labels;
            this.points = response.data.points;
            this.sse = response.data.sse; // SSE 데이터를 서버에서 가져옴
            this.createChart();
            this.createElbowChart();
            this.fetchScatterPlot();
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    },
    methods: {
        async fetchScatterPlot() {
            try {
                const response = await axios.get('http://192.168.0.24:33333/kmeans-scatterplot', {
                    responseType: 'blob'
                });
                this.scatterPlotUrl = URL.createObjectURL(response.data);
            } catch (error) {
                console.error("Error fetching scatter plot: ", error);
            }
        },
        createElbowChart() {
            const svg = d3.select(this.$refs.elbowChart)
                .append('svg')
                .attr('width', '100%')
                .attr('height', '500px')
                .attr('viewBox', '0 0 800 500')
                .append('g')
                .attr('transform', 'translate(50,50)');

            const width = 700;
            const height = 400;

            const xScale = d3.scaleLinear()
                .domain([1, this.sse.length])
                .range([0, width]);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(this.sse)])
                .range([height, 0]);

            const line = d3.line()
                .x((d, i) => xScale(i + 1))
                .y(d => yScale(d))
                .curve(d3.curveMonotoneX);

            svg.append('path')
                .datum(this.sse)
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke-width', 2)
                .attr('d', line);

            svg.selectAll('circle')
                .data(this.sse)
                .enter()
                .append('circle')
                .attr('cx', (d, i) => xScale(i + 1))
                .attr('cy', d => yScale(d))
                .attr('r', 5)
                .attr('fill', 'red');

            svg.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(xScale).ticks(this.sse.length));

            svg.append('g')
                .call(d3.axisLeft(yScale));
        },
        createChart() {
            const svg = d3.select(this.$refs.chart)
                .append('svg')
                .attr('width', '100%')
                .attr('height', '500px')
                .attr('viewBox', '0 0 800 500')
                .append('g')
                .attr('transform', 'translate(50,50)');

            const width = 700;
            const height = 400;

            const xScale = d3.scaleLinear()
                .domain(d3.extent(this.points, d => d[0]))
                .range([0, width]);

            const yScale = d3.scaleLinear()
                .domain(d3.extent(this.points, d => d[1]))
                .range([height, 0]);

            const color = d3.scaleOrdinal(d3.schemeCategory10);

            svg.selectAll('circle')
                .data(this.points)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d[0]))
                .attr('cy', d => yScale(d[1]))
                .attr('r', 5)
                .attr('fill', (d, i) => color(this.labels[i]));

            svg.selectAll('rect')
                .data(this.centers)
                .enter()
                .append('rect')
                .attr('x', d => xScale(d[0]) - 10)
                .attr('y', d => yScale(d[1]) - 10)
                .attr('width', 20)
                .attr('height', 20)
                .attr('fill', 'purple');
        }
    }
};
</script>

<style scoped>
</style>
