const today = new Date();
let day_number = Math.floor((today - (new Date(2023, 0, 0))) / (1000 * 60 * 60 * 24));
const week_number = Math.floor(day_number / 7);
const month_number = ((today.getFullYear() - 2023) * 12) + today.getMonth() + 1;


function loadGoals() {
  let goals = {daily: [], weekly: [], monthly: [], lastSevenDays: [[], [], []]};
  const goalsText = localStorage.getItem('goals');
  
  if (goalsText) {
    goals = JSON.parse(goalsText);
  }

  if (!goals.lastSevenDays) {
    goals.lastSevenDays = [[], [], []]
  }
  
  // LOAD DAILY GOALS
  const dailyListEl = document.querySelector(`#daily-goals`);
  
  if (goals.daily.length) {
    for (const i in goals.daily) {
      const [goal] = goals.daily[i];
      const checkboxEl = document.createElement('input');
      const labelEl = document.createElement('label');
      const streakEl = document.createElement('p');
      
      checkboxEl.type = "checkbox";
      if (goals.daily[i][3] === true) {
        checkboxEl.checked = true
      }

      // UPDATE STREAK EACH DAY
      if (goals.daily[i][4] === day_number - 1) {
        // If the streak was last updated yesterday
        if (!checkboxEl.checked) {
          goals.daily[i][1] = 0;
          goals.lastSevenDays[0].push(0);
        } else {
          goals.lastSevenDays[0].push(1);
        }
        goals.daily[i][4] = day_number;
        checkboxEl.checked = false;
      } else if (goals.daily[i][4] < day_number - 1) {
        // If the streak was last updated more than 1 day ago, reset to 0
        let diff = day_number - goals.daily[i][4];
        while (diff > 0) {
          goals.lastSevenDays[0].push(0);
          diff--;
        }
        goals.daily[i][1] = 0;
        checkboxEl.checked = false;
        goals.daily[i][4] = day_number;
      }

      while (goals.lastSevenDays[0].length > (7 * goals.daily.length)) {
        goals.lastSevenDays[0].shift();
      }

      checkboxEl.style.marginRight = "5px";
      checkboxEl.addEventListener('change', function () {
        if (this.checked) {
          goals.daily[i][1]++;
          goals.daily[i][3] = true;
          updateJSON(goals);
        } else {
          goals.daily[i][1]--;
          goals.daily[i][3] = false;
          updateJSON(goals);
        }
      });

      labelEl.textContent = goal;
      streakEl.classList.add('streak');
      streakEl.textContent = `🔥 ${goals.daily[i][1]} days`;
      
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
    for (const i in goals.weekly) {
      const [goal] = goals.weekly[i];
      const checkboxEl = document.createElement('input');
      const labelEl = document.createElement('label');
      const streakEl = document.createElement('p');
      
      checkboxEl.type = "checkbox";
      if (goals.weekly[i][3] === true) {
        checkboxEl.checked = true
      }

      // UPDATE STREAK EACH WEEK
      if (goals.weekly[i][4] === week_number - 1) {
        // If the streak was last updated yesterday
        if (!checkboxEl.checked) {
          goals.weekly[i][1] = 0;
        }
        goals.weekly[i][4] = week_number;
        checkboxEl.checked = false;
      } else if (goals.weekly[i][4] < week_number - 1) {
        // If the streak was last updated more than 1 week ago, reset to 0
        goals.weekly[i][1] = 0;
        checkboxEl.checked = false;
        goals.weekly[i][4] = week_number;
      }

      checkboxEl.style.marginRight = "5px";
      checkboxEl.addEventListener('change', function () {
        if (this.checked) {
          goals.weekly[i][1]++;
          goals.weekly[i][3] = true;
          updateJSON(goals);
        } else {
          goals.weekly[i][1]--;
          goals.weekly[i][3] = false;
          updateJSON(goals);
        }
      });

      labelEl.textContent = goal;
      streakEl.classList.add('streak');
      streakEl.textContent = `🔥 ${goals.weekly[i][1]} weeks`;
      
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
    for (const i in goals.monthly) {
      const [goal] = goals.monthly[i];
      const checkboxEl = document.createElement('input');
      const labelEl = document.createElement('label');
      const streakEl = document.createElement('p');
      
      checkboxEl.type = "checkbox";
      if (goals.monthly[i][3] === true) {
        checkboxEl.checked = true
      }

      // UPDATE STREAK EACH MONTH
      if (goals.monthly[i][4] === month_number - 1) {
        // If the streak was last updated yesterday
        if (!checkboxEl.checked) {
          goals.monthly[i][1] = 0;
        }
        goals.monthly[i][4] = month_number;
        checkboxEl.checked = false;
      } else if (goals.monthly[i][4] < month_number - 1) {
        // If the streak was last updated more than 1 day ago, reset to 0
        goals.monthly[i][1] = 0;
        checkboxEl.checked = false;
        goals.monthly[i][4] = month_number;
      }

      checkboxEl.style.marginRight = "5px";
      checkboxEl.addEventListener('change', function () {
        if (this.checked) {
          goals.monthly[i][1]++;
          goals.monthly[i][3] = true;
          updateJSON(goals);
        } else {
          goals.monthly[i][1]--;
          goals.monthly[i][3] = false;
          updateJSON(goals);
        }
      });

      labelEl.textContent = goal;
      streakEl.classList.add('streak');
      streakEl.textContent = `🔥 ${goals.monthly[i][1]} months`;
      
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

// Do this everytime the webiste loads
loadGoals();


// Function to update JSON
function updateJSON(goals) {
  console.log('Running updateJSON()');
  localStorage.setItem('goals', JSON.stringify(goals));
}

// Do this when a new goal is saved
function uploadGoal(section) {

  const newGoalEl = document.querySelector(`#new-${section}`);
  const newGoal = newGoalEl.value;
  newGoalEl.value = '';

  const radioEl = document.querySelector(`input[name="${section}-privacy"]:checked`)
  const privacyVal = radioEl.value;
  console.log(`Selected privacy value is ${privacyVal}`)

  if (!newGoal) {
    return
  }

  let goals = {daily: [], weekly: [], monthly: []};
  const goalsText = localStorage.getItem('goals');
  
  if (goalsText) {
    goals = JSON.parse(goalsText);
  }

  if (section == 'daily') {
    goals.daily.push([newGoal, 0, privacyVal, false, day_number]);
  } else if (section == 'weekly') {
    goals.weekly.push([newGoal, 0, privacyVal, false, week_number]);
  } else if (section == 'monthly') {
    goals.monthly.push([newGoal, 0, privacyVal, false, month_number]);
  }

  localStorage.setItem('goals', JSON.stringify(goals));

  reloadGoals();
}

function reloadGoals() {
  const dailyListEl = document.querySelector(`#daily-goals`);
  while (dailyListEl.firstChild) {
    dailyListEl.removeChild(dailyListEl.firstChild);
  }

  const weeklyListEl = document.querySelector(`#weekly-goals`);
  while (weeklyListEl.firstChild) {
    weeklyListEl.removeChild(weeklyListEl.firstChild);
  }

  const monthlyListEl = document.querySelector(`#monthly-goals`);
  while (monthlyListEl.firstChild) {
    monthlyListEl.removeChild(monthlyListEl.firstChild);
  }

  loadGoals();
}

function clearInput(section) {
  const newGoalEl = document.querySelector(`#new-${section}`);
  newGoalEl.value = '';

  const privacyEls = document.querySelectorAll(`input[name="${section}-privacy"]`)
  for (el of privacyEls) {
    if (el.value === 'public') {
      el.checked = true;
    }
  }
}




// localStorage.goals has the following format

//       goals = {
//         'daily': [[goal, streak, private/public, completed, last updated], [goal, streak, private/public, completed, last updated]],
//         'weekly': [[goal, streak, private/public, completed, last updated], [goal, streak, private/public, completed. last updated]], 
//         'monthly': [[goal, streak, private/public, completed, last updated], [goal, streak, private/public, completed, last updated]]
//         'lastSevenDays': [[1, 0, 1, 1, 1, 0, 1], [1, 0, 1, 0, 0, 1, 1], [1, 0, 1, 1, 1, 1, 1]]
//       } 


