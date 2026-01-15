export default function Background(){
     return (
    <div className="fixed inset-0 -z-10">
      
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url(/pozadina.png)" }}
      />

      {/* overlay da tekst bude čitljiv */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]" />
    </div>
  );
}