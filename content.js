// Sentence and poem banks for the liminal space generator.
// Each entry is tagged by era and emotion. The generator picks sentences
// matching the user's derived tags to assemble a description.

// Era detection from "revisit year" answer
//   pre80s | 80s | 90s | early2000s | 2010s | recent | timeless
// Emotion detection from "unspoken" answer
//   grief | longing | tenderness | fear | peace | any

export const SENTENCES = {
  openers: [
    { text: "It is the hour after rain, in a year you cannot quite name.", era: "timeless", emotion: "any" },
    { text: "You are standing in a hallway that runs longer than the building should allow.", era: "any", emotion: "longing" },
    { text: "The light here is the color of weak tea, and it does not seem to come from anywhere.", era: "timeless", emotion: "any" },
    { text: "It is always almost evening here, in the room you did not know you remembered.", era: "any", emotion: "longing" },
    { text: "You have arrived in a place that closes at five, except it is always four-thirty.", era: "any", emotion: "any" },
    { text: "Somewhere in this building, an air conditioner is running. It has been running for a very long time.", era: "any", emotion: "any" },
    { text: "This is the hotel where the conference ended in 1997 and no one ever came back to collect their things.", era: "90s", emotion: "longing" },
    { text: "You are in the part of the school where the lights are on a different timer than the rest of the building.", era: "any", emotion: "fear" },
    { text: "It is the kind of afternoon that has been afternoon for several decades.", era: "timeless", emotion: "peace" },
    { text: "The room is exactly the shape of a memory you have not had yet.", era: "any", emotion: "any" },
    { text: "You came here once, in a different body, and the carpet remembers you.", era: "any", emotion: "longing" },
    { text: "The hour is the one your mother used to call you in from.", era: "any", emotion: "tenderness" },
    { text: "Outside, the snow is the kind that does not fall but is simply there, between the trees.", era: "timeless", emotion: "peace" },
    { text: "You are in the lobby of the building your father worked in, on a Saturday, when no one is supposed to be here.", era: "80s", emotion: "longing" },
    { text: "It is the year the mall got its second floor, and you are on the first one, alone.", era: "early2000s", emotion: "longing" },
    { text: "You are inside the photograph that hung in the dentist's waiting room.", era: "any", emotion: "any" }
  ],
  sceneSetters: [
    { text: "The wallpaper has a pattern you almost recognize — small geometric shapes in a color that did not survive the eighties.", era: "80s", emotion: "any" },
    { text: "There is a vending machine humming in the corner; it has nothing inside it, and never has.", era: "any", emotion: "any" },
    { text: "The clock on the wall says quarter past, but you cannot make out the hour from this angle.", era: "any", emotion: "any" },
    { text: "A glass of water sits on the radiator; it has not yet gone cold, but you have been here for hours.", era: "any", emotion: "fear" },
    { text: "The doors are propped open with phone books that haven't been printed in twenty years.", era: "90s", emotion: "any" },
    { text: "Down the corridor, fluorescent lights flicker in a pattern that almost spells something.", era: "any", emotion: "fear" },
    { text: "The carpet is the precise color of cafeteria walls, of waiting rooms, of the inside of a manila envelope.", era: "timeless", emotion: "any" },
    { text: "A television in the next room is playing the news, but you cannot hear the words, only the rhythm of them.", era: "any", emotion: "any" },
    { text: "There is a chair pulled out from the table as if someone got up suddenly; the cushion is still warm.", era: "any", emotion: "fear" },
    { text: "A box fan stands in the doorway, oscillating slowly; the air it moves smells of someone else's house.", era: "any", emotion: "longing" },
    { text: "The shelves are full of books with the spines turned inward, and you do not look closely.", era: "any", emotion: "fear" },
    { text: "Light leaks in through plastic blinds that have been closed since the building was new.", era: "any", emotion: "any" },
    { text: "There is a glass of milk on the counter that you do not remember pouring; it is not yours, but it is for you.", era: "any", emotion: "tenderness" },
    { text: "The phone rings once. It does not ring again. You wait for it to ring again.", era: "any", emotion: "any" },
    { text: "A beige computer hums on the desk, its screen showing a screensaver that has not been popular for two decades.", era: "early2000s", emotion: "longing" },
    { text: "The pool through the window is the wrong shade of blue, and no one is swimming, and someone has just been.", era: "any", emotion: "any" },
    { text: "A radio plays softly from somewhere you cannot locate; the station is between stations.", era: "any", emotion: "longing" }
  ],
  sensory: [
    { text: "Somewhere far away, a child is laughing, and it is the wrong laugh for the year.", era: "any", emotion: "longing" },
    { text: "You can hear the pool through the wall — the kind of pool that closes at nine and has been closed since.", era: "any", emotion: "any" },
    { text: "The hum of the refrigerator becomes, after a while, a kind of voice.", era: "any", emotion: "any" },
    { text: "There is a faint smell of chlorine, even though there has never been a pool here.", era: "any", emotion: "any" },
    { text: "The air conditioner clicks on; then, gradually, you realize it has not clicked off.", era: "any", emotion: "fear" },
    { text: "A door closes, somewhere, gently. You have not seen anyone.", era: "any", emotion: "fear" },
    { text: "You can hear a television in a language you almost speak.", era: "any", emotion: "longing" },
    { text: "The bell from the front desk dings, but no one is at the front desk.", era: "any", emotion: "any" },
    { text: "Somewhere, a phone is ringing in the wall; it is not the phone in the room.", era: "any", emotion: "fear" },
    { text: "The radio is playing a song you knew once, in a key you cannot place.", era: "any", emotion: "longing" },
    { text: "The smell is faint but specific: warm dust, vinyl, something baking somewhere far below.", era: "any", emotion: "tenderness" },
    { text: "You can hear the windshield wipers of a car you got out of a long time ago.", era: "any", emotion: "longing" }
  ],
  uncanny: [
    { text: "You do not remember coming here, but your shoes are wet, and you are not hungry.", era: "any", emotion: "any" },
    { text: "The hallway turns left, then left again, and then you are at the same window.", era: "any", emotion: "fear" },
    { text: "Your reflection in the glass is moving a half-second slower than you are.", era: "any", emotion: "fear" },
    { text: "The lamp is on. The lamp has never been plugged in.", era: "any", emotion: "any" },
    { text: "The receipt in your pocket is for something you have not bought yet.", era: "any", emotion: "any" },
    { text: "You walk through the door at the end and arrive again in the room you just left.", era: "any", emotion: "fear" },
    { text: "There is a photograph of you on the wall; you are not in it, but it is of you.", era: "any", emotion: "longing" },
    { text: "The clock is correct. You do not know what the correct time is, but you know it is correct.", era: "any", emotion: "any" },
    { text: "There is a coat on the hook by the door; it is your coat, the one you gave away.", era: "any", emotion: "longing" },
    { text: "You realize you have been holding a glass. You do not remember picking it up, and it is still cold.", era: "any", emotion: "any" },
    { text: "The numbers on the doors do not go in order: the door numbered four is between twelve and nineteen.", era: "any", emotion: "fear" },
    { text: "You can smell what your grandmother was cooking the day she left.", era: "any", emotion: "grief" }
  ],
  closers: [
    { text: "Soon, you will need to choose a hallway. Not yet. Not yet.", era: "any", emotion: "any" },
    { text: "Outside the window, it will be evening for several more hours.", era: "any", emotion: "peace" },
    { text: "You sit down on the carpet. It is warm in the way that carpets are warm only in summer.", era: "any", emotion: "peace" },
    { text: "The lamp flickers, and you forgive it.", era: "any", emotion: "tenderness" },
    { text: "You will leave when the song ends. The song does not end.", era: "any", emotion: "longing" },
    { text: "It is the kind of place you do not so much enter as agree to.", era: "any", emotion: "any" },
    { text: "There is, on the table, an envelope addressed to you in handwriting you taught yourself to forget.", era: "any", emotion: "grief" },
    { text: "You will not be afraid here. You have been afraid in worse places.", era: "any", emotion: "peace" },
    { text: "The light shifts. Somewhere, someone has decided it is later now.", era: "any", emotion: "any" },
    { text: "You stand very still. The room does too.", era: "any", emotion: "any" },
    { text: "The afternoon will hold you for as long as you let it.", era: "any", emotion: "tenderness" },
    { text: "You will tell yourself, later, that you only stopped in to use the bathroom.", era: "any", emotion: "any" }
  ]
};

