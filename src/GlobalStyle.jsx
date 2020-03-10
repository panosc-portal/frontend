import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root{
    --grey0: hsl(0, 0%, 5%);
    --grey1: hsl(0, 0%, 12.5%);
    --grey2: hsl(0, 0%, 25%);
  
    --grey3: hsl(0, 0%, 95%);
    --grey4: hsl(0, 0%, 90%);
    --grey5: hsl(0, 0%, 80%);
  
    --white0: hsl(0, 0%, 100%);
    --white1: hsl(0, 0%, 80%);
    --white2: hsl(0, 0%, 40%);
  
    --white3: hsl(0, 0%, 0%);
    --white4: hsl(0, 0%, 20%);
    --white5: hsl(0, 0%, 60%);
    --blue0: hsl(207, 65%, 70%);
    --blue1: hsl(207, 100%, 50%);
    --blue2: hsl(207, 74%, 39%);
  
    --pink0: hsl(335, 100%, 69%);
    --pink1: hsl(335, 46%, 50%);
  
    --orange: hsl(24, 90%, 55%);
    --violet0: hsl(246, 100%, 75%);
    --violet1: hsl(257, 100%, 65%);

    --dist: 1rem;
    --dist-small: 0.5rem;
    --dist-smaller: 0.25rem;
    --dist-tiny: 0.125rem;

}

html{
    font-size: 87.5%;

    ${props =>
      props.dark
        ? " --color-bg-0: var(--grey0);\
            --color-bg-1: var(--grey1);\
            --color-bg-2: var(--grey2);\
            --color-text: var(--white1);\
            --color-heading: var(--white0);\
            --color-icon: var(--white2);\
            --color-link: var(--blue0);\
            --color-link-hover: var(--blue1);\
            --color-highlight: var(--pink0);\
            --color-jupyter: var(--orange);\
            --color-vm: var(--violet0);"
        : " --color-bg-0: var(--grey3);\
            --color-bg-1: var(--grey4);\
            --color-bg-2: var(--grey5);\
            --color-text: var(--white4);\
            --color-heading: var(--white3);\
            --color-icon: var(--white5);\
            --color-link: var(--blue2);\
            --color-link-hover: var(--blue1);\
            --color-highlight: var(--pink1);\
            --color-jupyter: var(--orange);\
            --color-vm: var(--violet1);"}

        font-family: "Open Sans", sans-serif;

        background-color: var(--color-bg-0);
        color: var(--color-text);
        

       
}

body {
    padding: 0;
    margin: 0;

}

main {
    padding: 3rem 1rem;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    color: var(--color-heading);
    margin: 0;
}

a {
    color: var(--color-link);
    text-decoration: none;
    &:hover {
    color: var(--color-link-hover);
    }
}
`;

export default GlobalStyle;
