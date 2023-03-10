function updateMeters() {
	const meters = document.querySelectorAll('meter');
	
	const dailyMeter = meters[0];
	const weeklyMeter = meters[1];
	const monthlyMeter = meters[2];

	let goals = {daily: [], weekly: [], monthly: [], lastSevenDays: [[], [], []]};

	const goalsText = localStorage.getItem('goals');
	if (goalsText) {
		goals = JSON.parse(goalsText);
	}

	let dailyVal = 0;
	if (goals.daily.length) {
		for (i in goals.daily) {
			dailyVal += goals.daily[i][1];
		}
		dailyVal = dailyVal / goals.daily.length
	}
	dailyMeter.value = dailyVal;

	let weeklyVal = 0;
	if (goals.weekly.length) {
		for (i in goals.weekly) {
			weeklyVal += goals.weekly[i][1];
		}
		weeklyVal = weeklyVal / goals.weekly.length
	}
	weeklyMeter.value = weeklyVal;

	let monthlyVal = 0;
	if (goals.monthly.length) {
		for (i in goals.monthly) {
			monthlyVal += goals.monthly[i][1];
		}
		monthlyVal = monthlyVal / goals.monthly.length
	}
	monthlyMeter.value = monthlyVal;


}

updateMeters();