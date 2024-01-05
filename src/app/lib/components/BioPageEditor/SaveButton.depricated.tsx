import { useState } from 'react';
import { BioPage } from '../../types';
import { useRouter } from 'next/navigation';

export default function SaveButton(props: {
    bioPage: BioPage,
    disabled?: boolean
}) {
    const { bioPage, disabled } = props;

    const { push } = useRouter();

    const [fetchingData, setFetchingData] = useState(false);

    async function handleButtonClick(e: any) {
        if (disabled || fetchingData) return;
        setFetchingData(true);

        await fetch(`/api/bio-pages/${bioPage._id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(bioPage)
        })
            .then((res) => res.json())
            .catch((err) => console.error(err))
            .finally(() => {
                setFetchingData(false);
                push(`/dashboard/bio-pages/${bioPage._id}/edit`);
            });
    }

    return (
        <div>
            {fetchingData
                ? <div>
                    Loading...
                </div>
                : <button
                    disabled={disabled || fetchingData}
                    onClick={e => handleButtonClick(e)}
                >
                    Save Changes
                </button>
            }
        </div>
    )
}
