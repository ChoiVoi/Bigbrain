import React from 'react';

function YouTubePlayer ({ url, width, height }) {
  const extractVideoId = (url) => {
    if (!url) return null;
    const videoIdRegex = /(?:youtube\.com\/(?:[^/]+\/[^/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(url);

  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <div>
      {embedUrl && (
        <iframe
          width={width}
          height={height}
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default YouTubePlayer;
