import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Card(props: {
    title: string,
    icon?: IconProp,
    value: string | number
}) {
    const { title, icon, value } = props;

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {icon &&
                    <FontAwesomeIcon icon={icon} />
                }
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className='truncate rounded-xl bg-white px-4 py-8 text-center text-2xl'
            >
                {value}
            </p>
        </div>
    )
}
