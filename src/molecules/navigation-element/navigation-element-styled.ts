import styled from 'styled-components'
import { rgba } from 'polished'
import Box from '../../atoms/box'
import { Title } from '../../atoms/typography'
import { themeGet } from '../../utils'
import { NavigationElementProps } from './navigation-element-props'

export type StyledNavigationElementProps = Pick<NavigationElementProps, 'isSelected' | 'isOpen'>

export const StyledNavigationElement = styled(Box)<StyledNavigationElementProps>`
  padding: ${themeGet('space', 'md', '-1px')} ${themeGet('space', 'lg')};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  background-color: transparent;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.1s ease-in;
  user-select: none;

  & > * {
    align-self: center;
  }

  & > .icon-box, & > .arrow-box {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.grey60};
  }

  & > .icon-box {
    padding-right: ${themeGet('space', 'lg')};
  }

  & > ${Title} {
    flex-grow: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    ${({ isSelected }) => isSelected && { fontWeight: 500 }}
  }
 
  ${({ theme, isSelected }) => isSelected && {
    backgroundColor: rgba(theme.colors.primary100, 0.2),
    color: theme.colors.primary100,
    '& > .icon-box': {
      color: 'inherit',
    },
  }}

  ${({ theme, isSelected }) => !isSelected && {
    '&:hover': {
      backgroundColor: theme.colors.grey20,
    },
  }};

  
`
