import { css } from 'styled-components'

export const flex = (dir, justify, align, wrap) => css`
    display: flex;
    justify-content: ${justify ? justify : 'center'};
    align-items: ${align ? align : 'center'};
    flex-direction: ${dir || 'column'};
    flex-wrap: ${wrap ? wrap : 'no-wrap'};
`
export const box_shadow = (blur = '5px', size = '1px', color = '#ccf') => css`
    box-shadow: 0px 0px ${blur} ${size} ${color};
`

export const border = (style = 'solid', width = '1px', color = '#000') => css`
    border: ${width} ${style} ${color};
`
