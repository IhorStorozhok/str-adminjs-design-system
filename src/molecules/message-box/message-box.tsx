/* eslint-disable max-len */
import React from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { SpaceProps, variant as styledVariant } from 'styled-system'

import { Box } from '../../atoms/box'
import { Button } from '../../atoms/button'
import { Icon, IconProps } from '../../atoms/icon'
import { cssClass } from '../../utils/css-class'
import { Text } from '../../atoms/text'

const sizeVariants = styledVariant({
  prop: 'size',
  variants: {
    sm: {
      boxShadow: 'none',
      [`& > ${Button}`]: {
        margin: '0px',
      },
    },
  },
})

const StyledMessageBox = styled(Box)<MessageBoxProps>`
  line-height: ${({ theme }) => theme.lineHeights.default};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  padding: 12px 22px;
  z-index: 50;
  & > ${Button} {
    float: right;
    margin: 8px;
    & svg {
      stroke: ${({ theme }) => theme.colors.text};
    }
  }
  ${sizeVariants};
`

/**
 * Prop Types of a MessageBox component.
 * Apart from those defined below it extends all {@link SpaceProps}
 *
 * @memberof MessageBox
 * @alias MessageBoxProps
 */
type MessageBoxProps = {
  /** Triggered when user clicks close button. If not given close button won't be seen */
  onCloseClick?: () => void
  /** Title content of a message */
  message?: string
  /**
   * Color
   * @default 'info'
   */
  color?: 'danger' | 'warning' | 'success' | 'info'
  /** Icon which will be seen in the title */
  icon?: IconProps['icon'];
  /** Size variant */
  size?: 'sm'
  /** Optional html style property */
  style?: Record<string, string>
  /** Optional children, when given component will be expanded */
  children?: React.ReactNode
}

type Props = SpaceProps & MessageBoxProps
export { Props as MessageBoxProps }

/**
 * @classdesc
 *
 * <img src="components/message-box.png" />
 *
 * Component responsible for rendering standard danger/info/success
 * messages.
 *
 * It has 2 size versions: default and small. Also it can either contain or
 * don't contain children, which causes different look.
 *
 * ### Usage
 *
 * ```javascript
 * import { MessageBox, MessageBoxProps } from '@adminjs/design-system'
 * ```
 *
 * @component
 * @subcategory Molecules
 * @hideconstructor
 * @see MessageBoxProps
 * @see {@link https://storybook.adminjs.co/?path=/story/designsystem-molecules-messagebox--default Storybook}
 * @example <caption>Different variants</caption>
 * return (
 *  <Box py="lg">
 *   <MessageBox message="Some default message" onCloseClick={() => alert('close clicked')} />
 *   <MessageBox message="Error message" mt="default" variant="danger" onCloseClick={() => alert('close clicked')} />
 *   <MessageBox message="Info message" mt="default" variant="info" onCloseClick={() => alert('close clicked')} />
 *  </Box>
 * )
 * @example <caption>Different variants with children</caption>
 * return (
 *  <Box py="lg">
 *   <MessageBox message="Some default message" onCloseClick={() => alert('close clicked')}>
 *     With inside text
 *   </MessageBox>
 *   <MessageBox message="Error message" mt="default" variant="danger" onCloseClick={() => alert('close clicked')}>
 *     With inside text
 *   </MessageBox>
 *   <MessageBox message="Info message" mt="default" variant="info" onCloseClick={() => alert('close clicked')}>
 *     With inside text
 *   </MessageBox>
 *  </Box>
 * )
 * @example <caption>Small with an icon and inside text</caption>
 * return (
 *  <Box py="lg">
 *   <MessageBox
 *     size="sm"
 *     message="Info message"
 *     mt="default"
 *     variant="info"
 *     icon="MessageCircle"
 *     onCloseClick={() => alert('close clicked')}
 *   >
 *     With inside text
 *   </MessageBox>
 *  </Box>
 * )
 * @section design-system
 */
export const MessageBox: React.FC<Props> = (props) => {
  const { onCloseClick, message, icon, children, color: variant = 'info', size, ...other } = props

  const variantIcon: Record<typeof variant, IconProps['icon']> = {
    success: 'Check',
    danger: 'X',
    info: 'Info',
    warning: 'AlertTriangle',
  }
  const variantBg: Record<typeof variant, keyof DefaultTheme['colors']> = {
    success: 'successLight',
    danger: 'errorLight',
    info: 'infoLight',
    warning: 'warningLight',
  }
  const variantIconBg: Record<typeof variant, keyof DefaultTheme['colors']> = {
    success: 'success',
    danger: 'error',
    info: 'info',
    warning: 'warning',
  }

  return (
    <Box className={cssClass('MessageBox')} {...other}>
      <StyledMessageBox as="div" bg={variantBg[variant]} size={size}>
        <Box flex alignItems="center">
          {variantIcon && (
            <Box
              width={24}
              height={24}
              bg={variantIconBg[variant]}
              color="white"
              p="sm"
              marginRight="xl"
              borderRadius={50}
            >
              <Icon icon={icon || variantIcon[variant]} />
            </Box>
          )}
          <Box as="div" flexGrow={1}>
            <Text fontWeight={children ? 500 : 400}>{message}</Text>
          </Box>

          {onCloseClick && (
            <Button variant="text" size="icon" onClick={onCloseClick} rounded color={variant}>
              <Icon size={12} icon="X" />
            </Button>
          )}
        </Box>
        <Box marginLeft="x3">
          <Text>{children}</Text>
        </Box>
      </StyledMessageBox>
    </Box>
  )
}

export default MessageBox
