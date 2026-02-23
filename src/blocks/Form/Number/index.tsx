import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import React from 'react'
import { Controller } from 'react-hook-form'
import { NumberInput, InputWrapper, Text } from '@mantine/core'

import { Error } from '../Error'
import { Width } from '../Width'
export const Number: React.FC<
  TextField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  }
> = ({ name, defaultValue, errors, label, control, required, width }) => {
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
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          rules={{ required }}
          render={({ field }) => (
            <NumberInput
              {...field}
              id={name}
              error={!!error}
            />
          )}
        />
      </InputWrapper>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}

