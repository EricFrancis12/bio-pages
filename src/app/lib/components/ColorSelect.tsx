import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker'
import { color } from '../types';

export default function ColorSelect(props: {
    color: color,
    setColor: Function,

}) {
    const { color, setColor } = props;

    const { setSolid, setGradient } = useColorPicker(color, setColor);

    return (
        <>
            {/* <button onClick={setSolid}>Solid</button> */}
            {/* <button onClick={setGradient}>Gradient</button> */}
            <ColorPicker value={color} onChange={setColor} className='' />
        </>
    )
}