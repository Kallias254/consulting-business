import type { SelectField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import React from 'react'
import { Controller } from 'react-hook-form'
import { Select as MantineSelect, InputWrapper, Text } from '@mantine/core'

import { Error } from '../Error'
import { Width } from '../Width'

export const Select: React.FC<
  SelectField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  }
> = ({ name, control, errors, label, options, required, width, defaultValue }) => {
  const error = errors[name]?.message as string

  // Mantine's Select expects data in { value: string; label: string; }[] format
  // PayloadCMS SelectField options are already in this format.
  const mantineSelectData = options.map(option => ({
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
          defaultValue={defaultValue} // Pass defaultValue from PayloadCMS
          rules={{ required }}
          render={({ field }) => (
            <MantineSelect
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
