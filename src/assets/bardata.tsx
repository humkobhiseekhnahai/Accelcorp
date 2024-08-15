export const BarData = {
  labels: [
    "2010-11", "2011-12", "2012-13", "2013-14", "2014-15", 
    "2015-16", "2016-17", "2017-18", "2018-19", "2019-20", 
    "2020-21", "2021-22"
  ],
  datasets: [
    {
      label: "Rice",
      data: [1121, 1311, 1373, 1319, 1295, 1305, 1417, 1469, 1553, 1622, 1607, 1718], // kg/hectare minus 1000
      backgroundColor: "rgba(255, 99, 132, 0.9)", // Red
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
    {
      label: "Wheat",
      data: [839, 989, 1177, 1117, 1145, 750, 1034, 1200, 1368, 1533, 1440, 1521], // kg/hectare minus 1000 - 600 - 400
      backgroundColor: "rgba(54, 162, 235, 0.9)", // Blue
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
    {
      label: "Maize",
      data: [740, 1285, 1234, 1246, 1346, 1249, 1236, 1413, 1706, 1648, 1572, 1779], // kg/hectare minus 1000
      backgroundColor: "rgba(75, 192, 192, 0.9)", // Teal
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
    {
      label: "Millets",
      data: [553, 565, 578, 630, 654, 602, 714, 804, 734, 809, 781, 885], // kg/hectare
      backgroundColor: "rgba(153, 102, 255, 0.9)", // Purple
      borderColor: "rgba(153, 102, 255, 1)",
      borderWidth: 1,
    },
    {
      label: "Pulses",
      data: [659, 630, 691, 699, 789, 764, 728, 656, 786, 853, 757, 823], // kg/hectare
      backgroundColor: "rgba(255, 159, 64, 0.9)", // Orange
      borderColor: "rgba(255, 159, 64, 1)",
      borderWidth: 1,
    },
    {
      label: "Oilseeds",
      data: [324.8, 298.0, 309.4, 327.5, 275.1, 252.5, 312.8, 314.6, 315.2, 332.2, 359.5, 377.0], // Million Bales multiplied by 10
      backgroundColor: "rgba(255, 205, 86, 0.9)", // Yellow
      borderColor: "rgba(255, 205, 86, 1)",
      borderWidth: 1,
    },
    {
      label: "Sugarcane",
      data: [342.38, 361.04, 341.20, 352.14, 362.33, 348.45, 306.07, 379.90, 405.42, 370.50, 405.40, 431.81], // Metric tons
      backgroundColor: "rgba(201, 203, 207, 0.9)", // Grey
      borderColor: "rgba(201, 203, 207, 1)",
      borderWidth: 1,
    },
    {
      label: "Tea",
      data: [1010, 1010, 1010, 1010, 1244, 1232, 1269, 1287, 1364, 1390, 1401, 1321], // Converted from index
      backgroundColor: "rgba(54, 235, 162, 0.9)", // Light Green
      borderColor: "rgba(54, 235, 162, 1)",
      borderWidth: 1,
    },
    {
      label: "Coffee",
      data: [300, 325, 340, 350, 340, 360, 370, 375, 390, 380, 400, 410], // Metric tons
      backgroundColor: "rgba(192, 75, 192, 0.9)", // Pink
      borderColor: "rgba(192, 75, 192, 1)",
      borderWidth: 1,
    },
    {
      label: "Rubber",
      data: [711, 784, 815, 839, 890, 890, 930, 938, 989, 970, 980, 1045], // Metric tons
      backgroundColor: "rgba(99, 132, 255, 0.9)", // Dark Blue
      borderColor: "rgba(99, 132, 255, 1)",
      borderWidth: 1,
    },
    {
      label: "Cotton",
      data: [330, 352, 342.2, 359, 348, 300.1, 325.8, 328.1, 280.4, 360.7, 352.5, 312], // Million Bales multiplied by 10
      backgroundColor: "rgba(235, 162, 54, 0.9)", // Brown
      borderColor: "rgba(235, 162, 54, 1)",
      borderWidth: 1,
    },
    {
      label: "Jute",
      data: [943, 1100, 1082, 1021, 993, 970, 1063, 1080, 1142, 1121, 1137, 1180], // Metric tons minus 500
      backgroundColor: "rgba(132, 255, 99, 0.9)", // Green
      borderColor: "rgba(132, 255, 99, 1)",
      borderWidth: 1,
    }
  ]
};



