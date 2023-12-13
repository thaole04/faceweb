'use client';
import React from 'react';
import Image from 'next/image';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  BarElement,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const LineChart = (activities: any) => {
  // console.log(activities.activities);
  const DateData: any[] = [];
  const NameData: any[] = [];
  const activitiesData = activities.activities;
  activitiesData.forEach((activity: any) => {
    // if DartData has date, then number + 1
    // else push new date to DartData with number = 1
    const date = activity.date;
    const name = activity.username;
    const indexName = NameData.findIndex((item) => item.name === name);
    if (indexName === -1) {
      NameData.push({ name, number: 1 });
    } else {
      NameData[indexName].number += 1;
    }
    const index = DateData.findIndex((item) => item.date === date);
    if (index === -1) {
      if (activity.secured === true) {
        DateData.push({ date, accept: 1, denied: 0 });
      } else {
        DateData.push({ date, accept: 0, denied: 1 });
      }
    } else {
      if (activity.secured === true) {
        DateData[index].accept += 1;
      } else {
        DateData[index].denied += 1;
      }
    }
  });
  // Data for line chart
  const labelsLine = DateData.map((item) => item.date);
  const dataAccept = DateData.map((item) => item.accept);
  const dataDenied = DateData.map((item) => item.denied);
  // Data for bar chart
  const index = NameData.findIndex((item) => item.name === 'unknown');
  const unknown = NameData[index];
  NameData.splice(index, 1);
  const labelsBar = NameData.map((item) => item.name);
  const dataNumber = NameData.map((item) => item.number);
  const [dateToDraw, setDateToDraw] = React.useState(2);
  const maxDataDraw = labelsLine.length - 1;
  // delete data before dateToDraw in DateData and labelsLine
  const dataAcceptDraw = dataAccept.slice(dateToDraw);
  const dataDeniedDraw = dataDenied.slice(dateToDraw);
  const labelsLineDraw = labelsLine.slice(dateToDraw);
  // Dữ liệu biểu đồ
  const dataLine = {
    labels: labelsLineDraw,
    datasets: [
      {
        label: 'Accept',
        data: dataAcceptDraw,
        fill: false,
        borderColor: 'rgb(0, 255, 0)',
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        tension: 0.1,
      },
      {
        label: 'Denied',
        data: dataDeniedDraw,
        fill: false,
        borderColor: 'rgb(255, 0, 0)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        tension: 0.1,
      },
    ],
  };
  const dataBar = {
    labels: labelsBar,
    datasets: [
      {
        label: 'Number',
        data: dataNumber,
        fill: false,
        borderColor: 'rgb(0, 255, 0)',
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        tension: 0.1,
      },
    ],
  };

  // Cấu hình cho biểu đồ
  const optionsLine = {
    type: 'line',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true,
          color: '#333',
        },
        title: {
          display: true,
          text: 'Day',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: '#333',
        },
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Accept and Denied',
        font: {
          size: 16,
        },
      },
      legend: {
        display: false,
        labels: {
          font: {
            size: 14,
          },
          padding: 15,
        },
      },
    },
  };
  const optionsBar = {
    type: 'bar',
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true,
          color: '#333',
        },
        title: {
          display: true,
          text: 'Value',
        },
      },
      y: {
        // beginAtZero: true,
        grid: {
          display: true,
          color: '#333',
        },
        title: {
          display: true,
          text: 'Users',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Number for each user',
        font: {
          size: 16,
        },
      },
      legend: {
        display: false,
        labels: {
          font: {
            size: 14,
          },
          padding: 15,
        },
      },
    },
  };

  //
  const totalAccept = dataAccept.reduce((a, b) => a + b, 0);
  const totalDenied = dataDenied.reduce((a, b) => a + b, 0);
  // The date with the most activity
  // const max = Math.max(...dataAccept);
  // const indexMax = dataAccept.findIndex((item) => item === max);
  // const dateMax = labelsLine[indexMax];
  return (
    <div className='h-[64rem] grid grid-rows-12 grid-cols-1 grid-flow-row gap-4 md:h-[36rem] md:grid-rows-5 md:grid-cols-6'>
      <div className='row-span-3 col-span-1 bg-dark-4 rounded-md md:row-span-4 md:col-span-3'>
        <Line
          style={{
            margin: 'auto',
            width: '90%',
            height: '90%',
          }}
          data={dataLine}
          options={optionsLine}
        />
      </div>
      <div className='row-span-3 col-span-1 bg-dark-4 rounded-md md:row-span-4 md:col-span-3'>
        <Bar
          style={{
            margin: 'auto',
            width: '90%',
            height: '90%',
          }}
          data={dataBar}
          options={optionsBar}
        />
      </div>
      <div className='row-span-1 col-span-1 bg-dark-4 rounded-md flex justify-center items-center gap-2 p-2'>
        <button
          onClick={() => {
            setDateToDraw(
              dateToDraw + 1 > maxDataDraw ? maxDataDraw : dateToDraw + 1
            );
          }}
        >
          <Image
            src='/right-arrow.svg'
            alt='true'
            width={24}
            height={24}
            style={{
              transform: 'rotate(180deg)',
              filter: 'invert(1)',
            }}
          />
        </button>
        <Image
          src='/date.svg'
          alt='true'
          className='rounded-full'
          width={36}
          height={36}
        />
        <button
          onClick={() => {
            setDateToDraw(dateToDraw - 1 < 1 ? 1 : dateToDraw - 1);
          }}
        >
          <Image
            src='/right-arrow.svg'
            alt='true'
            width={24}
            height={24}
            style={{
              filter: 'invert(1)',
            }}
          />
        </button>
      </div>
      <div className='row-span-1 col-span-1 bg-dark-4 rounded-md flex justify-center items-center gap-2 p-2'>
        <Image
          src='/people-checkbox.svg'
          alt='true'
          // className='rounded-full'
          width={36}
          height={36}
        />
        <p className='text-light-1'>{totalAccept}</p>
      </div>
      <div className='row-span-1 col-span-1 bg-dark-4 rounded-md flex justify-center items-center gap-2 p-2'>
        <Image
          src='/person-denied.svg'
          alt='true'
          className='rounded-full'
          width={36}
          height={36}
        />
        <p className='text-light-1'>{totalDenied}</p>
      </div>
      <div className='row-span-1 col-span-1 bg-dark-4 rounded-md flex justify-center items-center gap-2 p-2'>
        <Image
          src='/unknown.svg'
          alt='true'
          className='rounded-full'
          width={36}
          height={36}
        />
        <p className='text-light-1'>{unknown.number}</p>
      </div>
      <div className='row-span-1 col-span-1 bg-dark-4 rounded-md flex justify-center items-center gap-2 p-2'>
        <Image
          src='/check.svg'
          alt='true'
          className='rounded-full'
          width={36}
          height={36}
        />
        <p className='text-green-500'>Accept</p>
      </div>
      <div className='row-span-1 col-span-1 bg-dark-4 rounded-md flex justify-center items-center gap-2 p-2'>
        <Image
          src='/denied.svg'
          alt='true'
          className='rounded-full'
          width={36}
          height={36}
        />
        <p className='text-red-500'>Denied</p>
      </div>
    </div>
  );
};

export default LineChart;
