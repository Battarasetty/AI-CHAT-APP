type F1CardProps = {
  winner: string;
  raceName: string;
};

export default function F1Card({ winner, raceName }: F1CardProps) {
  return (
    <div className="p-4 rounded-lg bg-red-100 text-red-900 max-w-[70%]">
      <div className="font-semibold">🏎 F1 Last Race Winner</div>
      <div>
        {winner} – {raceName}
      </div>
    </div>
  );
}
