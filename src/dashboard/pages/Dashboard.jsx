/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Thermometer, Droplets, Gauge, Wind, MapPin } from 'lucide-react';

const cities = [
  { value: "1273294", label: "Delhi" },
  { value: "1261481", label: "Mumbai" },
  { value: "1277333", label: "Bangalore" },
  { value: "1275004", label: "Kolkata" },
  { value: "1275339", label: "Chennai" },
  { value: "1264527", label: "Hyderabad" },
  { value: "1270642", label: "Pune" },
  { value: "1269843", label: "Jaipur" },
  { value: "1262180", label: "Lucknow" },
  { value: "1273874", label: "Ahmedabad" },
  { value: "1260086", label: "Surat" },
  { value: "1264728", label: "Indore" },
  { value: "1259229", label: "Nagpur" },
  { value: "1258986", label: "Patna" },
  { value: "1279233", label: "Thane" },
  { value: "1271308", label: "Bhopal" },
  { value: "1255364", label: "Ludhiana" },
  { value: "1267995", label: "Agra" },
  { value: "1269515", label: "Gurgaon" },
  { value: "1256237", label: "Kanpur" }
];

const Dashboard = () => {
  const [selectedCity, setSelectedCity] = useState(cities[0].value);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
          params: {
            id: selectedCity,
            appid: 'd625d0d8f988d371d0d80abf363c989a',
            units: 'metric',
          },
        });

        const forecastList = response.data.list.slice(0, 16 * 8); // Extract data for 16 days (8 timestamps per day)
        const current = forecastList[0];

        setCurrentWeather({
          temp: current.main.temp,
          humidity: current.main.humidity,
          pressure: current.main.pressure,
          windSpeed: current.wind.speed
        });

        const dailyForecast = forecastList.filter((_, index) => index % 8 === 0).map(item => ({
          date: new Date(item.dt * 1000).toLocaleDateString(),
          temp: item.main.temp,
          humidity: item.main.humidity,
          pressure: item.main.pressure,
          windSpeed: item.wind.speed,
        }));

        setForecastData(dailyForecast);

      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <Card className="mb-8 shadow-lg bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <MapPin size={24} className="text-blue-600" />
              <Select onValueChange={handleCityChange} defaultValue={selectedCity}>
                <SelectTrigger className="w-[180px] bg-white border-blue-200 focus:ring-blue-500">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Weather Dashboard</h1>
          </div>
        </CardContent>
      </Card>

      {currentWeather && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Temperature" value={currentWeather.temp} unit="°C" icon={Thermometer} color="bg-red-500" />
          <MetricCard title="Humidity" value={currentWeather.humidity} unit="%" icon={Droplets} color="bg-blue-500" />
          <MetricCard title="Pressure" value={currentWeather.pressure} unit=" hPa" icon={Gauge} color="bg-green-500" />
          <MetricCard title="Wind Speed" value={currentWeather.windSpeed} unit=" m/s" icon={Wind} color="bg-purple-500" />
        </div>
      )}

      <Card className="mb-8 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <CardTitle className="text-2xl">16-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#374151' }}
                />
                <Legend />
                <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} name="Temperature" />
                <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} name="Humidity" />
                <Line type="monotone" dataKey="pressure" stroke="#10b981" strokeWidth={2} name="Pressure" />
                <Line type="monotone" dataKey="windSpeed" stroke="#8b5cf6" strokeWidth={2} name="Wind Speed" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
          <CardTitle className="text-2xl">Detailed 16-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-bold text-gray-700">Date</TableHead>
                  <TableHead className="font-bold text-gray-700">Temperature (°C)</TableHead>
                  <TableHead className="font-bold text-gray-700">Humidity (%)</TableHead>
                  <TableHead className="font-bold text-gray-700">Pressure (hPa)</TableHead>
                  <TableHead className="font-bold text-gray-700">Wind Speed (m/s)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forecastData.map((day, index) => (
                  <TableRow key={day.date} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <TableCell>{day.date}</TableCell>
                    <TableCell className="text-red-600 font-semibold">{day.temp}</TableCell>
                    <TableCell className="text-blue-600">{day.humidity}</TableCell>
                    <TableCell className="text-green-600">{day.pressure}</TableCell>
                    <TableCell className="text-purple-600">{day.windSpeed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

const MetricCard = ({ title, value, unit, icon: Icon, color }) => (
  <Card className="shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        <div className={`text-3xl font-bold ${color.replace('bg-', 'text-')}`}>{value}{unit}</div>
      </div>
      <CardTitle className="text-lg text-gray-600">{title}</CardTitle>
    </CardContent>
  </Card>
);
