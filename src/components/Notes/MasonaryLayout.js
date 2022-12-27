import React, { useContext } from "react";
import Masonary from "react-masonry-css";
import { noteContext } from "../../context/NoteProvider";
import Notes from "./Notes";

const MasonaryLayout = () => {
  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1800: 4,
    1500: 3,
    1200: 2,
    1000: 2,
    842: 1,
  };

  const { notes } = useContext(noteContext);

  return (
    <div className="note-body">
      <Masonary
        className="masonary animate-slide-fwd"
        breakpointCols={breakpointColumnsObj}
      >
        {notes.map((note) => (
          <Notes key={note._id} note={note} />
        ))}
      </Masonary>
    </div>
  );
};

export default MasonaryLayout;
