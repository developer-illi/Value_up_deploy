import { Form, useActionData, useNavigation } from 'react-router'

import Logo from '~/assets/logo.svg?react'

interface ActionData {
  error?: string
}

export default function Page() {
  const navigation = useNavigation()
  const actionData = useActionData<ActionData>()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <div className='bg-accent flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Logo className='mx-auto h-16 w-auto invert-100' />
        <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-white'>Sign in to your account</h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Form method='POST' action='/api/auth' className='space-y-6'>
          {actionData?.error && <div className='rounded-md bg-red-500/10 p-3 text-center text-sm text-red-400'>{actionData.error}</div>}

          <div>
            <label htmlFor='email' className='block text-sm/6 font-medium text-gray-100'>
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                // type='email'
                name='email'
                required
                autoComplete='email'
                disabled={isSubmitting}
                className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 disabled:opacity-50 sm:text-sm/6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='password' className='block text-sm/6 font-medium text-gray-100'>
                Password
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='password'
                type='password'
                name='password'
                required
                autoComplete='current-password'
                disabled={isSubmitting}
                className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 disabled:opacity-50 sm:text-sm/6'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={isSubmitting}
              className='hover:bg-primary flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50'
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}
