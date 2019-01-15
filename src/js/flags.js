import * as d3 from 'd3';
import { displayError } from './utils';
import '../css/graph.css';
import '../css/vendor/flags.min.css';

const draw = (error, img, graph) => {
  // console.warn('error, img, graph', error, img, graph);
  const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40,
  };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const simulation = d3
    .forceSimulation()
    .force('link', d3.forceLink()) // this dataset does not include id in nodes, so don't include it
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));

  const tooltip = d3
    .selectAll('.force-directed-graph')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  const dragstarted = d => {
    tooltip
      .transition()
      .duration(200)
      .style('visibility', 'hidden');
    if (!d3.event.active) {
      simulation.alphaTarget(0.3).restart();
    }
    return {
      ...d,
      fx: d.x,
      fy: d.y,
    };
  };

  const dragged = d => ({
    ...d,
    fx: d3.event.x,
    fy: d3.event.y,
  });

  const dragended = d => {
    tooltip.style('visibility', 'visible');
    if (!d3.event.active) {
      simulation.alphaTarget(0);
    }
    return {
      ...d,
      fx: null,
      fy: null,
    };
  };

  const div = d3
    .select('.force-directed-graph')
    .append('div')
    .attr('class', 'flags-container');

  const svg = d3
    .selectAll('.force-directed-graph')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const link = svg
    .append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(graph.links)
    .enter()
    .append('line')
    .attr('stroke-width', '1px');

  const node = div
    .selectAll('img')
    .data(graph.nodes)
    .enter()
    .append('img')
    .attr('src', img.src)
    // TODO: How do I know the name of the optimized image asset generated by webpack?
    // .attr('src', './Transparent.gif') // from /dist (it's not deleted by CleanWebpackPlugin)
    .attr('class', d => `flag flag-${d.code}`)
    .attr('alt', d => d.country)
    .on('mouseover', d => {
      // the flags have an absolute position, so we need to use d3.event.pageY
      const coordX = d3.event.pageX;
      const coordY = d3.event.pageY;
      tooltip
        .transition()
        .duration(200)
        .style('opacity', 0.9);
      tooltip
        .html(d.country)
        .style('left', `${coordX}px`)
        .style('top', `${coordY}px`);
    })
    .on('mouseout', () =>
      tooltip
        .transition()
        .duration(500)
        .style('opacity', 0)
    )
    .call(
      d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    );

  const ticked = () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    node.style('left', d => `${d.x + 32}px`).style('top', d => `${d.y + 16}px`);
    // .attr('transform', d => `translate(${d.x}px,${d.y}px)`);
  };

  simulation.nodes(graph.nodes).on('tick', ticked);

  simulation.force('link').links(graph.links);
};

// TODO: convert to a promise
d3.imageload = (src, callback) => {
  const image = new Image();
  image.src = src;
  image.onload = () => {
    callback(null, image);
  };
  image.onerror = callback;
};

const blankImageUrl =
  'http://res.cloudinary.com/dbntyqfmz/image/upload/v1497704295/Transparent_k52dbx.gif';
const countriesUrl =
  'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';

const urls = [blankImageUrl, countriesUrl];
const promise = Promise.all(
  urls.map((d, i) => {
    let fn;
    if (i === 0) {
      fn = url => d3.imageload(url);
    } else {
      fn = url => d3.json(url);
    }
    return fn;
  })
);

promise
  .catch(error => {
    displayError('#flags', `${blankImageUrl} or ${countriesUrl}`, error);
  })
  .then(datasets => {
    draw(...datasets);
  });
