class DailyQuotes {
    constructor() {
      this.quoteList = [
        "Take small steps toward your big goals.",
        "Don't forget to celebrate your successes!",
        "Be kind to yourself—you're doing great.",
        "Make time for the things that bring you joy.",
        "Start your day with a positive thought.",
        "Chip away, day by day.",
        "Progress not perfection.",
        "Don't let perfect be the enemy of good.",
        "Those who dream the biggest, do the most incredible things.",
        "If you can dream it, you can do it.",
        "You do not yield.",
        "You are capable of amazing things, never doubt your inner strength.",
        "Your direction is more important than your speed.",
        "Everyday may not be good, but there is something good in every day.",
        "Focus on the things that you can control.",
        "You will get there, but right now you are here."
      ];
    }
  
    getQuoteForDate(dateString) {
      // Generate quote based on the date
      const dateHash = dateString.split('-').reduce((acc, part) => acc + parseInt(part, 10), 0);
      const index = dateHash % this.quoteList.length;
      return this.quoteList[index];
    }
  }
  
  export default new DailyQuotes();
  