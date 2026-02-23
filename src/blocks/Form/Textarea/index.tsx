import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'
import { Textarea as MantineTextarea, InputWrapper, Text } from '@mantine/core'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 3, width }) => {
  const error = errors[name]?.message as string

  return (
    <Width width={width}>
      <InputWrapper
        label={
          <>
            {label}
            {required && (
              <Text component="span" c="red" ml={4}>*</Text> // Mantine's way to indicate required
            )}
          </>
        }
        error={error}
        id={name}
        required={required}
      >
        <MantineTextarea
          defaultValue={defaultValue}
          id={name}
          rows={rows}
          {...register(name, { required: required })}
          error={!!error} // Mantine's Textarea takes a boolean for error state
        />
      </InputWrapper>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}

