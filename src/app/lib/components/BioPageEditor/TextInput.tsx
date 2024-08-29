

const TEXTAREA_CLASSNAME = 'w-full px-1 bg-white border border-gray-400 rounded-md';

export default function TextInput({ type, text, value, onChange }: {
    type: 'input' | 'textarea',
    text: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
}) {
    return (
        <div
            className='flex flex-col justify-start items-start w-full p-2 bg-gray-300'
            style={{ borderRadius: '8px' }}
        >
            <div>
                <span className='text-sm'>
                    {text}
                </span>
            </div>
            <div className='w-full'>
                {type === 'textarea'
                    ? <textarea
                        className={TEXTAREA_CLASSNAME}
                        value={value}
                        onChange={onChange}
                    />
                    : <input
                        className={TEXTAREA_CLASSNAME}
                        value={value}
                        onChange={onChange}
                    />
                }
            </div>
        </div >
    )
}
