import React from "react";
import RenderArtist from "./RenderArtist";
import RenderSongs from "./RenderSongs";
import RenderRecom from "./RenderRecom";
function RenderComponent({ artists, songs, recom}) {
  return (
    <div>
      <RenderArtist artists={artists} />
      <RenderSongs songs={songs} />
      <RenderRecom recom={recom} />
    </div>
  );
}

export default RenderComponent;
