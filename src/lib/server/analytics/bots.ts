const BOT_UA =
	/bot|crawler|spider|crawling|preview|slurp|facebookexternalhit|whatsapp|telegram|discordbot|linkedinbot|embedly|quora|pinterest|redditbot|applebot|semrush|ahrefs|dotbot|mj12bot|bytespider|gptbot|claudebot|amazonbot|ia_archiver|pingdom|uptime|headlesschrome|phantomjs|wget|curl\//i;

export function isPageviewBot(userAgent: string | null): boolean {
	if (!userAgent) {
		return false;
	}

	return BOT_UA.test(userAgent);
}
