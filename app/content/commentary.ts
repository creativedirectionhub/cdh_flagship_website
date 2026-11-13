// Director's commentary: one short note per section, played when a visitor taps that section's marker.
// Audio lives at /media/commentary/<id>.mp3. The caption text below is shown on screen as it plays,
// so the commentary works with the sound off and for anyone who can't hear it.

export type Note = { id: string; label: string; text: string };

export const intro: Note = {
  id: "intro",
  label: "Commentary on",
  text: "This is the director's commentary. Same site, with me in your ear. Tap any orange marker and I'll tell you why it's there.",
};

export const notes: Note[] = [
  { id: "hero", label: "The opening", text: "A client's ball, sitting on our tape. That's the whole company in one frame: we put brands on their mark. This frame is an AI concept, and we label it." },
  { id: "film", label: "The Heist", text: "The whole pitch in thirty seconds. Three likes on a pound cake she's made since '87. Nothing wrong with the cake. Everything wrong with how it was shown." },
  { id: "brands", label: "The names", text: "Real names only. The clients I directed, and the brand deals where I made the content that ran. If it's on this list, I can tell you exactly what I did." },
  { id: "directed", label: "Undirected, directed", text: "Drag the line. Same subject. One side is what most businesses post. The other side is directed: light, lens, styling, and a reason for every choice." },
  { id: "process", label: "How it runs", text: "Fixed scope, fixed price, before anything gets made. Nobody likes surprises on an invoice." },
  { id: "wall", label: "The wall", text: "On set, the crew signs the wall when the job wraps. This one's open to you. Leave your mark." },
  { id: "close", label: "Two ways in", text: "Two ways in. Not sure yet? Get the free audit. Ready to build? Start a project. Either way, you get a director, not a sales script." },
];

export const allNotes = [intro, ...notes];
