import { Label, PolarRadiusAxis, RadialBar, RadialBarChart, Tooltip } from 'recharts'

export default function ChartRadialStacked({ successRate, suggest }: { successRate: number ,suggest: string}) {
  const notSuccess: number = 100 - successRate

  const chartData = [{ month: "January", success: successRate, notsuccess: notSuccess }]

  const chartConfig = {
    success: {
      label: "Success",
      color: "#3b82f6", // blue-500
    },
    notsuccess: {
      label: "Not Success",
      color: "#ef4444", // red-500
    },
  }

  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow rounded">
          <p className="text-sm">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white/90 backdrop-blur-lg shadow-md flex flex-col max-w-sm rounded-xl">
      <div className="text-center p-4">
        <h2 className="text-xl font-bold">Success Rate</h2>
      </div>
      <div className="flex-1 flex items-center pb-0">
        <div className="mx-auto aspect-square w-full max-w-[250px]">
          <RadialBarChart
            data={chartData}
            width={250}
            height={250}
            innerRadius={80}
            outerRadius={130}
            startAngle={180}
            endAngle={0}
          >
            <Tooltip content={<CustomTooltip />} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }: any) => (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy - 16}
                      className="text-2xl font-bold fill-gray-900"
                    >
                      {successRate.toLocaleString()}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy + 4}
                      className="fill-gray-500"
                    >
                      Success
                    </tspan>
                  </text>
                )}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="success"
              stackId="a"
              cornerRadius={5}
              fill={chartConfig.success.color}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="notsuccess"
              fill={chartConfig.notsuccess.color}
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </div>
      </div>
      <div className="p-4 text-sm">
        <div className="flex flex-col items-center gap-2 font-medium">
        Other crops that you can grow <p className='text-gray-500'>{suggest}</p>
        </div>
        
      </div>
    </div>
  )
}
