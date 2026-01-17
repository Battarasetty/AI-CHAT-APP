type WeatherCardProps = {
  city: string;
  temp: number;
  condition: string;
};

export default function WeatherCard({
  city,
  temp,
  condition,
}: WeatherCardProps) {
  return (
    <div className="p-4 rounded-lg bg-blue-100 text-blue-900 max-w-[70%]">
      <div className="font-semibold">{city} Weather</div>
      <div>
        {temp}°C – {condition}
      </div>
    </div>
  );
}
