export type Input = {
    url: string;
    customBackHalf: string;
    category: LinkCategory;
    campaignSource: string;
    campaignName: string;
    campaignMedium: string;
    campaignTerm: string;
}

export type LinkCategory = "general" | "marketing" | "personal" | "work" | "social";