export const POEMS = [
  {
    era: "any", emotion: "longing",
    stanzas: [
      "the hallway runs\nin both directions",
      "at the end of one\nis a door",
      "at the end of the other\nis a door",
      "both of them\nare this one"
    ]
  },
  {
    era: "timeless", emotion: "grief",
    stanzas: [
      "the woman in the photograph\nis not who she was\nwhen she sat for it",
      "no one is.",
      "when i think of you\ni think of you wrong\non purpose"
    ]
  },
  {
    era: "any", emotion: "peace",
    stanzas: [
      "afternoon, again.",
      "the light comes in\nsideways, as light does",
      "when it has nowhere\nin particular to go"
    ]
  },
  {
    era: "90s", emotion: "longing",
    stanzas: [
      "the modem dialed\nthree times\nbefore connecting",
      "that was the sound\nof being almost reached",
      "i listen for it now\nin microwaves, in fans",
      "in the breathing\nof the refrigerator"
    ]
  },
  {
    era: "any", emotion: "any",
    stanzas: [
      "the room remembers you",
      "even though\nyou have not been here",
      "the room is remembering\nforward"
    ]
  },
  {
    era: "any", emotion: "fear",
    stanzas: [
      "nothing is wrong.",
      "nothing is wrong.",
      "nothing is wrong\nis something the room\nkeeps saying."
    ]
  },
  {
    era: "any", emotion: "tenderness",
    stanzas: [
      "someone left a light on\nfor you",
      "in a house\nyou have not yet bought",
      "in a town\nyou have not yet driven through",
      "in a life you have not yet\nagreed to"
    ]
  },
  {
    era: "any", emotion: "grief",
    stanzas: [
      "i kept the smell\nof your coat",
      "in a closet\nin a house",
      "that no longer\nopens"
    ]
  },
  {
    era: "timeless", emotion: "longing",
    stanzas: [
      "the lake is exactly\nwhere i remember it",
      "the dock is exactly\nwhere i remember it",
      "i am the part\nof the memory\nthat is wrong"
    ]
  },
  {
    era: "any", emotion: "any",
    stanzas: [
      "the hour\nbetween\nthe hours",
      "what we call it\nwhen we do not\nwant to name it"
    ]
  },
  {
    era: "any", emotion: "peace",
    stanzas: [
      "nothing is happening",
      "and nothing is\ngoing to happen",
      "and this is the gift\nthe room is offering"
    ]
  },
  {
    era: "80s", emotion: "grief",
    stanzas: [
      "the wallpaper my mother chose\nin the year my mother chose it",
      "is now the wallpaper\nof a room that exists",
      "only in this kind of light"
    ]
  },
  {
    era: "any", emotion: "fear",
    stanzas: [
      "the building\nhas more hallways\nthan rooms",
      "i counted, once.",
      "i was wrong\nabout how to count."
    ]
  },
  {
    era: "any", emotion: "tenderness",
    stanzas: [
      "in the kitchen\nof a house\nwe never owned",
      "you are stirring something\nthat will be ready\nin a moment",
      "a moment lasts\na long time, here"
    ]
  },
  {
    era: "recent", emotion: "longing",
    stanzas: [
      "i scroll through\nthe photographs",
      "of a room\ni did not photograph",
      "and find them\nall"
    ]
  },
  {
    era: "timeless", emotion: "any",
    stanzas: [
      "behind the door\nis a hallway",
      "behind the hallway\nis a door",
      "behind the door\nis a hallway",
      "eventually you stop\nand rest"
    ]
  },
  {
    era: "any", emotion: "peace",
    stanzas: [
      "you are allowed\nto stay",
      "as long as\nyou do not ask",
      "why"
    ]
  },
  {
    era: "any", emotion: "grief",
    stanzas: [
      "i go to the room\nwhere i used to be small",
      "the room is gone",
      "but the air\nis still the right\ntemperature"
    ]
  },
  {
    era: "90s", emotion: "longing",
    stanzas: [
      "the answering machine\nis full",
      "of messages\nfrom people",
      "who no longer remember\nleaving them"
    ]
  },
  {
    era: "any", emotion: "any",
    stanzas: [
      "the light here\nis borrowed",
      "from where,\nit does not say"
    ]
  },
  {
    era: "any", emotion: "tenderness",
    stanzas: [
      "my grandmother\nis in the kitchen",
      "my grandmother\nis not in the kitchen",
      "both of these\nare true",
      "in this room\nat this hour"
    ]
  },
  {
    era: "any", emotion: "fear",
    stanzas: [
      "i waited in the lobby\nof a hospital",
      "that was not\nbuilt yet",
      "for the diagnosis\nof someone",
      "who would not be born\nfor several years",
      "i was prepared\nfor the news"
    ]
  },
  {
    era: "any", emotion: "peace",
    stanzas: [
      "the dust in the light",
      "is moving slowly enough\nto count",
      "each particle",
      "i will count them.\ni have time."
    ]
  },
  {
    era: "any", emotion: "grief",
    stanzas: [
      "i kept a list\nof things to tell you",
      "when i saw you\nagain",
      "i lost the list\nin the move",
      "to the place\nwhere i was going\nto see you again"
    ]
  },
  {
    era: "early2000s", emotion: "longing",
    stanzas: [
      "the mall closed\nfloor by floor",
      "the fountain remained\nfor a year after",
      "i threw a penny in\nfor every year",
      "i thought i had left"
    ]
  }
];

