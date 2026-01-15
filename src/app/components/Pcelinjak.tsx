
type PcelinjakProps = {
  naziv: string;
  geoSirina: number;
  geoDuzina: number;
  adresa: string;
};

export default function Pcelinjak({
  naziv,
  geoSirina,
  geoDuzina,
  adresa,
}: PcelinjakProps) {
  return (
    <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
      <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-yellow-800">
        🐝 {naziv}
      </h3>

      <p className="text-sm text-gray-700">
        <span className="font-medium">Geo širina:</span> {geoSirina}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-medium">Geo dužina:</span> {geoDuzina}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-medium">Adresa:</span> {adresa}
      </p>
    </div>
  );
}
 