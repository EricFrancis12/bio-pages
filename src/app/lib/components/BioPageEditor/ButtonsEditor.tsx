import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { TButton } from '../../types';
import ToggleSwitch from '../ToggleSwitch';
import { defaultButton } from '../../default-data';
import { MAX_NUM_BUTTONS } from '../../hard-limits';
import IconPicker from './IconPicker';

export default function ButtonsEditor({ buttons, setButtons }: {
    buttons: TButton[],
    setButtons: Function
}) {
    function handleChange(
        newValue: string | boolean,
        buttonKey: string,
        index: number
    ) {
        const newButtons = buttons.map((button, _index) => {
            if (_index === index) {
                return {
                    ...button,
                    [buttonKey]: newValue
                };
            }
            return button;
        });
        setButtons(newButtons);
    }

    function handleChevronUpClick(index: number) {
        if (index === 0) return;
        const newButtons = [...buttons];
        const button: TButton = newButtons.splice(index, 1)[0];
        newButtons.splice(index - 1, 0, button);
        setButtons(newButtons);
    }

    function handleChevronDownClick(index: number) {
        if (index === buttons.length - 1) return;
        const newButtons = [...buttons];
        const button: TButton = newButtons.splice(index, 1)[0];
        newButtons.splice(index + 1, 0, button);
        setButtons(newButtons);
    }

    function handleDelete(index: number) {
        if (buttons.length === 0) return;
        const newButtons = buttons.filter((button, _index) => _index !== index);
        setButtons(newButtons);
    }

    return (
        <div className='flex flex-col justify-start items-center gap-2 w-full px-1 py-2 bg-gray-300'>
            {buttons.map((button, index) => (
                <div key={index}
                    className='flex justify-start items-center w-full px-1 bg-white'
                    style={{
                        borderRadius: '10px',

                    }}>
                    <div className='flex flex-col justify-around items-center gap-2 px-2'>
                        <span
                            className='flex justify-center items-center hover:text-green-300 cursor-pointer'
                            onClick={e => handleChevronUpClick(index)}
                        >
                            <FontAwesomeIcon icon={faChevronUp} />
                        </span>
                        <span
                            className='flex justify-center items-center hover:text-green-300 cursor-pointer'
                            onClick={e => handleChevronDownClick(index)}
                        >
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                    </div >
                    <div
                        key={index}
                        className='flex flex-col justify-start items-start w-full m-2'
                    >
                        <div className='flex sm:flex-row flex-col-reverse justify-end items-center w-full'>
                            <div className='flex flex-col justify-start items-start gap-1 w-full'>
                                <div className='flex justify-center items-center w-full'>
                                    <input
                                        placeholder='Link title...'
                                        className={(button.text ? 'font-bold' : '') + ' text-md w-full'}
                                        value={button.text}
                                        onChange={e => handleChange(e.target.value, 'text', index)}
                                    />
                                </div>
                                <div className='flex justify-center items-center w-full'>
                                    <input
                                        placeholder='Link URL...'
                                        className='text-sm text-gray-700 w-full'
                                        value={button.url}
                                        onChange={e => handleChange(e.target.value, 'url', index)}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center items-center my-1 w-full lg:w-[unset]'>
                                <div className='flex justify-end items-center gap-4 w-full'>
                                    <IconPicker
                                        value={button.icon}
                                        onValueChange={(newIcon: string) => handleChange(newIcon, 'icon', index)}
                                    />
                                    <ToggleSwitch
                                        value={!button.disabled}
                                        onValueChange={(newDisabled: boolean) => handleChange(newDisabled, 'disabled', index)}
                                    />
                                    <div
                                        className='flex justify-center items-center'
                                        onClick={(e => handleDelete(index))}
                                    >
                                        <span
                                            className='text-lg text-black hover:text-red-500 cursor-pointer'
                                            style={{
                                                transition: 'color 0.3s ease'
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {(buttons.length < MAX_NUM_BUTTONS) &&
                <div
                    className='flex justify-center items-center hover:opacity-70 cursor-pointer'
                    style={{ borderRadius: '25px' }}
                    onClick={e => {
                        if (buttons.length >= MAX_NUM_BUTTONS) return;
                        setButtons([
                            ...buttons,
                            {
                                ...defaultButton
                            }
                        ])
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            }
        </div>
    )
}
