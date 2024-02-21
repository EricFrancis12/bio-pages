

export default function AuthForm({ type, error, action, passwordresettoken, disabled, children }: {
    type: 'register' | 'login' | 'reset password' | 'enter new password',
    error: string,
    action: ((formData: FormData) => void),
    passwordresettoken?: string,
    disabled?: boolean,
    children?: React.ReactNode
}) {
    const inputClassName = 'px-2 py-1 border border-black rounded';
    return (
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-violet-400 text-black'>
            <h1 className='text-xl font-bold my-4'>
                {type === 'login' ? 'Login'
                    : type === 'register' ? 'Register'
                        : type === 'reset password' ? 'Reset Password'
                            : type === 'enter new password' ? 'Enter New Password'
                                : ''
                }
            </h1>
            <form action={action}
                className='flex flex-col gap-3'
            >
                {type !== 'enter new password' &&
                    <input
                        className={inputClassName}
                        type='email'
                        name='email'
                        placeholder='Email'
                        required={true}
                        disabled={disabled}
                    />
                }
                {type !== 'reset password' &&
                    <input
                        className={inputClassName}
                        type='password'
                        name='password'
                        placeholder='Password'
                        required={true}
                        disabled={disabled}
                    />
                }
                {type === 'enter new password' &&
                    <>
                        <input
                            className={inputClassName}
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            required={true}
                            disabled={disabled}
                        />
                        {passwordresettoken &&
                            <input
                                className={inputClassName}
                                type='text'
                                name='passwordresettoken'
                                value={passwordresettoken}
                                hidden={true}
                            />
                        }
                    </>
                }
                <button
                    className='bg-violet-600 text-white font-bold cursor-pointer px-6 py-2'
                    disabled={disabled}
                >
                    {type === 'login' ? 'Login'
                        : type === 'register' ? 'Register'
                            : type === 'reset password' ? 'Submit'
                                : type === 'enter new password' ? 'Submit'
                                    : ''
                    }
                </button>
                {error &&
                    <div className='flex justify-center text-white w-full text-sm mt-2'>
                        <div className='max-w-[200px] px-3 py-1 bg-red-500 rounded-md'>
                            {error}
                        </div>
                    </div>
                }
                {children}
            </form>
        </div >
    )
}
