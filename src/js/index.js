import * as d3 from 'd3';

require('../sass/main.sass');
// require font-awesome-sass-loader here or add it to the entry points in webpack.config.js
// require('font-awesome-sass-loader');

d3.select('body').insert('p', ':first-child').html(`D3 version: ${d3.version}`);

{
  const rowFunction = (d) => {
    const obj = {
      letter: d.letter,
      frequency: +d.frequency,
    };
    return obj;
  };

  const draw = (letterFrequencies) => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
      .range([0, width])
      .round(true)
      .paddingInner(0.1); // space between bars (it's a ratio)

    const yScale = d3.scaleLinear()
      .range([height, 0]);

    const xAxis = d3.axisBottom()
      .scale(xScale);

    const yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(10, '%');

    const svg = d3.selectAll('.barchart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.right})`);

    const tooltip = d3.selectAll('.barchart').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    xScale
      .domain(letterFrequencies.map(d => d.letter));
    yScale
      .domain([0, d3.max(letterFrequencies, d => d.frequency)]);

    svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'axis axis--y')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Frequency');

    svg.selectAll('.bar').data(letterFrequencies)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.letter))
      .attr('width', xScale.bandwidth())
      .attr('y', d => yScale(d.frequency))
      .attr('height', d => height - yScale(d.frequency))
      .on('mouseover', (d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`Frequency: <span>${d.frequency}</span>`)
          .style('left', `${d3.event.layerX}px`)
          .style('top', `${(d3.event.layerY - 28)}px`);
      })
      .on('mouseout', () => tooltip.transition().duration(500).style('opacity', 0));
  };

  d3.tsv('./data/bardata.tsv', rowFunction, (error, data) => {
    if (error) throw error;
    draw(data);
  });
}

// -------------------------------------------------------------------------- //

{
  const rowFunction = (d) => {
    const obj = {
      date: d.date,
      close: +d.close,
    };
    return obj;
  };

  const draw = (stocks) => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const parseTime = d3.timeParse('%d-%b-%y');
    const bisectDate = d3.bisector(d => parseTime(d.date)).left;
    const formatCurrency = d3.format('($.2f');

    const xScale = d3.scaleTime()
      .range([0, width])
      .domain(d3.extent(stocks, d => parseTime(d.date))); // or, in alternative
      // .domain([new Date(parseTime(stocks[0].date)),
      //   new Date(parseTime(stocks[stocks.length - 1].date))]);

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(stocks, d => d.close)]);

    const line = d3.line()
      .x(d => xScale(parseTime(d.date)))
      .y(d => yScale(d.close));

    const xAxis = d3.axisBottom()
      .scale(xScale);

    const yAxis = d3.axisLeft()
      .scale(yScale);

    const svg = d3.selectAll('.linechart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const linepath = svg.append('g');

    const tooltip = d3.selectAll('.linechart').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const focus = svg.append('g')
      .style('display', 'none');

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');

    linepath.append('path')
      .attr('class', 'line')
      .attr('d', line(stocks));

    focus.append('circle')
      .attr('class', 'y')
      .style('fill', 'none')
      .style('stroke', 'blue')
      .attr('r', 4);

    const mousemove = () => {
      const coordX = d3.event.layerX;
      const date0 = xScale.invert(coordX);
      const i = bisectDate(stocks, date0, 1);
      const d0 = stocks[i - 1];
      let d1 = stocks[i];
      if (!d1) {
        d1 = stocks[i - 1];
      }
      let d = null;
      if ((date0 - parseTime(d0.date)) > (parseTime(d1.date) - date0)) {
        d = d1;
      } else {
        d = d0;
      }
      focus.select('circle.y')
        .attr('transform', `translate(${coordX}, ${yScale(d.close)})`);
      tooltip.transition().duration(200).style('opacity', 0.9);
      tooltip.html(`${d.date}<br/>Close: <span>${formatCurrency(d.close)}</span>`)
        .style('left', `${d3.event.layerX}px`)
        .style('top', `${(d3.event.layerY - 28)}px`);
    };

    // append a rect element to capture mouse events
    svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mouseover', () => focus.style('display', null))
      .on('mouseout', () => focus.style('display', 'none'))
      .on('mousemove', mousemove);
  };

  d3.tsv('./data/linedata.tsv', rowFunction, (error, data) => {
    if (error) throw error;
    draw(data);
  });
}
