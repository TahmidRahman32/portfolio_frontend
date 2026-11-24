const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDashboardDate(updatedAt: string, renderedAt: string): string {
   const updatedTimestamp = Date.parse(updatedAt);
   const referenceTimestamp = Date.parse(renderedAt);
   if (!Number.isFinite(updatedTimestamp) || !Number.isFinite(referenceTimestamp)) return "recently";

   const diffMs = Math.max(0, referenceTimestamp - updatedTimestamp);
   const diffHours = Math.floor(diffMs / 3600000);
   const diffDays = Math.floor(diffMs / 86400000);

   if (diffHours < 24) return `${diffHours}h ago`;
   if (diffDays < 7) return `${diffDays}d ago`;

   const date = new Date(updatedTimestamp);
   return `${monthLabels[date.getUTCMonth()]} ${date.getUTCDate()}`;
}
