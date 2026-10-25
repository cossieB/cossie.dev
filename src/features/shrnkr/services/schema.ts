import * as v from 'valibot';

export const LinkCategorySchema = v.union([
    v.literal('general'),
    v.literal('marketing'),
    v.literal('personal'),
    v.literal('work'),
    v.literal('social-media'),
]);

export type LinkCategory = v.InferOutput<typeof LinkCategorySchema>;

export const InputSchema = v.object({
    url: v.pipe(v.string(), v.url()),
    customBackHalf: v.optional(
        v.union([
            v.pipe(v.string(), v.length(0)),
            v.pipe(
                v.string(),
                v.minLength(5),
                v.regex(/^\w[\w-]+$/, "Custom back-half must be alphanumeric only.")
            ),
        ])
    ),
    category: LinkCategorySchema,
    campaignSource: v.optional(v.string()),
    campaignName: v.optional(v.string()),
    campaignMedium: v.optional(v.string()),
    campaignTerm: v.optional(v.string()),
    /** in ms */
    expiry: v.nullish(
        v.pipe(
            v.number(),
            v.integer()
        )
    )
});

export type Input = v.InferOutput<typeof InputSchema>;

export const GetLinksSchema = v.object({
    ownedLinksOnly: v.fallback(v.boolean(), false),
    category: v.fallback(v.optional(LinkCategorySchema), undefined),
    page: v.fallback(v.pipe(v.number(), v.integer(), v.minValue(0)), 0)
})

export type Filter = v.InferOutput<typeof GetLinksSchema>