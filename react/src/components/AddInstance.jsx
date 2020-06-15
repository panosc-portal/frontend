import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import {useFakeCloudService, fakeCloudService} from '../utils/useApi'
import {UserContext} from '../context/UserContext'

const AddInstance = ({setAddNewInstance}) => {
  const [newInstance, setNewInstance] = useState({})
  const {
    data: dataFlavours,
    isLoading: isLoadingFlavours
  } = useFakeCloudService('flavours')
  const {user} = useContext(UserContext)
  const submit = async (evt) => {
    evt.preventDefault()
    const payload = {...newInstance, user: user._id}
    setAddNewInstance(payload)
    await fakeCloudService.post('instances', payload)
  }
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))
  const spawn = async (flavour) => {
    const payload = {
      flavour,
      name: 'Test Environment #' + getRandomInt(1000),
      user: user._id
    }
    console.log('click')
    setAddNewInstance(getRandomInt(100))
    await fakeCloudService.post('instances', payload)
  }
  const FlavourBox = ({flavour}) => (
    <Box type={flavour.type} onClick={() => spawn(flavour)}>
      <div>
        <h2>{flavour.name}</h2>
        <Specs>
          CPU no.: {flavour.cpu}
          {flavour.gpu !== '0' && (
            <>
              <br />
              GPU no.: {flavour.gpu}
            </>
          )}
        </Specs>
      </div>
    </Box>
  )
  return (
    <>
      {isLoadingFlavours ? (
        <>Loading</>
      ) : (
        <>
          {/*  <div>
            <h3>Create new environment</h3>
            <Form onSubmit={submit}>
              <br />
              <h4>Name:</h4>
              <p>
                <input
                  type="text"
                  onChange={(e) =>
                    setNewInstance({...newInstance, name: e.target.value})
                  }
                />
              </p>
              <h4>Flavour:</h4>
              <p>
                <select
                  onChange={(e) =>
                    setNewInstance({...newInstance, flavour: e.target.value})
                  }
                >
                  <option key={'selecta'}>{'-'}</option>
                  {dataFlavours.map((f) => (
                    <option key={f._id} value={f._id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <input type="submit" value="Spawn" />
              </p>
            </Form>
          </div> */}
          <BoxCategory>
            <h2>New Jupyter Environment</h2>
          </BoxCategory>
          <Boxes jupyter>
            {dataFlavours.map(
              (f) =>
                f.type === 'jupyter' && <FlavourBox flavour={f} key={f._id} />
            )}
          </Boxes>
          <BoxCategory>
            <h2>New Remote Desktop Environment</h2>
          </BoxCategory>
          <Boxes vm>
            {dataFlavours.map(
              (f) => f.type === 'vm' && <FlavourBox flavour={f} key={f._id} />
            )}
          </Boxes>
        </>
      )}
    </>
  )
}

export default AddInstance

const Form = styled.form``
const Boxes = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: var(--dist-smaller);
  height: 22rem;
`
const Box = styled.div`
  font-size: 0.8rem;
  display: flex;
  height: 100%;
  background-color: var(--color-bg-1);
  align-items: center;
  justify-content: center;
  :hover{background-color: var(--color-bg-2);}
  h2{
  font-size: 1rem;
  margin-bottom: var(--dist-small);
  ${({type}) =>
    type === 'jupyter'
      ? `color: var(--color-jupyter);`
      : `color: var(--color-vm);`}
`
const Specs = styled.div``

const BoxCategory = styled.div`
  h2 {
    font-size: 1rem;
  }
  background-color: var(--color-bg-1);
  margin-bottom: var(--dist-smaller);
  margin-top: var(--dist);
  padding: var(--dist-small) var(--dist);
`
