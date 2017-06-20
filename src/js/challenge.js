import * as d3 from 'd3';


require('../sass/main.sass');
require('../sass/challenge.sass');

{
  const doLayout = () => {
    const margin = { top: 20, right: 20, bottom: 30, left: 260 };
    const width = 1024 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    return {
      width,
      height,
      margin,
    };
  };

  const zScale = d3.scaleOrdinal(d3.schemeCategory20);

  const { width, height, margin } = doLayout();

  const stackedBarChart = d3.selectAll('.dataviz-challenge-stacked-bar-chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.right})`);

  const tooltip = d3.selectAll('.dataviz-challenge-stacked-bar-chart').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  const barChart = d3.selectAll('.dataviz-challenge-bar-chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.right})`);

  const barChartXAxis = barChart.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0, ${height})`);

  const barChartYAxis = barChart.append('g')
    .attr('class', 'axis axis--y');

  // the scale of the axis is redefined every time
  // const xAxis2 = d3.axisBottom();

  let selectedGenre = 'Science fiction'; // it will change dynamically
  const barChartTitle = d3.select('.dataviz-challenge-bar-chart > h1');

  const updateBarChart = (genreSel, arr) => {
    const dataset = arr.filter(d => d.genre === genreSel)[0];
    const str = `${dataset.genre} (Tot. ${dataset.total})`;
    barChartTitle
      .text(str);

    const entries = Object.entries(dataset).filter(e => e[0] !== 'genre' && e[0] !== 'total');
    const arrData = [];
    entries.forEach((e) => {
      const genre = e[0];
      const books = +e[1];
      const obj = {
        genre,
        books,
      };
      arrData.push(obj);
    });
    const data = arrData.sort((a, b) => a.books - b.books);
    const keys2 = data.map(d => d.genre);

    const xScale2 = d3.scaleLinear()
      .domain([0, d3.max(data.map(d => d.books))])
      .range([0, width]);

    const yScale2 = d3.scaleBand()
      .domain(keys2)
      .range([height, 0])
      .round(true)
      .paddingInner(0.2); // space between bars (it's a ratio)

    const xAxis2 = d3.axisBottom()
      .scale(xScale2);

    const yAxis2 = d3.axisLeft()
      .scale(yScale2);

    barChartXAxis
      .call(xAxis2);

    barChartYAxis
      .call(yAxis2);

    const rects = barChart.selectAll('rect')
      .data(data);

    rects
      .enter()
      .append('rect');

    rects
      // .attr('class', (d, i) => `other-genre ${keys[i]}`)
      .attr('x', 0)
      .attr('y', d => yScale2(d.genre))
      .attr('width', d => xScale2(d.books))
      .attr('height', yScale2.bandwidth())
      .style('fill', d => zScale(d.genre));
  };

  const rowFunction = (d) => {
    /* there is no releationship between the number of books of a given genre,
    and the number of books of other genres (e.g. a single person could buy 1
    Satire book and: 10 Science Fiction books + 2 Drama books, etc...) */
    const genre = d[''];
    const obj = {
      genre,
    };
    const entries = Object.entries(d).filter(e => e[0] !== '');
    let total = 0;
    entries.forEach((e) => {
      const otherGenre = e[0];
      const numBooks = +e[1];
      obj[otherGenre] = numBooks;
      total += numBooks;
    });
    obj.total = total;
    return obj;
  };

  const draw = (dataset) => {
    // const numBooks = data.map(arr => arr.map(obj => obj.books));
    // const sums = numBooks.map(arr => arr.reduce((acc, n) => acc + n, 0)); // or
    // const sums = numBooks.map(arr => d3.sum(arr)); // less mind bending :-)

    // sort in descending order
    const data = dataset.sort((a, b) => a.total - b.total);
    // const keys = data.columns.slice(1); // this is not sorted
    const keys = data.map(d => d.genre); // this is sorted because data is sorted
    const totals = data.map(d => d.total);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(totals)])
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(keys)
      .range([height, 0])
      .round(true)
      .paddingInner(0.2); // space between bars (it's a ratio)

    const xAxis = d3.axisBottom()
      .scale(xScale);

    const yAxis = d3.axisLeft()
      .scale(yScale);

    const mouseover = (d) => {
      tooltip.transition().duration(200).style('opacity', 0.9);

      // this is not what I want
      // const genre = d.data.genre;
      // const numBooks = d.data[genre];

      // This is what I want. Is there a simpler way?
      const pxWidth = xScale(d[1]) - xScale(d[0]);
      const num = xScale.invert(pxWidth);
      const entries = Object.entries(d.data).filter(e => e[0] !== 'genre');
      const books = entries.map(e => e[1]);
      const diffs = books.map(x => Math.abs(x - num));
      const index = diffs.indexOf(d3.min(diffs));
      const genre = entries[index][0];
      const numBooks = entries[index][1];
      const html = `<span>${genre}</span><br><span>${numBooks}</span>`;
      tooltip.html(html)
        .style('left', `${d3.event.layerX}px`)
        .style('top', `${(d3.event.layerY - 10)}px`);

      updateBarChart(genre, data);
    };

    stackedBarChart.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    stackedBarChart.append('g')
      .attr('class', 'axis axis--y')
      .call(yAxis);

    // TODO: create a single word for class names (Science Fiction -> science-fiction)
    // const mainGenres = chart.selectAll('.main-genre')
    //   .data(data)
    //   .enter()
    //   .append('g')
    //   .attr('class', d => `main-genre ${d.genre}`);

    const stackData = d3.stack().keys(keys)(data);

    const stackLayout = stackedBarChart
      .append('g')
      .attr('class', 'stackLayout');

    const layers = stackLayout
      .selectAll('g')
      .data(stackData)
      .enter()
      .append('g')
      .attr('class', d => `layer ${d.key}`)
      .style('fill', d => zScale(d.key));

    layers.selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
      .attr('class', (d, i) => `other-genre ${keys[i]}`)
      .attr('x', d => xScale(d[0]))
      .attr('y', d => yScale(d.data.genre))
      .attr('width', d => xScale(d[1]) - xScale(d[0]))
      .attr('height', yScale.bandwidth())
      .on('mouseover', mouseover)
      .on('mouseout', () => tooltip.transition().duration(500).style('opacity', 0));

    const legend = stackedBarChart.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(keys.slice().reverse())
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0,${(i * 20) + 40})`);

    legend.append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', zScale);

    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(d => d)
      .on('mouseover', (d) => {
        // console.log(`LEGEND ${d}`);
        selectedGenre = d;
        updateBarChart(selectedGenre, data);
      });

    stackedBarChart.select('.axis--y').selectAll('text')
      .on('mouseover', (d) => {
        // console.log(`TICK ${d}`);
        selectedGenre = d;
        updateBarChart(selectedGenre, data);
      });

    updateBarChart(selectedGenre, data);
  };

  d3.tsv('../data/book_genres.tsv', rowFunction, (error, data) => {
    if (error) throw error;
    draw(data);
  });
}
