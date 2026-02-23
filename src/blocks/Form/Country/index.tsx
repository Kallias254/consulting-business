import type { CountryField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import React from 'react'
import { Controller } from 'react-hook-form'
import { Select, InputWrapper, Text } from '@mantine/core'

import { Error } from '../Error'
import { Width } from '../Width'
import { countryOptions } from './options'

export const Country: React.FC<
  CountryField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  }
> = ({ name, control, errors, label, required, width }) => {
  const error = errors[name]?.message as string

  // Mantine's Select expects data in { value: string; label: string; }[] format
  const mantineSelectData = countryOptions.map(option => ({
    value: option.value,
    label: option.label
  }));

  return (
    <Width width={width}>
      <InputWrapper
        label={
          <>
            {label}
            {required && (
              <Text component="span" c="red" ml={4}>*</Text>
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
          rules={{ required }}
          render={({ field }) => (
            <Select
              {...field}
              id={name}
              placeholder={label}
              data={mantineSelectData}
              error={!!error}
              searchable
            />
          )}
        />
      </InputWrapper>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
