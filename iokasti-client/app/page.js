
export default function Home() {

  return (
    <main>
      Home
      {/* it doesn't autoplay on refresh? */}
      <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
        <iframe
          src="https://player.vimeo.com/video/368412716?h=9e28e76ddd&autoplay=1&loop=1"
          style={{
            position: "absolute",
            top: 0,
            left: "0",
            width: "100%",
            height: "100%",
          }}
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
      <video style={{
            position: "absolute",
            top: 0,
            left: "0",
            width: "100%",
            height: "100%",
          }}>
        <source src='../public/cat.webm' />
      </video>
          </div>


      <script src="https://player.vimeo.com/api/player.js"></script>
    </main>
  );
}