// Maps for tag detection.

export const COLOR_MAP = {
  yellow: "#d8c89c", red: "#b87878", blue: "#8898b0", green: "#9ab098",
  pink: "#d8b0b8", purple: "#a89cb0", orange: "#d4a888", white: "#e8e4dc",
  black: "#3a3530", grey: "#8c8780", gray: "#8c8780", brown: "#a89078",
  beige: "#d4c8a8", cream: "#e4d8c0", gold: "#c8a868", silver: "#b8b8c0",
  teal: "#88a8a8", navy: "#586878", maroon: "#80484c", olive: "#888460",
  rust: "#a87858", peach: "#dfb89c", lavender: "#b8a8c0", mint: "#a8c8b0",
  coral: "#d49088", mustard: "#b89858"
};

export const EMOTION_KEYWORDS = {
  grief: ["miss", "lost", "gone", "never", "died", "death", "passed", "sad", "lonely", "alone", "empty", "broken", "ache", "mourn"],
  longing: ["want", "wish", "home", "come back", "see you", "again", "remember", "used to", "before", "would have", "could have"],
  fear: ["scared", "afraid", "worry", "worried", "fear", "anxious", "panic", "wrong", "off", "can't", "cant"],
  tenderness: ["love", "loved", "dear", "sweet", "gentle", "hold", "soft", "kind", "warm", "care"],
  peace: ["okay", "ok", "fine", "good", "rest", "still", "quiet", "calm", "enough", "alright"]
};

