import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { TButton } from '../../types';
import ToggleSwitch from '../ToggleSwitch';
import { defaultButton } from '../../default-data';
import { MAX_NUM_BUTTONS } from '../../hard-limits';
import IconPicker from './IconPicker';

export default function ButtonsEditor({ buttons, setButtons }: {
    buttons: TButton[],
    setButtons: (buttons: TButton[]) => void,
}) {
    function handleChevronClick(index: number, direction: 'up' | 'down') {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === buttons.length - 1)
        ) {
            return;
        }

        const newButtons = [...buttons];
        const button: TButton = newButtons.splice(index, 1)[0];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        newButtons.splice(newIndex, 0, button);
        setButtons(newButtons);
    }

    function handleDelete(index: number) {
        if (buttons.length === 0) return;
        const newButtons = buttons.filter((_, _index) => _index !== index);
        setButtons(newButtons);
    }

    function handleClick() {
        if (buttons.length >= MAX_NUM_BUTTONS) return;
        setButtons([
            ...buttons,
            { ...defaultButton },
        ]);
    }

    return (
        <div className='flex flex-col justify-start items-center gap-2 w-full p-2 bg-gray-300 rounded-md'>
            {buttons.map((button, index) => (
                <div
                    key={index}
                    className='flex justify-start items-center w-full px-1 bg-white rounded-md'
                >
                    <div className='flex flex-col justify-around items-center gap-2 px-2'>
                        <span
                            className='flex justify-center items-center hover:text-green-300 cursor-pointer'
                            onClick={e => handleChevronClick(index, 'up')}
                        >
                            <FontAwesomeIcon icon={faChevronUp} />
                        </span>
                        <span
                            className='flex justify-center items-center hover:text-green-300 cursor-pointer'
                            onClick={e => handleChevronClick(index, 'down')}
                        >
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                    </div >
                    <div
                        key={index}
                        className='flex flex-col justify-start items-start w-full m-2'
                    >
                        <div className='flex sm:flex-row flex-col-reverse justify-end items-center gap-2 w-full'>
                            <div className='flex flex-col justify-start items-start gap-1 w-full'>
                                <div className='flex justify-center items-center w-full'>
                                    <input
                                        placeholder='Link title...'
                                        className={(button.text ? 'font-bold' : '') + ' text-md w-full px-1 border border-gray-300 rounded-md'}
                                        value={button.text}
                                        onChange={e => setButtons(
                                            buttons.map((button, _index) => _index === index
                                                ? { ...button, text: e.target.value }
                                                : button
                                            )
                                        )}
                                    />
                                </div>
                                <div className='flex justify-center items-center w-full'>
                                    <input
                                        placeholder='Link URL...'
                                        className='text-md text-gray-700 w-full px-1 border border-gray-300 rounded-md'
                                        value={button.url}
                                        onChange={e => setButtons(
                                            buttons.map((button, _index) => _index === index
                                                ? { ...button, url: e.target.value }
                                                : button
                                            )
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center items-center my-1 w-full lg:w-[unset]'>
                                <div className='flex justify-end items-center gap-4 w-full'>
                                    <IconPicker
                                        value={button.icon}
                                        onValueChange={icon => setButtons(
                                            buttons.map((button, _index) => _index === index
                                                ? { ...button, icon }
                                                : button
                                            )
                                        )}
                                    />
                                    <ToggleSwitch
                                        value={!button.disabled}
                                        onValueChange={disabled => setButtons(
                                            buttons.map((button, _index) => _index === index
                                                ? { ...button, disabled }
                                                : button
                                            )
                                        )}
                                    />
                                    <div
                                        className='flex justify-center items-center'
                                        onClick={(e => handleDelete(index))}
                                    >
                                        <span
                                            className='text-lg text-black hover:text-red-500 cursor-pointer'
                                            style={{ transition: 'color 0.3s ease' }}
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
                    onClick={handleClick}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            }
        </div>
    )
}
