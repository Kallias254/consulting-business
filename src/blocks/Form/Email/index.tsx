import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'
import { TextInput, InputWrapper, Text } from '@mantine/core'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
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
        <TextInput
          defaultValue={defaultValue}
          id={name}
          type="email" // Use type="email" for browser validation
          {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
          error={!!error} // Mantine's TextInput takes a boolean for error state
        />
      </InputWrapper>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
