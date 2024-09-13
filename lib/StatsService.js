class StatsService {
	calculateDuration(session) {
		const start = new Date(session.startDateTime);
		const end = new Date(session.endDateTime);
		const totalMilliseconds = end - start;
		const roundedMinutes = Math.floor(totalMilliseconds / 60000);
		return roundedMinutes;
	}

	calculateTotalTimeSpent(sessions) {
		let totalMinutes = 0;
		sessions.map(
			(session) => (totalMinutes += this.calculateDuration(session))
		);

		return totalMinutes;
	}

	calculateAverageSessionDuration(sessions) {
		const totalTimeSpent = this.calculateTotalTimeSpent(sessions);
		return totalTimeSpent / sessions.length; // Average in minutes
	}

	addDuration(sessions) {
		sessions.forEach((session) => {
			return (session.durationInMinutes =
				this.calculateDuration(session));
		});
	}

	generateAllStats(sessions) {
		this.addDuration(sessions);
		const stats = {
			totalTimeSpentInMinutes: this.calculateTotalTimeSpent(sessions),
			averageTimeSpentInMinutes:
				this.calculateAverageSessionDuration(sessions),
		};
		sessions.push({ stats });

		return sessions;
	}
}

module.exports = { StatsService };
