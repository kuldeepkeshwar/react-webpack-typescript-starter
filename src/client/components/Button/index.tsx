import styledComponents from 'styled-components';

interface IButton {
  primary?: boolean;
}

export const Button = styledComponents.button`
  background: ${(props: IButton) => props.primary ? 'palevioletred' : 'white'};
  color: ${(props: IButton) => props.primary ? 'white' : 'palevioletred'};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
