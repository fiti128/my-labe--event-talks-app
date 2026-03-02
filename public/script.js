document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule');
  const searchInput = document.getElementById('search');
  let talks = [];

  fetch('talks.json')
    .then(response => response.json())
    .then(data => {
      talks = data;
      renderSchedule(talks);
    });

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTalks = talks.filter(talk =>
      talk.categories.some(category =>
        category.toLowerCase().includes(searchTerm)
      )
    );
    renderSchedule(filteredTalks);
  });

  function renderSchedule(talksToRender) {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date('2026-01-01T10:00:00');

    const formatTime = (date) => {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const addMinutes = (date, minutes) => {
      return new Date(date.getTime() + minutes * 60000);
    };

    const talksToShow = talks.filter(talk => talksToRender.includes(talk));

    let talkCounter = 0;
    for (let i = 0; i < 6 && talkCounter < talksToShow.length; i++) {
        const talk = talks[i];

        if (talksToRender.find(t => t.title === talk.title)) {
            const startTime = new Date(currentTime);
            const endTime = addMinutes(startTime, 60);

            const scheduleItem = document.createElement('div');
            scheduleItem.classList.add('schedule-item');

            scheduleItem.innerHTML = `
                <div class="time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
                <div class="details">
                <h2>${talk.title}</h2>
                <p class="speakers">${talk.speakers.join(', ')}</p>
                <p>${talk.description}</p>
                <div class="categories">
                    ${talk.categories.map(category => `<span class="category">${category}</span>`).join('')}
                </div>
                </div>
            `;
            scheduleContainer.appendChild(scheduleItem);
            currentTime = addMinutes(endTime, 10);
        }

      if (i === 2) { // Lunch break after the 3rd talk
        const breakStartTime = new Date(currentTime);
        const breakEndTime = addMinutes(breakStartTime, 60);
        const breakItem = document.createElement('div');
        breakItem.classList.add('schedule-item', 'break');
        breakItem.innerHTML = `
          <div class="time">${formatTime(breakStartTime)} - ${formatTime(breakEndTime)}</div>
          <div class="details">Lunch Break</div>
        `;
        scheduleContainer.appendChild(breakItem);
        currentTime = breakEndTime;
      }
      talkCounter++;
    }
  }
});
