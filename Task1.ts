interface UserSession {
    userId: string;
    loggedIn: Date;
    loggedOut: Date | null;
    lastSeenAt: Date;
}

function getActiveUsersForMonth(sessions: UserSession[], year: number, month: number): Set<string> {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);
    const activeUsers = new Set<string>();

    sessions.forEach(session => {
        const loggedIn = new Date(session.loggedIn);
        const loggedOut = session.loggedOut ? new Date(session.loggedOut) : null;
        const lastSeenAt = new Date(session.lastSeenAt);

        // Check if the session overlaps with the month in question
        if (
            (loggedIn <= endOfMonth && (!loggedOut || loggedOut >= startOfMonth)) ||
            (lastSeenAt >= startOfMonth && lastSeenAt <= endOfMonth)
        ) {
            activeUsers.add(session.userId);
        }
    });

    return activeUsers;
}
