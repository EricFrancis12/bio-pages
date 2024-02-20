import React from 'react';

export default function AuthForm({ type, error, action, disabled, children }: {
    type: 'register' | 'login' | 'reset password',
    error: string,
    action: ((formData: FormData) => void),
    disabled?: boolean,
    children?: React.ReactNode
}) {
    return (
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-violet-400 text-black'>
            <h1 className='text-xl font-bold my-4'>
                {type === 'login' ? 'Login' : type === 'register' ? 'Register' : type === 'reset password' ? 'Reset Password' : ''}
            </h1>
            <form action={action}
                className='flex flex-col gap-3'
            >
                {!disabled &&
                    <>
                        <input
                            className='px-2 py-1 border border-black rounded'
                            type='email'
                            name='email'
                            placeholder='Email'
                            required={true}
                        />
                        {(type === 'register' || type === 'login') &&
                            <input
                                className='px-2 py-1 border border-black rounded'
                                type='password'
                                name='password'
                                placeholder='Password'
                                required={true}
                            />
                        }
                        <button className='bg-violet-600 text-white font-bold cursor-pointer px-6 py-2'>
                            {type === 'login' ? 'Login' : type === 'register' ? 'Register' : type === 'reset password' ? 'Submit' : ''}
                        </button>
                    </>
                }
                {error &&
                    <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                }
                {children}
            </form>
        </div>
    )
}
