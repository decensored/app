import React, { FunctionComponent } from 'react'

const buttonClasses = {
  spacings: 'py-2 px-3',
  text: 'font-medium',
  textColor: 'text-white ',
  style: 'rounded cursor-pointer bg-decensored-900 hover:bg-purple-800',
}

const Form: FunctionComponent = () => (
  <div
    id='input'
    className='container mx-auto max-w-md bg-white dark:bg-gray-900 rounded
      shadow-sm divide-y divide-solid divide-gray-200
      dark:divide-gray-800 sticky -top-28'
  >
    <div className='p-4 relative'>
      <textarea
        placeholder='Your story starts here'
        className='form-input bg-transparent rounded w-full border-none
          outline-none p-0 h-20 resize-none'
      />
      <div
        id='message-count'
        className='absolute right-4 bottom-4 py-1 px-2 text-xs text-gray-400
          rounded-full bg-white dark:bg-black
          empty:hidden font-mono leading-none'
      />
    </div>
    <div
      id='spread-bar'
      className='p-5 flex justify-between items-center gap-x-2'
    >
      <div>
        <img
          src='/logo/logotype.svg'
          alt='Decensored Logo'
          className='max-h-[20px]'
        />
      </div>
      <div>
        <button
          type='button'
          id='submit'
          className={`
            ${buttonClasses.spacings}
            ${buttonClasses.text}
            ${buttonClasses.textColor}
            ${buttonClasses.style}
        `}
        >
          <span className='whitespace-nowrap'>Spread it</span>
        </button>
        <button
          type='button'
          id='to-top'
          className={`
            hidden
            ${buttonClasses.spacings}
            ${buttonClasses.text}
            ${buttonClasses.textColor}
            ${buttonClasses.style}
        `}
        >
          Back to top
        </button>
      </div>
    </div>
  </div>
)

export default Form
