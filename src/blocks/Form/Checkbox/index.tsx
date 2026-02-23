import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { useFormContext } from 'react-hook-form'

import React from 'react'
import { Checkbox as MantineCheckbox, Text } from '@mantine/core'

import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const props = register(name, { required: required })
  const { setValue, watch } = useFormContext()

  const checked = watch(name)
  const error = errors[name]?.message as string

  return (
    <Width width={width}>
      <MantineCheckbox
        id={name}
        checked={checked} // Use watched value for controlled state
        onChange={(event) => { // Mantine's onChange provides event
          setValue(name, event.currentTarget.checked);
        }}
        label={
          <>
            {label}
            {required && (
              <Text component="span" c="red" ml={4}>*</Text> // Mantine's way to indicate required
            )}
          </>
        }
        error={!!error} // Mantine's Checkbox takes a boolean for error state
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
