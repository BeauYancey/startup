function loadGoals() {
  let goals = {daily: [], weekly: [], monthly: []};
  const goalsText = localStorage.getItem('goals');
  
  if (goalsText) {
    goals = JSON.parse(goalsText);
  }
  
  // Uncomment the following line for testing
  // goals = {'daily': [['eat', 4], ['pray', 6], ['sleep', 3]], 'weekly': [['church', 6], ['temple', 1]], 'monthly': [['budget', 2]]};
  
  // LOAD DAILY GOALS
  const dailyListEl = document.querySelector(`#daily-goals`);
  
  if (goals.daily.length) {
    for (const [goal, streak] of goals.daily) {
      const checkboxEl = document.createElement('input');
      const labelEl = document.createElement('label');
      const streakEl = document.createElement('p');
      
      checkboxEl.type = "checkbox";
      labelEl.textContent = goal;
      streakEl.classList.add('streak');
      streakEl.textContent = `🔥 ${streak} days`;
      
      const goalDivEl = document.createElement('div');
      goalDivEl.classList.add('goal');
      goalDivEl.classList.add('private');
      goalDivEl.appendChild(checkboxEl);
      goalDivEl.appendChild(labelEl);
      goalDivEl.appendChild(streakEl);

      dailyListEl.appendChild(goalDivEl);
    }
  } else {
    dailyListEl.innerHTML = '<div class=goal private><label>Add a goal to get started</label></div>';
  }

  // LOAD WEEKLY GOALS
  const weeklyListEl = document.querySelector(`#weekly-goals`);
  
  if (goals.weekly.length) {
    for (const [goal, streak] of goals.weekly) {
      const checkboxEl = document.createElement('input');
      const labelEl = document.createElement('label');
      const streakEl = document.createElement('p');
      
      checkboxEl.type = "checkbox";
      labelEl.textContent = goal;
      streakEl.classList.add('streak');
      streakEl.textContent = `🔥 ${streak} weeks`;
      
      const goalDivEl = document.createElement('div');
      goalDivEl.classList.add('goal');
      goalDivEl.classList.add('private');
      goalDivEl.appendChild(checkboxEl);
      goalDivEl.appendChild(labelEl);
      goalDivEl.appendChild(streakEl);

      weeklyListEl.appendChild(goalDivEl);

    }
  } else {
    weeklyListEl.innerHTML = '<div class=goal private><label>Add a goal to get started</label></div>';
  }


  // LOAD MONTHLY GOALS
  const monthlyListEl = document.querySelector(`#monthly-goals`);
  
  if (goals.monthly.length) {
    for (const [goal, streak] of goals.monthly) {
      const checkboxEl = document.createElement('input');
      const labelEl = document.createElement('label');
      const streakEl = document.createElement('p');
      
      checkboxEl.type = "checkbox";
      labelEl.textContent = goal;
      streakEl.classList.add('streak');
      streakEl.textContent = `🔥 ${streak} months`;
      
      const goalDivEl = document.createElement('div');
      goalDivEl.classList.add('goal');
      goalDivEl.classList.add('private');
      goalDivEl.appendChild(checkboxEl);
      goalDivEl.appendChild(labelEl);
      goalDivEl.appendChild(streakEl);

      monthlyListEl.appendChild(goalDivEl);
    }
  } else {
    monthlyListEl.innerHTML = '<div class=goal private><label>Add a goal to get started</label></div>';
  }

}

loadGoals();