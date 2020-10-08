import React, {Suspense} from 'react'

import styled from '@emotion/styled'
import {Input, Label, Select} from '@rebass/forms'
import css from '@styled-system/css'
import produce from 'immer'
import {useForm} from 'react-hook-form'
import useSWR, {mutate} from 'swr'
import {v4 as uuid} from 'uuid'

import Spinner from '../App/spinner'
import useFetch from '../App/useFetch'
import {Button, Card} from '../Primitives'

const SpawnEnvironment = ({setFold}) => {
  const {data} = useSWR('/plans')
  const [doFetch] = useFetch()
  const {register, handleSubmit} = useForm()

  const spawn = async formData => {
    const payload = {
      planId: parseInt(formData.flavour),
      name: formData.name,
      description: formData.description,
    }
    mutate(
      '/account/instances',
      produce(draft => {
        const indexOfFlavour = data.findIndex(
          flv => flv.id === parseInt(formData.flavour)
        )
        draft.push({
          ...payload,
          id: uuid(),
          plan: {name: data[indexOfFlavour].name},
          state: {status: 'PENDING'},
        })
      }),
      false
    )
    mutate(
      '/account/instances',
      await doFetch('/account/instances', 'post', payload)
    )
    setFold(true)
  }

  return (
    <S.Card>
      <form onSubmit={handleSubmit(spawn)}>
        <Suspense fallback={<Spinner />}>
          <Label>Name</Label>
          <Input id="name" name="name" ref={register({required: true})} />
          <Label>Descritption</Label>
          <Input
            id="description"
            name="description"
            ref={register({required: true})}
          />
          <Label>Flavour</Label>
          <Select id="flavour" ref={register({required: true})} name="flavour">
            {data.map(flavour => (
              <option key={flavour.id} value={flavour.id}>
                {flavour.name}
              </option>
            ))}
          </Select>
          <Button type="submit">Spawn</Button>
        </Suspense>
      </form>
    </S.Card>
  )
}

export default SpawnEnvironment

const S = {}
S.Card = styled(Card)(
  css({
    bg: 'background',
  })
)
