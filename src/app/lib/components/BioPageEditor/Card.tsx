

export default function Card({ title, children }: {
    title: string,
    children?: React.ReactNode
}) {
    return (
        <div className='mb-8'>
            <div className='mb-1'>
                <span>
                    {title}
                </span>
            </div>
            <div className='flex flex-col justify-start items-center gap-4 px-3 py-6 bg-white'
                style={{ borderRadius: '8px' }}
            >
                {children}
            </div>
        </div>
    )
}
