export default function Home() {
  return (
    <>
      <h1 className="p-4 text-2xl">Who's Iokasti?</h1>

      {/* it doesn't autoplay on refresh? */}
      {/* <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
        <iframe
          src="https://player.vimeo.com/video/368412716?h=9e28e76ddd&autoplay=1&loop=1&autopause=0&muted=1&background=1"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe> */}
      {/* <iframe title="vimeo-player" src="https://player.vimeo.com/video/872349418?h=8220cf9817&autoplay=1&loop=1&autopause=0&muted=1&background=1&quality=1080p"      
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                  }} frameborder="0"    allowfullscreen></iframe>
      </div> */}

      {/* it doesn't autoplay on refresh? */}

      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          width: "100%",
          height: "100%",
          "object-fit": "cover",
          "z-index": "-1",
        }}
      >
        <source src="/iokasti-home.webm" type="video/webm" />
        Your browser does not support the video tag. Please use a modern
        browser.
      </video>

      {/* <script src="https://player.vimeo.com/api/player.js"></script> */}
    </>
  );
}
