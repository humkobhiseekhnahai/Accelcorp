import React from 'react';
import ApexCharts from 'react-apexcharts';

// Define the chart options type
type ApexOptions = {
  series: number[];
  colors: string[];
  chart: {
    height: string;
    width: string;
    type: 'radialBar'; // Use specific type literal
    sparkline: {
      enabled: boolean;
    };
  };
  plotOptions: {
    radialBar: {
      track: {
        background: string;
      };
      dataLabels: {
        show: boolean;
      };
      hollow: {
        margin: number;
        size: string;
      };
    };
  };
  grid: {
    show: boolean;
    strokeDashArray: number;
    padding: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
  };
  labels: string[];
  legend: {
    show: boolean;
    position: 'bottom'; // Use specific type literal
    fontFamily: string;
  };
  tooltip: {
    enabled: boolean;
    x: {
      show: boolean;
    };
  };
  yaxis: {
    show: boolean;
    labels: {
      formatter: (value: number) => string;
    };
  };
};

interface GraphType {
  profit: number;
  success: number;
}

export const RadicalGraph: React.FC<GraphType> = ({ profit, success }) => {
  // Define the chart options
  const chartOptions: ApexOptions = {
    series: [success, profit],
    colors: ["#1C64F2", "#FDE68A"],
    chart: {
      height: "380px",
      width: "100%",
      type: 'radialBar',
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        track: {
          background: '#E5E7EB',
        },
        dataLabels: {
          show: false,
        },
        hollow: {
          margin: 0,
          size: "40%",
        }
      },
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -23,
        bottom: -20,
      },
    },
    labels: ["Success Rate", "Estimated Profit"],
    legend: {
      show: false,
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        formatter: function (value) {
          return value + '%';
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[340px]">
      <ApexCharts options={chartOptions} series={chartOptions.series} type="radialBar" height={380} width="100%" />

      {/* Legend Indicator */}
      <div className="flex justify-center sm:justify-end items-center gap-x-4 mt-4">
        <div className="inline-flex items-center">
          <span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: chartOptions.colors[0] }}></span>
          <span className="text-white text-[13px] dark:text-neutral-400 ml-2">
            Success Rate
          </span>
        </div>
        <div className="inline-flex items-center">
          <span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: chartOptions.colors[1] }}></span>
          <span className="text-white text-[13px] dark:text-neutral-400 ml-2">
            Estimated Profit
          </span>
        </div>
      </div>
      {/* End Legend Indicator */}
    </div>
  );
};
