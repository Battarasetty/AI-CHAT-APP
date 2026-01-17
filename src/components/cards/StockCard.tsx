type StockCardProps = {
  symbol: string;
  price: number;
};

export default function StockCard({ symbol, price }: StockCardProps) {
  return (
    <div className="p-4 rounded-lg bg-green-100 text-green-900 max-w-[70%]">
      <div className="font-semibold">{symbol} Stock Price</div>
      <div>${price}</div>
    </div>
  );
}
