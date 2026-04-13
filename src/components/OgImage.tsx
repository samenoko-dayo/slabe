type Props = {
    title: string,
    description?: string,
    date?: string,
    tags?: string[]
}

export const OgImage = ({ title, description, date, tags = [] }: Props) => (
    <div className="w-full h-screen flex flex-col bg-white justify-start text-slate-900 p-16 relative" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
        <div className="flex flex-col">
            {date && (
                <p className="text-xl font-medium text-slate-700">{date}</p>
            )}
            <h1 className="font-bold text-6xl text-slate-900 tracking-tight" style={{ textOverflow: "ellipsis", lineClamp: 3, wordBreak: "keep-all" }}>
                {title}
            </h1>
            {description && (
                <p className="text-3xl font-medium text-slate-700 tracking-tight" style={{ textOverflow: "ellipsis", lineClamp: 2, wordBreak: "keep-all" }}>{description}</p>
            )}
            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                    {tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center px-3 py-1 rounded-sm bg-slate-100 text-lg font-medium text-slate-700">
                            # {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    </div>
)