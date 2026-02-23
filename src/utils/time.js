export function timeAgo(dateString) {
    const diffMs = Date.now() - new Date(dateString).getTime();

    const hourMs = 1000 * 60 * 60;
    const dayMs = hourMs * 24;
    const yearMs = dayMs * 365;

    if (diffMs < hourMs) return "now";

    const years = Math.floor(diffMs / yearMs);
    if (years >= 1) return years === 1 ? "1y" : `${years}y`;

    const days = Math.floor(diffMs / dayMs);
    if (days >= 1) return days === 1 ? "1d" : `${days}d`;

    const hours = Math.floor(diffMs / hourMs);
    return hours === 1 ? "1h" : `${hours}h`;
}