export const ERA_PALETTES = {
  "80s": ["#d8c2a0", "#b8a888", "#c8a890", "#a89878"],
  "90s": ["#c8d0c8", "#b0b8b0", "#d0d8d0", "#a8b0a8"],
  "early2000s": ["#c8d8e0", "#a8b8c8", "#d8d0c0", "#b0c0d0"],
  "2010s": ["#d8d8d0", "#c0c0b8", "#b8c0c0", "#a8a8a0"],
  "recent": ["#e0d8d0", "#d0c8c0", "#c8c0b8", "#b8b0a8"],
  "timeless": ["#c8d6e5", "#d8c8a8", "#e8d4c0", "#b8c8d0"],
  "pre80s": ["#c8a888", "#b09078", "#d8b898", "#a07858"]
};

export const NAME_ADJECTIVES = [
  "unfinished", "half-remembered", "wrong", "long", "almost", "pale", "soft",
  "quiet", "closed", "forgotten", "wet", "cold", "flickering", "still", "empty",
  "low", "humming", "amber", "off-hour", "borrowed", "muted"
];

export const NAME_PLACES = [
  "hallway", "corridor", "room", "lobby", "kitchen", "staircase", "waiting room",
  "office", "attic", "basement", "hotel", "motel", "pool", "parking lot",
  "cafeteria", "library", "garage", "vestibule", "den", "front hall"
];
