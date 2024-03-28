import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './population.css'
class PopulationGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
      .then(response => response.json())
      .then(data => {
        // Extract necessary data from API response and sort by year
        const populationData = data.data.map(item => ({
          year: item.Year,
          population: item.Population
        })).sort((a, b) => a.year - b.year);
        this.setState({ data: populationData, loading: false });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.setState({ error: 'Error fetching data', loading: false });
      });
  }

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
        <div>
          <h1 className="heading">Task-2 Graph Population Data</h1>
      <div className='graph' style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
         
         <div className='population-chart'> <LineChart
            width={800}
            height={400}
            data={data}
            margin={{ top: 50, right: 30, left: 100, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis
              dataKey="year"
              label={{ value: 'Year', position: 'insideBottom', offset: -25, fontSize: '14px', fontFamily: 'Arial, sans-serif', fill: '#333' }}
            />
            <YAxis
              label={{ value: 'Population', angle: -90, position: 'insideLeft', fontSize: '14px', offset: -50, textAnchor: 'middle', fontFamily: 'Arial, sans-serif', fill: '#333' }}
              tick={{ dy: 0, fontFamily: 'Arial, sans-serif', fill: '#333' }}
              domain={['auto', 'auto']} // Ensure y-axis adjusts automatically
              orientation="left" // Place y-axis on the left side
            />
            <Tooltip contentStyle={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#333' }} />
            <Legend wrapperStyle={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', top:300 , left:400}} />
            <Line
              type="monotone"
              dataKey="population"
              stroke="#FF5733"
              strokeWidth={2}
              dot={{ stroke: '#FF5733', strokeWidth: 2, r: 4 }}
            />
              <p x="50%" y={-20} textAnchor="middle" dominantBaseline="middle" className="graph-name">
    Population Trends Over Time
  </p>
          </LineChart> </div>
          <div className='parag' >
        <p>Population data sourced from the U.S. Census Bureau's American Community Survey (ACS), which provides estimates of the population size for different years.</p>
        <p>The chart visualizes the population trends over time, showing how the population count has changed from 2013 to 2021.</p>
        <p>For more information about the data source and methodology, please visit the <a href="http://www.census.gov/programs-surveys/acs/" target="_blank" rel="noopener noreferrer">Census Bureau's website</a>.</p>
      </div>
        </div>
      </div></div>
    );
  }
}

export default PopulationGraph;
