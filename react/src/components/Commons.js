import styled from 'styled-components'

export const Div = styled.div`
  background-color: var(--color-bg-1);
  padding: var(--dist);
`

export const DivSmall = styled.div`
  background-color: var(--color-bg-1);
  padding: var(--dist-small);
`

export const NoUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const Li = styled.li`
  background-color: var(--color-bg-1);
  padding: var(--dist);
  margin-bottom: var(--dist);
  &:last-of-type{margin;bottom: 0;}
`

export const Img = styled.img`
  width: 100%;
  height: auto;
`

export const H3 = styled.h3`
  font-size: 0.9rem;
  color: var(--color-heading);
  margin-bottom: var(--dist-small);
`

export const H1 = styled.h1`
  font-size: 1.4rem;
  color: var(--color-heading);
  margin: var(--dist) 0;
`

export const H2 = styled.h2`
  font-size: 1.4rem;
  color: var(--color-heading);
  margin-bottom: 0;
`
