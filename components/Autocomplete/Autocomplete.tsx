import React from 'react'
import Select, { components, MultiValue, SingleValue } from 'react-select'
import Icon from 'components/Icons/Icon'
import noop from 'lodash/noop'
import { style } from 'styles/style'

export type Option = {
  value: number
  label: string
}

interface AutocompleteProps {
  value?: Option[]
  defaultValue?: Option[]
  options: Option[]
  onChange: (newValue: Option | undefined) => void
  icon?: string
  autoFocus?: boolean
  blurInputOnSelect?: boolean
  menuPlacement?: 'bottom' | 'auto' | 'top'
  maxMenuHeight?: number
  className?: string
}

interface IconProps {
  icon?: string | undefined
}

const InputIcon = ({ icon }: IconProps) => {
  if (!icon) {
    return null
  }
  return (
    <span className='autocompleteIcon flex w-[30px] items-center justify-end'>
      <Icon icon={icon} className={style.navigationAsideButtonIcon} isFixed />
    </span>
  )
}

const Autocomplete = React.forwardRef<any, AutocompleteProps>(
  (
    {
      value,
      options,
      icon,
      onChange = noop,
      autoFocus = false,
      blurInputOnSelect = true,
      className,
      ...remainingProps
    },
    ref
  ) => {
    const handleChange = (newValue: SingleValue<Option> | MultiValue<Option>) => onChange(newValue as Option)

    const Control = ({ children, ...props }: any) => (
      <components.Control {...props}>
        <InputIcon icon={icon} /> {children}
      </components.Control>
    )

    return (
      <Select
        options={options}
        className={className}
        classNamePrefix='react-select'
        value={value}
        onChange={handleChange}
        autoFocus={autoFocus}
        blurInputOnSelect={blurInputOnSelect}
        components={{ Control }}
        ref={ref}
        {...remainingProps}
      />
    )
  }
)

export default Autocomplete
