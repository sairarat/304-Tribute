// data.js — Static relational data file acting as the local asset repository
const TRIBUTE_DATA = {
  graduate: {
    name: "Sung Hanbin",
    nickname: "The Creative Soul",
    year: "2026",
    id: "CLASS-2026-91",
    chapter: "CHAPTER 18",
    birthday: "June 13, 2001",
    mbti: "ENFJ-A",
    enneagram: "Enneagram 4",
    classRank: "#03 / 450",
    club: "Music Ensemble",
    quote: "The best time to plant a tree was 20 years ago. The second best time is today. Class of 2026, let's bloom.",
    tagline: "Stay messy. Stay loud. Don't let the grid lines define your journey.",
    heroImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80",
    stats: [
      { label: "Credits Earned", value: "152" },
      { label: "Late Nights", value: "∞" },
      { label: "Lattes Consumed", value: "412" },
      { label: "GPA", value: "3.91" }
    ]
  },

  facts: [
    { id: 1, title: "The Fuel Source", text: "Consumed an estimated 412 lattes to survive senior finals week. The campus café has him on speed dial.", category: "lifestyle", icon: "coffee" },
    { id: 2, title: "Academic Triumph", text: "Successfully defended Capstone Thesis to a panel of 5 industry engineers — got a standing ovation.", category: "academic", icon: "school" },
    { id: 3, title: "Hidden Talent", text: "Can play 3 instruments (poorly). Guitar, piano, and ukulele. The ukulele is objectively the most dangerous.", category: "fun", icon: "music_note" },
    { id: 4, title: "Analog Obsession", text: "Owns 7 vintage film cameras. Has never once taken a digital photo he actually likes more than a film one.", category: "lifestyle", icon: "camera" },
    { id: 5, title: "Chef in Disguise", text: "Secretly a master chef specializing in cup ramen variations. The 'truffle flavor packet' era was a mistake.", category: "fun", icon: "ramen_dining" },
    { id: 6, title: "Vespa Restorer", text: "Spent an entire summer restoring a 1985 Vespa PX125. It now sits in the living room. Indoors. Permanently.", category: "fun", icon: "two_wheeler" },
    { id: 7, title: "Night Owl Champion", text: "Has submitted exactly zero assignments before 11:30 PM. Operates exclusively in the hours that polite society has abandoned.", category: "lifestyle", icon: "nightlight" },
    { id: 8, title: "Thesis Legend", text: "His senior thesis on 'Generative Design Systems' is now cited in two graduate papers. Not bad for someone who almost titled it 'Stuff I Like About Grids'.", category: "academic", icon: "auto_stories" },
    { id: 9, title: "Jazz Curator", text: "Has curated 23 Spotify playlists of Lofi Jazz. Each one named with suspicious specificity. ('3AM Coding With Regret Vol. 2')", category: "lifestyle", icon: "headphones" },
    { id: 10, title: "Notebook Hoarder", text: "Carries a notebook everywhere. Has 14 full ones in a box under his bed. Contents include: ideas, grocery lists, small drawings of clouds.", category: "fun", icon: "edit_note" }
  ],

  gallery: [
    { id: 101, src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80", caption: "Presenting the final software project to industry judges.", tag: "campus" },
    { id: 102, src: "https://images.unsplash.com/photo-1564579084-4db34751e6e7?w=600&q=80", caption: "Late nights in the design studio.", tag: "campus" },
    { id: 103, src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80", caption: "The crew after the final group project submission.", tag: "campus" },
    { id: 104, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", caption: "Graduation rehearsal — the real thing hits different.", tag: "campus" },
    { id: 105, src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80", caption: "Kindergarten orientation, Day 1 of the journey.", tag: "childhood" },
    { id: 106, src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80", caption: "Elementary school science fair — first place, obviously.", tag: "childhood" },
    { id: 107, src: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=600&q=80", caption: "Middle school talent show. The guitar solo is legendary.", tag: "childhood" },
    { id: 108, src: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=600&q=80", caption: "Weekend adventures with the camera and the Vespa.", tag: "campus" }
  ],

  messages: [
    { sender: "Aunt Sarah", relation: "Family", content: "So incredibly proud of your determination and heart! You've grown into someone extraordinary. The future is absolutely yours — go claim it!", avatar: "S" },
    { sender: "Prof. Marks", relation: "Faculty", content: "An exceptional analytical mind paired with genuine creative instinct. A rare combination. It has been an honor. Best of luck in industry — you'll reshape it.", avatar: "M" },
    { sender: "Jake & Mira", relation: "Friends", content: "From that first day in orientation to this — we can't believe how far we've all come. You kept us sane (mostly). The future crew will never know what hit them. We love you!!", avatar: "J" },
    { sender: "Mom & Dad", relation: "Family", content: "We watched you grow from a curious little kid who took apart every toy to understand it, into someone who builds entire worlds. Every late night, every latte — worth it. We are so proud.", avatar: "P" },
    { sender: "Kai Reyes", relation: "Classmate", content: "Bro. Four years. Remember when you accidentally submitted the wrong file and the professor laughed? And then gave you an A anyway because the wrong file was somehow better? That's you in a nutshell.", avatar: "K" },
    { sender: "Dean Rivera", relation: "Faculty", content: "Hanbin's contributions to the department extended far beyond coursework. His leadership in the design sprint workshops shaped the experience for dozens of students. We're proud to have seen him grow here.", avatar: "D" },
    { sender: "Lena & the Dorm 4 Crew", relation: "Friends", content: "Room 412 forever!! The ramen experiments, the 2AM fire alarm that was definitely your fault (we know), the playlist that played for 6 months straight. Best years. Best people. Go be amazing.", avatar: "L" },
    { sender: "Grandma Rosa", relation: "Family", content: "My darling, you were always special. Even as a child you saw the world differently — with wonder and with kindness. I have kept every report card. I will keep your diploma too. ❤️", avatar: "G" }
  ]
};