import { useQuery } from "@tanstack/react-query";
import weatherHomepage from "../assets/images/short_weather_report.webp";
import { getWeatherData } from "../services/api";
import Header from "../components/layouts/Header/Header";
import MobileScreenNav from "../components/layouts/Header/MobileScreenNav";
import Footer from "../components/layouts/Footer/Footer";
import sunrise from "../assets/weather-icons/sunrise.svg";
import sunset from "../assets/weather-icons/sunset.svg";
import thermometer from "../assets/weather-icons/thermometer.svg";
import barometer from "../assets/weather-icons/barometer.svg";
import humidity from "../assets/weather-icons/humidity.svg";
import wind from "../assets/weather-icons/wind.svg";
import { FaMapLocationDot } from "react-icons/fa6";

// Shadcn Chart
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";



// WeatherForecastPage Component
const WeatherForecastPage = () => {
  const now = new Date();
  const hours =  now.getHours();
  const user = useSelector((state) => state.auth.user);

  const { data: weatherData } = useQuery({
    queryKey: ["weather-data", hours, user?.zipcode, user?.lat, user?.long],
    queryFn: () => getWeatherData(user?.zipcode, user?.lat, user?.long, hours),
  });

  // Custom Tooltip component to display both X (time) and Y (temperature)
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-black text-white p-3 rounded-md">
          <p className="label">{`Time: ${label}`}</p>
          <p className="temperature">{`Temperature: ${payload[0].value}°C`}</p>
        </div>
      );
    }
    return null;
  };

  // Map the weather data for charting
  const chartData = weatherData?.data?.hours?.map((hourData) => ({
    time: hourData.hours, // X-axis label (hours)
    temperature: hourData.temp, // Y-axis value (temperature)
  }));

  // Chart configuration (without TypeScript type-checking)
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#f5f5f5c3",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  };

  const {t} = useTranslation();

  return (
    <>
      <Header />
      <MobileScreenNav />
      <section
        className="weather-section-homepage p-5"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.356), rgba(0, 0, 0, 0.37)),url(${weatherHomepage}) no-repeat center/cover`,
        }}
      >
        <div className="container">
          <div className="weather-container-wrapper grid grid-cols-1 lg:grid-cols-3 items-center">
            <div className="weather-shortcut grid grid-cols-2">
              <figure className="icons-and-desc flex items-center">
                <img src={sunrise} alt="icon" width={80} />
                <figcaption>
                  <p className="text-sm font-semibold text-white">{t('SUNRISE')}</p>
                  <p className="text-lg text-white">
                    {weatherData?.data?.current[0]?.sunrise}
                  </p>
                </figcaption>
              </figure>
              <figure className="icons-and-desc flex items-center">
                <img src={sunset} alt="icon" width={80} />
                <figcaption>
                  <p className="text-sm font-semibold text-white">{t('SUNSET')}</p>
                  <p className="text-lg text-white">
                    {weatherData?.data?.current[0]?.sunset}
                  </p>
                </figcaption>
              </figure>
              <figure className="icons-and-desc flex items-center">
                <img src={thermometer} alt="icon" width={80} />
                <figcaption>
                  <p className="text-sm font-semibold text-white">{t('FEELS LIKE')}</p>
                  <p className="text-lg text-white">
                    {weatherData?.data?.current[0]?.feels_like}°C
                  </p>
                </figcaption>
              </figure>
              <figure className="icons-and-desc flex items-center">
                <img src={barometer} alt="icon" width={80} />
                <figcaption>
                  <p className="text-sm font-semibold text-white">
                    {t('AIR PRESSURE')}
                  </p>
                  <p className="text-lg text-white">
                    {weatherData?.data?.current[0]?.pressure}
                  </p>
                </figcaption>
              </figure>
              <figure className="icons-and-desc flex items-center">
                <img src={humidity} alt="icon" width={80} />
                <figcaption>
                  <p className="text-sm font-semibold text-white">{t('HUMIDITY')}</p>
                  <p className="text-lg text-white">
                    {weatherData?.data?.current[0]?.humidity}
                  </p>
                </figcaption>
              </figure>
              <figure className="icons-and-desc flex items-center">
                <img src={wind} alt="icon" width={80} />
                <figcaption>
                  <p className="text-sm font-semibold text-white">{t('WIND SPEED')}</p>
                  <p className="text-lg text-white">
                    {weatherData?.data?.current[0]?.wind_speed}
                  </p>
                </figcaption>
              </figure>
            </div>

            {/* Temperature and Weather Overview */}
            <div
              className="weather-temperature-main rounded-[50px] py-10"
              style={{
                background: "linear-gradient(45deg, #000000c7, transparent)",
              }}
            >
              <img
                src={weatherData?.data?.current[0]?.icon}
                alt="weather condition icon"
                className="w-[100px] mx-auto"
              />
              <p className="main-status text-2xl capitalize text-white text-center">
                {weatherData?.data?.current[0]?.description}
              </p>
              <p className="text-center font-bold text-6xl text-white mt-4">
                {weatherData?.data?.current[0]?.temp}°C
              </p>
              <p className="text-center text-xl text-white mt-4">
                <FaMapLocationDot className="inline" /> {weatherData?.city_name}
              </p>
            </div>

            {/* Hourly Forecast Chart */}
            <div className="weather-chart">
              <Card className="bg-transparent border-0 text-white shadow-none text-center uppercase">
                <CardHeader>
                  <CardTitle>{t("Today's Hourly Forecast")}</CardTitle>
                  {/* <CardDescription>January - June 2024</CardDescription> */}
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      data={chartData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="time"
                        tickLine={false}
                        axisLine={{ stroke: "#ffffff", strokeWidth: 1 }}
                        tick={{
                          fontSize: 12,
                          fill: "#ffffff", // Label color white
                        }}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 5)}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={{ stroke: "#ffffff", strokeWidth: 1 }}
                        tick={{
                          fontSize: 12,
                          fill: "#ffffff", // Y-axis labels in white
                        }}
                      />
                      <Tooltip
                        content={<CustomTooltip />} // Use custom tooltip
                      />
                      <Bar
                        dataKey="temperature"
                        fill="var(--color-desktop)" // Use the color defined for desktop
                        barSize={12} // Adjust the bar width
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 10-day forecast */}
          <div className="ten-days-forecast flex gap-5 xl:justify-center justify-start mt-10 overflow-auto py-3">
            {weatherData?.data?.days.map((item, idx) => (
              <div
                className="forecast-box hover:scale-105 transition-[0.5s] text-center flex-shrink-0 p-6 text-white rounded-3xl"
                key={idx}
                style={{
                  background: "linear-gradient(45deg, #000000c7, transparent)",
                }}
              >
                <img
                  src={item.icon}
                  alt="status icon"
                  className="w-[50px] mx-auto"
                />
                <p className="day-status">{item.weather}</p>
                <p className="day-temp">{item.temp}°C</p>
                <p className="day-name uppercase text-xl">
                  {weatherData?.data?.week[idx].day_name.slice(0, 3)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default WeatherForecastPage;
