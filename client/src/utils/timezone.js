function TimezoneDisplay() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
    const date = new Date();
    const offset = -date.getTimezoneOffset(); // in minutes
    const sign = offset >= 0 ? "+" : "-";
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
  
    // Manually add leading zero if needed
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  
    const offsetFormatted = `UTC${sign}${formattedHours}:${formattedMinutes}`;
  
    return `Timezone: ${timeZone} ${offsetFormatted}`;
  }
export default TimezoneDisplay;
